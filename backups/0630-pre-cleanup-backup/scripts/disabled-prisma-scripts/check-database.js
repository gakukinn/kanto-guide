const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('=== 数据库中的活动列表 ===\n');
    
    const events = await prisma.matsuriEvent.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        datetime: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (events.length === 0) {
      console.log('数据库中没有活动数据');
    } else {
      events.forEach((event, index) => {
        console.log(`活动 ${index + 1}:`);
        console.log(`  ID: ${event.id}`);
        console.log(`  名称: ${event.name}`);
        console.log(`  地址: ${event.address}`);
        console.log(`  日期: ${event.datetime}`);
        console.log(`  创建时间: ${event.createdAt}`);
        console.log('');
      });
    }

    console.log(`总计: ${events.length} 个活动`);

  } catch (error) {
    console.error('检查数据库失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 