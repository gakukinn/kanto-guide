/**
 * 花火链接自动修复脚本 - 一劳永逸解决方案
 * @description 自动修复花火页面中的链接错误，确保链接一致性
 * @author AI Assistant
 * @date 2025-06-14
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 导入链接管理器
async function importLinkManager() {
  try {
    const { 
      validateHanabiEvents, 
      autoFixHanabiEventLinks,
      generateHanabiDetailLink,
      getHanabiOfficialWebsite
    } = await import('../src/utils/hanabi-link-manager.js');
    return { 
      validateHanabiEvents, 
      autoFixHanabiEventLinks,
      generateHanabiDetailLink,
      getHanabiOfficialWebsite
    };
  } catch (error) {
    console.error('❌ 无法导入链接管理器，请先编译TypeScript文件');
    console.error('运行: npx tsc src/utils/hanabi-link-manager.ts --outDir dist --target es2020 --module es2020');
    process.exit(1);
  }
}

// 花火页面文件路径配置
const HANABI_PAGES = [
  {
    name: '甲信越花火',
    path: 'src/app/koshinetsu/hanabi/page.tsx',
    region: 'koshinetsu',
    arrayName: 'koshinetsuHanabiEvents'
  },
  {
    name: '神奈川花火',
    path: 'src/app/kanagawa/hanabi/page.tsx',
    region: 'kanagawa',
    arrayName: 'kanagawaHanabiEvents'
  }
];

/**
 * 从页面文件中提取完整的花火事件数据
 */
function extractFullHanabiEventsFromFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // 使用正则表达式提取花火事件数组
    const eventsMatch = content.match(/const\s+(\w*[Hh]anabi[Ee]vents)\s*=\s*\[([\s\S]*?)\];/);
    if (!eventsMatch) {
      console.warn(`⚠️  在 ${filePath} 中未找到花火事件数组`);
      return { arrayName: null, events: [], originalContent: content };
    }
    
    const arrayName = eventsMatch[1];
    const eventsString = eventsMatch[1];
    
    return {
      arrayName,
      events: [], // 这里我们不需要解析，直接操作字符串
      originalContent: content,
      eventsMatch: eventsMatch[0]
    };
  } catch (error) {
    console.error(`❌ 读取文件 ${filePath} 失败:`, error.message);
    return { arrayName: null, events: [], originalContent: '' };
  }
}

/**
 * 修复页面文件中的链接
 */
