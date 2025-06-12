#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkAllJulyWebsites() {
  const dataDir = path.join(process.cwd(), 'src/data');
  
  // 获取所有7月文件
  const julyFiles = fs.readdirSync(dataDir).filter(file => 
    file.startsWith('level5-july') && file.endsWith('.ts')
  );

  console.log(`\n📊 7月花火详细页面统计:`);
  console.log(`总数: ${julyFiles.length} 个文件\n`);

  const results = {
    total: julyFiles.length,
    withOfficialWebsite: 0,
    withAnyWebsite: 0,
    withoutWebsite: 0,
    websites: [],
    missing: []
  };

  julyFiles.forEach((file, index) => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取名称
    const fileName = file.replace('level5-july-hanabi-', '').replace('.ts', '');
    
    // 检查website字段
    const websiteMatch = content.match(/website:\s*['"]([^'"]+)['"]/);
    
    if (websiteMatch) {
      const url = websiteMatch[1];
      const isOfficial = url.includes('.go.jp') || url.includes('.city.jp') || 
                        url.includes('.lg.jp') || url.includes('.or.jp');
      
      results.withAnyWebsite++;
      if (isOfficial) {
        results.withOfficialWebsite++;
        results.websites.push({
          file: fileName,
          url: url,
          type: 'official'
        });
        console.log(`✅ ${index + 1}. ${fileName} - 官方网站: ${url}`);
      } else {
        results.websites.push({
          file: fileName,
          url: url,
          type: 'non-official'
        });
        console.log(`⚠️  ${index + 1}. ${fileName} - 非官方网站: ${url}`);
      }
    } else {
      results.withoutWebsite++;
      results.missing.push(fileName);
      console.log(`❌ ${index + 1}. ${fileName} - 缺少网站信息`);
    }
  });

  console.log(`\n📋 汇总结果:`);
  console.log(`总文件数: ${results.total}`);
  console.log(`有官方网站: ${results.withOfficialWebsite} (${(results.withOfficialWebsite/results.total*100).toFixed(1)}%)`);
  console.log(`有任何网站: ${results.withAnyWebsite} (${(results.withAnyWebsite/results.total*100).toFixed(1)}%)`);
  console.log(`缺少网站: ${results.withoutWebsite} (${(results.withoutWebsite/results.total*100).toFixed(1)}%)`);

  if (results.missing.length > 0) {
    console.log(`\n❌ 缺少网站信息的文件 (${results.missing.length}个):`);
    results.missing.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
  }

  // 保存详细报告
  const reportPath = path.join(process.cwd(), 'july-websites-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 详细报告已保存至: ${reportPath}`);

  return results;
}

if (require.main === module) {
  checkAllJulyWebsites();
}

module.exports = { checkAllJulyWebsites }; 