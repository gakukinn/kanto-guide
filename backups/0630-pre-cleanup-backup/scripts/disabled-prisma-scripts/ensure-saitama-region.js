const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

/**
 * 确保埼玉县地区记录存在于数据库中
 */
async function ensureSaitamaRegion() {
  try {
    console.log('🔍 检查埼玉县地区记录...');
    
    // 检查是否已存在埼玉県记录
    const existingRegion = await prisma.region.findUnique({
      where: { code: 'saitama' }
    });
    
    if (existingRegion) {
      console.log('✅ 埼玉県地区记录已存在');
      console.log(`   ID: ${existingRegion.id}`);
      console.log(`   中文名: ${existingRegion.nameCn}`);
      console.log(`   日文名: ${existingRegion.nameJp}`);
    } else {
      console.log('➕ 创建埼玉县地区记录...');
      
      const newRegion = await prisma.region.create({
        data: {
          code: 'saitama',
          nameCn: '埼玉县',
          nameJp: '埼玉県'
        }
      });
      
      console.log('✅ 埼玉县地区记录创建成功');
      console.log(`   ID: ${newRegion.id}`);
      console.log(`   中文名: ${newRegion.nameCn}`);
      console.log(`   日文名: ${newRegion.nameJp}`);
    }
    
  } catch (error) {
    console.error(`❌ 处理埼玉县地区记录失败: ${error.message}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  ensureSaitamaRegion().catch(console.error);
}

module.exports = { ensureSaitamaRegion }; 