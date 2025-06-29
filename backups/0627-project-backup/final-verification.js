const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function finalVerification() {
  try {
    console.log('🔍 最终验证东京都活动数据完整性...\n');
    
    // 获取东京都regionId
    const tokyoRegion = await prisma.region.findFirst({
      where: { nameJp: '東京都' }
    });
    
    if (!tokyoRegion) {
      console.error('❌ 找不到东京都region');
      return;
    }
    
    console.log(`📍 东京都 regionId: ${tokyoRegion.id}\n`);
    
    // 统计所有活动
    const cultureCount = await prisma.cultureEvent.count({
      where: { regionId: tokyoRegion.id }
    });
    
    const matsuriCount = await prisma.matsuriEvent.count({
      where: { regionId: tokyoRegion.id }
    });
    
    const hanabiCount = await prisma.hanabiEvent.count({
      where: { regionId: tokyoRegion.id }
    });
    
    const totalCount = cultureCount + matsuriCount + hanabiCount;
    
    console.log('📊 活动数量统计:');
    console.log(`   文化活动: ${cultureCount} 个`);
    console.log(`   祭典活动: ${matsuriCount} 个`);
    console.log(`   花火活动: ${hanabiCount} 个`);
    console.log(`   总计: ${totalCount} 个\n`);
    
    // 验证每个活动的信息完整度
    console.log('🔍 验证各活动信息完整度:\n');
    
    // 检查文化活动
    console.log('📚 文化活动:');
    const cultureEvents = await prisma.cultureEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { name: 'asc' }
    });
    
    cultureEvents.forEach((event, index) => {
      const completeness = checkCompleteness(event);
      console.log(`   ${index + 1}. ${event.name}`);
      console.log(`      完整度: ${completeness.percentage}% (${completeness.complete}/${completeness.total})`);
      if (completeness.missing.length > 0) {
        console.log(`      缺失: ${completeness.missing.join(', ')}`);
      }
    });
    
    // 检查祭典活动
    console.log('\n🎭 祭典活动:');
    const matsuriEvents = await prisma.matsuriEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { name: 'asc' }
    });
    
    matsuriEvents.forEach((event, index) => {
      const completeness = checkCompleteness(event);
      console.log(`   ${index + 1}. ${event.name}`);
      console.log(`      完整度: ${completeness.percentage}% (${completeness.complete}/${completeness.total})`);
      if (completeness.missing.length > 0) {
        console.log(`      缺失: ${completeness.missing.join(', ')}`);
      }
    });
    
    // 检查花火活动
    console.log('\n🎆 花火活动:');
    const hanabiEvents = await prisma.hanabiEvent.findMany({
      where: { regionId: tokyoRegion.id },
      orderBy: { name: 'asc' }
    });
    
    hanabiEvents.forEach((event, index) => {
      const completeness = checkCompleteness(event);
      console.log(`   ${index + 1}. ${event.name}`);
      console.log(`      完整度: ${completeness.percentage}% (${completeness.complete}/${completeness.total})`);
      if (completeness.missing.length > 0) {
        console.log(`      缺失: ${completeness.missing.join(', ')}`);
      }
    });
    
    // 总体统计
    const allEvents = [...cultureEvents, ...matsuriEvents, ...hanabiEvents];
    const overallStats = calculateOverallStats(allEvents);
    
    console.log('\n📈 总体统计:');
    console.log(`   完全完整的活动: ${overallStats.fullyComplete} 个`);
    console.log(`   部分缺失的活动: ${overallStats.partiallyIncomplete} 个`);
    console.log(`   严重缺失的活动: ${overallStats.severelyIncomplete} 个`);
    console.log(`   平均完整度: ${overallStats.averageCompleteness}%`);
    
    // 最终结论
    console.log('\n🎯 最终结论:');
    if (totalCount === 10) {
      console.log('✅ 活动数量正确：正好10个活动');
    } else {
      console.log(`❌ 活动数量错误：${totalCount}个活动（要求10个）`);
    }
    
    if (overallStats.averageCompleteness >= 90) {
      console.log('✅ 信息完整度优秀：平均完整度超过90%');
    } else if (overallStats.averageCompleteness >= 70) {
      console.log('⚠️ 信息完整度良好：平均完整度超过70%');
    } else {
      console.log('❌ 信息完整度不足：需要进一步完善');
    }
    
    if (overallStats.fullyComplete === totalCount) {
      console.log('🎉 所有活动信息完整！任务圆满完成！');
    } else {
      console.log(`🔧 还有 ${totalCount - overallStats.fullyComplete} 个活动需要完善信息`);
    }
    
  } catch (error) {
    console.error('❌ 验证过程中发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function checkCompleteness(event) {
  const requiredFields = ['name', 'address', 'datetime', 'venue', 'access', 'organizer', 'price', 'contact', 'website', 'googleMap'];
  const missing = [];
  let complete = 0;
  
  requiredFields.forEach(field => {
    if (event[field] && event[field].trim() !== '') {
      complete++;
    } else {
      missing.push(field);
    }
  });
  
  const percentage = Math.round((complete / requiredFields.length) * 100);
  
  return {
    total: requiredFields.length,
    complete,
    missing,
    percentage
  };
}

function calculateOverallStats(events) {
  let fullyComplete = 0;
  let partiallyIncomplete = 0;
  let severelyIncomplete = 0;
  let totalCompleteness = 0;
  
  events.forEach(event => {
    const completeness = checkCompleteness(event);
    totalCompleteness += completeness.percentage;
    
    if (completeness.percentage === 100) {
      fullyComplete++;
    } else if (completeness.percentage >= 70) {
      partiallyIncomplete++;
    } else {
      severelyIncomplete++;
    }
  });
  
  const averageCompleteness = events.length > 0 ? Math.round(totalCompleteness / events.length) : 0;
  
  return {
    fullyComplete,
    partiallyIncomplete,
    severelyIncomplete,
    averageCompleteness
  };
}

// 运行最终验证
finalVerification().catch(console.error); 