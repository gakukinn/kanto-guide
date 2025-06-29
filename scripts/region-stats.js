const { exec } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const sqlitePath = path.join(__dirname, '..', 'sqlite-tools', 'sqlite3.exe');

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    exec(`"${sqlitePath}" "${dbPath}" "${query}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`查询出错: ${error.message}`);
        resolve('');
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function getRegionStats() {
  console.log('🗾 地区分布统计');
  console.log('='.repeat(30));

  // 获取各表的地区统计
  const tables = ['hanabi_events', 'matsuri_events', 'hanami_events', 'momiji_events', 'illumination_events', 'culture_events'];
  const regionCounts = {};

  for (const table of tables) {
    const result = await runQuery(`SELECT region, COUNT(*) as count FROM ${table} GROUP BY region;`);
    
    if (result) {
      const lines = result.split('\n').filter(line => line.trim());
      lines.forEach(line => {
        const parts = line.split('|');
        if (parts.length >= 2) {
          const region = parts[0];
          const count = parseInt(parts[1]);
          
          if (!regionCounts[region]) {
            regionCounts[region] = 0;
          }
          regionCounts[region] += count;
        }
      });
    }
  }

  // 排序并显示
  const sortedRegions = Object.entries(regionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([region, count]) => ({ region, count }));

  console.log('按活动数量排序:');
  sortedRegions.forEach(({ region, count }) => {
    console.log(`${region}: ${count}个活动`);
  });

  console.log(`\n📊 总计: ${Object.values(regionCounts).reduce((sum, count) => sum + count, 0)}个活动`);
  console.log(`🏷️ 涉及地区: ${Object.keys(regionCounts).length}个`);

  // 检查地区名称不统一的问题
  console.log('\n⚠️ 地区名称标准化建议:');
  console.log('-'.repeat(30));
  
  const regionMappings = {
    '东京': '東京都',
    'tokyo': '東京都',
    '埼玉': '埼玉県', 
    'saitama': '埼玉県',
    '千葉県': '千葉県',
    '神奈川県': '神奈川県',
    '北关东': '北関東',
    '甲信越': '甲信越',
    'koshinetsu': '甲信越'
  };

  Object.keys(regionCounts).forEach(region => {
    if (regionMappings[region]) {
      console.log(`"${region}" → "${regionMappings[region]}"`);
    }
  });
}

getRegionStats(); 