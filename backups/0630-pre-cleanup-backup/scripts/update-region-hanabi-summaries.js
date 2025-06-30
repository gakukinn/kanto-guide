const fs = require('fs');
const path = require('path');

async function updateRegionHanabiSummaries() {
  console.log('\n🔄 更新地区花火汇总数据');
  console.log('=' .repeat(50));

  const dataDir = path.join(process.cwd(), 'data', 'activities');
  const regionsDir = path.join(process.cwd(), 'data', 'regions');
  
  // 读取所有花火活动文件
  const files = fs.readdirSync(dataDir).filter(file => 
    file.includes('hanabi') && file.endsWith('.json')
  );
  
  console.log(`📊 找到 ${files.length} 个花火活动文件`);
  
  // 按地区分组活动
  const activitiesByRegion = {};
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.region && data.detailLink) {
      if (!activitiesByRegion[data.region]) {
        activitiesByRegion[data.region] = [];
      }
      
      // 创建活动摘要
      const activitySummary = {
        id: data.id,
        name: data.name,
        date: data.date || '详见官网',
        venue: data.venue || data.address || '详见官网',
        detailLink: data.detailLink,
        fireworksCount: data.fireworksCount || '详见官网',
        expectedVisitors: data.expectedVisitors || '详见官网',
        description: data.description ? data.description.substring(0, 100) + '...' : '',
        status: data.status || 'scheduled',
        themeColor: data.themeColor || 'red'
      };
      
      activitiesByRegion[data.region].push(activitySummary);
    }
  }
  
  console.log('\n📍 按地区统计:');
  Object.entries(activitiesByRegion).forEach(([region, activities]) => {
    console.log(`   ${region}: ${activities.length} 个活动`);
  });
  
  // 更新每个地区的花火汇总文件
  let updatedRegions = 0;
  
  for (const [region, activities] of Object.entries(activitiesByRegion)) {
    const regionHanabiFile = path.join(regionsDir, region, 'hanabi.json');
    
    try {
      // 读取现有数据或创建新数据
      let regionData = {};
      if (fs.existsSync(regionHanabiFile)) {
        regionData = JSON.parse(fs.readFileSync(regionHanabiFile, 'utf8'));
      }
      
      // 更新活动列表
      regionData.activities = activities;
      regionData.lastUpdated = new Date().toISOString();
      regionData.totalCount = activities.length;
      regionData.regionKey = region;
      regionData.activityType = 'hanabi';
      
      // 确保目录存在
      const regionDir = path.join(regionsDir, region);
      if (!fs.existsSync(regionDir)) {
        fs.mkdirSync(regionDir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(regionHanabiFile, JSON.stringify(regionData, null, 2), 'utf8');
      
      console.log(`✅ 更新 ${region}/hanabi.json (${activities.length} 个活动)`);
      updatedRegions++;
      
    } catch (error) {
      console.log(`❌ 更新 ${region}/hanabi.json 失败: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🏁 地区汇总更新完成！');
  console.log(`📊 更新统计:`);
  console.log(`   更新地区: ${updatedRegions} 个`);
  console.log(`   总活动数: ${files.length} 个`);
  
  console.log('\n💡 现在您可以访问：');
  Object.keys(activitiesByRegion).forEach(region => {
    console.log(`   ${region}花火列表: http://localhost:3002/${region}/hanabi`);
  });
}

if (require.main === module) {
  updateRegionHanabiSummaries().catch(console.error);
}

module.exports = { updateRegionHanabiSummaries }; 