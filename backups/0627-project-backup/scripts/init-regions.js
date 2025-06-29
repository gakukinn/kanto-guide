const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function initRegions() {
  console.log('🌍 初始化地区数据...');

  const regions = [
    {
      code: 'tokyo',
      nameCn: '东京都',
      nameJp: '東京都'
    },
    {
      code: 'saitama', 
      nameCn: '埼玉县',
      nameJp: '埼玉県'
    },
    {
      code: 'chiba',
      nameCn: '千叶县', 
      nameJp: '千葉県'
    },
    {
      code: 'kanagawa',
      nameCn: '神奈川县',
      nameJp: '神奈川県'
    },
    {
      code: 'kitakanto',
      nameCn: '北关东',
      nameJp: '北関東'
    },
    {
      code: 'koshinetsu',
      nameCn: '甲信越',
      nameJp: '甲信越'
    }
  ];

  try {
    // 先清空现有数据
    await prisma.region.deleteMany();
    console.log('🗑️ 清空现有地区数据');

    // 插入新数据
    for (const region of regions) {
      const created = await prisma.region.create({
        data: region
      });
      console.log(`✅ 创建地区: ${created.nameCn} (${created.code})`);
    }

    console.log('\n🎉 地区数据初始化完成！');
    
    // 验证数据
    const count = await prisma.region.count();
    console.log(`📊 总共创建了 ${count} 个地区`);

  } catch (error) {
    console.error('❌ 初始化失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行初始化
initRegions(); 