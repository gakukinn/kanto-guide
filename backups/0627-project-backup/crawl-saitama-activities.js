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
  
  // 优先级：花火 > 祭典 > 赏花 > 灯光 > 文化
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

async function extractDetailedInfo(page, activityUrl, activityName) {
  try {
    console.log(`🔍 提取详细信息: ${activityName}`);
    console.log(`🌐 访问URL: ${activityUrl}`);
    
    await page.goto(activityUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const content = await page.content();
    const root = parse(content);

    // 提取基本信息表格
    const infoTable = root.querySelector('.event-detail-info, .event-info, .detail-info, table');
    
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
      console.log('📋 找到信息表格，开始解析...');

      // 地址提取
      const addressMatch = tableText.match(/住所[：:\s]*([^\n\r]+)/i) || 
                          tableText.match(/所在地[：:\s]*([^\n\r]+)/i) ||
                          tableText.match(/開催場所[：:\s]*([^\n\r]+)/i);
      if (addressMatch) {
        extractedData.address = addressMatch[1].trim();
      }

      // 时间提取
      const timeMatch = tableText.match(/開催期間[：:\s]*([^\n\r]+)/i) ||
                       tableText.match(/開催日[：:\s]*([^\n\r]+)/i) ||
                       tableText.match(/期間[：:\s]*([^\n\r]+)/i);
      if (timeMatch) {
        extractedData.datetime = timeMatch[1].trim();
      }

      // 会场提取
      const venueMatch = tableText.match(/会場[：:\s]*([^\n\r]+)/i) ||
                        tableText.match(/場所[：:\s]*([^\n\r]+)/i);
      if (venueMatch) {
        extractedData.venue = venueMatch[1].trim();
      }

      // 交通提取
      const accessMatch = tableText.match(/アクセス[：:\s]*([^\n\r]+)/i) ||
                         tableText.match(/交通[：:\s]*([^\n\r]+)/i);
      if (accessMatch) {
        extractedData.access = accessMatch[1].trim();
      }

      // 主办方提取
      const organizerMatch = tableText.match(/主催[：:\s]*([^\n\r]+)/i) ||
                           tableText.match(/主催者[：:\s]*([^\n\r]+)/i);
      if (organizerMatch) {
        extractedData.organizer = organizerMatch[1].trim();
      }

      // 费用提取
      const priceMatch = tableText.match(/料金[：:\s]*([^\n\r]+)/i) ||
                        tableText.match(/入場料[：:\s]*([^\n\r]+)/i) ||
                        tableText.match(/参加費[：:\s]*([^\n\r]+)/i);
      if (priceMatch) {
        extractedData.price = priceMatch[1].trim();
      }

      // 联系方式提取
      const contactMatch = tableText.match(/お問い合わせ[：:\s]*([^\n\r]+)/i) ||
                          tableText.match(/連絡先[：:\s]*([^\n\r]+)/i) ||
                          tableText.match(/TEL[：:\s]*([^\n\r]+)/i);
      if (contactMatch) {
        extractedData.contact = contactMatch[1].trim();
      }

      // 官网提取
      const websiteLink = infoTable.querySelector('a[href*="http"]');
      if (websiteLink) {
        extractedData.website = websiteLink.getAttribute('href');
      }
    }

    // 获取Google Maps坐标
    try {
      const addressForSearch = extractedData.address || extractedData.venue || activityName;
      if (addressForSearch) {
        console.log(`🗺️ 搜索坐标: ${addressForSearch}`);
        
        await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(addressForSearch + ' 埼玉県')}`, 
          { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);

        const currentUrl = page.url();
        const coordMatch = currentUrl.match(/@([0-9.-]+),([0-9.-]+)/);
        
        if (coordMatch) {
          const lat = coordMatch[1];
          const lng = coordMatch[2];
          extractedData.googleMap = `https://maps.google.com/maps?ll=${lat},${lng}&z=15`;
          console.log(`✅ 获取坐标: ${lat}, ${lng}`);
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

  const browser = await chromium.launch({ headless: false });
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
    console.log(`🌐 访问: ${targetUrl}`);
    
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // 提取活动列表
    const content = await page.content();
    const root = parse(content);

    // 查找活动列表
    const activityItems = root.querySelectorAll('.event-list-item, .item, .event-item, .list-item');
    
    if (activityItems.length === 0) {
      console.error('❌ 未找到活动列表，页面结构可能有变化');
      console.log('🔍 页面标题:', root.querySelector('title')?.text || '未知');
      
      // 尝试其他选择器
      const altItems = root.querySelectorAll('a[href*="/event/"]');
      console.log(`🔍 找到 ${altItems.length} 个活动链接`);
      
      if (altItems.length === 0) {
        throw new Error('无法找到活动列表，建议检查页面结构');
      }
    }

    console.log(`📋 找到 ${activityItems.length} 个活动项目`);

    const activities = [];
    const maxActivities = Math.min(10, activityItems.length);

    // 提取前10个活动的基本信息
    for (let i = 0; i < maxActivities; i++) {
      const item = activityItems[i];
      
      // 提取活动名称
      const nameElement = item.querySelector('.title, .name, h3, h2, a') || item;
      const activityName = nameElement.text.trim();
      
      // 提取活动链接
      const linkElement = item.querySelector('a') || item.closest('a');
      let activityUrl = '';
      
      if (linkElement) {
        const href = linkElement.getAttribute('href');
        if (href) {
          activityUrl = href.startsWith('http') ? href : `https://www.jalan.net${href}`;
        }
      }

      if (activityName && activityUrl) {
        activities.push({
          name: activityName,
          url: activityUrl
        });
        
        console.log(`${i + 1}. ${activityName}`);
      }
    }

    if (activities.length === 0) {
      throw new Error('未能提取到有效的活动信息');
    }

    console.log(`\n✅ 成功提取 ${activities.length} 个活动的基本信息\n`);

    // 对每个活动提取详细信息并保存
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      
      console.log(`\n--- 处理活动 ${i + 1}/${activities.length} ---`);
      
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

      // 短暂延迟避免过快请求
      await page.waitForTimeout(1000);
    }

    console.log('\n🎉 埼玉县活动爬取完成！');

  } catch (error) {
    console.error(`\n❌ 爬取过程出现错误: ${error.message}`);
    console.log('\n🛑 暂停执行，等待优化建议...');
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 执行爬取
crawlSaitamaActivities().catch(error => {
  console.error('\n💥 程序执行失败:', error.message);
  console.log('\n📋 建议优化方案:');
  console.log('1. 检查网页结构是否有变化');
  console.log('2. 调整HTML选择器');
  console.log('3. 增加错误处理和重试机制');
  console.log('4. 验证数据库连接和表结构');
  process.exit(1);
}); 