const { chromium } = require("playwright");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function testScrape() {
  console.log("🚀 开始简单测试抓取...");

  let browser;
  try {
    // 启动浏览器
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    console.log("📄 正在访问页面...");

    // 访问页面
    await page.goto("https://hanabi.walkerplus.com/launch/ar0313/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // 等待页面加载
    await page.waitForTimeout(5000);

    // 获取页面标题
    const title = await page.title();
    console.log(`📋 页面标题: ${title}`);

    // 获取页面HTML
    const html = await page.content();
    const $ = cheerio.load(html);

    console.log("🔍 开始解析页面内容...");

    // 查找所有链接
    const links = $("a");
    console.log(`🔗 找到 ${links.length} 个链接`);

    // 查找包含花火的文本
    const hanabiTexts = [];
    $("*").each((i, elem) => {
      const text = $(elem).text();
      if (text.includes("花火") && text.length < 200 && text.length > 10) {
        hanabiTexts.push(text.trim());
      }
    });

    console.log(`🎆 找到 ${hanabiTexts.length} 个包含花火的文本块`);

    // 显示前10个
    hanabiTexts.slice(0, 10).forEach((text, index) => {
      console.log(`${index + 1}. ${text}`);
    });

    // 保存HTML到文件用于分析
    const outputDir = path.join(__dirname, "../../reports");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const htmlFile = path.join(outputDir, "ar0313-page-content.html");
    fs.writeFileSync(htmlFile, html, "utf8");
    console.log(`💾 页面HTML已保存: ${htmlFile}`);

    // 保存花火文本
    const textFile = path.join(outputDir, "ar0313-hanabi-texts.json");
    fs.writeFileSync(textFile, JSON.stringify(hanabiTexts, null, 2), "utf8");
    console.log(`💾 花火文本已保存: ${textFile}`);
  } catch (error) {
    console.error("❌ 测试过程中发生错误:", error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  console.log("✅ 测试完成！");
}

// 运行测试
if (require.main === module) {
  testScrape();
}

module.exports = testScrape;
