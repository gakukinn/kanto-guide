const { PlaywrightCrawler } = require("crawlee");
const cheerio = require("cheerio");
const fs = require("fs").promises;
const path = require("path");

// 北关东地区URL配置
const KITAKANTO_URLS = {
  tochigi: "https://hanabi.walkerplus.com/launch/ar0309/", // 栃木县
  gunma: "https://hanabi.walkerplus.com/launch/ar0310/", // 群马县
  ibaraki: "https://hanabi.walkerplus.com/launch/ar0308/", // 茨城县
};

// 存储爬取的数据
let crawledData = [];

// 创建Playwright爬虫
const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request, log }) => {
    const url = request.url;
    const region = getRegionFromUrl(url);

    log.info(`正在爬取 ${region} 地区花火大会排行榜: ${url}`);

    try {
      // 等待页面加载完成
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(3000);

      // 获取页面HTML内容
      const html = await page.content();
      const $ = cheerio.load(html);

      // 解析花火大会数据
      const hanabiEvents = parseHanabiData($, region, log);

      log.info(`${region} 地区获取到 ${hanabiEvents.length} 个花火大会信息`);

      // 添加到总数据中
      crawledData.push(...hanabiEvents);
    } catch (error) {
      log.error(`爬取 ${region} 地区数据时出错:`, error);
    }
  },

  // 配置选项
  maxRequestsPerCrawl: 10,
  requestHandlerTimeoutSecs: 60,
  navigationTimeoutSecs: 30,
  headless: true,

  // 浏览器配置
  launchContext: {
    launchOptions: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    },
  },
});

// 根据URL获取地区名称
function getRegionFromUrl(url) {
  if (url.includes("ar0309")) return "栃木县";
  if (url.includes("ar0310")) return "群马县";
  if (url.includes("ar0308")) return "茨城县";
  return "未知地区";
}

// 解析花火大会数据
function parseHanabiData($, region, log) {
  const events = [];

  try {
    // 查找花火大会列表项 - 使用更精确的选择器
    const eventItems = $("li").filter((i, el) => {
      const $el = $(el);
      const text = $el.text();
      return text.includes("花火大会") && text.includes("打ち上げ数");
    });

    console.log(`在 ${region} 找到 ${eventItems.length} 个可能的花火大会项目`);

    eventItems.each((index, element) => {
      if (events.length >= 5) return false; // 只取前5名

      const $item = $(element);
      const text = $item.text();

      // 提取基本信息
      const event = extractEventInfo($item, text, region, index + 1);

      if (event && event.title) {
        events.push(event);
        console.log(`提取到活动: ${event.title}`);
      }
    });

    // 如果没有找到足够数据，尝试其他方法
    if (events.length === 0) {
      console.log(`${region} 使用备用解析方法...`);

      // 尝试查找包含花火大会信息的所有元素
      $("*").each((i, el) => {
        if (events.length >= 5) return false;

        const $el = $(el);
        const text = $el.text();

        if (
          text.includes("花火大会") &&
          text.includes("打ち上げ数") &&
          text.length > 50
        ) {
          const event = extractEventInfo($el, text, region, events.length + 1);
          if (
            event &&
            event.title &&
            !events.find((e) => e.title === event.title)
          ) {
            events.push(event);
            console.log(`备用方法提取到活动: ${event.title}`);
          }
        }
      });
    }
  } catch (error) {
    console.error(`解析 ${region} 数据时出错:`, error);
  }

  return events.slice(0, 5); // 确保只返回前5名
}

