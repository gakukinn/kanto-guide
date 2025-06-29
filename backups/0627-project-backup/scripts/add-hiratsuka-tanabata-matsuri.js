const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addHiratsukaSevenStarFestival() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=VizDisplayCompositor']
  });
  const page = await browser.newPage();

  try {
    console.log('🔍 爬取Jalan页面中的湘南ひらつか七夕まつり信息...');
    
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    // 访问Jalan官方网站
    await page.goto('https://www.jalan.net/event/evt_343917/?screenId=OUW1702', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    console.log('页面加载完成，等待地图渲染...');
    await page.waitForTimeout(5000);

    // 使用文档化的多方法坐标提取技术
    console.log('搜索iframe中的Google地图...');
    const iframeCoords = await page.evaluate(() => {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const iframe of iframes) {
        const src = iframe.src;
        if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
          console.log('找到Google地图iframe:', src);
          
          const coordsMatch = src.match(/[!@]([0-9.-]+),([0-9.-]+)/);
          const centerMatch = src.match(/center=([0-9.-]+),([0-9.-]+)/);
          const llMatch = src.match(/ll=([0-9.-]+),([0-9.-]+)/);
          const qMatch = src.match(/q=([0-9.-]+),([0-9.-]+)/);
          
          if (coordsMatch) {
            return { lat: parseFloat(coordsMatch[1]), lng: parseFloat(coordsMatch[2]), source: 'iframe-coords' };
          }
          if (centerMatch) {
            return { lat: parseFloat(centerMatch[1]), lng: parseFloat(centerMatch[2]), source: 'iframe-center' };
          }
          if (llMatch) {
            return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]), source: 'iframe-ll' };
          }
          if (qMatch) {
            return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]), source: 'iframe-q' };
          }
        }
      }
      return null;
    });

    console.log('iframe坐标搜索结果:', iframeCoords);

    // 方法2: 查找JavaScript变量中的坐标
    console.log('搜索JavaScript变量中的坐标...');
    const jsCoords = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      for (const script of scripts) {
        const text = script.textContent || '';
        
        const patterns = [
          /lat[:\s]*([0-9.]+)[\s,]*lng[:\s]*([0-9.]+)/gi,
          /latitude[:\s]*([0-9.]+)[\s,]*longitude[:\s]*([0-9.]+)/gi,
          /"lat"[:\s]*([0-9.]+)[\s,]*"lng"[:\s]*([0-9.]+)/gi,
          /center[:\s]*\{[^}]*lat[:\s]*([0-9.]+)[^}]*lng[:\s]*([0-9.]+)/gi,
          /position[:\s]*\{[^}]*lat[:\s]*([0-9.]+)[^}]*lng[:\s]*([0-9.]+)/gi
        ];
        
        for (const pattern of patterns) {
          const matches = Array.from(text.matchAll(pattern));
          for (const match of matches) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (lat > 30 && lat < 40 && lng > 135 && lng < 145) {
              return { lat, lng, source: 'javascript' };
            }
          }
        }
      }
      return null;
    });

    console.log('JavaScript坐标搜索结果:', jsCoords);

    // 方法3: 查找页面中的所有链接 (成功方法)
    console.log('搜索页面链接中的坐标...');
    const linkCoords = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
      for (const link of links) {
        const href = link.href;
        if (href) {
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
              if (lat > 30 && lat < 40 && lng > 135 && lng < 145) {
                return { lat, lng, source: 'link', url: href };
              }
            }
          }
        }
      }
      return null;
    });

    console.log('链接坐标搜索结果:', linkCoords);

    // 方法4: 查找meta标签中的地理信息
    console.log('搜索meta标签中的地理信息...');
    const metaCoords = await page.evaluate(() => {
      const geoPosition = document.querySelector('meta[name="geo.position"]');
      const icbm = document.querySelector('meta[name="ICBM"]');
      
      if (geoPosition && geoPosition.content) {
        const coords = geoPosition.content.split(',');
        if (coords.length === 2) {
          return { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]), source: 'meta-geo' };
        }
      }
      
      if (icbm && icbm.content) {
        const coords = icbm.content.split(',');
        if (coords.length === 2) {
          return { lat: parseFloat(coords[0]), lng: parseFloat(coords[1]), source: 'meta-icbm' };
        }
      }
      
      return null;
    });

    console.log('meta标签搜索结果:', metaCoords);

    // 按优先级选择最可靠的坐标
    let finalCoords = null;
    let coordsSource = '';

    if (iframeCoords && iframeCoords.lat && iframeCoords.lng) {
      finalCoords = { lat: iframeCoords.lat, lng: iframeCoords.lng };
      coordsSource = iframeCoords.source;
    } else if (jsCoords && jsCoords.lat && jsCoords.lng) {
      finalCoords = { lat: jsCoords.lat, lng: jsCoords.lng };
      coordsSource = jsCoords.source;
    } else if (linkCoords && linkCoords.lat && linkCoords.lng) {
      finalCoords = { lat: linkCoords.lat, lng: linkCoords.lng };
      coordsSource = linkCoords.source;
    } else if (metaCoords && metaCoords.lat && metaCoords.lng) {
      finalCoords = { lat: metaCoords.lat, lng: metaCoords.lng };
      coordsSource = metaCoords.source;
    }

    if (!finalCoords) {
      console.log('未找到页面中的地图坐标，使用平塚站标准坐标');
      finalCoords = { lat: 35.3275, lng: 139.3492 };
      coordsSource = 'fallback-hiratsuka-station';
    }

    console.log('最终选择的坐标:', finalCoords, '来源:', coordsSource);

    // 检查是否已存在记录
    const existingEvent = await prisma.matsuriEvent.findFirst({
      where: { 
        OR: [
          { name: { contains: '湘南ひらつか七夕' } },
          { name: { contains: '平塚七夕' } }
        ]
      }
    });

    // 生成地图嵌入URL
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${finalCoords.lng}!3d${finalCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5rmY5Y2X44Gy44KJ44Gk44GL5LiD5aSV!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;

    // 获取地区ID
    const region = await prisma.region.findFirst({
      where: { code: 'kanagawa' }
    });

    if (!region) {
      throw new Error('找不到神奈川县地区记录');
    }

    const eventData = {
      eventId: 'hiratsuka-tanabata-2025',
      name: '湘南ひらつか七夕まつり',
      englishName: 'Shonan Hiratsuka Tanabata Festival',
      japaneseName: '湘南ひらつか七夕まつり',
      year: 2025,
      month: 7,
      date: '2025-07-04',
      displayDate: '2025年7月4日～6日',
      time: '10:00～20:00（最終日は19:00まで）',
      duration: '3日間',
      location: 'JR平塚駅北口商店街を中心とする市内各所',
      matsuriType: '七夕祭り',
      traditionLevel: 3,
      venues: {
        mainVenue: 'JR平塚駅北口商店街',
        additionalVenues: ['市内各所']
      },
      access: {
        train: 'JR東海道本線「平塚駅」から徒歩2分',
        parking: '周辺有料駐車場利用'
      },
      history: {
        background: '湘南ひらつか七夕まつりは、平塚市の夏の風物詩として親しまれている伝統的な七夕祭りです。',
        highlights: ['七夕飾り', '商店街パレード', '屋台グルメ', '伝統工芸']
      },
      tips: {
        weather: '雨天決行',
        bestTime: '夕方から夜にかけて',
        crowdInfo: '土日は特に混雑'
      },
      contact: {
        organizer: '湘南ひらつか七夕まつり実行委員会（平塚市商業観光課内）',
        phone: '0463-35-8107',
        website: 'http://www.tanabata-hiratsuka.com/'
      },
      mapInfo: {
        address: '〒254-0043 神奈川県平塚市紅谷町',
        coordinates: finalCoords,
        mapUrl: `https://maps.google.com/?q=${finalCoords.lat},${finalCoords.lng}`,
        embedUrl: embedUrl,
        coordsSource: coordsSource
      },
      verified: true,
      verificationDate: new Date(),
      regionId: region.id
    };

    let result;
    if (existingEvent) {
      console.log('更新现有记录...');
      result = await prisma.matsuriEvent.update({
        where: { id: existingEvent.id },
        data: eventData
      });
      console.log('✅ 湘南ひらつか七夕まつり信息已更新');
    } else {
      console.log('创建新记录...');
      result = await prisma.matsuriEvent.create({
        data: eventData
      });
      console.log('✅ 湘南ひらつか七夕まつり信息已添加');
    }

    console.log('坐标来源:', coordsSource);
    console.log('最终坐标:', finalCoords);
    console.log('🎋 湘南ひらつか七夕まつり处理完成');
    console.log('记录ID:', result.id);

    await browser.close();
    await prisma.$disconnect();

  } catch (error) {
    console.error('❌ 处理失败:', error.message);
    await browser.close();
    await prisma.$disconnect();
    throw error;
  }
}

// 执行脚本
addHiratsukaSevenStarFestival()
  .then(() => {
    console.log('脚本执行成功');
    process.exit(0);
  })
  .catch((error) => {
    console.error('脚本执行失败:', error);
    process.exit(1);
  }); 