const fs = require('fs');
const path = require('path');

console.log('开始修复花火页面的面包屑和图片问题...');

// 找到所有花火页面目录
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const appDir = './app';

let fixedCount = 0;
let totalCount = 0;

regions.forEach(regionKey => {
  const regionHanabiDir = path.join(appDir, regionKey, 'hanabi');
  
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

  console.log(`\n📍 检查 ${regionKey} 地区的 ${activityDirs.length} 个花火页面...`);

  activityDirs.forEach(activityDir => {
    const pageFile = path.join(regionHanabiDir, activityDir, 'page.tsx');
    totalCount++;

    if (!fs.existsSync(pageFile)) {
      console.log(`❌ 页面文件不存在: ${pageFile}`);
      return;
    }

    try {
      let content = fs.readFileSync(pageFile, 'utf-8');

      // 检查是否需要修复
      const needsBreadcrumbFix = !content.includes('regionKey=') || !content.includes('activityKey=');
      const needsImageFix = content.includes('"images": []') && !content.includes('"media"');

      if (needsBreadcrumbFix || needsImageFix) {
        console.log(`🔧 修复页面: ${activityDir}`);

        // 修复面包屑参数
        if (needsBreadcrumbFix) {
          // 查找模板调用行
          const templateCallMatch = content.match(/return <WalkerPlusHanabiTemplate data={activityData}([^>]*)\s*\/>;/);
          
          if (templateCallMatch) {
            const newTemplateCall = `return <WalkerPlusHanabiTemplate 
    data={activityData} 
    regionKey="${regionKey}" 
    activityKey="hanabi" 
  />;`;
            
            content = content.replace(
              /return <WalkerPlusHanabiTemplate data={activityData}([^>]*)\s*\/>;/,
              newTemplateCall
            );
            console.log(`  ✅ 修复面包屑参数`);
          }
        }

        // 修复图片数据
        if (needsImageFix) {
          // 查找 images 字段并替换为 media 字段
          const imagesMatch = content.match(/"images": \[\]/);
          
          if (imagesMatch) {
            // 添加默认的 media 字段（空数组，稍后可以通过其他方式添加图片）
            content = content.replace(
              /"images": \[\]/,
              '"media": []'
            );
            console.log(`  ✅ 修复图片字段`);
          }
        }

        // 写入修复后的内容
        fs.writeFileSync(pageFile, content, 'utf-8');
        fixedCount++;
      } else {
        console.log(`✅ 页面已正确: ${activityDir}`);
      }

    } catch (error) {
      console.error(`❌ 处理页面时出错 ${pageFile}:`, error.message);
    }
  });
});

console.log(`\n🎉 修复完成！`);
console.log(`📊 统计：`);
console.log(`   总计检查: ${totalCount} 个页面`);
console.log(`   成功修复: ${fixedCount} 个页面`);
console.log(`   无需修复: ${totalCount - fixedCount} 个页面`);

if (fixedCount > 0) {
  console.log(`\n✨ 修复内容：`);
  console.log(`   1. 添加了 regionKey 和 activityKey 参数，修复面包屑导航`);
  console.log(`   2. 将 images 字段改为 media 字段，为图片显示做准备`);
  console.log(`\n🔄 请重新启动开发服务器测试修复效果`);
} 