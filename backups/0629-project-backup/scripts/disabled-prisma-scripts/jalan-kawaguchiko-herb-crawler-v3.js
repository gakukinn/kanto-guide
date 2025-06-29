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

// 验证坐标是否在日本范围内
function isValidJapanCoords(lat, lng) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  // 日本坐标范围: 纬度30-40，经度135-145
  return latitude >= 30 && latitude <= 40 && longitude >= 135 && longitude <= 145;
}

// 方法1: iframe地图分析
async function extractIframeCoords(page) {
  console.log('🔍 方法1: 检查iframe地图...');
  
  return await page.evaluate(() => {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    for (const iframe of iframes) {
      const src = iframe.src;
      if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
        console.log('发现Google Maps iframe:', src);
        
        // 多种坐标格式匹配
        const patterns = [
          /[!@]([0-9.-]+),([0-9.-]+)/,
          /center=([0-9.-]+),([0-9.-]+)/,
          /q=([0-9.-]+),([0-9.-]+)/,
          /ll=([0-9.-]+),([0-9.-]+)/
        ];
        
        for (const pattern of patterns) {
          const match = src.match(pattern);
          if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            return { lat, lng, source: `iframe-${pattern.source}` };
          }
        }
      }
    }
    return null;
  });
}

// 方法2: JavaScript变量搜索
async function extractJsCoords(page) {
  console.log('🔍 方法2: 搜索JavaScript变量...');
  
  return await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    for (const script of scripts) {
      const text = script.textContent || '';
      
      const patterns = [
        /lat[:\s]*([0-9.]+)[\s,]*lng[:\s]*([0-9.]+)/gi,
        /latitude[:\s]*([0-9.]+)[\s,]*longitude[:\s]*([0-9.]+)/gi,
        /"lat"[:\s]*([0-9.]+)[\s,]*"lng"[:\s]*([0-9.]+)/gi,
        /position[:\s]*\{[^}]*lat[:\s]*([0-9.]+)[^}]*lng[:\s]*([0-9.]+)/gi
      ];
      
      for (const pattern of patterns) {
        const match = pattern.exec(text);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          return { lat, lng, source: `javascript-${pattern.source}` };
        }
      }
    }
    return null;
  });
}

// 方法3: 链接坐标提取 ⭐ (技术指南推荐的成功方法)
async function extractLinkCoords(page) {
  console.log('🔍 方法3: 提取地图链接坐标...');
  
  return await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
    
    for (const link of links) {
      const href = link.href;
      console.log('检查地图链接:', href);
      
      const patterns = [
        /@([0-9.-]+),([0-9.-]+)/,
        /ll=([0-9.-]+),([0-9.-]+)/,
        /center=([0-9.-]+),([0-9.-]+)/,
        /q=([0-9.-]+),([0-9.-]+)/,
        /!3d([0-9.-]+)!4d([0-9.-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = href.match(pattern);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          console.log(`发现坐标: ${lat}, ${lng} (来源: ${pattern.source})`);
          return { lat, lng, source: `link-${pattern.source}`, url: href };
        }
      }
    }
    return null;
  });
}

// 方法4: Meta标签检查
async function extractMetaCoords(page) {
  console.log('🔍 方法4: 检查Meta标签...');
  
  return await page.evaluate(() => {
    const geoPosition = document.querySelector('meta[name="geo.position"]');
    const icbm = document.querySelector('meta[name="ICBM"]');
    
    if (geoPosition) {
      const content = geoPosition.getAttribute('content');
      const coords = content.split(',');
      if (coords.length === 2) {
        return { 
          lat: parseFloat(coords[0]), 
          lng: parseFloat(coords[1]), 
          source: 'meta-geo.position' 
        };
      }
    }
    
    if (icbm) {
      const content = icbm.getAttribute('content');
      const coords = content.split(',');
      if (coords.length === 2) {
        return { 
          lat: parseFloat(coords[0]), 
          lng: parseFloat(coords[1]), 
          source: 'meta-icbm' 
        };
      }
    }
    
    return null;
  });
}

