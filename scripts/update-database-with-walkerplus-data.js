import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取WalkerPlus提取的数据
const walkerPlusDataFile = path.join(
  path.dirname(__dirname),
  'extracted-data',
  'tokyo-hanabi-walkerplus.json'
);
const walkerPlusData = JSON.parse(fs.readFileSync(walkerPlusDataFile, 'utf8'));

// 映射：WalkerPlus活动名 -> 数据库文件名
const activityMapping = {
  '第48回 隅田川花火大会':
    'src/data/hanabi/tokyo/level4-july-hanabi-tokyo-sumida.ts',
  '第59回 葛飾納涼花火大会':
    'src/data/hanabi/tokyo/level4-july-hanabi-katsushika-noryo.ts',
  '第66回 いたばし花火大会':
    'src/data/hanabi/tokyo/level4-august-itabashi-hanabi.ts',
  '第47回 足立の花火': 'src/data/hanabi/tokyo/level4-may-adachi-hanabi.ts',
  '東京競馬場花火 2025 〜花火と聴きたい J-POP BEST〜':
    'src/data/hanabi/tokyo/level4-july-hanabi-tokyo-keibajo.ts',
  '第50回 江戸川区花火大会':
    'src/data/hanabi/tokyo/level4-august-edogawa-hanabi.ts',
  '2025 神宮外苑花火大会':
    'src/data/hanabi/tokyo/level4-august-jingu-gaien-hanabi.ts',
  '第40回 調布花火':
    'src/data/hanabi/tokyo/level4-september-tokyo-chofu-hanabi.ts',
  '第47回 世田谷区たまがわ花火大会':
    'src/data/hanabi/tokyo/level4-setagaya-tamagawa-hanabi.ts',
};

// 过滤掉过期的活动（2024年的北区花火会）
const validActivities = walkerPlusData.filter(activity => {
  const activityYear = new Date(activity.date).getFullYear();
  return activityYear >= 2025;
});

console.log('🔄 开始更新数据库文件');
console.log('============================================================');
console.log(
  `📊 总共 ${walkerPlusData.length} 个活动，其中 ${validActivities.length} 个是2025年有效活动`
);

if (walkerPlusData.length > validActivities.length) {
  const invalidActivities = walkerPlusData.filter(activity => {
    const activityYear = new Date(activity.date).getFullYear();
    return activityYear < 2025;
  });
  console.log(`\n⚠️ 已过滤掉过期活动:`);
  invalidActivities.forEach(activity => {
    console.log(`   - ${activity.name} (${activity.date})`);
  });
}

console.log('\n🔄 开始更新过程...\n');

let updatedCount = 0;
let skippedCount = 0;

validActivities.forEach((activity, index) => {
  console.log(`==================================================`);
  console.log(
    `📍 处理活动 ${index + 1}/${validActivities.length}: ${activity.name}`
  );

  const dbFile = activityMapping[activity.name];

  if (!dbFile) {
    console.log(`⚠️ 未找到对应的数据库文件，跳过`);
    skippedCount++;
    return;
  }

  const fullPath = path.join(path.dirname(__dirname), dbFile);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ 数据库文件不存在: ${dbFile}`);
    skippedCount++;
    return;
  }

  try {
    // 读取现有数据文件
    let fileContent = fs.readFileSync(fullPath, 'utf8');
    console.log(`📖 读取文件: ${dbFile}`);

    // 更新建议
    console.log(`📅 WalkerPlus日期: ${activity.date}`);
    console.log(`📍 WalkerPlus地点: ${activity.location}`);
    console.log(`🎆 WalkerPlus花火数: ${activity.fireworks || '未提供'}`);
    console.log(`🔗 WalkerPlus链接: ${activity.link}`);

    let hasUpdates = false;

    // 更新日期
    if (activity.date) {
      const datePattern = /date:\s*["'][^"']*["']/;
      if (datePattern.test(fileContent)) {
        fileContent = fileContent.replace(
          datePattern,
          `date: "${activity.date}"`
        );
        console.log(`✅ 已更新日期: ${activity.date}`);
        hasUpdates = true;
      }
    }

    // 更新地点 - 寻找location字段
    if (activity.location) {
      const locationPattern = /location:\s*['"][^'"]*['"]/;
      const locationMatch = fileContent.match(locationPattern);
      if (locationMatch) {
        const currentLocation = locationMatch[0].match(/['"]([^'"]*)['"]/)[1];
        if (activity.location.length > currentLocation.length) {
          fileContent = fileContent.replace(
            locationPattern,
            `location: '${activity.location}'`
          );
          console.log(`✅ 已更新地点: ${activity.location}`);
          hasUpdates = true;
        } else {
          console.log(`ℹ️ 当前地点信息已足够详细，保持不变`);
        }
      } else {
        console.log(`ℹ️ 未找到location字段，可能使用不同的字段名`);
      }
    }

    // 更新花火数
    if (activity.fireworks) {
      const fireworksPattern = /fireworksCount:\s*['"][^'"]*['"]/;
      if (fireworksPattern.test(fileContent)) {
        fileContent = fileContent.replace(
          fireworksPattern,
          `fireworksCount: '${activity.fireworks}'`
        );
        console.log(`✅ 已更新花火数: ${activity.fireworks}`);
        hasUpdates = true;
      } else {
        console.log(`ℹ️ 未找到fireworksCount字段`);
      }
    }

    // 添加WalkerPlus链接 - 查找是否已有walkerPlusUrl字段
    if (activity.link) {
      const walkerPlusPattern = /walkerPlusUrl:\s*['"][^'"]*['"]/;
      if (walkerPlusPattern.test(fileContent)) {
        fileContent = fileContent.replace(
          walkerPlusPattern,
          `walkerPlusUrl: '${activity.link}'`
        );
        console.log(`✅ 已更新WalkerPlus链接`);
        hasUpdates = true;
      } else {
        // 尝试在合适的位置添加walkerPlusUrl字段
        const insertAfterPattern = /(themeColor:\s*['"][^'"]*['"],?\s*\n)/;
        if (insertAfterPattern.test(fileContent)) {
          fileContent = fileContent.replace(
            insertAfterPattern,
            `$1  walkerPlusUrl: '${activity.link}',\n`
          );
          console.log(`✅ 已添加WalkerPlus链接字段`);
          hasUpdates = true;
        } else {
          console.log(`ℹ️ 未找到合适位置添加WalkerPlus链接`);
        }
      }
    }

    // 只有在有更新时才写回文件
    if (hasUpdates) {
      fs.writeFileSync(fullPath, fileContent, 'utf8');
      console.log(`💾 已保存更新到: ${dbFile}`);
      updatedCount++;
    } else {
      console.log(`ℹ️ 没有需要更新的内容`);
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ 更新文件时出错: ${error.message}`);
    skippedCount++;
  }
});

console.log('\n============================================================');
console.log('📈 数据库更新完成总结');
console.log('============================================================');
console.log(`✅ 成功更新: ${updatedCount} 个文件`);
console.log(`⚠️ 跳过: ${skippedCount} 个文件`);
console.log(
  `📊 处理率: ${Math.round((updatedCount / validActivities.length) * 100)}%`
);

if (updatedCount > 0) {
  console.log('\n💡 建议下一步操作:');
  console.log('1. 检查更新后的数据文件');
  console.log('2. 测试网站构建是否正常');
  console.log('3. 验证页面显示效果');
}

console.log('\n🎉 数据库更新流程完成!');
