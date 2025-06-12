/**
 * 智能模板选择助手
 * 根据目标文件路径和功能要求，推荐最适合的模板
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 分析文件路径并推荐模板
 */
function recommendTemplate(targetPath, requirements = {}) {
  console.log('🤖 智能模板选择助手');
  console.log('==================');
  console.log(`\n📂 目标路径: ${targetPath}`);
  
  // 加载模板配置
  const configPath = path.join('templates', 'template-config.json');
  let config = {};
  
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  const recommendations = [];
  
  // 分析路径模式
  const normalizedPath = targetPath.replace(/\\/g, '/');
  
  for (const [templateType, rules] of Object.entries(config.templateRules || {})) {
    let score = 0;
    let reasons = [];
    
    // 检查路径匹配
    for (const pathPattern of rules.targetPaths) {
      const regex = new RegExp('^' + pathPattern.replace(/\*/g, '[^/]+').replace(/\*\*/g, '.*') + '$');
      if (regex.test(normalizedPath)) {
        score += 50;
        reasons.push(`路径匹配 ${pathPattern}`);
        break;
      }
    }
    
    // 检查功能需求匹配
    if (requirements.features) {
      const matchingFeatures = rules.requiredElements.filter(element => 
        requirements.features.some(feature => element.includes(feature))
      );
      score += matchingFeatures.length * 10;
      if (matchingFeatures.length > 0) {
        reasons.push(`功能匹配: ${matchingFeatures.join(', ')}`);
      }
    }
    
    // 检查层级匹配
    if (requirements.layer) {
      const layerMatch = rules.templateMarkers.find(marker => 
        marker.includes(`@layer ${requirements.layer}`)
      );
      if (layerMatch) {
        score += 30;
        reasons.push(`层级匹配: ${requirements.layer}`);
      }
    }
    
    if (score > 0) {
      recommendations.push({
        templateType,
        score,
        reasons,
        description: rules.description,
        availableTemplates: findAvailableTemplates(rules.patterns)
      });
    }
  }
  
  // 按分数排序
  recommendations.sort((a, b) => b.score - a.score);
  
  console.log('\n📋 推荐模板:');
  
  if (recommendations.length === 0) {
    console.log('❌ 未找到匹配的模板');
    console.log('\n💡 建议:');
    console.log('  1. 检查文件路径是否正确');
    console.log('  2. 查看 templates/template-config.json 中的规则');
    console.log('  3. 考虑创建新的模板类型');
    return null;
  }
  
  recommendations.forEach((rec, index) => {
    const rank = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
    console.log(`\n${rank} ${rec.templateType} (${rec.description})`);
    console.log(`   评分: ${rec.score}`);
    console.log(`   原因: ${rec.reasons.join(', ')}`);
    
    if (rec.availableTemplates.length > 0) {
      console.log(`   可用模板:`);
      rec.availableTemplates.forEach(template => {
        console.log(`     📄 ${template}`);
      });
    } else {
      console.log(`   ⚠️  未找到对应的模板文件`);
    }
  });
  
  const topRecommendation = recommendations[0];
  console.log(`\n✅ 推荐使用: ${topRecommendation.templateType} 类型模板`);
  
  if (topRecommendation.availableTemplates.length > 0) {
    console.log(`🎯 建议模板文件: ${topRecommendation.availableTemplates[0]}`);
  }
  
  return topRecommendation;
}

/**
 * 查找可用的模板文件
 */
function findAvailableTemplates(patterns) {
  const templates = [];
  const templatesDir = 'templates';
  
  if (!fs.existsSync(templatesDir)) {
    return templates;
  }
  
  const files = fs.readdirSync(templatesDir);
  
  for (const pattern of patterns) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    
    for (const file of files) {
      if (regex.test(file) && !templates.includes(file)) {
        templates.push(file);
      }
    }
  }
  
  return templates;
}

/**
 * 生成使用指南
 */
function generateUsageGuide(targetPath, templateType) {
  console.log('\n📖 使用指南');
  console.log('==========');
  
  const configPath = path.join('templates', 'template-config.json');
  let config = {};
  
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  
  const rules = config.templateRules?.[templateType];
  
  if (!rules) {
    console.log('❌ 未找到模板规则');
    return;
  }
  
  console.log(`\n📋 ${templateType} 模板使用要求:`);
  
  console.log('\n🔧 必需元素:');
  rules.requiredElements.forEach(element => {
    console.log(`  ✅ ${element}`);
  });
  
  console.log('\n🏷️  模板标记:');
  rules.templateMarkers.forEach(marker => {
    console.log(`  📌 ${marker}`);
  });
  
  console.log('\n🔄 需要替换的占位符:');
  rules.requiredPlaceholders?.forEach(placeholder => {
    console.log(`  🔧 ${placeholder}`);
  });
  
  console.log('\n💡 使用步骤:');
  console.log('  1. 复制推荐的模板文件');
  console.log('  2. 替换所有占位符为实际值');
  console.log('  3. 确保包含所有必需元素');
  console.log('  4. 运行 npm run enforce-template 验证');
}

/**
 * 命令行接口
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法: node template-assistant.js <目标文件路径> [功能需求]');
    console.log('示例: node template-assistant.js src/app/tokyo/hanabi/page.tsx');
    console.log('示例: node template-assistant.js src/app/osaka/page.tsx --layer=二层');
    process.exit(1);
  }
  
  const targetPath = args[0];
  const requirements = {};
  
  // 解析参数
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--layer=')) {
      requirements.layer = arg.split('=')[1];
    } else if (arg.startsWith('--features=')) {
      requirements.features = arg.split('=')[1].split(',');
    }
  }
  
  const recommendation = recommendTemplate(targetPath, requirements);
  
  if (recommendation) {
    generateUsageGuide(targetPath, recommendation.templateType);
  }
}

// 如果直接运行此脚本
const scriptPath = fileURLToPath(import.meta.url);
const mainPath = process.argv[1];

if (scriptPath === mainPath) {
  main();
}

export { recommendTemplate, generateUsageGuide }; 