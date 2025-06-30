const { exec } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const sqlitePath = path.join(__dirname, '..', 'sqlite-tools', 'sqlite3.exe');

console.log('🗂️ 数据库活动分类整理报告');
console.log('='.repeat(50));

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    exec(`"${sqlitePath}" "${dbPath}" "${query}"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function generateReport() {
  try {
    // 1. 基本统计
    console.log('📊 活动总数统计:');
    console.log('-'.repeat(30));
    
    const hanabiCount = await runQuery('SELECT COUNT(*) FROM hanabi_events;');
    const matsuriCount = await runQuery('SELECT COUNT(*) FROM matsuri_events;');
    const hanamiCount = await runQuery('SELECT COUNT(*) FROM hanami_events;');
    const momijiCount = await runQuery('SELECT COUNT(*) FROM momiji_events;');
    const cultureCount = await runQuery('SELECT COUNT(*) FROM culture_events;');
    
    const total = parseInt(hanabiCount) + parseInt(matsuriCount) + parseInt(hanamiCount) + 
                  parseInt(momijiCount) + parseInt(cultureCount);
    
    console.log(`🎆 花火大会: ${hanabiCount}个活动`);
    console.log(`🏮 传统祭典: ${matsuriCount}个活动`);
    console.log(`🌸 花见会: ${hanamiCount}个活动`);
    console.log(`🍁 红叶狩: ${momijiCount}个活动`);
    console.log(`🎭 文化艺术: ${cultureCount}个活动`);
    console.log(`📈 总计: ${total}个活动`);
    console.log();

    // 2. 按地区统计（修正版）
    console.log('📍 按地区统计:');
    console.log('-'.repeat(30));
    
    const regionMapping = {
      'tokyo': '东京都',
      'saitama': '埼玉县', 
      'chiba': '千叶县',
      'kanagawa': '神奈川县',
      'kitakanto': '北关东',
      'koshinetsu': '甲信越'
    };

    for (const [regionKey, regionName] of Object.entries(regionMapping)) {
      const regionHanabi = await runQuery(`SELECT COUNT(*) FROM hanabi_events WHERE region = '${regionKey}';`);
      const regionMatsuri = await runQuery(`SELECT COUNT(*) FROM matsuri_events WHERE region = '${regionKey}';`);
      const regionHanami = await runQuery(`SELECT COUNT(*) FROM hanami_events WHERE region = '${regionKey}';`);
      const regionMomiji = await runQuery(`SELECT COUNT(*) FROM momiji_events WHERE region = '${regionKey}';`);
      const regionCulture = await runQuery(`SELECT COUNT(*) FROM culture_events WHERE region = '${regionKey}';`);
      
      const regionTotal = parseInt(regionHanabi) + parseInt(regionMatsuri) + parseInt(regionHanami) + 
                         parseInt(regionMomiji) + parseInt(regionCulture);
      
      if (regionTotal > 0) {
        console.log(`🏞️ ${regionName}: ${regionTotal}个活动`);
        if (parseInt(regionHanabi) > 0) console.log(`   🎆 花火大会: ${regionHanabi}个`);
        if (parseInt(regionMatsuri) > 0) console.log(`   🏮 传统祭典: ${regionMatsuri}个`);
        if (parseInt(regionHanami) > 0) console.log(`   🌸 花见会: ${regionHanami}个`);
        if (parseInt(regionMomiji) > 0) console.log(`   🍁 红叶狩: ${regionMomiji}个`);
        if (parseInt(regionCulture) > 0) console.log(`   🎭 文化艺术: ${regionCulture}个`);
        console.log();
      }
    }

    // 3. 最新活动列表
    console.log('📋 最新录入的活动:');
    console.log('-'.repeat(30));
    
    const tables = [
      { name: 'hanabi_events', display: '🎆 花火大会' },
      { name: 'matsuri_events', display: '🏮 传统祭典' },
      { name: 'hanami_events', display: '🌸 花见会' },
      { name: 'momiji_events', display: '🍁 红叶狩' },
      { name: 'culture_events', display: '🎭 文化艺术' }
    ];

    for (const table of tables) {
      const count = await runQuery(`SELECT COUNT(*) FROM ${table.name};`);
      if (parseInt(count) > 0) {
        console.log(`${table.display} (${count}个):`);
        // 使用正确的字段名 createdAt
        const recentEvents = await runQuery(`SELECT name || '|' || datetime || '|' || venue as info FROM ${table.name} ORDER BY createdAt DESC LIMIT 3;`);
        const events = recentEvents.split('\n').filter(e => e.trim());
        
        events.forEach((event, index) => {
          const parts = event.split('|');
          if (parts.length >= 3) {
            console.log(`${index + 1}. ${parts[0]} | ${parts[1]} | ${parts[2]}`);
          } else {
            console.log(`${index + 1}. ${event}`);
          }
        });
        console.log();
      }
    }

    // 4. 数据质量检查
    console.log('🔍 数据质量检查:');
    console.log('-'.repeat(30));
    
    for (const table of tables) {
      const count = await runQuery(`SELECT COUNT(*) FROM ${table.name};`);
      if (parseInt(count) > 0) {
        const noContact = await runQuery(`SELECT COUNT(*) FROM ${table.name} WHERE contact IS NULL OR contact = '';`);
        const noWebsite = await runQuery(`SELECT COUNT(*) FROM ${table.name} WHERE website IS NULL OR website = '';`);
        const noGoogleMap = await runQuery(`SELECT COUNT(*) FROM ${table.name} WHERE googleMap IS NULL OR googleMap = '';`);
        
        console.log(`${table.display}:`);
        console.log(`   ❌ 缺少联系方式: ${noContact}个`);
        console.log(`   ❌ 缺少官网: ${noWebsite}个`);
        console.log(`   ❌ 缺少地图: ${noGoogleMap}个`);
        console.log();
      }
    }

    // 5. 重复活动检查
    console.log('🔄 可能重复的活动检查:');
    console.log('-'.repeat(30));
    
    // 检查相同名称的活动
    const duplicateNames = await runQuery(`
      SELECT name, COUNT(*) as count FROM (
        SELECT name FROM hanabi_events
        UNION ALL SELECT name FROM matsuri_events
        UNION ALL SELECT name FROM hanami_events
        UNION ALL SELECT name FROM momiji_events
        UNION ALL SELECT name FROM culture_events
      ) GROUP BY name HAVING count > 1;
    `);
    
    if (duplicateNames && duplicateNames.trim()) {
      const duplicates = duplicateNames.split('\n').filter(d => d.trim());
      console.log(`⚠️ 发现 ${duplicates.length} 个重复名称的活动:`);
      duplicates.forEach((duplicate, index) => {
        const parts = duplicate.split('|');
        if (parts.length >= 2) {
          console.log(`${index + 1}. "${parts[0]}" (${parts[1]}次)`);
        } else {
          console.log(`${index + 1}. ${duplicate}`);
        }
      });
    } else {
      console.log('✅ 未发现重复名称的活动');
    }

    // 6. 活动类型识别准确性分析
    console.log('\n📈 活动类型识别分析:');
    console.log('-'.repeat(30));
    
    // 检查是否有带"祭典"的活动被错误分类
    const matsuriInOtherTables = await runQuery(`
      SELECT 'hanabi_events' as table_name, name FROM hanabi_events WHERE name LIKE '%祭典%'
      UNION ALL
      SELECT 'hanami_events' as table_name, name FROM hanami_events WHERE name LIKE '%祭典%'
      UNION ALL
      SELECT 'momiji_events' as table_name, name FROM momiji_events WHERE name LIKE '%祭典%'
      UNION ALL
      SELECT 'culture_events' as table_name, name FROM culture_events WHERE name LIKE '%祭典%';
    `);
    
    if (matsuriInOtherTables && matsuriInOtherTables.trim()) {
      const misclassified = matsuriInOtherTables.split('\n').filter(m => m.trim());
      console.log(`⚠️ 发现 ${misclassified.length} 个带"祭典"的活动可能被错误分类:`);
      misclassified.forEach((item, index) => {
        const parts = item.split('|');
        if (parts.length >= 2) {
          console.log(`${index + 1}. "${parts[1]}" (在${parts[0]}表中)`);
        }
      });
      console.log('💡 建议: 所有带"祭典"的活动应该归类为传统祭典');
    } else {
      console.log('✅ 所有带"祭典"的活动都正确归类为传统祭典');
    }

    console.log('\n📊 整理完成！');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ 生成报告时出错:', error);
  }
}

generateReport(); 