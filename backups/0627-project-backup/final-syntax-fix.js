const fs = require('fs');
const path = require('path');

function finalSyntaxFix(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 修复最常见的错误：缺少分号
    const semicolonFixes = [
      // 修复对象属性后缺少逗号
      { pattern: /(\w+): '([^']+)'\s*\n/g, replacement: "$1: '$2',\n" },
      { pattern: /(\w+): "([^"]+)"\s*\n/g, replacement: '$1: "$2",\n' },
      { pattern: /(\w+): (\d+)\s*\n/g, replacement: "$1: $2,\n" },
      { pattern: /(\w+): (true|false)\s*\n/g, replacement: "$1: $2,\n" },
      
      // 修复数组元素后缺少逗号
      { pattern: /'([^']+)'\s*\n\s*'([^']+)'/g, replacement: "'$1',\n    '$2'" },
      { pattern: /"([^"]+)"\s*\n\s*"([^"]+)"/g, replacement: '"$1",\n    "$2"' },
      
      // 修复函数调用后缺少分号
      { pattern: /\)\s*\n\s*const/g, replacement: ');\n  const' },
      { pattern: /\)\s*\n\s*return/g, replacement: ');\n  return' },
      { pattern: /\)\s*\n\s*if/g, replacement: ');\n  if' },
      
      // 修复对象结构
      { pattern: /\}\s*\n\s*const/g, replacement: '};\nconst' },
      { pattern: /\}\s*\n\s*export/g, replacement: '};\nexport' },
      { pattern: /\}\s*\n\s*function/g, replacement: '};\nfunction' }
    ];

    semicolonFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复声明和语句期望错误
    const declarationFixes = [
      // 修复导出函数语法
      { pattern: /export default async function ([A-Za-z0-9]+)\(\) \{/g, replacement: 'export default function $1() {' },
      { pattern: /export default function ([A-Za-z0-9]+)\(\) \{/g, replacement: 'export default function $1() {' },
      
      // 修复const声明
      { pattern: /const ([a-zA-Z0-9]+): ([A-Za-z0-9<>\[\]]+)\s*=/g, replacement: 'const $1: $2 =' },
      
      // 修复对象字面量
      { pattern: /\{\s*\n\s*([a-zA-Z0-9]+):\s*([^,\n]+)\s*\n\s*([a-zA-Z0-9]+):/g, replacement: '{\n  $1: $2,\n  $3:' },
      
      // 修复数组字面量
      { pattern: /\[\s*\n\s*'([^']+)'\s*\n\s*'([^']+)'/g, replacement: "[\n    '$1',\n    '$2'" },
      { pattern: /\[\s*\n\s*"([^"]+)"\s*\n\s*"([^"]+)"/g, replacement: '[\n    "$1",\n    "$2"' }
    ];

    declarationFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复逗号期望错误
    const commaFixes = [
      // 修复对象属性间缺少逗号
      { pattern: /(\w+: '[^']*')\s*\n\s*(\w+:)/g, replacement: '$1,\n  $2' },
      { pattern: /(\w+: "[^"]*")\s*\n\s*(\w+:)/g, replacement: '$1,\n  $2' },
      { pattern: /(\w+: \d+)\s*\n\s*(\w+:)/g, replacement: '$1,\n  $2' },
      { pattern: /(\w+: (?:true|false))\s*\n\s*(\w+:)/g, replacement: '$1,\n  $2' },
      
      // 修复数组元素间缺少逗号
      { pattern: /('[^']*')\s*\n\s*('[^']*')/g, replacement: '$1,\n    $2' },
      { pattern: /("[^"]*")\s*\n\s*("[^"]*")/g, replacement: '$1,\n    $2' },
      
      // 修复函数参数
      { pattern: /\(([a-zA-Z0-9]+): ([a-zA-Z0-9\[\]]+)\s+([a-zA-Z0-9]+): ([a-zA-Z0-9\[\]]+)\)/g, replacement: '($1: $2, $3: $4)' }
    ];

    commaFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复冒号期望错误
    const colonFixes = [
      // 修复对象属性语法
      { pattern: /(\w+)\s+([^:\n]+)\s*\n/g, replacement: '$1: $2,\n' },
      
      // 修复类型注解
      { pattern: /([a-zA-Z0-9]+)\s+([A-Z][a-zA-Z0-9<>\[\]]*)\s*=/g, replacement: '$1: $2 =' },
      
      // 修复函数返回类型
      { pattern: /function\s+([a-zA-Z0-9]+)\(\)\s+([A-Z][a-zA-Z0-9<>\[\]]*)\s*\{/g, replacement: 'function $1(): $2 {' }
    ];

    colonFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复属性赋值期望错误
    const propertyFixes = [
      // 修复对象属性赋值
      { pattern: /(\w+)\s*\n\s*([^:=\n]+)\s*\n/g, replacement: '$1: $2,\n' },
      
      // 修复嵌套对象
      { pattern: /\{\s*\n\s*(\w+)\s*\n\s*([^}]+)\s*\n\s*\}/g, replacement: '{\n  $1: $2\n}' }
    ];

    propertyFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复标识符期望错误
    const identifierFixes = [
      // 修复中文字符串
      { pattern: /'([^']*[\u4e00-\u9fff][^']*)'/g, replacement: "'$1'" },
      { pattern: /"([^"]*[\u4e00-\u9fff][^"]*)"/g, replacement: '"$1"' },
      
      // 修复特殊字符
      { pattern: /([^a-zA-Z0-9_$])([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, replacement: '$1$2:' }
    ];

    identifierFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复表达式期望错误
    const expressionFixes = [
      // 修复数组访问
      { pattern: /\[\s*\]/g, replacement: '[]' },
      { pattern: /\(\s*\)/g, replacement: '()' },
      
      // 修复函数调用
      { pattern: /\.([a-zA-Z0-9]+)\s*\(\s*\)/g, replacement: '.$1()' }
    ];

    expressionFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // 修复大括号期望错误
    const braceFixes = [
      // 修复对象字面量
      { pattern: /\{\s*\n\s*([^}]+)\s*\n\s*([^}]+)\s*\n/g, replacement: '{\n  $1,\n  $2\n' },
      
      // 修复函数体
      { pattern: /\)\s*\n\s*([^{])/g, replacement: ') {\n  $1' }
    ];

    braceFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 最终修复: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ 最终修复失败 ${filePath}:`, error.message);
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
      if (finalSyntaxFix(fullPath)) {
        fixedCount++;
      }
    }
  });
  
  return fixedCount;
}

console.log('🔧 开始最终TypeScript语法修复...');

const appDir = './app';
const fixedFiles = scanDirectory(appDir);

console.log(`\n✅ 最终修复完成! 共修复了 ${fixedFiles} 个文件`);
console.log('请运行 npx tsc --noEmit 检查修复结果'); 