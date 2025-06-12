import fs from 'fs';
import path from 'path';

console.log('🔍 网站结构完整性检查\n');

// 检查项目
const checks = [
  {
    name: '三层页面结构',
    items: [
      ['埼玉花火页面', 'src/app/saitama/hanabi/page.tsx'],
      ['东京花火页面', 'src/app/tokyo/hanabi/page.tsx'],
      ['千叶花火页面', 'src/app/chiba/hanabi/page.tsx'],
      ['神奈川花火页面', 'src/app/kanagawa/hanabi/page.tsx'],
    ]
  },
  {
    name: '四层页面结构',
    items: [
      ['东京花火详情', 'src/app/tokyo/hanabi/jingu-gaien/page.tsx'],
      ['埼玉花火详情', 'src/app/saitama/hanabi/asaka/page.tsx'],
      ['千叶花火详情', 'src/app/chiba/hanabi/narashino/page.tsx'],
      ['神奈川花火详情', 'src/app/kanagawa/hanabi/kamakura/page.tsx'],
      ['甲信越花火详情', 'src/app/koshinetsu/hanabi/suwa/page.tsx'],
      ['北关东花火详情', 'src/app/kitakanto/hanabi'],
    ]
  },
  {
    name: '主要配置文件',
    items: [
      ['Package配置', 'package.json'],
      ['Next配置', 'next.config.mjs'],
      ['布局文件', 'src/app/layout.tsx'],
    ]
  }
];

let totalPassed = 0;
let totalItems = 0;

checks.forEach(section => {
  console.log(`📂 ${section.name}:`);
  let sectionPassed = 0;
  
  section.items.forEach(([name, filePath]) => {
    totalItems++;
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      console.log(`  ✅ ${name}`);
      sectionPassed++;
      totalPassed++;
    } else {
      console.log(`  ❌ ${name} - 文件不存在: ${filePath}`);
    }
  });
  
  console.log(`  📊 ${section.name}: ${sectionPassed}/${section.items.length} 通过\n`);
});

console.log(`🎯 总结: ${totalPassed}/${totalItems} 通过 (${Math.round(totalPassed/totalItems*100)}%)\n`);

if (totalPassed === totalItems) {
  console.log('🎉 网站结构检查完全通过！');
} else {
  console.log('⚠️ 发现缺失文件，请检查上述报告');
} 