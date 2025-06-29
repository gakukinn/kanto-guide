const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkTokyoCount() {
  console.log('🔍 检查东京都当前活动数量...');

  try {
    // 获取东京都地区
    const tokyoRegion = await prisma.region.findFirst({
      where: { 
        OR: [
          { nameCn: '东京都' },
          { nameJp: '東京都' },
          { code: 'tokyo' }
        ]
      }
    });

    if (!tokyoRegion) {
      console.log('❌ 未找到东京都地区');
      return;
    }

    console.log(`📍 找到东京都地区：${tokyoRegion.nameCn} (${tokyoRegion.code})`);

    // 统计各类活动数量
    const matsuriCount = await prisma.matsuriEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const hanabiCount = await prisma.hanabiEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const hanamiCount = await prisma.hanamiEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const momijiCount = await prisma.momijiEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const illuminationCount = await prisma.illuminationEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const cultureCount = await prisma.cultureEvent.count({
      where: { regionId: tokyoRegion.id }
    });

    const total = matsuriCount + hanabiCount + hanamiCount + momijiCount + illuminationCount + cultureCount;

    console.log('\n📊 东京都活动统计:');
    console.log(`🎭 祭典活动: ${matsuriCount}个`);
    console.log(`🎆 花火活动: ${hanabiCount}个`);
    console.log(`🌸 赏花活动: ${hanamiCount}个`);
    console.log(`🍁 狩枫活动: ${momijiCount}个`);
    console.log(`💡 灯光活动: ${illuminationCount}个`);
    console.log(`🎨 文艺活动: ${cultureCount}个`);
    console.log(`📈 总计: ${total}个`);
    console.log(`🎯 目标: 10个，还需补充: ${Math.max(0, 10 - total)}个`);

    // 查看具体的活动名称和地址
    console.log('\n📝 当前东京都活动详情:');
    
    if (matsuriCount > 0) {
      const matsuriEvents = await prisma.matsuriEvent.findMany({
        where: { regionId: tokyoRegion.id },
        select: { name: true, address: true }
      });
      console.log('🎭 祭典活动:');
      matsuriEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.name}`);
        console.log(`     地址: ${event.address}`);
      });
    }

    if (cultureCount > 0) {
      const cultureEvents = await prisma.cultureEvent.findMany({
        where: { regionId: tokyoRegion.id },
        select: { name: true, address: true }
      });
      console.log('🎨 文艺活动:');
      cultureEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.name}`);
        console.log(`     地址: ${event.address}`);
      });
    }

  } catch (error) {
    console.error('❌ 检查失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTokyoCount(); 