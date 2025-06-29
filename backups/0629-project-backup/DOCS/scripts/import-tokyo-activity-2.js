const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function importTokyoActivity2() {
  console.log('🎨 开始录入东京都第二个活动：デザインフェスタ vol.61');

  try {
    // 获取东京都地区
    let tokyoRegion = await prisma.region.findFirst({
      where: { 
        OR: [
          { nameCn: '东京都' },
          { nameJp: '東京都' },
          { code: 'tokyo' }
        ]
      }
    });

    if (!tokyoRegion) {
      tokyoRegion = await prisma.region.create({
        data: { 
          code: 'tokyo',
          nameCn: '东京都',
          nameJp: '東京都'
        }
      });
    }

    // 检查是否已存在
    const existing = await prisma.cultureEvent.findFirst({
      where: { 
        name: 'デザインフェスタ vol.61',
        regionId: tokyoRegion.id 
      }
    });

    if (existing) {
      console.log('⚠️ 活动已存在，跳过录入');
      return;
    }

    // 手动提取的Google Maps坐标（从页面地图获取）
    const latitude = 35.630307;
    const longitude = 139.793534;

    // 创建文艺活动记录
    const activityData = {
      name: 'デザインフェスタ vol.61',
      address: '東京都江東区有明3-11-1',
      datetime: '2025年7月5日～6日 両日10:00～18:00',
      venue: '東京ビッグサイト 西・南展示棟',
      access: 'ゆりかもめ「東京ビッグサイト駅」から徒歩3分、またはりんかい線「国際展示場駅」から徒歩7分',
      organizer: 'デザインフェスタ有限会社',
      price: '前売券/1日券800円・両日券1500円（両日券はネット販売のみ）、当日券/1日券1000円（両日券は取り扱いなし）',
      contact: 'デザインフェスタオフィス 03-3479-1433 info@designfesta.com',
      website: 'https://designfesta.com/',
      googleMap: 'https://maps.google.com/maps?ll=35.630307,139.793534&z=15&t=m',
      region: '东京都',
      regionId: tokyoRegion.id
    };

    await prisma.cultureEvent.create({ data: activityData });

    console.log('✅ 成功录入东京都活动：デザインフェスタ vol.61');
    console.log(`📍 坐标：${latitude}, ${longitude}`);
    console.log('🎨 分类：艺术展览 -> 录入文艺活动表');

  } catch (error) {
    console.error('❌ 录入失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importTokyoActivity2(); 