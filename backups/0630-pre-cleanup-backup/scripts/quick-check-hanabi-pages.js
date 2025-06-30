const fs = require('fs');
const path = require('path');

async function quickCheckHanabiPages() {
  console.log('\n🔍 快速检查花火页面状态');
  console.log('=' .repeat(50));

  const dataDir = path.join(process.cwd(), 'data', 'activities');
  const files = fs.readdirSync(dataDir).filter(file => 
    file.includes('hanabi') && file.endsWith('.json')
  );
  
  console.log(`📊 找到 ${files.length} 个花火数据文件`);
  
  let withDetailLink = 0;
  let withoutDetailLink = 0;
  let withFullDescription = 0;
  let withBasicDescription = 0;
  
  // 检查前5个文件作为样本
  const sampleFiles = files.slice(0, 5);
  
  for (const file of sampleFiles) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log(`\n📁 ${file}`);
    console.log(`   名称: ${data.name}`);
    console.log(`   地区: ${data.region}`);
    console.log(`   detailLink: ${data.detailLink ? '✅ 有' : '❌ 无'}`);
    console.log(`   description长度: ${data.description ? data.description.length : 0} 字符`);
    console.log(`   打ち上げ数: ${data.fireworksCount || '未设置'}`);
    console.log(`   打ち上げ時間: ${data.fireworksTime || '未设置'}`);
    
    if (data.detailLink) {
      withDetailLink++;
      
      // 检查对应页面文件是否存在
      const pathParts = data.detailLink.split('/');
      const detailPageFolder = pathParts[pathParts.length - 1];
      const pagePath = path.join(process.cwd(), 'app', data.region, 'hanabi', detailPageFolder, 'page.tsx');
      console.log(`   页面文件: ${fs.existsSync(pagePath) ? '✅ 存在' : '❌ 不存在'}`);
      
      if (fs.existsSync(pagePath)) {
        const pageContent = fs.readFileSync(pagePath, 'utf8');
        console.log(`   使用模板: ${pageContent.includes('WalkerPlusHanabiTemplate') ? '✅ WalkerPlusHanabiTemplate' : '❌ 其他模板'}`);
      }
    } else {
      withoutDetailLink++;
    }
    
    if (data.description && data.description.length > 100) {
      withFullDescription++;
    } else {
      withBasicDescription++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 检查结果（样本统计）:');
  console.log(`   有detailLink: ${withDetailLink}/${sampleFiles.length}`);
  console.log(`   无detailLink: ${withoutDetailLink}/${sampleFiles.length}`);
  console.log(`   有完整描述: ${withFullDescription}/${sampleFiles.length}`);
  console.log(`   描述简单: ${withBasicDescription}/${sampleFiles.length}`);
  
  console.log('\n💡 建议：');
  if (withoutDetailLink > 0) {
    console.log('1. 部分文件缺少detailLink，需要先生成页面');
  }
  if (withBasicDescription > 0) {
    console.log('2. 部分文件描述较短，可能需要丰富内容');
  }
  console.log('3. 检查浏览器中的实际显示效果');
}

if (require.main === module) {
  quickCheckHanabiPages().catch(console.error);
}

module.exports = { quickCheckHanabiPages }; 