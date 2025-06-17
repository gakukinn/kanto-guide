import { chromium } from 'playwright';

console.log('🧪 简单爬取测试 - 隅田川花火大会数据');
console.log('='.repeat(50));

// 测试数据 - 隅田川花火大会
const testActivity = {
  id: 'sumida',
  name: '第48回 隅田川花火大会',
  officialWebsite: 'https://www.sumidagawa-hanabi.com/',
  walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00797/',
};

async function testCrawl() {
  let browser = null;

  try {
    console.log('🚀 初始化Playwright浏览器...');
    browser = await chromium.launch({
      headless: true,
      timeout: 30000,
    });

    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    page.setDefaultTimeout(15000);
    console.log('✅ 浏览器初始化完成');

    // 测试爬取官方网站
    console.log('\n📄 测试爬取官方网站...');
    await testOfficialSite(page, testActivity);

    // 测试爬取WalkerPlus
    console.log('\n📄 测试爬取WalkerPlus...');
    await testWalkerPlus(page, testActivity);

    console.log('\n✅ 所有测试完成！');
  } catch (error) {
    console.error('❌ 测试失败:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

async function testOfficialSite(page, activity) {
  try {
    console.log(`  🌐 访问官网: ${activity.officialWebsite}`);

    await page.goto(activity.officialWebsite, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(3000);

    // 尝试提取标题
    const title = await page
      .$eval('title', el => el.textContent?.trim())
      .catch(() => null);
    console.log(`  📋 页面标题: ${title || '未找到'}`);

    // 尝试提取H1标签
    const h1 = await page
      .$eval('h1', el => el.textContent?.trim())
      .catch(() => null);
    console.log(`  🏷️ 主标题: ${h1 || '未找到'}`);

    // 查找日期相关信息
    const dateElements = await page
      .$$eval('*', els => {
        return els
          .filter(el => {
            const text = el.textContent || '';
            return (
              /2025|令和7|开催|开催日|日程|7月|時間/.test(text) &&
              text.length < 100
            );
          })
          .map(el => el.textContent?.trim())
          .filter(text => text && text.length > 5 && text.length < 50)
          .slice(0, 3);
      })
      .catch(() => []);

    console.log(`  📅 找到日期相关信息 ${dateElements.length} 条:`);
    dateElements.forEach((text, i) => {
      console.log(`     ${i + 1}. ${text}`);
    });

    // 查找地点相关信息
    const locationElements = await page
      .$$eval('*', els => {
        return els
          .filter(el => {
            const text = el.textContent || '';
            return (
              /会場|場所|隅田川|桜橋|言問橋|駒形橋|厩橋/.test(text) &&
              text.length < 100
            );
          })
          .map(el => el.textContent?.trim())
          .filter(text => text && text.length > 5 && text.length < 50)
          .slice(0, 3);
      })
      .catch(() => []);

    console.log(`  📍 找到地点相关信息 ${locationElements.length} 条:`);
    locationElements.forEach((text, i) => {
      console.log(`     ${i + 1}. ${text}`);
    });

    console.log('  ✅ 官网爬取完成');
  } catch (error) {
    console.log(`  ❌ 官网爬取失败: ${error.message}`);
  }
}

async function testWalkerPlus(page, activity) {
  try {
    console.log(`  🌐 访问WalkerPlus: ${activity.walkerPlusUrl}`);

    await page.goto(activity.walkerPlusUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(3000);

    // 尝试提取标题
    const title = await page
      .$eval('title', el => el.textContent?.trim())
      .catch(() => null);
    console.log(`  📋 页面标题: ${title || '未找到'}`);

    // 尝试提取主要标题
    const mainTitle = await page
      .$eval('h1, .event-title, .title', el => el.textContent?.trim())
      .catch(() => null);
    console.log(`  🏷️ 主标题: ${mainTitle || '未找到'}`);

    // 查找事件详情表格
    const eventInfo = await page
      .$$eval('tr', rows => {
        const info = {};
        rows.forEach(row => {
          const cells = row.querySelectorAll('td, th');
          if (cells.length >= 2) {
            const key = cells[0].textContent?.trim().toLowerCase() || '';
            const value = cells[1].textContent?.trim() || '';
            if (key && value && value.length < 100) {
              if (key.includes('日時') || key.includes('date'))
                info.date = value;
              if (key.includes('時間') || key.includes('time'))
                info.time = value;
              if (
                key.includes('場所') ||
                key.includes('会場') ||
                key.includes('venue')
              )
                info.location = value;
              if (key.includes('花火') && key.includes('数'))
                info.fireworksCount = value;
              if (key.includes('来場') || key.includes('観客'))
                info.expectedVisitors = value;
            }
          }
        });
        return info;
      })
      .catch(() => ({}));

    console.log('  📊 提取的事件信息:');
    Object.entries(eventInfo).forEach(([key, value]) => {
      console.log(`     ${key}: ${value}`);
    });

    if (Object.keys(eventInfo).length === 0) {
      console.log('     ⚠️ 未找到结构化事件信息');
    }

    console.log('  ✅ WalkerPlus爬取完成');
  } catch (error) {
    console.log(`  ❌ WalkerPlus爬取失败: ${error.message}`);
  }
}

// 启动测试
testCrawl().catch(console.error);
