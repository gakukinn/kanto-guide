/**
 * 测试增强版页面生成器
 * 使用: node scripts/test-enhanced-generator.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🧪 测试增强版页面生成器...');

// 检查数据目录是否存在
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.log('📁 创建data目录结构...');
  fs.mkdirSync(path.join(dataDir, 'regions', 'tokyo'), { recursive: true });
  fs.mkdirSync(path.join(dataDir, 'activities'), { recursive: true });
  console.log('✅ 目录创建完成');
}

// 运行TypeScript文件
const tsFilePath = path.join(__dirname, 'enhanced-activity-page-generator.ts');

console.log('🔧 编译并测试TypeScript代码...');

const child = spawn('npx', ['ts-node', '--esm', tsFilePath], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('✅ 增强版生成器测试完成！');
    console.log('');
    console.log('📋 下一步操作：');
    console.log('1. 修改现有的 app/api/activity-page-generator/route.ts');
    console.log('2. 集成增强版生成器的双轨生成功能');
    console.log('3. 测试生成一个页面，验证JSON文件同时生成');
  } else {
    console.error(`❌ 测试失败，退出码: ${code}`);
  }
});

child.on('error', (error) => {
  console.error('❌ 启动进程失败:', error);
  console.log('');
  console.log('💡 可能的解决方案：');
  console.log('1. 确保已安装 ts-node: npm install -g ts-node');
  console.log('2. 或者直接修改现有的页面生成器API');
}); 