const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function checkAllData() {
  const dbPath = path.resolve('prisma/dev.db');
  
  console.log('=== 检查所有数据 ===\n');
  
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error('❌ 无法打开数据库:', err.message);
      return;
    }
    
    console.log('✅ 正在检查您的所有数据...\n');
    
    // 检查所有主要表的详细数据
    const tables = [
      { name: 'hanami_events', displayName: '花见活动', expectedCount: 2 },
      { name: 'matsuri_events', displayName: '祭典活动', expectedCount: 6 },
      { name: 'hanabi_events', displayName: '花火活动', expectedCount: 88 },
      { name: 'regions', displayName: '地区信息', expectedCount: 6 }
    ];
    
    let completedChecks = 0;
    let totalFound = 0;
    let totalExpected = 0;
    
    tables.forEach(table => {
      totalExpected += table.expectedCount;
      
      db.get(`SELECT COUNT(*) as count FROM ${table.name}`, [], (err, row) => {
        if (err) {
          console.log(`❌ ${table.displayName}: 查询错误 - ${err.message}`);
        } else {
          const count = row.count;
          totalFound += count;
          
          if (count === table.expectedCount) {
            console.log(`✅ ${table.displayName}: ${count} 条记录 (完整)`);
          } else if (count === 0) {
            console.log(`❌ ${table.displayName}: ${count} 条记录 (应该有 ${table.expectedCount} 条)`);
          } else {
            console.log(`⚠️  ${table.displayName}: ${count} 条记录 (应该有 ${table.expectedCount} 条)`);
          }
          
          // 如果有数据，显示样本
          if (count > 0) {
            db.all(`SELECT * FROM ${table.name} LIMIT 5`, [], (err, rows) => {
              if (!err && rows.length > 0) {
                console.log(`   ${table.displayName} 样本:`);
                rows.forEach((data, index) => {
                  const name = data.name || data.nameJa || data.code || 'N/A';
                  const location = data.location || data.nameCn || data.displayDate || 'N/A';
                  console.log(`     ${index + 1}. ${name} - ${location}`);
                });
              }
            });
          }
        }
        
        completedChecks++;
        if (completedChecks === tables.length) {
          setTimeout(() => {
            console.log('\n📊 数据统计总结:');
            console.log(`   找到数据: ${totalFound} 条`);
            console.log(`   期望数据: ${totalExpected} 条`);
            console.log(`   丢失数据: ${totalExpected - totalFound} 条`);
            
            if (totalFound === totalExpected) {
              console.log('\n🎉 太好了！您的所有数据都在，没有丢失！');
            } else if (totalFound === 0) {
              console.log('\n😨 所有数据都找不到，需要进一步检查...');
            } else {
              console.log('\n😐 部分数据找到了，部分数据可能需要恢复');
            }
            
            db.close();
          }, 2000);
        }
      });
    });
  });
}

checkAllData(); 