const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function checkDatabaseData() {
  console.log('🔍 检查数据库数据情况...');
  console.log('================================');
  
  try {
    // 检查每个活动表的数据
    const tables = [
      { name: 'hanabi', model: 'hanabiEvent', displayName: '花火大会' },
      { name: 'matsuri', model: 'matsuriEvent', displayName: '传统祭典' },
      { name: 'hanami', model: 'hanamiEvent', displayName: '花见会' },
      { name: 'momiji', model: 'momijiEvent', displayName: '红叶狩' },
      { name: 'illumination', model: 'illuminationEvent', displayName: '灯光秀' },
      { name: 'culture', model: 'cultureEvent', displayName: '文艺术' }
    ];
    
    let totalRecords = 0;
    
    for (const table of tables) {
      console.log(`\n📋 ${table.displayName} (${table.name}Event):`);
      
      try {
        const count = await prisma[table.model].count();
        totalRecords += count;
        console.log(`   记录数量: ${count}`);
        
        if (count > 0) {
          // 显示前几条记录的基本信息
          const samples = await prisma[table.model].findMany({
            take: 3,
            select: {
              id: true,
              region: true,
              name: true,
              verified: true
            }
          });
          
          console.log('   示例记录:');
          samples.forEach((record, index) => {
            console.log(`     ${index + 1}. [${record.region}] ${record.name} ${record.verified ? '✅' : '⏳'}`);
          });
        }
      } catch (error) {
        console.log(`   ❌ 查询失败: ${error.message}`);
      }
    }
    
    console.log(`\n📊 总计: ${totalRecords} 条记录`);
    
    // 检查地区分布
    console.log('\n🗺️ 地区分布:');
    const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
    
    for (const region of regions) {
      let regionTotal = 0;
      for (const table of tables) {
        try {
          const count = await prisma[table.model].count({
            where: { region: region }
          });
          regionTotal += count;
        } catch (error) {
          // 忽略错误，继续下一个
        }
      }
      if (regionTotal > 0) {
        console.log(`   ${region}: ${regionTotal} 条记录`);
      }
    }
    
    console.log('\n✅ 数据库检查完成!');
    
  } catch (error) {
    console.error('❌ 检查失败:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseData(); 