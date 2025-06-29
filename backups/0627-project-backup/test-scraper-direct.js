/**
 * 直接测试Playwright抓取功能
 * 不依赖Next.js开发服务器
 */

const { chromium } = require('playwright');

async function testJalanScraper() {
  let browser;
  
  try {
    console.log('🚀 开始测试じゃらん抓取功能...');
    
    const url = 'https://www.jalan.net/event/evt_343925/?screenId=OUW1702';
    
    // 启动浏览器
    console.log('📱 启动Chromium浏览器...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    console.log('🌐 访问目标页面:', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // 抓取数据
    console.log('🔍 开始抓取数据...');
    const scrapedData = await page.evaluate(() => {
      const data = {};
      
      console.log('页面标题:', document.title);
      
      // 抓取活动名称 - 尝试多种选择器
      const nameSelectors = [
        '.title_h1_s',
        '.event-title', 
        'h1',
        '.event-name',
        '.event_name',
        '[class*="title"]',
        '[class*="event"]'
      ];
      
      for (const selector of nameSelectors) {
        const element = document.querySelector(selector);
        if (element && element.textContent?.trim()) {
          data.name = element.textContent.trim();
          console.log('找到名称 (', selector, '):', data.name);
          break;
        }
      }
      
      // 如果还没找到，使用页面标题
      if (!data.name && document.title) {
        data.name = document.title.trim();
        console.log('使用页面标题作为名称:', data.name);
      }

      // 抓取表格信息
      console.log('开始抓取表格信息...');
      const tableRows = document.querySelectorAll('tr, .info-row, .detail-item, .data-row');
      console.log('找到', tableRows.length, '个表格行');
      
      tableRows.forEach((row, index) => {
        const cells = row.querySelectorAll('th, td, .label, .value, .key, .val');
        if (cells.length >= 2) {
          const label = cells[0].textContent?.trim() || '';
          const value = cells[1].textContent?.trim() || '';
          
          console.log(`行 ${index}: "${label}" = "${value}"`);
          
          if (label.includes('所在地') || label.includes('住所') || label.includes('場所')) {
            data.address = value;
            console.log('✅ 地址:', value);
          } else if (label.includes('開催期間') || label.includes('日程') || label.includes('開催日')) {
            // 解析日期
            const dateMatch = value.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
            if (dateMatch) {
              const year = dateMatch[1];
              const month = dateMatch[2].padStart(2, '0');
              const day = dateMatch[3].padStart(2, '0');
              data.date = `${year}-${month}-${day}`;
              console.log('✅ 日期:', data.date);
            }
            
            // 解析时间
            const timeMatch = value.match(/(\d{1,2}):(\d{2})\s*[～~－-]\s*(\d{1,2}):(\d{2})/);
            if (timeMatch) {
              data.startTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
              data.endTime = `${timeMatch[3].padStart(2, '0')}:${timeMatch[4]}`;
              console.log('✅ 时间:', data.startTime, '-', data.endTime);
            }
          } else if (label.includes('開催場所') || label.includes('会場')) {
            data.venue = value;
            console.log('✅ 会场:', value);
          } else if (label.includes('交通アクセス') || label.includes('アクセス')) {
            data.access = value;
            console.log('✅ 交通:', value);
          } else if (label.includes('主催')) {
            data.organizer = value;
            console.log('✅ 主办:', value);
          } else if (label.includes('料金')) {
            data.ticketInfo = value;
            console.log('✅ 票务:', value);
          } else if (label.includes('問合せ先') || label.includes('問い合わせ')) {
            const phoneMatch = value.match(/\d{2,4}-\d{2,4}-\d{4}/);
            if (phoneMatch) {
              data.contactPhone = phoneMatch[0];
              console.log('✅ 电话:', data.contactPhone);
            }
          } else if (label.includes('ホームページ') || label.includes('公式サイト')) {
            const linkElement = row.querySelector('a[href^="http"]');
            if (linkElement) {
              data.website = linkElement.getAttribute('href');
              console.log('✅ 网站:', data.website);
            }
          }
        }
      });

      // 查找地图坐标
      console.log('开始查找地图坐标...');
      const scripts = document.querySelectorAll('script');
      console.log('找到', scripts.length, '个script标签');
      
      scripts.forEach((script, index) => {
        const content = script.textContent || '';
        if (content.includes('lat') || content.includes('lng') || content.includes('latitude')) {
          console.log(`Script ${index} 包含坐标关键词`);
          
          const patterns = [
            /lat\s*:\s*([\d.-]+).*?lng\s*:\s*([\d.-]+)/,
            /latitude\s*:\s*([\d.-]+).*?longitude\s*:\s*([\d.-]+)/,
            /\{\s*lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)\s*\}/,
            /(35\.\d{4,})[^\d]+(139\.\d{4,})/
          ];

          for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && !data.latitude) {
              data.latitude = parseFloat(match[1]);
              data.longitude = parseFloat(match[2]);
              console.log('✅ 坐标:', data.latitude, data.longitude);
              return;
            }
          }
        }
      });

      // 推断地区
      if (data.address) {
        if (data.address.includes('神奈川') || data.address.includes('横須賀')) {
          data.region = 'kanagawa';
          console.log('✅ 地区: 神奈川');
        }
      }

      return data;
    });

    console.log('\n📊 抓取结果汇总:');
    console.log('================');
    console.log('活动名称:', scrapedData.name || '❌ 未找到');
    console.log('地址:', scrapedData.address || '❌ 未找到');
    console.log('日期:', scrapedData.date || '❌ 未找到');
    console.log('开始时间:', scrapedData.startTime || '❌ 未找到');
    console.log('结束时间:', scrapedData.endTime || '❌ 未找到');
    console.log('会场:', scrapedData.venue || '❌ 未找到');
    console.log('交通:', scrapedData.access || '❌ 未找到');
    console.log('主办方:', scrapedData.organizer || '❌ 未找到');
    console.log('票务信息:', scrapedData.ticketInfo || '❌ 未找到');
    console.log('联系电话:', scrapedData.contactPhone || '❌ 未找到');
    console.log('官方网站:', scrapedData.website || '❌ 未找到');
    console.log('坐标:', scrapedData.latitude && scrapedData.longitude ? 
      `${scrapedData.latitude}, ${scrapedData.longitude}` : '❌ 未找到');
    console.log('地区:', scrapedData.region || '❌ 未推断');
    
    const extractedCount = Object.keys(scrapedData).filter(key => scrapedData[key]).length;
    console.log('\n✅ 成功提取', extractedCount, '个字段');
    
    if (extractedCount === 0) {
      console.log('\n❌ 没有提取到任何数据，可能需要检查页面结构');
    } else {
      console.log('\n🎉 抓取测试成功完成！');
    }

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error(error.stack);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
  }
}

// 运行测试
testJalanScraper().catch(console.error); 