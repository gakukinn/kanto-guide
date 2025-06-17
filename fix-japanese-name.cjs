const fs = require('fs');
const path = require('path');

function getAllTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        getAllTsFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function removeJapaneseName(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const originalLines = content.split('\n');
    const newLines = [];

    for (let i = 0; i < originalLines.length; i++) {
      const line = originalLines[i];
      if (line.trim().startsWith('japaneseName:')) {
        modified = true;
        console.log('删除行:', line.trim());
        continue;
      }
      newLines.push(line);
    }

    if (modified) {
      const newContent = newLines.join('\n');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('✓ 修复:', filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('✗ 错误:', filePath, error.message);
    return false;
  }
}

const srcDir = path.join(process.cwd(), 'src');
const tsFiles = getAllTsFiles(srcDir);
console.log('找到', tsFiles.length, '个TypeScript文件');

let modifiedCount = 0;
tsFiles.forEach(filePath => {
  if (removeJapaneseName(filePath)) {
    modifiedCount++;
  }
});

console.log('完成! 修复了', modifiedCount, '个文件');
