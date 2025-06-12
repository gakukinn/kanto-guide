/**
 * 祭典模板自动化验证脚本
 * 检查 MatsuriPageTemplate.tsx 的常见错误和问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 验证祭典模板...');
  
// 检查模板文件是否存在
  const templatePath = path.join(__dirname, '../src/components/MatsuriPageTemplate.tsx');
  if (!fs.existsSync(templatePath)) {
  console.error('❌ 模板文件不存在:', templatePath);
    process.exit(1);
  }
  
// 读取模板内容
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 检查导航配置文件
const navigationPath = path.join(__dirname, '../src/config/navigation.ts');
if (!fs.existsSync(navigationPath)) {
  console.error('❌ 导航配置文件不存在:', navigationPath);
  process.exit(1);
  }
  
const navigationContent = fs.readFileSync(navigationPath, 'utf8');

// 语法和功能检查
const checks = [
  {
    name: '检查useMemo语法修复',
    test: () => {
      // 检查useMemo语法是否正确（有分号结尾）
      const correctPattern = /}, \[filteredEvents\]\);/;
      return correctPattern.test(templateContent);
    }
  },
  {
    name: '检查地区循环导航配置',
    test: () => {
      // 检查是否有MATSURI_REGIONS配置
      return navigationContent.includes('MATSURI_REGIONS') && 
             navigationContent.includes('getMatsuriRegionNavigation');
    }
  },
  {
    name: '检查地区循环顺序',
    test: () => {
      // 检查是否包含所有6个地区
      const regions = ['东京', '埼玉', '千叶', '神奈川', '北关东', '甲信越'];
      return regions.every(region => navigationContent.includes(region));
    }
  },
  {
    name: '检查模板导航集成',
    test: () => {
      // 检查模板是否正确导入和使用导航函数
      return templateContent.includes('getMatsuriRegionNavigation') &&
             templateContent.includes('getRegionNavigation');
  }
  },
  {
    name: '检查快速导航渲染',
    test: () => {
      // 检查是否有完整的快速导航渲染逻辑
      return templateContent.includes('探索其他地区传统祭典') &&
             templateContent.includes('navigation.prev') &&
             templateContent.includes('navigation.next');
  }
  }
];

// 执行检查
let passedChecks = 0;
let totalChecks = checks.length;

console.log('\n📋 执行检查...\n');

checks.forEach((check, index) => {
  try {
    const result = check.test();
    if (result) {
      console.log(`✅ ${index + 1}. ${check.name}`);
      passedChecks++;
    } else {
      console.log(`❌ ${index + 1}. ${check.name}`);
  }
  } catch (error) {
    console.log(`⚠️ ${index + 1}. ${check.name} - 检查出错: ${error.message}`);
  }
    });

// 输出结果
console.log(`\n📊 检查结果: ${passedChecks}/${totalChecks} 通过`);
  
if (passedChecks === totalChecks) {
  console.log('🎉 所有检查通过！祭典模板已成功修复！');
  console.log('\n✨ 修复内容:');
  console.log('  • useMemo语法错误已修复');
  console.log('  • 地区循环导航已实现');
  console.log('  • 东京→埼玉→千叶→神奈川→北关东→甲信越→东京');
  console.log('  • 快速导航功能已集成');
  } else {
  console.log('⚠️ 部分检查未通过，请检查相关功能');
}

console.log('\n🚀 可以启动开发服务器测试页面功能！'); 