// 综合坐标提取函数
async function extractGoogleMapsCoordinates(page) {
  console.log('🗺️ 开始多方法坐标提取...');
  
  // 按技术指南推荐的优先级提取
  const iframeCoords = await extractIframeCoords(page);
  const jsCoords = await extractJsCoords(page);
  const linkCoords = await extractLinkCoords(page);
  const metaCoords = await extractMetaCoords(page);
  
  console.log('📊 提取结果汇总:');
  console.log('iframe方法:', iframeCoords);
  console.log('JavaScript方法:', jsCoords);
  console.log('链接方法:', linkCoords);
  console.log('Meta标签方法:', metaCoords);
  
  // 按优先级选择最可靠的结果
  let finalCoords = null;
  let coordsSource = '';
  
  if (iframeCoords?.lat && iframeCoords?.lng && isValidJapanCoords(iframeCoords.lat, iframeCoords.lng)) {
    finalCoords = { latitude: iframeCoords.lat, longitude: iframeCoords.lng };
    coordsSource = iframeCoords.source;
    console.log('✅ 使用iframe方法提取的坐标');
  } else if (jsCoords?.lat && jsCoords?.lng && isValidJapanCoords(jsCoords.lat, jsCoords.lng)) {
    finalCoords = { latitude: jsCoords.lat, longitude: jsCoords.lng };
    coordsSource = jsCoords.source;
    console.log('✅ 使用JavaScript方法提取的坐标');
  } else if (linkCoords?.lat && linkCoords?.lng && isValidJapanCoords(linkCoords.lat, linkCoords.lng)) {
    finalCoords = { latitude: linkCoords.lat, longitude: linkCoords.lng };
    coordsSource = linkCoords.source;
    console.log('✅ 使用链接方法提取的坐标 (技术指南推荐)');
  } else if (metaCoords?.lat && metaCoords?.lng && isValidJapanCoords(metaCoords.lat, metaCoords.lng)) {
    finalCoords = { latitude: metaCoords.lat, longitude: metaCoords.lng };
    coordsSource = metaCoords.source;
    console.log('✅ 使用Meta标签方法提取的坐标');
  }
  
  if (finalCoords) {
    console.log(`🎯 最终坐标: ${finalCoords.latitude}, ${finalCoords.longitude} (来源: ${coordsSource})`);
    
    // 生成Google Maps相关URL
    const mapUrl = `https://maps.google.com/?q=${finalCoords.latitude},${finalCoords.longitude}`;
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${finalCoords.longitude}!3d${finalCoords.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5rKz5Y-j5rmW44OP44O844OW44OV44Kn44K544OG44Kj44OQ44Or!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;
    
    return {
      ...finalCoords,
      coordsSource,
      mapUrl,
      embedUrl
    };
  } else {
    console.log('❌ 未能提取到有效的坐标');
    return null;
  }
}

// 主爬虫函数
async function crawlJalanEvent() {
  const url = 'https://www.jalan.net/event/evt_342198/?screenId=OUW1702';
  
  console.log('🚀 开始爬取Jalan活动信息...');
  console.log('目标URL:', url);
  
  try {
    // 启动Playwright (按技术指南配置)
    const browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security', 
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // 设置用户代理避免反爬虫
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    // 设置超时时间
    page.setDefaultTimeout(30000);
    
    // 访问页面，使用宽松的等待条件
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // 等待页面内容加载
    await page.waitForTimeout(3000);
    
    // 基本活动信息
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
    
    // 使用技术指南的4种方法提取精确坐标
    eventData.coordinates = await extractGoogleMapsCoordinates(page);
    
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
    
    // 准备地图信息
    const mapInfo = eventData.coordinates ? {
      address: eventData.address,
      coordinates: {
        latitude: eventData.coordinates.latitude,
        longitude: eventData.coordinates.longitude
      },
      mapUrl: eventData.coordinates.mapUrl,
      embedUrl: eventData.coordinates.embedUrl,
      coordsSource: eventData.coordinates.coordsSource
    } : undefined;
    
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
      mapInfo: mapInfo,
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
    if (eventData.coordinates) {
      console.log('🗺️ 精确坐标:', `${eventData.coordinates.latitude}, ${eventData.coordinates.longitude}`);
      console.log('📍 坐标来源:', eventData.coordinates.coordsSource);
      console.log('🔗 地图链接:', eventData.coordinates.mapUrl);
    } else {
      console.log('🗺️ 坐标提取: 未成功');
    }
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
    console.log('🎯 河口湖ハーブフェスティバル 精确坐标提取');
    console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
    console.log('🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)');
    console.log('🔄 覆盖策略: name相同时自动覆盖');
    console.log('📋 参考文档: 0622-谷歌地图Playwright和Cheerio坐标提取技术指南');
    console.log('='.repeat(70));
    
    const result = await crawlJalanEvent();
    
    console.log('='.repeat(70));
    console.log('🎉 爬取任务完成!');
    console.log('✅ 使用技术指南推荐的4种方法精确提取坐标');
    
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