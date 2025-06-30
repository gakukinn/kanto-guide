const fs = require('fs');
const path = require('path');
const glob = require('glob');

function convertPageToPrisma(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已经使用了Prisma
    if (content.includes('import { prisma }') || content.includes('import prisma')) {
      console.log(`ℹ️ 已使用Prisma: ${filePath}`);
      return false;
    }
    
    // 移除静态数据导入
    const dataImportRegex = /import\s*{[^}]*}\s*from\s*['"]@\/data\/[^'"]*['"];?\n?/g;
    content = content.replace(dataImportRegex, '');
    
    // 添加Prisma导入
    const importSection = content.match(/^(import[^;]*;[\s\n]*)+/m);
    if (importSection) {
      const lastImportIndex = content.indexOf(importSection[0]) + importSection[0].length;
      const beforeImport = content.substring(0, lastImportIndex);
      const afterImport = content.substring(lastImportIndex);
      
      content = beforeImport + 
        `import { prisma } from '@/lib/prisma';\n` +
        afterImport;
    }
    
    // 将组件改为async并添加数据获取
    // 查找页面组件的export default
    const exportDefaultRegex = /export\s+default\s+function\s+(\w+)\s*\([^)]*\)\s*{/;
    const match = content.match(exportDefaultRegex);
    
    if (match) {
      const functionName = match[1];
      
      // 将函数改为async
      content = content.replace(
        exportDefaultRegex,
        `export default async function ${functionName}() {`
      );
      
      // 在函数开始处添加数据获取逻辑
      const functionStartIndex = content.indexOf(match[0]) + match[0].length;
      
      // 根据文件路径推断数据类型和查询
      let dataQuery = '';
      if (filePath.includes('/hanabi/')) {
        // 从路径提取地区和活动名称
        const pathParts = filePath.split('/');
        const region = pathParts[pathParts.indexOf('app') + 1];
        const activityName = pathParts[pathParts.length - 2];
        
        dataQuery = `
  // 从数据库获取花火数据
  const hanabiData = await prisma.hanabi.findFirst({
    where: {
      region: '${region}',
      slug: '${activityName}'
    }
  });
  
  // 如果数据库中没有数据，返回404
  if (!hanabiData) {
    return {
      notFound: true
    };
  }
`;
      }
      
      const beforeFunction = content.substring(0, functionStartIndex);
      const afterFunction = content.substring(functionStartIndex);
      
      content = beforeFunction + dataQuery + afterFunction;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 转换为Prisma: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ 转换失败: ${filePath}`, error.message);
    return false;
  }
}

function main() {
  console.log('🔄 开始将页面转换为使用Prisma数据库...\n');
  
  // 查找所有页面文件
  const pageFiles = glob.sync('app/**/page.tsx');
  
  let convertedCount = 0;
  
  pageFiles.forEach(filePath => {
    if (convertPageToPrisma(filePath)) {
      convertedCount++;
    }
  });
  
  console.log(`\n📊 转换统计:`);
  console.log(`- 检查页面: ${pageFiles.length}`);
  console.log(`- 转换页面: ${convertedCount}`);
  console.log(`- 成功率: ${((convertedCount / pageFiles.length) * 100).toFixed(1)}%`);
}

main(); 