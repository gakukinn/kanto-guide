const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function fixCorrectParser() {
  console.log('🔧 使用正确的选择器重新解析...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('📄 访问デザインフェスタ vol.61页面...');
    await page.goto('https://www.jalan.net/event/evt_339863/', {
      waitUntil: 'load',
      timeout: 60000
    });
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    console.log('🔍 寻找デザインフェスタ vol.61の基本情報表格...');
    
    const activityData = {
      name: '',
      address: '',
      datetime: '',
      venue: '',
      access: '',
      organizer: '',
      price: '',
      contact: '',
      website: '',
      googleMap: '',
      region: '東京都'
    };

    // 找到基本情况标题下方的表格
    const basicInfoHeading = $('h2:contains("基本情報")');
    console.log('基本情报标题:', basicInfoHeading.text());
    
    if (basicInfoHeading.length > 0) {
      const table = basicInfoHeading.next('table');
      console.log('找到基本情报表格:', table.length > 0);
      
      if (table.length > 0) {
        table.find('tr').each((index, element) => {
          const $row = $(element);
          const cells = $row.find('td');
          
          if (cells.length >= 2) {
            const label = $(cells[0]).text().trim();
            let value = $(cells[1]).text().trim();
            
            // 清理地址字段中的地图控件文本
            if (label === '所在地') {
              // 获取地址部分，去除地图相关文本
              const addressMatch = value.match(/(〒\d{3}.*?東京都.*?)(?:\s|键盘快捷键|地图|切换)/);
              if (addressMatch) {
                value = addressMatch[1].trim();
              }
            }
            
            console.log(`${label}: ${value}`);
            
            switch (label) {
              case '名称':
                activityData.name = value.replace(/（.*?）/, '').trim();
                break;
              case '所在地':
                activityData.address = value;
                break;
              case '開催期間':
                activityData.datetime = value;
                break;
              case '開催場所':
                activityData.venue = value;
                break;
              case '交通アクセス':
                activityData.access = value;
                break;
              case '主催':
                activityData.organizer = value;
                break;
              case '料金':
                activityData.price = value;
                break;
              case '問合せ先':
                activityData.contact = value;
                break;
              case 'ホームページ':
                activityData.website = value;
                break;
            }
          }
        });
      }
    }

    // 提取Google Maps坐标
    const mapLink = $('a[href*="maps.google.com"]').attr('href');
    if (mapLink) {
      const coordsMatch = mapLink.match(/ll=([0-9.-]+),([0-9.-]+)/);
      if (coordsMatch) {
        const lat = coordsMatch[1];
        const lng = coordsMatch[2];
        activityData.googleMap = `https://maps.google.com/maps?ll=${lat},${lng}&z=15&t=m`;
      }
    }

    console.log('\n✅ 最终解析结果:');
    console.log('1. 名称:', activityData.name || '❌ 缺失');
    console.log('2. 所在地:', activityData.address || '❌ 缺失');
    console.log('3. 開催期間:', activityData.datetime || '❌ 缺失');
    console.log('4. 開催場所:', activityData.venue || '❌ 缺失');
    console.log('5. 交通アクセス:', activityData.access || '❌ 缺失');
    console.log('6. 主催:', activityData.organizer || '❌ 缺失');
    console.log('7. 料金:', activityData.price || '❌ 缺失');
    console.log('8. 問合せ先:', activityData.contact || '❌ 缺失');
    console.log('9. ホームページ:', activityData.website || '❌ 缺失');
    console.log('10. 谷歌网站:', activityData.googleMap || '❌ 缺失');

    // 检查空字段数量
    const fields = [
      activityData.name, activityData.address, activityData.datetime, 
      activityData.venue, activityData.access, activityData.organizer, 
      activityData.price, activityData.contact, activityData.website, 
      activityData.googleMap
    ];
    const emptyFields = fields.filter(field => !field || field.trim() === '').length;
    console.log(`\n📊 空字段数量: ${emptyFields}/10`);

    if (emptyFields === 0) {
      console.log('🎉 完美！所有字段都已正确提取！');
    } else {
      console.log('⚠️ 仍有字段缺失，需要进一步调试');
    }

  } catch (error) {
    console.error('❌ 解析失败:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

fixCorrectParser(); 