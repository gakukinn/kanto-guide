const { chromium } = require('playwright');
const { PrismaClient } = require('./src/generated/prisma');

async function extractCorrectLocation() {
  let browser;
  const prisma = new PrismaClient();
  
  try {
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ 
      headless: false,
      timeout: 60000 // 增加浏览器启动超时
    });
    
    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    // 设置页面超时
    page.setDefaultTimeout(60000);

    console.log('📄 访问jalan.net页面...');
    
    // 分步骤加载，增加稳定性
    try {
      await page.goto('https://www.jalan.net/event/evt_343925/?screenId=OUW1702', { 
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      
      console.log('⏱️ 等待页面完全加载...');
      await page.waitForTimeout(5000);
      
      // 尝试等待网络完全空闲
      try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch (e) {
        console.log('⚠️ 网络等待超时，继续处理...');
      }
      
    } catch (error) {
      console.log('⚠️ 页面加载遇到问题，尝试继续处理...');
      console.log('错误详情:', error.message);
    }

    console.log('🗺️ 开始提取地图坐标...');
    const locationData = await page.evaluate(() => {
      const data = {};
      console.log('页面标题:', document.title);
      
      // 1. 查找Google Maps iframe
      console.log('查找Google Maps iframe...');
      const iframes = document.querySelectorAll('iframe');
      console.log('找到iframe数量:', iframes.length);
      
      iframes.forEach((iframe, index) => {
        const src = iframe.src || iframe.getAttribute('src');
        console.log(`iframe ${index}:`, src);
        
        if (src && (src.includes('google.com/maps') || src.includes('maps.google'))) {
          console.log('✅ 找到Google Maps iframe:', src);
          
          // 从Google Maps URL中提取坐标
          // 格式1: !3d35.1234567!4d139.7654321
          const coordMatch = src.match(/!3d([\d.-]+)!4d([\d.-]+)/);
          if (coordMatch) {
            data.latitude = parseFloat(coordMatch[1]);
            data.longitude = parseFloat(coordMatch[2]);
            console.log('从iframe提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // 格式2: @35.1234567,139.7654321
          const atMatch = src.match(/@([\d.-]+),([\d.-]+)/);
          if (atMatch) {
            data.latitude = parseFloat(atMatch[1]);
            data.longitude = parseFloat(atMatch[2]);
            console.log('从@格式提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // 格式3: ll=35.1234567,139.7654321
          const llMatch = src.match(/ll=([\d.-]+),([\d.-]+)/);
          if (llMatch) {
            data.latitude = parseFloat(llMatch[1]);
            data.longitude = parseFloat(llMatch[2]);
            console.log('从ll参数提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // 格式4: q=35.1234567,139.7654321
          const qMatch = src.match(/q=([\d.-]+),([\d.-]+)/);
          if (qMatch) {
            data.latitude = parseFloat(qMatch[1]);
            data.longitude = parseFloat(qMatch[2]);
            console.log('从q参数提取坐标:', data.latitude, data.longitude);
            return;
          }
        }
      });
      
      // 2. 查找JavaScript中的坐标
      console.log('查找JavaScript中的坐标...');
      const scripts = document.querySelectorAll('script');
      console.log('找到script标签数量:', scripts.length);
      
      scripts.forEach((script, index) => {
        const content = script.textContent || '';
        
        if (content.includes('lat') || content.includes('lng') || content.includes('LatLng') || content.includes('google.maps')) {
          console.log(`Script ${index} 包含地图相关内容`);
          
          // Google Maps LatLng格式
          const latLngMatch = content.match(/new\s+google\.maps\.LatLng\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/);
          if (latLngMatch && !data.latitude) {
            data.latitude = parseFloat(latLngMatch[1]);
            data.longitude = parseFloat(latLngMatch[2]);
            console.log('从LatLng构造函数提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // 对象格式 {lat: 35.123, lng: 139.456}
          const objMatch = content.match(/\{\s*lat\s*:\s*([\d.-]+)\s*,\s*lng\s*:\s*([\d.-]+)\s*\}/);
          if (objMatch && !data.latitude) {
            data.latitude = parseFloat(objMatch[1]);
            data.longitude = parseFloat(objMatch[2]);
            console.log('从对象格式提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // 普通格式 lat: 35.123, lng: 139.456
          const normalMatch = content.match(/lat\s*:\s*([\d.-]+).*?lng\s*:\s*([\d.-]+)/);
          if (normalMatch && !data.latitude) {
            data.latitude = parseFloat(normalMatch[1]);
            data.longitude = parseFloat(normalMatch[2]);
            console.log('从普通格式提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // center格式
          const centerMatch = content.match(/center\s*:\s*\[\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\]/);
          if (centerMatch && !data.latitude) {
            data.latitude = parseFloat(centerMatch[1]);
            data.longitude = parseFloat(centerMatch[2]);
            console.log('从center数组提取坐标:', data.latitude, data.longitude);
            return;
          }
        }
      });
      
      // 3. 查找地图链接
      console.log('查找地图链接...');
      const mapLinks = document.querySelectorAll('a[href*="google.com/maps"], a[href*="maps.google"]');
      console.log('找到地图链接数量:', mapLinks.length);
      
      mapLinks.forEach((link, index) => {
        const href = link.href;
        console.log(`地图链接 ${index}:`, href);
        
        if (href && !data.latitude) {
          // @格式
          const atMatch = href.match(/@([\d.-]+),([\d.-]+)/);
          if (atMatch) {
            data.latitude = parseFloat(atMatch[1]);
            data.longitude = parseFloat(atMatch[2]);
            console.log('从链接@格式提取坐标:', data.latitude, data.longitude);
            return;
          }
          
          // q格式
          const qMatch = href.match(/q=([\d.-]+),([\d.-]+)/);
          if (qMatch) {
            data.latitude = parseFloat(qMatch[1]);
            data.longitude = parseFloat(qMatch[2]);
            console.log('从链接q格式提取坐标:', data.latitude, data.longitude);
            return;
          }
        }
      });
      
      return data;
    });

    console.log('\n📍 提取结果:');
    console.log('当前数据库坐标: 35.248, 139.688');
    console.log('jalan.net页面坐标:', locationData.latitude, locationData.longitude);
    
    if (locationData.latitude && locationData.longitude) {
      console.log('\n🔄 更新数据库中的位置信息...');
      
      const updatedEvent = await prisma.hanabiEvent.update({
        where: { id: 'cmc66rwgl0001vl5wjardlbtt' },
        data: {
          mapInfo: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            zoom: 15,
            address: '神奈川県横須賀市久里浜',
            landmarks: ['ペリー公園', '久里浜駅', '京急久里浜駅']
          }
        }
      });
      
      console.log('✅ 数据库已更新');
      console.log('新坐标:', locationData.latitude, locationData.longitude);
      console.log('谷歌地图链接:', `https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`);
      
      return {
        success: true,
        oldCoords: [35.248, 139.688],
        newCoords: [locationData.latitude, locationData.longitude]
      };
    } else {
      console.log('❌ 未能从页面提取坐标');
      return { success: false, message: '未能提取坐标' };
    }
    
  } catch (error) {
    console.error('❌ 操作失败:', error);
    return { success: false, error: error.message };
  } finally {
    if (browser) {
      await browser.close();
    }
    await prisma.$disconnect();
  }
}

extractCorrectLocation().then(result => {
  console.log('\n🎯 最终结果:', result);
}); 