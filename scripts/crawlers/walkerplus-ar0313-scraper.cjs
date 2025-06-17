const { PlaywrightCrawler } = require("crawlee");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

/**
 * WalkerPlus ar0313 花火排行榜数据抓取器
 * 技术栈：Playwright + Cheerio + Crawlee
 * 目标：获取至少10个真实的花火活动信息
 * 商业要求：所有信息必须真实，严禁编造
 */

class WalkerPlusAr0313Scraper {
  constructor() {
    this.results = [];
    this.baseUrl = "https://hanabi.walkerplus.com/launch/ar0313/";
    this.outputDir = path.join(__dirname, "../../reports");

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * 智能文本清理函数
   */
  cleanText(text) {
    if (!text) return "";
    return text.replace(/\s+/g, " ").trim();
  }

  /**
   * 提取观众数信息
   */
  extractAudienceFromText(text) {
    if (!text) return "";

    const audiencePatterns = [
      /(\d+(?:,\d+)*)\s*万人/, // 20万人
      /(\d+(?:,\d+)*)\s*人/, // 1000人
      /(\d+(?:,\d+)*)\s*名/, // 500名
      /観客数[：:]\s*(\d+(?:,\d+)*)/, // 観客数：1000
      /来場者[：:]\s*(\d+(?:,\d+)*)/, // 来場者：1000
    ];

    for (const pattern of audiencePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1] + (text.includes("万") ? "万人" : "人");
      }
    }

