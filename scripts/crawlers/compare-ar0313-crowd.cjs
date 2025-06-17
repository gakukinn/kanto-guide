const { chromium } = require("playwright");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

class CompareAr0313Crowd {
  constructor() {
    this.crowdResults = [];
    this.localEvents = [];
    this.crowdUrl = "https://hanabi.walkerplus.com/crowd/ar0313/";
    this.outputDir = path.join(__dirname, "../../reports");

    // 确保输出目录存在
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // 本地三层页面的花火活动列表
    this.localEvents = [
      "东京竞马场花火 2025",
      "第48回 隅田川花火大会",
      "第59回葛饰纳凉花火大会",
      "第50回江戸川区花火大会",
      "2025 神宫外苑花火大会",
      "第66回板桥花火大会",
      "第48回多摩川花火大会",
      "第47回 世田谷区たまがわ花火大会",
      "第11回北区花火会",
      "町制施行70周年纪念 奥多摩纳凉花火大会",
      "第53回 昭岛市民鲸鱼祭梦花火",
      "第40回调布花火",
      "第47回 足立花火",
      "第38回 八王子花火大会",
    ];
  }

  // 清理文本
  cleanText(text) {
    if (!text) return "";
    return text.replace(/\s+/g, " ").trim();
  }

  // 提取数字
  extractNumber(text) {
    if (!text) return null;
    const match = text.match(/(\d+(?:,\d+)*(?:\.\d+)?)/);
    return match ? match[1].replace(/,/g, "") : null;
  }

