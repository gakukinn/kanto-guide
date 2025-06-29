const { chromium } = require('playwright');
const { parse } = require('node-html-parser');
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

// 埼玉县活动分类映射
const activityTypeMapping = {
  'culture': ['文化', 'カルチャー', 'アート', '美術', '展示', '博物館', '文化財', 'ワンダーフェスティバル', '陸上', 'スポーツ', '競技', 'コンサート', '音楽', 'アニメ'],
  'matsuri': ['祭り', 'まつり', 'フェスティバル', '神社', '例大祭', '盆踊り', '夏祭り', 'こいち祭', '神社', '寺院', '祇園'],
  'hanabi': ['花火', 'hanabi', 'fireworks', '納涼花火', '花火大会'],
  'sakura': ['桜', 'さくら', '花見', '桜祭り', '春祭り'],
  'illumination': ['イルミネーション', 'ライトアップ', '灯り', '電飾', 'クリスマス']
};

function classifyActivity(name, description = '') {
  const content = (name + ' ' + description).toLowerCase();
  const priorities = { hanabi: 1, matsuri: 2, sakura: 3, illumination: 4, culture: 5 };
  let bestMatch = { category: 'culture', priority: 5 };

  Object.entries(activityTypeMapping).forEach(([category, keywords]) => {
    const matchCount = keywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    ).length;

    if (matchCount > 0 && priorities[category] < bestMatch.priority) {
      bestMatch = { category, priority: priorities[category] };
    }
  });

  return bestMatch.category;
}

async function safePageGoto(page, url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🌐 尝试访问 (${i + 1}/${retries}): ${url}`);
      
      await page.goto(url, { 
        waitUntil: 'domcontentloaded',  // 改为更宽松的条件
        timeout: 60000  // 增加到60秒
      });
      
      // 额外等待确保页面加载完成
      await page.waitForTimeout(5000);
      console.log('✅ 页面加载成功');
      return true;
      
    } catch (error) {
      console.log(`❌ 第${i + 1}次尝试失败: ${error.message}`);
      
      if (i === retries - 1) {
        throw new Error(`所有重试失败: ${error.message}`);
      }
      
      console.log('🔄 等待5秒后重试...');
      await page.waitForTimeout(5000);
    }
  }
}

async function extractDetailedInfo(page, activityUrl, activityName) {
  try {
    console.log(`🔍 提取详细信息: ${activityName}`);
    
    await safePageGoto(page, activityUrl);

    const content = await page.content();
    const root = parse(content);

    // 尝试多种表格选择器
    const possibleSelectors = [
      '.event-detail-info',
      '.event-info', 
      '.detail-info',
      '.info-table',
      'table',
      '.event-detail',
      '.detail-content'
    ];

    let infoTable = null;
    for (const selector of possibleSelectors) {
      infoTable = root.querySelector(selector);
      if (infoTable) {
        console.log(`📋 使用选择器找到信息: ${selector}`);
        break;
      }
    }
    
    let extractedData = {
      name: activityName,
      address: '',
      datetime: '',
      venue: '',
      access: '',
      organizer: '',
      price: '',
      contact: '',
      website: '',
      googleMap: ''
    };

    if (infoTable) {
      const tableText = infoTable.text;
      console.log('📋 开始解析信息表格...');

      // 使用更宽松的正则表达式
      const patterns = {
        address: [/住所[：:\s]*([^\n\r]+)/i, /所在地[：:\s]*([^\n\r]+)/i, /開催場所[：:\s]*([^\n\r]+)/i, /場所[：:\s]*([^\n\r]+)/i],
        datetime: [/開催期間[：:\s]*([^\n\r]+)/i, /開催日[：:\s]*([^\n\r]+)/i, /期間[：:\s]*([^\n\r]+)/i, /日時[：:\s]*([^\n\r]+)/i],
        venue: [/会場[：:\s]*([^\n\r]+)/i, /場所[：:\s]*([^\n\r]+)/i, /会場名[：:\s]*([^\n\r]+)/i],
        access: [/アクセス[：:\s]*([^\n\r]+)/i, /交通[：:\s]*([^\n\r]+)/i, /アクセス方法[：:\s]*([^\n\r]+)/i],
        organizer: [/主催[：:\s]*([^\n\r]+)/i, /主催者[：:\s]*([^\n\r]+)/i, /主催団体[：:\s]*([^\n\r]+)/i],
        price: [/料金[：:\s]*([^\n\r]+)/i, /入場料[：:\s]*([^\n\r]+)/i, /参加費[：:\s]*([^\n\r]+)/i, /費用[：:\s]*([^\n\r]+)/i],
        contact: [/お問い合わせ[：:\s]*([^\n\r]+)/i, /連絡先[：:\s]*([^\n\r]+)/i, /TEL[：:\s]*([^\n\r]+)/i, /電話[：:\s]*([^\n\r]+)/i]
      };

      // 提取各个字段
      Object.entries(patterns).forEach(([field, regexList]) => {
        for (const regex of regexList) {
          const match = tableText.match(regex);
          if (match && match[1]) {
            extractedData[field] = match[1].trim();
            console.log(`✅ ${field}: ${extractedData[field]}`);
            break;
          }
        }
      });

      // 提取官网链接
      const websiteLink = infoTable.querySelector('a[href*="http"]');
      if (websiteLink) {
        extractedData.website = websiteLink.getAttribute('href');
        console.log(`✅ website: ${extractedData.website}`);
      }
    } else {
      console.log('⚠️ 未找到信息表格，尝试其他方法提取...');
      
      // 尝试从页面标题和meta信息提取基本数据
      const title = root.querySelector('title')?.text;
      if (title) {
        console.log(`📋 页面标题: ${title}`);
      }
    }

    // 获取Google Maps坐标
    try {
      const addressForSearch = extractedData.address || extractedData.venue || activityName;
      if (addressForSearch) {
        console.log(`🗺️ 搜索坐标: ${addressForSearch}`);
        
        const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(addressForSearch + ' 埼玉県')}`;
        await safePageGoto(page, searchUrl);

        const currentUrl = page.url();
        const coordMatch = currentUrl.match(/@([0-9.-]+),([0-9.-]+)/);
        
        if (coordMatch) {
          const lat = coordMatch[1];
          const lng = coordMatch[2];
          extractedData.googleMap = `https://maps.google.com/maps?ll=${lat},${lng}&z=15`;
          console.log(`✅ 获取坐标: ${lat}, ${lng}`);
        } else {
          console.log('⚠️ 未能从URL提取坐标');
        }
      }
    } catch (coordError) {
      console.log(`⚠️ 坐标获取失败: ${coordError.message}`);
    }

    return extractedData;

  } catch (error) {
    console.error(`❌ 详细信息提取失败: ${error.message}`);
    return {
      name: activityName,
      address: '', datetime: '', venue: '', access: '', 
      organizer: '', price: '', contact: '', website: '', googleMap: ''
    };
  }
}

