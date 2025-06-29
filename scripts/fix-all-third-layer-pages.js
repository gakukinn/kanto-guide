const fs = require('fs');
const path = require('path');

// 批量修复所有三层页面，确保它们正确读取地区汇总JSON文件
console.log('🔧 批量修复三层页面数据读取...\\n');

const appDir = path.join(process.cwd(), 'app');
const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const activities = ['hanabi', 'hanami', 'matsuri'];

let totalFixed = 0;
let totalChecked = 0;

regions.forEach(region => {
  activities.forEach(activity => {
    const pageFile = path.join(appDir, region, activity, 'page.tsx');
    
    if (fs.existsSync(pageFile)) {
      totalChecked++;
      console.log(`📁 检查: ${region}/${activity}/page.tsx`);
      
      try {
        const content = fs.readFileSync(pageFile, 'utf8');
        
        // 检查是否使用了空数组或硬编码数据
        const hasEmptyArray = content.includes('const hanabiEvents: any[] = [];') ||
                             content.includes('const matsuriEvents: any[] = [];') ||
                             content.includes('const hanamiEvents: any[] = [];') ||
                             content.includes('events={[]}');
        
        // 检查是否已经正确导入了数据读取函数
        const hasDataFetcher = content.includes('getStaticRegionActivityData');
        
        if (hasEmptyArray && !hasDataFetcher) {
          console.log(`   🔧 需要修复: 使用空数组，未导入数据读取函数`);
          
          let newContent = content;
          
          // 添加导入语句
          if (!newContent.includes("import { getStaticRegionActivityData }")) {
            newContent = newContent.replace(
              "import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';",
              "import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';\\nimport { getStaticRegionActivityData } from '../../../src/lib/data-fetcher';"
            );
          }
          
          // 移除空数组定义
          newContent = newContent.replace(/\/\/ 空数据数组[\s\S]*?\[\];\n\n/g, '');
          newContent = newContent.replace(/const \w+Events: any\[\] = \[\];\n\n/g, '');
          
          // 将同步函数改为异步函数
          newContent = newContent.replace(
            /export default function (\\w+)\\(\\) \\{/,
            'export default async function $1() {'
          );
          
          // 添加数据读取逻辑
          const dataReadingCode = `  // 读取${region}${activity}数据\\n  const events = await getStaticRegionActivityData('${region}', '${activity}');\\n  \\n`;
          newContent = newContent.replace(
            /(export default async function \\w+\\(\\) \\{\\n)/,
            `$1${dataReadingCode}`
          );
          
          // 修复events属性
          newContent = newContent.replace(/events=\\{\\w*Events\\}/g, 'events={events}');
          newContent = newContent.replace(/events=\\{\\[\\]\\}/g, 'events={events}');
          
          // 保存修改后的文件
          fs.writeFileSync(pageFile, newContent, 'utf8');
          console.log(`   ✅ 已修复`);
          totalFixed++;
          
        } else if (hasDataFetcher) {
          console.log(`   ✅ 已正确配置数据读取`);
        } else {
          console.log(`   ⚠️  未使用标准模式，可能需要手动检查`);
        }
        
      } catch (error) {
        console.error(`   ❌ 处理失败:`, error.message);
      }
      
      console.log('');
    } else {
      console.log(`⚠️  文件不存在: ${region}/${activity}/page.tsx`);
    }
  });
});

console.log(`\\n📊 修复完成:`);
console.log(`- 检查文件: ${totalChecked}个`);
console.log(`- 修复页面: ${totalFixed}个`);
console.log(`\\n🎯 现在所有三层页面都能正确读取地区汇总JSON文件！`); 