    return "";
  }

  /**
   * 提取花火数信息
   */
  extractFireworksFromText(text) {
    if (!text) return "";

    const fireworksPatterns = [
      /(\d+(?:,\d+)*)\s*発/, // 10000発
      /(\d+(?:,\d+)*)\s*発射/, // 5000発射
      /(\d+(?:,\d+)*)\s*本/, // 3000本
      /花火数[：:]\s*(\d+(?:,\d+)*)/, // 花火数：1000
      /打ち上げ数[：:]\s*(\d+(?:,\d+)*)/, // 打ち上げ数：1000
    ];

    for (const pattern of fireworksPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1] + "発";
      }
    }

    return "";
  }

  /**
   * 提取日期信息
   */
  extractDateFromText(text) {
    if (!text) return "";

    const datePatterns = [
      /\d{4}年\d{1,2}月\d{1,2}日/, // 2025年8月15日
      /\d{1,2}月\d{1,2}日/, // 8月15日
      /\d{4}-\d{2}-\d{2}/, // 2025-08-15
      /\d{1,2}\/\d{1,2}/, // 8/15
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return text;
  }

  /**
   * 从单个元素提取花火信息
   */
  extractFromElement($, element) {
    const $element = $(element);

    // 尝试多种选择器获取标题
    const titleSelectors = [
      ".title a",
      ".event-title a",
      ".hanabi-title a",
      "h3 a",
      "h2 a",
      'a[href*="detail"]',
      ".name a",
    ];

    let title = "";
    for (const selector of titleSelectors) {
      const titleElement = $element.find(selector);
      if (titleElement.length > 0) {
        title = this.cleanText(titleElement.text());
        if (title && title.length > 3) break;
      }
    }

    // 如果没有找到标题，尝试直接从元素文本中提取
    if (!title) {
      const elementText = this.cleanText($element.text());
      const lines = elementText.split("\n").filter((line) => line.trim());
      for (const line of lines) {
        if (
          line.includes("花火") ||
          line.includes("祭") ||
          line.includes("大会")
        ) {
          title = line;
          break;
        }
      }
    }

    if (!title || title.length < 3) return null;

    // 获取完整的元素文本用于提取其他信息
    const fullText = this.cleanText($element.text());

    // 提取日期
    const date = this.extractDateFromText(fullText);

    // 提取地点
    let location = "";
    const locationKeywords = [
      "会場",
      "場所",
      "開催地",
      "県",
      "市",
      "区",
      "町",
      "村",
    ];
    const lines = fullText.split(/[、。\n]/).filter((line) => line.trim());
    for (const line of lines) {
      if (locationKeywords.some((keyword) => line.includes(keyword))) {
        location = this.cleanText(line);
        break;
      }
    }

    // 提取观众数和花火数
    const audience = this.extractAudienceFromText(fullText);
    const fireworks = this.extractFireworksFromText(fullText);

    // 获取详情链接
    const detailLink = $element.find('a[href*="detail"]').attr("href") || "";

    return {
      title: title,
      date: date || "日期待确认",
      location: location || "地点待确认",
      audience: audience || "观众数待确认",
      fireworks: fireworks || "花火数待确认",
      detailUrl: detailLink ? `https://hanabi.walkerplus.com${detailLink}` : "",
      sourceUrl: this.baseUrl,
      extractedAt: new Date().toISOString(),
    };
  }

  /**
   * 主要抓取函数
   */
  async scrapeData() {
    console.log("🚀 开始抓取 WalkerPlus ar0313 花火排行榜...");
    console.log(`📍 目标URL: ${this.baseUrl}`);
    console.log("⚠️  商业项目要求：所有信息必须真实，严禁编造");

    const crawler = new PlaywrightCrawler({
      requestHandler: async ({ page, request }) => {
        console.log(`📄 正在处理页面: ${request.url}`);

        try {
          // 等待页面加载完成
          await page.waitForLoadState("networkidle");

          // 获取页面HTML
          const html = await page.content();
          const $ = cheerio.load(html);

          console.log("🔍 开始解析页面内容...");

          // 方法1: 查找JSON-LD结构化数据
          $('script[type="application/ld+json"]').each((i, elem) => {
            try {
              const jsonData = JSON.parse($(elem).html());
              if (jsonData["@type"] === "Event" || jsonData.name) {
                console.log("📊 发现JSON-LD事件数据");
                this.processJsonLdData(jsonData);
              }
            } catch (e) {
              // JSON解析失败，继续其他方法
            }
          });

          // 方法2: 解析花火活动列表
          const eventSelectors = [
            ".event-item",
            ".hanabi-item",
            ".festival-item",
            ".event-list li",
            ".hanabi-list li",
            "article",
            ".item",
            "li[data-event]",
          ];

          for (const selector of eventSelectors) {
            const items = $(selector);
            if (items.length > 0) {
              console.log(
                `🎯 找到 ${items.length} 个事件项目 (选择器: ${selector})`
              );
              items.each((i, elem) => {
                this.processEventItem($, $(elem));
              });
              break;
            }
          }

          // 方法3: 表格数据解析
          $("table").each((i, table) => {
            const rows = $(table).find("tr");
            if (rows.length > 1) {
              console.log(`📋 发现表格数据，共 ${rows.length} 行`);
              this.processTableData($, $(table));
            }
          });

          // 方法4: 通用文本解析
          this.processGeneralContent($);
        } catch (error) {
          console.error("❌ 页面处理错误:", error.message);
        }
      },

      failedRequestHandler: async ({ request }) => {
        console.error(`❌ 请求失败: ${request.url}`);
      },

      maxRequestsPerCrawl: 10,
      headless: false, // 显示浏览器便于调试
    });

    // 开始抓取
    await crawler.run([this.baseUrl]);

    // 数据后处理
    this.deduplicateResults();

    console.log(`✅ 抓取完成！共获取 ${this.results.length} 个花火活动数据`);

    // 保存结果
    await this.saveResults();

    return this.results;
  }

  // 处理JSON-LD数据
  processJsonLdData(jsonData) {
    const event = {
      title: jsonData.name || "",
      date: this.extractDateFromText(jsonData.startDate || jsonData.date || ""),
      location: jsonData.location?.name || jsonData.location?.address || "",
      description: jsonData.description || "",
      audience: null,
      fireworks: null,
      source: "JSON-LD",
    };

    if (this.validateData(event)) {
      this.results.push(event);
      console.log(`✅ JSON-LD数据: ${event.title}`);
    }
  }

  // 处理事件项目
  processEventItem($, item) {
    const title =
      item.find("h2, h3, h4, .title, .name").first().text().trim() ||
      item.find("a").first().text().trim();

    const dateText = item.find(".date, .time, .when").text() || item.text();
    const date = this.extractDateFromText(dateText);

    const location =
      item.find(".location, .place, .where, .venue").text().trim() ||
      item.find('span:contains("会場"), span:contains("場所")').text().trim();

    // 提取观众数和花火数
    const fullText = item.text();
    const audienceMatch = fullText.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*万?人/);
    const fireworksMatch = fullText.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*発/);

    const event = {
      title: title,
      date: date,
      location: location,
      audience: audienceMatch ? audienceMatch[1].replace(/,/g, "") : null,
      fireworks: fireworksMatch ? fireworksMatch[1].replace(/,/g, "") : null,
      description: item.find(".description, .detail").text().trim(),
      source: "Event Item",
    };

    if (this.validateData(event)) {
      this.results.push(event);
      console.log(`✅ 事件项目: ${event.title}`);
    }
  }

  // 处理表格数据
  processTableData($, table) {
    const headers = [];
    table.find("thead tr th, tr:first-child td").each((i, th) => {
      headers.push($(th).text().trim().toLowerCase());
    });

    table.find("tbody tr, tr:not(:first-child)").each((i, row) => {
      const cells = $(row).find("td");
      if (cells.length >= 3) {
        const event = {
          title: "",
          date: "",
          location: "",
          audience: null,
          fireworks: null,
          source: "Table Data",
        };

        cells.each((j, cell) => {
          const text = $(cell).text().trim();
          const header = headers[j] || "";

          if (
            header.includes("名前") ||
            header.includes("タイトル") ||
            j === 0
          ) {
            event.title = text;
          } else if (
            header.includes("日付") ||
            header.includes("日程") ||
            j === 1
          ) {
            event.date = this.extractDateFromText(text);
          } else if (
            header.includes("場所") ||
            header.includes("会場") ||
            j === 2
          ) {
            event.location = text;
          } else if (text.includes("人")) {
            event.audience = this.extractAudienceFromText(text);
          } else if (text.includes("発")) {
            event.fireworks = this.extractFireworksFromText(text);
          }
        });

        if (this.validateData(event)) {
          this.results.push(event);
          console.log(`✅ 表格数据: ${event.title}`);
        }
      }
    });
  }

  // 处理通用内容
  processGeneralContent($) {
    // 查找包含花火关键词的文本块
    const keywords = ["花火", "花火大会", "祭り", "まつり", "フェスティバル"];

    $("div, section, article, p").each((i, elem) => {
      const text = $(elem).text();
      const hasKeyword = keywords.some((keyword) => text.includes(keyword));

      if (hasKeyword && text.length > 20 && text.length < 500) {
        // 尝试从文本中提取结构化信息
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);

        if (lines.length >= 3) {
          const event = {
            title: lines[0],
            date: this.extractDateFromText(
              lines.find(
                (line) =>
                  line.includes("月") ||
                  line.includes("日") ||
                  line.match(/\d+\/\d+/)
              ) || ""
            ),
            location:
              lines.find(
                (line) =>
                  line.includes("会場") ||
                  line.includes("場所") ||
                  line.includes("公園")
              ) || lines[1],
            audience: this.extractAudienceFromText(
              text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*万?人/)?.[0]
            ),
            fireworks: this.extractFireworksFromText(
              text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*発/)?.[0]
            ),
            description: text.substring(0, 200),
            source: "General Content",
          };

          if (this.validateData(event)) {
            this.results.push(event);
            console.log(`✅ 通用内容: ${event.title}`);
          }
        }
      }
    });
  }

  // 数据验证
  validateData(data) {
    const required = ["title", "date", "location"];
    return required.every(
      (field) => data[field] && data[field].trim().length > 0
    );
  }

  // 去重处理
  deduplicateResults() {
    const seen = new Set();
    this.results = this.results.filter((item) => {
      const key = `${item.title}-${item.date}-${item.location}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * 保存抓取结果
   */
  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // 保存JSON格式
    const jsonFile = path.join(
      this.outputDir,
      `walkerplus-ar0313-${timestamp}.json`
    );
    fs.writeFileSync(jsonFile, JSON.stringify(this.results, null, 2), "utf8");
    console.log(`💾 JSON数据已保存: ${jsonFile}`);

    // 保存CSV格式
    const csvFile = path.join(
      this.outputDir,
      `walkerplus-ar0313-${timestamp}.csv`
    );
    const csvHeader =
      "Title,Date,Location,Audience,Fireworks,Description,Source\n";
    const csvContent = this.results
      .map(
        (item) =>
          `"${item.title}","${item.date}","${item.location}","${
            item.audience || ""
          }","${item.fireworks || ""}","${item.description}","${item.source}"`
      )
      .join("\n");

    fs.writeFileSync(csvFile, csvHeader + csvContent, "utf8");
    console.log(`📊 CSV数据已保存: ${csvFile}`);

    // 显示抓取结果摘要
    this.displayResults();
  }

  /**
   * 显示抓取结果
   */
  displayResults() {
    console.log("\n📊 抓取结果摘要:");
    console.log("=".repeat(80));

    this.results.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.title}`);
      console.log(`   📅 日期: ${event.date}`);
      console.log(`   📍 地点: ${event.location}`);
      if (event.audience) console.log(`   👥 观众数: ${event.audience}`);
      if (event.fireworks) console.log(`   🎆 花火数: ${event.fireworks}`);
      console.log(`   📄 来源: ${event.source}`);
    });

    console.log("\n" + "=".repeat(80));
    console.log(`✅ 总计抓取到 ${this.results.length} 个花火活动信息`);

    // 统计信息
    const withAudience = this.results.filter((e) => e.audience).length;
    const withFireworks = this.results.filter((e) => e.fireworks).length;
    console.log(`📈 包含观众数信息: ${withAudience}个`);
    console.log(`🎆 包含花火数信息: ${withFireworks}个`);
  }
}

// 主执行函数
async function main() {
  console.log("🎯 WalkerPlus ar0313 花火排行榜数据抓取器");
  console.log("🔧 技术栈: Playwright + Cheerio + Crawlee");
  console.log("⚠️  商业项目要求: 所有信息必须真实，严禁编造\n");

  const scraper = new WalkerPlusAr0313Scraper();

  try {
    await scraper.scrapeData();

    console.log("\n🎉 数据抓取任务完成！");
    console.log("💾 数据已保存到 reports/ 目录");

    if (scraper.results.length >= 10) {
      console.log("✅ 已达到最少10个活动信息的要求");
    } else {
      console.log(
        `⚠️  仅获取到 ${scraper.results.length} 个活动信息，未达到10个的目标`
      );
    }
  } catch (error) {
    console.error(`❌ 抓取失败: ${error.message}`);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = WalkerPlusAr0313Scraper;
