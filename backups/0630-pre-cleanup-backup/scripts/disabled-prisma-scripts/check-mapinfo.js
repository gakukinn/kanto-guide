const { PrismaClient } = require('../src/generated/prisma/client');

const prisma = new PrismaClient();

async function checkMapInfo() {
  try {
    const result = await prisma.hanamiEvent.findFirst({
      where: { name: '河口湖ハーブフェスティバル' }
    });
    
    if (result) {
      console.log('✅ 找到记录');
      console.log('ID:', result.id);
      console.log('名称:', result.name);
      console.log('mapInfo字段:', JSON.stringify(result.mapInfo, null, 2));
      console.log('tips字段:', JSON.stringify(result.tips, null, 2));
    } else {
      console.log('❌ 未找到记录');
    }
    
  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMapInfo(); 