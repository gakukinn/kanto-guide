const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkRegions() {
  try {
    console.log('📍 检查数据库中的地区记录...\n');
    
    const regions = await prisma.region.findMany();
    
    if (regions.length === 0) {
      console.log('❌ 数据库中没有任何地区记录');
      return;
    }
    
    console.log(`✅ 找到 ${regions.length} 个地区记录:\n`);
    
    regions.forEach((region, index) => {
      console.log(`${index + 1}. ID: ${region.id}`);
      console.log(`   nameCn: ${region.nameCn || '未设置'}`);
      console.log(`   nameJp: ${region.nameJp || '未设置'}`);
      console.log(`   code: ${region.code || '未设置'}`);
      console.log('');
    });
    
    // 特别检查埼玉县记录
    const saitamaRegions = await prisma.region.findMany({
      where: {
        OR: [
          { nameCn: { contains: 'saitama' } },
          { nameJp: { contains: '埼玉' } },
          { code: { contains: 'saitama' } }
        ]
      }
    });
    
    if (saitamaRegions.length > 0) {
      console.log('🎯 找到埼玉相关记录:');
      saitamaRegions.forEach(region => {
        console.log(`   ID: ${region.id}, nameCn: ${region.nameCn}, nameJp: ${region.nameJp}`);
      });
    } else {
      console.log('⚠️ 未找到埼玉县相关记录');
    }
    
  } catch (error) {
    console.error('❌ 检查地区记录失败:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkRegions(); 