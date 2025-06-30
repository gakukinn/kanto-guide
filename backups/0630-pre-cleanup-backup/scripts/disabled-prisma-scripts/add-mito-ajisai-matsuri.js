const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addMitoAjisaiMatsuri() {
  console.log('🌸 开始添加第51回水戸のあじさい祭典到数据库...');
  
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
  
  try {
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    console.log('📡 正在访问Jalan网站...');
    const targetUrl = 'https://www.jalan.net/event/evt_341998/?screenId=OUW1702';
    
    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    console.log('📄 正在提取页面数据...');
    
    // 等待页面加载完成
    await page.waitForTimeout(3000);
    
    const html = await page.content();
    const $ = cheerio.load(html);
    
    // 提取基本信息
    const eventData = {
      eventId: 'mito-ajisai-matsuri-2025',
      name: '第51回水戸のあじさい祭典',
      englishName: 'The 51st Mito Hydrangea Festival',
      year: 2025,
      season: 'summer',
      peakTime: '2025年6月中旬～下旬',
      location: '茨城県水戸市松本町13-19',
      lightUp: false,
      access: {
        train: 'ＪＲ「水戸駅」北口7番乗り場から「栄町経由茨大・渡里行」の茨城交通バス約15分「保和苑入口」～徒歩4分',
        car: '常磐自動車道「水戸IC」から国道50号大工町交差点経由車約20分'
      },
      tips: {
        bestTime: '6月中旬～下旬',
        varieties: '約100種類6,000株の紫陽花',
        features: ['無料観賞', '多品種の紫陽花', '歴史ある庭園', 'アクセス良好'],
        notes: '水戸市の保和苑及び周辺史跡で開催される紫陽花祭り'
      },
      contact: {
        organizer: '水戸のあじさい祭典実行委員会',
        phone: '029-224-1111',
        office: '事務局（水戸市産業経済部観光課）',
        website: 'https://www.city.mito.lg.jp/site/kankouinfo/94415.html'
      },
      regionId: 'cmc4tyur60002vlag6uekpd29', // 北関東
      likes: 0,
      featured: false,
      detailLink: null
    };

    console.log('🔍 正在提取地图坐标...');
    
    // 多方法提取坐标
    const coordinates = await page.evaluate(() => {
      // 方法1: iframe地图分析
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const iframe of iframes) {
        const src = iframe.src;
        if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
          const coordsMatch = src.match(/[!@]([0-9.-]+),([0-9.-]+)/);
          const centerMatch = src.match(/center=([0-9.-]+),([0-9.-]+)/);
          const llMatch = src.match(/ll=([0-9.-]+),([0-9.-]+)/);
          
          if (coordsMatch) {
            const lat = parseFloat(coordsMatch[1]);
            const lng = parseFloat(coordsMatch[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'iframe_coords' };
            }
          }
          if (centerMatch) {
            const lat = parseFloat(centerMatch[1]);
            const lng = parseFloat(centerMatch[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'iframe_center' };
            }
          }
          if (llMatch) {
            const lat = parseFloat(llMatch[1]);
            const lng = parseFloat(llMatch[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'iframe_ll' };
            }
          }
        }
      }

      // 方法2: 链接坐标提取
      const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
      for (const link of links) {
        const href = link.href;
        const patterns = [
          /@([0-9.-]+),([0-9.-]+)/,
          /ll=([0-9.-]+),([0-9.-]+)/,
          /center=([0-9.-]+),([0-9.-]+)/,
          /q=([0-9.-]+),([0-9.-]+)/
        ];
        
        for (const pattern of patterns) {
          const match = href.match(pattern);
          if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'link_coords' };
            }
          }
        }
      }

      // 方法3: JavaScript变量搜索
      const scripts = Array.from(document.querySelectorAll('script'));
      for (const script of scripts) {
        const text = script.textContent || '';
        const patterns = [
          /lat[:\s]*([0-9.]+)[\s,]*lng[:\s]*([0-9.]+)/gi,
          /latitude[:\s]*([0-9.]+)[\s,]*longitude[:\s]*([0-9.]+)/gi
        ];
        
        for (const pattern of patterns) {
          const match = pattern.exec(text);
          if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (lat >= 30 && lat <= 40 && lng >= 135 && lng <= 145) {
              return { lat, lng, source: 'javascript_vars' };
            }
          }
        }
      }

      return null;
    });

    // 如果没有提取到坐标，使用保和苑的已知坐标
    const finalCoords = coordinates || { 
      lat: 36.394444, 
      lng: 140.446667, 
      source: 'known_location_howa_en' 
    };

    console.log(`📍 坐标信息: ${finalCoords.lat}, ${finalCoords.lng} (来源: ${finalCoords.source})`);

    // 生成Google Maps相关URL
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${finalCoords.lng}!3d${finalCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5rC05oi444Gu44GC44GY44GV44GE44G+44Gk44KK!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;

    eventData.mapInfo = {
      address: '〒310-0052　茨城県水戸市松本町13-19',
      coordinates: finalCoords,
      mapUrl: `https://maps.google.com/?q=${finalCoords.lat},${finalCoords.lng}`,
      embedUrl: embedUrl,
      coordsSource: finalCoords.source
    };

    console.log('💾 正在保存到数据库...');

    // 检查是否已存在
    const existingEvent = await prisma.hanamiEvent.findFirst({
      where: {
        OR: [
          { name: eventData.name },
          { eventId: eventData.eventId }
        ]
      }
    });

    let result;
    if (existingEvent) {
      console.log('🔄 更新现有记录...');
      result = await prisma.hanamiEvent.update({
        where: { id: existingEvent.id },
        data: eventData
      });
      console.log(`✅ 已更新记录: ${result.id}`);
    } else {
      console.log('➕ 创建新记录...');
      result = await prisma.hanamiEvent.create({
        data: eventData
      });
      console.log(`✅ 已创建新记录: ${result.id}`);
    }

    console.log('📊 活动信息摘要:');
    console.log(`- 名称: ${result.name}`);
    console.log(`- 季节: ${result.season}`);
    console.log(`- 地点: ${result.location}`);
    console.log(`- 坐标: ${finalCoords.lat}, ${finalCoords.lng}`);
    console.log(`- 地区ID: ${result.regionId}`);

  } catch (error) {
    console.error('❌ 处理过程中发生错误:', error);
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 执行脚本
if (require.main === module) {
  addMitoAjisaiMatsuri()
    .then(() => {
      console.log('🎉 第51回水戸のあじさい祭典添加完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { addMitoAjisaiMatsuri }; 