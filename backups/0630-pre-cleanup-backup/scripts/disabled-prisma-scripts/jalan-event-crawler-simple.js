/**
 * 简化版Jalan活动信息爬虫
 * @description 基于成功的v3模板，使用CommonJS格式
 * @features name相同时自动覆盖，4种坐标提取方法
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 获取命令行参数中的URL，默认使用提供的URL
const targetUrl = process.argv[2] || 'https://www.jalan.net/event/evt_342198/?screenId=OUW1702';

// 地区映射配置
const regionMapping = {
  '山梨': 'koshinetsu',
  '東京': 'tokyo', 
  '神奈川': 'kanagawa',
  '千葉': 'chiba',
  '埼玉': 'saitama',
  '茨城': 'kitakanto',
  '栃木': 'kitakanto',
  '群馬': 'kitakanto'
};

/**
 * 4种谷歌地图坐标提取方法
 */
async function extractCoordinates(page, $) {
  console.log('🗺️ 开始多方法坐标提取...');
  
  const results = {};
  
  // 方法1: 检查iframe地图
  console.log('🔍 方法1: 检查iframe地图...');
  try {
    const iframes = $('iframe[src*="maps.google"]');
    if (iframes.length > 0) {
      const src = iframes.first().attr('src');
      const match = src.match(/[?&]q=([0-9.-]+),([0-9.-]+)/);
      if (match) {
        results.iframe = {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          source: 'iframe-q=([0-9.-]+),([0-9.-]+)'
        };
      }
    }
    if (!results.iframe) results.iframe = null;
  } catch (error) {
    console.log(`iframe方法出错: ${error.message}`);
    results.iframe = null;
  }

  // 方法2: 搜索JavaScript变量
  console.log('🔍 方法2: 搜索JavaScript变量...');
  try {
    const jsText = await page.content();
    const patterns = [
      /lat['":\s]*([0-9.-]+).*?lng['":\s]*([0-9.-]+)/gi,
      /latitude['":\s]*([0-9.-]+).*?longitude['":\s]*([0-9.-]+)/gi
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(jsText);
      if (match) {
        results.javascript = {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2]),
          source: `javascript-${pattern.source}`
        };
        break;
      }
    }
    if (!results.javascript) results.javascript = null;
  } catch (error) {
    console.log(`JavaScript方法出错: ${error.message}`);
    results.javascript = null;
  }

  // 方法3: 提取地图链接坐标 (推荐方法)
  console.log('🔍 方法3: 提取地图链接坐标...');
  try {
    const links = $('a[href*="maps.google"], a[href*="google.com/maps"]');
    
    for (let i = 0; i < links.length; i++) {
      const href = links.eq(i).attr('href');
      if (!href) continue;

      const patterns = [
        /ll=([0-9.-]+),([0-9.-]+)/,
        /q=([0-9.-]+),([0-9.-]+)/,
        /@([0-9.-]+),([0-9.-]+)/
      ];

      for (const pattern of patterns) {
        const match = href.match(pattern);
        if (match) {
          results.link = {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            source: `link-${pattern.source}`,
            url: href
          };
          break;
        }
      }
      if (results.link) break;
    }
    if (!results.link) results.link = null;
  } catch (error) {
    console.log(`链接方法出错: ${error.message}`);
    results.link = null;
  }

  // 方法4: 检查Meta标签
  console.log('🔍 方法4: 检查Meta标签...');
  try {
    const metaTags = $('meta[property*="latitude"], meta[property*="longitude"], meta[name*="geo"]');
    
    let lat = null, lng = null;
    
    metaTags.each((i, elem) => {
      const property = $(elem).attr('property') || $(elem).attr('name');
      const content = $(elem).attr('content');
      
      if (property && content) {
        if (property.includes('latitude')) lat = parseFloat(content);
        if (property.includes('longitude')) lng = parseFloat(content);
      }
    });

    if (lat && lng) {
      results.meta = { lat, lng, source: 'meta-geo-tags' };
    } else {
      results.meta = null;
    }
  } catch (error) {
    console.log(`Meta标签方法出错: ${error.message}`);
    results.meta = null;
  }

  console.log('📊 提取结果汇总:');
  Object.entries(results).forEach(([method, result]) => {
    console.log(`${method}方法: ${result ? JSON.stringify(result, null, 2) : 'null'}`);
  });

  // 按优先级选择最佳结果
  for (const methodName of ['link', 'iframe', 'javascript', 'meta']) {
    if (results[methodName]) {
      console.log(`✅ 使用${methodName}方法提取的坐标 (技术指南推荐)`);
      return results[methodName];
    }
  }

  console.log('❌ 所有方法均未能提取到坐标');
  return null;
}

/**
 * 提取活动基本信息
 */
