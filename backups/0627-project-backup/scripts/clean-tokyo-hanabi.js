const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function cleanTokyoHanabiData() {
  try {
    console.log('🧹 开始清理东京花火数据...\n');

    // 获取东京地区
    const tokyoRegion = await prisma.region.findFirst({
      where: { code: 'tokyo' }
    });

    if (!tokyoRegion) {
      console.log('❌ 未找到东京地区数据');
      return;
    }

    // 获取所有东京花火数据
    const tokyoHanabiEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { createdAt: 'asc' }
    });

    console.log(`📊 当前东京花火数据: ${tokyoHanabiEvents.length} 个活动\n`);

    // 1. 处理重复的隅田川花火大会
    const sumidaEvents = tokyoHanabiEvents.filter(event => 
      event.name.includes('隅田川') || event.eventId.includes('sumida')
    );

    if (sumidaEvents.length > 1) {
      console.log('🔍 发现重复的隅田川花火大会:');
      sumidaEvents.forEach(event => {
        console.log(`   - ${event.name} (${event.eventId}) - ${event.detailLink || '无链接'}`);
      });

      // 保留有详情链接的版本，删除没有链接的版本
      const eventToKeep = sumidaEvents.find(event => event.detailLink);
      const eventsToDelete = sumidaEvents.filter(event => !event.detailLink);

      if (eventToKeep && eventsToDelete.length > 0) {
        console.log(`\n✅ 保留: ${eventToKeep.name} (${eventToKeep.eventId})`);
        console.log(`❌ 删除: ${eventsToDelete.map(e => e.eventId).join(', ')}`);

        for (const event of eventsToDelete) {
          await prisma.hanabiEvent.delete({
            where: { id: event.id }
          });
          console.log(`   已删除: ${event.name}`);
        }
      }
    }

    // 2. 为缺少详情链接的活动设置链接
    const eventsWithoutLinks = tokyoHanabiEvents.filter(event => 
      !event.detailLink && !event.name.includes('隅田川')
    );

    console.log(`\n🔗 设置详情链接 (${eventsWithoutLinks.length} 个活动):`);

    for (const event of eventsWithoutLinks) {
      const detailLink = `/tokyo/hanabi/${event.eventId}`;
      
      await prisma.hanabiEvent.update({
        where: { id: event.id },
        data: { detailLink: detailLink }
      });

      console.log(`   ✅ ${event.name} → ${detailLink}`);
    }

    // 3. 检查详情页面文件是否存在
    console.log('\n📁 检查详情页面文件:');
    const fs = require('fs');
    const path = require('path');
    
    const updatedEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: tokyoRegion.id }
    });

    for (const event of updatedEvents) {
      if (event.detailLink) {
        const pagePath = path.join(process.cwd(), 'app', event.detailLink, 'page.tsx');
        const exists = fs.existsSync(pagePath);
        console.log(`   ${exists ? '✅' : '❌'} ${event.eventId} - ${pagePath}`);
      }
    }

    // 4. 最终统计
    const finalEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: tokyoRegion.id }
    });

    console.log(`\n📊 清理后统计:`);
    console.log(`   - 总活动数: ${finalEvents.length}`);
    console.log(`   - 有详情链接: ${finalEvents.filter(e => e.detailLink).length}`);
    console.log(`   - 缺少链接: ${finalEvents.filter(e => !e.detailLink).length}`);

    console.log('\n🎉 东京花火数据清理完成!');

  } catch (error) {
    console.error('❌ 清理数据时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanTokyoHanabiData(); 