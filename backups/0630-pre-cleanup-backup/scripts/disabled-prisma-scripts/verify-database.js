const { PrismaClient } = require('../src/generated/prisma/client');

console.log('🚀 开始数据库验证...');

const prisma = new PrismaClient();

async function verifyDatabase() {
  try {
    console.log('🔍 查询河口湖ハーブフェスティバル记录...');
    
    const result = await prisma.hanamiEvent.findFirst({
      where: { name: '河口湖ハーブフェスティバル' }
    });
    
    console.log('📊 查询结果:', result ? '找到记录' : '未找到记录');
    
    if (result) {
      console.log('✅ 数据库记录存在！');
      console.log('📋 记录详情:');
      console.log('ID:', result.id);
      console.log('名称:', result.name);
      console.log('日期:', result.season);
      console.log('地点:', result.location);
      console.log('联系信息:', JSON.stringify(result.contact, null, 2));
      console.log('提示信息:', JSON.stringify(result.tips, null, 2));
      console.log('地区ID:', result.regionId);
      console.log('创建时间:', result.createdAt);
      console.log('更新时间:', result.updatedAt);
    } else {
      console.log('❌ 数据库中未找到该记录');
    }
    
  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    console.log('🔚 关闭数据库连接...');
    await prisma.$disconnect();
    console.log('✅ 验证完成！');
  }
}

console.log('📝 调用验证函数...');
verifyDatabase().catch(console.error); 