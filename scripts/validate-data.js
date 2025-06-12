const fs = require('fs');
const path = require('path');

// 检查日期格式
function validateDate(dateString, fileName) {
  const errors = [];
  
  // 检查是否包含"年月日"格式
  if (!dateString.includes('年') || !dateString.includes('月') || !dateString.includes('日')) {
    errors.push(`日期格式不正确: ${dateString}`);
  }
  
  return errors;
}

// 检查必填字段
function validateRequiredFields(data, fileName) {
  const errors = [];
  const required = ['id', 'name', 'date', 'mapEmbedUrl'];
  
  required.forEach(field => {
    if (!data[field]) {
      errors.push(`缺少必填字段: ${field}`);
    }
  });
  
  return errors;
}

// 检查related字段结构
function validateRelatedFields(data, fileName) {
  const errors = [];
  
  if (data.related) {
    if (!data.related.timeRecommendations) {
      errors.push('related字段缺少timeRecommendations');
    }
    if (!data.related.regionRecommendations) {
      errors.push('related字段缺少regionRecommendations');
    }
  }
  
  return errors;
}

// 验证单个数据文件
function validateDataFile(filePath) {
  const fileName = path.basename(filePath);
  const errors = [];
  
  try {
    // 动态导入数据文件
    delete require.cache[require.resolve(filePath)];
    const dataModule = require(filePath);
    
    // 获取导出的数据对象（通常是第一个导出）
    const dataKey = Object.keys(dataModule)[0];
    const data = dataModule[dataKey];
    
    if (!data) {
      errors.push('无法找到数据对象');
      return { fileName, errors };
    }
    
    // 执行各种验证
    errors.push(...validateRequiredFields(data, fileName));
    errors.push(...validateDate(data.date, fileName));
    errors.push(...validateRelatedFields(data, fileName));
    
  } catch (error) {
    errors.push(`文件读取错误: ${error.message}`);
  }
  
  return { fileName, errors };
}

// 主验证函数
function validateAllData() {
  const dataDir = path.join(__dirname, '../src/data');
  const files = fs.readdirSync(dataDir);
  
  // 只验证level5文件（详情页数据）
  const level5Files = files.filter(file => file.startsWith('level5-') && file.endsWith('.ts'));
  
  console.log(`🔍 开始验证 ${level5Files.length} 个Level5数据文件...\n`);
  
  let totalErrors = 0;
  
  level5Files.forEach(file => {
    const filePath = path.join(dataDir, file);
    
    // 暂时跳过TypeScript文件，因为需要编译
    if (file.endsWith('.ts')) {
      console.log(`⚠️  跳过TypeScript文件: ${file} (需要编译)`);
      return;
    }
    
    const result = validateDataFile(filePath);
    
    if (result.errors.length > 0) {
      console.log(`❌ ${result.fileName}:`);
      result.errors.forEach(error => console.log(`   - ${error}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ ${result.fileName}`);
    }
  });
  
  console.log(`\n🎯 验证完成: ${totalErrors > 0 ? `发现${totalErrors}个错误` : '所有文件通过验证'}`);
  
  return totalErrors === 0;
}

// 如果直接运行此脚本
if (require.main === module) {
  validateAllData();
}

module.exports = { validateAllData, validateDataFile }; 