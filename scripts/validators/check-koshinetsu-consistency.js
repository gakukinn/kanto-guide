const fs = require('fs');
const path = require('path');

// 从三层页面提取的活动列表
const activities = [
  'kawaguchiko-kojosai-2025',
  'ichikawa-shinmei-hanabi-2024', 
  'gion-kashiwazaki-matsuri-hanabi',
  'nagaoka-matsuri-hanabi',
  'nagano-ebisukou-hanabi-2025',
  'niigata-matsuri-hanabi-2025',
  'agano-gozareya-hanabi-2025',
  'ojiya-matsuri-hanabi-2024',
  'yamanakako-houkosai-hanabi',
  'chikuma-chikumagawa-hanabi',
  'shinsaku-hanabi-2025',
  'asahara-jinja-aki-hanabi'
];

console.log('# 甲信越花火活动数据一致性核对报告\n');
console.log(`总计活动数量: ${activities.length}\n`);

let report = '';
let hasLayer4Count = 0;
let hasDataFileCount = 0;
let missingLayer4 = [];
let missingDataFile = [];

activities.forEach((id, index) => {
  console.log(`## ${index + 1}. ${id}`);
  
  // 检查四层页面
  const layer4Path = `src/app/koshinetsu/hanabi/${id}`;
  const hasLayer4 = fs.existsSync(layer4Path);
  
  if (hasLayer4) {
    hasLayer4Count++;
    console.log('✅ 四层页面: 存在');
  } else {
    missingLayer4.push(id);
    console.log('❌ 四层页面: 缺失');
  }
  
  // 检查数据库文件
  const dataFiles = [
    `src/data/level5-september-koshinetsu-${id}.ts`,
    `src/data/level5-august-koshinetsu-${id}.ts`,
    `src/data/level5-july-koshinetsu-${id}.ts`,
    `src/data/${id}.ts`,
    `src/data/koshinetsu/${id}.ts`
  ];
  
  let hasDataFile = false;
  let dataFilePath = '';
  
  for (const filePath of dataFiles) {
    if (fs.existsSync(filePath)) {
      hasDataFile = true;
      dataFilePath = filePath;
      break;
    }
  }
  
  if (hasDataFile) {
    hasDataFileCount++;
    console.log(`✅ 数据库文件: ${dataFilePath}`);
  } else {
    missingDataFile.push(id);
    console.log('❌ 数据库文件: 缺失');
  }
  
  console.log('');
});

console.log('## 汇总统计');
console.log(`- 总活动数: ${activities.length}`);
console.log(`- 有四层页面: ${hasLayer4Count}/${activities.length} (${Math.round(hasLayer4Count/activities.length*100)}%)`);
console.log(`- 有数据库文件: ${hasDataFileCount}/${activities.length} (${Math.round(hasDataFileCount/activities.length*100)}%)`);

if (missingLayer4.length > 0) {
  console.log('\n## 缺失四层页面的活动:');
  missingLayer4.forEach(id => console.log(`- ${id}`));
}

if (missingDataFile.length > 0) {
  console.log('\n## 缺失数据库文件的活动:');
  missingDataFile.forEach(id => console.log(`- ${id}`));
}

console.log('\n## 建议');
console.log('根据用户要求，需要以数据库信息为准，确保三层页面、四层页面、数据库信息一致。');
console.log('对于缺失数据库文件的活动，需要汇报给用户。'); 