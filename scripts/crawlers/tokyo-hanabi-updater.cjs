const { chromium } = require("playwright");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

/**
 * 东京花火大会数据更新器
 * 从WalkerPlus抓取最新数据并更新页面文件
 */
class TokyoHanabiUpdater {
  constructor() {
    this.baseUrl = "https://hanabi.walkerplus.com/launch/ar0313/";
    this.targetFile = path.join(
      __dirname,
      "../../src/app/tokyo/hanabi/page.tsx"
    );
    this.browser = null;
    this.page = null;
  }

  async init() {
    console.log("🚀 启动浏览器...");
    this.browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();

    // 设置用户代理
    await this.page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    });
  }

  async scrapeHanabiData() {
    console.log("📡 访问WalkerPlus东京花火页面...");
    await this.page.goto(this.baseUrl, { waitUntil: "networkidle" });

    // 等待页面加载完成
    await this.page.waitForSelector("main", { timeout: 10000 });

    const html = await this.page.content();
    const $ = cheerio.load(html);

    const hanabiData = [];

    // 抓取花火大会列表
    $("main li").each((index, element) => {
      const $item = $(element);
      const $link = $item.find("a");

      if ($link.length === 0) return;

      const title = $item.find("h2").text().trim();
      if (!title) return;

      // 提取基本信息
      const description = $item.find("h3").text().trim();
      const location = $item.find('div:contains("東京都")').text().trim();

      // 提取日期
      const dateText = $item.find('div:contains("期間：")').text();
      const dateMatch = dateText.match(/期間：(.+)/);
      const date = dateMatch ? dateMatch[1].trim() : "";

      // 提取观众数
      const crowdText = $item.find('li:contains("例年の人出：")').text();
      const crowdMatch = crowdText.match(/例年の人出：(.+)/);
      const expectedVisitors = crowdMatch ? crowdMatch[1].trim() : "";

      // 提取花火数
      const fireworksText = $item.find('li:contains("打ち上げ数：")').text();
      const fireworksMatch = fireworksText.match(/打ち上げ数：(.+)/);
      const fireworksCount = fireworksMatch ? fireworksMatch[1].trim() : "";

      // 提取详细地点
      const locationText = $item
        .find("div")
        .filter((i, el) => {
          return $(el).text().includes("東京都・");
        })
        .text()
        .trim();

      if (title && (date || expectedVisitors || fireworksCount)) {
        hanabiData.push({
          title,
          description,
          date,
          location: locationText || location,
          expectedVisitors,
          fireworksCount,
          rawHtml: $item.html(), // 保存原始HTML用于调试
        });
      }
    });

    console.log(`✅ 成功抓取 ${hanabiData.length} 个花火大会数据`);
    return hanabiData;
  }

  async updatePageFile(hanabiData) {
    console.log("📝 读取现有页面文件...");
    const fileContent = await fs.readFile(this.targetFile, "utf8");

    // 创建映射表，将WalkerPlus数据映射到现有活动
    const mappings = this.createMappings(hanabiData);

    let updatedContent = fileContent;
    let updateCount = 0;

    // 更新每个映射的活动
    for (const [walkerData, existingId] of mappings) {
      if (existingId) {
        const updated = this.updateEventData(
          updatedContent,
          existingId,
          walkerData
        );
        if (updated !== updatedContent) {
          updatedContent = updated;
          updateCount++;
          console.log(`✅ 更新活动: ${existingId} -> ${walkerData.title}`);
        }
      }
    }

    if (updateCount > 0) {
      await fs.writeFile(this.targetFile, updatedContent, "utf8");
      console.log(`🎉 成功更新 ${updateCount} 个活动的数据`);
    } else {
      console.log("ℹ️ 没有找到需要更新的数据");
    }

    return updateCount;
  }

  createMappings(walkerData) {
    // 创建WalkerPlus数据与现有活动ID的映射
    const mappings = [];

    for (const data of walkerData) {
      let existingId = null;

      // 根据标题匹配现有活动
      if (data.title.includes("隅田川花火大会")) {
        existingId = "sumida-river-48";
      } else if (data.title.includes("葛飾納涼花火大会")) {
        existingId = "katsushika-59";
      } else if (data.title.includes("いたばし花火大会")) {
        existingId = "itabashi-66";
      } else if (data.title.includes("足立の花火")) {
        existingId = "adachi-47";
      } else if (data.title.includes("東京競馬場花火")) {
        existingId = "tokyo-keiba-2025";
      } else if (data.title.includes("江戸川区花火大会")) {
        existingId = "edogawa-50";
      } else if (data.title.includes("神宮外苑花火大会")) {
        existingId = "jingu-gaien-2025";
      } else if (data.title.includes("調布花火")) {
        existingId = "chofu-hanabi-2025";
      } else if (data.title.includes("北区花火会")) {
        existingId = "kita-hanabi-11";
      } else if (data.title.includes("世田谷区たまがわ花火大会")) {
        existingId = "setagaya-tamagawa-47";
      } else if (data.title.includes("八王子花火大会")) {
        existingId = "hachioji-hanabi";
      } else if (data.title.includes("立川まつり")) {
        existingId = "tachikawa-showa";
      } else if (data.title.includes("御蔵島花火大会")) {
        existingId = "mikurajima-hanabi";
      } else if (data.title.includes("神津島")) {
        existingId = "kozushima-hanabi";
      } else if (data.title.includes("奥多摩")) {
        existingId = "okutama-70th";
      } else if (data.title.includes("昭島市民")) {
        existingId = "akishima-kujira-53";
      } else if (data.title.includes("多摩川花火大会")) {
        existingId = "tamagawa-48";
      }

      mappings.push([data, existingId]);
    }

    return mappings;
  }

  updateEventData(content, eventId, walkerData) {
    // 查找对应的事件对象
    const eventRegex = new RegExp(
      `{[^}]*id:\\s*["']${eventId}["'][^}]*}`,
      "gs"
    );
    const match = content.match(eventRegex);

    if (!match) {
      console.log(`⚠️ 未找到活动ID: ${eventId}`);
      return content;
    }

    const eventObject = match[0];
    let updatedEvent = eventObject;

    // 更新日期
    if (walkerData.date) {
      const cleanDate = this.cleanDate(walkerData.date);
      updatedEvent = updatedEvent.replace(
        /date:\s*["'][^"']*["']/,
        `date: "${cleanDate}"`
      );
    }

    // 更新地点
    if (walkerData.location) {
      const cleanLocation = this.cleanLocation(walkerData.location);
      updatedEvent = updatedEvent.replace(
        /location:\s*["'][^"']*["']/,
        `location: "${cleanLocation}"`
      );
      // 同时更新venue字段
      updatedEvent = updatedEvent.replace(
        /venue:\s*["'][^"']*["']/,
        `venue: "${cleanLocation}"`
      );
    }

    // 更新观众数
    if (walkerData.expectedVisitors) {
      const cleanVisitors = this.cleanVisitors(walkerData.expectedVisitors);
      updatedEvent = updatedEvent.replace(
        /expectedVisitors:\s*["'][^"']*["']/,
        `expectedVisitors: "${cleanVisitors}"`
      );
    }

    // 更新花火数
    if (walkerData.fireworksCount) {
      const cleanFireworks = this.cleanFireworks(walkerData.fireworksCount);
      if (cleanFireworks) {
        updatedEvent = updatedEvent.replace(
          /fireworksCount:\s*\d+/,
          `fireworksCount: ${cleanFireworks}`
        );
      }
    }

    return content.replace(eventObject, updatedEvent);
  }

  cleanDate(dateStr) {
    // 清理日期格式
    return dateStr
      .replace(/期間：/, "")
      .replace(/\([^)]*\)/g, "") // 移除括号内容
      .trim();
  }

  cleanLocation(locationStr) {
    // 清理地点格式
    return locationStr
      .replace(/東京都・[^/]*\//, "") // 移除"東京都・区名/"
      .trim();
  }

  cleanVisitors(visitorsStr) {
    // 清理观众数格式
    return visitorsStr.replace(/例年の人出：/, "").trim();
  }

  cleanFireworks(fireworksStr) {
    // 清理花火数格式，提取数字
    const match = fireworksStr.match(/([0-9,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ""));
    }
    return null;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      console.log("🔒 浏览器已关闭");
    }
  }

  async run() {
    try {
      await this.init();
      const hanabiData = await this.scrapeHanabiData();

      if (hanabiData.length > 0) {
        const updateCount = await this.updatePageFile(hanabiData);

        // 保存抓取的原始数据用于调试
        await fs.writeFile(
          path.join(__dirname, "tokyo-hanabi-scraped-data.json"),
          JSON.stringify(hanabiData, null, 2),
          "utf8"
        );

        console.log("📊 抓取数据已保存到: tokyo-hanabi-scraped-data.json");
        return updateCount;
      } else {
        console.log("❌ 没有抓取到有效数据");
        return 0;
      }
    } catch (error) {
      console.error("❌ 更新过程中出现错误:", error);
      throw error;
    } finally {
      await this.close();
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const updater = new TokyoHanabiUpdater();
  updater
    .run()
    .then((updateCount) => {
      console.log(`\n🎉 更新完成！共更新了 ${updateCount} 个活动`);
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ 更新失败:", error);
      process.exit(1);
    });
}

module.exports = TokyoHanabiUpdater;
