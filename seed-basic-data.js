import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始录入基础数据...');

  // 创建6个地区
  const regions = [
    { code: 'tokyo', nameJa: '東京', nameCn: '东京', nameEn: 'Tokyo' },
    { code: 'saitama', nameJa: '埼玉', nameCn: '埼玉', nameEn: 'Saitama' },
    { code: 'chiba', nameJa: '千葉', nameCn: '千叶', nameEn: 'Chiba' },
    { code: 'kanagawa', nameJa: '神奈川', nameCn: '神奈川', nameEn: 'Kanagawa' },
    { code: 'kitakanto', nameJa: '北関東', nameCn: '北关东', nameEn: 'Kita-Kanto' },
    { code: 'koshinetsu', nameJa: '甲信越', nameCn: '甲信越', nameEn: 'Koshinetsu' }
  ];

  for (const region of regions) {
    const existingRegion = await prisma.region.findUnique({
      where: { code: region.code }
    });

    if (!existingRegion) {
      await prisma.region.create({
        data: region
      });
      console.log(`✅ 创建地区: ${region.nameCn}`);
    } else {
      console.log(`⚠️ 地区已存在: ${region.nameCn}`);
    }
  }

  // 为每个地区创建一个示例花火活动
  const tokyoRegion = await prisma.region.findUnique({ where: { code: 'tokyo' } });
  
  if (tokyoRegion) {
    const existingEvent = await prisma.hanabiEvent.findUnique({
      where: { eventId: 'tokyo-sumida-hanabi-2025' }
    });

    if (!existingEvent) {
      await prisma.hanabiEvent.create({
        data: {
          eventId: 'tokyo-sumida-hanabi-2025',
          name: '隅田川花火大会',
          englishName: 'Sumida River Fireworks Festival',
          japaneseName: '隅田川花火大会',
          year: 2025,
          month: 7,
          date: '2025年7月26日',
          displayDate: '7月26日(土)',
          time: '19:00-20:30',
          duration: '90分钟',
          fireworksCount: '约20,000发',
          expectedVisitors: '约95万人',
          location: '隅田川沿岸',
          regionId: tokyoRegion.id,
          verified: true,
          featured: true,
          venues: [
            {
              name: '第一会场',
              location: '桜橋下流～言問橋上流',
              fireworks: '约9,350发'
            },
            {
              name: '第二会场', 
              location: '駒形橋下流～厩橋上流',
              fireworks: '约10,650发'
            }
          ],
          access: [
            {
              station: '浅草駅',
              lines: ['東京メトロ銀座線', '都営浅草線', '東武スカイツリーライン'],
              walkTime: '徒歩5分'
            }
          ],
          contact: {
            organizer: '隅田川花火大会実行委員会',
            phone: '03-5608-1111'
          },
          walkerPlusUrl: 'https://www.walkerplus.com/event/ar0313e12345/',
          detailLink: '/tokyo/hanabi/sumida-hanabi-2025'
        }
      });
      console.log('✅ 创建示例花火活动: 隅田川花火大会');
    }
  }

  console.log('🎉 基础数据录入完成！');
}

main()
  .catch((e) => {
    console.error('❌ 数据录入失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 