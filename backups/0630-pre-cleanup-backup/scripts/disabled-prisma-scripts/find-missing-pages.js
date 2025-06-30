const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function findMissingPages() {
  console.log('🔍 查找缺少四层页面的花火活动...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalMissing = 0;
  const missingActivities = [];
  
  for (const region of regions) {
    console.log(`📍 ${region.toUpperCase()} 地区:`);
    
    const events = await prisma.hanabiEvent.findMany({
      where: { region },
      select: { id: true, name: true, detailLink: true }
    });
    
    const missingInRegion = events.filter(event => !event.detailLink);
    
    console.log(`   总活动: ${events.length}`);
    console.log(`   有页面: ${events.length - missingInRegion.length}`);
    console.log(`   缺少页面: ${missingInRegion.length}`);
    
    if (missingInRegion.length > 0) {
      console.log('   缺少页面的活动:');
      missingInRegion.forEach(event => {
        console.log(`     - ${event.name}`);
        missingActivities.push({
          id: event.id,
          name: event.name,
          region: region
        });
      });
    }
    
    totalMissing += missingInRegion.length;
    console.log('');
  }
  
  console.log(`🎯 总结: 需要创建 ${totalMissing} 个四层页面`);
  
  await prisma.$disconnect();
  return missingActivities;
}

findMissingPages().catch(console.error); 