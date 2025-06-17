/**
 * 花火链接管理系统演示脚本
 * @description 展示一劳永逸解决方案的完整功能
 * @author AI Assistant
 * @date 2025-06-14
 */

import { 
  generateHanabiDetailLink,
  getHanabiOfficialWebsite,
  hasHanabiDetailPage,
  validateHanabiEvents,
  getAllActiveHanabiPages,
  generateLinkValidationReport
} from '../src/utils/hanabi-link-manager.js';

console.log('🎆 花火链接管理系统演示\n');
console.log('=' .repeat(50));

// 演示1: 自动生成链接
console.log('\n📋 演示1: 自动生成链接');
console.log('-'.repeat(30));

const testEvents = [
  'agano-gozareya-hanabi-2025',
  'yamanakako-houkosai-hanabi',
  'kamakura',
  'non-existent-event'
];

testEvents.forEach(eventId => {
  const link = generateHanabiDetailLink(eventId);
  const website = getHanabiOfficialWebsite(eventId);
  const hasPage = hasHanabiDetailPage(eventId);
  
  console.log(`\n🎯 事件ID: ${eventId}`);
  console.log(`   详情链接: ${link || '❌ 无详情页面'}`);
  console.log(`   官方网站: ${website || '❌ 未配置'}`);
  console.log(`   页面存在: ${hasPage ? '✅' : '❌'}`);
});

// 演示2: 批量验证
console.log('\n\n📋 演示2: 批量验证功能');
console.log('-'.repeat(30));

const sampleEvents = [
  {
    id: 'agano-gozareya-hanabi-2025',
    name: '第51回 阿賀野川ござれや花火',
    detailLink: '/koshinetsu/hanabi/agano-gozareya',
    website: 'https://hanabi.walkerplus.com/detail/ar0415e00061/'
  },
  {
    id: 'yamanakako-houkosai-hanabi',
    name: '山中湖「報湖祭」花火大会',
    detailLink: '/koshinetsu/hanabi/yamanakako-houkosai-hanabi',
    website: 'https://hanabi.walkerplus.com/detail/ar0419e00075/'
  },
  {
    id: 'test-event-with-wrong-link',
    name: '测试事件（错误链接）',
    detailLink: '/wrong/path/test',
    website: 'https://example.com'
  }
];

const validation = validateHanabiEvents(sampleEvents);

console.log(`\n✅ 有效事件: ${validation.valid.length}`);
console.log(`❌ 问题事件: ${validation.invalid.length}`);
console.log(`⚠️  警告数量: ${validation.warnings.length}`);

if (validation.warnings.length > 0) {
  console.log('\n⚠️  警告详情:');
  validation.warnings.forEach((warning, index) => {
    console.log(`   ${index + 1}. ${warning}`);
  });
}

// 演示3: 活跃页面列表
console.log('\n\n📋 演示3: 活跃页面管理');
console.log('-'.repeat(30));

const activePages = getAllActiveHanabiPages();
console.log(`\n📊 总计 ${activePages.length} 个活跃详情页面:`);

// 按地区分组显示
const pagesByRegion = activePages.reduce((acc, page) => {
  if (!acc[page.region]) acc[page.region] = [];
  acc[page.region].push(page);
  return acc;
}, {});

Object.entries(pagesByRegion).forEach(([region, pages]) => {
  console.log(`\n🏮 ${region.toUpperCase()} 地区 (${pages.length}个):`);
  pages.forEach(page => {
    console.log(`   - ${page.id}: /${page.region}/hanabi/${page.slug}`);
  });
});

// 演示4: 生成验证报告
console.log('\n\n📋 演示4: 生成验证报告');
console.log('-'.repeat(30));

const report = generateLinkValidationReport(sampleEvents);
console.log('\n📄 生成的验证报告预览:');
console.log(report.split('\n').slice(0, 15).join('\n'));
console.log('...(报告已截断)');

// 演示5: 实际使用场景
console.log('\n\n📋 演示5: 实际使用场景');
console.log('-'.repeat(30));

console.log('\n🔧 场景1: 创建新花火详情页面时');
const newEventId = 'new-summer-hanabi-2025';
console.log(`   检查事件 ${newEventId} 是否已有页面...`);
console.log(`   结果: ${hasHanabiDetailPage(newEventId) ? '已存在' : '需要创建'}`);

console.log('\n🔧 场景2: 更新花火页面链接时');
const eventToUpdate = 'yamanakako-houkosai-hanabi';
const correctLink = generateHanabiDetailLink(eventToUpdate);
const correctWebsite = getHanabiOfficialWebsite(eventToUpdate);
console.log(`   事件: ${eventToUpdate}`);
console.log(`   标准链接: ${correctLink}`);
console.log(`   官方网站: ${correctWebsite}`);

console.log('\n🔧 场景3: 批量检查页面一致性');
console.log('   运行: node scripts/verify-hanabi-links.js');
console.log('   修复: node scripts/auto-fix-hanabi-links.js');

// 系统优势总结
console.log('\n\n🎉 系统优势总结');
console.log('=' .repeat(50));

const advantages = [
  '✅ 自动生成标准链接，避免手动错误',
  '✅ 统一管理所有详情页面配置',
  '✅ 批量验证和修复功能',
  '✅ 详细的验证报告和修复建议',
  '✅ 开发时实时错误提示',
  '✅ 支持多地区和多语言',
  '✅ 完整的备份和恢复机制',
  '✅ 可扩展的架构设计'
];

advantages.forEach(advantage => {
  console.log(advantage);
});

console.log('\n🚀 使用建议:');
console.log('1. 新增详情页面前，先在链接管理器中注册');
console.log('2. 定期运行验证脚本检查链接一致性');
console.log('3. 使用自动修复脚本处理发现的问题');
console.log('4. 在开发环境中启用实时验证组件');

console.log('\n📚 相关文档:');
console.log('- 使用指南: docs/hanabi-link-management-guide.md');
console.log('- 验证报告: data/verification/hanabi-links-validation-report.md');
console.log('- 修复报告: data/verification/hanabi-links-fix-report.md');

console.log('\n🎆 演示完成！这就是一劳永逸的花火链接管理解决方案！');
console.log('=' .repeat(50)); 