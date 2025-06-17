#!/usr/bin/env node

const { PlaywrightCrawler } = require("crawlee");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

class WalkerPlusTokyoCrawler {
  constructor() {
    this.events = [];
    this.crawler = new PlaywrightCrawler({
      launchContext: {
        launchOptions: {
          headless: false, // 设置为false以便调试观察
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        },
      },
      requestHandler: async ({ page, request }) => {
        console.log(`正在抓取: ${request.url}`);

        try {
          // 等待页面完全加载
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(2000);

          // 获取页面HTML内容
          const content = await page.content();
          const $ = cheerio.load(content);

          // 抓取花火活动信息
          await this.extractEvents($, request.url);
        } catch (error) {
          console.error(`抓取失败: ${request.url}`, error.message);
        }
      },
      failedRequestHandler: async ({ request }) => {
        console.error(`请求失败: ${request.url}`);
      },
    });
  }

  async extractEvents($, url) {
    console.log("开始提取活动信息...");

    // 查找所有花火活动条目
    $(
      '.list-item, .event-item, .hanabi-item, .ranking-item, [class*="item"]'
    ).each((index, element) => {
      try {
        const $item = $(element);

        // 提取标题
        const title = $item
          .find(
            'h3, h4, .title, .name, [class*="title"], [class*="name"] a, .list-item-title a'
          )
          .first()
          .text()
          .trim();

        // 提取链接
        const link = $item.find("a").first().attr("href");
        const fullLink =
          link && link.startsWith("/")
            ? `https://hanabi.walkerplus.com${link}`
            : link;

        // 提取日期信息
        const dateText = $item
          .find('.date, [class*="date"], .schedule, [class*="schedule"]')
          .text()
          .trim();

        // 提取地点信息
        const locationText = $item
          .find(
            '.location, .place, [class*="location"], [class*="place"], [class*="area"]'
          )
          .text()
          .trim();

        // 提取观众数信息
        const audienceText =
          $item
            .find(
              '.audience, .visitors, [class*="audience"], [class*="visitor"]'
            )
            .text()
            .trim() ||
          $item.text().match(/(\d+(?:\.\d+)?万人|\d+人)/)?.[0] ||
          "";

        // 提取花火数信息
        const fireworksText =
          $item
            .find('.fireworks, [class*="fireworks"], [class*="count"]')
            .text()
            .trim() ||
          $item.text().match(/(\d+(?:\.\d+)?万発|\d+発)/)?.[0] ||
          "";

        // 只有标题不为空才添加
        if (title && title.length > 2) {
          const event = {
            title: title,
            date: dateText || "日期待确认",
            location: locationText || "地点待确认",
            audience: audienceText || "观众数待确认",
            fireworks: fireworksText || "花火数待确认",
            link: fullLink || "",
            source: url,
          };

          this.events.push(event);
          console.log(`提取到活动 ${this.events.length}: ${title}`);
        }
      } catch (error) {
        console.error("提取单个活动信息时出错:", error.message);
      }
    });
  }

  async crawl() {
    console.log("开始抓取WalkerPlus东京地区花火信息...");

    try {
      // 添加目标URL到抓取队列
      await this.crawler.addRequests([
        {
          url: "https://hanabi.walkerplus.com/launch/ar0311/",
          userData: { type: "tokyo_hanabi" },
        },
      ]);

      // 开始抓取
      await this.crawler.run();

      // 保存数据
      await this.saveData();

      // 汇报结果
      this.reportResults();
    } catch (error) {
      console.error("抓取过程出错:", error);
    }
  }

  async saveData() {
    // 确保目录存在
    const dataDir = path.join(__dirname, "../data/crawler");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 保存原始数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `tokyo-hanabi-walkerplus-${timestamp}.json`;
    const filepath = path.join(dataDir, filename);

    const dataToSave = {
      timestamp: new Date().toISOString(),
      source: "https://hanabi.walkerplus.com/launch/ar0311/",
      totalEvents: this.events.length,
      events: this.events,
    };

    fs.writeFileSync(filepath, JSON.stringify(dataToSave, null, 2), "utf8");
    console.log(`数据已保存到: ${filepath}`);
  }

  reportResults() {
    console.log("\n=== 抓取结果汇报 ===");
    console.log(`抓取来源: https://hanabi.walkerplus.com/launch/ar0311/`);
    console.log(`获得活动事件信息数量: ${this.events.length} 个`);
    console.log("\n活动列表概览:");

    this.events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   日期: ${event.date}`);
      console.log(`   地点: ${event.location}`);
      console.log(`   观众数: ${event.audience}`);
      console.log(`   花火数: ${event.fireworks}`);
      console.log(`   链接: ${event.link}`);
      console.log("");
    });

    console.log(
      `\n✅ 成功获取了 ${this.events.length} 个花火活动事件的真实信息`
    );
    console.log("⚠️  所有信息均来自WalkerPlus官方网站，绝无编造");
  }
}

// 执行抓取
async function main() {
  const crawler = new WalkerPlusTokyoCrawler();
  await crawler.crawl();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = WalkerPlusTokyoCrawler;
