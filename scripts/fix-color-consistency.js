import fs from 'fs';
import path from 'path';
import { REGION_COLORS, generateStyleClasses, validateColorConsistency } from '../src/config/color-system.js';

console.log('🎨 配色一致性检查与修复系统\n');

// 花火页面配色修复
function fixHanabiPageColors() {
  console.log('🔧 修复花火页面配色...\n');
  
  const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa'];
  const fixes = [];
  
  regions.forEach(regionKey => {
    const hanabiPagePath = `src/app/${regionKey}/hanabi/page.tsx`;
    
    if (!fs.existsSync(hanabiPagePath)) {
      console.log(`⚠️  ${regionKey} 花火页面不存在，跳过`);
      return;
    }
    
    console.log(`🔍 检查 ${regionKey} 花火页面...`);
    
    let content = fs.readFileSync(hanabiPagePath, 'utf8');
    const regionConfig = REGION_COLORS[regionKey];
    const styles = generateStyleClasses(regionKey);
    
    if (!regionConfig) {
      console.log(`❌ 未找到 ${regionKey} 的配色配置`);
      return;
    }
    
    const expectedBg = `bg-gradient-to-br ${regionConfig.pageBackground}`;
    const expectedCard = `bg-gradient-to-r ${regionConfig.activityColor} border-2 border-${regionConfig.borderColor}`;
    
    // 修复主背景
    const bgRegex = /bg-gradient-to-br from-[^"]+/g;
    const bgMatches = content.match(bgRegex);
    
    if (bgMatches) {
      bgMatches.forEach(match => {
        if (match !== expectedBg.replace('bg-gradient-to-br ', '')) {
          content = content.replace(match, `bg-gradient-to-br ${regionConfig.pageBackground}`);
          fixes.push(`${regionKey}: 修复主背景 ${match} → ${regionConfig.pageBackground}`);
        }
      });
    }
    
    // 修复文本颜色
    const textColorReplacements = [
      { from: /hover:text-\\w+-600/g, to: `hover:text-${regionConfig.textColor}-600` },
      { from: /text-\\w+-600/g, to: `text-${regionConfig.textColor}-600` },
      { from: /text-\\w+-700/g, to: `text-${regionConfig.textColor}-700` },
      { from: /focus:ring-\\w+-500/g, to: `focus:ring-${regionConfig.textColor}-500` },
      { from: /focus:border-\\w+-500/g, to: `focus:border-${regionConfig.textColor}-500` },
      { from: /bg-\\w+-500/g, to: `bg-${regionConfig.textColor}-500` },
      { from: /hover:bg-\\w+-600/g, to: `hover:bg-${regionConfig.textColor}-600` }
    ];
    
    textColorReplacements.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        matches.forEach(match => {
          if (!match.includes(regionConfig.textColor)) {
            content = content.replace(new RegExp(match.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&'), 'g'), to);
            fixes.push(`${regionKey}: 修复文本颜色 ${match} → ${to}`);
          }
        });
      }
    });
    
    // 写回文件
    if (fixes.length > 0) {
      fs.writeFileSync(hanabiPagePath, content, 'utf8');
      console.log(`✅ ${regionKey} 花火页面配色已修复`);
    } else {
      console.log(`✅ ${regionKey} 花火页面配色正确`);
    }
  });
  
  return fixes;
}

// 验证配色系统
function validateColorSystem() {
  console.log('🔍 验证配色系统...\n');
  
  const errors = validateColorConsistency();
  
  if (errors.length === 0) {
    console.log('✅ 配色系统验证通过\n');
  } else {
    console.log('❌ 配色系统存在问题:');
    errors.forEach(error => {
      console.log(`   - ${error}`);
    });
    console.log();
  }
  
  return errors;
}

// 生成配色指南
function generateColorGuide() {
  console.log('📋 配色指南:\n');
  
  Object.entries(REGION_COLORS).forEach(([key, config]) => {
    console.log(`${config.emoji} ${config.name} (${key}):`);
    console.log(`   地区色: ${config.regionColor}`);
    console.log(`   活动色: ${config.activityColor}`);
    console.log(`   页面背景: ${config.pageBackground}`);
    console.log(`   文本色: ${config.textColor}`);
    console.log();
  });
}

// 主函数
function main() {
  // 1. 验证配色系统
  const systemErrors = validateColorSystem();
  
  // 2. 生成配色指南
  generateColorGuide();
  
  // 3. 修复花火页面配色
  const fixes = fixHanabiPageColors();
  
  // 4. 总结
  console.log('📊 修复总结:');
  console.log(`   系统错误: ${systemErrors.length}`);
  console.log(`   修复项目: ${fixes.length}`);
  
  if (fixes.length > 0) {
    console.log('\n🔧 具体修复:');
    fixes.forEach(fix => {
      console.log(`   - ${fix}`);
    });
  }
  
  if (systemErrors.length === 0 && fixes.length > 0) {
    console.log('\n✅ 配色问题已全部修复！');
  } else if (systemErrors.length === 0 && fixes.length === 0) {
    console.log('\n✅ 所有配色都是正确的！');
  } else {
    console.log('\n❌ 仍有配色问题需要解决');
    process.exit(1);
  }
}

// 运行
main(); 