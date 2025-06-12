/**
 * 通用模板强制使用系统
 * 自动检测所有可用模板，并验证新创建的文件是否正确使用了模板
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 模板目录
const TEMPLATES_DIR = 'templates';

// 模板规则定义
const TEMPLATE_RULES = {
  // 花火页面模板规则
  hanabi: {
    patterns: [
      'hanabi-page-template*.tsx',
    ],
    targetPaths: [
      'src/app/*/hanabi/page.tsx'
    ],
    requiredElements: [
      'getCategoryColor',
      'formatDate',
      'useState',
      'useEffect',
      'handleLike',
      'localStorage.getItem',
      'localStorage.setItem',
      'type="date"'
    ],
    templateMarkers: [
      '@layer 三层',
      '@category 花火',
      'sortedEvents'
    ]
  },
  // 地区首页模板规则（示例）
  region: {
    patterns: [
      'region-page-template*.tsx',
    ],
    targetPaths: [
      'src/app/*/page.tsx'
    ],
    requiredElements: [
      'useState',
      'useEffect'
    ],
    templateMarkers: [
      '@layer 二层',
      '@region'
    ]
  },
  // 活动列表模板规则（示例）
  activity: {
    patterns: [
      'activity-list-template*.tsx',
    ],
    targetPaths: [
      'src/app/*/*/page.tsx'
    ],
    requiredElements: [
      'useState',
      'handleFilter'
    ],
    templateMarkers: [
      '@layer 三层',
      '@category'
    ]
  }
};

/**
 * 扫描所有可用模板
 */
function scanAvailableTemplates() {
  const templates = {};
  
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.log('⚠️  模板目录不存在:', TEMPLATES_DIR);
    return templates;
  }

  const templateFiles = fs.readdirSync(TEMPLATES_DIR);
  
  templateFiles.forEach(file => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(TEMPLATES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检测模板类型
      let templateType = 'unknown';
      for (const [type, rules] of Object.entries(TEMPLATE_RULES)) {
        if (rules.patterns.some(pattern => {
          const regex = new RegExp(pattern.replace('*', '.*'));
          return regex.test(file);
        })) {
          templateType = type;
          break;
        }
      }
      
      templates[file] = {
        type: templateType,
        path: filePath,
        content: content,
        markers: extractTemplateMarkers(content),
        placeholders: extractPlaceholders(content)
      };
    }
  });

  return templates;
}

/**
 * 提取模板标记
 */
function extractTemplateMarkers(content) {
  const markers = [];
  
  // 提取注释中的标记
  const commentMatches = content.match(/@\w+[^\n]*/g);
  if (commentMatches) {
    markers.push(...commentMatches);
  }
  
  // 提取替换点标记
  const placeholderMatches = content.match(/\[[\w_]+\]/g);
  if (placeholderMatches) {
    markers.push(...placeholderMatches);
  }
  
  return markers;
}

/**
 * 提取占位符
 */
function extractPlaceholders(content) {
  const placeholders = [];
  const matches = content.match(/\[[\w_]+\]/g);
  if (matches) {
    placeholders.push(...matches);
  }
  return [...new Set(placeholders)];
}

/**
 * 检测文件应该使用哪个模板
 */
function detectRequiredTemplate(filePath) {
  for (const [type, rules] of Object.entries(TEMPLATE_RULES)) {
    if (rules.targetPaths.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*/g, '[^/]+'));
      return regex.test(filePath.replace(/\\/g, '/'));
    })) {
      return type;
    }
  }
  return null;
}

/**
 * 验证文件是否使用了模板
 */
