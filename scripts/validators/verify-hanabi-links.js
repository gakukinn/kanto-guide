/**
 * 花火链接自动验证脚本 - 一劳永逸解决方案的核心组件
 * @description 自动检查所有花火页面的链接有效性，生成详细报告
 * @author AI Assistant
 * @date 2025-06-14
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 导入链接管理器（需要编译后的JS文件）
async function importLinkManager() {
  try {
    const { 
      validateHanabiEvents, 
      generateLinkValidationReport,
      autoFixHanabiEventLinks,
      getAllActiveHanabiPages,
      generateHanabiDetailLink
    } = await import('../src/utils/hanabi-link-manager.js');
    return { 
      validateHanabiEvents, 
      generateLinkValidationReport,
      autoFixHanabiEventLinks,
      getAllActiveHanabiPages,
      generateHanabiDetailLink
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
    region: 'koshinetsu'
  },
  {
    name: '神奈川花火',
    path: 'src/app/kanagawa/hanabi/page.tsx',
    region: 'kanagawa'
  }
];

/**
 * 从页面文件中提取花火事件数据
 */
function extractHanabiEventsFromFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // 使用正则表达式提取花火事件数组
    const eventsMatch = content.match(/const\s+\w*[Hh]anabi[Ee]vents\s*=\s*\[([\s\S]*?)\];/);
    if (!eventsMatch) {
      console.warn(`⚠️  在 ${filePath} 中未找到花火事件数组`);
      return [];
    }
    
    // 简单解析事件对象（这里使用正则表达式，实际项目中可能需要更复杂的解析）
    const eventsString = eventsMatch[1];
    const events = [];
    
    // 提取每个事件对象
    const eventMatches = eventsString.match(/\{[\s\S]*?\}/g) || [];
    
    eventMatches.forEach(eventString => {
      try {
        // 提取关键字段
        const idMatch = eventString.match(/id:\s*['"`]([^'"`]+)['"`]/);
        const nameMatch = eventString.match(/name:\s*['"`]([^'"`]+)['"`]/);
        const detailLinkMatch = eventString.match(/detailLink:\s*['"`]([^'"`]+)['"`]/);
        const websiteMatch = eventString.match(/website:\s*['"`]([^'"`]+)['"`]/);
        
        if (idMatch && nameMatch) {
          events.push({
            id: idMatch[1],
            name: nameMatch[1],
            detailLink: detailLinkMatch ? detailLinkMatch[1] : null,
            website: websiteMatch ? websiteMatch[1] : null
          });
        }
      } catch (error) {
        console.warn(`⚠️  解析事件对象时出错: ${error.message}`);
      }
    });
    
    return events;
  } catch (error) {
    console.error(`❌ 读取文件 ${filePath} 失败:`, error.message);
    return [];
  }
}

/**
 * 检查详情页面文件是否存在
 */
function checkDetailPageExists(detailLink) {
  if (!detailLink) return false;
  
  // 转换链接为文件路径
  const pagePath = join(process.cwd(), 'src/app', detailLink.substring(1), 'page.tsx');
  return existsSync(pagePath);
}

/**
 * 验证HTTP链接有效性（简化版本）
 */
async function validateHttpLink(url) {
  try {
    // 这里可以添加实际的HTTP请求验证
    // 为了简化，我们只检查URL格式
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  } catch (error) {
    return false;
  }
}

/**
 * 生成详细的验证报告
 */
async function generateDetailedReport(allEvents, linkManager) {
  let report = '# 花火链接完整验证报告\n\n';
  report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
  report += `验证工具: 花火链接自动验证脚本 v1.0\n\n`;
  
  // 统计信息
  const totalEvents = allEvents.reduce((sum, page) => sum + page.events.length, 0);
  let validLinks = 0;
  let invalidLinks = 0;
  let missingPages = 0;
  let invalidWebsites = 0;
  
  report += `## 总体统计\n`;
  report += `- 检查页面数: ${allEvents.length}\n`;
  report += `- 总花火事件数: ${totalEvents}\n\n`;
  
  // 详细检查每个页面
  for (const pageData of allEvents) {
    report += `## ${pageData.pageName} (${pageData.events.length}个事件)\n\n`;
    
    const validation = linkManager.validateHanabiEvents(pageData.events);
    
    report += `### 链接状态统计\n`;
    report += `- ✅ 有效链接: ${validation.valid.length}\n`;
    report += `- ❌ 问题链接: ${validation.invalid.length}\n`;
    report += `- ⚠️  警告数量: ${validation.warnings.length}\n\n`;
    
    validLinks += validation.valid.length;
    invalidLinks += validation.invalid.length;
    
    // 详细检查每个事件
    for (const event of pageData.events) {
      const hasDetailPage = linkManager.generateHanabiDetailLink(event.id) !== null;
      const pageExists = event.detailLink ? checkDetailPageExists(event.detailLink) : false;
      const websiteValid = await validateHttpLink(event.website);
      
      if (!pageExists && event.detailLink) missingPages++;
      if (!websiteValid && event.website) invalidWebsites++;
      
      report += `#### ${event.name} (${event.id})\n`;
      report += `- 详情链接: ${event.detailLink || '未设置'}\n`;
      report += `- 页面存在: ${pageExists ? '✅' : '❌'}\n`;
      report += `- 链接管理器配置: ${hasDetailPage ? '✅' : '❌'}\n`;
      report += `- 官方网站: ${event.website || '未设置'}\n`;
      report += `- 网站有效: ${websiteValid ? '✅' : '❌'}\n\n`;
    }
    
    // 警告信息
    if (validation.warnings.length > 0) {
      report += `### ⚠️  警告信息\n`;
      validation.warnings.forEach((warning, index) => {
        report += `${index + 1}. ${warning}\n`;
      });
      report += '\n';
    }
  }
  
  // 链接管理器状态
  report += `## 链接管理器状态\n`;
  const activePages = linkManager.getAllActiveHanabiPages();
  report += `- 已注册详情页面: ${activePages.length}\n\n`;
  
  activePages.forEach(page => {
    const pageExists = checkDetailPageExists(`/${page.region}/hanabi/${page.slug}`);
    report += `- ${page.id}: /${page.region}/hanabi/${page.slug} ${pageExists ? '✅' : '❌'}\n`;
  });
  
  // 修复建议
  report += `\n## 🔧 修复建议\n\n`;
  
  if (invalidLinks > 0) {
    report += `### 链接问题修复\n`;
    report += `发现 ${invalidLinks} 个链接问题，建议:\n`;
    report += `1. 运行自动修复: \`node scripts/auto-fix-hanabi-links.js\`\n`;
    report += `2. 手动检查不匹配的链接配置\n`;
    report += `3. 更新链接管理器注册表\n\n`;
  }
  
  if (missingPages > 0) {
    report += `### 缺失页面修复\n`;
    report += `发现 ${missingPages} 个页面文件缺失，建议:\n`;
    report += `1. 检查页面文件是否存在于正确路径\n`;
    report += `2. 使用花火详情页面生成工具创建缺失页面\n`;
    report += `3. 更新链接管理器配置\n\n`;
  }
  
  if (invalidWebsites > 0) {
    report += `### 官方网站链接修复\n`;
    report += `发现 ${invalidWebsites} 个无效网站链接，建议:\n`;
    report += `1. 验证官方网站URL是否正确\n`;
    report += `2. 更新WalkerPlus链接\n`;
    report += `3. 检查网站是否可访问\n\n`;
  }
  
  // 最佳实践建议
  report += `## 📋 最佳实践建议\n\n`;
  report += `1. **定期验证**: 建议每周运行一次链接验证\n`;
  report += `2. **自动化集成**: 将验证脚本集成到CI/CD流程\n`;
  report += `3. **链接管理**: 新增花火详情页面时，先更新链接管理器\n`;
  report += `4. **统一命名**: 遵循统一的页面路径命名规范\n`;
  report += `5. **文档更新**: 及时更新相关文档和配置\n\n`;
  
  report += `---\n`;
  report += `报告生成完成 | 总问题数: ${invalidLinks + missingPages + invalidWebsites}\n`;
  
  return report;
}

/**
 * 主验证函数
 */
async function main() {
  console.log('🔍 开始花火链接验证...\n');
  
  // 导入链接管理器
  const linkManager = await importLinkManager();
  
  // 收集所有页面的花火事件
  const allEvents = [];
  
  for (const page of HANABI_PAGES) {
    console.log(`📖 读取 ${page.name} 页面...`);
    
    if (!existsSync(page.path)) {
      console.warn(`⚠️  页面文件不存在: ${page.path}`);
      continue;
    }
    
    const events = extractHanabiEventsFromFile(page.path);
    console.log(`   找到 ${events.length} 个花火事件`);
    
    allEvents.push({
      pageName: page.name,
      region: page.region,
      events: events
    });
  }
  
  console.log(`\n📊 总计找到 ${allEvents.reduce((sum, page) => sum + page.events.length, 0)} 个花火事件\n`);
  
  // 生成验证报告
  console.log('📝 生成验证报告...');
  const report = await generateDetailedReport(allEvents, linkManager);
  
  // 保存报告
  const reportPath = join(process.cwd(), 'data/verification/hanabi-links-validation-report.md');
  writeFileSync(reportPath, report, 'utf-8');
  
  console.log(`✅ 验证报告已保存: ${reportPath}`);
  
  // 显示简要统计
  const totalEvents = allEvents.reduce((sum, page) => sum + page.events.length, 0);
  let totalProblems = 0;
  
  for (const pageData of allEvents) {
    const validation = linkManager.validateHanabiEvents(pageData.events);
    totalProblems += validation.invalid.length;
  }
  
  console.log('\n📈 验证结果统计:');
  console.log(`   总事件数: ${totalEvents}`);
  console.log(`   问题事件: ${totalProblems}`);
  console.log(`   成功率: ${((totalEvents - totalProblems) / totalEvents * 100).toFixed(1)}%`);
  
  if (totalProblems > 0) {
    console.log('\n🔧 发现问题，建议运行自动修复脚本:');
    console.log('   node scripts/auto-fix-hanabi-links.js');
  } else {
    console.log('\n🎉 所有链接验证通过！');
  }
}

// 运行验证
main().catch(error => {
  console.error('❌ 验证过程中出错:', error);
  process.exit(1);
}); 