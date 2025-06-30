const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixClassification() {
  console.log('🔧 修正活动分类...');
  
  try {
    // 获取刚才错误分类的活动
    const wrongEvent = await prisma.cultureEvent.findFirst({
      where: { name: '第28回新橋こいち祭' }
    });
    
    if (wrongEvent) {
      console.log('📝 找到错误分类的活动:', wrongEvent.name);
      
      // 移动到正确的祭典表
      const newEvent = await prisma.matsuriEvent.create({
        data: {
          name: wrongEvent.name,
          address: wrongEvent.address,
          datetime: wrongEvent.datetime,
          venue: wrongEvent.venue,
          access: wrongEvent.access,
          organizer: wrongEvent.organizer,
          price: wrongEvent.price,
          contact: wrongEvent.contact,
          website: wrongEvent.website,
          googleMap: wrongEvent.googleMap,
          region: wrongEvent.region,
          regionId: wrongEvent.regionId,
          verified: wrongEvent.verified
        }
      });
      
      console.log('✅ 新的祭典活动ID:', newEvent.id);
      
      // 删除错误分类的记录
      await prisma.cultureEvent.delete({
        where: { id: wrongEvent.id }
      });
      
      console.log('✅ 活动已重新分类为祭典活动');
    } else {
      console.log('⚠️ 未找到需要修正的活动');
    }
    
  } catch (error) {
    console.error('❌ 修正过程出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixClassification(); 