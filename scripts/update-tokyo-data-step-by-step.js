import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { chromium } from 'playwright';

console.log('🔄 逐个更新东京地区活动数据 - 官网优先策略');
console.log('='.repeat(60));

// 东京活动列表，按优先级排序
const tokyoActivities = [
  {
    dir: 'sumida',
    file: 'level4-july-hanabi-tokyo-sumida.ts',
    priority: 'high',
  },
  {
    dir: 'keibajo',
    file: 'level4-july-hanabi-tokyo-keibajo.ts',
    priority: 'high',
  },
  {
    dir: 'hachioji',
    file: 'level4-july-hanabi-tokyo-hachioji.ts',
    priority: 'high',
  },
  {
    dir: 'jingu-gaien',
    file: 'level4-august-jingu-gaien-hanabi.ts',
    priority: 'high',
  },
  {
    dir: 'itabashi',
    file: 'level4-august-itabashi-hanabi.ts',
    priority: 'high',
  },
  {
    dir: 'chofu-hanabi',
    file: 'level4-september-tokyo-chofu-hanabi.ts',
    priority: 'medium',
  },
  {
    dir: 'tachikawa-showa',
    file: 'level4-july-hanabi-tachikawa-showa.ts',
    priority: 'medium',
  },
  {
    dir: 'edogawa',
    file: 'level4-august-edogawa-hanabi.ts',
    priority: 'medium',
  },
  {
    dir: 'katsushika-noryo',
    file: 'level4-july-hanabi-katsushika-noryo.ts',
    priority: 'medium',
  },
  {
    dir: 'akishima',
    file: 'level4-august-akishima-hanabi.ts',
    priority: 'low',
  },
  {
    dir: 'kozushima',
    file: 'level4-august-kozushima-hanabi.ts',
    priority: 'low',
  },
  { dir: 'okutama', file: 'level4-august-okutama-hanabi.ts', priority: 'low' },
  {
    dir: 'mikurajima',
    file: 'level4-july-hanabi-mikurajima.ts',
    priority: 'low',
  },
  { dir: 'tamagawa', file: 'tokyo-tamagawa-hanabi.ts', priority: 'low' },
  {
    dir: 'setagaya-tamagawa',
    file: 'level4-setagaya-tamagawa-hanabi.ts',
    priority: 'low',
  },
];

let currentActivityIndex = 0;
const updateResults = [];

