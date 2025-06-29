const { exec } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const sqlitePath = path.join(__dirname, '..', 'sqlite-tools', 'sqlite3.exe');

console.log('🔄 数据分类和去重处理');
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

// 活动分类器
function classifyActivity(name, venue = '', organizer = '') {
  const text = `${name} ${venue} ${organizer}`.toLowerCase();
  
  // 花火大会关键词
  const hanabiKeywords = ['花火', 'はなび', 'hanabi', '花火大会', '夏まつり', '夏祭り', '納涼', '河川敷', '打ち上げ'];
  
  // 传统祭典关键词
  const matsuriKeywords = ['祭', 'まつり', 'matsuri', '祇園', '神社', '盆踊り', '山車', '御輿', '神輿', '太鼓'];
  
  // 花见会关键词
  const hanamiKeywords = ['桜', 'さくら', 'sakura', '花見', '桜まつり', '桜祭り', 'cherry', 'blossom'];
  
  // 红叶狩关键词
  const momijiKeywords = ['紅葉', 'もみじ', 'momiji', '秋', '楓', 'autumn', '紅葉狩り', '紅葉まつり'];
  
  // 灯光秀关键词
  const illuminationKeywords = ['イルミネーション', 'illumination', 'ライトアップ', 'light', 'led', '電飾', '夜景'];
  
  // 文化艺术关键词
  const cultureKeywords = ['文化', 'アート', 'art', '美術', '博物館', '展示', 'フェスタ', 'festival', 'コンサート', '音楽', 'デザイン'];

  let scores = {
    hanabi: 0,
    matsuri: 0,
    hanami: 0,
    momiji: 0,
    illumination: 0,
    culture: 0
  };

  // 计算各类型得分
  hanabiKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.hanabi += 2;
  });
  
  matsuriKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.matsuri += 2;
  });
  
  hanamiKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.hanami += 2;
  });
  
  momijiKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.momiji += 2;
  });
  
  illuminationKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.illumination += 2;
  });
  
  cultureKeywords.forEach(keyword => {
    if (text.includes(keyword)) scores.culture += 2;
  });

  // 特殊规则
  if (text.includes('花火') && text.includes('まつり')) {
    scores.hanabi += 3; // 花火祭典优先归类为花火大会
  }

  // 找出最高分类型
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return 'matsuri'; // 默认分类为传统祭典
  }

  const bestType = Object.keys(scores).find(key => scores[key] === maxScore);
  return bestType;
}

// 相似度计算
function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  // 标准化处理
  const normalize = (str) => {
    return str.toLowerCase()
      .replace(/[\s\-_()（）【】「」]/g, '')
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      .replace(/[Ａ-Ｚａ-ｚ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  };

  const norm1 = normalize(str1);
  const norm2 = normalize(str2);

  // 包含关系检测
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    return 80;
  }

  // 编辑距离计算
  const longer = norm1.length > norm2.length ? norm1 : norm2;
  const shorter = norm1.length > norm2.length ? norm2 : norm1;
  
  if (longer.length === 0) return 100;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return Math.round(((longer.length - editDistance) / longer.length) * 100);
}

function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

