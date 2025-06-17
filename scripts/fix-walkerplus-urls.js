import { chromium } from 'playwright';

console.log('🔗 从WalkerPlus列表页面提取东京活动正确URL');
console.log('='.repeat(60));

const walkerPlusListUrl = 'https://hanabi.walkerplus.com/ranking/ar0313/';

// 我们需要匹配的东京活动名称 (从之前的检查中获得)
const tokyoActivities = [
  {
    dir: 'sumida',
    name: '第48回 隅田川花火大会',
    keywords: ['隅田川', 'すみだがわ'],
  },
  {
    dir: 'keibajo',
    name: '东京竞马场花火 2025',
    keywords: ['東京競馬場', '競馬場', 'TOKYO'],
  },
  {
    dir: 'hachioji',
    name: '八王子花火大会',
    keywords: ['八王子', 'はちおうじ'],
  },
  {
    dir: 'jingu-gaien',
    name: '2025 神宫外苑花火大会',
    keywords: ['神宮外苑', '神宮', 'JINGU'],
  },
  {
    dir: 'itabashi',
    name: '第66回板桥花火大会',
    keywords: ['板橋', 'いたばし'],
  },
  {
    dir: 'akishima',
    name: '第53回 昭岛市民鲸鱼祭梦花火',
    keywords: ['昭島', 'くじら祭', 'あきしま'],
  },
  {
    dir: 'kozushima',
    name: '第32回神津島渚花火大会',
    keywords: ['神津島', 'こうづしま'],
  },
  {
    dir: 'okutama',
    name: '町制施行70周年纪念 奥多摩纳凉花火大会',
    keywords: ['奥多摩', 'おくたま'],
  },
  {
    dir: 'edogawa',
    name: '第50回江戸川区花火大会',
    keywords: ['江戸川', 'えどがわ'],
  },
  {
    dir: 'chofu-hanabi',
    name: '第40回调布花火',
    keywords: ['調布', 'ちょうふ'],
  },
  {
    dir: 'tachikawa-showa',
    name: '立川祭典 国営昭和記念公園花火大会',
    keywords: ['立川', '昭和記念公園', 'たちかわ'],
  },
  {
    dir: 'mikurajima',
    name: '御蔵島花火大会',
    keywords: ['御蔵島', 'みくらじま'],
  },
  {
    dir: 'katsushika-noryo',
    name: '第59回葛饰纳凉花火大会',
    keywords: ['葛飾', 'かつしか', '納涼'],
  },
  {
    dir: 'tamagawa',
    name: '第48回多摩川花火大会',
    keywords: ['多摩川', 'たまがわ'],
  },
  {
    dir: 'setagaya-tamagawa',
    name: '第47回 世田谷区多摩川花火大会',
    keywords: ['世田谷', 'せたがや', '多摩川'],
  },
];

async function extractWalkerPlusUrls() {
  let browser = null;

  try {
    console.log('🚀 启动浏览器...');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`🌐 访问WalkerPlus东京列表页面: ${walkerPlusListUrl}`);
    await page.goto(walkerPlusListUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });
    await page.waitForTimeout(3000);

    console.log('📋 提取页面中的所有花火大会链接...');

    // 提取所有花火大会的链接和标题
    const allLinks = await page.evaluate(() => {
      const links = [];

      // 查找所有可能的链接容器
      const linkElements = document.querySelectorAll('a[href*="/detail/"]');

      linkElements.forEach(link => {
        const href = link.href;
        const title = link.textContent?.trim() || '';
        const img = link.querySelector('img');
        const imgAlt = img ? img.alt : '';

        if (href.includes('/detail/ar0313e') && (title || imgAlt)) {
          links.push({
            url: href,
            title: title || imgAlt,
            rawText: link.textContent?.trim() || '',
          });
        }
      });

      return links;
    });

    console.log(`✅ 找到 ${allLinks.length} 个花火大会链接`);

    // 打印所有找到的链接（用于调试）
    console.log('\n📝 所有找到的链接:');
    allLinks.forEach((link, i) => {
      console.log(`${i + 1}. ${link.title}`);
      console.log(`   URL: ${link.url}`);
      console.log('');
    });

    // 匹配我们的活动
    console.log('\n🔍 匹配东京活动URL...');
    const matches = [];

    tokyoActivities.forEach(activity => {
      console.log(`\n🎯 寻找: ${activity.name} (${activity.dir})`);

      let bestMatch = null;
      let bestScore = 0;

      allLinks.forEach(link => {
        let score = 0;
        const linkText = link.title.toLowerCase();

        activity.keywords.forEach(keyword => {
          if (linkText.includes(keyword.toLowerCase())) {
            score += 10;
          }
        });

        // 额外检查：标题相似度
        if (linkText.includes('花火') || linkText.includes('hanabi')) {
          score += 1;
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = link;
        }
      });

      if (bestMatch && bestScore > 0) {
        console.log(`  ✅ 找到匹配: ${bestMatch.title}`);
        console.log(`     URL: ${bestMatch.url}`);
        console.log(`     匹配分数: ${bestScore}`);

        matches.push({
          activity: activity,
          walkerPlusUrl: bestMatch.url,
          walkerPlusTitle: bestMatch.title,
          matchScore: bestScore,
        });
      } else {
        console.log(`  ❌ 未找到匹配`);
        matches.push({
          activity: activity,
          walkerPlusUrl: null,
          walkerPlusTitle: null,
          matchScore: 0,
        });
      }
    });

    // 生成更新报告
    generateUpdateReport(matches);
  } catch (error) {
    console.error('❌ 提取过程出错:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

function generateUpdateReport(matches) {
  console.log('\n📈 WalkerPlus URL更新报告');
  console.log('='.repeat(60));

  const foundMatches = matches.filter(m => m.walkerPlusUrl);
  const notFound = matches.filter(m => !m.walkerPlusUrl);

  console.log(`📊 统计:`);
  console.log(`  总活动数: ${matches.length}`);
  console.log(`  找到URL: ${foundMatches.length}`);
  console.log(`  未找到: ${notFound.length}`);

  if (foundMatches.length > 0) {
    console.log(`\n✅ 找到的WalkerPlus URL (需要更新到数据文件):`);
    foundMatches.forEach(match => {
      console.log(`\n📍 ${match.activity.name} (${match.activity.dir})`);
      console.log(`   文件: level4-*-${match.activity.dir}.ts`);
      console.log(`   新URL: ${match.walkerPlusUrl}`);
      console.log(`   WalkerPlus标题: ${match.walkerPlusTitle}`);
      console.log(`   匹配分数: ${match.matchScore}`);
    });
  }

  if (notFound.length > 0) {
    console.log(`\n❌ 未找到匹配的活动:`);
    notFound.forEach(match => {
      console.log(`  - ${match.activity.name} (${match.activity.dir})`);
    });
  }

  // 特别检查隅田川的URL
  const sumidaMatch = foundMatches.find(m => m.activity.dir === 'sumida');
  if (sumidaMatch) {
    console.log(`\n🎯 特别验证 - 隅田川URL:`);
    console.log(
      `   用户提供: https://hanabi.walkerplus.com/detail/ar0313e00858/`
    );
    console.log(`   我们找到: ${sumidaMatch.walkerPlusUrl}`);
    console.log(
      `   是否匹配: ${sumidaMatch.walkerPlusUrl.includes('ar0313e00858') ? '✅ 是' : '❌ 否'}`
    );
  }
}

// 启动提取
extractWalkerPlusUrls().catch(console.error);
