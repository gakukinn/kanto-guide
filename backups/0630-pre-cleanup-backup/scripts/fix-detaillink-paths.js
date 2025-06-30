const fs = require('fs');
const path = require('path');

// 批量修复detailLink路径脚本
console.log('🔧 开始批量修复detailLink路径...\n');

// 获取所有地区JSON文件
const regionsDir = path.join(process.cwd(), 'data', 'regions');
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const activities = ['hanabi', 'hanami', 'matsuri'];

let totalFixed = 0;
let totalChecked = 0;

regions.forEach(region => {
  activities.forEach(activity => {
    const jsonFile = path.join(regionsDir, region, `${activity}.json`);
    
    if (fs.existsSync(jsonFile)) {
      totalChecked++;
      console.log(`📁 检查文件: ${region}/${activity}.json`);
      
      try {
        // 读取JSON文件
        const jsonContent = fs.readFileSync(jsonFile, 'utf8');
        const events = JSON.parse(jsonContent);
        
        let fileModified = false;
        
        // 检查每个事件的detailLink
        events.forEach((event, index) => {
          if (event.detailLink) {
            let originalPath = event.detailLink;
            let fixedPath = originalPath;
            let needsFix = false;
            
            // 修复1: 移除/app/前缀
            if (fixedPath.startsWith('/app/')) {
              fixedPath = fixedPath.replace('/app/', '/');
              needsFix = true;
              console.log(`  🔧 修复/app/前缀: ${originalPath} → ${fixedPath}`);
            }
            
            // 修复2: 将13位时间戳改为8位时间戳
            const timestampMatch = fixedPath.match(/activity-(\d{13,})/);
            if (timestampMatch) {
              const fullTimestamp = timestampMatch[1];
              if (fullTimestamp.length > 8) {
                const shortTimestamp = fullTimestamp.slice(-8);
                const newPath = fixedPath.replace(`activity-${fullTimestamp}`, `activity-${shortTimestamp}`);
                
                // 检查对应的目录是否存在
                const expectedDir = path.join('app', region, activity, `activity-${shortTimestamp}`);
                if (fs.existsSync(expectedDir)) {
                  fixedPath = newPath;
                  needsFix = true;
                  console.log(`  🔧 修复时间戳长度: ${timestampMatch[0]} → activity-${shortTimestamp}`);
                } else {
                  console.log(`  ⚠️ 目录不存在，跳过时间戳修复: ${expectedDir}`);
                }
              }
            }
            
            if (needsFix) {
              event.detailLink = fixedPath;
              console.log(`  ✅ 最终路径: ${fixedPath}`);
              fileModified = true;
              totalFixed++;
            } else {
              console.log(`  ✅ 路径正确: ${originalPath}`);
            }
          } else {
            console.log(`  ⚠️ 缺少detailLink字段`);
          }
        });
        
        // 如果文件被修改，保存回去
        if (fileModified) {
          fs.writeFileSync(jsonFile, JSON.stringify(events, null, 2), 'utf8');
          console.log(`  💾 文件已更新保存\n`);
        } else {
          console.log(`  ✨ 文件无需修改\n`);
        }
        
      } catch (error) {
        console.error(`  ❌ 处理文件失败: ${error.message}\n`);
      }
    } else {
      console.log(`  ⚠️ 文件不存在: ${region}/${activity}.json\n`);
    }
  });
});

console.log('📊 修复完成统计:');
console.log(`- 检查文件数: ${totalChecked}`);
console.log(`- 修复路径数: ${totalFixed}`);
console.log(`- 修复完成! ${totalFixed > 0 ? '🎉' : '✨'}`); 