#!/usr/bin/env node

/**
 * 验证录入的神奈川县活动数据
 */

const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function verifyKanagawaImport() {
  console.log('🔍 验证神奈川县活动数据录入情况...\n');

  try {
    // 获取神奈川地区记录
    const kanagawaRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'kanagawa' },
          { nameCn: '神奈川' },
          { nameJp: '神奈川県' }
        ]
      }
    });

    if (!kanagawaRegion) {
      console.log('❌ 未找到神奈川地区记录');
      return;
    }

    console.log(`📍 神奈川地区ID: ${kanagawaRegion.id}\n`);

    // 查询各类活动
    const hanabiEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const matsuriEvents = await prisma.matsuriEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const hanamiEvents = await prisma.hanamiEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const momijiEvents = await prisma.momijiEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const illuminationEvents = await prisma.illuminationEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const cultureEvents = await prisma.cultureEvent.findMany({
      where: { regionId: kanagawaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    // 打印花火活动
    console.log(`🎆 花火活动 (HanabiEvent): ${hanabiEvents.length}个`);
    hanabiEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 打印祭典活动
    console.log(`🏮 祭典活动 (MatsuriEvent): ${matsuriEvents.length}个`);
    matsuriEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 打印赏花活动
    console.log(`🌸 赏花活动 (HanamiEvent): ${hanamiEvents.length}个`);
    hanamiEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 打印狩枫活动
    if (momijiEvents.length > 0) {
      console.log(`🍁 狩枫活动 (MomijiEvent): ${momijiEvents.length}个`);
      momijiEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.name}`);
        console.log(`   开催期间: ${event.datetime}`);
        console.log(`   开催场所: ${event.venue}`);
        console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
        console.log(`   录入时间: ${event.createdAt}`);
        console.log('');
      });
    }

    // 打印灯光活动
    if (illuminationEvents.length > 0) {
      console.log(`💡 灯光活动 (IlluminationEvent): ${illuminationEvents.length}个`);
      illuminationEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.name}`);
        console.log(`   开催期间: ${event.datetime}`);
        console.log(`   开催场所: ${event.venue}`);
        console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
        console.log(`   录入时间: ${event.createdAt}`);
        console.log('');
      });
    }

    // 打印文化活动
    if (cultureEvents.length > 0) {
      console.log(`🎭 文化活动 (CultureEvent): ${cultureEvents.length}个`);
      cultureEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.name}`);
        console.log(`   开催期间: ${event.datetime}`);
        console.log(`   开催场所: ${event.venue}`);
        console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
        console.log(`   录入时间: ${event.createdAt}`);
        console.log('');
      });
    }

    // 统计信息
    const totalEvents = hanabiEvents.length + matsuriEvents.length + hanamiEvents.length + 
                       momijiEvents.length + illuminationEvents.length + cultureEvents.length;
    console.log(`📊 统计汇总:`);
    console.log(`花火活动: ${hanabiEvents.length} 个`);
    console.log(`祭典活动: ${matsuriEvents.length} 个`);
    console.log(`赏花活动: ${hanamiEvents.length} 个`);
    console.log(`狩枫活动: ${momijiEvents.length} 个`);
    console.log(`灯光活动: ${illuminationEvents.length} 个`);
    console.log(`文化活动: ${cultureEvents.length} 个`);
    console.log(`总计: ${totalEvents} 个`);

    // 今日数据统计
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayHanabi = hanabiEvents.filter(e => e.createdAt >= today).length;
    const todayMatsuri = matsuriEvents.filter(e => e.createdAt >= today).length;
    const todayHanami = hanamiEvents.filter(e => e.createdAt >= today).length;
    const todayMomiji = momijiEvents.filter(e => e.createdAt >= today).length;
    const todayIllumination = illuminationEvents.filter(e => e.createdAt >= today).length;
    const todayCulture = cultureEvents.filter(e => e.createdAt >= today).length;
    
    console.log(`\n📅 今日录入数据:`);
    console.log(`花火活动: ${todayHanabi} 个`);
    console.log(`祭典活动: ${todayMatsuri} 个`);
    console.log(`赏花活动: ${todayHanami} 个`);
    console.log(`狩枫活动: ${todayMomiji} 个`);
    console.log(`灯光活动: ${todayIllumination} 个`);
    console.log(`文化活动: ${todayCulture} 个`);
    console.log(`今日总计: ${todayHanabi + todayMatsuri + todayHanami + todayMomiji + todayIllumination + todayCulture} 个`);

  } catch (error) {
    console.error('❌ 验证过程发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行验证
if (require.main === module) {
  verifyKanagawaImport()
    .then(() => {
      console.log('\n✅ 验证完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 验证失败:', error);
      process.exit(1);
    });
}

module.exports = { verifyKanagawaImport }; 