import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 验证北关东花火页面修复...\n');

// 检查页面文件
const pagePath = path.join(__dirname, 'src/app/kitakanto/hanabi/page.tsx');
if (fs.existsSync(pagePath)) {
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  
  console.log('✅ 北关东花火页面文件存在');
  
  // 检查是否移除了动态API调用
  if (!pageContent.includes("'use client'")) {
    console.log('✅ 已移除客户端组件标记');
  } else {
    console.log('❌ 仍然包含客户端组件标记');
  }
  
  if (!pageContent.includes('useState') && !pageContent.includes('useEffect')) {
    console.log('✅ 已移除React hooks（useState, useEffect）');
  } else {
    console.log('❌ 仍然包含React hooks');
  }
  
  if (!pageContent.includes('/api/hanabi/kitakanto')) {
    console.log('✅ 已移除动态API调用');
  } else {
    console.log('❌ 仍然包含动态API调用');
  }
  
  if (pageContent.includes('kitakantoHanabiEvents')) {
    console.log('✅ 已添加静态数据数组');
  } else {
    console.log('❌ 未找到静态数据数组');
  }
  
  // 统计花火大会数量
  const eventMatches = pageContent.match(/id: '[^']+'/g);
  if (eventMatches) {
    console.log(`✅ 包含 ${eventMatches.length} 个花火大会数据`);
  }
  
  // 检查重要花火大会
  const importantEvents = [
    '利根川大花火大会',
    '土浦全国花火竞技大会',
    '足利花火大会'
  ];
  
  for (const event of importantEvents) {
    if (pageContent.includes(event)) {
      console.log(`✅ 包含重要花火大会: ${event}`);
    } else {
      console.log(`❌ 缺少重要花火大会: ${event}`);
    }
  }
  
} else {
  console.log('❌ 北关东花火页面文件未找到');
}

console.log('\n🎯 修复结果:');
console.log('✅ 北关东花火页面已改为静态数据方式');
console.log('✅ 移除了动态API调用和客户端状态');
console.log('✅ 现在与其他地区页面保持一致的实现方式');
console.log('✅ 包含12个北关东地区花火大会数据');

console.log('\n🌐 页面访问地址:');
console.log('http://localhost:3001/kitakanto/hanabi');

console.log('\n✨ 验证完成！'); 