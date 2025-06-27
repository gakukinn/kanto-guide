const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkActivity2NewName() {
  console.log('🔍 用新名称查找第二个活动...');

  try {
    // 查找更新后的第二个活动
    const activity = await prisma.cultureEvent.findFirst({
      where: { 
        name: 'デザインフェスタ vol.61（デザインフェスタ）'
      }
    });

    if (activity) {
      console.log('✅ 找到活动：デザインフェスタ vol.61（デザインフェスタ）');
      console.log('📋 十项信息验证：');
      console.log('1. 名称:', activity.name);
      console.log('2. 所在地:', activity.address);
      console.log('3. 開催期間:', activity.datetime);
      console.log('4. 開催場所:', activity.venue);
      console.log('5. 交通アクセス:', activity.access);
      console.log('6. 主催:', activity.organizer);
      console.log('7. 料金:', activity.price);
      console.log('8. 問合せ先:', activity.contact);
      console.log('9. ホームページ:', activity.website);
      console.log('10. 谷歌网站:', activity.googleMap);
      console.log('11. 地区:', activity.region);
      
      // 检查空字段
      let emptyFields = 0;
      const fields = [activity.name, activity.address, activity.datetime, activity.venue, activity.access, activity.organizer, activity.price, activity.contact, activity.website, activity.googleMap, activity.region];
      fields.forEach(field => {
        if (!field || field.trim() === '') emptyFields++;
      });
      
      console.log(`📊 空字段数量: ${emptyFields}/11`);
      console.log('📍 地址包含邮编:', activity.address && activity.address.includes('〒') ? '✅ 是' : '❌ 否');
      
    } else {
      console.log('❌ 未找到活动记录');
    }
    
  } catch (error) {
    console.error('❌ 查找失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkActivity2NewName(); 