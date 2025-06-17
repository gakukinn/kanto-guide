import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { chromium } from 'playwright';

console.log('🔍 东京地区活动URL有效性检查 (修正版)');
console.log('='.repeat(50));

// 根据实际文件名的东京活动映射
const tokyoActivityFiles = [
  { dir: 'sumida', file: 'level4-july-hanabi-tokyo-sumida.ts' },
  { dir: 'keibajo', file: 'level4-july-hanabi-tokyo-keibajo.ts' },
  { dir: 'hachioji', file: 'level4-july-hanabi-tokyo-hachioji.ts' },
  { dir: 'jingu-gaien', file: 'level4-august-jingu-gaien-hanabi.ts' },
  { dir: 'itabashi', file: 'level4-august-itabashi-hanabi.ts' },
  { dir: 'akishima', file: 'level4-august-akishima-hanabi.ts' },
  { dir: 'kozushima', file: 'level4-august-kozushima-hanabi.ts' },
  { dir: 'okutama', file: 'level4-august-okutama-hanabi.ts' },
  { dir: 'edogawa', file: 'level4-august-edogawa-hanabi.ts' },
  { dir: 'chofu-hanabi', file: 'level4-september-tokyo-chofu-hanabi.ts' },
  { dir: 'tachikawa-showa', file: 'level4-july-hanabi-tachikawa-showa.ts' },
  { dir: 'mikurajima', file: 'level4-july-hanabi-mikurajima.ts' },
  { dir: 'katsushika-noryo', file: 'level4-july-hanabi-katsushika-noryo.ts' },
  { dir: 'tamagawa', file: 'tokyo-tamagawa-hanabi.ts' },
  { dir: 'setagaya-tamagawa', file: 'level4-setagaya-tamagawa-hanabi.ts' },
];

const urlCheckResults = [];

async function checkAllUrls() {
  console.log(`📊 检查 ${tokyoActivityFiles.length} 个东京活动的URL状态...\n`);

  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);

    for (const activity of tokyoActivityFiles) {
      await checkActivityUrls(activity, page);
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

async function checkActivityUrls(activity, page) {
  console.log(`🔍 检查活动: ${activity.dir}`);

  try {
    // 读取数据文件
    const dataPath = resolve(`src/data/hanabi/tokyo/${activity.file}`);
    const dataContent = await readFile(dataPath, 'utf-8');

    // 提取活动名称
    const nameMatch = dataContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
    const activityName = nameMatch ? nameMatch[1] : activity.dir;

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
      activityDir: activity.dir,
      fileName: activity.file,
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
    console.log(`  ✅ ${activity.dir} 检查完成\n`);
  } catch (error) {
    console.log(`  ❌ ${activity.dir} 检查失败: ${error.message}\n`);
    urlCheckResults.push({
      activityDir: activity.dir,
      fileName: activity.file,
      activityName: activity.dir,
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

  console.log(`\n❌ 具体需要修复的WalkerPlus URL:`);
  urlCheckResults.forEach(result => {
    if (
      result.walkerPlusStatus?.includes('404') ||
      result.walkerPlusStatus?.includes('错误')
    ) {
      console.log(`  - ${result.activityName} (${result.activityDir})`);
      console.log(`    文件: ${result.fileName}`);
      console.log(`    URL: ${result.walkerPlusUrl}`);
      console.log(`    状态: ${result.walkerPlusStatus}`);
      console.log('');
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

  console.log(`\n✅ 可用于爬取的活动 (按数据源分组):`);
  const bothSources = urlCheckResults.filter(
    r => r.officialStatus === '✅ 正常' && r.walkerPlusStatus === '✅ 正常'
  );
  const officialOnly = urlCheckResults.filter(
    r => r.officialStatus === '✅ 正常' && r.walkerPlusStatus !== '✅ 正常'
  );
  const walkerPlusOnly = urlCheckResults.filter(
    r => r.officialStatus !== '✅ 正常' && r.walkerPlusStatus === '✅ 正常'
  );

  console.log(`\n🎯 高优先级 (双数据源): ${bothSources.length}个`);
  bothSources.forEach(result => {
    console.log(`  - ${result.activityName} (${result.activityDir})`);
  });

  console.log(`\n📊 中优先级 (仅官网): ${officialOnly.length}个`);
  officialOnly.forEach(result => {
    console.log(`  - ${result.activityName} (${result.activityDir})`);
  });

  if (walkerPlusOnly.length > 0) {
    console.log(`\n📊 仅WalkerPlus: ${walkerPlusOnly.length}个`);
    walkerPlusOnly.forEach(result => {
      console.log(`  - ${result.activityName} (${result.activityDir})`);
    });
  }
}

// 启动检查
checkAllUrls().catch(console.error);
