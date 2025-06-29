const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function checkDatabaseDirectly() {
  const dbPath = path.resolve('prisma/dev.db');
  
  console.log('=== 直接数据库查询 ===\n');
  console.log(`数据库路径: ${dbPath}`);
  
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('❌ 无法打开数据库:', err.message);
      return;
    }
    
    console.log('✅ 数据库连接成功\n');
    
    // 查询所有表
    db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
      if (err) {
        console.error('❌ 查询表错误:', err.message);
        return;
      }
      
      console.log('📋 数据库中的表:');
      tables.forEach(table => {
        console.log(`   - ${table.name}`);
      });
      
      // 检查每个主要表的记录数
      const mainTables = ['regions', 'hanami_events', 'matsuri_events', 'hanabi_events'];
      let completedQueries = 0;
      
      console.log('\n📊 表记录统计:');
      
      mainTables.forEach(tableName => {
        if (tables.some(t => t.name === tableName)) {
          db.get(`SELECT COUNT(*) as count FROM ${tableName}`, [], (err, row) => {
            if (err) {
              console.log(`   ${tableName}: 查询错误 - ${err.message}`);
            } else {
              console.log(`   ${tableName}: ${row.count} 条记录`);
              
              // 如果有记录，显示前几条
              if (row.count > 0) {
                db.all(`SELECT * FROM ${tableName} LIMIT 3`, [], (err, rows) => {
                  if (!err && rows.length > 0) {
                    console.log(`   ${tableName} 样本数据:`);
                    rows.forEach((data, index) => {
                      const name = data.name || data.nameJa || data.code || 'N/A';
                      const location = data.location || data.nameCn || 'N/A';
                      console.log(`     ${index + 1}. ${name} (${location})`);
                    });
                  }
                });
              }
            }
            
            completedQueries++;
            if (completedQueries === mainTables.length) {
              // 所有查询完成后，查找河口湖数据
              setTimeout(() => {
                console.log('\n🔍 搜索河口湖相关数据:');
                db.all("SELECT * FROM hanami_events WHERE name LIKE '%河口湖%' OR location LIKE '%河口湖%'", [], (err, rows) => {
                  if (err) {
                    console.log('   查询错误:', err.message);
                  } else if (rows.length > 0) {
                    console.log(`   ✅ 找到 ${rows.length} 条河口湖数据:`);
                    rows.forEach((row, index) => {
                      console.log(`     ${index + 1}. ${row.name} - ${row.location} (${row.season})`);
                    });
                  } else {
                    console.log('   ❌ 未找到河口湖数据');
                  }
                  
                  db.close((err) => {
                    if (err) {
                      console.error('❌ 关闭数据库错误:', err.message);
                    } else {
                      console.log('\n✅ 数据库连接已关闭');
                    }
                  });
                });
              }, 1000);
            }
          });
        } else {
          console.log(`   ${tableName}: 表不存在`);
          completedQueries++;
        }
      });
    });
  });
}

// 检查是否安装了sqlite3包
try {
  require('sqlite3');
  checkDatabaseDirectly();
} catch (error) {
  console.log('❌ 需要安装sqlite3包');
  console.log('请运行: npm install sqlite3');
  console.log('然后重新运行此脚本');
} 