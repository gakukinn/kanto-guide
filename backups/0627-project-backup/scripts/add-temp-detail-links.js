const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

function generateSlug(name) {
  // 移除日文括号部分，只保留中文名称
  const cleanName = name.split('（')[0];
  // 生成简单的slug
  return cleanName.replace(/[^\u4e00-\u9fa5\w]/g, '-').toLowerCase();
}

async function addTempDetailLinks() {
  console.log('🔧 为缺少detailLink的活动添加临时链接...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalAdded = 0;
  
  for (const region of regions) {
    console.log(`📍 处理 ${region.toUpperCase()} 地区...`);
    
    // 查找没有detailLink的活动
    const events = await prisma.hanabiEvent.findMany({
      where: { 
        region: region,
        detailLink: null
      }
    });
    
    console.log(`   找到 ${events.length} 个缺少链接的活动`);
    
    for (const event of events) {
      // 生成临时的detailLink
      const slug = generateSlug(event.name);
      const tempDetailLink = `/${region}/hanabi/temp-${event.id.slice(-8)}`;
      
      try {
        await prisma.hanabiEvent.update({
          where: { id: event.id },
          data: { detailLink: tempDetailLink }
        });
        
        console.log(`   ✅ ${event.name}`);
        console.log(`      → ${tempDetailLink}`);
        totalAdded++;
      } catch (error) {
        console.log(`   ❌ 更新失败: ${event.name} - ${error.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log(`🎉 完成！总共添加了 ${totalAdded} 个临时链接`);
  console.log('💡 现在三层页面的"查看详情"按钮应该都能显示了');
  console.log('📝 接下来使用页面生成器创建实际的四层页面');
  
  await prisma.$disconnect();
}

addTempDetailLinks().catch(console.error); 