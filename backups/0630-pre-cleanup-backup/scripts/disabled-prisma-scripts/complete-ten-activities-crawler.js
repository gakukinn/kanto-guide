import { PrismaClient } from '@prisma/client';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// 活动类型映射和关键词
const ACTIVITY_MAPPING = {
  matsuri: {
    keywords: ['祭', '祭り', '祭典', 'フェスタ', 'フェスティバル', '盆踊り'],
    table: 'matsuriEvent'
  },
  hanabi: {
    keywords: ['花火', '花火大会', 'はなび', '納涼', '夏祭り'],
    table: 'hanabiEvent'
  },
  hanami: {
    keywords: ['桜', 'さくら', '花見', '桜祭り', '春祭り'],
    table: 'hanamiEvent'
  },
  momiji: {
    keywords: ['紅葉', 'もみじ', '秋祭り', 'コスモス', '菊'],
    table: 'momijiEvent'
  },
  illumination: {
    keywords: ['イルミネーション', 'ライトアップ', '光', 'LED'],
    table: 'illuminationEvent'
  },
  culture: {
    keywords: ['展覧会', '美術館', '博物館', 'アート', '文化', '芸術'],
    table: 'cultureArtEvent'
  }
};

// 地区映射
const REGION_MAPPING = {
  '東京': 'tokyo',
  '埼玉': 'saitama', 
  '千葉': 'chiba',
  '神奈川': 'kanagawa',
  '茨城': 'kitakanto',
  '栃木': 'kitakanto',
  '群馬': 'kitakanto',
  '山梨': 'koshinetsu',
  '長野': 'koshinetsu',
  '新潟': 'koshinetsu'
};

// 活动类型分类函数
function classifyActivity(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  
  for (const [type, config] of Object.entries(ACTIVITY_MAPPING)) {
    if (config.keywords.some(keyword => text.includes(keyword))) {
      return type;
    }
  }
  
  return 'culture'; // 默认为文化活动
}

// 地区识别函数
function identifyRegion(locationText) {
  for (const [prefecture, region] of Object.entries(REGION_MAPPING)) {
    if (locationText.includes(prefecture)) {
      return region;
    }
  }
  return 'tokyo'; // 默认为东京
}

// 从Google Maps链接提取坐标
function extractCoordinatesFromUrl(url) {
  // 尝试多种Google Maps URL格式
  const patterns = [
    /maps\?.*ll=([0-9.-]+),([0-9.-]+)/,
    /@([0-9.-]+),([0-9.-]+)/,
    /q=([0-9.-]+),([0-9.-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2])
      };
    }
  }
  
  return null;
}

