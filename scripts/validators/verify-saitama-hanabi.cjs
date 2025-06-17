const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function verifySaitamaHanabiData() {
  console.log('🚀 开始使用Playwright+Cheerio验证埼玉花火数据...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    
    console.log('📡 正在抓取WalkerPlus埼玉花火排行数据...');
    
    // 抓取WalkerPlus埼玉花火排行数据
    await page.goto('https://hanabi.walkerplus.com/crowd/ar0311/', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const walkerPlusEvents = [];
    
    // 抓取排行榜中的花火大会信息
    $('.rankingList li').each((index, element) => {
      if (index < 10) { // 只取前10个
        const $element = $(element);
        const title = $element.find('.rankingTitle a').text().trim();
        const location = $element.find('.rankingData .location').text().trim();
        const dateText = $element.find('.rankingData .date').text().trim();
        const peopleText = $element.find('.rankingData .people').text().trim();
        const fireworksText = $element.find('.rankingData .fireworks').text().trim();
        const linkHref = $element.find('.rankingTitle a').attr('href');
        
        if (title) {
          walkerPlusEvents.push({
            rank: index + 1,
            title: title,
            location: location,
            date: dateText,
            people: peopleText,
            fireworks: fireworksText,
            link: linkHref ? `https://hanabi.walkerplus.com${linkHref}` : ''
          });
        }
      }
    });
    
    console.log(`📊 WalkerPlus抓取到 ${walkerPlusEvents.length} 个埼玉花火排行数据`);
    
    // 抓取本地项目数据
    await page.goto('http://localhost:3007/saitama/hanabi', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const projectContent = await page.content();
    const $project = cheerio.load(projectContent);
    
    const projectEvents = [];
    
    // 抓取项目中的花火活动卡片（前10个）
    $('.grid .bg-white').each((index, element) => {
      if (index < 10) {
        const $card = $(element);
        const title = $card.find('h3').text().trim();
        const location = $card.find('.text-sm').first().text().replace('📍', '').trim();
        const dateText = $card.find('.text-sm').eq(0).text().trim();
        const fireworksMatch = $card.text().match(/🎆(\d+(?:,\d+)*(?:发|發))/);
        const peopleMatch = $card.text().match(/👥([\d,]+(?:人|万人))/);
        const linkElement = $card.find('a[href*="/hanabi/"]');
        
        if (title) {
          projectEvents.push({
            index: index + 1,
            title: title,
            location: location,
            date: dateText.includes('📅') ? dateText.replace('📅', '').trim() : '',
            fireworks: fireworksMatch ? fireworksMatch[1] : '',
            people: peopleMatch ? peopleMatch[1] : '',
            link: linkElement.length > 0 ? linkElement.attr('href') : ''
          });
        }
      }
    });
    
    console.log(`📊 项目抓取到 ${projectEvents.length} 个埼玉花火活动卡片`);
    
    // 输出详细比较结果
    console.log('\n🔍 详细验证结果：');
    console.log('==========================================');
    
    walkerPlusEvents.forEach((walkerEvent, index) => {
      console.log(`\n📍 排名 ${walkerEvent.rank}：${walkerEvent.title}`);
      console.log(`WalkerPlus: ${walkerEvent.location} | ${walkerEvent.date} | ${walkerEvent.people} | ${walkerEvent.fireworks}`);
      
      if (projectEvents[index]) {
        const projectEvent = projectEvents[index];
        console.log(`项目数据: ${projectEvent.location} | ${projectEvent.date} | ${projectEvent.people} | ${projectEvent.fireworks}`);
        
        // 比较差异
        const differences = [];
        if (walkerEvent.title !== projectEvent.title) differences.push('标题');
        if (walkerEvent.location !== projectEvent.location) differences.push('地点');
        if (walkerEvent.date !== projectEvent.date) differences.push('日期');
        if (walkerEvent.people !== projectEvent.people) differences.push('观众数');
        if (walkerEvent.fireworks !== projectEvent.fireworks) differences.push('花火数');
        
        if (differences.length > 0) {
          console.log(`❌ 发现差异: ${differences.join(', ')}`);
        } else {
          console.log('✅ 数据一致');
        }
      } else {
        console.log('❌ 项目中未找到对应活动');
      }
    });
    
    await browser.close();
    
    console.log('\n🎉 埼玉花火验证完成！');
    return { walkerPlusEvents, projectEvents };
    
  } catch (error) {
    await browser.close();
    console.error('❌ 验证过程出错:', error.message);
    throw error;
  }
}

// 运行验证
verifySaitamaHanabiData()
  .then(result => {
    console.log(`📊 WalkerPlus活动: ${result.walkerPlusEvents.length}个`);
    console.log(`📡 项目活动: ${result.projectEvents.length}个`);
  })
  .catch(error => {
    console.error('💥 验证失败:', error.message);
    process.exit(1);
  }); 