async function processClassificationAndDeduplication() {
  try {
    console.log('📊 第一步：分析现有数据分布');
    console.log('-'.repeat(30));

    // 获取所有活动数据
    const tables = ['hanabi_events', 'matsuri_events', 'hanami_events', 'momiji_events', 'illumination_events', 'culture_events'];
    let allEvents = [];

    for (const table of tables) {
      const events = await runQuery(`
        SELECT id, name, venue, organizer, contact, website, '${table}' as current_table 
        FROM ${table}
      `);
      
      if (events) {
        const eventList = events.split('\n').map(line => {
          const parts = line.split('|');
          return {
            id: parts[0],
            name: parts[1] || '',
            venue: parts[2] || '',
            organizer: parts[3] || '',
            contact: parts[4] || '',
            website: parts[5] || '',
            currentTable: parts[6]
          };
        });
        allEvents.push(...eventList);
      }
    }

    console.log(`📋 总共找到 ${allEvents.length} 个活动`);

    // 第二步：重新分类
    console.log('\n🎯 第二步：重新分类活动');
    console.log('-'.repeat(30));

    const reclassified = [];
    const wronglyClassified = [];

    for (const event of allEvents) {
      const correctType = classifyActivity(event.name, event.venue, event.organizer);
      const currentType = event.currentTable.replace('_events', '');
      
      if (correctType !== currentType) {
        wronglyClassified.push({
          ...event,
          correctType,
          currentType
        });
      }
      
      reclassified.push({
        ...event,
        correctType
      });
    }

    console.log(`❌ 发现 ${wronglyClassified.length} 个分类错误的活动:`);
    wronglyClassified.forEach((event, index) => {
      console.log(`${index + 1}. "${event.name}"`);
      console.log(`   当前分类: ${event.currentType} → 正确分类: ${event.correctType}`);
    });

    // 第三步：查找重复数据
    console.log('\n🔍 第三步：查找重复数据');
    console.log('-'.repeat(30));

    const duplicateGroups = [];
    const processed = new Set();

    for (let i = 0; i < allEvents.length; i++) {
      if (processed.has(i)) continue;
      
      const currentEvent = allEvents[i];
      const duplicates = [currentEvent];
      processed.add(i);

      for (let j = i + 1; j < allEvents.length; j++) {
        if (processed.has(j)) continue;
        
        const otherEvent = allEvents[j];
        let isDuplicate = false;
        let reason = '';

        // 优先级1：电话号码相同（95%相似度）
        if (currentEvent.contact && otherEvent.contact && 
            currentEvent.contact === otherEvent.contact) {
          isDuplicate = true;
          reason = '电话号码相同';
        }
        // 优先级2：官网URL相同（95%相似度）
        else if (currentEvent.website && otherEvent.website && 
                 currentEvent.website === otherEvent.website) {
          isDuplicate = true;
          reason = '官网URL相同';
        }
        // 优先级3：名称高度相似（80%以上）
        else {
          const nameSimilarity = calculateSimilarity(currentEvent.name, otherEvent.name);
          if (nameSimilarity >= 80) {
            isDuplicate = true;
            reason = `名称相似度${nameSimilarity}%`;
          }
        }

        if (isDuplicate) {
          duplicates.push(otherEvent);
          processed.add(j);
        }
      }

      if (duplicates.length > 1) {
        duplicateGroups.push({
          events: duplicates,
          reason
        });
      }
    }

    console.log(`🔄 发现 ${duplicateGroups.length} 组重复数据:`);
    duplicateGroups.forEach((group, index) => {
      console.log(`\n组 ${index + 1} (${group.reason}):`);
      group.events.forEach((event, eventIndex) => {
        console.log(`  ${eventIndex + 1}. "${event.name}" (${event.currentTable})`);
        console.log(`     联系: ${event.contact || '无'} | 网站: ${event.website || '无'}`);
      });
    });

    // 第四步：生成修复SQL
    console.log('\n🛠️ 第四步：生成修复方案');
    console.log('-'.repeat(30));

    let fixCommands = [];

    // 1. 重新分类的SQL
    if (wronglyClassified.length > 0) {
      console.log('📝 重新分类修复SQL:');
      
      for (const event of wronglyClassified) {
        const fromTable = event.currentTable;
        const toTable = `${event.correctType}_events`;
        
        if (fromTable !== toTable) {
          // 移动数据到正确的表
          fixCommands.push(`-- 移动 "${event.name}" 从 ${fromTable} 到 ${toTable}`);
          fixCommands.push(`INSERT INTO ${toTable} SELECT * FROM ${fromTable} WHERE id = '${event.id}';`);
          fixCommands.push(`DELETE FROM ${fromTable} WHERE id = '${event.id}';`);
          fixCommands.push('');
        }
      }
    }

    // 2. 去重的SQL
    if (duplicateGroups.length > 0) {
      console.log('🗑️ 去重修复SQL:');
      
      for (const group of duplicateGroups) {
        fixCommands.push(`-- 重复组: ${group.reason}`);
        
        // 保留第一个，删除其他
        const keepEvent = group.events[0];
        const removeEvents = group.events.slice(1);
        
        fixCommands.push(`-- 保留: "${keepEvent.name}" (${keepEvent.currentTable})`);
        
        for (const removeEvent of removeEvents) {
          fixCommands.push(`-- 删除: "${removeEvent.name}" (${removeEvent.currentTable})`);
          fixCommands.push(`DELETE FROM ${removeEvent.currentTable} WHERE id = '${removeEvent.id}';`);
        }
        fixCommands.push('');
      }
    }

    // 保存修复SQL到文件
    if (fixCommands.length > 0) {
      const fs = require('fs');
      const sqlContent = [
        '-- 数据分类和去重修复SQL',
        '-- 生成时间: ' + new Date().toISOString(),
        '--',
        '-- 请在执行前备份数据库！',
        '--',
        '',
        ...fixCommands
      ].join('\n');
      
      fs.writeFileSync(path.join(__dirname, 'fix-classification-and-duplicates.sql'), sqlContent);
      console.log('💾 修复SQL已保存到: scripts/fix-classification-and-duplicates.sql');
      
      console.log('\n⚠️ 重要提示:');
      console.log('1. 请先备份数据库');
      console.log('2. 仔细检查生成的SQL文件');
      console.log('3. 确认无误后执行修复');
      console.log('4. 执行命令示例:');
      console.log(`   sqlite-tools/sqlite3.exe prisma/dev.db < scripts/fix-classification-and-duplicates.sql`);
    } else {
      console.log('✅ 未发现需要修复的问题');
    }

    // 第五步：统计报告
    console.log('\n📈 修复后预期结果:');
    console.log('-'.repeat(30));
    
    const typeCount = {};
    reclassified.forEach(event => {
      typeCount[event.correctType] = (typeCount[event.correctType] || 0) + 1;
    });
    
    // 减去重复数据
    const totalDuplicates = duplicateGroups.reduce((sum, group) => sum + group.events.length - 1, 0);
    const finalTotal = allEvents.length - totalDuplicates;
    
    console.log('按正确分类统计:');
    Object.entries(typeCount).forEach(([type, count]) => {
      const displayName = {
        hanabi: '🎆 花火大会',
        matsuri: '🏮 传统祭典',
        hanami: '🌸 花见会',
        momiji: '🍁 红叶狩',
        illumination: '💡 灯光秀',
        culture: '🎭 文化艺术'
      }[type] || type;
      
      console.log(`${displayName}: ${count}个`);
    });
    
    console.log(`\n📊 修复前总数: ${allEvents.length}个活动`);
    console.log(`🗑️ 将删除重复: ${totalDuplicates}个活动`);
    console.log(`📈 修复后总数: ${finalTotal}个活动`);

  } catch (error) {
    console.error('❌ 处理过程中出错:', error);
  }
}

processClassificationAndDeduplication(); 