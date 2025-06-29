const fs = require('fs');
const glob = require('glob');

/**
 * 最终验证：检查所有页面是否都有正确的活动描述
 */

const REGIONS = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
const ACTIVITY_TYPES = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];

let totalFiles = 0;
let withDescription = 0;
let samples = [];

console.log('🔍 最终验证：检查所有页面的活动描述...\n');

for (const region of REGIONS) {
    for (const activityType of ACTIVITY_TYPES) {
        const dir = path.join('app', region, activityType);
        if (fs.existsSync(dir)) {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const pagePath = path.join(dir, item, 'page.tsx');
                if (fs.existsSync(pagePath)) {
                    totalFiles++;
                    const content = fs.readFileSync(pagePath, 'utf8');
                    
                    if (content.includes('description:')) {
                        // 简单检查是否有description字段
                        const lines = content.split('\n');
                        const descLine = lines.find(line => line.includes('description:'));
                        if (descLine && descLine.length > 30) { // 描述应该有一定长度
                            withDescription++;
                            
                            // 收集一些样本
                            if (samples.length < 3) {
                                const match = descLine.match(/description:\s*"([^"]+)"/);
                                if (match) {
                                    samples.push({
                                        file: pagePath,
                                        description: match[1].substring(0, 100) + '...'
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

console.log('📊 最终结果:');
console.log('总页面数:', totalFiles);
console.log('有活动描述的页面:', withDescription);
console.log('成功率:', Math.round((withDescription / totalFiles) * 100) + '%');

console.log('\n📝 描述样本:');
samples.forEach((sample, index) => {
    console.log(`${index + 1}. ${sample.file}`);
    console.log(`   描述: ${sample.description}`);
    console.log('');
});

if (withDescription === totalFiles) {
    console.log('🎉 完美！所有页面都有活动描述了！');
} else {
    console.log(`⚠️  还有 ${totalFiles - withDescription} 个页面需要处理`);
}

function verifyThirdLayerPages() {
  console.log('🔍 开始最终验证所有三层页面...\n');
  
  // 查找所有三层页面文件
  const files = glob.sync('app/*/*/page.tsx');
  
  let totalPages = 0;
  let fixedPages = 0;
  let problemPages = [];
  
  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      totalPages++;
      
      console.log(`\n检查: ${filePath}`);
      
      // 检查关键要素
      const hasImport = content.includes('getStaticRegionActivityData');
      const isAsync = content.includes('export default async function');
      const hasDataReading = content.includes('const events = await getStaticRegionActivityData');
      const usesEvents = content.includes('events={events}');
      const noEmptyArray = !content.includes('events={[]}');
      const noEscapeChars = !content.includes('\\n');
      
      const isFixed = hasImport && isAsync && hasDataReading && usesEvents && noEmptyArray && noEscapeChars;
      
      if (isFixed) {
        console.log(`✅ 已修复`);
        fixedPages++;
      } else {
        console.log(`❌ 需要修复:`);
        if (!hasImport) console.log(`   - 缺少导入语句`);
        if (!isAsync) console.log(`   - 不是异步函数`);
        if (!hasDataReading) console.log(`   - 缺少数据读取代码`);
        if (!usesEvents) console.log(`   - 没有使用events变量`);
        if (!noEmptyArray) console.log(`   - 仍在使用空数组`);
        if (!noEscapeChars) console.log(`   - 存在转义字符问题`);
        
        problemPages.push(filePath);
      }
      
    } catch (error) {
      console.error(`❌ 检查失败 ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n📊 最终验证结果:`);
  console.log(`✅ 已修复页面: ${fixedPages}个`);
  console.log(`❌ 问题页面: ${problemPages.length}个`);
  console.log(`📈 总计页面: ${totalPages}个`);
  console.log(`🎯 修复率: ${((fixedPages / totalPages) * 100).toFixed(1)}%`);
  
  if (problemPages.length > 0) {
    console.log(`\n⚠️ 仍有问题的页面:`);
    problemPages.forEach(page => console.log(`   - ${page}`));
  } else {
    console.log(`\n🎉 所有三层页面都已修复完成！`);
  }
}

// 调用验证函数
verifyThirdLayerPages(); 