function fixLinksInPageFile(filePath, linkManager) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    let hasChanges = false;
    const changes = [];
    
    // 查找所有花火事件对象
    const eventPattern = /\{\s*id:\s*['"`]([^'"`]+)['"`][^}]*detailLink:\s*['"`]([^'"`]*)['"`][^}]*\}/g;
    
    content = content.replace(eventPattern, (match, eventId, currentDetailLink) => {
      const correctDetailLink = linkManager.generateHanabiDetailLink(eventId);
      const correctWebsite = linkManager.getHanabiOfficialWebsite(eventId);
      
      let updatedMatch = match;
      
      // 修复detailLink
      if (correctDetailLink && currentDetailLink !== correctDetailLink) {
        updatedMatch = updatedMatch.replace(
          /detailLink:\s*['"`][^'"`]*['"`]/,
          `detailLink: '${correctDetailLink}'`
        );
        changes.push(`${eventId}: detailLink 从 '${currentDetailLink}' 修正为 '${correctDetailLink}'`);
        hasChanges = true;
      }
      
      // 修复website（如果存在更好的官方链接）
      if (correctWebsite) {
        const websiteMatch = updatedMatch.match(/website:\s*['"`]([^'"`]*)['"`]/);
        if (websiteMatch && websiteMatch[1] !== correctWebsite) {
          updatedMatch = updatedMatch.replace(
            /website:\s*['"`][^'"`]*['"`]/,
            `website: '${correctWebsite}'`
          );
          changes.push(`${eventId}: website 从 '${websiteMatch[1]}' 修正为 '${correctWebsite}'`);
          hasChanges = true;
        }
      }
      
      return updatedMatch;
    });
    
    return { content, hasChanges, changes };
  } catch (error) {
    console.error(`❌ 修复文件 ${filePath} 时出错:`, error.message);
    return { content: '', hasChanges: false, changes: [] };
  }
}

/**
 * 创建备份文件
 */
function createBackup(filePath) {
  const backupPath = `${filePath}.backup.${Date.now()}`;
  const content = readFileSync(filePath, 'utf-8');
  writeFileSync(backupPath, content, 'utf-8');
  return backupPath;
}

/**
 * 生成修复报告
 */
function generateFixReport(fixes) {
  let report = '# 花火链接自动修复报告\n\n';
  report += `修复时间: ${new Date().toLocaleString('zh-CN')}\n`;
  report += `修复工具: 花火链接自动修复脚本 v1.0\n\n`;
  
  const totalFiles = fixes.length;
  const modifiedFiles = fixes.filter(fix => fix.hasChanges).length;
  const totalChanges = fixes.reduce((sum, fix) => sum + fix.changes.length, 0);
  
  report += `## 修复统计\n`;
  report += `- 检查文件数: ${totalFiles}\n`;
  report += `- 修改文件数: ${modifiedFiles}\n`;
  report += `- 总修复数量: ${totalChanges}\n\n`;
  
  if (modifiedFiles === 0) {
    report += `## ✅ 结果\n`;
    report += `所有文件的链接都是正确的，无需修复。\n\n`;
  } else {
    report += `## 🔧 修复详情\n\n`;
    
    fixes.forEach(fix => {
      if (fix.hasChanges) {
        report += `### ${fix.fileName}\n`;
        report += `- 备份文件: ${fix.backupPath}\n`;
        report += `- 修复数量: ${fix.changes.length}\n\n`;
        
        report += `#### 修复内容:\n`;
        fix.changes.forEach((change, index) => {
          report += `${index + 1}. ${change}\n`;
        });
        report += '\n';
      }
    });
  }
  
  report += `## 📋 后续建议\n\n`;
  report += `1. **验证修复**: 运行 \`node scripts/verify-hanabi-links.js\` 验证修复结果\n`;
  report += `2. **测试页面**: 在浏览器中测试修复的链接是否正常工作\n`;
  report += `3. **提交更改**: 确认修复无误后提交代码更改\n`;
  report += `4. **清理备份**: 确认无问题后可删除备份文件\n\n`;
  
  if (modifiedFiles > 0) {
    report += `## ⚠️  重要提醒\n\n`;
    report += `- 已为所有修改的文件创建备份\n`;
    report += `- 如果修复有问题，可以从备份文件恢复\n`;
    report += `- 建议在提交前仔细检查修复结果\n\n`;
  }
  
  report += `---\n`;
  report += `修复完成 | 成功修复 ${totalChanges} 个链接问题\n`;
  
  return report;
}

/**
 * 主修复函数
 */
async function main() {
  console.log('🔧 开始花火链接自动修复...\n');
  
  // 导入链接管理器
  const linkManager = await importLinkManager();
  
  const fixes = [];
  
  // 处理每个页面文件
  for (const page of HANABI_PAGES) {
    console.log(`📝 处理 ${page.name} 页面...`);
    
    if (!existsSync(page.path)) {
      console.warn(`⚠️  页面文件不存在: ${page.path}`);
      continue;
    }
    
    // 创建备份
    console.log('   创建备份文件...');
    const backupPath = createBackup(page.path);
    
    // 修复链接
    console.log('   分析和修复链接...');
    const fixResult = fixLinksInPageFile(page.path, linkManager);
    
    if (fixResult.hasChanges) {
      // 写入修复后的内容
      writeFileSync(page.path, fixResult.content, 'utf-8');
      console.log(`   ✅ 修复了 ${fixResult.changes.length} 个链接问题`);
      
      // 显示修复详情
      fixResult.changes.forEach(change => {
        console.log(`      - ${change}`);
      });
    } else {
      console.log('   ✅ 无需修复，链接都是正确的');
    }
    
    fixes.push({
      fileName: page.name,
      filePath: page.path,
      backupPath,
      hasChanges: fixResult.hasChanges,
      changes: fixResult.changes
    });
    
    console.log('');
  }
  
  // 生成修复报告
  console.log('📊 生成修复报告...');
  const report = generateFixReport(fixes);
  
  // 保存报告
  const reportPath = join(process.cwd(), 'data/verification/hanabi-links-fix-report.md');
  writeFileSync(reportPath, report, 'utf-8');
  
  console.log(`✅ 修复报告已保存: ${reportPath}`);
  
  // 显示总结
  const totalChanges = fixes.reduce((sum, fix) => sum + fix.changes.length, 0);
  const modifiedFiles = fixes.filter(fix => fix.hasChanges).length;
  
  console.log('\n🎉 修复完成！');
  console.log(`   修改文件: ${modifiedFiles}`);
  console.log(`   修复链接: ${totalChanges}`);
  
  if (totalChanges > 0) {
    console.log('\n📋 下一步建议:');
    console.log('   1. 运行验证脚本: node scripts/verify-hanabi-links.js');
    console.log('   2. 在浏览器中测试修复的链接');
    console.log('   3. 确认无误后提交代码更改');
  }
}

// 运行修复
main().catch(error => {
  console.error('❌ 修复过程中出错:', error);
  process.exit(1);
}); 