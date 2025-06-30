const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function createRegions() {
  console.log('🗺️ 创建地区数据...');
  
  const regions = [
    {
      code: 'tokyo',
      nameJa: '東京都',
      nameCn: '东京都',
      nameEn: 'Tokyo'
    },
    {
      code: 'kanagawa',
      nameJa: '神奈川県',
      nameCn: '神奈川县',
      nameEn: 'Kanagawa'
    },
    {
      code: 'saitama',
      nameJa: '埼玉県',
      nameCn: '埼玉县',
      nameEn: 'Saitama'
    },
    {
      code: 'chiba',
      nameJa: '千葉県',
      nameCn: '千叶县',
      nameEn: 'Chiba'
    },
    {
      code: 'kitakanto',
      nameJa: '北関東',
      nameCn: '北关东',
      nameEn: 'North Kanto'
    },
    {
      code: 'koshinetsu',
      nameJa: '甲信越',
      nameCn: '甲信越',
      nameEn: 'Koshinetsu'
    }
  ];
  
  for (const region of regions) {
    try {
      const existing = await prisma.region.findFirst({
        where: { code: region.code }
      });
      
      if (existing) {
        console.log(`✅ 地区已存在: ${region.nameJa} (${region.code})`);
      } else {
        const created = await prisma.region.create({
          data: region
        });
        console.log(`✅ 创建地区: ${created.nameJa} (${created.code})`);
      }
    } catch (error) {
      console.error(`❌ 创建地区失败: ${region.nameJa}`, error.message);
    }
  }
  
  console.log('🎉 地区数据创建完成!');
}

createRegions()
  .then(() => {
    console.log('✅ 脚本执行成功');
  })
  .catch((error) => {
    console.error('❌ 脚本执行失败:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  }); 