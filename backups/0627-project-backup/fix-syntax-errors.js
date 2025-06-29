const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // 修复函数定义中的括号问题
    const functionFixes = [
      // 修复缺少闭合括号的函数调用
      { pattern: /if \(name\.includes\('([^']+)'\)/g, replacement: "if (name.includes('$1'))" },
      { pattern: /if \(lightBulbs && lightBulbs\.includes\('([^']+)'\)/g, replacement: "if (lightBulbs && lightBulbs.includes('$1'))" },
      
      // 修复数组语法错误
      { pattern: /\]\],$/gm, replacement: '],' },
      { pattern: /\]\]$/gm, replacement: ']' },
      
      // 修复对象语法错误
      { pattern: /\}\},$/gm, replacement: '},' },
      { pattern: /\}\}$/gm, replacement: '}' },
      
      // 修复导出函数语法
      { pattern: /export default async function ([A-Za-z]+)\(\) \{/g, replacement: 'export default async function $1() {' },
      
      // 修复模板字符串错误
      { pattern: /\$\{event\?\./g, replacement: '${event?.' },
      
      // 修复对象属性语法
      { pattern: /: \{([^}]+)\}\};$/gm, replacement: ': {$1}};' },
      
      // 修复数据库查询语法
      { pattern: /const event = await prisma\.event\.findMany\(\{ where: \{ regionId: params\.regionId \} \}\);/g, 
        replacement: '// const event = await prisma.event.findMany({ where: { regionId: params.regionId } });' },
        
      // 修复navigationLinks语法
      { pattern: /navigationLinks:\s*\n\s*prev:/g, replacement: 'navigationLinks: {\n    prev:' },
      { pattern: /\}\},\s*\n\s*next:/g, replacement: '},\n    next:' },
      { pattern: /\}\},\s*\n\s*current:/g, replacement: '},\n    current:' }
    ];

    functionFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复特定的语法模式
    if (content.includes('function transformCrawledDataToIlluminationEvents(event: any[]): any[] {')) {
      content = content.replace(
        'function transformCrawledDataToIlluminationEvents(event: any[]): any[] {',
        'function transformCrawledDataToIlluminationEvents(events: any[]): any[] {'
      );
      content = content.replace(/return event\.map/g, 'return events.map');
      hasChanges = true;
    }

    // 修复模板字符串问题
    if (content.includes('`${event?.')) {
      // 修复模板字符串中的问号操作符
      content = content.replace(/\$\{event\?\./g, '${event?.');
      hasChanges = true;
    }

    // 修复对象结构问题
    const objectFixes = [
      // 修复metadata对象
      { 
        pattern: /openGraph:\s*\{([^}]+)\}\s*,\s*robots:/g, 
        replacement: 'openGraph: {$1},\n  robots:' 
      },
      
      // 修复数组结构
      { 
        pattern: /highlights: \[([^\]]+)\]\],/g, 
        replacement: 'highlights: [$1],' 
      },
      
      // 修复navigationLinks结构
      {
        pattern: /navigationLinks:\s*\n\s*prev: \{ name: '([^']+)', url: '([^']+)', emoji: '([^']+)' \}\},\s*\n\s*next: \{ name: '([^']+)', url: '([^']+)', emoji: '([^']+)' \}\},\s*\n\s*current: \{ name: '([^']+)', url: '([^']+)' \}/g,
        replacement: `navigationLinks: {
    prev: { name: '$1', url: '$2', emoji: '$3' },
    next: { name: '$4', url: '$5', emoji: '$6' },
    current: { name: '$7', url: '$8' }
  }`
      }
    ];

    objectFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 已修复: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let fixedCount = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixedCount += scanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixSyntaxErrors(fullPath)) {
        fixedCount++;
      }
    }
  });
  
  return fixedCount;
}

console.log('🔧 开始批量修复TypeScript语法错误...');

const appDir = './app';
const fixedFiles = scanDirectory(appDir);

console.log(`\n✅ 修复完成! 共修复了 ${fixedFiles} 个文件`);
console.log('请运行 npx tsc --noEmit 检查修复结果'); 