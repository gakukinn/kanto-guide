const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function fixSaitamaLink() {
  await prisma.hanabiEvent.update({
    where: { id: 'cmc6i2q6v0001vlb8gi98ti64' },
    data: { detailLink: '/saitama/hanabi/cmc6i2q6v0001vlb8gi98ti64' }
  });
  console.log('✅ 修复埼玉花火链接');
  await prisma.$disconnect();
}

fixSaitamaLink().catch(console.error); 