const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkDetailLinks() {
  console.log('🔍 检查数据库中的detailLink字段...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  
  for (const region of regions) {
    console.log(`📍 ${region.toUpperCase()} 地区:`);
    const events = await prisma.hanabiEvent.findMany({
      where: { region },
      select: { id: true, name: true, detailLink: true }
    });
    
    events.forEach(event => {
      const status = event.detailLink ? '✅' : '❌';
      console.log(`   ${status} ${event.name}`);
      if (event.detailLink) {
        console.log(`      → ${event.detailLink}`);
      }
    });
    console.log('');
  }
  
  await prisma.$disconnect();
}

checkDetailLinks().catch(console.error); 