import { PrismaClient } from '../src/generated/prisma/index.js';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// 活动类型映射
const ACTIVITY_MAPPING = {
  matsuri: ['祭', '祭り', '祭典', 'フェスタ', 'フェスティバル', '盆踊り'],
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

function classifyActivity(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  for (const [type, keywords] of Object.entries(ACTIVITY_MAPPING)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return type;
    }
  }
  return 'culture';
}

function identifyRegion(locationText) {
  for (const [prefecture, region] of Object.entries(REGION_MAPPING)) {
    if (locationText.includes(prefecture)) {
      return region;
    }
  }
  return 'tokyo';
}

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

async function extractActivityDetails(page, url) {
  console.log(`🔍 正在提取: ${url}`);
  
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
                   $('title').text().split(' | ')[0].trim();
    }
    
    // dt/dd结构提取
    $('dt').each((i, dt) => {
      const label = $(dt).text().trim();
      const value = $(dt).next('dd').text().trim();
      
      if (label.includes('開催期間') || label.includes('日時') || label.includes('期間')) {
        result.date = result.date || value;
      } else if (label.includes('会場') || label.includes('場所') || label.includes('開催地')) {
        result.venue = result.venue || value;
      } else if (label.includes('住所') || label.includes('所在地')) {
        result.address = result.address || value;
      } else if (label.includes('アクセス') || label.includes('交通')) {
        result.access = result.access || value;
      } else if (label.includes('主催') || label.includes('運営')) {
        result.organizer = result.organizer || value;
      } else if (label.includes('料金') || label.includes('入場料') || label.includes('費用')) {
        result.price = result.price || value;
      } else if (label.includes('連絡先') || label.includes('問合せ') || label.includes('電話')) {
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
                      $('[class*="address"]').text().trim() ||
                      $('.location').text().trim();
    }
    
    if (!result.access) {
      result.access = $('.access-info').text().trim() ||
                     $('[class*="access"]').text().trim() ||
                     $('.transport').text().trim();
    }
    
    if (!result.price) {
      result.price = $('.price').text().trim() ||
                    $('[class*="price"]').text().trim() ||
                    $('.fee').text().trim() || '无料';
    }
    
    // 清理数据
    Object.keys(result).forEach(key => {
      if (typeof result[key] === 'string') {
        result[key] = result[key].replace(/\s+/g, ' ').trim();
      }
    });
    
    // 显示提取结果
    console.log('📋 提取的信息:');
    console.log(`名称: ${result.name}`);
    console.log(`日期: ${result.date}`);
    console.log(`会场: ${result.venue}`);
    console.log(`地址: ${result.address}`);
    console.log(`交通: ${result.access}`);
    console.log(`坐标: ${result.latitude}, ${result.longitude}`);
    console.log(`主办: ${result.organizer}`);
    console.log(`费用: ${result.price}`);
    console.log(`联系: ${result.contact}`);
    
    return result;
    
  } catch (error) {
    console.error(`❌ 提取失败: ${error.message}`);
    return null;
  }
}

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
      // 创建地区记录
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
      datetime: activityData.date,  // 使用datetime字段
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
    
    console.log(`✅ 已保存到数据库 (${activityType}): ${activityData.name}`);
    return savedActivity;
    
  } catch (error) {
    console.error(`❌ 保存失败: ${error.message}`);
    return null;
  }
}

// 测试多个活动URL
async function testMultipleActivities() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  
  // 测试URL列表
  const testUrls = [
    'https://www.jalan.net/event/evt_343864/?screenId=OUW1702',  // 新橋こいち祭
    'https://www.jalan.net/event/evt_337473/?screenId=OUW1702',  // 東京花火
    'https://www.jalan.net/event/evt_336889/?screenId=OUW1702',  // 祭典活动
    'https://www.jalan.net/event/evt_340123/?screenId=OUW1702',  // 文化活动
    'https://www.jalan.net/event/evt_339567/?screenId=OUW1702'   // 其他活动
  ];
  
  try {
    console.log('🚀 开始测试十一项信息提取...');
    
    const results = [];
    
    for (let i = 0; i < testUrls.length; i++) {
      const url = testUrls[i];
      console.log(`\n📍 测试第 ${i + 1}/${testUrls.length} 个活动`);
      console.log(`URL: ${url}`);
      
      const activityData = await extractActivityDetails(page, url);
      
      if (activityData && activityData.name) {
        const activityType = classifyActivity(activityData.name, activityData.venue);
        const region = identifyRegion(activityData.venue + ' ' + activityData.address);
        
        console.log(`🏷️ 分类: ${activityType}, 地区: ${region}`);
        
        const savedActivity = await saveActivityToDatabase(activityData, activityType, region);
        
        if (savedActivity) {
          results.push({
            ...activityData,
            type: activityType,
            region: region,
            id: savedActivity.id
          });
        }
      } else {
        console.log('⚠️ 无法提取有效信息');
      }
      
      await page.waitForTimeout(3000);
    }
    
    console.log('\n🎉 测试完成！');
    console.log(`✅ 成功录入: ${results.length} 个活动`);
    
    const typeStats = {};
    results.forEach(activity => {
      typeStats[activity.type] = (typeStats[activity.type] || 0) + 1;
    });
    
    console.log('\n📊 录入统计:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} 个`);
    });
    
    return results;
    
  } catch (error) {
    console.error(`❌ 测试出错: ${error.message}`);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

if (process.argv.length > 1 && process.argv[1].includes('direct-test-extractor.js')) {
  console.log('直接测试十一项信息提取...');
  
  testMultipleActivities()
    .then(() => {
      console.log('🎯 测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 测试失败:', error);
      process.exit(1);
    });
}

export { extractActivityDetails, testMultipleActivities }; 