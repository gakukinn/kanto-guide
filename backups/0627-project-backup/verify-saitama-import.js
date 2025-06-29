#!/usr/bin/env node

/**
 * 验证录入的埼玉县活动数据
 */

const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function verifySaitamaImport() {
  console.log('🔍 验证埼玉县活动数据录入情况...\n');

  try {
    // 获取埼玉地区记录
    const saitamaRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'saitama' },
          { nameCn: '埼玉' },
          { nameJp: '埼玉県' }
        ]
      }
    });

    if (!saitamaRegion) {
      console.log('❌ 未找到埼玉地区记录');
      return;
    }

    console.log(`📍 埼玉地区ID: ${saitamaRegion.id}\n`);

    // 查询各类活动
    const hanabiEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: saitamaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const matsuriEvents = await prisma.matsuriEvent.findMany({
      where: { regionId: saitamaRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const cultureEvents = await prisma.cultureEvent.findMany({
      where: { regionId: saitamaRegion.id },
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

    // 打印文化活动
    console.log(`🎭 文化活动 (CultureEvent): ${cultureEvents.length}个`);
    cultureEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 统计信息
    const totalEvents = hanabiEvents.length + matsuriEvents.length + cultureEvents.length;
    console.log(`📊 统计汇总:`);
    console.log(`花火活动: ${hanabiEvents.length} 个`);
    console.log(`祭典活动: ${matsuriEvents.length} 个`);
    console.log(`文化活动: ${cultureEvents.length} 个`);
    console.log(`总计: ${totalEvents} 个`);

    // 今日数据统计
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayHanabi = hanabiEvents.filter(e => e.createdAt >= today).length;
    const todayMatsuri = matsuriEvents.filter(e => e.createdAt >= today).length;
    const todayCulture = cultureEvents.filter(e => e.createdAt >= today).length;
    
    console.log(`\n📅 今日录入数据:`);
    console.log(`花火活动: ${todayHanabi} 个`);
    console.log(`祭典活动: ${todayMatsuri} 个`);
    console.log(`文化活动: ${todayCulture} 个`);
    console.log(`今日总计: ${todayHanabi + todayMatsuri + todayCulture} 个`);

  } catch (error) {
    console.error('❌ 验证过程发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行验证
if (require.main === module) {
  verifySaitamaImport()
    .then(() => {
      console.log('\n✅ 验证完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 验证失败:', error);
      process.exit(1);
    });
}

module.exports = { verifySaitamaImport }; 