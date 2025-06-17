const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function verifyKanagawaHanabiData() {
  console.log('🚀 开始使用Playwright+Cheerio验证神奈川花火数据...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    console.log('📡 正在抓取WalkerPlus神奈川花火排行数据...');
    
    // 抓取WalkerPlus神奈川花火排行数据
    await page.goto('https://hanabi.walkerplus.com/crowd/ar0314/', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const walkerPlusEvents = [];
    
    // 抓取排行榜中的花火大会信息
    $('.rankingList li, .ranking-list li').each((index, element) => {
      const $item = $(element);
      const title = $item.find('h3, .title, .name').text().trim();
      const votes = $item.find('.vote, .point, .count').text().trim();
      const location = $item.find('.area, .location, .place').text().trim();
      const date = $item.find('.date, .time, .schedule').text().trim();
      
      if (title) {
        walkerPlusEvents.push({
          rank: index + 1,
          title: title,
          votes: votes,
          location: location,
          date: date
        });
      }
    });
    
    console.log(`📊 WalkerPlus数据获取完成，找到 ${walkerPlusEvents.length} 个排行活动`);
    
    // 抓取项目本地数据
    console.log('📱 正在抓取项目本地神奈川花火数据...');
    await page.goto('http://localhost:3004/kanagawa/hanabi', { 
      waitUntil: 'networkidle', 
      timeout: 15000 
    });
    
    const localContent = await page.content();
    const $local = cheerio.load(localContent);
    
    const localEvents = [];
    
    // 抓取本地页面的花火大会卡片
    $('.hanabi-card, .event-card, [data-testid*="hanabi"], .card').each((index, element) => {
      const $card = $local(element);
      const title = $card.find('h2, h3, .title, .name').text().trim();
      const likes = $card.find('.likes, .vote, .heart').text().trim();
      const location = $card.find('.location, .place, .venue').text().trim();
      const date = $card.find('.date, .time, .schedule').text().trim();
      const fireworks = $card.find('.fireworks, .count, .number').text().trim();
      const visitors = $card.find('.visitors, .people, .audience').text().trim();
      
      if (title && index < 10) { // 只验证前10个
        localEvents.push({
          rank: index + 1,
          title: title,
          likes: likes,
          location: location,
          date: date,
          fireworks: fireworks,
          visitors: visitors
        });
      }
    });
    
    console.log(`📱 本地数据获取完成，找到前10个活动: ${localEvents.length} 个`);
    
    // 数据对比
    console.log('\n📊 开始数据对比分析...');
    console.log('=' * 50);
    
    for (let i = 0; i < Math.max(walkerPlusEvents.length, localEvents.length); i++) {
      const walker = walkerPlusEvents[i];
      const local = localEvents[i];
      
      console.log(`\n第${i + 1}名对比:`);
      console.log(`WalkerPlus: ${walker ? walker.title : '无数据'} (${walker ? walker.votes : 'N/A'})`);
      console.log(`项目数据: ${local ? local.title : '无数据'} (${local ? local.likes : 'N/A'})`);
      
      if (walker && local) {
        const titleMatch = walker.title.includes(local.title.replace(/第\d+回\s*/, '')) || 
                          local.title.includes(walker.title.replace(/第\d+回\s*/, ''));
        console.log(`标题匹配: ${titleMatch ? '✅' : '❌'}`);
      }
    }
    
    // 生成验证报告
    console.log('\n📝 生成验证报告...');
    const report = {
      timestamp: new Date().toISOString(),
      walkerPlusCount: walkerPlusEvents.length,
      localCount: localEvents.length,
      walkerPlusData: walkerPlusEvents,
      localData: localEvents
    };
    
    console.log('\n✅ 神奈川花火验证完成！');
    console.log(`WalkerPlus官方排行: ${walkerPlusEvents.length} 个活动`);
    console.log(`项目前10个活动: ${localEvents.length} 个活动`);
    
  } catch (error) {
    console.error('❌ 验证过程出错:', error.message);
  } finally {
    await browser.close();
  }
}

// 运行验证
verifyKanagawaHanabiData().then(() => {
  console.log('🎉 神奈川花火验证完成！');
}).catch(error => {
  console.error('💥 验证失败:', error);
}); 