// 提取事件信息
function extractEventInfo($item, text, region, rank) {
  try {
    // 提取标题
    let title = "";

    // 尝试多种方式提取标题
    const titlePatterns = [
      /第?\d*回?\s*([^期間]+?)花火大会/,
      /([^期間]*?花火大会)/,
      /([^期間]*?大花火大会)/,
    ];

    for (const pattern of titlePatterns) {
      const match = text.match(pattern);
      if (match) {
        title = match[0].trim();
        break;
      }
    }

    if (!title) {
      // 从HTML元素中查找标题
      const titleElement = $item
        .find('h1, h2, h3, h4, .title, [class*="title"]')
        .first();
      if (titleElement.length) {
        title = titleElement.text().trim();
      }
    }

    if (!title || title.length < 3) return null;

    // 提取日期
    let date = "";
    const datePatterns = [
      /期間[：:]\s*(\d{4}年\d{1,2}月\d{1,2}日[^例年]*)/,
      /(\d{4}年\d{1,2}月\d{1,2}日)/,
    ];

    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        date = match[1].trim();
        break;
      }
    }

    // 提取地点
    let location = "";
    const locationPatterns = [
      new RegExp(`${region}[・･]([^期間]*?[市町村区][^期間]*?)期間`),
      new RegExp(`${region}[・･]([^期間]*?[市町村区][^期間]*?)例年`),
      /([^期間]*?[市町村区][^期間]*?)[期間例年]/,
    ];

    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        location = match[1].trim();
        if (!location.includes(region)) {
          location = `${region}・${location}`;
        }
        break;
      }
    }

    // 提取观众数
    let visitors = "";
    const visitorsPatterns = [
      /例年の人出[：:]\s*約?([^行打]*?)人/,
      /人出[：:]\s*約?([^行打]*?)人/,
    ];

    for (const pattern of visitorsPatterns) {
      const match = text.match(pattern);
      if (match) {
        visitors = match[1].trim() + "人";
        break;
      }
    }

    // 提取花火数
    let fireworksCount = "";
    const fireworksPatterns = [
      /打ち上げ数[：:]\s*約?([^有料]*?)発/,
      /約?([0-9万千百十]+)発/,
    ];

    for (const pattern of fireworksPatterns) {
      const match = text.match(pattern);
      if (match) {
        fireworksCount = match[1].trim() + "发";
        break;
      }
    }

    return {
      rank: rank,
      title: title,
      date: date || "日期待确认",
      location: location || `${region}・地点待确认`,
      visitors: visitors || "观众数待确认",
      fireworksCount: fireworksCount || "花火数待确认",
      region: region,
      source: "WalkerPlus",
      crawledAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("提取事件信息时出错:", error);
    return null;
  }
}

// 保存数据到文件
async function saveData() {
  try {
    // 确保data目录存在
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    // 按地区分组数据
    const groupedData = {
      summary: {
        totalEvents: crawledData.length,
        regions: Object.keys(KITAKANTO_URLS),
        crawledAt: new Date().toISOString(),
      },
      events: crawledData,
    };

    // 保存到JSON文件
    const filename = `kitakanto-hanabi-ranking-${
      new Date().toISOString().split("T")[0]
    }.json`;
    const filepath = path.join(dataDir, filename);

    await fs.writeFile(filepath, JSON.stringify(groupedData, null, 2), "utf8");

    console.log(`\n✅ 数据已保存到: ${filepath}`);
    console.log(`📊 总共获取了 ${crawledData.length} 个花火大会活动信息`);

    // 按地区统计
    const regionStats = {};
    crawledData.forEach((event) => {
      regionStats[event.region] = (regionStats[event.region] || 0) + 1;
    });

    console.log("\n📈 各地区统计:");
    Object.entries(regionStats).forEach(([region, count]) => {
      console.log(`   ${region}: ${count} 个活动`);
    });

    return groupedData;
  } catch (error) {
    console.error("保存数据时出错:", error);
    throw error;
  }
}

// 主函数
async function main() {
  console.log("🚀 开始爬取北关东地区花火大会排行榜数据...");
  console.log("📍 目标地区: 栃木县、群马县、茨城县");
  console.log("🎯 技术栈: Playwright + Cheerio + Crawlee\n");

  try {
    // 添加所有URL到爬虫队列
    const urls = Object.values(KITAKANTO_URLS);
    await crawler.addRequests(urls);

    // 开始爬取
    await crawler.run();

    // 保存数据
    const result = await saveData();

    console.log("\n🎉 爬取任务完成!");
    console.log(`✨ 成功获取 ${result.totalEvents} 个花火大会活动的详细信息`);

    // 显示部分数据预览
    if (crawledData.length > 0) {
      console.log("\n📋 数据预览 (前3个活动):");
      crawledData.slice(0, 3).forEach((event, index) => {
        console.log(`\n${index + 1}. ${event.title}`);
        console.log(`   地区: ${event.region}`);
        console.log(`   日期: ${event.date}`);
        console.log(`   地点: ${event.location}`);
        console.log(`   观众数: ${event.visitors}`);
        console.log(`   花火数: ${event.fireworksCount}`);
      });
    }

    return result;
  } catch (error) {
    console.error("❌ 爬取过程中出现错误:", error);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, crawledData };
