const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkFirstActivityDetails() {
  console.log('🔍 检查第109回日本陸上競技選手権大会的数据库记录...');

  try {
    // 在所有活动表中搜索
    const searchTables = ['matsuriEvent', 'hanabiEvent', 'hanamiEvent', 'momijiEvent', 'illuminationEvent', 'cultureEvent'];
    
    for (const table of searchTables) {
      const activity = await prisma[table].findFirst({
        where: { 
          name: '第109回日本陸上競技選手権大会'
        }
      });
      
      if (activity) {
        console.log(`\n📋 在 ${table} 表中找到活动:`);
        console.log('1. 名称:', activity.name || '❌ 缺失');
        console.log('2. 所在地 (address):', activity.address || '❌ 缺失');
        console.log('3. 開催期間 (datetime):', activity.datetime || '❌ 缺失');
        console.log('4. 開催場所 (venue):', activity.venue || '❌ 缺失');
        console.log('5. 交通アクセス (access):', activity.access || '❌ 缺失');
        console.log('6. 主催 (organizer):', activity.organizer || '❌ 缺失');
        console.log('7. 料金 (price):', activity.price || '❌ 缺失');
        console.log('8. 問合せ先 (contact):', activity.contact || '❌ 缺失');
        console.log('9. ホームページ (website):', activity.website || '❌ 缺失');
        console.log('10. 谷歌网站 (googleMap):', activity.googleMap || '❌ 缺失');
        
        console.log('\n📍 address字段是否包含邮编:', 
          activity.address?.includes('〒') ? '✅ 是' : '❌ 否'
        );
        
        return activity;
      }
    }
    
    console.log('❌ 未找到该活动记录');
    
  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkFirstActivityDetails(); 