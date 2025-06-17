#!/usr/bin/env node

/**
 * 日文数据库验证系统
 * 技术栈：Playwright + Cheerio + Crawlee
 * 目标：通过WalkerPlus日文网站验证静态网站数据准确性
 *
 * 验证内容：
 * - 三层花火页面：主要信息（日期、地址）、次要信息（观众数、花火数）
 * - 四层页面：官方网站、谷歌地图
 */

import * as cheerio from "cheerio";
import { PlaywrightCrawler } from "crawlee";
import fs from "fs";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class JapaneseDataValidationSystem {
  constructor() {
    this.db = null;
    this.results = {
      validated: [],
      inconsistencies: [],
      errors: [],
      newData: [],
    };

    // WalkerPlus日文数据源配置
    this.walkerPlusBaseUrls = {
      tokyo: "https://hanabi.walkerplus.com/launch/ar0313/",
      saitama: "https://hanabi.walkerplus.com/launch/ar0311/",
      chiba: "https://hanabi.walkerplus.com/launch/ar0312/",
      kanagawa: "https://hanabi.walkerplus.com/launch/ar0314/",
      kitakanto: "https://hanabi.walkerplus.com/launch/ar0308/",
      koshinetsu: "https://hanabi.walkerplus.com/launch/ar0319/",
    };
  }

  /**
   * 初始化SQLite数据库
   */
  async initDatabase() {
    this.db = await open({
      filename: path.join(__dirname, "../src/database/japanese-validation.db"),
      driver: sqlite3.Database,
    });

    // 创建验证结果表
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS validation_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        region TEXT NOT NULL,
        validation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        field_name TEXT NOT NULL,
        local_value TEXT,
        walker_plus_value TEXT,
        is_consistent BOOLEAN NOT NULL,
        confidence_score REAL DEFAULT 0.0,
        notes TEXT
      );

      CREATE TABLE IF NOT EXISTS walker_plus_raw_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        region TEXT NOT NULL,
        scrape_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        raw_html TEXT,
        parsed_data TEXT,
        source_url TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_validation_event ON validation_results(event_id);
      CREATE INDEX IF NOT EXISTS idx_validation_date ON validation_results(validation_date);
    `);

    console.log("✅ 日文数据库初始化完成");
  }

  /**
   * 从本地静态网站读取花火数据
   */
  async loadLocalHanabiData() {
    const localData = {};
    const regions = [
      "tokyo",
      "saitama",
      "chiba",
      "kanagawa",
      "kitakanto",
      "koshinetsu",
    ];

    for (const region of regions) {
      try {
        // 读取三层页面数据
        const pageFile = path.join(
          __dirname,
          `../src/app/${region}/hanabi/page.tsx`
        );
        if (fs.existsSync(pageFile)) {
          const content = fs.readFileSync(pageFile, "utf-8");
          localData[region] = this.parseLocalHanabiData(content, region);
        }
      } catch (error) {
        console.error(`❌ 读取${region}本地数据失败:`, error.message);
      }
    }

    return localData;
  }

  /**
   * 解析本地花火数据
   */
  parseLocalHanabiData(content, region) {
    const events = [];

    // 提取花火事件数据的正则表达式
    const eventRegex = /const\s+(\w+HanabiData)\s*=\s*{([^}]+)}/g;
    let match;

    while ((match = eventRegex.exec(content)) !== null) {
      const eventName = match[1];
      const eventDataStr = match[2];

      try {
        // 解析事件数据字段
        const eventData = this.parseEventDataString(eventDataStr);
        eventData.eventId = eventName;
        eventData.region = region;
        events.push(eventData);
      } catch (error) {
        console.warn(`⚠️ 解析${eventName}数据失败:`, error.message);
      }
    }

    return events;
  }

  /**
   * 解析事件数据字符串
   */
  parseEventDataString(dataStr) {
    const data = {};

    // 提取各个字段
    const patterns = {
      name: /name:\s*["']([^"']+)["']/,
      date: /date:\s*["']([^"']+)["']/,
      location: /location:\s*["']([^"']+)["']/,
      expectedVisitors: /expectedVisitors:\s*["']([^"']+)["']/,
      fireworksCount: /fireworksCount:\s*["']([^"']+)["']/,
      officialWebsite: /officialWebsite:\s*["']([^"']+)["']/,
      googleMapsUrl: /googleMapsUrl:\s*["']([^"']+)["']/,
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = dataStr.match(pattern);
      if (match) {
        data[key] = match[1];
      }
    }

    return data;
  }

  /**
   * 使用Playwright+Cheerio抓取WalkerPlus数据
   */
  async scrapeWalkerPlusData(region) {
    const crawler = new PlaywrightCrawler({
      launchContext: {
        launchOptions: {
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
      requestHandler: async ({ page, request }) => {
        console.log(`🔍 正在抓取 ${region} 的WalkerPlus数据...`);

        try {
          // 等待页面加载完成
          await page.waitForLoadState("networkidle");

          // 获取页面HTML
          const html = await page.content();
          const $ = cheerio.load(html);

          // 解析花火事件列表
          const events = [];
          $(".event-item, .hanabi-item, .festival-item").each(
            (index, element) => {
              const eventData = this.parseWalkerPlusEvent($, element, region);
              if (eventData) {
                events.push(eventData);
              }
            }
          );

          // 保存原始数据到数据库
          await this.saveRawWalkerPlusData(region, html, events, request.url);

          return events;
        } catch (error) {
          console.error(`❌ 抓取${region}数据失败:`, error.message);
          throw error;
        }
      },
    });

    const baseUrl = this.walkerPlusBaseUrls[region];
    if (!baseUrl) {
      throw new Error(`未找到${region}的WalkerPlus URL配置`);
    }

    await crawler.run([baseUrl]);
    return this.results.newData.filter((item) => item.region === region);
  }

  /**
   * 解析WalkerPlus单个事件数据
   */
  parseWalkerPlusEvent($, element, region) {
    try {
      const $el = $(element);

      return {
        region,
        name: this.cleanText(
          $el.find(".event-title, .hanabi-title, h3").first().text()
        ),
        date: this.extractDate($el.find(".date, .event-date").text()),
        location: this.cleanText($el.find(".location, .venue").text()),
        expectedVisitors: this.extractVisitorCount(
          $el.find(".visitors, .attendance").text()
        ),
        fireworksCount: this.extractFireworksCount(
          $el.find(".fireworks, .count").text()
        ),
        officialWebsite: $el
          .find('a[href*="official"], a[href*="公式"]')
          .attr("href"),
        googleMapsUrl: $el
          .find('a[href*="maps.google"], a[href*="goo.gl/maps"]')
          .attr("href"),
        sourceUrl: this.walkerPlusBaseUrls[region],
      };
    } catch (error) {
      console.warn("⚠️ 解析WalkerPlus事件数据失败:", error.message);
      return null;
    }
  }

  /**
   * 数据验证核心逻辑
   */
  async validateData(localData, walkerPlusData) {
    console.log("🔍 开始数据验证...");

    for (const region of Object.keys(localData)) {
      const localEvents = localData[region] || [];
      const walkerEvents = walkerPlusData[region] || [];

      for (const localEvent of localEvents) {
        // 智能匹配WalkerPlus中的对应事件
        const matchedWalkerEvent = this.findMatchingEvent(
          localEvent,
          walkerEvents
        );

        if (matchedWalkerEvent) {
          await this.validateEventData(localEvent, matchedWalkerEvent);
        } else {
          console.warn(`⚠️ 未找到匹配的WalkerPlus数据: ${localEvent.name}`);
          this.results.inconsistencies.push({
            type: "missing_walker_data",
            localEvent,
            message: "在WalkerPlus中未找到对应事件",
          });
        }
      }
    }
  }

  /**
   * 智能匹配事件
   */
  findMatchingEvent(localEvent, walkerEvents) {
    // 1. 精确名称匹配
    let match = walkerEvents.find(
      (we) =>
        this.normalizeEventName(we.name) ===
        this.normalizeEventName(localEvent.name)
    );

    if (match) return match;

    // 2. 模糊名称匹配
    match = walkerEvents.find((we) => {
      const similarity = this.calculateStringSimilarity(
        this.normalizeEventName(we.name),
        this.normalizeEventName(localEvent.name)
      );
      return similarity > 0.8;
    });

    if (match) return match;

    // 3. 地点+日期匹配
    match = walkerEvents.find(
      (we) =>
        this.normalizeLocation(we.location) ===
          this.normalizeLocation(localEvent.location) &&
        this.normalizeDateRange(we.date) ===
          this.normalizeDateRange(localEvent.date)
    );

    return match;
  }

  /**
   * 验证单个事件数据
   */
  async validateEventData(localEvent, walkerEvent) {
    const validationFields = [
      { field: "name", weight: 0.3, type: "string" },
      { field: "date", weight: 0.3, type: "date" },
      { field: "location", weight: 0.2, type: "string" },
      { field: "expectedVisitors", weight: 0.1, type: "number" },
      { field: "fireworksCount", weight: 0.1, type: "number" },
    ];

    for (const { field, weight, type } of validationFields) {
      const localValue = localEvent[field];
      const walkerValue = walkerEvent[field];

      const validation = this.validateField(localValue, walkerValue, type);

      // 保存验证结果到数据库
      await this.saveValidationResult({
        eventId: localEvent.eventId,
        region: localEvent.region,
        fieldName: field,
        localValue: String(localValue || ""),
        walkerPlusValue: String(walkerValue || ""),
        isConsistent: validation.isConsistent,
        confidenceScore: validation.confidence * weight,
        notes: validation.notes,
      });

      if (!validation.isConsistent) {
        this.results.inconsistencies.push({
          eventId: localEvent.eventId,
          field,
          localValue,
          walkerValue,
          confidence: validation.confidence,
          notes: validation.notes,
        });
      }
    }
  }

  /**
   * 字段验证逻辑
   */
  validateField(localValue, walkerValue, type) {
    if (!localValue && !walkerValue) {
      return { isConsistent: true, confidence: 1.0, notes: "两个值都为空" };
    }

    if (!localValue || !walkerValue) {
      return {
        isConsistent: false,
        confidence: 0.0,
        notes: `缺少数据: 本地=${localValue}, WalkerPlus=${walkerValue}`,
      };
    }

    switch (type) {
      case "string":
        return this.validateStringField(localValue, walkerValue);
      case "date":
        return this.validateDateField(localValue, walkerValue);
      case "number":
        return this.validateNumberField(localValue, walkerValue);
      default:
        return { isConsistent: false, confidence: 0.0, notes: "未知字段类型" };
    }
  }

  /**
   * 字符串字段验证
   */
  validateStringField(local, walker) {
    const normalizedLocal = this.normalizeString(local);
    const normalizedWalker = this.normalizeString(walker);

    if (normalizedLocal === normalizedWalker) {
      return { isConsistent: true, confidence: 1.0, notes: "完全匹配" };
    }

    const similarity = this.calculateStringSimilarity(
      normalizedLocal,
      normalizedWalker
    );

    return {
      isConsistent: similarity > 0.8,
      confidence: similarity,
      notes: `相似度: ${(similarity * 100).toFixed(1)}%`,
    };
  }

  /**
   * 日期字段验证
   */
  validateDateField(local, walker) {
    const localDate = this.parseDateRange(local);
    const walkerDate = this.parseDateRange(walker);

    if (!localDate || !walkerDate) {
      return {
        isConsistent: false,
        confidence: 0.0,
        notes: "日期解析失败",
      };
    }

    // 检查日期范围重叠
    const overlap = this.checkDateOverlap(localDate, walkerDate);

    return {
      isConsistent: overlap > 0.5,
      confidence: overlap,
      notes: `日期重叠度: ${(overlap * 100).toFixed(1)}%`,
    };
  }

  /**
   * 数字字段验证
   */
  validateNumberField(local, walker) {
    const localNum = this.parseNumber(local);
    const walkerNum = this.parseNumber(walker);

    if (localNum === null || walkerNum === null) {
      return {
        isConsistent: false,
        confidence: 0.0,
        notes: "数字解析失败",
      };
    }

    if (localNum === walkerNum) {
      return { isConsistent: true, confidence: 1.0, notes: "数值完全匹配" };
    }

    // 计算相对误差
    const relativeError =
      Math.abs(localNum - walkerNum) / Math.max(localNum, walkerNum);
    const confidence = Math.max(0, 1 - relativeError);

    return {
      isConsistent: confidence > 0.8,
      confidence,
      notes: `相对误差: ${(relativeError * 100).toFixed(1)}%`,
    };
  }

  /**
   * 保存验证结果到数据库
   */
  async saveValidationResult(result) {
    await this.db.run(
      `
      INSERT INTO validation_results 
      (event_id, region, field_name, local_value, walker_plus_value, is_consistent, confidence_score, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        result.eventId,
        result.region,
        result.fieldName,
        result.localValue,
        result.walkerPlusValue,
        result.isConsistent ? 1 : 0,
        result.confidenceScore,
        result.notes,
      ]
    );
  }

  /**
   * 保存WalkerPlus原始数据
   */
  async saveRawWalkerPlusData(region, html, parsedData, sourceUrl) {
    await this.db.run(
      `
      INSERT INTO walker_plus_raw_data (event_id, region, raw_html, parsed_data, source_url)
      VALUES (?, ?, ?, ?, ?)
    `,
      [
        `${region}_${Date.now()}`,
        region,
        html,
        JSON.stringify(parsedData),
        sourceUrl,
      ]
    );
  }

  /**
   * 生成验证报告
   */
  async generateValidationReport() {
    console.log("📊 生成验证报告...");

    // 从数据库获取最新验证结果
    const results = await this.db.all(`
      SELECT 
        region,
        field_name,
        COUNT(*) as total_validations,
        SUM(CASE WHEN is_consistent = 1 THEN 1 ELSE 0 END) as consistent_count,
        AVG(confidence_score) as avg_confidence,
        MAX(validation_date) as last_validation
      FROM validation_results 
      WHERE validation_date >= datetime('now', '-1 day')
      GROUP BY region, field_name
      ORDER BY region, field_name
    `);

    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalValidations: 0,
        consistentValidations: 0,
        overallAccuracy: 0,
        avgConfidence: 0,
      },
      byRegion: {},
      byField: {},
      inconsistencies: this.results.inconsistencies,
    };

    // 计算统计数据
    let totalValidations = 0;
    let consistentValidations = 0;
    let totalConfidence = 0;

    for (const result of results) {
      totalValidations += result.total_validations;
      consistentValidations += result.consistent_count;
      totalConfidence += result.avg_confidence * result.total_validations;

      // 按地区统计
      if (!report.byRegion[result.region]) {
        report.byRegion[result.region] = {
          totalValidations: 0,
          consistentValidations: 0,
          accuracy: 0,
          fields: {},
        };
      }

      const regionStats = report.byRegion[result.region];
      regionStats.totalValidations += result.total_validations;
      regionStats.consistentValidations += result.consistent_count;
      regionStats.fields[result.field_name] = {
        accuracy: (
          (result.consistent_count / result.total_validations) *
          100
        ).toFixed(1),
        confidence: (result.avg_confidence * 100).toFixed(1),
      };

      // 按字段统计
      if (!report.byField[result.field_name]) {
        report.byField[result.field_name] = {
          totalValidations: 0,
          consistentValidations: 0,
          accuracy: 0,
        };
      }

      const fieldStats = report.byField[result.field_name];
      fieldStats.totalValidations += result.total_validations;
      fieldStats.consistentValidations += result.consistent_count;
    }

    // 计算总体统计
    report.summary.totalValidations = totalValidations;
    report.summary.consistentValidations = consistentValidations;
    report.summary.overallAccuracy =
      totalValidations > 0
        ? ((consistentValidations / totalValidations) * 100).toFixed(1)
        : 0;
    report.summary.avgConfidence =
      totalValidations > 0
        ? ((totalConfidence / totalValidations) * 100).toFixed(1)
        : 0;

    // 计算各地区准确率
    for (const region of Object.keys(report.byRegion)) {
      const stats = report.byRegion[region];
      stats.accuracy =
        stats.totalValidations > 0
          ? (
              (stats.consistentValidations / stats.totalValidations) *
              100
            ).toFixed(1)
          : 0;
    }

    // 计算各字段准确率
    for (const field of Object.keys(report.byField)) {
      const stats = report.byField[field];
      stats.accuracy =
        stats.totalValidations > 0
          ? (
              (stats.consistentValidations / stats.totalValidations) *
              100
            ).toFixed(1)
          : 0;
    }

    // 保存报告
    const reportPath = path.join(
      __dirname,
      "../docs/japanese-database-validation-report.json"
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log("✅ 验证报告已生成:", reportPath);
    return report;
  }

  /**
   * 工具函数：字符串相似度计算
   */
  calculateStringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * 工具函数：编辑距离计算
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * 工具函数：标准化字符串
   */
  normalizeString(str) {
    return str
      .toString()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * 工具函数：标准化事件名称
   */
  normalizeEventName(name) {
    return name
      .toString()
      .replace(/第\d+回/, "")
      .replace(/\d{4}年?/, "")
      .replace(/花火大会|花火祭|花火まつり/, "花火")
      .replace(/[^\w\s]/g, "")
      .toLowerCase()
      .trim();
  }

  /**
   * 工具函数：标准化地点
   */
  normalizeLocation(location) {
    return location
      .toString()
      .replace(/[都道府県市区町村]/g, "")
      .replace(/[^\w\s]/g, "")
      .toLowerCase()
      .trim();
  }

  /**
   * 工具函数：解析数字
   */
  parseNumber(str) {
    if (!str) return null;

    const numStr = str
      .toString()
      .replace(/[^\d.,]/g, "")
      .replace(/,/g, "");

    const num = parseFloat(numStr);
    return isNaN(num) ? null : num;
  }

  /**
   * 工具函数：清理文本
   */
  cleanText(text) {
    return text.toString().replace(/\s+/g, " ").trim();
  }

  /**
   * 工具函数：提取日期
   */
  extractDate(text) {
    const datePattern = /(\d{4})[年\/\-](\d{1,2})[月\/\-](\d{1,2})/g;
    const matches = [...text.matchAll(datePattern)];
    return matches.map(
      (match) =>
        `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`
    );
  }

  /**
   * 工具函数：提取观众数
   */
  extractVisitorCount(text) {
    const patterns = [
      /(\d+(?:,\d+)*)\s*万?人/,
      /約\s*(\d+(?:,\d+)*)\s*万?人/,
      /(\d+(?:,\d+)*)\s*名/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].replace(/,/g, "");
      }
    }

    return null;
  }

  /**
   * 工具函数：提取花火数
   */
  extractFireworksCount(text) {
    const patterns = [
      /(\d+(?:,\d+)*)\s*発/,
      /約\s*(\d+(?:,\d+)*)\s*発/,
      /(\d+(?:,\d+)*)\s*shots?/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].replace(/,/g, "");
      }
    }

    return null;
  }

  /**
   * 主执行函数
   */
  async run() {
    try {
      console.log("🚀 启动日文数据库验证系统...");

      // 1. 初始化数据库
      await this.initDatabase();

      // 2. 加载本地数据
      console.log("📖 加载本地花火数据...");
      const localData = await this.loadLocalHanabiData();
      console.log(
        `✅ 已加载 ${Object.keys(localData).length} 个地区的本地数据`
      );

      // 3. 抓取WalkerPlus数据
      console.log("🌐 开始抓取WalkerPlus数据...");
      const walkerPlusData = {};

      for (const region of Object.keys(this.walkerPlusBaseUrls)) {
        try {
          walkerPlusData[region] = await this.scrapeWalkerPlusData(region);
          console.log(`✅ ${region}: 抓取完成`);

          // 避免请求过于频繁
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`❌ ${region}: 抓取失败 -`, error.message);
          walkerPlusData[region] = [];
        }
      }

      // 4. 数据验证
      await this.validateData(localData, walkerPlusData);

      // 5. 生成报告
      const report = await this.generateValidationReport();

      // 6. 输出结果
      console.log("\n📊 验证结果摘要:");
      console.log(`总验证次数: ${report.summary.totalValidations}`);
      console.log(`一致性验证: ${report.summary.consistentValidations}`);
      console.log(`总体准确率: ${report.summary.overallAccuracy}%`);
      console.log(`平均置信度: ${report.summary.avgConfidence}%`);

      if (this.results.inconsistencies.length > 0) {
        console.log(
          `\n⚠️ 发现 ${this.results.inconsistencies.length} 个数据不一致问题`
        );
        this.results.inconsistencies.slice(0, 5).forEach((issue, index) => {
          console.log(
            `${index + 1}. ${issue.eventId} - ${issue.field}: ${issue.notes}`
          );
        });
      }

      console.log("\n✅ 日文数据库验证完成！");
    } catch (error) {
      console.error("❌ 验证系统执行失败:", error);
      throw error;
    } finally {
      if (this.db) {
        await this.db.close();
      }
    }
  }
}

// 执行验证系统
const validator = new JapaneseDataValidationSystem();
validator.run().catch(console.error);

export default JapaneseDataValidationSystem;
