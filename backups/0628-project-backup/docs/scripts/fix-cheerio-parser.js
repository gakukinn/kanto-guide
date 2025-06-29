const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

// 活动分类函数
function classifyActivity(name, description = '') {
  const text = (name + ' ' + description).toLowerCase();
  
  if (text.includes('花火') || text.includes('hanabi') || text.includes('fireworks')) {
    return 'hanabi';
  }
  if (text.includes('まつり') || text.includes('祭') || text.includes('festival') || 
      text.includes('神輿') || text.includes('神社') || text.includes('盆踊り')) {
    return 'matsuri';
  }
  if (text.includes('桜') || text.includes('花見') || text.includes('cherry') || 
      text.includes('あじさい') || text.includes('菖蒲') || text.includes('バラ') || 
      text.includes('ハーブ') || text.includes('ラベンダー')) {
    return 'hanami';
  }
  if (text.includes('紅葉') || text.includes('もみじ') || text.includes('autumn')) {
    return 'momiji';
  }
  if (text.includes('イルミネーション') || text.includes('illumination') || 
      text.includes('ライトアップ') || text.includes('light')) {
    return 'illumination';
  }
  return 'culture';
}

async function fixParserTest() {
  console.log('🔧 修复Cheerio解析器测试...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // 测试第二个活动
    console.log('📄 访问デザインフェスタ vol.61页面...');
    await page.goto('https://www.jalan.net/event/evt_339863/', {
      waitUntil: 'load',
      timeout: 60000
    });
    await page.waitForTimeout(3000);

    const html = await page.content();
    const $ = cheerio.load(html);

    console.log('🔍 解析基本信息表格...');
    
    // 提取活动信息 - 正确的CSS选择器
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

    // 从基本信息表格中提取数据
    $('table tr').each((index, element) => {
      const $row = $(element);
      const label = $row.find('td').first().text().trim();
      const value = $row.find('td').last().text().trim();
      
      console.log(`表格行 ${index}: "${label}" = "${value}"`);
      
      switch (label) {
        case '名称':
          activityData.name = value.replace(/（.*?）/, '').trim();
          break;
        case '所在地':
          activityData.address = value.split(' 键盘快捷键')[0].trim(); // 去除地图控件文本
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
    });

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

    console.log('✅ 解析结果:');
    console.log('1. 名称:', activityData.name);
    console.log('2. 所在地:', activityData.address);
    console.log('3. 開催期間:', activityData.datetime);
    console.log('4. 開催場所:', activityData.venue);
    console.log('5. 交通アクセス:', activityData.access);
    console.log('6. 主催:', activityData.organizer);
    console.log('7. 料金:', activityData.price);
    console.log('8. 問合せ先:', activityData.contact);
    console.log('9. ホームページ:', activityData.website);
    console.log('10. 谷歌网站:', activityData.googleMap);

    // 检查是否有空字段
    const fields = [
      activityData.name, activityData.address, activityData.datetime, 
      activityData.venue, activityData.access, activityData.organizer, 
      activityData.price, activityData.contact, activityData.website, 
      activityData.googleMap
    ];
    const emptyFields = fields.filter(field => !field || field.trim() === '').length;
    console.log(`📊 空字段数量: ${emptyFields}/10`);

  } catch (error) {
    console.error('❌ 测试失败:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

fixParserTest(); 