import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { chromium } from 'playwright';

console.log('🔍 东京地区活动URL有效性检查');
console.log('='.repeat(50));

// 东京地区的活动目录
const tokyoActivities = [
  'sumida',
  'tachikawa-showa',
  'tamagawa',
  'setagaya-tamagawa',
  'okutama',
  'mikurajima',
  'kozushima',
  'keibajo',
  'katsushika-noryo',
  'jingu-gaien',
  'itabashi',
  'hachioji',
  'edogawa',
  'chofu-hanabi',
  'akishima',
];

const urlCheckResults = [];

async function checkAllUrls() {
  console.log(`📊 检查 ${tokyoActivities.length} 个东京活动的URL状态...\n`);

  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);

    for (const activityDir of tokyoActivities) {
      await checkActivityUrls(activityDir, page);
    }
  } catch (error) {
    console.error('❌ 检查过程出错:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // 生成总结报告
  generateUrlReport();
}

async function checkActivityUrls(activityDir, page) {
  console.log(`🔍 检查活动: ${activityDir}`);

  try {
    // 读取数据文件
    const dataPath = resolve(
      `src/data/hanabi/tokyo/level4-july-hanabi-tokyo-${activityDir}.ts`
    );
    const dataContent = await readFile(dataPath, 'utf-8');

    // 提取活动名称
    const nameMatch = dataContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
    const activityName = nameMatch ? nameMatch[1] : activityDir;

    // 提取官方网站
    const websiteMatch = dataContent.match(
      /website:\s*['"`](https?:\/\/[^'"`]+)['"`]/
    );
    const officialWebsite = websiteMatch ? websiteMatch[1] : null;

    // 提取WalkerPlus URL
    const walkerMatch = dataContent.match(
      /walkerPlusUrl:\s*['"`](https?:\/\/[^'"`]+)['"`]/
    );
    const walkerPlusUrl = walkerMatch ? walkerMatch[1] : null;

    const result = {
      activityDir,
      activityName,
      officialWebsite,
      walkerPlusUrl,
      officialStatus: null,
      walkerPlusStatus: null,
    };

    console.log(`  📝 活动名称: ${activityName}`);

    // 检查官方网站
    if (officialWebsite) {
      console.log(`  🌐 检查官网: ${officialWebsite}`);
      result.officialStatus = await checkUrl(page, officialWebsite);
      console.log(`     状态: ${result.officialStatus}`);
    } else {
      console.log(`  ⚠️  未找到官方网站`);
      result.officialStatus = '未找到URL';
    }

    // 检查WalkerPlus
    if (walkerPlusUrl) {
      console.log(`  🔗 检查WalkerPlus: ${walkerPlusUrl}`);
      result.walkerPlusStatus = await checkUrl(page, walkerPlusUrl);
      console.log(`     状态: ${result.walkerPlusStatus}`);
    } else {
      console.log(`  ⚠️  未找到WalkerPlus URL`);
      result.walkerPlusStatus = '未找到URL';
    }

    urlCheckResults.push(result);
    console.log(`  ✅ ${activityDir} 检查完成\n`);
  } catch (error) {
    console.log(`  ❌ ${activityDir} 检查失败: ${error.message}\n`);
    urlCheckResults.push({
      activityDir,
      activityName: activityDir,
      officialWebsite: null,
      walkerPlusUrl: null,
      officialStatus: '文件读取失败',
      walkerPlusStatus: '文件读取失败',
    });
  }
}

async function checkUrl(page, url) {
  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });

    if (!response) {
      return '无响应';
    }

    const status = response.status();

    if (status === 200) {
      // 检查页面内容是否是错误页面
      const title = await page
        .$eval('title', el => el.textContent?.trim())
        .catch(() => '');
      if (
        title.includes('Not Found') ||
        title.includes('404') ||
        title.includes('Error')
      ) {
        return `${status} - 错误页面`;
      }
      return '✅ 正常';
    } else if (status === 404) {
      return '❌ 404未找到';
    } else if (status >= 400) {
      return `❌ 错误 ${status}`;
    } else if (status >= 300) {
      return `🔄 重定向 ${status}`;
    } else {
      return `✅ 正常 ${status}`;
    }
  } catch (error) {
    if (error.message.includes('timeout')) {
      return '⏰ 超时';
    } else if (error.message.includes('net::')) {
      return '🌐 网络错误';
    } else {
      return `❌ 访问失败: ${error.message.slice(0, 50)}`;
    }
  }
}

function generateUrlReport() {
  console.log('\n📈 URL状态检查报告');
  console.log('='.repeat(60));

  const validOfficial = urlCheckResults.filter(
    r => r.officialStatus === '✅ 正常'
  ).length;
  const validWalkerPlus = urlCheckResults.filter(
    r => r.walkerPlusStatus === '✅ 正常'
  ).length;
  const invalidWalkerPlus = urlCheckResults.filter(r =>
    r.walkerPlusStatus?.includes('404')
  ).length;

  console.log(`📊 总体统计:`);
  console.log(`  活动总数: ${urlCheckResults.length}`);
  console.log(`  有效官方网站: ${validOfficial}/${urlCheckResults.length}`);
  console.log(`  有效WalkerPlus: ${validWalkerPlus}/${urlCheckResults.length}`);
  console.log(`  失效WalkerPlus: ${invalidWalkerPlus}`);

  console.log(`\n❌ 需要修复的WalkerPlus URL:`);
  urlCheckResults.forEach(result => {
    if (
      result.walkerPlusStatus?.includes('404') ||
      result.walkerPlusStatus?.includes('错误')
    ) {
      console.log(`  - ${result.activityName} (${result.activityDir})`);
      console.log(`    URL: ${result.walkerPlusUrl}`);
      console.log(`    状态: ${result.walkerPlusStatus}`);
    }
  });

  console.log(`\n⚠️ 缺失URL的活动:`);
  urlCheckResults.forEach(result => {
    if (result.walkerPlusStatus === '未找到URL') {
      console.log(
        `  - ${result.activityName} (${result.activityDir}): 缺少WalkerPlus URL`
      );
    }
    if (result.officialStatus === '未找到URL') {
      console.log(
        `  - ${result.activityName} (${result.activityDir}): 缺少官方网站URL`
      );
    }
  });

  console.log(`\n✅ 可用于爬取的活动:`);
  urlCheckResults.forEach(result => {
    if (
      result.officialStatus === '✅ 正常' ||
      result.walkerPlusStatus === '✅ 正常'
    ) {
      console.log(`  - ${result.activityName}:`);
      if (result.officialStatus === '✅ 正常') {
        console.log(`    官网: ✅`);
      }
      if (result.walkerPlusStatus === '✅ 正常') {
        console.log(`    WalkerPlus: ✅`);
      }
    }
  });
}

// 启动检查
checkAllUrls().catch(console.error);
