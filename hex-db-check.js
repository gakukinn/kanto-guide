const fs = require('fs');

function searchForDataInDB() {
  const dbPath = 'prisma/dev.db';
  
  try {
    console.log('=== 十六进制数据搜索 ===\n');
    
    const buffer = fs.readFileSync(dbPath);
    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 50000));
    
    // 搜索可能的数据残留
    const searchTerms = [
      '河口湖',
      'ハーブフェスティバル',
      '紫阳花', 
      '水戸',
      'kawaguchi',
      'herb',
      'festival',
      'hanami',
      'matsuri',
      'HanamiEvent',
      'CREATE TABLE',
      'INSERT INTO',
      'Region',
      'Event'
    ];
    
    console.log('🔍 在数据库文件中搜索关键字:');
    
    let foundAny = false;
    searchTerms.forEach(term => {
      if (content.includes(term)) {
        console.log(`   ✅ 找到: "${term}"`);
        foundAny = true;
        
        // 显示上下文
        const index = content.indexOf(term);
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + term.length + 50);
        const context = content.substring(start, end)
          .replace(/[^\x20-\x7E\u4e00-\u9fff]/g, '.')  // 替换不可打印字符
          .substring(0, 100);
        console.log(`      上下文: ...${context}...`);
      }
    });
    
    if (!foundAny) {
      console.log('   ❌ 未找到任何关键字');
    }
    
    // 检查数据库是否完全为空
    const nullBytes = buffer.filter(byte => byte === 0).length;
    const totalBytes = buffer.length;
    const emptyPercentage = (nullBytes / totalBytes * 100).toFixed(2);
    
    console.log(`\n📊 数据库文件分析:`);
    console.log(`   总字节数: ${totalBytes}`);
    console.log(`   空字节数: ${nullBytes} (${emptyPercentage}%)`);
    console.log(`   数据密度: ${(100 - emptyPercentage).toFixed(2)}%`);
    
    if (emptyPercentage > 80) {
      console.log('   ⚠️  数据库大部分为空，数据可能已被清除');
    } else {
      console.log('   ✅ 数据库包含大量数据，可能有恢复机会');
    }
    
    // 查找SQLite页头信息
    console.log(`\n🔍 SQLite页面分析:`);
    let pageCount = 0;
    for (let i = 0; i < buffer.length; i += 4096) { // SQLite默认页面大小
      const pageHeader = buffer.slice(i, i + 16).toString('ascii');
      if (pageHeader.includes('SQLite') || i === 0) {
        pageCount++;
        if (pageCount <= 5) { // 只显示前5个页面
          console.log(`   页面 ${pageCount}: ${pageHeader.substring(0, 20).replace(/[^\x20-\x7E]/g, '.')}`);
        }
      }
    }
    console.log(`   总页面数: ~${Math.ceil(buffer.length / 4096)}`);
    
  } catch (error) {
    console.error('❌ 检查文件时出错:', error.message);
  }
}

searchForDataInDB(); 