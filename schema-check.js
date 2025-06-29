const fs = require('fs');

function extractSchemaFromDB() {
  const dbPath = 'prisma/dev.db';
  
  try {
    console.log('=== 数据库架构提取 ===\n');
    
    const buffer = fs.readFileSync(dbPath);
    const content = buffer.toString('utf8');
    
    // 查找CREATE TABLE语句
    const createTablePattern = /CREATE TABLE[^;]+;/gi;
    const tables = content.match(createTablePattern);
    
    console.log('🔍 发现的表结构:');
    if (tables) {
      tables.forEach((table, index) => {
        const cleanTable = table.replace(/[^\x20-\x7E\u4e00-\u9fff]/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`\n表 ${index + 1}:`);
        console.log(`   ${cleanTable}`);
      });
    } else {
      console.log('   ❌ 未找到表结构');
    }
    
    // 查找索引
    const indexPattern = /CREATE.*INDEX[^;]+;/gi;
    const indexes = content.match(indexPattern);
    
    console.log('\n🔍 发现的索引:');
    if (indexes) {
      indexes.forEach((index, i) => {
        const cleanIndex = index.replace(/[^\x20-\x7E\u4e00-\u9fff]/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`   索引 ${i + 1}: ${cleanIndex}`);
      });
    } else {
      console.log('   ❌ 未找到索引');
    }
    
    // 搜索关键表名
    const tableNames = ['hanami_events', 'matsuri_events', 'hanabi_events', 'regions'];
    console.log('\n🔍 表名检查:');
    tableNames.forEach(tableName => {
      if (content.includes(tableName)) {
        console.log(`   ✅ 找到表: ${tableName}`);
      } else {
        console.log(`   ❌ 未找到表: ${tableName}`);
      }
    });
    
    // 检查是否有数据记录的痕迹
    console.log('\n🔍 数据记录检查:');
    const dataKeywords = ['INSERT', 'VALUES', '东京', '大阪', '京都', '札幌', '福冈'];
    let foundData = false;
    dataKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        console.log(`   ✅ 可能的数据: ${keyword}`);
        foundData = true;
      }
    });
    
    if (!foundData) {
      console.log('   ❌ 未找到任何数据记录');
    }
    
    // 显示文件的前1000个字符（排除二进制）
    console.log('\n📄 数据库文件内容预览:');
    const preview = content.substring(0, 1000)
      .replace(/[^\x20-\x7E\u4e00-\u9fff\n]/g, '.')
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 10)
      .join('\n');
    console.log(preview);
    
  } catch (error) {
    console.error('❌ 检查文件时出错:', error.message);
  }
}

extractSchemaFromDB(); 