import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';

console.log('🚀 Phase 2 实际执行: 东京地区数据爬取现实检查');
console.log('='.repeat(60));

// 手动定义的东京活动数据源（基于我们已确认的数据）
const tokyoActivities = [
  {
    id: 'sumida',
    name: '第48回 隅田川花火大会',
    officialWebsite: 'https://www.sumidagawa-hanabi.com/',
    walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0313e00797/', // 可能无效
    hasOfficialWebsite: true,
    hasWalkerPlusUrl: true,
  },
  // 注：其他活动数据需要类似提取，但为了演示我们先只测试一个
];

const crawlResults = [];

async function crawlPhase2() {
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

    console.log(
      `\n📊 开始爬取 ${tokyoActivities.length} 个东京活动的数据源...`
    );

    for (const activity of tokyoActivities) {
      console.log(`\n🔍 处理活动: ${activity.name}`);

      // 爬取官方网站
      if (activity.hasOfficialWebsite && activity.officialWebsite) {
        await crawlOfficialSite(page, activity);
      }

      // 爬取WalkerPlus
      if (activity.hasWalkerPlusUrl && activity.walkerPlusUrl) {
        await crawlWalkerPlus(page, activity);
      }
    }

    // 生成报告
    await generateCrawlReport();

    console.log('\n✅ Phase 2 爬取完成！');
  } catch (error) {
    console.error('❌ 爬取过程出错:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

async function crawlOfficialSite(page, activity) {
  console.log(`  📄 爬取官网: ${activity.officialWebsite}`);

  try {
    await page.goto(activity.officialWebsite, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(3000);

    // 提取数据
    const extractedData = {
      title: await page
        .$eval('title', el => el.textContent?.trim())
        .catch(() => null),
      h1: await page
        .$eval('h1', el => el.textContent?.trim())
        .catch(() => null),
    };

    // 更智能的日期提取
    const dateInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const dateTexts = [];

      elements.forEach(el => {
        const text = el.textContent || '';
        // 查找包含2025、7月、开催等关键词的文本
        if (
          /2025|令和7|7月|開催|実施|開催日|実施日/.test(text) &&
          text.length < 200
        ) {
          // 进一步过滤：确保包含有用信息
          if (
            text.includes('2025') ||
            text.includes('7月') ||
            text.includes('開催')
          ) {
            dateTexts.push(text.trim());
          }
        }
      });

      // 去重并限制结果数量
      return [...new Set(dateTexts)].slice(0, 5);
    });

    // 更智能的地点提取
    const locationInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const locationTexts = [];

      elements.forEach(el => {
        const text = el.textContent || '';
        // 查找包含会场、地点等关键词的文本
        if (
          /会場|場所|隅田川|第一会場|第二会場|桜橋|言問橋/.test(text) &&
          text.length < 200
        ) {
          locationTexts.push(text.trim());
        }
      });

      return [...new Set(locationTexts)].slice(0, 5);
    });

    extractedData.dateInfo = dateInfo;
    extractedData.locationInfo = locationInfo;

    // 记录结果
    const result = {
      activityId: activity.id,
      activityName: activity.name,
      source: 'official',
      url: activity.officialWebsite,
      success: true,
      extractedData,
      crawledAt: new Date().toISOString(),
    };

    crawlResults.push(result);
    console.log(
      `  ✅ 官网爬取成功 - 找到日期信息${dateInfo.length}条，地点信息${locationInfo.length}条`
    );
  } catch (error) {
    const result = {
      activityId: activity.id,
      activityName: activity.name,
      source: 'official',
      url: activity.officialWebsite,
      success: false,
      error: error.message,
      crawledAt: new Date().toISOString(),
    };

    crawlResults.push(result);
    console.log(`  ❌ 官网爬取失败: ${error.message}`);
  }
}

async function crawlWalkerPlus(page, activity) {
  console.log(`  📄 爬取WalkerPlus: ${activity.walkerPlusUrl}`);

  try {
    await page.goto(activity.walkerPlusUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(3000);

    // 检查页面是否是404
    const title = await page
      .$eval('title', el => el.textContent?.trim())
      .catch(() => '');
    if (title.includes('Not Found') || title.includes('404')) {
      throw new Error('页面不存在 (404)');
    }

    // 提取WalkerPlus特定数据
    const extractedData = {
      title,
      eventInfo: await page
        .$$eval('tr', rows => {
          const info = {};
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            if (cells.length >= 2) {
              const key = cells[0].textContent?.trim() || '';
              const value = cells[1].textContent?.trim() || '';
              if (key && value && value.length < 200) {
                info[key] = value;
              }
            }
          });
          return info;
        })
        .catch(() => ({})),
    };

    const result = {
      activityId: activity.id,
      activityName: activity.name,
      source: 'walkerplus',
      url: activity.walkerPlusUrl,
      success: true,
      extractedData,
      crawledAt: new Date().toISOString(),
    };

    crawlResults.push(result);
    console.log(`  ✅ WalkerPlus爬取成功`);
  } catch (error) {
    const result = {
      activityId: activity.id,
      activityName: activity.name,
      source: 'walkerplus',
      url: activity.walkerPlusUrl,
      success: false,
      error: error.message,
      crawledAt: new Date().toISOString(),
    };

    crawlResults.push(result);
    console.log(`  ❌ WalkerPlus爬取失败: ${error.message}`);
  }
}

async function generateCrawlReport() {
  console.log('\n📈 生成爬取报告...');

  const successfulCrawls = crawlResults.filter(r => r.success);
  const failedCrawls = crawlResults.filter(r => !r.success);

  const report = {
    summary: {
      totalActivities: tokyoActivities.length,
      totalCrawlAttempts: crawlResults.length,
      successfulCrawls: successfulCrawls.length,
      failedCrawls: failedCrawls.length,
      crawledOfficialSites: crawlResults.filter(r => r.source === 'official')
        .length,
      crawledWalkerPlus: crawlResults.filter(r => r.source === 'walkerplus')
        .length,
    },
    crawlResults,
    generatedAt: new Date().toISOString(),
  };

  // 确保报告目录存在
  try {
    mkdirSync(join(process.cwd(), 'crawl-reports'), { recursive: true });
  } catch (e) {
    // 目录可能已存在
  }

  // 保存报告
  const reportPath = join(
    process.cwd(),
    'crawl-reports',
    `tokyo-crawl-reality-check-${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.json`
  );

  writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  // 打印摘要
  console.log('\n📋 爬取结果摘要:');
  console.log('='.repeat(40));
  console.log(`总活动数: ${report.summary.totalActivities}`);
  console.log(`爬取尝试: ${report.summary.totalCrawlAttempts}`);
  console.log(`成功爬取: ${report.summary.successfulCrawls}`);
  console.log(`失败爬取: ${report.summary.failedCrawls}`);
  console.log(`报告已保存: ${reportPath}`);

  if (failedCrawls.length > 0) {
    console.log('\n⚠️ 失败的爬取:');
    failedCrawls.forEach(result => {
      console.log(
        `  - ${result.activityName} (${result.source}): ${result.error}`
      );
    });
  }

  if (successfulCrawls.length > 0) {
    console.log('\n✅ 成功的爬取:');
    successfulCrawls.forEach(result => {
      console.log(`  - ${result.activityName} (${result.source}): 数据已提取`);
    });
  }
}

// 启动Phase 2实际执行
crawlPhase2().catch(console.error);
