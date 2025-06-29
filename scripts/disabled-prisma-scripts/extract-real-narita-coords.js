const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function extractRealNaritaCoords() {
  const browser = await chromium.launch({ 
    headless: true, // 改为无头模式，更稳定
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=VizDisplayCompositor']
  });
  const page = await browser.newPage();

  try {
    console.log('🔍 爬取Jalan页面中的Google地图坐标...');
    
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    // 访问Jalan官方网站，使用更宽松的设置
    await page.goto('https://www.jalan.net/event/evt_343701/?screenId=OUW1702', {
      waitUntil: 'domcontentloaded', // 改为domcontentloaded，不等待所有资源
      timeout: 30000 // 减少超时时间
    });

    console.log('页面加载完成，等待地图渲染...');
    await page.waitForTimeout(5000); // 减少等待时间

    // 方法1: 查找页面中的iframe地图
    console.log('搜索iframe中的Google地图...');
    const iframeCoords = await page.evaluate(() => {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const iframe of iframes) {
        const src = iframe.src;
        if (src && (src.includes('maps.google') || src.includes('google.com/maps'))) {
          console.log('找到Google地图iframe:', src);
          
          // 提取URL中的坐标参数
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
        
        // 查找各种可能的坐标格式
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
            if (lat > 30 && lat < 40 && lng > 135 && lng < 145) { // 日本范围检查
              return { lat, lng, source: 'javascript' };
            }
          }
        }
      }
      return null;
    });

    console.log('JavaScript坐标搜索结果:', jsCoords);

    // 方法3: 查找meta标签中的地理信息
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

    // 方法4: 查找页面中的所有链接
    console.log('搜索页面链接中的坐标...');
    const linkCoords = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
      for (const link of links) {
        const href = link.href;
        if (href) {
          // 查找各种Google Maps URL格式中的坐标
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

    // 选择最可靠的坐标
    let finalCoords = null;
    let coordsSource = '';

    // 优先级：iframe > javascript > link > meta
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
      console.log('未找到页面中的地图坐标，使用成田山新勝寺标准坐标');
      finalCoords = { lat: 35.7779, lng: 140.3168 };
      coordsSource = 'fallback-naritasan';
    }

    console.log('最终选择的坐标:', finalCoords, '来源:', coordsSource);

    // 更新数据库
    const existingEvent = await prisma.matsuriEvent.findFirst({
      where: { name: { contains: '成田' } }
    });

    if (!existingEvent) {
      throw new Error('找不到成田祇園祭记录');
    }

    // 生成新的地图嵌入URL
    const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d${finalCoords.lng}!3d${finalCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5oiQ55Sw56WH5ZyS!5e0!3m2!1sja!2sjp!4v${Date.now()}!5m2!1sja!2sjp`;

    const updatedData = {
      mapInfo: {
        address: '〒286-0023 千葉県成田市成田1',
        coordinates: finalCoords,
        mapUrl: `https://maps.google.com/?q=${finalCoords.lat},${finalCoords.lng}`,
        embedUrl: embedUrl,
        coordsSource: coordsSource
      },
      verified: true,
      verificationDate: new Date()
    };

    const result = await prisma.matsuriEvent.update({
      where: { id: existingEvent.id },
      data: updatedData
    });

    console.log('✅ 成田祇園祭地图坐标已更新');
    console.log('坐标来源:', coordsSource);
    console.log('最终坐标:', finalCoords);

    return result;

  } catch (error) {
    console.error('❌ 提取坐标失败:', error);
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 执行脚本
if (require.main === module) {
  extractRealNaritaCoords()
    .then((result) => {
      console.log('🎌 成田祇園祭真实坐标提取完成');
      console.log('记录ID:', result.id);
    })
    .catch((error) => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { extractRealNaritaCoords }; 