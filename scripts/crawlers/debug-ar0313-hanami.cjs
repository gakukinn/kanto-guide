const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * ar0313花见会页面调试工具
 * 目标：分析页面HTML结构，找到正确的选择器
 */
async function debugAr0313Hanami() {
  const targetUrl = 'https://hanami.walkerplus.com/ranking/ar0313/';

  console.log('🔍 开始调试ar0313花见会页面结构...');
  console.log(`📍 目标URL: ${targetUrl}`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  try {
    const page = await browser.newPage();

    console.log('📡 正在访问目标页面...');
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('⏳ 等待页面加载...');
    await page.waitForTimeout(5000);

    // 获取页面HTML
    const html = await page.content();

    // 保存HTML到调试文件
    const debugDir = path.join(__dirname, '../../debug-output');
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }

    const debugFile = path.join(debugDir, 'ar0313-hanami-debug.html');
    fs.writeFileSync(debugFile, html);
    console.log(`💾 页面HTML已保存到: ${debugFile}`);

    // 获取页面标题
    const title = await page.title();
    console.log(`📋 页面标题: ${title}`);

    // 获取页面URL（可能有重定向）
    const currentUrl = page.url();
    console.log(`🔗 当前URL: ${currentUrl}`);

    // 检查是否有排行榜相关的元素
    const possibleSelectors = [
      '.ranking_list',
      '.ranking-list',
      '.event-list',
      '.hanami-list',
      '.list-item',
      '.ranking-item',
      '.item',
      'li[class*="item"]',
      '.entry',
      'article',
      '.spot-list',
      '.spot_list',
      '.cherry-list',
    ];

    console.log('\n🔍 检查可能的选择器:');
    for (const selector of possibleSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          console.log(`✅ ${selector}: 找到 ${elements.length} 个元素`);

          // 获取前几个元素的文本内容作为样例
          for (let i = 0; i < Math.min(3, elements.length); i++) {
            const text = await elements[i].textContent();
            const cleanText = text
              ? text.replace(/\s+/g, ' ').trim().substring(0, 100)
              : '';
            if (cleanText) {
              console.log(`   样例 ${i + 1}: ${cleanText}...`);
            }
          }
        } else {
          console.log(`❌ ${selector}: 未找到元素`);
        }
      } catch (e) {
        console.log(`⚠️ ${selector}: 检查时出错`);
      }
    }

    // 检查页面是否有特殊的内容结构
    console.log('\n🔍 检查页面内容特征:');

    // 检查是否有花见相关的关键词
    const bodyText = await page.textContent('body');
    const keywords = ['桜', '花見', '花见', '公園', '神社', '寺', 'ランキング'];
    for (const keyword of keywords) {
      const count = (bodyText.match(new RegExp(keyword, 'g')) || []).length;
      console.log(`🔍 "${keyword}": 出现 ${count} 次`);
    }

    console.log('\n✅ 调试完成');
  } catch (error) {
    console.error(`❌ 调试失败: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// 运行调试
debugAr0313Hanami().catch(error => {
  console.error('💥 调试异常:', error);
  process.exit(1);
});