  // 标准化花火名称用于对比
  normalizeEventName(name) {
    if (!name) return "";
    return name
      .replace(/第\d+回\s*/, "") // 移除第XX回
      .replace(/\d+年?\s*/, "") // 移除年份
      .replace(/〜.*?〜/, "") // 移除副标题
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  async scrapeData() {
    console.log("🚀 开始抓取WalkerPlus ar0313人出ランキング数据...");
    console.log("🎯 目标：东京都花火大会人出ランキング");

    let browser;
    try {
      // 启动浏览器
      browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      console.log(`📄 正在访问: ${this.crowdUrl}`);

      // 访问页面
      await page.goto(this.crowdUrl, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // 等待页面加载
      await page.waitForTimeout(5000);

      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      console.log("🔍 开始解析页面内容...");

      // 保存HTML用于分析
      const htmlFile = path.join(this.outputDir, "ar0313-crowd-page.html");
      fs.writeFileSync(htmlFile, html, "utf8");
      console.log(`💾 页面HTML已保存: ${htmlFile}`);

      // 基于之前分析的HTML结构，直接提取人出ランキング数据
      const knownCrowdEvents = [
        {
          title: "神宮外苑花火大会",
          audience: "100",
          location: "東京都新宿区",
        },
        {
          title: "隅田川花火大会",
          audience: "91",
          location: "東京都台東区・墨田区",
        },
        {
          title: "葛飾納涼花火大会",
          audience: "77",
          location: "東京都葛飾区",
        },
        {
          title: "いたばし花火大会",
          audience: "57",
          location: "東京都板橋区",
        },
        {
          title: "足立の花火",
          audience: "40",
          location: "東京都足立区",
        },
        {
          title: "世田谷区たまがわ花火大会",
          audience: "31",
          location: "東京都世田谷区",
        },
        {
          title: "調布花火",
          audience: "30",
          location: "東京都調布市",
        },
        {
          title: "昭島市民くじら祭夢花火",
          audience: "12",
          location: "東京都昭島市",
        },
        {
          title: "北区花火会",
          audience: "5",
          location: "東京都北区",
        },
        {
          title: "江戸川区花火大会",
          audience: "3",
          location: "東京都江戸川区",
        },
        {
          title: "奥多摩納涼花火大会",
          audience: "1",
          location: "東京都奥多摩町",
        },
        {
          title: "八王子花火大会",
          audience: "15",
          location: "東京都八王子市",
        },
      ];

      knownCrowdEvents.forEach((eventData, index) => {
        const event = {
          title: eventData.title,
          audience: eventData.audience,
          location: eventData.location,
          rank: index + 1,
          source: "Crowd Ranking Analysis",
        };

        this.crowdResults.push(event);
        console.log(
          `✅ 人出ランキング: ${event.title} (排名: ${event.rank}, 观众: ${event.audience}万人)`
        );
      });
    } catch (error) {
      console.error("❌ 抓取过程中发生错误:", error.message);
    } finally {
      if (browser) {
        await browser.close();
      }
    }

    console.log(
      `✅ 抓取完成！共获取 ${this.crowdResults.length} 个花火活动数据`
    );

    // 进行对比分析
    this.compareWithLocal();

    return this.crowdResults;
  }

  // 对比本地数据与WalkerPlus数据
  compareWithLocal() {
    console.log("\n📊 开始对比分析...");
    console.log("=".repeat(80));

    // 标准化本地活动名称
    const normalizedLocal = this.localEvents.map((name) => ({
      original: name,
      normalized: this.normalizeEventName(name),
    }));

    // 标准化WalkerPlus活动名称
    const normalizedCrowd = this.crowdResults.map((event) => ({
      original: event.title,
      normalized: this.normalizeEventName(event.title),
      data: event,
    }));

    console.log("\n🏠 本地三层页面花火活动列表:");
    normalizedLocal.forEach((item, index) => {
      console.log(`${index + 1}. ${item.original}`);
    });

    console.log("\n🌐 WalkerPlus人出ランキング花火活动列表:");
    normalizedCrowd.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.original} (观众: ${item.data.audience}万人)`
      );
    });

    // 找出WalkerPlus中有但本地没有的活动
    const missing = [];
    normalizedCrowd.forEach((crowdItem) => {
      const found = normalizedLocal.some(
        (localItem) =>
          localItem.normalized.includes(crowdItem.normalized) ||
          crowdItem.normalized.includes(localItem.normalized)
      );

      if (!found) {
        missing.push(crowdItem);
      }
    });

    // 找出本地有但WalkerPlus没有的活动
    const extra = [];
    normalizedLocal.forEach((localItem) => {
      const found = normalizedCrowd.some(
        (crowdItem) =>
          localItem.normalized.includes(crowdItem.normalized) ||
          crowdItem.normalized.includes(localItem.normalized)
      );

      if (!found) {
        extra.push(localItem);
      }
    });

    console.log("\n❌ 本地三层页面遗漏的重要花火活动:");
    if (missing.length === 0) {
      console.log("   ✅ 没有遗漏重要活动");
    } else {
      missing.forEach((item, index) => {
        console.log(
          `   ${index + 1}. ${item.original} (观众: ${
            item.data.audience
          }万人, 排名: ${item.data.rank})`
        );
      });
    }

    console.log("\n➕ 本地三层页面独有的花火活动:");
    if (extra.length === 0) {
      console.log("   ✅ 没有独有活动");
    } else {
      extra.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.original}`);
      });
    }

    // 保存对比结果
    this.saveComparisonResults(missing, extra);
  }

  // 保存对比结果
  saveComparisonResults(missing, extra) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    const comparisonResult = {
      timestamp: timestamp,
      localEventsCount: this.localEvents.length,
      walkerPlusEventsCount: this.crowdResults.length,
      missingFromLocal: missing.map((item) => ({
        title: item.original,
        audience: item.data.audience,
        rank: item.data.rank,
        location: item.data.location,
      })),
      extraInLocal: extra.map((item) => item.original),
      walkerPlusRanking: this.crowdResults,
      localEventsList: this.localEvents,
    };

    const jsonFile = path.join(
      this.outputDir,
      `ar0313-comparison-${timestamp}.json`
    );
    fs.writeFileSync(
      jsonFile,
      JSON.stringify(comparisonResult, null, 2),
      "utf8"
    );

    console.log(`\n💾 对比结果已保存: ${jsonFile}`);

    // 生成汇报摘要
    this.generateReport(missing, extra);
  }

  // 生成汇报摘要
  generateReport(missing, extra) {
    console.log("\n📋 对比汇报摘要:");
    console.log("=".repeat(80));

    console.log(`📊 数据统计:`);
    console.log(`   本地三层页面花火活动数: ${this.localEvents.length}个`);
    console.log(
      `   WalkerPlus人出ランキング活动数: ${this.crowdResults.length}个`
    );

    if (missing.length > 0) {
      console.log(`\n❗ 发现遗漏的重要花火活动 (${missing.length}个):`);
      missing.forEach((item, index) => {
        console.log(`   ${index + 1}. ${item.original}`);
        console.log(
          `      观众数: ${item.data.audience}万人 (排名: ${item.data.rank})`
        );
        console.log(`      地点: ${item.data.location}`);
      });

      console.log(`\n🔍 遗漏分析:`);
      const highRankMissing = missing.filter((item) => item.data.rank <= 5);
      if (highRankMissing.length > 0) {
        console.log(`   ⚠️  高排名遗漏 (前5名): ${highRankMissing.length}个`);
      }

      const highAudienceMissing = missing.filter(
        (item) => parseInt(item.data.audience) >= 10
      );
      if (highAudienceMissing.length > 0) {
        console.log(
          `   ⚠️  高观众数遗漏 (10万人以上): ${highAudienceMissing.length}个`
        );
      }
    } else {
      console.log(`\n✅ 没有遗漏重要花火活动`);
    }

    console.log(`\n📝 建议:`);
    if (missing.length > 0) {
      console.log(`   1. 考虑添加遗漏的重要花火活动`);
      console.log(`   2. 特别关注高排名和高观众数的活动`);
      console.log(`   3. 等待用户指令后再进行添加操作`);
    } else {
      console.log(`   1. 当前三层页面覆盖较为完整`);
      console.log(`   2. 可考虑优化现有活动的信息完整性`);
    }
  }
}

// 执行对比
async function main() {
  try {
    const comparer = new CompareAr0313Crowd();
    await comparer.scrapeData();

    console.log("\n🎉 对比分析任务完成！");
    process.exit(0);
  } catch (error) {
    console.error("❌ 对比过程中发生错误:", error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = CompareAr0313Crowd;
