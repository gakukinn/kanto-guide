const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function verifyChibaHanabiData() {
  console.log('🚀 开始使用Playwright+Cheerio验证千叶花火数据...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    console.log('📡 正在抓取WalkerPlus千叶花火排行数据...');
    
    // 抓取WalkerPlus千叶花火排行数据
    await page.goto('https://hanabi.walkerplus.com/crowd/ar0312/', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const walkerPlusEvents = [];
    
    // 抓取排行榜中的花火大会信息
    $('.rankingList li, .ranking-item, [data-event]').each((index, element) => {
      const $el = $(element);
      const name = $el.find('h3, .title, .event-title').text().trim() || 
                   $el.find('a').text().trim();
      const votes = $el.find('.vote, .count, .number').text().trim();
      const link = $el.find('a').attr('href');
      
      if (name && index < 10) {
        walkerPlusEvents.push({
          rank: index + 1,
          name: name,
          votes: votes,
          link: link
        });
      }
    });
    
    console.log(`📊 WalkerPlus数据获取完成，找到 ${walkerPlusEvents.length} 个排行活动`);
    
    // 抓取项目本地数据
    console.log('📱 正在抓取项目本地千叶花火数据...');
    await page.goto('http://localhost:3004/chiba/hanabi', { 
      waitUntil: 'networkidle', 
      timeout: 15000 
    });
    
    const localContent = await page.content();
    const $local = cheerio.load(localContent);
    
    const localEvents = [];
    
    // 抓取本地项目的花火活动信息
    $local('[data-testid*="hanabi"], .hanabi-card, .event-card, .card').each((index, element) => {
      const $card = $local(element);
      const title = $card.find('h3, .title, .event-title').text().trim();
      const date = $card.find('[class*="date"], .date').text().trim();
      const location = $card.find('[class*="location"], .location').text().trim();
      const visitors = $card.find('[class*="visitor"], .visitors').text().trim();
      const fireworks = $card.find('[class*="firework"], .fireworks').text().trim();
      const likes = $card.find('[class*="like"], .likes').text().trim();
      const detailLink = $card.find('a').attr('href');
      
      if (title && index < 10) {
        localEvents.push({
          index: index + 1,
          title: title,
          date: date,
          location: location,
          visitors: visitors,
          fireworks: fireworks,
          likes: likes,
          detailLink: detailLink
        });
        
        console.log(`🎯 发现千叶花火活动: ${title}${date}${location}${visitors}${fireworks}❤️${likes}${detailLink ? '查看详情...' : ''}`);
      }
    });
    
    console.log(`📊 项目数据抓取完成，发现 ${localEvents.length} 个千叶花火活动`);
    
    // 生成对比报告
    console.log('\n📋 千叶花火数据对比分析:');
    console.log('==========================================');
    
    if (walkerPlusEvents.length > 0) {
      console.log('🏆 WalkerPlus千叶花火"行ってみたい"排行榜前10名:');
      walkerPlusEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.name} (${event.votes}票)`);
      });
    }
    
    console.log('\n📱 项目千叶花火前10个活动:');
    localEvents.forEach((event) => {
      console.log(`${event.index}. ${event.title} - ${event.date} - ${event.location}`);
    });
    
    // 数据对比
    let matches = 0;
    let differences = 0;
    
    localEvents.forEach((local) => {
      const found = walkerPlusEvents.find(wp => 
        wp.name.includes(local.title.substring(0, 10)) || 
        local.title.includes(wp.name.substring(0, 10))
      );
      
      if (found) {
        matches++;
        console.log(`✅ 匹配: ${local.title} ↔ ${found.name}`);
      } else {
        differences++;
        console.log(`❌ 差异: ${local.title} (项目独有或名称差异)`);
      }
    });
    
    console.log('\n📊 验证统计:');
    console.log(`📊 项目活动: ${localEvents.length}个`);
    console.log(`📡 WalkerPlus活动: ${walkerPlusEvents.length}个`);
    console.log(`✅ 完全匹配: ${matches}个`);
    console.log(`❌ 存在差异: ${differences}个`);
    console.log(`⚠️ 项目独有: ${Math.max(0, localEvents.length - matches)}个`);
    console.log(`📋 WalkerPlus独有: ${Math.max(0, walkerPlusEvents.length - matches)}个`);
    
  } catch (error) {
    console.error('❌ 验证过程出错:', error.message);
  } finally {
    await browser.close();
    console.log('🎉 千叶花火验证完成！');
  }
}

// 运行验证
verifyChibaHanabiData(); 