const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkDatabaseData() {
  try {
    console.log('🔍 检查数据库数据状况...\n');

    // 检查地区数据
    const regions = await prisma.region.findMany();
    console.log(`📍 地区数据: ${regions.length} 个地区`);
    regions.forEach(region => {
      console.log(`   - ${region.code}: ${region.nameCn} (${region.nameEn})`);
    });

    // 检查东京花火数据
    const tokyoRegion = await prisma.region.findFirst({
      where: { code: 'tokyo' }
    });

    if (tokyoRegion) {
      const tokyoHanabiEvents = await prisma.hanabiEvent.findMany({
        where: { regionId: tokyoRegion.id }
      });

      console.log(`\n🎆 东京花火数据: ${tokyoHanabiEvents.length} 个活动`);
      tokyoHanabiEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.name} (${event.eventId})`);
        console.log(`      日期: ${event.date}`);
        console.log(`      地点: ${event.location}`);
        console.log(`      详情链接: ${event.detailLink || '未设置'}`);
        console.log('');
      });

      // 检查重复数据
      const duplicateEventIds = await prisma.hanabiEvent.groupBy({
        by: ['eventId'],
        where: { regionId: tokyoRegion.id },
        having: {
          eventId: {
            _count: {
              gt: 1
            }
          }
        }
      });

      if (duplicateEventIds.length > 0) {
        console.log(`⚠️  发现重复的eventId: ${duplicateEventIds.length} 个`);
        duplicateEventIds.forEach(dup => {
          console.log(`   - ${dup.eventId}`);
        });
      } else {
        console.log('✅ 没有发现重复的eventId');
      }

      // 检查缺少详情页面的活动
      const eventsWithoutDetailLink = tokyoHanabiEvents.filter(event => !event.detailLink);
      if (eventsWithoutDetailLink.length > 0) {
        console.log(`\n⚠️  缺少详情链接的活动: ${eventsWithoutDetailLink.length} 个`);
        eventsWithoutDetailLink.forEach(event => {
          console.log(`   - ${event.name} (${event.eventId})`);
        });
      }

    } else {
      console.log('\n❌ 未找到东京地区数据');
    }

    // 检查所有花火数据
    const allHanabiEvents = await prisma.hanabiEvent.findMany({
      include: {
        region: true
      }
    });

    console.log(`\n🎆 总花火数据: ${allHanabiEvents.length} 个活动`);
    const eventsByRegion = allHanabiEvents.reduce((acc, event) => {
      const regionCode = event.region.code;
      acc[regionCode] = (acc[regionCode] || 0) + 1;
      return acc;
    }, {});

    Object.entries(eventsByRegion).forEach(([regionCode, count]) => {
      console.log(`   - ${regionCode}: ${count} 个活动`);
    });

  } catch (error) {
    console.error('❌ 检查数据库时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseData(); 