const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function updateFirstActivityAddress() {
  console.log('🔄 更新第109回日本陸上競技選手権大会的完整地址...');

  try {
    // 查找活动记录
    const activity = await prisma.matsuriEvent.findFirst({
      where: { 
        name: '第109回日本陸上競技選手権大会'
      }
    });

    if (!activity) {
      console.log('❌ 未找到活动记录');
      return;
    }

    // 更新为完整地址（包含邮编）
    const updatedActivity = await prisma.matsuriEvent.update({
      where: { id: activity.id },
      data: {
        address: '〒160-0013 東京都新宿区霞ヶ丘町10-1'  // 从Jalan页面获取的完整地址
      }
    });

    console.log('✅ 地址更新成功：');
    console.log('更新前:', activity.address);
    console.log('更新后:', updatedActivity.address);
    
  } catch (error) {
    console.error('❌ 更新失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateFirstActivityAddress(); 