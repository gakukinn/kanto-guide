const { exec } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const sqlitePath = path.join(__dirname, '..', 'sqlite-tools', 'sqlite3.exe');

console.log('📊 数据库活动统计');
console.log('='.repeat(30));

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    exec(`"${sqlitePath}" "${dbPath}" "${query}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`查询出错: ${error.message}`);
        resolve('0');
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function getStats() {
  try {
    const hanabiCount = await runQuery('SELECT COUNT(*) FROM hanabi_events;');
    const matsuriCount = await runQuery('SELECT COUNT(*) FROM matsuri_events;');
    const hanamiCount = await runQuery('SELECT COUNT(*) FROM hanami_events;');
    const momijiCount = await runQuery('SELECT COUNT(*) FROM momiji_events;');
    const illuminationCount = await runQuery('SELECT COUNT(*) FROM illumination_events;');
    const cultureCount = await runQuery('SELECT COUNT(*) FROM culture_events;');

    console.log('🎆 花火大会:', hanabiCount, '个');
    console.log('🏮 传统祭典:', matsuriCount, '个');
    console.log('🌸 花见会:', hanamiCount, '个');
    console.log('🍁 红叶狩:', momijiCount, '个');
    console.log('💡 灯光秀:', illuminationCount, '个');
    console.log('🎭 文化艺术:', cultureCount, '个');

    const total = parseInt(hanabiCount) + parseInt(matsuriCount) + parseInt(hanamiCount) + 
                  parseInt(momijiCount) + parseInt(illuminationCount) + parseInt(cultureCount);
    
    console.log('\n📈 总计:', total, '个活动');

    // 如果有数据，显示一些样例
    if (total > 0) {
      console.log('\n📋 数据样例:');
      
      if (parseInt(hanabiCount) > 0) {
        const sample = await runQuery('SELECT name FROM hanabi_events LIMIT 3;');
        console.log('花火大会样例:', sample.split('\n').slice(0, 3).join(', '));
      }
      
      if (parseInt(matsuriCount) > 0) {
        const sample = await runQuery('SELECT name FROM matsuri_events LIMIT 3;');
        console.log('传统祭典样例:', sample.split('\n').slice(0, 3).join(', '));
      }
      
      if (parseInt(hanamiCount) > 0) {
        const sample = await runQuery('SELECT name FROM hanami_events LIMIT 3;');
        console.log('花见会样例:', sample.split('\n').slice(0, 3).join(', '));
      }
    }

  } catch (error) {
    console.error('❌ 统计出错:', error);
  }
}

getStats(); 