const { exec } = require('child_process');

console.log('🔍 检查端口3000占用情况...');

exec('netstat -ano | findstr :3000', (error, stdout, stderr) => {
  if (stdout.trim()) {
    console.log('⚠️  端口3000被占用:');
    console.log(stdout);
    console.log('\n💡 建议执行: taskkill /f /im node.exe');
  } else {
    console.log('✅ 端口3000可用');
  }
});

exec('tasklist | findstr node.exe', (error, stdout, stderr) => {
  if (stdout.trim()) {
    console.log('\n📊 当前Node.js进程:');
    console.log(stdout);
  } else {
    console.log('\n✅ 没有运行的Node.js进程');
  }
}); 