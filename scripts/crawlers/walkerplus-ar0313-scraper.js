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
    this.targetUrl = "https://hanabi.walkerplus.com/launch/ar0313/";
    this.outputDir = path.join(__dirname, "../../data/walkerplus-crawled");

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
      sourceUrl: this.targetUrl,
      extractedAt: new Date().toISOString(),
    };
  }

  /**
   * 主要抓取函数
   */
  async scrape() {
    console.log("🚀 开始抓取 WalkerPlus ar0313 花火排行榜...");
    console.log(`📍 目标URL: ${this.targetUrl}`);
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

          // 首先尝试提取JSON-LD结构化数据
          const jsonLdScripts = $('script[type="application/ld+json"]');
          console.log(`📊 找到 ${jsonLdScripts.length} 个JSON-LD脚本`);

          jsonLdScripts.each((index, element) => {
            try {
              const jsonData = JSON.parse($(element).html());
              if (
                jsonData["@type"] === "Event" ||
                (Array.isArray(jsonData) &&
                  jsonData.some((item) => item["@type"] === "Event"))
              ) {
                const events = Array.isArray(jsonData)
                  ? jsonData.filter((item) => item["@type"] === "Event")
                  : [jsonData];

                events.forEach((event) => {
                  if (event.name && event.name.includes("花火")) {
                    const hanabi = {
                      title: this.cleanText(event.name),
                      date: event.startDate || event.endDate || "日期待确认",
                      location:
                        event.location?.name ||
                        event.location?.address?.addressLocality ||
                        "地点待确认",
                      audience: this.extractAudienceFromText(
                        event.description || ""
                      ),
                      fireworks: this.extractFireworksFromText(
                        event.description || ""
                      ),
                      detailUrl: event.url || "",
                      sourceUrl: this.targetUrl,
                      extractedAt: new Date().toISOString(),
                      dataSource: "JSON-LD",
                    };

                    if (hanabi.title && hanabi.title.length > 3) {
                      this.results.push(hanabi);
                      console.log(`✅ 从JSON-LD提取: ${hanabi.title}`);
                    }
                  }
                });
              }
            } catch (error) {
              console.log(`⚠️  JSON-LD解析错误: ${error.message}`);
            }
          });

          // 如果JSON-LD数据不足，尝试HTML解析
          if (this.results.length < 5) {
            console.log("🔄 JSON-LD数据不足，开始HTML解析...");

            const listSelectors = [
              ".ranking-list .item",
              ".event-list .item",
              ".hanabi-list .item",
              ".list-item",
              ".event-item",
              ".hanabi-item",
              ".item",
              'li[class*="item"]',
              ".entry",
              ".post",
            ];

            for (const selector of listSelectors) {
              const items = $(selector);
              console.log(
                `🔍 尝试选择器 "${selector}": 找到 ${items.length} 个元素`
              );

              if (items.length > 0) {
                items.each((index, element) => {
                  const hanabi = this.extractFromElement($, element);
                  if (hanabi && hanabi.title && hanabi.title.length > 3) {
                    hanabi.dataSource = "HTML解析";
                    this.results.push(hanabi);
                    console.log(`✅ 从HTML提取: ${hanabi.title}`);
                  }
                });

                if (this.results.length >= 10) break;
              }
            }
          }

          // 如果还是不够，尝试表格数据
          if (this.results.length < 10) {
            console.log("🔄 尝试提取表格数据...");

            $("table tr").each((index, element) => {
              if (index === 0) return; // 跳过表头

              const $row = $(element);
              const cells = $row.find("td");

              if (cells.length >= 2) {
                const firstCell = this.cleanText(cells.eq(0).text());
                const secondCell = this.cleanText(cells.eq(1).text());

                if (firstCell && firstCell.includes("花火")) {
                  const hanabi = {
                    title: firstCell,
                    date: this.extractDateFromText(secondCell),
                    location:
                      cells.length > 2
                        ? this.cleanText(cells.eq(2).text())
                        : "地点待确认",
                    audience: this.extractAudienceFromText($row.text()),
                    fireworks: this.extractFireworksFromText($row.text()),
                    detailUrl: $row.find("a").attr("href") || "",
                    sourceUrl: this.targetUrl,
                    extractedAt: new Date().toISOString(),
                    dataSource: "表格数据",
                  };

                  this.results.push(hanabi);
                  console.log(`✅ 从表格提取: ${hanabi.title}`);
                }
              }
            });
          }
        } catch (error) {
          console.error(`❌ 页面处理错误: ${error.message}`);
        }
      },

      failedRequestHandler: async ({ request, error }) => {
        console.error(`❌ 请求失败: ${request.url} - ${error.message}`);
      },

      maxRequestsPerCrawl: 1,
      headless: true,
      launchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });

    try {
      await crawler.run([this.targetUrl]);

      // 去重处理
      const uniqueResults = [];
      const seenTitles = new Set();

      for (const result of this.results) {
        if (!seenTitles.has(result.title)) {
          seenTitles.add(result.title);
          uniqueResults.push(result);
        }
      }

      this.results = uniqueResults;

      console.log("\n📊 抓取结果统计:");
      console.log(`✅ 成功获取 ${this.results.length} 个花火活动信息`);
      console.log(`📍 目标URL: ${this.targetUrl}`);
      console.log(`⏰ 抓取时间: ${new Date().toLocaleString("zh-CN")}`);

      // 保存数据
      await this.saveResults();

      // 显示详细结果
      this.displayResults();

      return this.results;
    } catch (error) {
      console.error(`❌ 抓取过程出错: ${error.message}`);
      throw error;
    }
  }

  /**
   * 保存抓取结果
   */
  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // 保存JSON格式
    const jsonFile = path.join(
      this.outputDir,
      `ar0313-hanabi-${timestamp}.json`
    );
    fs.writeFileSync(jsonFile, JSON.stringify(this.results, null, 2), "utf8");
    console.log(`💾 JSON数据已保存: ${jsonFile}`);

    // 保存CSV格式
    const csvFile = path.join(this.outputDir, `ar0313-hanabi-${timestamp}.csv`);
    const csvHeader =
      "title,date,location,audience,fireworks,detailUrl,dataSource,extractedAt\n";
    const csvContent = this.results
      .map(
        (item) =>
          `"${item.title}","${item.date}","${item.location}","${item.audience}","${item.fireworks}","${item.detailUrl}","${item.dataSource}","${item.extractedAt}"`
      )
      .join("\n");

    fs.writeFileSync(csvFile, csvHeader + csvContent, "utf8");
    console.log(`📊 CSV数据已保存: ${csvFile}`);

    // 保存最新版本（无时间戳）
    const latestJsonFile = path.join(
      this.outputDir,
      "ar0313-hanabi-latest.json"
    );
    fs.writeFileSync(
      latestJsonFile,
      JSON.stringify(this.results, null, 2),
      "utf8"
    );
    console.log(`🔄 最新数据已更新: ${latestJsonFile}`);
  }

  /**
   * 显示抓取结果
   */
  displayResults() {
    console.log("\n🎆 花火活动详细信息:");
    console.log("=".repeat(80));

    this.results.forEach((hanabi, index) => {
      console.log(`\n${index + 1}. ${hanabi.title}`);
      console.log(`   📅 日期: ${hanabi.date}`);
      console.log(`   📍 地点: ${hanabi.location}`);
      console.log(`   👥 观众数: ${hanabi.audience}`);
      console.log(`   🎆 花火数: ${hanabi.fireworks}`);
      console.log(`   🔗 详情: ${hanabi.detailUrl}`);
      console.log(`   📊 数据源: ${hanabi.dataSource}`);
    });

    console.log("\n" + "=".repeat(80));
    console.log(`📈 总计获取 ${this.results.length} 个真实花火活动信息`);
    console.log("✅ 所有信息均来自官方WalkerPlus网站，确保数据真实性");
  }
}

// 主执行函数
async function main() {
  console.log("🎯 WalkerPlus ar0313 花火排行榜数据抓取器");
  console.log("🔧 技术栈: Playwright + Cheerio + Crawlee");
  console.log("⚠️  商业项目要求: 所有信息必须真实，严禁编造\n");

  const scraper = new WalkerPlusAr0313Scraper();

  try {
    const results = await scraper.scrape();

    console.log("\n🎉 抓取任务完成!");
    console.log(`📊 成功获取 ${results.length} 个花火活动信息`);
    console.log("💾 数据已保存到 data/walkerplus-crawled/ 目录");

    if (results.length >= 10) {
      console.log("✅ 已达到最少10个活动信息的要求");
    } else {
      console.log(
        `⚠️  仅获取到 ${results.length} 个活动信息，未达到10个的目标`
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

module.exports = { WalkerPlusAr0313Scraper };