function extractBasicInfo($) {
  console.log('📋 提取基本活动信息...');
  
  // 活动名称
  const name = $('h1').first().text().trim() || 
               $('title').text().replace(' - じゃらんnet', '').trim();

  // 开催期间
  const period = $('td:contains("開催期間"), th:contains("開催期間")').next().text().trim();

  // 开催场所
  const venue = $('td:contains("開催場所"), th:contains("開催場所")').next().text().trim();

  // 详细地址
  const address = $('td:contains("所在地"), th:contains("所在地")').next().text().trim();

  // 交通信息
  const access = $('td:contains("交通アクセス"), th:contains("交通アクセス")').next().text().trim();

  // 主办方
  const organizer = $('td:contains("主催"), th:contains("主催")').next().text().trim();

  // 费用
  const price = $('td:contains("料金"), th:contains("料金")').next().text().trim();

  // 联系方式
  const contact = $('td:contains("問合せ先"), th:contains("問合せ先")').next().text().trim();

  // 官方网站
  const website = $('td:contains("ホームページ"), th:contains("ホームページ")').next().text().trim();

  // 活动描述
  const description = $('p').filter((i, el) => $(el).text().length > 50).first().text().trim();

  return {
    name,
    period,
    venue,
    address,
    access,
    organizer,
    price,
    contact,
    website,
    description
  };
}

/**
 * 确定地区
 */
function determineRegion(venue, address) {
  const text = `${venue} ${address}`;
  
  for (const [prefecture, region] of Object.entries(regionMapping)) {
    if (text.includes(prefecture)) {
      return region;
    }
  }
  
  return 'koshinetsu'; // 默认山梨县
}

/**
 * 生成地图信息
 */
function generateMapInfo(coordinates) {
  if (!coordinates) return null;

  const { lat, lng, source } = coordinates;
  
  return {
    latitude: lat,
    longitude: lng,
    coordsSource: source,
    mapUrl: `https://maps.google.com/?q=${lat},${lng}`,
    embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z6Kqs5Y-j5rmW44OP44O844OW44OV44Kn44K544OG44Kj44OQ44Or!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`
  };
}

/**
 * 主程序
 */
async function main() {
  console.log('🎯 简化版Jalan活动信息爬虫');
  console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
  console.log('🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)');
  console.log('🔄 覆盖策略: name相同时自动覆盖');
  console.log('======================================================================');
  console.log('🚀 开始爬取Jalan活动信息...');
  console.log(`目标URL: ${targetUrl}`);

  let browser = null;
  
  try {
    // 启动浏览器
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    // 访问页面
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // 提取基本信息
    const basicInfo = extractBasicInfo($);
    
    // 提取坐标
    const coordinates = await extractCoordinates(page, $);
    
    // 生成地图信息
    const mapInfo = coordinates ? generateMapInfo(coordinates) : null;
    
    const data = {
      ...basicInfo,
      coordinates,
      mapInfo
    };

    if (coordinates) {
      console.log(`🎯 最终坐标: ${coordinates.lat}, ${coordinates.lng} (来源: ${coordinates.source})`);
    } else {
      console.log('⚠️ 未能提取到坐标信息');
    }

    console.log('📊 提取的数据:', JSON.stringify(data, null, 2));

    // 保存到数据库
    console.log('💾 开始保存到数据库...');
    
    const regionKey = determineRegion(data.venue, data.address);
    console.log(`🗺️ 确定地区: ${regionKey}`);
    
    const region = await prisma.region.findUnique({
      where: { key: regionKey }
    });
    
    if (!region) {
      throw new Error(`地区 ${regionKey} 不存在于数据库中`);
    }
    
    console.log(`🗺️ 地区ID: ${region.id}`);
    
    // 检查同名活动
    const existingEvent = await prisma.hanamiEvent.findFirst({
      where: { name: data.name }
    });
    
    const eventData = {
      name: data.name,
      season: data.period,
      venue: data.venue,
      address: data.address,
      access: data.access,
      organizer: data.organizer,
      price: data.price,
      contact: data.contact,
      website: data.website,
      description: data.description,
      regionId: region.id,
      mapInfo: data.mapInfo ? JSON.stringify(data.mapInfo) : null
    };
    
    let savedEvent;
    
    if (existingEvent) {
      console.log(`🔄 发现同名活动，执行覆盖更新: ${data.name}`);
      savedEvent = await prisma.hanamiEvent.update({
        where: { id: existingEvent.id },
        data: eventData
      });
      console.log(`✅ 覆盖更新成功: ${data.name} ID: ${savedEvent.id}`);
    } else {
      console.log(`➕ 创建新活动: ${data.name}`);
      savedEvent = await prisma.hanamiEvent.create({
        data: eventData
      });
      console.log(`✅ 新建成功: ${data.name} ID: ${savedEvent.id}`);
    }

    console.log('\n📋 重点信息确认:');
    console.log(`📅 日期: ${data.period}`);
    console.log(`📍 地点: ${data.venue}`);
    if (coordinates) {
      console.log(`🗺️ 精确坐标: ${coordinates.lat}, ${coordinates.lng}`);
      console.log(`📍 坐标来源: ${coordinates.source}`);
      console.log(`🔗 地图链接: ${data.mapInfo?.mapUrl}`);
    }
    console.log(`🌐 官方网站: ${data.website}`);
    console.log(`💰 费用: ${data.price}`);
    console.log(`🚌 交通: ${data.access}`);
    console.log(`📞 联系方式: ${data.contact}`);
    
    console.log('======================================================================');
    console.log('🎉 爬取任务完成!');
    console.log('✅ 使用技术指南推荐的4种方法精确提取坐标');

  } catch (error) {
    console.error('❌ 任务执行失败:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
    await prisma.$disconnect();
  }
}

// 运行主程序
main(); 