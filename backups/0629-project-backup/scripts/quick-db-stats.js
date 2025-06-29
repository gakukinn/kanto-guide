const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

console.log('🗂️ 数据库活动统计');
console.log('='.repeat(30));

const db = new sqlite3.Database(dbPath);

// 先检查表是否存在
db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, tables) => {
  if (err) {
    console.error('查询表失败:', err);
    return;
  }
  
  console.log('📋 数据库中的表:');
  tables.forEach(table => {
    console.log(`- ${table.name}`);
  });
  console.log();

  // 统计活动表
  const eventTables = tables.filter(t => t.name.includes('Event'));
  
  if (eventTables.length === 0) {
    console.log('❌ 未找到活动表');
    db.close();
    return;
  }

  let completed = 0;
  let totalEvents = 0;

  eventTables.forEach(table => {
    db.all(`SELECT COUNT(*) as count FROM ${table.name}`, (err, rows) => {
      if (!err && rows[0]) {
        const count = rows[0].count;
        totalEvents += count;
        
        let displayName = '';
        switch(table.name) {
          case 'HanabiEvent': displayName = '🎆 花火大会'; break;
          case 'MatsuriEvent': displayName = '🏮 传统祭典'; break;
          case 'HanamiEvent': displayName = '🌸 花见会'; break;
          case 'MomijiEvent': displayName = '🍁 红叶狩'; break;
          case 'IlluminationEvent': displayName = '💡 灯光秀'; break;
          case 'CultureEvent': displayName = '🎭 文化艺术'; break;
          default: displayName = table.name;
        }
        
        console.log(`${displayName}: ${count}个活动`);
        
        if (count > 0) {
          // 显示最新的几个活动
          db.all(`SELECT name, datetime FROM ${table.name} ORDER BY createdAt DESC LIMIT 3`, (err, events) => {
            if (!err) {
              events.forEach((event, index) => {
                console.log(`  ${index + 1}. ${event.name} (${event.datetime})`);
              });
            }
            console.log();
            
            completed++;
            if (completed === eventTables.length) {
              console.log(`📊 总计: ${totalEvents}个活动`);
              db.close();
            }
          });
        } else {
          completed++;
          if (completed === eventTables.length) {
            console.log(`📊 总计: ${totalEvents}个活动`);
            db.close();
          }
        }
      }
    });
  });
}); 