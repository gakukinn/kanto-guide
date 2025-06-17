import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function debugWalkerPlusStructure() {
  console.log('🔍 调试WalkerPlus页面结构');
  console.log('============================================================');

  const browser = await chromium.launch({
    headless: false, // 显示浏览器窗口以便调试
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    console.log('🌐 访问WalkerPlus东京地区页面...');
    const targetUrl = 'https://hanabi.walkerplus.com/launch/ar0313/';

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    console.log('📄 页面加载完成，等待内容...');
    await page.waitForTimeout(5000); // 等待更长时间

    // 获取页面标题
    const title = await page.title();
    console.log(`📄 页面标题: ${title}`);

    // 获取页面HTML结构的关键部分
    const pageInfo = await page.evaluate(() => {
      // 获取所有可能的花火大会容器
      const allDivs = document.querySelectorAll('div');
      const allArticles = document.querySelectorAll('article');
      const allSections = document.querySelectorAll('section');
      const allLi = document.querySelectorAll('li');

      // 查找包含"花火"的元素
      const hanabiElements = [];
      const allElements = document.querySelectorAll('*');

      allElements.forEach((el, index) => {
        const text = el.textContent;
        if (text && text.includes('花火') && text.length < 200) {
          hanabiElements.push({
            tagName: el.tagName,
            className: el.className,
            text: text.substring(0, 100),
            outerHTML: el.outerHTML.substring(0, 300),
          });
        }
      });

      return {
        totalDivs: allDivs.length,
        totalArticles: allArticles.length,
        totalSections: allSections.length,
        totalLi: allLi.length,
        hanabiElements: hanabiElements.slice(0, 10), // 只取前10个
        bodyHTML: document.body.innerHTML.substring(0, 2000),
      };
    });

    console.log('\n📊 页面结构分析:');
    console.log(`📦 DIV元素数量: ${pageInfo.totalDivs}`);
    console.log(`📝 ARTICLE元素数量: ${pageInfo.totalArticles}`);
    console.log(`📄 SECTION元素数量: ${pageInfo.totalSections}`);
    console.log(`📋 LI元素数量: ${pageInfo.totalLi}`);

    console.log('\n🎆 包含"花火"的元素:');
    pageInfo.hanabiElements.forEach((el, index) => {
      console.log(`\n${index + 1}. 标签: ${el.tagName}, 类名: ${el.className}`);
      console.log(`   文本: ${el.text}`);
      console.log(`   HTML: ${el.outerHTML}`);
    });

    // 保存完整页面HTML到文件
    const outputDir = path.join(path.dirname(__dirname), 'debug-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const htmlFile = path.join(outputDir, 'walkerplus-tokyo-page.html');
    const fullHTML = await page.content();
    fs.writeFileSync(htmlFile, fullHTML, 'utf8');

    console.log(`\n💾 完整页面HTML已保存到: ${htmlFile}`);

    // 等待用户观察
    console.log('\n⏳ 浏览器窗口将保持打开60秒供您观察...');
    await page.waitForTimeout(60000);
  } catch (error) {
    console.error('❌ 调试过程中出现错误:', error);
    throw error;
  } finally {
    await browser.close();
    console.log('🔒 浏览器已关闭');
  }
}

// 执行调试
debugWalkerPlusStructure()
  .then(() => {
    console.log('\n🎉 调试完成!');
  })
  .catch(error => {
    console.error('💥 调试失败:', error);
    process.exit(1);
  });
