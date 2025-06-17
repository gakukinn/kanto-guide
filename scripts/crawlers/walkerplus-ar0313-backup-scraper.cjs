const { chromium } = require("playwright");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

class WalkerPlusAr0313BackupScraper {
  constructor() {
    this.results = [];
    this.baseUrl = "https://hanabi.walkerplus.com/launch/ar0313/";
    this.outputDir = path.join(__dirname, "../../reports");

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // 智能文本解析 - 提取数字信息
  extractNumbers(text) {
    if (!text) return null;

    // 匹配各种数字格式
    const patterns = [
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*万人/, // 万人格式
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*人/, // 人数格式
      /(\d+(?:,\d+)*(?:\.\d+)?)\s*発/, // 花火数格式
      /(\d+(?:,\d+)*(?:\.\d+)?)/, // 纯数字
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].replace(/,/g, "");
      }
    }
    return null;
  }

  // 智能日期解析
  parseDate(text) {
    if (!text) return null;

    // 日期格式匹配
    const datePatterns = [
      /(\d{4})年(\d{1,2})月(\d{1,2})日/,
      /(\d{1,2})\/(\d{1,2})/,
      /(\d{1,2})月(\d{1,2})日/,
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes("年")) {
          return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(
            2,
            "0"
          )}`;
        } else if (pattern.source.includes("月")) {
          return `2025-${match[1].padStart(2, "0")}-${match[2].padStart(
            2,
            "0"
          )}`;
        } else {
          return `2025-${match[1].padStart(2, "0")}-${match[2].padStart(
            2,
            "0"
          )}`;
        }
      }
    }
    return text;
  }

  // 清理文本
  cleanText(text) {
    if (!text) return "";
    return text.replace(/\s+/g, " ").trim();
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

  async scrapeData() {
    console.log("🚀 开始抓取WalkerPlus ar0313花火数据...");
    console.log("🔧 使用纯Playwright+Cheerio技术栈（备用方案）");

    let browser;
    try {
      // 启动浏览器
      browser = await chromium.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // 设置用户代理
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );

      console.log(`📄 正在访问: ${this.baseUrl}`);

      // 访问页面
      await page.goto(this.baseUrl, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // 等待页面加载
      await page.waitForTimeout(3000);

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
        ".ranking-item",
        ".list-item",
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

      // 方法5: 链接解析（如果有详情页链接）
      const links = $('a[href*="hanabi"], a[href*="event"]');
      if (links.length > 0) {
        console.log(`🔗 发现 ${links.length} 个相关链接`);
        // 这里可以进一步抓取详情页，但为了简化先跳过
      }
    } catch (error) {
      console.error("❌ 抓取过程中发生错误:", error.message);
    } finally {
      if (browser) {
        await browser.close();
      }
    }

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
      date: this.parseDate(jsonData.startDate || jsonData.date || ""),
      location: jsonData.location?.name || jsonData.location?.address || "",
      description: jsonData.description || "",
      audience: this.extractNumbers(jsonData.description || ""),
      fireworks: this.extractNumbers(jsonData.description || ""),
      source: "JSON-LD",
    };

    if (this.validateData(event)) {
      this.results.push(event);
      console.log(`✅ JSON-LD数据: ${event.title}`);
    }
  }

  // 处理事件项目
  processEventItem($, item) {
    const title = this.cleanText(
      item.find("h1, h2, h3, h4, .title, .name").first().text() ||
        item.find("a").first().text() ||
        item.find(".event-title, .hanabi-title").first().text()
    );

    const dateText =
      item.find(".date, .time, .when, .schedule").text() || item.text();
    const date = this.parseDate(dateText);

    const location = this.cleanText(
      item.find(".location, .place, .where, .venue").text() ||
        item.find('span:contains("会場"), span:contains("場所")').text()
    );

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
      description: this.cleanText(
        item.find(".description, .detail, .summary").text()
      ),
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
          const text = this.cleanText($(cell).text());
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
            event.date = this.parseDate(text);
          } else if (
            header.includes("場所") ||
            header.includes("会場") ||
            j === 2
          ) {
            event.location = text;
          } else if (text.includes("人")) {
            event.audience = this.extractNumbers(text);
          } else if (text.includes("発")) {
            event.fireworks = this.extractNumbers(text);
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

    $("div, section, article, p, li").each((i, elem) => {
      const text = $(elem).text();
      const hasKeyword = keywords.some((keyword) => text.includes(keyword));

      if (hasKeyword && text.length > 20 && text.length < 500) {
        // 尝试从文本中提取结构化信息
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);

        if (lines.length >= 2) {
          const event = {
            title: this.cleanText(lines[0]),
            date: this.parseDate(
              lines.find(
                (line) =>
                  line.includes("月") ||
                  line.includes("日") ||
                  line.match(/\d+\/\d+/)
              ) || ""
            ),
            location: this.cleanText(
              lines.find(
                (line) =>
                  line.includes("会場") ||
                  line.includes("場所") ||
                  line.includes("公園")
              ) ||
                lines[1] ||
                ""
            ),
            audience: this.extractNumbers(
              text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*万?人/)?.[0]
            ),
            fireworks: this.extractNumbers(
              text.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*発/)?.[0]
            ),
            description: text.substring(0, 200),
            source: "General Content",
          };

          if (this.validateData(event) && event.title.length > 3) {
            this.results.push(event);
            console.log(`✅ 通用内容: ${event.title}`);
          }
        }
      }
    });
  }

  // 保存结果
  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    console.log(`💾 数据已保存:`);

    // 保存JSON格式
    const jsonFile = path.join(
      this.outputDir,
      `walkerplus-ar0313-backup-${timestamp}.json`
    );
    fs.writeFileSync(jsonFile, JSON.stringify(this.results, null, 2), "utf8");
    console.log(`   JSON: ${jsonFile}`);

    // 保存CSV格式
    const csvFile = path.join(
      this.outputDir,
      `walkerplus-ar0313-backup-${timestamp}.csv`
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
    console.log(`   CSV: ${csvFile}`);

    // 显示抓取结果摘要
    this.displayResults();
  }

  // 显示结果摘要
  displayResults() {
    console.log("\n📊 抓取结果摘要:");
    console.log("=".repeat(80));

    this.results.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.title}`);
      console.log(`   📅 日期: ${event.date}`);
      console.log(`   📍 地点: ${event.location}`);
      if (event.audience) console.log(`   👥 观众数: ${event.audience}人`);
      if (event.fireworks) console.log(`   🎆 花火数: ${event.fireworks}发`);
      console.log(`   📄 来源: ${event.source}`);
    });

    console.log("\n=".repeat(80));
    console.log(`✅ 总计抓取到 ${this.results.length} 个花火活动信息`);

    // 统计信息
    const withAudience = this.results.filter((e) => e.audience).length;
    const withFireworks = this.results.filter((e) => e.fireworks).length;
    console.log(`📈 包含观众数信息: ${withAudience}个`);
    console.log(`🎆 包含花火数信息: ${withFireworks}个`);
  }
}

// 执行抓取
async function main() {
  try {
    const scraper = new WalkerPlusAr0313BackupScraper();
    await scraper.scrapeData();

    console.log("\n🎉 数据抓取任务完成！");

    if (scraper.results.length >= 10) {
      console.log("✅ 已达到最少10个活动信息的要求");
    } else {
      console.log(
        `⚠️  仅获取到 ${scraper.results.length} 个活动信息，未达到10个的目标`
      );
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ 抓取过程中发生错误:", error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = WalkerPlusAr0313BackupScraper;
