import { PrismaClient } from '../src/generated/prisma/index.js';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// 活动类型映射
const ACTIVITY_MAPPING = {
  matsuri: ['祭', '祭り', 'まつり', 'フェスタ', 'フェスティバル', '盆踊り'],
  hanabi: ['花火', '花火大会', 'はなび', '納涼', '夏祭り'],
  hanami: ['桜', 'さくら', '花見', '桜祭り', '春祭り'],
  momiji: ['紅葉', 'もみじ', '秋祭り', 'コスモス', '菊'],
  illumination: ['イルミネーション', 'ライトアップ', '光', 'LED'],
  culture: ['展覧会', '美術館', '博物館', 'アート', '文化', '芸術']
};

// 地区映射
const REGION_MAPPING = {
  '東京': 'tokyo', '埼玉': 'saitama', '千葉': 'chiba',
  '神奈川': 'kanagawa', '茨城': 'kitakanto', '栃木': 'kitakanto',
  '群馬': 'kitakanto', '山梨': 'koshinetsu', '長野': 'koshinetsu', '新潟': 'koshinetsu'
};

// 分类活动类型
function classifyActivity(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  for (const [type, keywords] of Object.entries(ACTIVITY_MAPPING)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return type;
    }
  }
  return 'culture';
}

// 识别地区
function identifyRegion(locationText) {
  for (const [prefecture, region] of Object.entries(REGION_MAPPING)) {
    if (locationText.includes(prefecture)) {
      return region;
    }
  }
  return 'tokyo';
}

