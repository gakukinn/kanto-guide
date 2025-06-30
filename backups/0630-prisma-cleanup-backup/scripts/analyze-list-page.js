const { chromium } = require('playwright');
const cheerio = require('cheerio');

async function analyzeListPage() {
  console.log('🔍 正在分析东京都活动列表页面...');
  
  let browser = null;
  
  try {
    browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security'
      ]
    });
    
    const page = await browser.newPage();
    
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    console.log('📡 访问页面: https://www.jalan.net/event/130000/?screenId=OUW1025');
    
    await page.goto('https://www.jalan.net/event/130000/?screenId=OUW1025', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // 等待页面加载
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    console.log('\n🔍 分析页面结构...');
    
    // 分析可能的活动列表结构
    const possibleSelectors = [
      '.event-list .event-item',
      '.list-item',
      '.event-card',
      'article',
      '.content-item',
      '.search-result-item',
      'li[class*="event"]',
      'div[class*="event"]',
      'a[href*="/event/evt_"]'
    ];
    
    let foundEvents = [];
    
    for (const selector of possibleSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`✅ 找到选择器 "${selector}": ${elements.length} 个元素`);
        
        elements.each((index, element) => {
          if (index < 3) { // 只分析前3个作为示例
            const $el = $(element);
            const text = $el.text().trim().substring(0, 100);
            const href = $el.attr('href') || $el.find('a').first().attr('href');
            
            console.log(`  样本 ${index + 1}: ${text}...`);
            if (href) {
              console.log(`    链接: ${href}`);
            }
          }
        });
        
        // 收集所有活动链接
        elements.each((index, element) => {
          const $el = $(element);
          let href = $el.attr('href');
          if (!href) {
            href = $el.find('a[href*="/event/evt_"]').first().attr('href');
          }
          
          if (href && href.includes('/event/evt_')) {
            if (!href.startsWith('http')) {
              href = 'https://www.jalan.net' + href;
            }
            
            const title = $el.find('h3, h2, .title, .event-title').first().text().trim() || 
                         $el.text().trim().split('\n')[0];
            
            if (title && title.length > 3) {
              foundEvents.push({
                title: title.substring(0, 50),
                url: href
              });
            }
          }
        });
        
        if (foundEvents.length > 0) {
          break; // 找到了有效的选择器就停止
        }
      }
    }
    
    console.log(`\n📊 发现的活动总数: ${foundEvents.length}`);
    
    if (foundEvents.length > 0) {
      console.log('\n🎯 前10个活动:');
      foundEvents.slice(0, 10).forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   URL: ${event.url}`);
      });
      
      console.log('\n✅ 技术分析结论:');
      console.log('- 可以从列表页面提取活动链接');
      console.log('- 可以批量处理前10个活动');
      console.log('- 每个活动链接可以进一步爬取详细信息');
      
      return foundEvents.slice(0, 10);
    } else {
      console.log('\n❌ 技术分析结论:');
      console.log('- 未能找到标准的活动列表结构');
      console.log('- 页面可能使用动态加载或特殊反爬虫机制');
      console.log('- 建议使用单个URL逐个处理的方式');
      
      return null;
    }
    
  } catch (error) {
    console.error(`❌ 页面分析失败: ${error.message}`);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 运行分析
analyzeListPage().then(result => {
  if (result) {
    console.log('\n🚀 可以继续批量处理！');
  } else {
    console.log('\n⚠️ 建议使用单个URL方式处理');
  }
}); 