async function updateTokyoDataStepByStep() {
  let browser = null;

  try {
    console.log('🚀 启动逐个数据更新流程...');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);

    // 处理每个活动
    for (let i = 0; i < tokyoActivities.length; i++) {
      currentActivityIndex = i;
      const activity = tokyoActivities[i];

      console.log(`\n${'='.repeat(50)}`);
      console.log(
        `📍 处理活动 ${i + 1}/${tokyoActivities.length}: ${activity.dir}`
      );
      console.log(`🏷️ 优先级: ${activity.priority}`);
      console.log(`📁 文件: ${activity.file}`);
      console.log(`${'='.repeat(50)}`);

      await processActivity(activity, page);

      // 显示进度
      console.log(`\n✅ 活动 ${i + 1} 处理完成`);
      console.log(
        `📊 进度: ${i + 1}/${tokyoActivities.length} (${Math.round(((i + 1) / tokyoActivities.length) * 100)}%)`
      );
    }

    // 生成最终报告
    generateFinalReport();
  } catch (error) {
    console.error('❌ 更新过程出错:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

async function processActivity(activity, page) {
  try {
    // 1. 读取当前数据
    console.log('📖 读取当前数据文件...');
    const dataPath = resolve(`src/data/hanabi/tokyo/${activity.file}`);
    const dataContent = await readFile(dataPath, 'utf-8');

    // 提取基本信息
    const nameMatch = dataContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
    const activityName = nameMatch ? nameMatch[1] : activity.dir;

    const websiteMatch = dataContent.match(
      /website:\s*['"`](https?:\/\/[^'"`]+)['"`]/
    );
    const officialWebsite = websiteMatch ? websiteMatch[1] : null;

    // 提取当前的时间和地址信息
    const currentDateMatch = dataContent.match(/date:\s*['"`]([^'"`]+)['"`]/);
    const currentTimeMatch = dataContent.match(/time:\s*['"`]([^'"`]+)['"`]/);
    const currentLocationMatch = dataContent.match(
      /location:\s*['"`]([^'"`]+)['"`]/
    );

    console.log(`📝 活动名称: ${activityName}`);
    console.log(`🌐 官方网站: ${officialWebsite || '未找到'}`);
    console.log(
      `📅 当前日期: ${currentDateMatch ? currentDateMatch[1] : '未找到'}`
    );
    console.log(
      `⏰ 当前时间: ${currentTimeMatch ? currentTimeMatch[1] : '未找到'}`
    );
    console.log(
      `📍 当前地点: ${currentLocationMatch ? currentLocationMatch[1] : '未找到'}`
    );

    const result = {
      activity: activity.dir,
      name: activityName,
      officialWebsite,
      currentData: {
        date: currentDateMatch ? currentDateMatch[1] : null,
        time: currentTimeMatch ? currentTimeMatch[1] : null,
        location: currentLocationMatch ? currentLocationMatch[1] : null,
      },
      crawlResult: null,
      needsWalkerPlus: false,
      recommendations: [],
    };

    // 2. 尝试从官方网站获取最新数据
    if (officialWebsite) {
      console.log('\n🕷️ 从官方网站爬取最新数据...');
      const crawlResult = await crawlOfficialWebsite(
        page,
        officialWebsite,
        activityName
      );
      result.crawlResult = crawlResult;

      if (crawlResult.success) {
        // 分析获取的数据质量
        analyzeDataQuality(result, crawlResult);
      } else {
        console.log('❌ 官网爬取失败，标记需要WalkerPlus链接');
        result.needsWalkerPlus = true;
      }
    } else {
      console.log('⚠️ 未找到官方网站，标记需要WalkerPlus链接');
      result.needsWalkerPlus = true;
    }

    updateResults.push(result);
  } catch (error) {
    console.log(`❌ 处理活动失败: ${error.message}`);
    updateResults.push({
      activity: activity.dir,
      name: activity.dir,
      error: error.message,
      needsWalkerPlus: true,
    });
  }
}

async function crawlOfficialWebsite(page, url, activityName) {
  try {
    console.log(`  🌐 访问: ${url}`);

    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });

    if (!response || response.status() !== 200) {
      return {
        success: false,
        error: `HTTP ${response?.status() || '无响应'}`,
      };
    }

    await page.waitForTimeout(3000);

    // 提取页面标题验证
    const title = await page
      .$eval('title', el => el.textContent?.trim())
      .catch(() => '');
    console.log(`  📄 页面标题: ${title}`);

    // 提取日期信息
    console.log('  📅 提取日期信息...');
    const dateInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const dateTexts = [];

      elements.forEach(el => {
        const text = el.textContent || '';
        // 查找2025年相关日期
        if (/2025|令和7|開催.*日|実施.*日/.test(text) && text.length < 200) {
          // 更精确的日期匹配
          const dateRegex =
            /2025[年\-\.\/\s]*[0-9]{1,2}[月\-\.\/\s]*[0-9]{1,2}[日]?|7月[0-9]{1,2}日|8月[0-9]{1,2}日|9月[0-9]{1,2}日/g;
          const matches = text.match(dateRegex);
          if (matches) {
            matches.forEach(match => {
              if (match.length > 4 && match.length < 50) {
                dateTexts.push(match.trim());
              }
            });
          }
        }
      });

      return [...new Set(dateTexts)].slice(0, 5);
    });

    // 提取时间信息
    console.log('  ⏰ 提取时间信息...');
    const timeInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const timeTexts = [];

      elements.forEach(el => {
        const text = el.textContent || '';
        // 查找时间信息
        if (
          /時間|開始|開催時間|[0-9]{1,2}:[0-9]{2}|[0-9]{1,2}時/.test(text) &&
          text.length < 200
        ) {
          const timeRegex =
            /[0-9]{1,2}:[0-9]{2}|[0-9]{1,2}時[0-9]{0,2}分?|開始.*[0-9]{1,2}[時:]|時間.*[0-9]{1,2}[時:]/g;
          const matches = text.match(timeRegex);
          if (matches) {
            matches.forEach(match => {
              if (match.length > 2 && match.length < 30) {
                timeTexts.push(match.trim());
              }
            });
          }
        }
      });

      return [...new Set(timeTexts)].slice(0, 5);
    });

    // 提取地点信息
    console.log('  📍 提取地点信息...');
    const locationInfo = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const locationTexts = [];

      elements.forEach(el => {
        const text = el.textContent || '';
        // 查找地点信息
        if (
          /会場|場所|開催場所|アクセス|住所|〒/.test(text) &&
          text.length < 300
        ) {
          // 过滤掉太短或太长的文本
          if (
            text.length > 5 &&
            text.length < 100 &&
            !text.includes('Copyright') &&
            !text.includes('Menu')
          ) {
            locationTexts.push(text.trim());
          }
        }
      });

      return [...new Set(locationTexts)].slice(0, 5);
    });

    console.log(
      `  ✅ 提取完成 - 日期:${dateInfo.length}条, 时间:${timeInfo.length}条, 地点:${locationInfo.length}条`
    );

    return {
      success: true,
      title,
      dateInfo,
      timeInfo,
      locationInfo,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.log(`  ❌ 爬取失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function analyzeDataQuality(result, crawlResult) {
  console.log('\n📊 数据质量分析:');

  const { dateInfo, timeInfo, locationInfo } = crawlResult;

  // 检查是否找到了有用的日期信息
  if (dateInfo && dateInfo.length > 0) {
    console.log(`  📅 日期信息: 找到 ${dateInfo.length} 条`);
    dateInfo.forEach((date, i) => {
      console.log(`     ${i + 1}. ${date}`);
    });

    // 推荐最可能的日期
    const bestDate =
      dateInfo.find(d => /2025.*[0-9]{1,2}月[0-9]{1,2}日/.test(d)) ||
      dateInfo[0];
    if (bestDate) {
      result.recommendations.push(`建议更新日期为: ${bestDate}`);
    }
  } else {
    console.log(`  📅 日期信息: 未找到有效信息`);
    result.needsWalkerPlus = true;
  }

  // 检查时间信息
  if (timeInfo && timeInfo.length > 0) {
    console.log(`  ⏰ 时间信息: 找到 ${timeInfo.length} 条`);
    timeInfo.forEach((time, i) => {
      console.log(`     ${i + 1}. ${time}`);
    });

    const bestTime =
      timeInfo.find(t => /[0-9]{1,2}:[0-9]{2}/.test(t)) || timeInfo[0];
    if (bestTime) {
      result.recommendations.push(`建议更新时间为: ${bestTime}`);
    }
  } else {
    console.log(`  ⏰ 时间信息: 未找到有效信息`);
  }

  // 检查地点信息
  if (locationInfo && locationInfo.length > 0) {
    console.log(`  📍 地点信息: 找到 ${locationInfo.length} 条`);
    locationInfo.forEach((location, i) => {
      console.log(`     ${i + 1}. ${location}`);
    });
  } else {
    console.log(`  📍 地点信息: 未找到有效信息`);
  }

  // 总体质量评估
  const qualityScore =
    (dateInfo?.length || 0) +
    (timeInfo?.length || 0) +
    (locationInfo?.length || 0);
  if (qualityScore < 3) {
    console.log(
      `  ⚠️ 数据质量较低 (分数: ${qualityScore})，建议获取WalkerPlus链接补充`
    );
    result.needsWalkerPlus = true;
  } else {
    console.log(`  ✅ 数据质量良好 (分数: ${qualityScore})`);
  }
}

function generateFinalReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📈 东京地区数据更新最终报告');
  console.log('='.repeat(60));

  const successful = updateResults.filter(r => r.crawlResult?.success);
  const needsWalkerPlus = updateResults.filter(r => r.needsWalkerPlus);
  const failed = updateResults.filter(r => r.error);

  console.log(`📊 总体统计:`);
  console.log(`  处理活动: ${updateResults.length} 个`);
  console.log(`  成功爬取: ${successful.length} 个`);
  console.log(`  需要WalkerPlus: ${needsWalkerPlus.length} 个`);
  console.log(`  完全失败: ${failed.length} 个`);

  if (successful.length > 0) {
    console.log(`\n✅ 成功爬取的活动:`);
    successful.forEach(result => {
      console.log(`\n📍 ${result.name} (${result.activity})`);
      if (result.recommendations.length > 0) {
        console.log(`  🎯 更新建议:`);
        result.recommendations.forEach(rec => {
          console.log(`     - ${rec}`);
        });
      }
    });
  }

  if (needsWalkerPlus.length > 0) {
    console.log(`\n⚠️ 需要提供WalkerPlus链接的活动:`);
    needsWalkerPlus.forEach(result => {
      console.log(`  - ${result.name || result.activity} (${result.activity})`);
      console.log(
        `    原因: ${result.crawlResult ? '数据质量不足' : '官网访问失败或不存在'}`
      );
    });

    console.log(
      `\n💡 请为以上 ${needsWalkerPlus.length} 个活动提供WalkerPlus链接`
    );
  }

  if (failed.length > 0) {
    console.log(`\n❌ 完全失败的活动:`);
    failed.forEach(result => {
      console.log(`  - ${result.activity}: ${result.error}`);
    });
  }
}

// 启动逐个更新流程
updateTokyoDataStepByStep().catch(console.error);
