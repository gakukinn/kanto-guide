const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function importTokyoActivity1() {
  console.log('🏃‍♂️ 开始录入东京都第一个活动：第109回日本陸上競技選手権大会');

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
    const existing = await prisma.matsuriEvent.findFirst({
      where: { 
        name: '第109回日本陸上競技選手権大会',
        regionId: tokyoRegion.id 
      }
    });

    if (existing) {
      console.log('⚠️ 活动已存在，跳过录入');
      return;
    }

    // 手动提取的Google Maps坐标（从页面地图获取）
    const latitude = 35.677872;
    const longitude = 139.71476;

    // 创建祭典活动记录
    const activityData = {
      name: '第109回日本陸上競技選手権大会',
      address: '東京都新宿区霞ヶ丘町10-1',
      datetime: '2025年7月4日～6日',
      venue: '国立競技場',
      access: '地下鉄都営大江戸線「国立競技場駅」A2番出口から徒歩1分、またはＪＲ総武線「千駄ケ谷駅」もしくは「信濃町駅」から徒歩5分、または地下鉄銀座線「外苑前駅」3番出口から徒歩9分',
      organizer: '公益財団法人日本陸上競技連盟',
      price: '詳細は大会公式ホームページでご確認ください',
      contact: '公益財団法人日本陸上競技連盟事務局 050-1746-8410 （10:00～18:00※土日祝を除く）',
      website: 'https://www.jaaf.or.jp/jch/109/',
      googleMap: 'https://maps.google.com/maps?ll=35.677872,139.71476&z=15&t=m',
      region: '东京都',
      regionId: tokyoRegion.id
    };

    await prisma.matsuriEvent.create({ data: activityData });

    console.log('✅ 成功录入东京都活动：第109回日本陸上競技選手権大会');
    console.log(`📍 坐标：${latitude}, ${longitude}`);
    console.log('🏃‍♂️ 分类：体育赛事 -> 录入祭典表');

  } catch (error) {
    console.error('❌ 录入失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importTokyoActivity1(); 