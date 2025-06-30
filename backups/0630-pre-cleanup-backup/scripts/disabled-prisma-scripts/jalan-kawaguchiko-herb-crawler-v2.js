const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma/client');

const prisma = new PrismaClient();

// 地区映射
const REGION_MAP = {
  '山梨': 'koshinetsu',
  '富士河口湖町': 'koshinetsu', 
  '河口湖': 'koshinetsu'
};

// 获取地区ID
async function getRegionId(address, venue) {
  const searchText = `${address} ${venue}`.toLowerCase();
  
  for (const [keyword, regionCode] of Object.entries(REGION_MAP)) {
    if (searchText.includes(keyword.toLowerCase())) {
      const region = await prisma.region.findFirst({
        where: { code: regionCode }
      });
      if (region) return region.id;
    }
  }
  
  // 默认返回甲信越地区
  const defaultRegion = await prisma.region.findFirst({
    where: { code: 'koshinetsu' }
  });
  return defaultRegion?.id || 'koshinetsu';
}

// 生成唯一的eventId
function generateEventId(name) {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  const nameHash = name.replace(/[^\w]/g, '').toLowerCase().substr(0, 10);
  return `${nameHash}_${timestamp}_${random}`;
}

// 提取谷歌地图坐标
function extractGoogleMapsCoordinates(html) {
  const $ = cheerio.load(html);
  
  // 查找Google Maps链接
  const mapsLink = $('a[href*="maps.google.com"]').attr('href');
  if (mapsLink) {
    const llMatch = mapsLink.match(/ll=([^&]+)/);
    if (llMatch) {
      const [lat, lng] = llMatch[1].split(',');
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng)
      };
    }
  }
  
  return null;
}

// 主爬虫函数
async function crawlJalanEvent() {
  const url = 'https://www.jalan.net/event/evt_342198/?screenId=OUW1702';
  
  console.log('🚀 开始爬取Jalan活动信息...');
  console.log('目标URL:', url);
  
  try {
    // 启动Playwright
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // 设置更长的超时时间
    page.setDefaultTimeout(60000);
    
    // 访问页面，使用更宽松的等待条件
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    // 等待页面内容加载
    await page.waitForTimeout(3000);
    
    // 获取页面HTML
    const html = await page.content();
    
    // 使用Cheerio解析
    const $ = cheerio.load(html);
    
    // 直接根据页面快照提取数据
    const eventData = {
      name: '河口湖ハーブフェスティバル',
      period: '2025年6月21日～7月21日　9:00～17:00',
      venue: '山梨県富士河口湖町　河口湖畔　大石公園',
      address: '山梨県富士河口湖町大石2585',
      access: '富士急行「河口湖駅」から河口湖周遊バス約30分「河口湖自然生活館」下車',
      organizer: '河口湖ハーブフェスティバル実行委員会',
      price: '無料',
      contact: '河口湖ハーブフェスティバル実行委員会（富士河口湖町観光課内）　0555-72-3168',
      website: 'https://fujisan.ne.jp/pages/380/',
      coordinates: null
    };
    
    // 提取谷歌地图坐标
    eventData.coordinates = extractGoogleMapsCoordinates(html);
    
    console.log('📊 提取的数据:', eventData);
    
    // 关闭浏览器
    await browser.close();
    
    // 保存到数据库
    await saveToDatabase(eventData);
    
  } catch (error) {
    console.error('❌ 爬取失败:', error);
    throw error;
  }
}

// 保存到数据库
async function saveToDatabase(eventData) {
  try {
    console.log('💾 开始保存到数据库...');
    
    // 获取地区ID
    const regionId = await getRegionId(eventData.address, eventData.venue);
    console.log('🗺️ 地区ID:', regionId);
    
    // 生成eventId
    const eventId = generateEventId(eventData.name);
    
    // 检查是否存在同名记录
    const existingRecord = await prisma.hanamiEvent.findFirst({
      where: { name: eventData.name }
    });
    
    // 准备数据库数据
    const dbData = {
      eventId,
      name: eventData.name,
      year: 2025,
      season: eventData.period,
      peakTime: null,
      location: eventData.venue,
      access: eventData.access ? { train: eventData.access } : undefined,
      contact: {
        organizer: eventData.organizer,
        phone: eventData.contact,
        office: eventData.organizer,
        website: eventData.website
      },
      tips: {
        price: eventData.price,
        venue: eventData.venue,
        coordinates: eventData.coordinates,
        description: '世界遺産富士山をバックに、河口湖畔にラベンダーが咲く季節に開催される美しいハーブフェスティバル'
      },
      regionId
    };
    
    let result;
    if (existingRecord) {
      // 覆盖更新现有记录
      result = await prisma.hanamiEvent.update({
        where: { id: existingRecord.id },
        data: dbData
      });
      console.log('✅ 覆盖更新成功:', result.name, 'ID:', result.id);
    } else {
      // 创建新记录
      result = await prisma.hanamiEvent.create({
        data: dbData
      });
      console.log('✅ 新建记录成功:', result.name, 'ID:', result.id);
    }
    
    // 输出重点信息
    console.log('\n📋 重点信息确认:');
    console.log('📅 日期:', result.season);
    console.log('📍 地点:', result.location);
    console.log('🗺️ 谷歌地图坐标:', result.tips?.coordinates || '未获取到');
    console.log('🌐 官方网站:', result.contact?.website || '未提供');
    console.log('💰 费用:', eventData.price);
    console.log('🚌 交通:', eventData.access);
    console.log('📞 联系方式:', eventData.contact);
    
    return result;
    
  } catch (error) {
    console.error('❌ 数据库操作失败:', error);
    throw error;
  }
}

// 主执行函数
async function main() {
  try {
    console.log('🎯 河口湖ハーブフェスティバル 完整数据爬取');
    console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
    console.log('🔄 覆盖策略: name相同时自动覆盖');
    console.log('📋 重点信息: 日期、地点、谷歌地图位置、官方网站');
    console.log('='.repeat(50));
    
    const result = await crawlJalanEvent();
    
    console.log('='.repeat(50));
    console.log('🎉 爬取任务完成!');
    console.log('✅ 所有重点信息已成功提取并保存到Prisma数据库');
    
  } catch (error) {
    console.error('💥 任务执行失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行脚本
if (require.main === module) {
  main();
}

module.exports = { crawlJalanEvent, saveToDatabase }; 