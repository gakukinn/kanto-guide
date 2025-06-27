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
      text.includes('fall') || text.includes('kouyou')) {
    return 'momiji';
  }
  if (text.includes('イルミネーション') || text.includes('illumination') || 
      text.includes('光') || text.includes('ライトアップ')) {
    return 'illumination';
  }
  
  // 默认分类为文化活动
  return 'culture';
}

// 提取Google Maps坐标
async function extractGoogleMapsCoords(page) {
  try {
    // 等待地图加载
    await page.waitForSelector('iframe[src*="maps.google.com"]', { timeout: 5000 });
    
    // 获取Google Maps链接
    const mapLink = await page.$eval('a[href*="maps.google.com"]', el => el.href);
    if (mapLink) {
      const coordMatch = mapLink.match(/ll=([0-9.-]+),([0-9.-]+)/);
      if (coordMatch) {
        return {
          latitude: parseFloat(coordMatch[1]),
          longitude: parseFloat(coordMatch[2])
        };
      }
    }
  } catch (error) {
    console.log('坐标提取失败，使用默认值');
  }
  
  return { latitude: 35.6762, longitude: 139.6503 }; // 东京默认坐标
}

async function crawlTokyoActivities() {
  console.log('🚀 开始使用Crawl4AI + Playwright + Cheerio爬取东京都前十个活动');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // 1. 访问东京都活动页面
    console.log('📄 访问活动列表页面...');
    // 重试机制
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        await page.goto('https://www.jalan.net/event/130000/?screenId=OUW2401', {
          waitUntil: 'load',
          timeout: 60000
        });
        await page.waitForTimeout(3000);
        break;
      } catch (error) {
        retryCount++;
        console.log(`⚠️ 页面加载重试 ${retryCount}/${maxRetries}`);
        if (retryCount >= maxRetries) {
          throw error;
        }
        await page.waitForTimeout(5000);
      }
    }
    
    // 2. 获取页面HTML内容
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // 3. 提取前十个活动链接
    const activityLinks = [];
    $('a[href*="/event/evt_"]').each((index, element) => {
      if (index < 10) {
        const href = $(element).attr('href');
        const fullUrl = href.startsWith('//') ? 'https:' + href : href;
        activityLinks.push(fullUrl);
      }
    });
    
    console.log(`📋 找到${activityLinks.length}个活动链接`);
    
    // 4. 获取东京都地区
    const tokyoRegion = await prisma.region.findFirst({
      where: { 
        OR: [
          { nameCn: '东京都' },
          { nameJp: '東京都' },
          { code: 'tokyo' }
        ]
      }
    });
    
    if (!tokyoRegion) {
      throw new Error('未找到东京都地区记录');
    }
    
    // 5. 逐个爬取活动详情
    for (let i = 0; i < Math.min(activityLinks.length, 10); i++) {
      const link = activityLinks[i];
      console.log(`\n🔍 爬取第${i + 1}个活动: ${link}`);
      
      try {
        // 访问详情页面
                 await page.goto(link, { waitUntil: 'load', timeout: 60000 });
        await page.waitForTimeout(2000);
        
        // 获取详情页面HTML
        const detailHtml = await page.content();
        const $detail = cheerio.load(detailHtml);
        
                 // 提取活动信息 - 严格对应十项信息
         const activityData = {
           name: '',           // 1. 名称
           address: '',        // 2. 所在地
           datetime: '',       // 3. 開催期間
           venue: '',          // 4. 開催場所
           access: '',         // 5. 交通アクセス
           organizer: '',      // 6. 主催
           price: '',          // 7. 料金
           contact: '',        // 8. 問合せ先
           website: '',        // 9. ホームページ
           googleMap: '',      // 10. 谷歌网站
           region: '東京都',   // 11. 地区（自动识别）
           regionId: tokyoRegion.id
         };
        
        // 使用Cheerio解析基本信息表格
        $detail('table tr').each((index, row) => {
          const cells = $detail(row).find('td');
          if (cells.length >= 2) {
            const key = $detail(cells[0]).text().trim();
            const value = $detail(cells[1]).text().trim();
            
            switch (key) {
              case '名称':
                activityData.name = value.split('（')[0].trim();
                break;
              case '所在地':
                activityData.address = value.trim(); // 保留完整地址包括邮编
                break;
              case '開催期間':
                activityData.datetime = value.replace(/※.*/, '').trim();
                break;
              case '開催場所':
                activityData.venue = value.replace('東京都 ', '').trim();
                break;
              case '交通アクセス':
                activityData.access = value;
                break;
              case '主催':
                activityData.organizer = value;
                break;
              case '問合せ先':
                activityData.contact = value;
                break;
              case 'ホームページ':
                activityData.website = value;
                break;
            }
          }
        });
        
        // 如果表格解析失败，尝试其他选择器
        if (!activityData.name) {
          activityData.name = $detail('h1').first().text().trim();
        }
        
                 // 提取Google Maps链接
         const coords = await extractGoogleMapsCoords(page);
         activityData.googleMap = `https://maps.google.com/maps?ll=${coords.latitude},${coords.longitude}&z=15&t=m`;
        
        // 分类活动
        const category = classifyActivity(activityData.name, activityData.venue);
        
        // 检查是否已存在
        let existingActivity = null;
        const searchTables = ['matsuriEvent', 'hanabiEvent', 'hanamiEvent', 'momijiEvent', 'illuminationEvent', 'cultureEvent'];
        
        for (const table of searchTables) {
          existingActivity = await prisma[table].findFirst({
            where: { 
              name: activityData.name,
              regionId: tokyoRegion.id 
            }
          });
          if (existingActivity) break;
        }
        
        if (existingActivity) {
          console.log(`🔄 活动"${activityData.name}"已存在，执行更新操作`);
          // 更新现有记录
          let result;
          switch (category) {
            case 'hanabi':
              result = await prisma.hanabiEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`🎆 花火活动更新成功: ${activityData.name}`);
              break;
            case 'matsuri':
              result = await prisma.matsuriEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`🏮 祭典活动更新成功: ${activityData.name}`);
              break;
            case 'hanami':
              result = await prisma.hanamiEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`🌸 赏花活动更新成功: ${activityData.name}`);
              break;
            case 'momiji':
              result = await prisma.momijiEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`🍁 狩枫活动更新成功: ${activityData.name}`);
              break;
            case 'illumination':
              result = await prisma.illuminationEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`💡 灯光活动更新成功: ${activityData.name}`);
              break;
            default:
              result = await prisma.cultureEvent.update({
                where: { id: existingActivity.id },
                data: activityData
              });
              console.log(`🎭 文化活动更新成功: ${activityData.name}`);
          }
          console.log(`✅ 第${i + 1}个活动更新完成`);
          continue;
        }
        
        // 根据分类录入对应表
        let result;
        switch (category) {
          case 'hanabi':
            result = await prisma.hanabiEvent.create({ data: activityData });
            console.log(`🎆 花火活动录入成功: ${activityData.name}`);
            break;
          case 'matsuri':
            result = await prisma.matsuriEvent.create({ data: activityData });
            console.log(`🏮 祭典活动录入成功: ${activityData.name}`);
            break;
          case 'hanami':
            result = await prisma.hanamiEvent.create({ data: activityData });
            console.log(`🌸 赏花活动录入成功: ${activityData.name}`);
            break;
          case 'momiji':
            result = await prisma.momijiEvent.create({ data: activityData });
            console.log(`🍁 狩枫活动录入成功: ${activityData.name}`);
            break;
          case 'illumination':
            result = await prisma.illuminationEvent.create({ data: activityData });
            console.log(`💡 灯光活动录入成功: ${activityData.name}`);
            break;
          default:
            result = await prisma.cultureEvent.create({ data: activityData });
            console.log(`🎭 文化活动录入成功: ${activityData.name}`);
        }
        
        console.log(`✅ 第${i + 1}个活动录入完成`);
        
      } catch (error) {
        console.error(`❌ 第${i + 1}个活动爬取失败:`, error.message);
        continue;
      }
    }
    
  } catch (error) {
    console.error('❌ 爬取过程中发生错误:', error);
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
  
  console.log('🎉 东京都前十个活动爬取完成！');
}

// 执行爬取
crawlTokyoActivities().catch(console.error); 