/**
 * Jalan通用爬虫 - 支持批量处理多个URL
 * 
 * 特性:
 * - 支持配置文件或命令行参数
 * - 批量处理多个URL
 * - 统一的错误处理和重试机制
 * - 详细的爬取统计和日志
 * - 可扩展的字段提取配置
 * 
 * 使用方法:
 * 1. 单个URL: node jalan-universal-crawler.js "https://www.jalan.net/event/..."
 * 2. 多个URL: node jalan-universal-crawler.js url1 url2 url3
 * 3. 配置文件: node jalan-universal-crawler.js --config urls.json
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

// 爬取配置
const CONFIG = {
  // 浏览器配置
  browser: {
    headless: true,
    timeout: 60000,
    waitTimeout: 3000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  
  // 字段选择器配置
  selectors: {
    name: [
      'h1.event-name',
      'h1',
      '.event-title',
      '.title',
      'h2.event-name',
      'h2'
    ],
    period: [
      '.period', '.date', '.schedule', '.time',
      'dt:contains("開催期間") + dd',
      'dt:contains("期間") + dd',
      'dt:contains("日時") + dd',
      '.event-period',
      '.event-date'
    ],
    venue: [
      '.venue', '.location', '.place',
      'dt:contains("開催場所") + dd',
      'dt:contains("場所") + dd',
      'dt:contains("会場") + dd',
      '.event-venue',
      '.event-location'
    ],
    address: [
      '.address',
      'dt:contains("住所") + dd',
      'dt:contains("所在地") + dd',
      '.event-address'
    ],
    access: [
      '.access',
      'dt:contains("アクセス") + dd',
      'dt:contains("交通") + dd',
      '.event-access'
    ],
    organizer: [
      '.organizer',
      'dt:contains("主催") + dd',
      'dt:contains("主办") + dd',
      '.event-organizer'
    ],
    price: [
      '.price', '.fee',
      'dt:contains("料金") + dd',
      'dt:contains("入場料") + dd',
      'dt:contains("费用") + dd',
      '.event-price'
    ],
    contact: [
      '.contact',
      'dt:contains("問合せ") + dd',
      'dt:contains("お問い合わせ") + dd',
      'dt:contains("联系") + dd',
      '.event-contact'
    ],
    website: [
      'a[href*="http"]:contains("ホームページ")',
      'a[href*="http"]:contains("公式")',
      'a[href*="http"]:contains("HP")',
      'dt:contains("ホームページ") + dd a',
      'dt:contains("URL") + dd a',
      '.official-site a',
      '.website a'
    ]
  },
  
  // 重试配置
  retry: {
    maxRetries: 3,
    retryDelay: 5000
  }
};

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
    // Silent fail
  }
  
  // 方法2: 搜索JavaScript变量
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
    // Silent fail
  }
  
  // 方法3: 提取地图链接坐标（技术指南推荐方法）
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
          source: 'link',
          url: match[0]
        };
        break;
      }
    }
  } catch (e) {
    // Silent fail
  }
  
  // 方法4: 检查Meta标签
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
    // Silent fail
  }
  
  // 按优先级选择坐标（技术指南推荐链接方法）
  const finalCoords = coordinates.link || coordinates.iframe || coordinates.javascript || coordinates.meta;
  
  return finalCoords;
}

// 通用字段提取函数
function extractField(fieldName, selectors, $) {
  for (const selector of selectors) {
    let value = '';
    
    if (fieldName === 'website') {
      value = $(selector).attr('href');
      if (value && value.includes('http')) {
        return value;
      }
    } else {
      value = $(selector).text().trim();
      if (value && value.length > 0) {
        return value;
      }
    }
  }
  return null;
}

// 主要爬取函数
async function crawlJalanEvent(url, retryCount = 0) {
  console.log(`\n🚀 开始爬取: ${url}`);
  
  const browser = await chromium.launch({ 
    headless: CONFIG.browser.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    userAgent: CONFIG.browser.userAgent,
    extraHTTPHeaders: {
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 加载页面中...');
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: CONFIG.browser.timeout 
    });
    
    await page.waitForTimeout(CONFIG.browser.waitTimeout);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    console.log('📋 提取活动信息...');
    const eventData = {};
    
    // 使用配置的选择器提取所有字段
    for (const [fieldName, selectors] of Object.entries(CONFIG.selectors)) {
      const value = extractField(fieldName, selectors, $);
      if (value) {
        eventData[fieldName] = value;
        console.log(`✅ ${fieldName}: ${value}`);
      }
    }
    
    // 如果没有获取到名称，从title标签获取
    if (!eventData.name) {
      eventData.name = $('title').text().split('|')[0].split('-')[0].trim();
      console.log(`✅ name (从title): ${eventData.name}`);
    }
    
    // 生成中日英三语言名称
    if (eventData.name) {
      const multiLanguageNames = generateMultiLanguageNames(eventData.name);
      eventData.multiLanguageNames = multiLanguageNames;
      console.log(`🇯🇵 日语名称: ${multiLanguageNames.japanese}`);
      console.log(`🇨🇳 中文名称: ${multiLanguageNames.chinese}`);
      console.log(`🇺🇸 英文名称: ${multiLanguageNames.english}`);
    }
    
    // 提取坐标
    console.log('🗺️ 提取地图坐标...');
    const coordinates = await extractCoordinates(page, $);
    if (coordinates) {
      eventData.coordinates = {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        coordsSource: coordinates.source,
        mapUrl: `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`,
        embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(eventData.name)}!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`
      };
      console.log(`🎯 坐标: ${coordinates.lat}, ${coordinates.lng} (${coordinates.source})`);
    }
    
    return eventData;
    
  } catch (error) {
    console.error(`❌ 爬取失败: ${error.message}`);
    
    if (retryCount < CONFIG.retry.maxRetries) {
      console.log(`🔄 重试 ${retryCount + 1}/${CONFIG.retry.maxRetries}...`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.retry.retryDelay));
      return await crawlJalanEvent(url, retryCount + 1);
    }
    
    throw error;
  } finally {
    await browser.close();
  }
}

// 获取地区ID
async function getRegionId(venue, address) {
  const locationText = `${venue || ''} ${address || ''}`.toLowerCase();
  
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
  } else if (locationText.includes('茨城')) {
    regionCode = 'kitakanto';
  }
  
  const region = await prisma.region.findFirst({
    where: { code: regionCode }
  });
  
  return region?.id;
}

// 保存到数据库
async function saveToDatabase(eventData) {
  console.log('💾 保存到数据库...');
  
  let regionId = await getRegionId(eventData.venue || '', eventData.address || '');
  if (!regionId) {
    console.log('⚠️ 未能确定地区，使用默认地区（甲信越）');
    // 使用默认地区
    const defaultRegion = await prisma.region.findFirst({
      where: { code: 'koshinetsu' }
    });
    if (!defaultRegion) {
      throw new Error('默认地区不存在，请检查数据库设置');
    }
    regionId = defaultRegion.id;
  }
  
  const eventId = `${eventData.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10)}_${Date.now().toString(36)}`;
  
  // 检查是否已存在相同名称的记录
  const existingRecord = await prisma.hanamiEvent.findFirst({
    where: { name: eventData.name }
  });
  
  // 准备数据 - 支持中日英三语言名称
  const dataToSave = {
    eventId: eventId,
    name: eventData.name,
    japaneseName: eventData.multiLanguageNames?.japanese || eventData.name,
    chineseName: eventData.multiLanguageNames?.chinese || eventData.name,
    englishName: eventData.multiLanguageNames?.english || eventData.name,
    year: 2025,
    season: eventData.period || '详见官网',
    location: eventData.venue || eventData.address || '',
    venue: eventData.venue || '',
    address: eventData.address || '',
    organizer: eventData.organizer || '',
    contact: eventData.contact || '',
    price: eventData.price || '详见官方网站',
    website: eventData.website || '',
    access: eventData.access || '',
    description: `${eventData.multiLanguageNames?.chinese || eventData.name}是一个精彩的观赏活动，详情请参考官方信息。`,
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
    console.log(`🔄 覆盖更新: ${existingRecord.name}`);
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
  
  console.log(`✅ 保存成功: ${result.name}`);
  console.log(`🇯🇵 日语: ${result.japaneseName}`);
  console.log(`🇨🇳 中文: ${result.chineseName}`);
  console.log(`🇺🇸 英文: ${result.englishName}`);
  return result;
}

// 解析命令行参数
function parseArguments() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ 请提供URL参数');
    console.log('\n使用方法:');
    console.log('  单个URL: node jalan-universal-crawler.js "https://www.jalan.net/event/..."');
    console.log('  多个URL: node jalan-universal-crawler.js url1 url2 url3');
    console.log('  配置文件: node jalan-universal-crawler.js --config urls.json');
    process.exit(1);
  }
  
  // 检查是否使用配置文件
  if (args[0] === '--config' && args[1]) {
    return { useConfig: true, configFile: args[1] };
  }
  
  // 直接使用URL参数
  return { useConfig: false, urls: args };
}

// 从配置文件读取URL
async function loadUrlsFromConfig(configFile) {
  try {
    const filePath = path.resolve(configFile);
    const content = await fs.readFile(filePath, 'utf8');
    const config = JSON.parse(content);
    return config.urls || [];
  } catch (error) {
    console.error(`❌ 读取配置文件失败: ${error.message}`);
    process.exit(1);
  }
}

// 语言名称智能生成函数
function generateMultiLanguageNames(japaneseName) {
  // 中文名称映射
  const chineseMap = {
    // 花卉相关
    'あじさい': '紫阳花',
    'ハーブ': '香草',
    'さくら': '樱花',
    '桜': '樱花',
    'フェスティバル': '节',
    '祭典': '节',
    'まつ': '节',
    'festival': '节',
    '祭': '节',
    '祭り': '节',
    
    // 地名相关
    '水戸': '水户',
    '河口湖': '河口湖',
    '富士': '富士',
    '東京': '东京',
    '横浜': '横滨',
    '神奈川': '神奈川',
    '千葉': '千叶',
    '埼玉': '埼玉',
    '山梨': '山梨',
    '茨城': '茨城',
    
    // 数字相关
    '第': '第',
    '回': '届',
    '年': '年',
    '月': '月',
    '日': '日',
    
    // 季节相关
    '春': '春',
    '夏': '夏',
    '秋': '秋',
    '冬': '冬',
    
    // 场所相关
    '公園': '公园',
    '会場': '会场',
    '広場': '广场',
    '寺': '寺',
    '神社': '神社',
    '城': '城',
    '山': '山',
    '湖': '湖',
    '川': '川',
    '海': '海'
  };
  
  // 英文名称映射
  const englishMap = {
    // 花卉相关
    'あじさい': 'Hydrangea',
    'ハーブ': 'Herb',
    'さくら': 'Cherry Blossom',
    '桜': 'Cherry Blossom',
    'フェスティバル': 'Festival',
    '祭典': 'Festival',
    'まつ': 'Festival',
    'festival': 'Festival',
    '祭': 'Festival',
    '祭り': 'Festival',
    
    // 地名相关
    '水戸': 'Mito',
    '河口湖': 'Lake Kawaguchi',
    '富士': 'Fuji',
    '東京': 'Tokyo',
    '横浜': 'Yokohama',
    '神奈川': 'Kanagawa',
    '千葉': 'Chiba',
    '埼玉': 'Saitama',
    '山梨': 'Yamanashi',
    '茨城': 'Ibaraki',
    
    // 季节相关
    '春': 'Spring',
    '夏': 'Summer',
    '秋': 'Autumn',
    '冬': 'Winter',
    
    // 场所相关
    '公園': 'Park',
    '会場': 'Venue',
    '広場': 'Plaza',
    '寺': 'Temple',
    '神社': 'Shrine',
    '城': 'Castle',
    '山': 'Mountain',
    '湖': 'Lake',
    '川': 'River',
    '海': 'Sea'
  };
  
  let chineseName = japaneseName;
  let englishName = japaneseName;
  
  // 生成中文名称
  for (const [japanese, chinese] of Object.entries(chineseMap)) {
    chineseName = chineseName.replace(new RegExp(japanese, 'g'), chinese);
  }
  
  // 生成英文名称
  for (const [japanese, english] of Object.entries(englishMap)) {
    englishName = englishName.replace(new RegExp(japanese, 'g'), english);
  }
  
  // 清理多余字符和重复
  chineseName = chineseName.replace(/([^\u4e00-\u9fa5\d第届年月日])+/g, ' ').trim();
  englishName = englishName.replace(/([^a-zA-Z\d\s])+/g, ' ').replace(/\s+/g, ' ').trim();
  
  // 如果翻译后没有变化，使用备用策略
  if (chineseName === japaneseName) {
    // 提取关键词进行基础翻译
    if (japaneseName.includes('あじさい') || japaneseName.includes('紫陽花')) {
      chineseName = japaneseName.replace(/(あじさい|紫陽花)/g, '紫阳花');
    } else if (japaneseName.includes('ハーブ')) {
      chineseName = japaneseName.replace(/ハーブ/g, '香草');
    } else if (japaneseName.includes('祭典') || japaneseName.includes('祭')) {
      chineseName = japaneseName.replace(/(祭典|祭り?)/g, '节');
    }
  }
  
  if (englishName === japaneseName || englishName.includes('の') || englishName.includes('を')) {
    // 提取关键词进行基础翻译
    if (japaneseName.includes('あじさい') || japaneseName.includes('紫陽花')) {
      englishName = japaneseName.replace(/(あじさい|紫陽花)/g, 'Hydrangea');
    } else if (japaneseName.includes('ハーブ')) {
      englishName = japaneseName.replace(/ハーブ/g, 'Herb');
    } else if (japaneseName.includes('祭典') || japaneseName.includes('祭')) {
      englishName = japaneseName.replace(/(祭典|祭り?)/g, 'Festival');
    }
    
    // 移除日语特殊字符
    englishName = englishName.replace(/[のをがでは]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  
  return {
    japanese: japaneseName,
    chinese: chineseName,
    english: englishName
  };
}

// 主函数
async function main() {
  const params = parseArguments();
  
  let urls = [];
  if (params.useConfig) {
    urls = await loadUrlsFromConfig(params.configFile);
    console.log(`📄 从配置文件加载 ${urls.length} 个URL`);
  } else {
    urls = params.urls;
  }
  
  console.log('🎯 Jalan通用爬虫启动');
  console.log('⚙️ 技术栈: Playwright + Cheerio + Prisma');
  console.log('🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)');
  console.log('🔄 覆盖策略: name相同时自动覆盖');
  console.log('📋 新架构: 适配最新数据库字段结构');
  console.log('==========================================');
  
  const results = [];
  const errors = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n📊 进度: ${i + 1}/${urls.length}`);
    
    try {
      const eventData = await crawlJalanEvent(url);
      const result = await saveToDatabase(eventData);
      results.push({
        url,
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`❌ 处理失败: ${url}`);
      console.error(`💥 错误: ${error.message}`);
      errors.push({
        url,
        error: error.message
      });
    }
  }
  
  // 输出最终统计
  console.log('\n🎉 批量爬取完成!');
  console.log('==========================================');
  console.log(`📊 总URL数: ${urls.length}`);
  console.log(`✅ 成功数: ${results.length}`);
  console.log(`❌ 失败数: ${errors.length}`);
  
  if (results.length > 0) {
    console.log('\n✅ 成功爬取的活动:');
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.data.name}`);
      console.log(`     📅 日期: ${result.data.season}`);
      console.log(`     📍 地点: ${result.data.location}`);
      console.log(`     🗺️ 坐标: ${result.data.mapInfo?.coordinates ? `${result.data.mapInfo.coordinates.lat}, ${result.data.mapInfo.coordinates.lng}` : '未获取'}`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\n❌ 失败的URL:');
    errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.url}`);
      console.log(`     错误: ${error.error}`);
    });
  }
}

// 运行主函数
if (require.main === module) {
  main().finally(() => {
    prisma.$disconnect();
  });
} 