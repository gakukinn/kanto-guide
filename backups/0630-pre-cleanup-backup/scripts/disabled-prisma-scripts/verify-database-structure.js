const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function verifyDatabaseStructure() {
  console.log('🔍 验证数据库结构...');
  console.log('================================');
  
  try {
    // 检查每个活动表的结构
    const tables = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];
    
    for (const table of tables) {
      console.log(`\n📋 ${table.toUpperCase()}Event 表结构:`);
      
      // 获取表的PRAGMA信息（SQLite特有）
      const tableName = `${table}_events`;
      const result = await prisma.$queryRawUnsafe(`PRAGMA table_info(${tableName})`);
      
      console.log('字段顺序:');
      result.forEach((column, index) => {
        const indicator = column.name === 'region' ? '👉' : '  ';
        console.log(`${indicator} ${index + 1}. ${column.name} (${column.type})`);
      });
    }
    
    console.log('\n✅ 数据库结构验证完成!');
    console.log('\n📝 说明:');
    console.log('👉 标记的字段表示 region 字段位置');
    console.log('region 字段现在应该在每个表的第2位（id之后）');
    
  } catch (error) {
    console.error('❌ 验证失败:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabaseStructure(); 