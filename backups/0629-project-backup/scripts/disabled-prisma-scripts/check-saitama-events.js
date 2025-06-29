const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkSaitamaEvents() {
  const events = await prisma.hanabiEvent.findMany({
    where: { region: 'saitama' },
    select: { id: true, name: true, detailLink: true }
  });
  
  console.log('埼玉地区的花火活动:');
  events.forEach(event => {
    console.log(`ID: ${event.id}`);
    console.log(`名称: ${event.name}`);
    console.log(`链接: ${event.detailLink}`);
    console.log('---');
  });
  
  await prisma.$disconnect();
}

checkSaitamaEvents().catch(console.error); 