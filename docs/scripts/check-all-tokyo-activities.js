const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkAllTokyoActivities() {
  console.log('🔍 完整检查东京都前十个活动的数据库记录...\n');

  // 定义前十个活动名称
  const activityNames = [
    '第109回日本陸上競技選手権大会',
    'デザインフェスタ vol.61',
    'THE ROAD RACE TOKYO TAMA 2025',
    '葛飾納涼花火大会',
    '第28回新橋こいち祭',
    '隅田川花火大会',
    '羽田神社夏季例大祭「羽田まつり」',
    '江戸川区花火大会',
    '第66回いたばし花火大会',
    '八王子まつり'
  ];

  try {
    const searchTables = ['matsuriEvent', 'hanabiEvent', 'hanamiEvent', 'momijiEvent', 'illuminationEvent', 'cultureEvent'];
    
    for (let i = 0; i < activityNames.length; i++) {
      const activityName = activityNames[i];
      console.log(`📋 检查第${i + 1}个活动: ${activityName}`);
      
      let found = false;
      
      for (const table of searchTables) {
        const activity = await prisma[table].findFirst({
          where: { name: activityName }
        });
        
        if (activity) {
          found = true;
          console.log(`   ✅ 在 ${table} 表中找到`);
          console.log(`   1. 名称: ${activity.name || '❌ 缺失'}`);
          console.log(`   2. 所在地: ${activity.address || '❌ 缺失'}`);
          console.log(`   3. 開催期間: ${activity.datetime || '❌ 缺失'}`);
          console.log(`   4. 開催場所: ${activity.venue || '❌ 缺失'}`);
          console.log(`   5. 交通アクセス: ${activity.access || '❌ 缺失'}`);
          console.log(`   6. 主催: ${activity.organizer || '❌ 缺失'}`);
          console.log(`   7. 料金: ${activity.price || '❌ 缺失'}`);
          console.log(`   8. 問合せ先: ${activity.contact || '❌ 缺失'}`);
          console.log(`   9. ホームページ: ${activity.website || '❌ 缺失'}`);
          console.log(`   10. 谷歌网站: ${activity.googleMap || '❌ 缺失'}`);
          console.log(`   11. 地区: ${activity.region || '❌ 缺失'}`);
          
          // 检查地址是否包含邮编
          const hasPostalCode = activity.address?.includes('〒');
          console.log(`   📍 地址包含邮编: ${hasPostalCode ? '✅ 是' : '❌ 否'}`);
          
          // 检查是否有空字段
          const fields = [
            activity.name, activity.address, activity.datetime, activity.venue, 
            activity.access, activity.organizer, activity.price, activity.contact, 
            activity.website, activity.googleMap, activity.region
          ];
          const emptyFields = fields.filter(field => !field || field.trim() === '').length;
          console.log(`   📊 空字段数量: ${emptyFields}/11`);
          
          break;
        }
      }
      
      if (!found) {
        console.log(`   ❌ 未找到该活动记录`);
      }
      
      console.log(''); // 空行分隔
    }
    
    // 统计总数
    console.log('📈 统计总结:');
    
    let totalCount = 0;
    for (const table of searchTables) {
      const count = await prisma[table].count({
        where: { 
          name: { in: activityNames }
        }
      });
      if (count > 0) {
        console.log(`   ${table}: ${count}个活动`);
        totalCount += count;
      }
    }
    
    console.log(`   总计: ${totalCount}/10 个活动在数据库中`);
    
  } catch (error) {
    console.error('❌ 检查失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllTokyoActivities(); 