async function crawlSaitamaActivities() {
  console.log('🚀 开始爬取埼玉县活动信息...\n');

  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000
  });
  const page = await browser.newPage();

  try {
    // 获取埼玉县regionId
    const saitamaRegion = await prisma.region.findFirst({
      where: { nameJp: '埼玉県' }
    });

    if (!saitamaRegion) {
      console.error('❌ 找不到埼玉县region，请先在数据库中添加');
      return;
    }

    console.log(`📍 埼玉县 regionId: ${saitamaRegion.id}\n`);

    // 访问埼玉县活动页面
    const targetUrl = 'https://www.jalan.net/event/110000/?screenId=OUW1702';
    
    await safePageGoto(page, targetUrl);

    // 提取活动列表
    const content = await page.content();
    const root = parse(content);

    console.log('🔍 分析页面结构...');
    console.log(`📋 页面标题: ${root.querySelector('title')?.text || '未知'}`);

    // 尝试多种活动列表选择器
    const listSelectors = [
      '.event-list-item',
      '.item', 
      '.event-item',
      '.list-item',
      'a[href*="/event/"]',
      '.event-card',
      '.activity-item'
    ];

    let activityItems = [];
    let usedSelector = '';

    for (const selector of listSelectors) {
      const items = root.querySelectorAll(selector);
      if (items.length > 0) {
        activityItems = items;
        usedSelector = selector;
        console.log(`📋 使用选择器 "${selector}" 找到 ${items.length} 个项目`);
        break;
      }
    }
    
    if (activityItems.length === 0) {
      // 保存页面内容用于调试
      console.log('🔍 未找到活动列表，保存页面内容用于分析...');
      console.log('前200个字符:', content.substring(0, 200));
      throw new Error('无法找到活动列表，页面结构可能有变化');
    }

    const activities = [];
    const maxActivities = Math.min(10, activityItems.length);

    // 提取前10个活动的基本信息
    for (let i = 0; i < maxActivities; i++) {
      const item = activityItems[i];
      
      // 提取活动名称 - 尝试多种方式
      let activityName = '';
      const nameSelectors = ['.title', '.name', 'h3', 'h2', 'h1', 'a', '.event-title'];
      
      for (const selector of nameSelectors) {
        const nameElement = item.querySelector(selector);
        if (nameElement && nameElement.text.trim()) {
          activityName = nameElement.text.trim();
          break;
        }
      }
      
      if (!activityName) {
        activityName = item.text.trim().split('\n')[0]; // 使用第一行文本
      }
      
      // 提取活动链接
      const linkElement = item.querySelector('a') || item.closest('a') || item;
      let activityUrl = '';
      
      if (linkElement) {
        const href = linkElement.getAttribute('href');
        if (href) {
          activityUrl = href.startsWith('http') ? href : `https://www.jalan.net${href}`;
        }
      }

      if (activityName && activityUrl && activityUrl.includes('/event/')) {
        activities.push({
          name: activityName,
          url: activityUrl
        });
        
        console.log(`${i + 1}. ${activityName}`);
        console.log(`   URL: ${activityUrl.substring(0, 80)}...`);
      } else {
        console.log(`⚠️ 跳过项目 ${i + 1}: 缺少有效信息`);
      }
    }

    if (activities.length === 0) {
      throw new Error('未能提取到有效的活动信息');
    }

    console.log(`\n✅ 成功提取 ${activities.length} 个活动的基本信息\n`);

    // 只处理前6个活动（按用户要求）
    const processingCount = Math.min(6, activities.length);
    console.log(`📋 处理前 ${processingCount} 个活动（按用户要求）\n`);

    // 对每个活动提取详细信息并保存
    for (let i = 0; i < processingCount; i++) {
      const activity = activities[i];
      
      console.log(`\n--- 处理活动 ${i + 1}/${processingCount} ---`);
      
      // 提取详细信息
      const detailedInfo = await extractDetailedInfo(page, activity.url, activity.name);
      
      // 活动分类
      const category = classifyActivity(activity.name, '');
      console.log(`📂 活动分类: ${category}`);

      // 数据完整性检查
      const requiredFields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMap'];
      const missingFields = requiredFields.filter(field => 
        !detailedInfo[field] || detailedInfo[field].toString().trim().length === 0
      );
      
      const completeness = Math.round(((requiredFields.length - missingFields.length) / requiredFields.length) * 100);
      console.log(`📊 数据完整度: ${completeness}%`);
      
      if (missingFields.length > 0) {
        console.log(`⚠️ 缺失字段: ${missingFields.join(', ')}`);
      }

      // 保存到对应的数据表
      const tableMapping = {
        culture: 'cultureEvent',
        matsuri: 'matsuriEvent', 
        hanabi: 'hanabiEvent',
        sakura: 'sakuraEvent',
        illumination: 'illuminationEvent'
      };
      
      const tableName = tableMapping[category] || 'cultureEvent';

      try {
        // 检查是否已存在
        const existingActivity = await prisma[tableName].findFirst({
          where: { 
            name: detailedInfo.name,
            regionId: saitamaRegion.id
          }
        });

        const activityData = {
          name: detailedInfo.name,
          address: detailedInfo.address,
          datetime: detailedInfo.datetime,
          venue: detailedInfo.venue,
          access: detailedInfo.access,
          organizer: detailedInfo.organizer,
          price: detailedInfo.price,
          contact: detailedInfo.contact,
          website: detailedInfo.website,
          googleMap: detailedInfo.googleMap,
          regionId: saitamaRegion.id
        };

        if (existingActivity) {
          await prisma[tableName].update({
            where: { id: existingActivity.id },
            data: activityData
          });
          console.log(`🔄 更新已存在活动: ${detailedInfo.name}`);
        } else {
          await prisma[tableName].create({
            data: activityData
          });
          console.log(`➕ 新增活动: ${detailedInfo.name}`);
        }

        console.log(`✅ 保存到 ${tableName} 表成功`);

      } catch (saveError) {
        console.error(`❌ 保存失败: ${saveError.message}`);
      }

      // 延迟避免过快请求
      await page.waitForTimeout(2000);
    }

    console.log('\n🎉 埼玉县活动爬取完成！');

  } catch (error) {
    console.error(`\n❌ 爬取过程出现错误: ${error.message}`);
    console.log('\n🛑 暂停执行，详细错误信息：');
    console.log(error.stack);
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 执行爬取
crawlSaitamaActivities().catch(error => {
  console.error('\n💥 程序执行失败:', error.message);
  console.log('\n📋 优化建议:');
  console.log('1. 网络连接可能有问题，检查网络状态');
  console.log('2. Jalan网站可能有反爬虫机制');
  console.log('3. 页面结构可能已更新');
  console.log('4. 考虑使用代理或更换User-Agent');
  process.exit(1);
}); 