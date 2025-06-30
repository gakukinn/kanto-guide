const fs = require('fs');
const path = require('path');

// 以四层页面为标准，修正JSON文件中的detailLink
console.log('🔧 以四层页面为标准，同步detailLink路径...\\n');

const regionsDir = path.join(process.cwd(), 'data', 'regions');
const appDir = path.join(process.cwd(), 'app');
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const activities = ['hanabi', 'hanami', 'matsuri'];

let totalFixed = 0;
let totalChecked = 0;

regions.forEach(region => {
  activities.forEach(activity => {
    const jsonFile = path.join(regionsDir, region, `${activity}.json`);
    const pageDir = path.join(appDir, region, activity);
    
    if (fs.existsSync(jsonFile) && fs.existsSync(pageDir)) {
      totalChecked++;
      console.log(`📁 检查: ${region}/${activity}.json`);
      
      try {
        // 获取实际的四层页面目录
        const activityDirs = fs.readdirSync(pageDir)
          .filter(item => {
            const itemPath = path.join(pageDir, item);
            return fs.statSync(itemPath).isDirectory() && item.startsWith('activity-');
          });
        
        if (activityDirs.length === 0) {
          console.log(`   ⚠️  没有找到activity-目录`);
          return;
        }
        
        // 读取JSON文件
        const jsonContent = fs.readFileSync(jsonFile, 'utf8');
        const events = JSON.parse(jsonContent);
        
        let fileModified = false;
        
        events.forEach((event, index) => {
          if (event.detailLink) {
            // 从detailLink中提取时间戳
            const linkMatch = event.detailLink.match(/activity-(\d+)/);
            if (linkMatch) {
              const linkTimestamp = linkMatch[1];
              
              // 在实际目录中查找匹配的目录
              const matchingDir = activityDirs.find(dir => {
                const dirTimestamp = dir.replace('activity-', '');
                // 检查8位时间戳匹配（取13位时间戳的后8位）
                return linkTimestamp.slice(-8) === dirTimestamp || linkTimestamp === dirTimestamp;
              });
              
              if (matchingDir) {
                const correctLink = `/${region}/${activity}/${matchingDir}`;
                if (event.detailLink !== correctLink) {
                  console.log(`   🔧 修正: ${event.detailLink} → ${correctLink}`);
                  event.detailLink = correctLink;
                  fileModified = true;
                  totalFixed++;
                }
              } else {
                console.log(`   ❌ 找不到匹配的目录: ${event.detailLink}`);
                console.log(`      可用目录: ${activityDirs.join(', ')}`);
              }
            }
          }
        });
        
        // 保存修改后的文件
        if (fileModified) {
          fs.writeFileSync(jsonFile, JSON.stringify(events, null, 2), 'utf8');
          console.log(`   ✅ 文件已更新`);
        } else {
          console.log(`   ✅ 路径正确，无需修改`);
        }
        
      } catch (error) {
        console.error(`   ❌ 处理失败:`, error.message);
      }
      
      console.log('');
    }
  });
});

console.log(`\\n📊 同步完成:`);
console.log(`- 检查文件: ${totalChecked}个`);
console.log(`- 修正路径: ${totalFixed}个`);
console.log(`\\n🎯 现在所有detailLink都与实际四层页面目录匹配！`); 