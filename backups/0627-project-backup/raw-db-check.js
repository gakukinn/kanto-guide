const fs = require('fs');
const path = require('path');

function checkDatabaseFile() {
  const dbPath = 'prisma/dev.db';
  
  try {
    console.log('=== 数据库文件检查 ===\n');
    
    // 检查文件是否存在
    if (!fs.existsSync(dbPath)) {
      console.log('❌ 数据库文件不存在！');
      return;
    }
    
    // 检查文件大小
    const stats = fs.statSync(dbPath);
    console.log(`📊 数据库文件信息:`);
    console.log(`   文件路径: ${path.resolve(dbPath)}`);
    console.log(`   文件大小: ${stats.size} 字节 (${(stats.size/1024).toFixed(2)} KB)`);
    console.log(`   修改时间: ${stats.mtime.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})}`);
    console.log(`   创建时间: ${stats.birthtime.toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})}`);
    
    // 读取文件头部（SQLite文件格式标识）
    const buffer = fs.readFileSync(dbPath);
    const header = buffer.slice(0, 100).toString('ascii');
    
    console.log(`\n🔍 文件头部信息:`);
    console.log(`   SQLite标识: ${header.substring(0, 16)}`);
    
    if (header.startsWith('SQLite format 3')) {
      console.log('✅ 确认是有效的SQLite数据库文件');
      
      // 检查文件是否完全为空或损坏
      if (stats.size < 1024) {
        console.log('⚠️  警告：文件大小异常小，可能数据已丢失');
      } else {
        console.log('📈 文件大小正常，可能包含数据');
        
        // 简单检查文件是否包含一些常见的表名
        const content = buffer.toString('ascii', 0, Math.min(buffer.length, 10000));
        const tableNames = ['HanamiEvent', 'HanabiEvent', 'MatsuriEvent', 'Region'];
        
        console.log('\n🔍 在文件中搜索表名:');
        tableNames.forEach(tableName => {
          if (content.includes(tableName)) {
            console.log(`   ✅ 找到表: ${tableName}`);
          } else {
            console.log(`   ❌ 未找到表: ${tableName}`);
          }
        });
        
        // 检查是否有一些数据关键字
        const keywords = ['川口湖', '紫阳花', '水户', '河口湖', 'ハーブフェスティバル'];
        console.log('\n🔍 在文件中搜索数据关键字:');
        keywords.forEach(keyword => {
          if (content.includes(keyword)) {
            console.log(`   ✅ 找到关键字: ${keyword}`);
          } else {
            console.log(`   ❌ 未找到关键字: ${keyword}`);
          }
        });
      }
    } else {
      console.log('❌ 不是有效的SQLite数据库文件');
    }
    
  } catch (error) {
    console.error('❌ 检查文件时出错:', error.message);
  }
}

checkDatabaseFile(); 