const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function fixDetailLinks() {
  console.log('🔧 修复数据库中的detailLink字段...\n');
  
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
    
    // 获取所有活动目录
    const activityDirs = fs.readdirSync(regionDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log(`   找到 ${activityDirs.length} 个活动目录`);
    
    for (const activityDir of activityDirs) {
      const activityPath = path.join(regionDir, activityDir);
      const pagePath = path.join(activityPath, 'page.tsx');
      
      if (!fs.existsSync(pagePath)) {
        console.log(`   ⚠️  页面文件不存在: ${pagePath}`);
        continue;
      }
      
      // 读取页面文件内容，提取活动ID
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // 尝试从页面内容中提取活动ID
      let activityId = null;
      
      // 方法1: 从目录名提取（如果是activity-xxx格式）
      if (activityDir.startsWith('activity-')) {
        const shortId = activityDir.replace('activity-', '');
        // 在数据库中查找包含这个短ID的活动
        const events = await prisma.hanabiEvent.findMany({
          where: { 
            region: region,
            id: { contains: shortId }
          }
        });
        
        if (events.length > 0) {
          activityId = events[0].id;
        }
      }
      
      // 方法2: 从目录名直接使用（如果是完整ID）
      if (!activityId && activityDir.startsWith('cmc')) {
        const events = await prisma.hanabiEvent.findMany({
          where: { 
            region: region,
            id: activityDir
          }
        });
        
        if (events.length > 0) {
          activityId = events[0].id;
        }
      }
      
      // 方法3: 从页面内容中提取ID
      if (!activityId) {
        const idMatch = pageContent.match(/id:\s*['"`]([^'"`]+)['"`]/);
        if (idMatch) {
          activityId = idMatch[1];
        }
      }
      
      if (activityId) {
        // 构建detailLink
        const detailLink = `/${region}/hanabi/${activityDir}`;
        
        // 更新数据库
        try {
          const result = await prisma.hanabiEvent.update({
            where: { id: activityId },
            data: { detailLink: detailLink }
          });
          
          console.log(`   ✅ 修复: ${result.name}`);
          console.log(`      → ${detailLink}`);
          totalFixed++;
        } catch (error) {
          console.log(`   ❌ 更新失败: ${activityId} - ${error.message}`);
        }
      } else {
        console.log(`   ⚠️  无法确定活动ID: ${activityDir}`);
      }
    }
    
    console.log('');
  }
  
  console.log(`🎉 修复完成！总共修复了 ${totalFixed} 个链接`);
  await prisma.$disconnect();
}

fixDetailLinks().catch(console.error); 