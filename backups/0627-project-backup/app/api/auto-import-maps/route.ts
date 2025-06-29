import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: '请提供要解析的网页URL' 
      }, { status: 400 });
    }

    console.log('开始抓取网页并识别谷歌地图位置:', url);
    
    const result = await extractLocationFromJalanPage(url);
    
    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('地图位置识别错误:', error);
    return NextResponse.json({ 
      success: false, 
      error: '地图位置识别失败',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function extractLocationFromJalanPage(url: string) {
  let browser;
  
  try {
    // 启动浏览器
    browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--disable-web-security', 
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // 设置用户代理避免反爬虫
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    console.log('正在访问页面:', url);
    
    // 使用宽松的加载策略
    await page.goto(url, {
      waitUntil: 'domcontentloaded', // 不等待所有资源
      timeout: 30000 // 适中的超时时间
    });

    // 等待页面完全加载
    await page.waitForTimeout(5000);

    console.log('页面加载完成，开始提取坐标...');

    const result = {
      coordinates: null as { lat: number; lng: number } | null,
      coordsSource: '',
      googleMapsUrl: '',
      mapEmbedUrl: '',
      address: '',
      venue: '',
      extractedInfo: {} as any,
      standardEmbedUrl: '' // 备用的标准嵌入格式
    };

    // 方法1: 查找Google Maps iframe嵌入 ⭐ (按技术指南优化)
    console.log('方法1: 查找Google Maps iframe...');
    const iframeCoords = await page.evaluate(() => {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const iframe of iframes) {
        const src = iframe.src;
        if (src && (src.includes('maps.google') || src.includes('google.com/maps') || src.includes('maps.googleapis'))) {
          console.log('发现Google Maps iframe:', src);
          
          // 提取各种坐标格式
          const coordsMatch = src.match(/[!@]([0-9.-]+),([0-9.-]+)/) ||
                             src.match(/center=([0-9.-]+),([0-9.-]+)/) ||
                             src.match(/ll=([0-9.-]+),([0-9.-]+)/) ||
                             src.match(/q=([0-9.-]+),([0-9.-]+)/);
          
          if (coordsMatch) {
            const lat = parseFloat(coordsMatch[1]);
            const lng = parseFloat(coordsMatch[2]);
            
            // 日本坐标范围验证
            if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
              return {
                lat: lat,
                lng: lng,
                source: 'Google Maps iframe',
                embedUrl: src
              };
            }
          }
        }
      }
      return null;
    });

    if (iframeCoords) {
      result.coordinates = { lat: iframeCoords.lat, lng: iframeCoords.lng };
      result.coordsSource = iframeCoords.source;
      result.mapEmbedUrl = iframeCoords.embedUrl;
      console.log('从iframe提取坐标成功:', iframeCoords);
    }

    // 方法2: 查找JavaScript中的坐标变量 (按技术指南优化)
    if (!result.coordinates) {
      console.log('方法2: 查找JavaScript中的坐标...');
      const jsCoords = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script'));
        
        for (const script of scripts) {
          const text = script.textContent || '';
          const patterns = [
            /lat[:\s]*([0-9.-]+)[\s,]*lng[:\s]*([0-9.-]+)/gi,
            /latitude[:\s]*([0-9.-]+)[\s,]*longitude[:\s]*([0-9.-]+)/gi,
            /"lat"[:\s]*([0-9.-]+)[\s,]*"lng"[:\s]*([0-9.-]+)/gi,
            /"latitude"[:\s]*([0-9.-]+)[\s,]*"longitude"[:\s]*([0-9.-]+)/gi,
            /center[:\s]*\[([0-9.-]+),\s*([0-9.-]+)\]/gi,
            /position[:\s]*\[([0-9.-]+),\s*([0-9.-]+)\]/gi
          ];
          
          for (const pattern of patterns) {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
              const lat = parseFloat(match[1]);
              const lng = parseFloat(match[2]);
              
              // 日本坐标范围验证
              if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
                return {
                  lat: lat,
                  lng: lng,
                  source: 'JavaScript variables'
                };
              }
            }
          }
        }
        return null;
      });

      if (jsCoords) {
        result.coordinates = { lat: jsCoords.lat, lng: jsCoords.lng };
        result.coordsSource = jsCoords.source;
        console.log('从JavaScript提取坐标成功:', jsCoords);
      }
    }

    // 方法3: 查找Google Maps链接 ⭐ (技术指南成功方法)
    if (!result.coordinates) {
      console.log('方法3: 查找Google Maps链接...');
      const linkCoords = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="maps"], a[href*="google"]'));
        for (const link of links) {
          const href = (link as HTMLAnchorElement).href;
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
              
              // 日本坐标范围验证
              if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
                return {
                  lat: lat,
                  lng: lng,
                  source: 'Google Maps link',
                  mapUrl: href
                };
              }
            }
          }
        }
        return null;
      });

      if (linkCoords) {
        result.coordinates = { lat: linkCoords.lat, lng: linkCoords.lng };
        result.coordsSource = linkCoords.source;
        result.googleMapsUrl = linkCoords.mapUrl;
        console.log('从链接提取坐标成功:', linkCoords);
      }
    }

    // 方法4: 查找Meta标签中的地理信息
    if (!result.coordinates) {
      console.log('方法4: 查找Meta标签...');
      const metaCoords = await page.evaluate(() => {
        const geoPosition = document.querySelector('meta[name="geo.position"]');
        const icbm = document.querySelector('meta[name="ICBM"]');
        
        if (geoPosition) {
          const content = geoPosition.getAttribute('content');
          if (content) {
            const coords = content.split(',');
            if (coords.length === 2) {
              const lat = parseFloat(coords[0].trim());
              const lng = parseFloat(coords[1].trim());
              
              if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
                return {
                  lat: lat,
                  lng: lng,
                  source: 'Meta geo.position'
                };
              }
            }
          }
        }
        
        if (icbm) {
          const content = icbm.getAttribute('content');
          if (content) {
            const coords = content.split(',');
            if (coords.length === 2) {
              const lat = parseFloat(coords[0].trim());
              const lng = parseFloat(coords[1].trim());
              
              if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) {
                return {
                  lat: lat,
                  lng: lng,
                  source: 'Meta ICBM'
                };
              }
            }
          }
        }
        
        return null;
      });

      if (metaCoords) {
        result.coordinates = { lat: metaCoords.lat, lng: metaCoords.lng };
        result.coordsSource = metaCoords.source;
        console.log('从Meta标签提取坐标成功:', metaCoords);
      }
    }

    // 提取地址和会场信息 (使用Cheerio解析)
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 查找地址
    const addressSelectors = [
      '.address', '.location', '[class*="address"]', '[class*="location"]',
      'dd:contains("住所")', 'td:contains("住所")', 'dt:contains("住所")',
      '.event-info .address', '.detail-info .address'
    ];
    
    for (const selector of addressSelectors) {
      const addressEl = $(selector);
      if (addressEl.length > 0) {
        const addressText = addressEl.text().trim();
        if (addressText && addressText.length > 10) {
          result.address = addressText;
          console.log('提取地址:', addressText);
          break;
        }
      }
    }

    // 查找会场
    const venueSelectors = [
      '.venue', '.place', '[class*="venue"]', '[class*="place"]',
      'dd:contains("会場")', 'td:contains("会場")', 'dt:contains("会場")',
      '.event-info .venue', '.detail-info .venue'
    ];
    
    for (const selector of venueSelectors) {
      const venueEl = $(selector);
      if (venueEl.length > 0) {
        const venueText = venueEl.text().trim();
        if (venueText && venueText.length > 5) {
          result.venue = venueText;
          console.log('提取会场:', venueText);
          break;
        }
      }
    }

    // 如果有坐标，生成正确的地图URL格式
    if (result.coordinates) {
      // 生成正确的嵌入格式URL
      const embedUrl = `https://maps.google.com/maps?q=${result.coordinates.lat},${result.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      
      // 生成普通查看地图URL  
      const viewUrl = `https://www.google.com/maps?q=${result.coordinates.lat},${result.coordinates.lng}`;
      
      // 如果没有嵌入URL，使用正确的嵌入格式
      if (!result.mapEmbedUrl) {
        result.mapEmbedUrl = embedUrl;
      }
      
      // 如果没有Google Maps URL，使用查看格式
      if (!result.googleMapsUrl) {
        result.googleMapsUrl = viewUrl;
      }
      
      // 标准嵌入格式作为备用
      result.standardEmbedUrl = embedUrl;
    }

    // 提取调试信息
    result.extractedInfo = {
      title: $('title').text().trim(),
      h1: $('h1').first().text().trim(),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      iframeCount: $('iframe').length,
      scriptCount: $('script').length,
      mapLinksCount: $('a[href*="maps"]').length
    };

    console.log('最终结果:', result);
    return result;

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 验证是否为有效的日本坐标
function isValidJapanCoordinates(lat: number, lng: number): boolean {
  return lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146;
} 