const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixDetailLinksToIdFormat() {
  console.log('🔧 修正detailLink为正确的ID格式...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalFixed = 0;
  
  for (const region of regions) {
    console.log(`📍 处理 ${region.toUpperCase()} 地区...`);
    
    // 获取该地区的所有活动
    const events = await prisma.hanabiEvent.findMany({
      where: { region: region }
    });
    
    console.log(`   找到 ${events.length} 个活动`);
    
    for (const event of events) {
      // 正确的detailLink格式应该是：/${region}/hanabi/${id}/
      const correctDetailLink = `/${region}/hanabi/${event.id}/`;
      
      try {
        await prisma.hanabiEvent.update({
          where: { id: event.id },
          data: { detailLink: correctDetailLink }
        });
        
        console.log(`   ✅ ${event.name}`);
        console.log(`      → ${correctDetailLink}`);
        totalFixed++;
      } catch (error) {
        console.log(`   ❌ 更新失败: ${event.name} - ${error.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log(`🎉 完成！总共修正了 ${totalFixed} 个链接为正确的ID格式`);
  console.log('💡 现在detailLink格式为：/${region}/hanabi/${id}/');
  
  await prisma.$disconnect();
}

fixDetailLinksToIdFormat().catch(console.error); 