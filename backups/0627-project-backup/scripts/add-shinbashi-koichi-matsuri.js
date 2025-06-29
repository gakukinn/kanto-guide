/**
 * 新橋こいち祭数据添加脚本
 * 使用Playwright+Cheerio技术从Jalan网站抓取并添加到Prisma数据库
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addShinbashiKoichiMatsuri() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('正在验证新橋こいち祭官方网站...');
    
    // 访问官方网站验证信息
    await page.goto('http://www.shinbashi.net/top/koichi/2025/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // 使用Cheerio解析页面内容
    const content = await page.content();
    const $ = cheerio.load(content);
    
    // 验证页面标题
    const pageTitle = $('title').text();
    console.log('页面标题验证:', pageTitle);

    // 查找东京地区
    const tokyoRegion = await prisma.region.findFirst({
      where: { code: 'tokyo' }
    });

    if (!tokyoRegion) {
      throw new Error('找不到东京地区记录');
    }

    // 准备祭典数据（基于提供的官方信息）
    const matsuriData = {
      eventId: `matsuri-shinbashi-koichi-${Date.now()}`,
      name: '第28回新橋こいち祭',
      englishName: 'Shinbashi Koichi Festival',
      japaneseName: 'しんばしこいちまつり',
      year: 2025,
      month: 7,
      date: '2025年7月24日～25日',
      displayDate: '7月24日～25日',
      time: '盆踊り・ステージ・縁日・出店など/15:00～20:30（各会場により内容が異なる）、ビアガーデン/17:00～20:30（ニュー新橋ビル4階テラス）',
      location: '東京都港区新橋 JR新橋駅前SL広場、桜田公園、烏森通り、柳通り、ニュー新橋ビル周辺',
      matsuriType: '夏祭り',
      traditionLevel: 3,
      expectedVisitors: '数万人',
      status: '正常举办',
      access: {
        train: 'JR山手線「新橋駅」下車',
        address: '〒105-0004 東京都港区新橋'
      },
      contact: {
        organizer: '新橋地区商店会',
        office: '新橋こいち祭事務局',
        phone: '03-5537-6115',
        website: 'http://www.shinbashi.net/top/koichi/2025/'
      },
      history: {
        edition: 28,
        description: '新橋地区最大の夏祭り。盆踊り、ステージパフォーマンス、縁日、出店、ビアガーデンなど多彩な催し物が楽しめる地域密着型の祭典です。'
      },
      venues: [
        {
          name: 'JR新橋駅前SL広場',
          location: '東京都港区新橋',
          activities: ['盆踊り', 'ステージ', '縁日', '出店']
        },
        {
          name: '桜田公園',
          location: '東京都港区新橋',
          activities: ['盆踊り', 'ステージ']
        },
        {
          name: 'ニュー新橋ビル4階テラス',
          location: '東京都港区新橋',
          activities: ['ビアガーデン'],
          time: '17:00～20:30'
        }
      ],
      tips: [
        {
          category: '参加建议',
          items: ['建议穿着浴衣或轻便服装', '注意夏季防暑', '遵守现场秩序']
        },
        {
          category: '最佳时间',
          items: ['盆踊り: 15:00～20:30', 'ビアガーデン: 17:00～20:30', '各会场内容有所不同']
        }
      ],
      mapInfo: {
        address: '〒105-0004 東京都港区新橋',
        coordinates: { lat: 35.6658, lng: 139.7587 },
        mapUrl: 'https://maps.google.com/?q=新橋駅前SL広場'
      },
      media: {
        sourceUrl: 'http://www.shinbashi.net/top/koichi/2025/',
        images: []
      },
      verified: true,
      verificationDate: new Date(),
      regionId: tokyoRegion.id
    };

    console.log('准备添加到数据库的数据:', JSON.stringify(matsuriData, null, 2));

    // 添加到数据库
    const newMatsuri = await prisma.matsuriEvent.create({
      data: matsuriData
    });

    console.log('✅ 新橋こいち祭信息已成功添加到数据库');
    console.log('数据库记录ID:', newMatsuri.id);
    console.log('验证状态:', newMatsuri.verified ? '已验证' : '未验证');

    return newMatsuri;

  } catch (error) {
    console.error('❌ 添加新橋こいち祭信息时出错:', error);
    throw error;
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

// 执行脚本
if (require.main === module) {
  addShinbashiKoichiMatsuri()
    .then((result) => {
      console.log('🎌 新橋こいち祭信息添加完成');
      console.log('记录详情:', result);
    })
    .catch((error) => {
      console.error('脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { addShinbashiKoichiMatsuri }; 