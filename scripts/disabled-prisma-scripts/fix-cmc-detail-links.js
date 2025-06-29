const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function fixCmcDetailLinks() {
  console.log('🔧 修复CMC开头页面的detailLink字段...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
  let totalFixed = 0;
  
  for (const region of regions) {
    console.log(`📍 检查 ${region.toUpperCase()} 地区...`);
    
    // 查找该地区的花火页面目录
    const regionDir = path.join('app', region, 'hanabi');
    
    if (!fs.existsSync(regionDir)) {
      console.log(`   ⚠️  目录不存在: ${regionDir}`);
      continue;
    }
    
    // 获取所有CMC活动目录
    const activityDirs = fs.readdirSync(regionDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('cmc'))
      .map(dirent => dirent.name);
    
    console.log(`   找到 ${activityDirs.length} 个CMC活动目录`);
    
    for (const activityDir of activityDirs) {
      const activityPath = path.join(regionDir, activityDir);
      const pagePath = path.join(activityPath, 'page.tsx');
      
      if (!fs.existsSync(pagePath)) {
        console.log(`   ⚠️  页面文件不存在: ${pagePath}`);
        continue;
      }
      
      // 读取页面文件内容，提取活动名称和ID
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // 从页面内容中提取活动名称
      let activityName = null;
      let activityId = null;
      
      // 提取name字段
      const nameMatch = pageContent.match(/"name":\s*"([^"]+)"/);
      if (nameMatch) {
        activityName = nameMatch[1];
      }
      
      // 提取id字段
      const idMatch = pageContent.match(/"id":\s*"([^"]+)"/);
      if (idMatch) {
        activityId = idMatch[1];
      }
      
      console.log(`   🔍 处理: ${activityDir}`);
      console.log(`      名称: ${activityName}`);
      console.log(`      ID: ${activityId}`);
      
      if (activityName) {
        // 在数据库中查找匹配的活动（通过名称）
        const events = await prisma.hanabiEvent.findMany({
          where: { 
            region: region,
            name: { contains: activityName.split('（')[0] } // 只用中文部分匹配
          }
        });
        
        console.log(`      数据库匹配: ${events.length} 条记录`);
        
        if (events.length > 0) {
          const dbEvent = events[0];
          console.log(`      匹配到: ${dbEvent.name}`);
          
          // 构建detailLink
          const detailLink = `/${region}/hanabi/${activityDir}`;
          
          // 更新数据库
          try {
            const result = await prisma.hanabiEvent.update({
              where: { id: dbEvent.id },
              data: { detailLink: detailLink }
            });
            
            console.log(`   ✅ 修复: ${result.name}`);
            console.log(`      → ${detailLink}`);
            totalFixed++;
          } catch (error) {
            console.log(`   ❌ 更新失败: ${dbEvent.id} - ${error.message}`);
          }
        } else {
          console.log(`   ⚠️  数据库中未找到匹配的活动`);
        }
      } else {
        console.log(`   ⚠️  无法提取活动名称`);
      }
      
      console.log('');
    }
  }
  
  console.log(`🎉 修复完成！总共修复了 ${totalFixed} 个CMC链接`);
  await prisma.$disconnect();
}

fixCmcDetailLinks().catch(console.error); 