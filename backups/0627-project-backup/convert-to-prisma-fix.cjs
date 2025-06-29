const fs = require('fs');
const path = require('path');

// 递归获取所有页面文件
function getAllPageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllPageFiles(fullPath, files);
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 修复页面文件
function fixPageFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 移除所有数据导入语句
  content = content.replace(/^import.*from\s+['"]@\/data\/.*['"];?\s*$/gm, '');
  content = content.replace(/^import.*from\s+['"]\.\.\/.*\.json['"];?\s*$/gm, '');
  
  // 添加Prisma导入（如果还没有的话）
  if (!content.includes('import { PrismaClient }')) {
    const importIndex = content.indexOf('import');
    if (importIndex !== -1) {
      content = content.slice(0, importIndex) + 
        'import { PrismaClient } from \'@prisma/client\';\n' + 
        content.slice(importIndex);
    }
  }
  
  // 检测页面类型和地区
  const pathParts = filePath.split(path.sep);
  let regionKey = '';
  let activityType = '';
  
  // 从路径中提取地区和活动类型
  for (let i = 0; i < pathParts.length; i++) {
    if (['tokyo', 'chiba', 'kanagawa', 'saitama', 'kitakanto', 'koshinetsu'].includes(pathParts[i])) {
      regionKey = pathParts[i];
      if (i + 1 < pathParts.length) {
        activityType = pathParts[i + 1];
      }
      break;
    }
  }
  
  // 获取活动slug（从路径中的最后一个目录名）
  const slug = pathParts[pathParts.length - 2];
  
  // 移除所有静态数据变量引用
  const dataVariableRegex = /\b[a-zA-Z][a-zA-Z0-9]*Data\b/g;
  const dataVariables = new Set();
  let match;
  while ((match = dataVariableRegex.exec(content)) !== null) {
    dataVariables.add(match[0]);
  }
  
  // 替换所有数据变量引用为event
  dataVariables.forEach(variable => {
    content = content.replace(new RegExp(`\\b${variable}\\b`, 'g'), 'event');
  });
  
  // 确保组件是async函数
  if (!content.includes('export default async function')) {
    content = content.replace(/export default function/, 'export default async function');
  }
  
  // 添加数据库查询逻辑
  const queryCode = `
  const prisma = new PrismaClient();
  
  // 根据slug查询活动数据
  const event = await prisma.event.findFirst({
    where: {
      slug: '${slug}',
      region: '${regionKey}',
      category: '${activityType}'
    },
    include: {
      venues: true,
      dates: true,
      weatherInfo: true,
      access: true,
      tickets: true,
      contact: true,
      history: true,
      highlights: true,
      nearby: true,
      tips: true
    }
  });
  
  if (!event) {
    return <div>活动未找到</div>;
  }
`;
  
  // 在函数开始处添加查询代码
  const functionMatch = content.match(/(export default async function[^{]*{)/);
  if (functionMatch) {
    content = content.replace(functionMatch[1], functionMatch[1] + queryCode);
  }
  
  // 修复metadata导出
  if (content.includes('export const metadata')) {
    const metadataRegex = /export const metadata[^}]*}/s;
    content = content.replace(metadataRegex, `export const metadata = {
  title: \`\${event?.name || '活动详情'} - 日本东部六地区旅游指南\`,
  description: \`\${event?.description || '精彩活动等您体验'}\`,
  openGraph: {
    title: \`\${event?.name || '活动详情'}\`,
    description: \`\${event?.description || '精彩活动等您体验'}\`,
  },
};`);
  }
  
  // 修复generateMetadata函数
  if (content.includes('export async function generateMetadata')) {
    const generateMetadataRegex = /export async function generateMetadata[^}]*}[^}]*}/s;
    content = content.replace(generateMetadataRegex, `export async function generateMetadata() {
  const prisma = new PrismaClient();
  
  const event = await prisma.event.findFirst({
    where: {
      slug: '${slug}',
      region: '${regionKey}',
      category: '${activityType}'
    }
  });
  
  return {
    title: \`\${event?.name || '活动详情'} - 日本东部六地区旅游指南\`,
    description: \`\${event?.description || '精彩活动等您体验'}\`,
    openGraph: {
      title: \`\${event?.name || '活动详情'}\`,
      description: \`\${event?.description || '精彩活动等您体验'}\`,
    },
  };
}`);
  }
  
  // 清理多余的空行
  content = content.replace(/\n{3,}/g, '\n\n');
  
  // 只有内容真正改变时才写入文件
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// 主执行函数
function main() {
  const appDir = path.join(__dirname, 'app');
  const pageFiles = getAllPageFiles(appDir);
  
  console.log(`找到 ${pageFiles.length} 个页面文件`);
  
  let fixedCount = 0;
  let errorCount = 0;
  
  pageFiles.forEach(filePath => {
    try {
      // 跳过特殊页面
      if (filePath.includes('page.tsx') && 
          !filePath.includes('layout.tsx') && 
          !filePath.includes('loading.tsx') && 
          !filePath.includes('error.tsx') &&
          !filePath.includes('not-found.tsx')) {
        
        const wasFixed = fixPageFile(filePath);
        if (wasFixed) {
          console.log(`✅ 修复: ${filePath}`);
          fixedCount++;
        }
      }
    } catch (error) {
      console.error(`❌ 错误处理 ${filePath}:`, error.message);
      errorCount++;
    }
  });
  
  console.log(`\n修复完成:`);
  console.log(`- 成功修复: ${fixedCount} 个文件`);
  console.log(`- 错误: ${errorCount} 个文件`);
}

main(); 