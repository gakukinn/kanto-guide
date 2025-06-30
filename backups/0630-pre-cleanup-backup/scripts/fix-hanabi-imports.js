const fs = require('fs');
const path = require('path');

async function fixHanabiImports() {
  console.log('\n🔧 修复花火页面的导入问题');
  console.log('=' .repeat(50));

  const dataDir = path.join(process.cwd(), 'data', 'activities');
  const files = fs.readdirSync(dataDir).filter(file => 
    file.includes('hanabi') && file.endsWith('.json')
  );
  
  console.log(`📊 找到 ${files.length} 个花火活动文件`);
  
  let processedCount = 0;
  let fixedCount = 0;
  let skipCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.detailLink) {
      continue;
    }
    
    processedCount++;
    console.log(`\n📁 处理 ${processedCount}: ${data.name}`);
    
    // 解析页面路径
    const pathParts = data.detailLink.split('/');
    const detailPageFolder = pathParts[pathParts.length - 1];
    const pagePath = path.join(process.cwd(), 'app', data.region, 'hanabi', detailPageFolder, 'page.tsx');
    
    if (!fs.existsSync(pagePath)) {
      console.log('   ⚠️ 页面文件不存在，跳过');
      skipCount++;
      continue;
    }
    
    try {
      // 读取页面文件
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // 检查是否有错误的导入
      if (pageContent.includes("import { WalkerPlusHanabiTemplate }")) {
        // 修复导入：从命名导入改为默认导入
        const fixedContent = pageContent.replace(
          "import { WalkerPlusHanabiTemplate } from '@/src/components/WalkerPlusHanabiTemplate';",
          "import WalkerPlusHanabiTemplate from '@/src/components/WalkerPlusHanabiTemplate';"
        );
        
        // 写回文件
        fs.writeFileSync(pagePath, fixedContent, 'utf8');
        
        console.log('   ✅ 修复导入问题');
        fixedCount++;
      } else if (pageContent.includes("import WalkerPlusHanabiTemplate from")) {
        console.log('   ✓ 导入已正确');
        skipCount++;
      } else {
        console.log('   ⚠️ 未检测到WalkerPlusHanabiTemplate导入');
        skipCount++;
      }
      
    } catch (error) {
      console.log(`   ❌ 修复失败: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 导入修复完成！');
  console.log(`📊 修复统计:`);
  console.log(`   处理页面: ${processedCount} 个`);
  console.log(`   修复成功: ${fixedCount} 个`);
  console.log(`   跳过: ${skipCount} 个`);
  
  if (fixedCount > 0) {
    console.log('\n💡 建议：');
    console.log('1. 重新启动开发服务器：npm run dev');
    console.log('2. 测试页面是否正常显示');
  }
}

if (require.main === module) {
  fixHanabiImports().catch(console.error);
}

module.exports = { fixHanabiImports }; 