function validateTemplateUsage(filePath, availableTemplates) {
  if (!fs.existsSync(filePath)) {
    return { isValid: false, errors: [`文件不存在: ${filePath}`] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const requiredTemplateType = detectRequiredTemplate(filePath);
  
  if (!requiredTemplateType) {
    return { isValid: true, warnings: ['无法确定应使用的模板类型'] };
  }

  const rules = TEMPLATE_RULES[requiredTemplateType];
  const errors = [];
  const warnings = [];

  // 检查是否包含模板标记
  let hasTemplateMarkers = false;
  const templateMarkers = rules.templateMarkers || [];
  
  for (const marker of templateMarkers) {
    if (content.includes(marker)) {
      hasTemplateMarkers = true;
      break;
    }
  }

  if (!hasTemplateMarkers && templateMarkers.length > 0) {
    errors.push(`缺少${requiredTemplateType}模板标记，应包含: ${templateMarkers.join(', ')}`);
  }

  // 检查必需元素
  const requiredElements = rules.requiredElements || [];
  for (const element of requiredElements) {
    if (!content.includes(element)) {
      errors.push(`缺少必需元素: ${element}`);
    }
  }

  // 检查是否还有未替换的占位符
  const unreplacedPlaceholders = [];
  for (const template of Object.values(availableTemplates)) {
    if (template.type === requiredTemplateType) {
      for (const placeholder of template.placeholders) {
        if (content.includes(placeholder)) {
          unreplacedPlaceholders.push(placeholder);
        }
      }
    }
  }

  if (unreplacedPlaceholders.length > 0) {
    warnings.push(`存在未替换的占位符: ${unreplacedPlaceholders.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    templateType: requiredTemplateType,
    hasTemplateMarkers
  };
}

/**
 * 扫描并检查所有目标文件
 */
function enforceTemplateUsage() {
  console.log('🔍 通用模板强制使用检查');
  console.log('====================');

  // 扫描可用模板
  const availableTemplates = scanAvailableTemplates();
  console.log(`\n📋 发现 ${Object.keys(availableTemplates).length} 个模板:`);
  
  for (const [fileName, template] of Object.entries(availableTemplates)) {
    console.log(`  📄 ${fileName} (类型: ${template.type})`);
    if (template.placeholders.length > 0) {
      console.log(`     占位符: ${template.placeholders.slice(0, 3).join(', ')}${template.placeholders.length > 3 ? '...' : ''}`);
    }
  }

  // 收集所有需要检查的文件
  const filesToCheck = [];
  
  for (const [type, rules] of Object.entries(TEMPLATE_RULES)) {
    for (const pathPattern of rules.targetPaths) {
      const globPattern = pathPattern.replace(/\*/g, '*');
      // 简单的文件查找
      const files = findMatchingFiles(globPattern);
      filesToCheck.push(...files.map(f => ({ path: f, expectedType: type })));
    }
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`\n🔍 检查 ${filesToCheck.length} 个文件:`);

  for (const fileInfo of filesToCheck) {
    const result = validateTemplateUsage(fileInfo.path, availableTemplates);
    
    console.log(`\n📄 ${fileInfo.path}`);
    console.log(`   预期模板类型: ${fileInfo.expectedType}`);
    
    if (result.isValid && result.warnings.length === 0) {
      console.log('   ✅ 模板使用正确');
    } else {
      if (result.errors.length > 0) {
        console.log('   ❌ 模板使用错误:');
        result.errors.forEach(error => {
          console.log(`     - ${error}`);
          totalErrors++;
        });
      }
      
      if (result.warnings.length > 0) {
        console.log('   ⚠️  建议改进:');
        result.warnings.forEach(warning => {
          console.log(`     - ${warning}`);
          totalWarnings++;
        });
      }
      
      if (result.errors.length === 0) {
        console.log('   ✅ 模板使用基本正确（有改进建议）');
      }
    }
  }

  console.log('\n📊 检查结果:');
  console.log(`总错误数: ${totalErrors}`);
  console.log(`总警告数: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ 发现模板违规！必须修复后才能继续。');
    console.log('\n💡 建议:');
    console.log('  1. 检查是否使用了正确的模板文件');
    console.log('  2. 确保替换了所有占位符');
    console.log('  3. 验证包含了所有必需的功能元素');
    process.exit(1);
  } else {
    console.log('\n✅ 所有文件都正确使用了模板');
    if (totalWarnings > 0) {
      console.log(`⚠️  有 ${totalWarnings} 个改进建议，建议优化`);
    }
  }
}

/**
 * 简单的文件匹配查找
 */
function findMatchingFiles(pattern) {
  const files = [];
  
  function scanDirectory(dir, currentPattern) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归搜索子目录
        const newPattern = currentPattern.replace(/^[^\/]+\//, '');
        if (newPattern !== currentPattern) {
          scanDirectory(fullPath, newPattern);
        }
      } else if (stat.isFile()) {
        // 检查文件是否匹配模式
        if (matchesPattern(fullPath, pattern)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  scanDirectory('.', pattern);
  return files;
}

/**
 * 检查文件路径是否匹配模式
 */
function matchesPattern(filePath, pattern) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const regex = new RegExp('^' + pattern.replace(/\*/g, '[^/]+') + '$');
  return regex.test(normalizedPath);
}

// 如果直接运行此脚本
const scriptPath = fileURLToPath(import.meta.url);
const mainPath = process.argv[1];

if (scriptPath === mainPath) {
  enforceTemplateUsage();
} else {
  enforceTemplateUsage();
}

export { scanAvailableTemplates, validateTemplateUsage, enforceTemplateUsage }; 