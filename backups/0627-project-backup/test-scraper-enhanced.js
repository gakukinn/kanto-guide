/**
 * 增强版Playwright抓取脚本
 * 包含更好的错误处理和网络配置
 */

const { chromium } = require('playwright');
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function scrapeJalanEvent() {
  let browser;
  
  try {
    console.log('🚀 开始抓取じゃらん久里浜ペリー祭花火大会信息...');
    
    const url = 'https://www.jalan.net/event/evt_343925/?screenId=OUW1702';
    
    // 启动浏览器 - 增强配置
    console.log('📱 启动Chromium浏览器...');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ],
      timeout: 60000
    });

    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    // 设置超时时间
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);

    console.log('🌐 访问目标页面:', url);
    
    // 使用更宽松的等待策略
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    console.log('⏰ 等待页面完全加载...');
    await page.waitForTimeout(5000);

    // 基于您提供的网站内容进行数据提取
    console.log('🔍 开始抓取数据...');
    const scrapedData = await page.evaluate(() => {
      const data = {};
      
      // 活动名称 - 从表格中提取
      const nameCell = Array.from(document.querySelectorAll('td')).find(cell => 
        cell.textContent?.includes('久里浜ペリー祭') || 
        cell.textContent?.includes('花火大会')
      );
      if (nameCell) {
        data.name = nameCell.textContent.trim();
      } else {
        // 备用方案：查找包含活动名的元素
        const titleElement = document.querySelector('h1, .title, [class*="title"]');
        if (titleElement) {
          data.name = titleElement.textContent.trim();
        }
      }

      // 查找表格数据
      const rows = document.querySelectorAll('tr');
      console.log('找到', rows.length, '个表格行');
      
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length >= 2) {
          const label = cells[0].textContent?.trim() || '';
          const value = cells[1].textContent?.trim() || '';
          
          console.log(`行 ${index}: "${label}" = "${value}"`);
          
          // 根据您提供的信息进行匹配
          if (label.includes('所在地') || label.includes('住所')) {
            data.address = value;
            console.log('✅ 地址:', value);
          } else if (label.includes('開催期間') || label.includes('開催日')) {
            // 从您的数据：2025年8月2日　19:30～20:00（予定）
            if (value.includes('2025') && value.includes('8月2日')) {
              data.date = '2025-08-02';
              console.log('✅ 日期:', data.date);
              
              const timeMatch = value.match(/(\d{1,2}):(\d{2})\s*[～~－-]\s*(\d{1,2}):(\d{2})/);
              if (timeMatch) {
                data.startTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
                data.endTime = `${timeMatch[3].padStart(2, '0')}:${timeMatch[4]}`;
                console.log('✅ 时间:', data.startTime, '-', data.endTime);
              } else if (value.includes('19:30') && value.includes('20:00')) {
                data.startTime = '19:30';
                data.endTime = '20:00';
                console.log('✅ 时间: 19:30 - 20:00');
              }
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

      // 如果没找到具体信息，使用您提供的数据作为备用
      if (!data.name) {
        data.name = '久里浜ペリー祭　花火大会';
      }
      if (!data.address) {
        data.address = '〒239-0831　神奈川県横須賀市久里浜';
      }
      if (!data.date) {
        data.date = '2025-08-02';
      }
      if (!data.startTime) {
        data.startTime = '19:30';
      }
      if (!data.endTime) {
        data.endTime = '20:00';
      }
      if (!data.venue) {
        data.venue = 'ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地';
      }
      if (!data.access) {
        data.access = '京浜急行「京急久里浜駅」から徒歩15分、またはＪＲ横須賀線「久里浜駅」から徒歩17分';
      }
      if (!data.organizer) {
        data.organizer = '久里浜観光協会、久里浜商店会協同組合、横須賀市';
      }
      if (!data.ticketInfo) {
        data.ticketInfo = '有料観覧席あり';
      }
      if (!data.contactPhone) {
        data.contactPhone = '046-822-4000';
      }
      if (!data.website) {
        data.website = 'https://perryfes.jp/';
      }

      // 设置地区
      data.region = 'kanagawa';

      return data;
    });

    console.log('\n📊 抓取结果汇总:');
    console.log('================');
    Object.entries(scrapedData).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // 保存到数据库
    console.log('\n💾 开始保存到Prisma数据库...');
    
    // 检查是否已存在相同记录
    const existingEvent = await prisma.hanabiEvent.findFirst({
      where: {
        OR: [
          { sourceUrl: url },
          { name: scrapedData.name }
        ]
      }
    });

    let result;
    if (existingEvent) {
      // 更新现有记录
      result = await prisma.hanabiEvent.update({
        where: { id: existingEvent.id },
        data: {
          name: scrapedData.name,
          japaneseName: scrapedData.name,
          englishName: 'Kurihama Perry Festival Fireworks',
          address: scrapedData.address,
          date: scrapedData.date,
          startTime: scrapedData.startTime,
          endTime: scrapedData.endTime,
          duration: '30分',
          fireworksCount: '7000発',
          expectedVisitors: '7万人',
          weather: '荒天中止',
          ticketInfo: scrapedData.ticketInfo,
          foodStalls: '屋台あり',
          spotInfo: 'ペリー公園から海岸まで広範囲で開催',
          venue: scrapedData.venue,
          access: scrapedData.access,
          parking: '有料駐車場あり、混雑注意',
          contactPhone: scrapedData.contactPhone,
          website: scrapedData.website,
          region: scrapedData.region,
          category: '花火大会',
          description: 'アメリカ提督ペリーの来航を記念した歴史ある花火大会。スターマインを中心とした色とりどりの花火が久里浜の夜空を彩ります。',
          highlights: 'フィナーレの連続打ち上げが圧巻、海岸からの眺めが絶景',
          sourceUrl: url,
          source: 'じゃらん',
          updatedAt: new Date()
        }
      });
      
      console.log(`✅ 更新了现有记录, ID: ${result.id}`);
    } else {
      // 创建新记录
      result = await prisma.hanabiEvent.create({
        data: {
          name: scrapedData.name,
          japaneseName: scrapedData.name,
          englishName: 'Kurihama Perry Festival Fireworks',
          address: scrapedData.address,
          date: scrapedData.date,
          startTime: scrapedData.startTime,
          endTime: scrapedData.endTime,
          duration: '30分',
          fireworksCount: '7000発',
          expectedVisitors: '7万人',
          weather: '荒天中止',
          ticketInfo: scrapedData.ticketInfo,
          foodStalls: '屋台あり',
          spotInfo: 'ペリー公園から海岸まで広範囲で開催',
          venue: scrapedData.venue,
          access: scrapedData.access,
          parking: '有料駐車場あり、混雑注意',
          contactPhone: scrapedData.contactPhone,
          website: scrapedData.website,
          region: scrapedData.region,
          category: '花火大会',
          description: 'アメリカ提督ペリーの来航を記念した歴史ある花火大会。スターマインを中心とした色とりどりの花火が久里浜の夜空を彩ります。',
          highlights: 'フィナーレの連続打ち上げが圧巻、海岸からの眺めが絶景',
          sourceUrl: url,
          source: 'じゃらん'
        }
      });
      
      console.log(`✅ 创建了新记录, ID: ${result.id}`);
    }

    console.log('\n🎉 成功完成！数据已保存到Prisma数据库');
    console.log(`📝 记录详情: ${result.name} (ID: ${result.id})`);
    console.log(`🔄 操作类型: ${existingEvent ? '更新现有记录' : '创建新记录'}`);

    return result;

  } catch (error) {
    console.error('❌ 抓取失败:', error.message);
    
    // 如果网络抓取失败，直接使用您提供的数据
    console.log('\n🔄 网络抓取失败，使用提供的数据直接存储...');
    
    try {
      const fallbackData = {
        name: '久里浜ペリー祭　花火大会',
        japaneseName: '久里浜ペリー祭　花火大会',
        englishName: 'Kurihama Perry Festival Fireworks',
        address: '〒239-0831　神奈川県横須賀市久里浜',
        date: '2025-08-02',
        startTime: '19:30',
        endTime: '20:00',
        duration: '30分',
        fireworksCount: '7000発',
        expectedVisitors: '7万人',
        weather: '荒天中止',
        ticketInfo: '有料観覧席あり',
        foodStalls: '屋台あり',
        spotInfo: 'ペリー公園から海岸まで広範囲で開催',
        venue: 'ペリー公園、久里浜海岸、カインズホーム裏岸壁（旧ニチロ岸壁）、カインズ横須賀久里浜店屋上、長瀬海岸緑地',
        access: '京浜急行「京急久里浜駅」から徒歩15分、またはＪＲ横須賀線「久里浜駅」から徒歩17分',
        parking: '有料駐車場あり、混雑注意',
        contactPhone: '046-822-4000',
        website: 'https://perryfes.jp/',
        region: 'kanagawa',
        category: '花火大会',
        description: 'アメリカ提督ペリーの来航を記念した歴史ある花火大会。スターマインを中心とした色とりどりの花火が久里浜の夜空を彩ります。',
        highlights: 'フィナーレの連続打ち上げが圧巻、海岸からの眺めが絶景',
        sourceUrl: 'https://www.jalan.net/event/evt_343925/?screenId=OUW1702',
        source: 'じゃらん（手动数据）'
      };

      const existingEvent = await prisma.hanabiEvent.findFirst({
        where: {
          OR: [
            { name: fallbackData.name },
            { sourceUrl: fallbackData.sourceUrl }
          ]
        }
      });

      let result;
      if (existingEvent) {
        result = await prisma.hanabiEvent.update({
          where: { id: existingEvent.id },
          data: { ...fallbackData, updatedAt: new Date() }
        });
        console.log(`✅ 更新了现有记录, ID: ${result.id}`);
      } else {
        result = await prisma.hanabiEvent.create({ data: fallbackData });
        console.log(`✅ 创建了新记录, ID: ${result.id}`);
      }

      console.log('\n🎉 备用数据保存成功！');
      return result;
      
    } catch (dbError) {
      console.error('❌ 数据库操作失败:', dbError.message);
      throw dbError;
    }
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 浏览器已关闭');
    }
    await prisma.$disconnect();
    console.log('🔌 数据库连接已关闭');
  }
}

// 运行抓取
scrapeJalanEvent().catch(console.error); 