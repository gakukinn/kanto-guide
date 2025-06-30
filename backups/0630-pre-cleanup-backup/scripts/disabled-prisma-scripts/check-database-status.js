const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkDatabaseStatus() {
  try {
    console.log('🔍 正在检查数据库状态...\n');

    // 测试数据库连接
    await prisma.$connect();
    console.log('✅ 数据库连接成功\n');

    // 检查地区数据
    console.log('📍 检查地区数据:');
    const regions = await prisma.region.findMany({
      orderBy: { code: 'asc' }
    });
    
    console.log(`- 地区总数: ${regions.length}`);
    regions.forEach(region => {
      console.log(`  • ${region.nameCn} (${region.code})`);
    });

    // 检查各种活动数据
    console.log('\n🎆 检查活动数据:');
    
    const hanabiCount = await prisma.hanabiEvent.count();
    console.log(`- 花火活动: ${hanabiCount}个`);
    if (hanabiCount > 0) {
      const hanabiEvents = await prisma.hanabiEvent.findMany({
        include: { regionRef: true },
        take: 3
      });
      hanabiEvents.forEach(event => {
        console.log(`  • ${event.name} (${event.regionRef.nameCn})`);
      });
    }

    const matsuriCount = await prisma.matsuriEvent.count();
    console.log(`- 祭典活动: ${matsuriCount}个`);
    if (matsuriCount > 0) {
      const matsuriEvents = await prisma.matsuriEvent.findMany({
        include: { regionRef: true },
        take: 3
      });
      matsuriEvents.forEach(event => {
        console.log(`  • ${event.name} (${event.regionRef.nameCn})`);
      });
    }

    const hanamiCount = await prisma.hanamiEvent.count();
    console.log(`- 花见活动: ${hanamiCount}个`);
    if (hanamiCount > 0) {
      const hanamiEvents = await prisma.hanamiEvent.findMany({
        include: { regionRef: true },
        take: 3
      });
      hanamiEvents.forEach(event => {
        console.log(`  • ${event.name} (${event.regionRef.nameCn})`);
      });
    }

    const momijiCount = await prisma.momijiEvent.count();
    console.log(`- 红叶活动: ${momijiCount}个`);

    const illuminationCount = await prisma.illuminationEvent.count();
    console.log(`- 灯光活动: ${illuminationCount}个`);

    const cultureCount = await prisma.cultureEvent.count();
    console.log(`- 文艺活动: ${cultureCount}个`);

    // 统计总数
    const totalEvents = hanabiCount + matsuriCount + hanamiCount + momijiCount + illuminationCount + cultureCount;
    console.log(`\n📊 活动总数: ${totalEvents}个`);

    // 按地区统计
    console.log('\n🗺️ 按地区统计:');
    for (const region of regions) {
      const regionStats = await Promise.all([
        prisma.hanabiEvent.count({ where: { regionId: region.id } }),
        prisma.matsuriEvent.count({ where: { regionId: region.id } }),
        prisma.hanamiEvent.count({ where: { regionId: region.id } }),
        prisma.momijiEvent.count({ where: { regionId: region.id } }),
        prisma.illuminationEvent.count({ where: { regionId: region.id } }),
        prisma.cultureEvent.count({ where: { regionId: region.id } })
      ]);
      
      const [hanabi, matsuri, hanami, momiji, illumination, culture] = regionStats;
      const total = hanabi + matsuri + hanami + momiji + illumination + culture;
      
      if (total > 0) {
        console.log(`  ${region.nameCn}: 花火${hanabi} 祭典${matsuri} 花见${hanami} 红叶${momiji} 灯光${illumination} 文艺${culture} (总计${total})`);
      }
    }

    if (totalEvents === 0) {
      console.log('\n🚨 需要立即执行: 录入示例活动数据');
    } else {
      console.log('\n🎉 数据库状态良好！');
    }

  } catch (error) {
    console.error('❌ 数据库检查失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行检查
checkDatabaseStatus(); 