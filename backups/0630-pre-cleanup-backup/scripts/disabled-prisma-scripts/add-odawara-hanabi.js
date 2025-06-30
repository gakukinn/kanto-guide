const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function addOdawaraHanabi() {
  try {
    // 首先确保神奈川地区存在
    let kanagawaRegion = await prisma.region.findUnique({
      where: { code: 'kanagawa' }
    });

    if (!kanagawaRegion) {
      console.log('创建神奈川地区...');
      kanagawaRegion = await prisma.region.create({
        data: {
          code: 'kanagawa',
          nameJa: '神奈川県',
          nameCn: '神奈川县',
          nameEn: 'Kanagawa Prefecture'
        }
      });
      console.log('神奈川地区创建成功:', kanagawaRegion.id);
    } else {
      console.log('神奈川地区已存在:', kanagawaRegion.id);
    }

    // 检查小田原花火大会是否已存在
    const existingEvent = await prisma.hanabiEvent.findUnique({
      where: { eventId: 'odawara-sakawa-hanabi-2025' }
    });

    const eventData = {
      eventId: 'odawara-sakawa-hanabi-2025',
      name: '第36回 小田原酒匂川花火大会',
      englishName: '36th Odawara Sakawa River Fireworks Festival',
      japaneseName: '第36回 小田原酒匂川花火大会',
      year: 2025,
      month: 8,
      date: '2025年8月2日',
      displayDate: '2025年8月2日(土)',
      time: '19:10-20:00',
      duration: '50分钟',
      fireworksCount: '约1万发',
      expectedVisitors: '约25万人',
      weather: '小雨决行(荒天时中止)',
      ticketPrice: '有料席 3500日元起(全7种类型)',
      status: '预定举行',
      location: '酒匂川スポーツ広場',
      venues: {
        mainVenue: {
          name: '酒匂川スポーツ広場',
          address: '神奈川県小田原市',
          googleMapsUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00865/map.html'
        }
      },
      access: {
        train: [
          'JR鴨宮駅南口から徒歩15分',
          'JR・小田急小田原駅から城東車庫行きバスで今井停留所下車、徒歩5分'
        ],
        parking: '駐車場なし'
      },
      tips: {
        foodStalls: 'キッチンカー6台程度',
        paidSeats: '有料席あり（3500円～全7タイプ販売）',
        weather: '小雨決行(荒天時は中止)'
      },
      contact: {
        phone: '0465-20-4192',
        organization: '(一社)小田原市観光協会'
      },
      mapInfo: {
        googleMapsUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00865/map.html',
        venue: '酒匂川スポーツ広場',
        coordinates: {
          note: '需要从Google Maps获取具体坐标'
        }
      },
      walkerPlusUrl: 'https://hanabi.walkerplus.com/detail/ar0314e00865/',
      verified: true,
      verificationDate: new Date(),
      likes: 0,
      featured: false,
      detailLink: '/kanagawa/hanabi/odawara-sakawa-hanabi-2025',
      tags: ['花火大会', '神奈川県', '小田原市', '酒匂川', '夏祭り'],
      regionId: kanagawaRegion.id
    };

    let hanabiEvent;
    if (existingEvent) {
      console.log('活动已存在，更新数据...');
      hanabiEvent = await prisma.hanabiEvent.update({
        where: { eventId: 'odawara-sakawa-hanabi-2025' },
        data: eventData
      });
      console.log('✅ 小田原酒匂川花火大会数据更新成功!');
    } else {
      console.log('创建新活动...');
      hanabiEvent = await prisma.hanabiEvent.create({
        data: eventData
      });
      console.log('✅ 小田原酒匂川花火大会数据创建成功!');
    }

    console.log('活动ID:', hanabiEvent.id);
    console.log('活动名称:', hanabiEvent.name);
    console.log('详情链接:', hanabiEvent.detailLink);
    console.log('WalkerPlus URL:', hanabiEvent.walkerPlusUrl);

    return hanabiEvent;

  } catch (error) {
    console.error('❌ 数据录入失败:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 执行函数
addOdawaraHanabi()
  .then(() => {
    console.log('🎆 数据录入完成!');
  })
  .catch((error) => {
    console.error('💥 执行失败:', error);
    process.exit(1);
  }); 