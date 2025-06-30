const fs = require('fs');
const path = require('path');

// 需要修复的页面列表
const pagesToFix = [
  'app/tokyo/illumination/page.tsx',
  'app/chiba/hanami/page.tsx', 
  'app/tokyo/culture/page.tsx',
  'app/koshinetsu/hanami/page.tsx',
  'app/koshinetsu/hanabi/page.tsx',
  'app/kitakanto/momiji/page.tsx',
  'app/kanagawa/hanami/page.tsx'
];

function fixPage(filePath) {
  try {
    console.log(`\n修复页面: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ 文件不存在: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已经是异步函数
    if (content.includes('export default async function') && content.includes('getStaticRegionActivityData')) {
      console.log(`✅ ${filePath} 已经修复完成，跳过`);
      return true;
    }

    // 1. 添加导入语句（如果不存在）
    if (!content.includes('getStaticRegionActivityData')) {
      content = content.replace(
        "import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';",
        "import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';\nimport { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';"
      );
      console.log(`✅ 添加了导入语句`);
    }

    // 2. 修复函数为异步
    content = content.replace(
      /export default function (\w+)\(\) \{/,
      'export default async function $1() {'
    );

    // 3. 从文件路径提取region和activity
    const pathParts = filePath.split('/');
    const region = pathParts[1]; // tokyo, chiba, etc.
    const activity = pathParts[2]; // hanabi, hanami, etc.

    // 4. 添加数据读取代码
    const dataReadingCode = `  // 读取${region}${activity}数据
  const events = await getStaticRegionActivityData('${region}', '${activity}');
  `;

    // 5. 在return语句前添加数据读取代码
    content = content.replace(
      /(\s+)return \(/,
      `${dataReadingCode}\n$1return (`
    );

    // 6. 替换events={[]}为events={events}
    content = content.replace(/events=\{\[\]\}/, 'events={events}');

    // 写回文件
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复完成: ${filePath}`);
    return true;

  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 开始完整修复剩余的三层页面...\n');
  
  let fixedCount = 0;
  let totalCount = pagesToFix.length;

  for (const filePath of pagesToFix) {
    if (fixPage(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 修复完成统计:`);
  console.log(`✅ 成功修复: ${fixedCount}个页面`);
  console.log(`❌ 修复失败: ${totalCount - fixedCount}个页面`);
  console.log(`📈 总计处理: ${totalCount}个页面`);
  
  if (fixedCount === totalCount) {
    console.log(`\n🎉 所有页面修复完成！现在可以重新启动开发服务器。`);
  }
}

main(); 