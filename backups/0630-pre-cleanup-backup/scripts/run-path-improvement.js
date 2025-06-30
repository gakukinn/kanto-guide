/**
 * 运行改进的路径生成器
 * 使用: node scripts/run-path-improvement.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动改进的路径生成器...');

// 运行TypeScript文件
const tsFilePath = path.join(__dirname, 'improved-path-generator.ts');

const child = spawn('npx', ['ts-node', tsFilePath], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('✅ 路径生成改进完成！');
  } else {
    console.error(`❌ 路径生成改进失败，退出码: ${code}`);
  }
});

child.on('error', (error) => {
  console.error('❌ 启动进程失败:', error);
}); 