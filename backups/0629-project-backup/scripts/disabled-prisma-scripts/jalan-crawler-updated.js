/**
 * Jalan活动爬虫 - 适配新数据库架构
 * 
 * 技术栈: Playwright + Cheerio + Prisma
 * 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)
 * 覆盖策略: name相同时自动覆盖
 * 新架构: 适配最新的数据库字段结构
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

// 谷歌地图坐标提取方法（技术指南推荐）
async function extractCoordinates(page, $) {
  console.log('🗺️ 开始多方法坐标提取...');
  
  const coordinates = {
    iframe: null,
    javascript: null,
    link: null,
    meta: null
  };
  
  // 方法1: 检查iframe地图
  console.log('🔍 方法1: 检查iframe地图...');
  try {
    const iframes = await page.$$('iframe[src*="google.com/maps"]');
    if (iframes.length > 0) {
      const src = await iframes[0].getAttribute('src');
      const iframeMatch = src.match(/!2d([0-9.-]+)!3d([0-9.-]+)/);
      if (iframeMatch) {
        coordinates.iframe = {
          lat: parseFloat(iframeMatch[2]),
          lng: parseFloat(iframeMatch[1]),
          source: 'iframe'
        };
      }
    }
  } catch (e) {
    console.log('iframe方法未找到坐标');
  }
  
  // 方法2: 搜索JavaScript变量
  console.log('🔍 方法2: 搜索JavaScript变量...');
  try {
    const content = await page.content();
    const jsPatterns = [
      /lat[:\s]*([0-9.-]+)[\s,]*lng[:\s]*([0-9.-]+)/gi,
      /latitude[:\s]*([0-9.-]+)[\s,]*longitude[:\s]*([0-9.-]+)/gi,
      /"lat"[:\s]*([0-9.-]+)[\s,]*"lng"[:\s]*([0-9.-]+)/gi
    ];
    
    for (const pattern of jsPatterns) {
      const matches = [...content.matchAll(pattern)];
      if (matches.length > 0) {
        const match = matches[0];
        coordinates.javascript = {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          source: 'javascript'
        };
        break;
      }
    }
  } catch (e) {
    console.log('JavaScript方法未找到坐标');
  }
  
  // 方法3: 提取地图链接坐标（技术指南推荐方法）
  console.log('🔍 方法3: 提取地图链接坐标...');
  try {
    const content = await page.content();
    const linkPatterns = [
      /maps\.google\.com\/maps\?ll=([0-9.-]+),([0-9.-]+)/g,
      /link-ll=([0-9.-]+),([0-9.-]+)/g,
      /q=([0-9.-]+),([0-9.-]+)/g
    ];
    
    for (const pattern of linkPatterns) {
      const matches = [...content.matchAll(pattern)];
      if (matches.length > 0) {
        const match = matches[0];
        coordinates.link = {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          source: pattern.source,
          url: match[0]
        };
        break;
      }
    }
  } catch (e) {
    console.log('链接方法未找到坐标');
  }
  
  // 方法4: 检查Meta标签
  console.log('🔍 方法4: 检查Meta标签...');
  try {
    const metaTags = $('meta[name*="geo"], meta[property*="geo"]');
    metaTags.each((i, tag) => {
      const content = $(tag).attr('content');
      if (content) {
        const match = content.match(/([0-9.-]+)[;,\s]+([0-9.-]+)/);
        if (match) {
          coordinates.meta = {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            source: 'meta'
          };
        }
      }
    });
  } catch (e) {
    console.log('Meta标签方法未找到坐标');
  }
  
  // 输出提取结果
  console.log('📊 提取结果汇总:');
  console.log('iframe方法:', coordinates.iframe);
  console.log('JavaScript方法:', coordinates.javascript);
  console.log('链接方法:', coordinates.link);
  console.log('Meta标签方法:', coordinates.meta);
  
  // 按优先级选择坐标（技术指南推荐链接方法）
  const finalCoords = coordinates.link || coordinates.iframe || coordinates.javascript || coordinates.meta;
  
  if (finalCoords) {
    console.log('✅ 使用链接方法提取的坐标 (技术指南推荐)');
    console.log(`🎯 最终坐标: ${finalCoords.lat}, ${finalCoords.lng} (来源: ${finalCoords.source})`);
  } else {
    console.log('❌ 未能提取到坐标');
  }
  
  return finalCoords;
}

// 主要爬取函数
async function crawlJalanEvent(url) {
  console.log('🚀 开始爬取Jalan活动信息...');
  console.log('目标URL:', url);
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  });
  
  const page = await context.newPage();
  
  try {
    // 增加超时时间并改变等待策略
    console.log('📱 加载页面中... (超时时间: 60秒)');
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    
    // 等待页面稳定
    console.log('⏳ 等待页面稳定...');
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 活动名称
    console.log('📋 提取活动信息...');
    const eventData = {};
    
    // 尝试多种选择器获取活动名称
    const nameSelectors = [
      'h1.event-name',
      'h1',
      '.event-title',
      '.title',
      'h2.event-name',
      'h2'
    ];
    
    for (const selector of nameSelectors) {
      const nameText = $(selector).first().text().trim();
      if (nameText && nameText.length > 0) {
        eventData.name = nameText;
        break;
      }
    }
    
    // 如果仍然没有名称，从title标签获取
    if (!eventData.name) {
      eventData.name = $('title').text().split('|')[0].split('-')[0].trim();
    }
    
    console.log(`🏷️ 活动名称: ${eventData.name}`);
    
    // 开催期间 - 使用更广泛的选择器
    const periodSelectors = [
      '.period', '.date', '.schedule', '.time',
      'dt:contains("開催期間") + dd',
      'dt:contains("期間") + dd',
      'dt:contains("日時") + dd',
      '.event-period',
      '.event-date'
    ];
    
    for (const selector of periodSelectors) {
      const periodText = $(selector).text().trim();
      if (periodText && periodText.length > 0) {
        eventData.period = periodText;
        console.log(`📅 开催期间: ${periodText}`);
        break;
      }
    }
    
    // 开催场所
    const venueSelectors = [
      '.venue', '.location', '.place',
      'dt:contains("開催場所") + dd',
      'dt:contains("場所") + dd',
      'dt:contains("会場") + dd',
      '.event-venue',
      '.event-location'
    ];
    
    for (const selector of venueSelectors) {
      const venueText = $(selector).text().trim();
      if (venueText && venueText.length > 0) {
        eventData.venue = venueText;
        console.log(`📍 开催场所: ${venueText}`);
        break;
      }
    }
    
    // 住所
    const addressSelectors = [
      '.address',
      'dt:contains("住所") + dd',
      'dt:contains("所在地") + dd',
      '.event-address'
    ];
    
    for (const selector of addressSelectors) {
      const addressText = $(selector).text().trim();
      if (addressText && addressText.length > 0) {
        eventData.address = addressText;
        console.log(`🏠 住所: ${addressText}`);
        break;
      }
    }
    
    // 交通方式
    const accessSelectors = [
      '.access',
      'dt:contains("アクセス") + dd',
      'dt:contains("交通") + dd',
      '.event-access'
    ];
    
    for (const selector of accessSelectors) {
      const accessText = $(selector).text().trim();
      if (accessText && accessText.length > 0) {
        eventData.access = accessText;
        console.log(`🚗 交通方式: ${accessText}`);
        break;
      }
    }
    
    // 主催 
    const organizerSelectors = [
      '.organizer',
      'dt:contains("主催") + dd',
      'dt:contains("主办") + dd',
      '.event-organizer'
    ];
    
    for (const selector of organizerSelectors) {
      const organizerText = $(selector).text().trim();
      if (organizerText && organizerText.length > 0) {
        eventData.organizer = organizerText;
        console.log(`🏛️ 主催: ${organizerText}`);
        break;
      }
    }
    
    // 料金
    const priceSelectors = [
      '.price', '.fee',
      'dt:contains("料金") + dd',
      'dt:contains("入場料") + dd',
      'dt:contains("费用") + dd',
      '.event-price'
    ];
    
    for (const selector of priceSelectors) {
      const priceText = $(selector).text().trim();
      if (priceText && priceText.length > 0) {
        eventData.price = priceText;
        console.log(`💰 料金: ${priceText}`);
        break;
      }
    }
    
    // 問合せ先
    const contactSelectors = [
      '.contact',
      'dt:contains("問合せ") + dd',
      'dt:contains("お問い合わせ") + dd',
      'dt:contains("联系") + dd',
      '.event-contact'
    ];
    
    for (const selector of contactSelectors) {
      const contactText = $(selector).text().trim();
      if (contactText && contactText.length > 0) {
        eventData.contact = contactText;
        console.log(`📞 問合せ先: ${contactText}`);
        break;
      }
    }
    
    // ホームページ
    const websiteSelectors = [
      'a[href*="http"]:contains("ホームページ")',
      'a[href*="http"]:contains("公式")',
      'a[href*="http"]:contains("HP")',
      'dt:contains("ホームページ") + dd a',
      'dt:contains("URL") + dd a',
      '.official-site a',
      '.website a'
    ];
    
    for (const selector of websiteSelectors) {
      const websiteUrl = $(selector).attr('href');
      if (websiteUrl && websiteUrl.includes('http')) {
        eventData.website = websiteUrl;
        console.log(`🌐 ホームページ: ${websiteUrl}`);
        break;
      }
    }
    
    // 提取坐标
    console.log('🗺️ 开始提取地图坐标...');
    const coordinates = await extractCoordinates(page, $);
    if (coordinates) {
      eventData.coordinates = {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        coordsSource: coordinates.source,
        mapUrl: `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`,
        embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(eventData.name)}!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`
      };
      console.log(`🎯 坐标获取成功: ${coordinates.lat}, ${coordinates.lng}`);
    }
    
    console.log('📊 完整提取数据:', eventData);
    return eventData;
    
  } finally {
    await browser.close();
  }
}

// 获取地区ID
async function getRegionId(venue, address) {
  // 根据地址判断地区
  const locationText = `${venue} ${address}`.toLowerCase();
  
  let regionCode = 'koshinetsu'; // 默认甲信越
  
  if (locationText.includes('山梨')) {
    regionCode = 'koshinetsu';
  } else if (locationText.includes('東京') || locationText.includes('东京')) {
    regionCode = 'tokyo';
  } else if (locationText.includes('神奈川')) {
    regionCode = 'kanagawa';
  } else if (locationText.includes('埼玉')) {
    regionCode = 'saitama';
  } else if (locationText.includes('千葉')) {
    regionCode = 'chiba';
  }
  
  const region = await prisma.region.findFirst({
    where: { code: regionCode }
  });
  
  return region?.id;
}

// 保存到数据库 - 新架构格式
async function saveToDatabase(eventData) {
  console.log('💾 开始保存到数据库...');
  
  // 获取地区ID
  const regionId = await getRegionId(eventData.venue || '', eventData.address || '');
  console.log('🗺️ 地区ID:', regionId);
  
  // 生成事件ID
  const eventId = `${eventData.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10)}_${Date.now().toString(36)}`;
  
  // 检查是否已存在相同名称的记录
  const existingRecord = await prisma.hanamiEvent.findFirst({
    where: { name: eventData.name }
  });
  
  // 准备数据 - 适配新架构
  const dataToSave = {
    eventId: eventId,
    name: eventData.name,
    japaneseName: eventData.name, // 日语名称
    year: 2025,
    season: eventData.period || '详见官网', // 举办期间
    location: eventData.venue || eventData.address || '',
    venue: eventData.venue,
    address: eventData.address,
    organizer: eventData.organizer || '', // 主办方
    contact: eventData.contact || '', // 联系方式（字符串格式）
    price: eventData.price || '详见官方网站', // 参观费用
    website: eventData.website || '', // 官方网站
    access: eventData.access || '', // 交通方式（字符串格式）
    description: `${eventData.name}是一个精彩的观赏活动，详情请参考官方信息。`,
    mapInfo: eventData.coordinates ? {
      address: eventData.address,
      coordinates: {
        lat: eventData.coordinates.latitude,
        lng: eventData.coordinates.longitude
      },
      mapUrl: eventData.coordinates.mapUrl,
      embedUrl: eventData.coordinates.embedUrl,
      coordsSource: eventData.coordinates.coordsSource
    } : null,
    regionId: regionId
  };
  
  let result;
  if (existingRecord) {
    console.log(`🔄 发现同名活动，执行覆盖更新: ${existingRecord.name}`);
    result = await prisma.hanamiEvent.update({
      where: { id: existingRecord.id },
      data: dataToSave
    });
  } else {
    console.log('➕ 创建新记录');
    result = await prisma.hanamiEvent.create({
      data: dataToSave
    });
  }
  
  console.log('✅ 数据库保存成功!');
  console.log(`📋 记录ID: ${result.id}`);
  console.log(`🏷️ 活动名称: ${result.name}`);
  console.log(`📅 举办期间: ${result.season}`);
  console.log(`📍 举办地点: ${result.location}`);
  console.log(`🏛️ 主办方: ${result.organizer}`);
  console.log(`💰 参观费用: ${result.price}`);
  console.log(`🌐 官方网站: ${result.website}`);
  
  return result;
}

// 主函数
async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('❌ 请提供URL参数');
    console.log('使用方法: node jalan-crawler-updated.js "https://www.jalan.net/event/..."');
    process.exit(1);
  }
  
  try {
    console.log('🎯 Jalan活动信息爬取 (新架构版本)');
    console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
    console.log('🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)');
    console.log('🔄 覆盖策略: name相同时自动覆盖');
    console.log('📋 新架构: 适配最新数据库字段结构');
    console.log('======================================================================');
    
    const eventData = await crawlJalanEvent(url);
    const result = await saveToDatabase(eventData);
    
    console.log('\n🎉 任务执行成功!');
    console.log('📊 重点信息确认:');
    console.log(`  📅 日期: ${result.season}`);
    console.log(`  📍 地点: ${result.location}`);
    console.log(`  🗺️ 谷歌地图位置: ${result.mapInfo?.coordinates ? `${result.mapInfo.coordinates.lat}, ${result.mapInfo.coordinates.lng}` : '未获取'}`);
    console.log(`  🌐 官方网站: ${result.website || '未获取'}`);
    console.log(`  🇯🇵 日语名称: ${result.japaneseName}`);
    
  } catch (error) {
    console.error('❌ 爬取失败:', error.message);
    console.error('💥 任务执行失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行主函数
if (require.main === module) {
  main();
} 