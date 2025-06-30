const fs = require('fs');
const path = require('path');

// 找到所有花火页面目录
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const appDir = './app';

console.log('开始修复花火页面导入路径...');

let fixedCount = 0;
let totalCount = 0;

regions.forEach(region => {
  const regionHanabiDir = path.join(appDir, region, 'hanabi');
  
  if (!fs.existsSync(regionHanabiDir)) {
    console.log(`❌ 地区目录不存在: ${regionHanabiDir}`);
    return;
  }

  // 获取该地区的所有花火活动目录
  const activityDirs = fs.readdirSync(regionHanabiDir)
    .filter(item => {
      const itemPath = path.join(regionHanabiDir, item);
      return fs.statSync(itemPath).isDirectory() && item.startsWith('activity-');
    });

  console.log(`\n📍 检查 ${region} 地区的 ${activityDirs.length} 个花火页面...`);

  activityDirs.forEach(activityDir => {
    const pageFile = path.join(regionHanabiDir, activityDir, 'page.tsx');
    totalCount++;
    
    if (fs.existsSync(pageFile)) {
      try {
        let content = fs.readFileSync(pageFile, 'utf8');
        
        // 检查是否有错误的导入路径
        const wrongImport = `import WalkerPlusHanabiTemplate from '@/src/components/WalkerPlusHanabiTemplate';`;
        const correctImport = `import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';`;
        
        if (content.includes(wrongImport)) {
          // 替换错误的导入路径
          content = content.replace(wrongImport, correctImport);
          
          // 写回文件
          fs.writeFileSync(pageFile, content, 'utf8');
          
          console.log(`  ✅ 修复: ${activityDir}/page.tsx`);
          fixedCount++;
        } else if (content.includes(correctImport)) {
          console.log(`  ✓ 已正确: ${activityDir}/page.tsx`);
        } else {
          console.log(`  ⚠️ 未找到预期的导入: ${activityDir}/page.tsx`);
        }
      } catch (error) {
        console.error(`  ❌ 处理文件失败 ${pageFile}:`, error.message);
      }
    } else {
      console.log(`  ❌ 页面文件不存在: ${pageFile}`);
    }
  });
});

console.log('\n📊 修复结果统计:');
console.log(`总计检查页面: ${totalCount}`);
console.log(`修复成功页面: ${fixedCount}`);
console.log(`未修复页面: ${totalCount - fixedCount}`);

if (fixedCount > 0) {
  console.log('\n🎉 导入路径修复完成！现在所有花火页面都应该能正常工作了。');
  console.log('\n💡 建议:');
  console.log('1. 重新启动开发服务器: npm run dev');
  console.log('2. 测试几个花火页面确认修复效果');
} else {
  console.log('\n⚠️ 没有找到需要修复的文件，请检查是否有其他导入问题。');
} 