// 从单个活动详情页面提取完整信息
async function extractActivityDetails(page, url) {
  console.log(`正在提取活动详情: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 初始化结果对象
    const result = {
      name: '',
      date: '',
      venue: '',
      address: '',
      access: '',
      latitude: null,
      longitude: null,
      organizer: '',
      price: '',
      contact: '',
      website: url
    };
    
    // 1. 尝试从JSON-LD结构化数据提取
    const jsonLdScript = $('script[type="application/ld+json"]').first();
    if (jsonLdScript.length) {
      try {
        const jsonData = JSON.parse(jsonLdScript.html());
        if (jsonData) {
          result.name = jsonData.name || '';
          result.date = jsonData.startDate || jsonData.eventSchedule?.startDate || '';
          result.venue = jsonData.location?.name || '';
          result.address = jsonData.location?.address?.streetAddress || '';
          result.organizer = jsonData.organizer?.name || '';
        }
      } catch (e) {
        console.log('JSON-LD解析失败，使用HTML提取');
      }
    }
    
    // 2. 从HTML标签提取信息（作为补充或备选）
    if (!result.name) {
      result.name = $('h1').first().text().trim() || 
                   $('.event-title').text().trim() ||
                   $('[data-testid="event-title"]').text().trim();
    }
    
    // 从dt/dd结构提取详细信息
    $('dt').each((i, dt) => {
      const label = $(dt).text().trim();
      const value = $(dt).next('dd').text().trim();
      
      if (label.includes('開催期間') || label.includes('日時')) {
        result.date = result.date || value;
      } else if (label.includes('会場') || label.includes('場所')) {
        result.venue = result.venue || value;
      } else if (label.includes('住所')) {
        result.address = result.address || value;
      } else if (label.includes('アクセス') || label.includes('交通')) {
        result.access = result.access || value;
      } else if (label.includes('主催') || label.includes('運営')) {
        result.organizer = result.organizer || value;
      } else if (label.includes('料金') || label.includes('入場料')) {
        result.price = result.price || value;
      } else if (label.includes('連絡先') || label.includes('問合せ')) {
        result.contact = result.contact || value;
      }
    });
    
    // 3. 提取坐标信息
    // 方法1: 查找Google Maps链接
    const mapLinks = $('a[href*="maps.google"]');
    mapLinks.each((i, link) => {
      const href = $(link).attr('href');
      if (href) {
        const coords = extractCoordinatesFromUrl(href);
        if (coords && !result.latitude) {
          result.latitude = coords.latitude;
          result.longitude = coords.longitude;
        }
      }
    });
    
    // 方法2: 查找iframe地图
    if (!result.latitude) {
      const mapIframes = $('iframe[src*="maps.google"]');
      mapIframes.each((i, iframe) => {
        const src = $(iframe).attr('src');
        if (src) {
          const coords = extractCoordinatesFromUrl(src);
          if (coords) {
            result.latitude = coords.latitude;
            result.longitude = coords.longitude;
          }
        }
      });
    }
    
    // 方法3: 从页面JavaScript变量中提取
    if (!result.latitude) {
      const scriptTags = $('script:not([src])');
      scriptTags.each((i, script) => {
        const scriptContent = $(script).html();
        if (scriptContent) {
          const latMatch = scriptContent.match(/lat[itude]*[\s]*[:=][\s]*([0-9.-]+)/i);
          const lngMatch = scriptContent.match(/lng|lon[gitude]*[\s]*[:=][\s]*([0-9.-]+)/i);
          
          if (latMatch && lngMatch) {
            result.latitude = parseFloat(latMatch[1]);
            result.longitude = parseFloat(lngMatch[1]);
          }
        }
      });
    }
    
    // 4. 增强信息提取（使用更多选择器）
    if (!result.address) {
      result.address = $('.address').text().trim() ||
                      $('[class*="address"]').text().trim() ||
                      $('.location-info').text().trim();
    }
    
    if (!result.access) {
      result.access = $('.access-info').text().trim() ||
                     $('[class*="access"]').text().trim() ||
                     $('.transport').text().trim();
    }
    
    if (!result.price) {
      result.price = $('.price').text().trim() ||
                    $('[class*="price"]').text().trim() ||
                    $('.fee').text().trim() ||
                    '无料'; // 默认免费
    }
    
    // 5. 清理和验证数据
    Object.keys(result).forEach(key => {
      if (typeof result[key] === 'string') {
        result[key] = result[key].replace(/\s+/g, ' ').trim();
      }
    });
    
    console.log(`✅ 成功提取活动信息: ${result.name}`);
    return result;
    
  } catch (error) {
    console.error(`❌ 提取活动详情失败: ${error.message}`);
    return null;
  }
}

// 从活动列表页面获取前10个活动链接
async function getActivityLinks(page, listUrl) {
  console.log(`正在获取活动列表: ${listUrl}`);
  
  try {
    await page.goto(listUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const links = [];
    
    // 多种选择器尝试
    const selectors = [
      'a[href*="/event/evt_"]',
      '.event-item a',
      '.event-list a',
      '[class*="event"] a[href*="/event/"]',
      'a[href*="jalan.net/event/"]'
    ];
    
    for (const selector of selectors) {
      $(selector).each((i, link) => {
        if (links.length >= 10) return false;
        
        let href = $(link).attr('href');
        if (href) {
          // 处理相对链接
          if (href.startsWith('/')) {
            href = 'https://www.jalan.net' + href;
          }
          
          // 确保是活动详情链接
          if (href.includes('/event/evt_') && !links.includes(href)) {
            links.push(href);
          }
        }
      });
      
      if (links.length >= 10) break;
    }
    
    console.log(`✅ 找到 ${links.length} 个活动链接`);
    return links.slice(0, 10);
    
  } catch (error) {
    console.error(`❌ 获取活动列表失败: ${error.message}`);
    return [];
  }
}

// 保存活动到数据库
async function saveActivityToDatabase(activityData, activityType, region) {
  try {
    const baseData = {
      name: activityData.name,
      date: activityData.date,
      venue: activityData.venue,
      address: activityData.address,
      access: activityData.access,
      latitude: activityData.latitude,
      longitude: activityData.longitude,
      organizer: activityData.organizer,
      price: activityData.price,
      contact: activityData.contact,
      website: activityData.website,
      region: region,
      verified: true,
      source: 'jalan'
    };
    
    let savedActivity;
    
    switch (activityType) {
      case 'matsuri':
        savedActivity = await prisma.matsuriEvent.create({ data: baseData });
        break;
      case 'hanabi':
        savedActivity = await prisma.hanabiEvent.create({ data: baseData });
        break;
      case 'hanami':
        savedActivity = await prisma.hanamiEvent.create({ data: baseData });
        break;
      case 'momiji':
        savedActivity = await prisma.momijiEvent.create({ data: baseData });
        break;
      case 'illumination':
        savedActivity = await prisma.illuminationEvent.create({ data: baseData });
        break;
      case 'culture':
        savedActivity = await prisma.cultureArtEvent.create({ data: baseData });
        break;
      default:
        throw new Error(`未知活动类型: ${activityType}`);
    }
    
    console.log(`✅ 活动已保存到数据库 (${activityType}): ${activityData.name}`);
    return savedActivity;
    
  } catch (error) {
    console.error(`❌ 保存活动失败: ${error.message}`);
    return null;
  }
}

// 主函数
async function crawlTenActivities(listUrl) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('🚀 开始爬取前十个活动...');
    
    // 第一步：获取活动链接
    const activityLinks = await getActivityLinks(page, listUrl);
    
    if (activityLinks.length === 0) {
      console.log('❌ 未找到任何活动链接');
      return;
    }
    
    console.log(`📋 准备处理 ${activityLinks.length} 个活动`);
    
    // 第二步：逐个处理活动详情
    const results = [];
    
    for (let i = 0; i < activityLinks.length; i++) {
      const link = activityLinks[i];
      console.log(`\n📍 处理第 ${i + 1}/${activityLinks.length} 个活动`);
      
      // 提取活动详情
      const activityData = await extractActivityDetails(page, link);
      
      if (activityData) {
        // 分类活动类型
        const activityType = classifyActivity(activityData.name, activityData.venue);
        
        // 识别地区
        const region = identifyRegion(activityData.venue + ' ' + activityData.address);
        
        console.log(`📝 活动类型: ${activityType}, 地区: ${region}`);
        
        // 保存到数据库
        const savedActivity = await saveActivityToDatabase(activityData, activityType, region);
        
        if (savedActivity) {
          results.push({
            ...activityData,
            type: activityType,
            region: region,
            id: savedActivity.id
          });
        }
      }
      
      // 添加延迟避免频繁请求
      await page.waitForTimeout(2000);
    }
    
    // 输出最终结果
    console.log('\n🎉 批量爬取完成！');
    console.log(`✅ 成功处理: ${results.length} 个活动`);
    console.log(`❌ 失败数量: ${activityLinks.length - results.length} 个活动`);
    
    // 统计各类型活动数量
    const typeStats = {};
    results.forEach(activity => {
      typeStats[activity.type] = (typeStats[activity.type] || 0) + 1;
    });
    
    console.log('\n📊 活动类型统计:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} 个`);
    });
    
    return results;
    
  } catch (error) {
    console.error(`❌ 爬取过程出错: ${error.message}`);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  const listUrl = process.argv[2] || 'https://www.jalan.net/event/';
  
  console.log('前十活动完整信息爬虫启动...');
  console.log(`目标URL: ${listUrl}`);
  
  crawlTenActivities(listUrl)
    .then(() => {
      console.log('🎯 爬取任务完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 爬取任务失败:', error);
      process.exit(1);
    });
}

export { crawlTenActivities, extractActivityDetails }; 