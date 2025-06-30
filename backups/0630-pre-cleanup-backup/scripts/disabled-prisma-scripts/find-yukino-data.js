const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function findYukinoData() {
  try {
    console.log('查找雪の大谷相关活动...\n');
    
    const events = await prisma.matsuriEvent.findMany({
      where: {
        name: {
          contains: '雪の大谷'
        }
      },
      select: {
        id: true,
        name: true,
        address: true,
        datetime: true,
        createdAt: true
      }
    });

    if (events.length === 0) {
      console.log('❌ 没有找到雪の大谷相关活动');
    } else {
      console.log(`✅ 找到 ${events.length} 个雪の大谷活动:`);
      events.forEach((event, index) => {
        console.log(`\n活动 ${index + 1}:`);
        console.log(`  ID: ${event.id}`);
        console.log(`  名称: ${event.name}`);
        console.log(`  地址: ${event.address}`);
        console.log(`  日期: ${event.datetime}`);
        console.log(`  创建时间: ${event.createdAt}`);
      });
    }

  } catch (error) {
    console.error('查找失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findYukinoData(); 