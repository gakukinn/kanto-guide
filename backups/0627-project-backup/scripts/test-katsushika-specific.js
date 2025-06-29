import { PrismaClient } from '../src/generated/prisma/index.js';
import { chromium } from 'playwright';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

// 专门测试葛飾納涼花火大会的提取功能
async function testKatsushikaHanabi() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  
  try {
    console.log('🚀 开始测试从东京都活动列表提取葛飾納涼花火大会信息...');
    
    // 访问您提供的东京都活动列表页面
    const listUrl = 'https://www.jalan.net/event/130000/?screenId=OUW1025';
    console.log(`📋 访问活动列表: ${listUrl}`);
    
    await page.goto(listUrl, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    await page.waitForTimeout(5000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 查找所有活动链接
    console.log('🔍 正在查找所有活动链接...');
    
    const allLinks = [];
    
    // 多种选择器尝试提取链接
    const selectors = [
      'a[href*="/event/"]',
      'a[href*="evt_"]',
      '.event-item a',
      '.item a',
      'h3 a',
      'h2 a',
      'dt a',
      '.title a'
    ];
    
    for (const selector of selectors) {
      $(selector).each((i, link) => {
        let href = $(link).attr('href');
        let text = $(link).text().trim();
        
        if (href && text) {
          // 处理相对链接
          if (href.startsWith('/')) {
            href = 'https://www.jalan.net' + href;
          }
          
          // 确保是活动链接
          if (href.includes('/event/') && text.length > 0) {
            allLinks.push({
              url: href,
              title: text,
              selector: selector
            });
          }
        }
      });
    }
    
    // 去重
    const uniqueLinks = [];
    const seenUrls = new Set();
    
    for (const link of allLinks) {
      if (!seenUrls.has(link.url)) {
        seenUrls.add(link.url);
        uniqueLinks.push(link);
      }
    }
    
    console.log(`✅ 找到 ${uniqueLinks.length} 个唯一活动链接`);
    
    // 显示所有找到的活动
    console.log('\n📋 活动列表:');
    uniqueLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link.title}`);
      console.log(`   URL: ${link.url}`);
      console.log(`   选择器: ${link.selector}`);
      
      // 检查是否包含花火关键词
      if (link.title.includes('花火') || link.title.includes('ハナビ') || link.title.includes('hanabi')) {
        console.log(`   🎆 这是花火活动！`);
      }
      
      // 检查是否是葛飾相关
      if (link.title.includes('葛飾') || link.title.includes('かつしか') || link.title.includes('katsushika')) {
        console.log(`   🏮 这是葛飾相关活动！`);
      }
      
      console.log('');
    });
    
    // 查找葛飾納涼花火大会
    const katsushikaHanabi = uniqueLinks.find(link => 
      (link.title.includes('葛飾') || link.title.includes('かつしか')) && 
      (link.title.includes('花火') || link.title.includes('納涼'))
    );
    
    if (katsushikaHanabi) {
      console.log('🎉 找到葛飾納涼花火大会!');
      console.log(`活动名称: ${katsushikaHanabi.title}`);
      console.log(`活动链接: ${katsushikaHanabi.url}`);
      
      // 尝试访问这个链接提取详细信息
      console.log('\n🔍 正在提取详细信息...');
      
      await page.goto(katsushikaHanabi.url, { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });
      await page.waitForTimeout(3000);
      
      const detailContent = await page.content();
      const $detail = cheerio.load(detailContent);
      
      const activityInfo = {
        name: katsushikaHanabi.title,
        date: '',
        venue: '',
        address: '',
        access: '',
        latitude: null,
        longitude: null,
        organizer: '',
        price: '',
        contact: '',
        website: katsushikaHanabi.url
      };
      
      // 提取基本信息
      activityInfo.name = $detail('h1').first().text().trim() || 
                          $detail('title').text().split(' | ')[0].trim() ||
                          katsushikaHanabi.title;
      
      // dt/dd结构提取
      $detail('dt').each((i, dt) => {
        const label = $detail(dt).text().trim();
        const value = $detail(dt).next('dd').text().trim();
        
        if (label.includes('開催期間') || label.includes('日時') || label.includes('期間')) {
          activityInfo.date = activityInfo.date || value;
        } else if (label.includes('会場') || label.includes('場所') || label.includes('開催地')) {
          activityInfo.venue = activityInfo.venue || value;
        } else if (label.includes('住所') || label.includes('所在地')) {
          activityInfo.address = activityInfo.address || value;
        } else if (label.includes('アクセス') || label.includes('交通')) {
          activityInfo.access = activityInfo.access || value;
        } else if (label.includes('主催') || label.includes('運営')) {
          activityInfo.organizer = activityInfo.organizer || value;
        } else if (label.includes('料金') || label.includes('入場料')) {
          activityInfo.price = activityInfo.price || value;
        } else if (label.includes('連絡先') || label.includes('問合せ')) {
          activityInfo.contact = activityInfo.contact || value;
        }
      });
      
      // 坐标提取
      const mapLinks = $detail('a[href*="maps.google"]');
      mapLinks.each((i, link) => {
        const href = $detail(link).attr('href');
        if (href) {
          const patterns = [
            /maps\?.*ll=([0-9.-]+),([0-9.-]+)/,
            /@([0-9.-]+),([0-9.-]+)/,
            /q=([0-9.-]+),([0-9.-]+)/
          ];
          
          for (const pattern of patterns) {
            const match = href.match(pattern);
            if (match) {
              activityInfo.latitude = parseFloat(match[1]);
              activityInfo.longitude = parseFloat(match[2]);
              break;
            }
          }
        }
      });
      
      // 显示提取结果
      console.log('\n📋 葛飾納涼花火大会详细信息:');
      console.log(`名称: ${activityInfo.name}`);
      console.log(`时间: ${activityInfo.date}`);
      console.log(`会场: ${activityInfo.venue}`);
      console.log(`地址: ${activityInfo.address}`);
      console.log(`交通: ${activityInfo.access}`);
      console.log(`坐标: ${activityInfo.latitude}, ${activityInfo.longitude}`);
      console.log(`主办: ${activityInfo.organizer}`);
      console.log(`费用: ${activityInfo.price}`);
      console.log(`联系: ${activityInfo.contact}`);
      
      // 保存到数据库
      try {
        // 确保地区存在
        let regionRecord = await prisma.region.findUnique({
          where: { code: 'tokyo' }
        });
        
        if (!regionRecord) {
          regionRecord = await prisma.region.create({
            data: {
              code: 'tokyo',
              nameCn: '东京都',
              nameJp: '東京都'
            }
          });
        }
        
        const googleMap = activityInfo.latitude && activityInfo.longitude 
          ? `https://maps.google.com/maps?ll=${activityInfo.latitude},${activityInfo.longitude}` 
          : '';
        
        const savedActivity = await prisma.hanabiEvent.create({
          data: {
            name: activityInfo.name,
            datetime: activityInfo.date,
            venue: activityInfo.venue,
            address: activityInfo.address,
            access: activityInfo.access,
            organizer: activityInfo.organizer,
            price: activityInfo.price || '无料',
            contact: activityInfo.contact,
            website: activityInfo.website,
            googleMap: googleMap,
            region: 'tokyo',
            regionId: regionRecord.id,
            verified: true
          }
        });
        
        console.log('\n✅ 葛飾納涼花火大会已成功保存到数据库!');
        console.log(`数据库ID: ${savedActivity.id}`);
        
      } catch (dbError) {
        console.error('❌ 保存到数据库失败:', dbError.message);
      }
      
    } else {
      console.log('❌ 没有找到葛飾納涼花火大会');
      
      // 显示所有包含花火的活动
      const hanabiEvents = uniqueLinks.filter(link => 
        link.title.includes('花火') || 
        link.title.includes('ハナビ') || 
        link.title.includes('hanabi')
      );
      
      if (hanabiEvents.length > 0) {
        console.log('\n🎆 找到的其他花火活动:');
        hanabiEvents.forEach((event, index) => {
          console.log(`${index + 1}. ${event.title}`);
          console.log(`   ${event.url}`);
        });
      }
    }
    
  } catch (error) {
    console.error(`❌ 测试失败: ${error.message}`);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 运行测试
if (process.argv.length > 1 && process.argv[1].includes('test-katsushika-specific.js')) {
  console.log('葛飾納涼花火大会专项测试启动...');
  
  testKatsushikaHanabi()
    .then(() => {
      console.log('🎯 测试完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 测试失败:', error);
      process.exit(1);
    });
}

export { testKatsushikaHanabi }; 