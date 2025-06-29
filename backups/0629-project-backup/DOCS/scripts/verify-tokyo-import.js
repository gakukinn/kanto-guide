#!/usr/bin/env node

/**
 * 验证录入的东京活动数据
 */

const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function verifyTokyoImport() {
  console.log('🔍 验证东京活动数据录入情况...\n');

  try {
    // 获取东京地区记录
    const tokyoRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'tokyo' },
          { nameCn: '东京' },
          { nameJp: '東京都' }
        ]
      }
    });

    if (!tokyoRegion) {
      console.log('❌ 未找到东京地区记录');
      return;
    }

    console.log(`📍 东京地区ID: ${tokyoRegion.id}\n`);

    // 查询各类活动
    const hanabiEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const matsuriEvents = await prisma.matsuriEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    const cultureEvents = await prisma.cultureEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { createdAt: 'desc' }
    });

    // 打印花火活动
    console.log('🎆 花火活动 (HanabiEvent):');
    console.log('=' * 80);
    hanabiEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 打印祭典活动
    console.log('\n🏮 祭典活动 (MatsuriEvent):');
    console.log('=' * 80);
    matsuriEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 打印文化活动（只显示最新的几个）
    console.log('\n🎭 文化活动 (CultureEvent) - 最新5个:');
    console.log('=' * 80);
    cultureEvents.slice(0, 5).forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   开催期间: ${event.datetime}`);
      console.log(`   开催场所: ${event.venue}`);
      console.log(`   验证状态: ${event.verified ? '✅ 已验证' : '❌ 未验证'}`);
      console.log(`   录入时间: ${event.createdAt}`);
      console.log('');
    });

    // 统计信息
    console.log('\n📊 统计汇总:');
    console.log('=' * 50);
    console.log(`花火活动: ${hanabiEvents.length} 个`);
    console.log(`祭典活动: ${matsuriEvents.length} 个`);
    console.log(`文化活动: ${cultureEvents.length} 个`);
    console.log(`总计: ${hanabiEvents.length + matsuriEvents.length + cultureEvents.length} 个`);
    console.log('=' * 50);

    // 检查今天录入的数据
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayHanabi = hanabiEvents.filter(e => new Date(e.createdAt) >= today).length;
    const todayMatsuri = matsuriEvents.filter(e => new Date(e.createdAt) >= today).length;
    const todayCulture = cultureEvents.filter(e => new Date(e.createdAt) >= today).length;

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

verifyTokyoImport()
  .then(() => {
    console.log('\n✅ 验证完成！');
  })
  .catch((error) => {
    console.error('\n❌ 验证失败:', error);
  }); 