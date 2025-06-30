const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function verifyManualData() {
  try {
    console.log('🔍 验证手动录入的数据...\n');
    
    const event = await prisma.hanamiEvent.findFirst({
      where: { name: '熊谷うちわ祭' }
    });
    
    if (!event) {
      console.log('❌ 未找到记录');
      return;
    }
    
    console.log('✅ 找到记录:');
    console.log('ID:', event.id);
    console.log('名称:', event.name);
    console.log('地址:', event.address);
    console.log('时间:', event.datetime);
    console.log('场地:', event.venue);
    console.log('交通:', event.access);
    console.log('主办方:', event.organizer);
    console.log('价格:', event.price);
    console.log('联系方式:', event.contact);
    console.log('网站:', event.website);
    console.log('谷歌地图:', event.googleMap);
    console.log('地区:', event.region);
    console.log('已验证:', event.verified);
    console.log('创建时间:', event.createdAt);
    console.log('更新时间:', event.updatedAt);
    
  } catch (error) {
    console.error('验证失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyManualData(); 