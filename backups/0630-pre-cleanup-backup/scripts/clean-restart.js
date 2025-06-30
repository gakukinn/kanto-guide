const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 开始彻底清理项目缓存...');

// 要删除的目录和文件
const pathsToDelete = [
  '.next',
  'node_modules/.cache',
  '.turbo',
  'out',
  'dist'
];

// 删除指定路径
pathsToDelete.forEach(dirPath => {
  if (fs.existsSync(dirPath)) {
    console.log(`🗑️ 删除: ${dirPath}`);
    try {
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'inherit' });
      } else {
        execSync(`rm -rf "${dirPath}"`, { stdio: 'inherit' });
      }
    } catch (error) {
      console.log(`⚠️ 删除 ${dirPath} 时出错: ${error.message}`);
    }
  } else {
    console.log(`✅ ${dirPath} 不存在，跳过`);
  }
});

console.log('🔄 重新安装依赖...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ 依赖安装完成');
} catch (error) {
  console.log('⚠️ 依赖安装失败:', error.message);
}

console.log('🚀 启动开发服务器...');
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ 开发服务器启动失败:', error.message);
} 