const fs = require('fs');

console.log('开始处理...');

// 直接处理几个已知的文件
const files = [
  'src/app/july/hanabi/tokyo/mikurajima-hanabi/page.tsx',
  'src/app/july/hanabi/tokyo/tachikawa-showa-kinen-hanabi/page.tsx'
];

for (const file of files) {
  console.log('检查文件:', file);
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('@layer')) {
      console.log('需要添加标识:', file);
    } else {
      console.log('已有标识:', file);
    }
  } else {
    console.log('文件不存在:', file);
  }
}

console.log('处理完成'); 