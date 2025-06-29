const { exec } = require('child_process');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
const sqlitePath = path.join(__dirname, '..', 'sqlite-tools', 'sqlite3.exe');

console.log('📞 合并相同联系方式的重复数据');
console.log('='.repeat(50));

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

async function findDuplicateContacts() {
  try {
    console.log('🔍 第一步：查找相同联系方式的活动');
    console.log('-'.repeat(30));

    // 获取所有活动数据
    const tables = [
      { name: 'hanabi_events', type: 'hanabi' },
      { name: 'matsuri_events', type: 'matsuri' },
      { name: 'hanami_events', type: 'hanami' },
      { name: 'momiji_events', type: 'momiji' },
      { name: 'illumination_events', type: 'illumination' },
      { name: 'culture_events', type: 'culture' }
    ];
    
    let allEvents = [];

    for (const table of tables) {
      console.log(`正在查询 ${table.name}...`);
      
      const result = await runQuery(`SELECT id, name, contact, website, datetime, createdAt FROM ${table.name} WHERE contact != '' AND contact IS NOT NULL;`);
      
      if (result) {
        const lines = result.split('\n').filter(line => line.trim());
        console.log(`  找到 ${lines.length} 条有联系方式的记录`);
        
        lines.forEach(line => {
          const parts = line.split('|');
          if (parts.length >= 6) {
            allEvents.push({
              id: parts[0] || '',
              name: parts[1] || '',
              contact: parts[2] || '',
              website: parts[3] || '',
              datetime: parts[4] || '',
              createdAt: parts[5] || '',
              currentTable: table.name,
              currentType: table.type
            });
          }
        });
      }
    }

    console.log(`\n📋 总共找到 ${allEvents.length} 个有联系方式的活动`);

    // 按联系方式分组查找重复
    const contactGroups = {};
    allEvents.forEach(event => {
      const contact = event.contact.trim();
      if (contact) {
        if (!contactGroups[contact]) {
          contactGroups[contact] = [];
        }
        contactGroups[contact].push(event);
      }
    });

    // 找出重复的联系方式
    const duplicateGroups = Object.entries(contactGroups)
      .filter(([contact, events]) => events.length > 1)
      .map(([contact, events]) => ({ contact, events }));

    console.log(`\n🔄 发现 ${duplicateGroups.length} 组相同联系方式的重复数据:`);

    let totalDuplicates = 0;
    const mergeCommands = [];

    duplicateGroups.forEach((group, index) => {
      console.log(`\n组 ${index + 1} - 联系方式: ${group.contact}`);
      
      // 按创建时间排序，保留最早的
      group.events.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const keepEvent = group.events[0];
      const removeEvents = group.events.slice(1);
      
      console.log(`  保留: "${keepEvent.name}" (${keepEvent.currentTable}) - ${keepEvent.createdAt}`);
      
      removeEvents.forEach(removeEvent => {
        console.log(`  删除: "${removeEvent.name}" (${removeEvent.currentTable}) - ${removeEvent.createdAt}`);
        mergeCommands.push(`-- 删除重复活动: "${removeEvent.name}" (联系方式: ${group.contact})`);
        mergeCommands.push(`DELETE FROM ${removeEvent.currentTable} WHERE id = '${removeEvent.id}';`);
        totalDuplicates++;
      });
    });

    console.log(`\n📊 统计:`);
    console.log(`重复联系方式组数: ${duplicateGroups.length}`);
    console.log(`将删除的重复活动: ${totalDuplicates}个`);

    // 生成合并SQL
    if (mergeCommands.length > 0) {
      const fs = require('fs');
      const sqlContent = [
        '-- 合并相同联系方式的重复数据SQL',
        '-- 生成时间: ' + new Date().toISOString(),
        '--',
        '-- 请在执行前备份数据库！',
        '--',
        '',
        ...mergeCommands
      ].join('\n');
      
      fs.writeFileSync(path.join(__dirname, 'merge-same-contact.sql'), sqlContent);
      console.log('\n💾 合并SQL已保存到: scripts/merge-same-contact.sql');
      
      console.log('\n⚠️ 重要提示:');
      console.log('1. 请先备份数据库');
      console.log('2. 仔细检查生成的SQL文件');
      console.log('3. 确认无误后执行合并');
      console.log('4. 执行命令:');
      console.log('   Get-Content scripts/merge-same-contact.sql | sqlite-tools/sqlite3.exe prisma/dev.db');
      
      return true;
    } else {
      console.log('\n✅ 未发现需要合并的相同联系方式数据');
      return false;
    }

  } catch (error) {
    console.error('❌ 处理过程中出错:', error);
    return false;
  }
}

findDuplicateContacts(); 