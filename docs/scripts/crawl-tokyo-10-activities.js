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
  if (text.includes('紅葉') || text.includes('もみじ') || text.includes('autumn') || 
      text.includes('落葉')) {
    return 'momiji';
  }
  if (text.includes('イルミネーション') || text.includes('illumination') || 
      text.includes('ライトアップ') || text.includes('light')) {
    return 'illumination';
  }
  
  // 默认分类为祭典
  return 'matsuri';
}

// 坐标提取函数
function extractCoordinatesFromMapsUrl(url) {
  if (!url) return null;
  
  const methods = [
    // 方法1: ll= 参数提取
    /ll=([0-9.-]+),([0-9.-]+)/,
    // 方法2: @坐标格式
    /@([0-9.-]+),([0-9.-]+)/,
    // 方法3: 普通坐标对
    /([0-9.-]+),([0-9.-]+)/
  ];
  
  for (const regex of methods) {
    const match = url.match(regex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      
      // 验证日本坐标范围
      if (lat >= 30 && lat <= 45 && lng >= 129 && lng <= 146) {
        return { latitude: lat, longitude: lng };
      }
    }
  }
  return null;
}

// 地址格式统一函数
function formatAddress(address) {
  if (!address) return '';
  
  // 移除多余空格和换行
  let formatted = address.replace(/\s+/g, ' ').trim();
  
  // 确保以都道府県开头
  if (!formatted.match(/^(東京都|東京)/)) {
    formatted = '東京都' + formatted;
  }
  
  // 标准化常见地名
  formatted = formatted
    .replace(/東京都東京都/g, '東京都')
    .replace(/東京東京/g, '東京')
    .replace(/\s+/g, ' ')
    .trim();
    
  return formatted;
}

async function crawlTokyo10Activities() {
  console.log('🚀 开始爬取东京都前十个活动...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    // 访问东京都活动页面
    await page.goto('https://www.jalan.net/event/130000/?screenId=OUW1702', {
      waitUntil: 'networkidle'
    });
    
    console.log('✅ 成功访问东京都活动页面');
    await page.waitForTimeout(3000);
    
    // 获取活动链接
    const activityLinks = await page.$$eval('a[href*="/event/"]', links => 
      links.slice(0, 10).map(link => ({
        url: link.href,
        title: link.textContent.trim()
      })).filter(item => item.url.includes('/event/') && !item.url.includes('screenId'))
    );
    
    console.log(`🔍 找到 ${activityLinks.length} 个活动链接`);
    
    const activities = [];
    
    // 获取东京都地区
    let tokyoRegion = await prisma.region.findFirst({
      where: { nameCn: '东京都' }
    });
    
    if (!tokyoRegion) {
      tokyoRegion = await prisma.region.create({
        data: { 
          code: 'tokyo',
          nameCn: '东京都',
          nameJp: '東京都'
        }
      });
    }
    
    // 逐个访问活动详情页
    for (let i = 0; i < Math.min(10, activityLinks.length); i++) {
      const link = activityLinks[i];
      console.log(`\n📋 正在处理第 ${i + 1} 个活动: ${link.title}`);
      
      try {
        await page.goto(link.url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        const html = await page.content();
        const $ = cheerio.load(html);
        
        // 提取活动信息
        const name = $('h1').first().text().trim() || link.title;
        const address = formatAddress($('[class*="address"], .event-address, .location').first().text().trim());
        const datetime = $('.event-date, [class*="date"], [class*="period"]').first().text().trim();
        const venue = $('.event-venue, [class*="venue"], [class*="place"]').first().text().trim();
        const access = $('[class*="access"], .transportation').first().text().trim();
        const organizer = $('[class*="organizer"], [class*="sponsor"]').first().text().trim();
        const price = $('[class*="price"], [class*="fee"], [class*="cost"]').first().text().trim() || '入場無料';
        const contact = $('[class*="contact"], [class*="tel"], [class*="phone"]').first().text().trim();
        const website = $('a[href*="http"]').first().attr('href') || '';
        
        // 提取Google Maps链接和坐标
        let googleMap = '';
        let coordinates = null;
        
        const mapLinks = $('a[href*="maps.google"], a[href*="google.com/maps"]');
        if (mapLinks.length > 0) {
          googleMap = mapLinks.first().attr('href');
          coordinates = extractCoordinatesFromMapsUrl(googleMap);
        }
        
        // 活动分类
        const category = classifyActivity(name, datetime + ' ' + venue);
        
        const activity = {
          name,
          address,
          datetime,
          venue,
          access,
          organizer,
          price,
          contact,
          website,
          googleMap,
          coordinates,
          category,
          regionId: tokyoRegion.id
        };
        
        activities.push(activity);
        console.log(`✅ 提取完成: ${name} (${category})`);
        
      } catch (error) {
        console.error(`❌ 处理活动 ${i + 1} 失败:`, error.message);
      }
    }
    
    await browser.close();
    
    // 录入数据库
    console.log('\n💾 开始录入数据库...');
    
    for (const activity of activities) {
      try {
        // 检查是否已存在
        const existing = await checkExistingActivity(activity.name, tokyoRegion.id);
        
        if (existing) {
          console.log(`⚠️ 活动已存在，跳过: ${activity.name}`);
          continue;
        }
        
        // 根据分类录入对应表
        const activityData = {
          name: activity.name,
          address: activity.address,
          datetime: activity.datetime,
          venue: activity.venue,
          access: activity.access,
          organizer: activity.organizer,
          price: activity.price,
          contact: activity.contact,
          website: activity.website,
          googleMap: activity.googleMap,
          regionId: activity.regionId,
          prefecture: '東京都'
        };
        
        if (activity.coordinates) {
          activityData.latitude = activity.coordinates.latitude;
          activityData.longitude = activity.coordinates.longitude;
          activityData.coords_source = 'Google Maps链接';
          activityData.coords_verified = true;
        }
        
        switch (activity.category) {
          case 'matsuri':
            await prisma.matsuriEvent.create({ data: activityData });
            console.log(`✅ 录入祭典活动: ${activity.name}`);
            break;
          case 'hanabi':
            await prisma.hanabiEvent.create({ data: activityData });
            console.log(`✅ 录入花火活动: ${activity.name}`);
            break;
          case 'hanami':
            await prisma.hanamiEvent.create({ data: activityData });
            console.log(`✅ 录入赏花活动: ${activity.name}`);
            break;
          case 'momiji':
            await prisma.momijiEvent.create({ data: activityData });
            console.log(`✅ 录入狩枫活动: ${activity.name}`);
            break;
          case 'illumination':
            await prisma.illuminationEvent.create({ data: activityData });
            console.log(`✅ 录入灯光活动: ${activity.name}`);
            break;
          default:
            await prisma.matsuriEvent.create({ data: activityData });
            console.log(`✅ 录入祭典活动(默认): ${activity.name}`);
        }
        
      } catch (error) {
        console.error(`❌ 录入失败: ${activity.name}`, error.message);
      }
    }
    
    console.log('\n🎉 东京都前十个活动爬取和录入完成！');
    
  } catch (error) {
    console.error('❌ 爬取失败:', error);
    await browser.close();
  } finally {
    await prisma.$disconnect();
  }
}

// 检查重复活动
async function checkExistingActivity(name, regionId) {
  const tables = ['matsuriEvent', 'hanabiEvent', 'hanamiEvent', 'momijiEvent', 'illuminationEvent'];
  
  for (const table of tables) {
    const existing = await prisma[table].findFirst({
      where: { name, regionId }
    });
    if (existing) return existing;
  }
  return null;
}

crawlTokyo10Activities(); 