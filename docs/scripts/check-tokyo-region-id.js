const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkTokyoRegionId() {
  console.log('🔍 检查东京都的regionId...');

  try {
    const tokyoRegion = await prisma.region.findFirst({
      where: { 
        OR: [
          { nameCn: '东京都' },
          { nameJp: { contains: '東京' } }
        ]
      }
    });

    if (tokyoRegion) {
      console.log('✅ 找到东京都region：');
      console.log('ID:', tokyoRegion.id);
      console.log('中文名:', tokyoRegion.nameCn);
      console.log('日文名:', tokyoRegion.nameJp);
      console.log('英文名:', tokyoRegion.nameEn);
    } else {
      console.log('❌ 未找到东京都region');
      
      // 列出所有region
      const allRegions = await prisma.region.findMany();
      console.log('📋 所有可用的region:');
      allRegions.forEach(region => {
        console.log(`- ${region.id}: ${region.nameCn} (${region.nameJp})`);
      });
    }
    
  } catch (error) {
    console.error('❌ 检查失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTokyoRegionId(); 