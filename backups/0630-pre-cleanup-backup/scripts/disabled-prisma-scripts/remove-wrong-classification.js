const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function removeWrongClassification() {
  console.log('🔧 删除错误分类的活动...');
  
  try {
    // 删除デザインフェスタ vol.61（不是传统祭典）
    const deleted = await prisma.matsuriEvent.deleteMany({
      where: { 
        name: { 
          contains: 'デザインフェスタ' 
        } 
      }
    });
    
    console.log(`✅ 已删除デザインフェスタ，删除数量: ${deleted.count}`);
    
    // 检查剩余活动
    const remaining = await prisma.matsuriEvent.findMany({
      select: { name: true }
    });
    
    console.log('\n📋 剩余祭典活动:');
    remaining.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
    });
    
  } catch (error) {
    console.error('❌ 删除过程出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeWrongClassification(); 