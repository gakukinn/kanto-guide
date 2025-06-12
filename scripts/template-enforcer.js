/**
 * 模板强制使用验证器
 * 检查新创建的花火页面是否严格按照模板创建
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 必须包含的模板标识符
const REQUIRED_TEMPLATE_MARKERS = [
  'getCategoryColor',
  'formatDate', 
  'useState',
  'useEffect',
  'sortedEvents',
  'handleLike',
  'type="date"',
  '() => handleLike(',
  'localStorage.getItem',
  'localStorage.setItem'
];

// 必须包含的组件结构
const REQUIRED_COMPONENTS = [
  'nav', // 面包屑导航
  'section', // 各个区域
  'input[type="date"]', // 日期输入
  'button', // 按钮
  'onClick={handleLike}' // 点赞功能
];

function validateTemplateUsage(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`文件不存在: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const warnings = [];

  // 检查核心模板标识符（必须）
  REQUIRED_TEMPLATE_MARKERS.forEach(marker => {
    if (!content.includes(marker)) {
      errors.push(`缺少必需的模板元素: ${marker}`);
    }
  });

  // 检查数据结构（警告）
  if (!content.includes('likes:')) {
    errors.push('缺少likes字段');
  }
  if (!content.includes('area:')) {
    warnings.push('建议添加area字段以提高数据完整性');
  }

  // 检查localStorage点赞系统（必须）
  if (!content.includes('localStorage.getItem') || !content.includes('localStorage.setItem')) {
    errors.push('缺少LocalStorage点赞持久化系统');
  }

  // 检查颜色渐变系统（必须）
  if (!content.includes('from-') || !content.includes('to-blue-')) {
    errors.push('缺少地区专属颜色渐变系统');
  }

  return { errors, warnings };
}

function enforceTemplate() {
  const hanabiPagesDir = 'src/app';
  const regions = ['saitama', 'tokyo', 'chiba', 'kanagawa', 'ibaraki', 'tochigi', 'gunma', 'niigata', 'nagano', 'yamanashi'];
  
  let totalErrors = 0;

  console.log('🔍 模板使用强制检查');
  console.log('================');

  regions.forEach(region => {
    const filePath = path.join(hanabiPagesDir, region, 'hanabi', 'page.tsx');
    
    if (fs.existsSync(filePath)) {
      console.log(`\n📄 检查: ${region}花火页面`);
      
      const { errors, warnings } = validateTemplateUsage(filePath);
      
      if (errors.length === 0 && warnings.length === 0) {
        console.log('  ✅ 模板使用正确');
      } else {
        if (errors.length > 0) {
          console.log('  ❌ 模板使用错误:');
          errors.forEach(error => {
            console.log(`    - ${error}`);
            totalErrors++;
          });
        }
        if (warnings.length > 0) {
          console.log('  ⚠️  建议改进:');
          warnings.forEach(warning => {
            console.log(`    - ${warning}`);
          });
        }
        if (errors.length === 0) {
          console.log('  ✅ 模板使用基本正确（有改进建议）');
        }
      }
    } else {
      console.log(`\n⚠️  ${region}花火页面不存在`);
    }
  });

  console.log('\n📊 检查结果:');
  console.log(`总错误数: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ 发现模板违规！必须修复后才能继续。');
    process.exit(1);
  } else {
    console.log('\n✅ 所有页面都正确使用了模板');
  }
}

// 如果直接运行此脚本
const scriptPath = fileURLToPath(import.meta.url);
const mainPath = process.argv[1];

if (scriptPath === mainPath) {
  enforceTemplate();
} else {
  // 直接运行以便调试
  enforceTemplate();
} 