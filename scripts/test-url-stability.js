import { chromium } from 'playwright';

console.log('🔍 测试WalkerPlus URL稳定性和动态获取方案');
console.log('='.repeat(60));

// 测试一些现有的和新发现的URL
const urlsToTest = [
  {
    name: '隅田川 - 用户确认',
    url: 'https://hanabi.walkerplus.com/detail/ar0313e00858/',
    source: '用户提供',
  },
  {
    name: '隅田川 - 旧URL',
    url: 'https://hanabi.walkerplus.com/detail/ar0313e00797/',
    source: '数据文件中的旧URL',
  },
  {
    name: '八王子 - 新发现',
    url: 'https://hanabi.walkerplus.com/detail/ar0313e00929/',
    source: '从列表页提取',
  },
  {
    name: '八王子 - 旧URL',
    url: 'https://hanabi.walkerplus.com/detail/ar0313e00799/',
    source: '数据文件中的旧URL',
  },
  {
    name: '东京竞马场 - 确认有效',
    url: 'https://hanabi.walkerplus.com/detail/ar0313e436729/',
    source: '之前确认有效',
  },
];

async function testUrlStability() {
  let browser = null;

  try {
    console.log('🚀 启动浏览器进行URL稳定性测试...');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    for (const urlTest of urlsToTest) {
      console.log(`\n📋 测试: ${urlTest.name}`);
      console.log(`🔗 URL: ${urlTest.url}`);
      console.log(`📍 来源: ${urlTest.source}`);

      try {
        const response = await page.goto(urlTest.url, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });

        const status = response.status();
        console.log(`📊 状态码: ${status}`);

        if (status === 200) {
          const title = await page
            .$eval('title', el => el.textContent?.trim())
            .catch(() => '');
          console.log(`📄 页面标题: ${title}`);

          if (title.includes('Not Found') || title.includes('404')) {
            console.log(`❌ 虽然返回200，但内容显示404`);
          } else {
            console.log(`✅ URL有效`);
          }
        } else if (status === 404) {
          console.log(`❌ 404 - URL已失效`);
        } else {
          console.log(`⚠️ 状态码: ${status}`);
        }
      } catch (error) {
        console.log(`❌ 访问失败: ${error.message.slice(0, 100)}`);
      }
    }

    // 测试动态获取方案
    console.log('\n' + '='.repeat(60));
    console.log('🎯 测试动态获取URL的可行性');
    console.log('='.repeat(60));

    await testDynamicUrlRetrieval(page);
  } catch (error) {
    console.error('❌ 测试过程出错:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

async function testDynamicUrlRetrieval(page) {
  try {
    console.log('📋 测试场景: 每次爬取前动态获取最新URL');

    const listUrl = 'https://hanabi.walkerplus.com/ranking/ar0313/';
    console.log(`🌐 访问列表页: ${listUrl}`);

    await page.goto(listUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 20000,
    });

    // 测试搜索特定活动
    const testActivity = '隅田川';
    console.log(`🔍 搜索活动: ${testActivity}`);

    const sumidaUrl = await page.evaluate(activityName => {
      const links = Array.from(
        document.querySelectorAll('a[href*="/detail/"]')
      );

      for (const link of links) {
        const text = link.textContent || '';
        if (text.includes(activityName)) {
          return link.href;
        }
      }
      return null;
    }, testActivity);

    if (sumidaUrl) {
      console.log(`✅ 动态找到URL: ${sumidaUrl}`);

      // 验证动态找到的URL
      console.log('🔄 验证动态获取的URL...');
      const response = await page.goto(sumidaUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      });

      if (response.status() === 200) {
        const title = await page
          .$eval('title', el => el.textContent?.trim())
          .catch(() => '');
        console.log(`✅ 动态URL验证成功: ${title}`);
      }
    } else {
      console.log(`❌ 动态搜索失败`);
    }
  } catch (error) {
    console.log(`❌ 动态获取测试失败: ${error.message}`);
  }
}

// 提出解决方案
function proposeSolution() {
  console.log('\n' + '='.repeat(60));
  console.log('💡 URL稳定性问题的解决方案');
  console.log('='.repeat(60));

  console.log(`
📋 问题分析:
  - WalkerPlus URL确实可能不定期更换 (如ar0313e00797 → ar0313e00858)
  - 硬编码URL存在失效风险
  - 需要更robust的数据获取策略

🎯 推荐解决方案:

1. **混合策略 (推荐)**:
   - 数据文件保存当前已知的URL作为fallback
   - 爬取时先尝试从列表页动态获取最新URL
   - 如果动态获取失败，再使用数据文件中的URL
   
2. **动态优先策略**:
   - 每次爬取都从列表页搜索最新URL
   - 成功找到新URL时更新数据文件
   - 建立URL变更的监控机制

3. **多源验证策略**:
   - 同时维护官方网站和WalkerPlus两个数据源
   - WalkerPlus失效时依然有官方网站数据
   - 交叉验证数据的准确性

🚀 实施建议:
  - 立即实施方案1，保证当前爬取工作可以进行
  - 同时开发URL监控机制，及时发现变更
  - 优先爬取官方网站，WalkerPlus作为补充验证
`);
}

// 启动测试和分析
testUrlStability()
  .then(() => {
    proposeSolution();
  })
  .catch(console.error);
