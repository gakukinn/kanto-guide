import fs from 'fs';

// 地区配置
const regions = [
  {
    name: 'Tokyo',
    path: './src/app/tokyo/hanabi/page.tsx',
    arrayName: 'tokyoHanabiEvents',
  },
  {
    name: 'Saitama',
    path: './src/app/saitama/hanabi/page.tsx',
    arrayName: 'saitamaHanabiEvents',
  },
  {
    name: 'Chiba',
    path: './src/app/chiba/hanabi/page.tsx',
    arrayName: 'chibaHanabiEvents',
  },
  {
    name: 'Kanagawa',
    path: './src/app/kanagawa/hanabi/page.tsx',
    arrayName: 'kanagawaHanabiEvents',
  },
  {
    name: 'Kitakanto',
    path: './src/app/kitakanto/hanabi/page.tsx',
    arrayName: 'kitakantoHanabiEvents',
  },
  {
    name: 'Koshinetsu',
    path: './src/app/koshinetsu/hanabi/page.tsx',
    arrayName: 'koshinetsuHanabiEvents',
  },
];

function extractEventsFromPageFile(filePath, arrayName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // 查找特定命名的 events 数组
    const eventsMatch = content.match(
      new RegExp(`const\\s+${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`)
    );
    if (!eventsMatch) {
      console.warn(`Warning: No ${arrayName} array found in ${filePath}`);
      return 0;
    }

    const eventsContent = eventsMatch[1];

    // 计算事件数量 - 查找对象模式 { id: ... }
    const eventObjects = eventsContent.match(/\{\s*id:/g);
    return eventObjects ? eventObjects.length : 0;
  } catch (error) {
    console.warn(`Warning: Cannot read ${filePath} - ${error.message}`);
    return 0;
  }
}

function countLevel4Files(regionName) {
  const level4Dir = './src/data';
  try {
    const files = fs.readdirSync(level4Dir);
    // 筛选符合该地区的level4文件
    const regionPattern = new RegExp(
      `level4-.*-${regionName.toLowerCase()}-`,
      'i'
    );
    const level4Files = files.filter(
      file =>
        file.startsWith('level4-') &&
        file.endsWith('.ts') &&
        (regionPattern.test(file) || file.includes(regionName.toLowerCase()))
    );
    return level4Files.length;
  } catch (error) {
    console.warn(`Warning: Cannot read ${level4Dir} - ${error.message}`);
    return 0;
  }
}

function getAllLevel4Files() {
  const level4Dir = './src/data';
  try {
    const files = fs.readdirSync(level4Dir);
    return files.filter(
      file => file.startsWith('level4-') && file.endsWith('.ts')
    );
  } catch (error) {
    console.warn(`Warning: Cannot read ${level4Dir} - ${error.message}`);
    return [];
  }
}

console.log('=== 关东地区花火活动统计 ===\n');

let totalPageActivities = 0;
let totalLevel4Files = 0;

regions.forEach(region => {
  const pageActivities = extractEventsFromPageFile(
    region.path,
    region.arrayName
  );
  const level4Files = countLevel4Files(region.name);

  totalPageActivities += pageActivities;
  totalLevel4Files += level4Files;

  const status = pageActivities === level4Files ? '✅' : '❌';

  console.log(`${region.name}:`);
  console.log(`  页面活动数: ${pageActivities}`);
  console.log(`  Level4文件数: ${level4Files} ${status}`);
  if (pageActivities !== level4Files) {
    console.log(
      `  差异: ${Math.abs(pageActivities - level4Files)} (${pageActivities > level4Files ? '缺少Level4文件' : '多余Level4文件'})`
    );
  }
  console.log('');
});

console.log('=== 总计 ===');
console.log(`总页面活动数: ${totalPageActivities}`);
console.log(`总Level4文件数: ${totalLevel4Files}`);
console.log(
  `整体状态: ${totalPageActivities === totalLevel4Files ? '✅ 一致' : '❌ 不一致'}`
);
if (totalPageActivities !== totalLevel4Files) {
  console.log(`总差异: ${Math.abs(totalPageActivities - totalLevel4Files)}`);
}

console.log('\n=== 所有Level4文件清单 ===');
const allLevel4Files = getAllLevel4Files();
console.log(`共找到 ${allLevel4Files.length} 个Level4文件:`);
allLevel4Files.forEach(file => console.log(`  - ${file}`));