// 提取坐标
function extractCoordinatesFromUrl(url) {
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

// 从活动详情页提取完整信息
async function extractActivityDetails(page, url) {
  console.log(`正在提取: ${url}`);
  
  try {
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const result = {
      name: '', date: '', venue: '', address: '', access: '',
      latitude: null, longitude: null, organizer: '',
      price: '', contact: '', website: url
    };
    
    // 1. JSON-LD数据提取
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
    
    // 2. HTML标签提取
    if (!result.name) {
      result.name = $('h1').first().text().trim() || 
                   $('.event-title').text().trim() ||
                   $('title').text().split(' | ')[0].trim() ||
                   $('.ttl').text().trim() ||
                   $('.title').text().trim();
    }
    
    // 显示详细信息
    console.log('📋 详细信息:');
    console.log(`名称: ${result.name}`);
    console.log(`时间: ${result.date}`);
    console.log(`会场: ${result.venue}`);
    console.log(`坐标: ${result.latitude}, ${result.longitude}`);
    
    // dt/dd结构提取
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
    
    // 3. 坐标提取
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
    
    // iframe地图
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
    
    // 4. 补充信息提取
    if (!result.address) {
      result.address = $('.address').text().trim() ||
                      $('[class*="address"]').text().trim();
    }
    
    if (!result.access) {
      result.access = $('.access-info').text().trim() ||
                     $('[class*="access"]').text().trim();
    }
    
    if (!result.price) {
      result.price = $('.price').text().trim() ||
                    $('[class*="price"]').text().trim() || '无料';
    }
    
    // 数据清理
    Object.keys(result).forEach(key => {
      if (typeof result[key] === 'string') {
        result[key] = result[key].replace(/\s+/g, ' ').trim();
      }
    });
    
    console.log(`✅ 提取成功: ${result.name}`);
    return result;
    
  } catch (error) {
    console.error(`❌ 提取失败: ${error.message}`);
    return null;
  }
}

// 获取活动链接列表
async function getActivityLinks(page, listUrl) {
  console.log(`获取活动列表: ${listUrl}`);
  
  try {
    await page.goto(listUrl, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    await page.waitForTimeout(5000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const links = [];
    const selectors = [
      'a[href*="/event/evt_"]',
      'a[href*="/event/"]',
      '.event-title a',
      '.event-item a',
      '.event-list a',
      '[class*="event"] a',
      '.item a',
      '.list-item a',
      'h3 a',
      'h2 a'
    ];
    
    for (const selector of selectors) {
      $(selector).each((i, link) => {
        if (links.length >= 10) return false;
        
        let href = $(link).attr('href');
        if (href) {
          // 处理各种URL格式
          if (href.startsWith('//')) {
            href = 'https:' + href;
          } else if (href.startsWith('/')) {
            href = 'https://www.jalan.net' + href;
          } else if (!href.startsWith('http')) {
            href = 'https://www.jalan.net/' + href;
          }
          
          if (href.includes('/event/evt_') && !links.includes(href)) {
            links.push(href);
            console.log(`找到活动链接: ${href}`);
          }
        }
      });
      
      if (links.length >= 10) break;
    }
    
    console.log(`找到 ${links.length} 个活动链接`);
    return links.slice(0, 10);
    
  } catch (error) {
    console.error(`获取列表失败: ${error.message}`);
    return [];
  }
}

// 保存到数据库
async function saveActivityToDatabase(activityData, activityType, region) {
  try {
    // 生成Google Maps链接
    const googleMap = activityData.latitude && activityData.longitude 
      ? `https://maps.google.com/maps?ll=${activityData.latitude},${activityData.longitude}` 
      : '';
    
    // 确保地区存在
    let regionRecord = await prisma.region.findUnique({
      where: { code: region }
    });
    
    if (!regionRecord) {
      const regionNames = {
        tokyo: { nameCn: '东京都', nameJp: '東京都' },
        saitama: { nameCn: '埼玉县', nameJp: '埼玉県' },
        chiba: { nameCn: '千叶县', nameJp: '千葉県' },
        kanagawa: { nameCn: '神奈川县', nameJp: '神奈川県' },
        kitakanto: { nameCn: '北关东', nameJp: '北関東' },
        koshinetsu: { nameCn: '甲信越', nameJp: '甲信越' }
      };
      
      regionRecord = await prisma.region.create({
        data: {
          code: region,
          nameCn: regionNames[region]?.nameCn || region,
          nameJp: regionNames[region]?.nameJp || region
        }
      });
    }
    
    const baseData = {
      name: activityData.name,
      datetime: activityData.date,
      venue: activityData.venue,
      address: activityData.address,
      access: activityData.access,
      organizer: activityData.organizer,
      price: activityData.price,
      contact: activityData.contact,
      website: activityData.website,
      googleMap: googleMap,
      region: region,
      regionId: regionRecord.id,
      verified: true
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
        savedActivity = await prisma.cultureEvent.create({ data: baseData });
        break;
    }
    
    console.log(`✅ 保存成功 (${activityType}): ${activityData.name}`);
    return savedActivity;
    
  } catch (error) {
    console.error(`❌ 保存失败: ${error.message}`);
    return null;
  }
}

// 主函数
async function crawlTenActivities(listUrl) {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  
  try {
    console.log('🚀 开始爬取前十个活动...');
    
    // 第一步：获取链接
    const activityLinks = await getActivityLinks(page, listUrl);
    
    if (activityLinks.length === 0) {
      console.log('❌ 未找到活动链接');
      return;
    }
    
    console.log(`📋 准备处理 ${activityLinks.length} 个活动`);
    
    // 第二步：处理详情
    const results = [];
    
    for (let i = 0; i < activityLinks.length; i++) {
      const link = activityLinks[i];
      console.log(`\n📍 处理第 ${i + 1}/${activityLinks.length} 个活动`);
      
      const activityData = await extractActivityDetails(page, link);
      
      if (activityData) {
        const activityType = classifyActivity(activityData.name, activityData.venue);
        const region = identifyRegion(activityData.venue + ' ' + activityData.address);
        
        console.log(`📝 类型: ${activityType}, 地区: ${region}`);
        
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
      
      await page.waitForTimeout(2000);
    }
    
    // 结果统计
    console.log('\n🎉 批量爬取完成！');
    console.log(`✅ 成功: ${results.length} 个`);
    console.log(`❌ 失败: ${activityLinks.length - results.length} 个`);
    
    const typeStats = {};
    results.forEach(activity => {
      typeStats[activity.type] = (typeStats[activity.type] || 0) + 1;
    });
    
    console.log('\n📊 类型统计:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} 个`);
    });
    
    return results;
    
  } catch (error) {
    console.error(`❌ 爬取错误: ${error.message}`);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 运行脚本
if (process.argv.length > 1 && process.argv[1].includes('ten-activities-crawler.js')) {
  const listUrl = process.argv[2] || 'https://www.jalan.net/event/';
  
  console.log('前十活动完整信息爬虫启动...');
  console.log(`目标URL: ${listUrl}`);
  
  crawlTenActivities(listUrl)
    .then(() => {
      console.log('🎯 任务完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 任务失败:', error);
      process.exit(1);
    });
}

export { crawlTenActivities, extractActivityDetails }; 