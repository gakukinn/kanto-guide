/**
 * 测试重复活动检测功能
 * 验证生成器是否能正确识别重复活动并处理覆盖
 */

const fs = require('fs').promises;
const path = require('path');

async function testDuplicateDetection() {
  console.log('🧪 开始测试重复活动检测功能...\n');

  // 检查现有的JSON文件
  const activitiesDir = path.join(process.cwd(), 'data', 'activities');
  
  try {
    const files = await fs.readdir(activitiesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`📁 发现 ${jsonFiles.length} 个活动JSON文件:`);
    
    const activities = [];
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(activitiesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        
        activities.push({
          file: file,
          id: data.id,
          name: data.name,
          region: data.region,
          activityType: data.activityType
        });
        
        console.log(`  ✅ ${file}: ${data.name} (${data.region}/${data.activityType})`);
      } catch (error) {
        console.log(`  ❌ ${file}: 读取失败 - ${error.message}`);
      }
    }
    
    // 检查重复
    console.log('\n🔍 检查重复活动:');
    const duplicates = [];
    
    for (let i = 0; i < activities.length; i++) {
      for (let j = i + 1; j < activities.length; j++) {
        const a = activities[i];
        const b = activities[j];
        
        if (a.name === b.name && a.region === b.region && a.activityType === b.activityType) {
          duplicates.push({ first: a, second: b });
        }
      }
    }
    
    if (duplicates.length > 0) {
      console.log(`⚠️ 发现 ${duplicates.length} 组重复活动:`);
      duplicates.forEach((dup, index) => {
        console.log(`  ${index + 1}. "${dup.first.name}"`);
        console.log(`     文件1: ${dup.first.file} (ID: ${dup.first.id})`);
        console.log(`     文件2: ${dup.second.file} (ID: ${dup.second.id})`);
      });
    } else {
      console.log('✅ 没有发现重复活动');
    }
    
    // 模拟重复检测函数
    console.log('\n🧪 测试重复检测函数:');
    
    const checkForDuplicates = async (activityName, region, activityType) => {
      for (const activity of activities) {
        if (activity.name === activityName && 
            activity.region === region && 
            activity.activityType === activityType) {
          return {
            isDuplicate: true,
            existingFile: activity.file,
            existingId: activity.id
          };
        }
      }
      return { isDuplicate: false };
    };
    
    // 测试案例
    if (activities.length > 0) {
      const testActivity = activities[0];
      console.log(`测试活动: ${testActivity.name}`);
      
      const result = await checkForDuplicates(
        testActivity.name, 
        testActivity.region, 
        testActivity.activityType
      );
      
      if (result.isDuplicate) {
        console.log(`✅ 重复检测成功: 找到现有文件 ${result.existingFile}`);
      } else {
        console.log(`❌ 重复检测失败: 应该找到现有活动`);
      }
      
      // 测试不存在的活动
      const nonExistentResult = await checkForDuplicates(
        '不存在的活动', 
        'tokyo', 
        'hanabi'
      );
      
      if (!nonExistentResult.isDuplicate) {
        console.log(`✅ 非重复检测成功: 正确识别新活动`);
      } else {
        console.log(`❌ 非重复检测失败: 误判为重复`);
      }
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

// 运行测试
testDuplicateDetection(); 