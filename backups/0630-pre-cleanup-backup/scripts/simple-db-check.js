const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

console.log('🗂️ 数据库活动分类整理报告');
console.log('='.repeat(50));

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ 无法打开数据库:', err.message);
    return;
  }
  console.log('✅ 已连接到数据库');
});

// 查询所有表的数据
async function queryDatabase() {
  const tables = [
    { name: 'HanabiEvent', displayName: '🎆 花火大会' },
    { name: 'MatsuriEvent', displayName: '🏮 传统祭典' },
    { name: 'HanamiEvent', displayName: '🌸 花见会' },
    { name: 'MomijiEvent', displayName: '🍁 红叶狩' },
    { name: 'IlluminationEvent', displayName: '💡 灯光秀' },
    { name: 'CultureEvent', displayName: '🎭 文化艺术' }
  ];

  let totalEvents = 0;
  const stats = {};

  for (const table of tables) {
    await new Promise((resolve, reject) => {
      db.all(`SELECT COUNT(*) as count FROM ${table.name}`, (err, rows) => {
        if (err) {
          console.error(`❌ 查询${table.name}失败:`, err.message);
          stats[table.name] = 0;
        } else {
          const count = rows[0].count;
          stats[table.name] = count;
          totalEvents += count;
          console.log(`${table.displayName}: ${count}个活动`);
        }
        resolve();
      });
    });
  }

  console.log('-'.repeat(30));
  console.log(`📊 活动总数: ${totalEvents}个`);
  console.log();

  // 查询具体活动信息
  for (const table of tables) {
    if (stats[table.name] > 0) {
      console.log(`${table.displayName} 详细信息:`);
      await new Promise((resolve) => {
        db.all(`
          SELECT 
            name, 
            datetime, 
            venue, 
            contact, 
            website,
            (SELECT name FROM Region WHERE id = ${table.name}.regionId) as regionName
          FROM ${table.name} 
          ORDER BY datetime
        `, (err, rows) => {
          if (err) {
            console.error(`❌ 查询${table.name}详情失败:`, err.message);
          } else {
            rows.forEach((row, index) => {
              console.log(`${index + 1}. ${row.name}`);
              console.log(`   📍 ${row.regionName || '未知地区'} | 📅 ${row.datetime}`);
              console.log(`   🏢 ${row.venue || '未知场所'}`);
              console.log(`   📞 ${row.contact || '无联系方式'} | 🌐 ${row.website ? '有官网' : '无官网'}`);
              console.log();
            });
          }
          resolve();
        });
      });
    }
  }

  // 按地区统计
  console.log('📍 按地区统计:');
  console.log('-'.repeat(30));
  
  await new Promise((resolve) => {
    db.all(`SELECT name FROM Region ORDER BY name`, (err, regions) => {
      if (err) {
        console.error('❌ 查询地区失败:', err.message);
        resolve();
        return;
      }

      let regionPromises = regions.map(region => {
        return new Promise((resolveRegion) => {
          let regionTotal = 0;
          const regionStats = {};

          // 统计每个地区各类活动数量
          const tablePromises = tables.map(table => {
            return new Promise((resolveTable) => {
              db.all(`
                SELECT COUNT(*) as count 
                FROM ${table.name} 
                WHERE regionId = (SELECT id FROM Region WHERE name = ?)
              `, [region.name], (err, rows) => {
                if (!err && rows[0]) {
                  const count = rows[0].count;
                  regionStats[table.name] = count;
                  regionTotal += count;
                }
                resolveTable();
              });
            });
          });

          Promise.all(tablePromises).then(() => {
            if (regionTotal > 0) {
              console.log(`🏞️ ${region.name}: ${regionTotal}个活动`);
              tables.forEach(table => {
                if (regionStats[table.name] > 0) {
                  console.log(`   ${table.displayName}: ${regionStats[table.name]}个`);
                }
              });
              console.log();
            }
            resolveRegion();
          });
        });
      });

      Promise.all(regionPromises).then(() => {
        resolve();
      });
    });
  });

  // 数据质量检查
  console.log('🔍 数据质量检查:');
  console.log('-'.repeat(30));

  for (const table of tables) {
    if (stats[table.name] > 0) {
      await new Promise((resolve) => {
        db.all(`
          SELECT 
            COUNT(*) as total,
            COUNT(contact) as hasContact,
            COUNT(website) as hasWebsite,
            COUNT(googleMap) as hasGoogleMap,
            COUNT(regionId) as hasRegion
          FROM ${table.name}
        `, (err, rows) => {
          if (!err && rows[0]) {
            const data = rows[0];
            console.log(`${table.displayName}:`);
            console.log(`   ❌ 缺少联系方式: ${data.total - data.hasContact}个`);
            console.log(`   ❌ 缺少官网: ${data.total - data.hasWebsite}个`);
            console.log(`   ❌ 缺少地图: ${data.total - data.hasGoogleMap}个`);
            console.log(`   ❌ 缺少地区: ${data.total - data.hasRegion}个`);
            console.log();
          }
          resolve();
        });
      });
    }
  }

  db.close((err) => {
    if (err) {
      console.error('❌ 关闭数据库连接失败:', err.message);
    } else {
      console.log('✅ 数据库连接已关闭');
    }
  });
}

queryDatabase().catch(console.error); 