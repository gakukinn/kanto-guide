const fs = require("fs");
const path = require("path");

// 读取页面文件
const pageFilePath = path.join(
  __dirname,
  "../../src/app/tokyo/hanabi/page.tsx"
);
let pageContent = fs.readFileSync(pageFilePath, "utf8");

// 所有活动的完整数据映射
const allActivitiesMapping = {
  "tokyo-keiba-2025": {
    date: "2025年7月2日",
    location: "東京都府中市 JRA東京競馬場",
    expectedVisitors: "非公表",
    fireworksCount: 1.4,
    venue: "東京都府中市 JRA東京競馬場",
  },
  "sumida-river-48": {
    date: "2025年7月26日",
    location: "東京都墨田区 隅田川河川敷",
    expectedVisitors: "約91万人",
    fireworksCount: 2,
    venue: "東京都墨田区 隅田川河川敷",
  },
  "katsushika-59": {
    date: "2025年7月22日",
    location: "東京都葛飾区 柴又野球場",
    expectedVisitors: "約77万人",
    fireworksCount: 1.5,
    venue: "東京都葛飾区 柴又野球場",
  },
  "edogawa-50": {
    date: "2025年8月2日",
    location: "東京都江戸川区 江戸川河川敷",
    expectedVisitors: "約3万人",
    fireworksCount: 1.4,
    venue: "東京都江戸川区 江戸川河川敷",
  },
  "jingu-gaien-2025": {
    date: "2025年8月16日",
    location: "東京都新宿区 明治神宮外苑",
    expectedVisitors: "約100万人",
    fireworksCount: 1,
    venue: "東京都新宿区 明治神宮外苑",
  },
  "itabashi-66": {
    date: "2025年8月2日",
    location: "東京都板橋区 荒川河川敷",
    expectedVisitors: "57万人",
    fireworksCount: 1.5,
    venue: "東京都板橋区 荒川河川敷",
  },
  "tamagawa-48": {
    date: "2025年8月16日",
    location: "東京都世田谷区 多摩川河川敷",
    expectedVisitors: "約30万人",
    fireworksCount: 0.6,
    venue: "東京都世田谷区 多摩川河川敷",
  },
  "setagaya-tamagawa-47": {
    date: "2025年10月4日",
    location: "東京都世田谷区 二子玉川緑地運動場",
    expectedVisitors: "約31万人",
    fireworksCount: 0.6,
    venue: "東京都世田谷区 二子玉川緑地運動場",
  },
  "kita-hanabi-11": {
    date: "2024年9月28日",
    location: "東京都北区 荒川河川敷",
    expectedVisitors: "5万人以上",
    fireworksCount: 1,
    venue: "東京都北区 荒川河川敷",
  },
  "okutama-70th": {
    date: "2025年8月9日",
    location: "東京都西多摩郡奥多摩町 愛宕山広場",
    expectedVisitors: "約1万人",
    fireworksCount: 0.1,
    venue: "東京都西多摩郡奥多摩町 愛宕山広場",
  },
  "akishima-kujira-53": {
    date: "2025年8月3日",
    location: "東京都昭島市 昭島市民会館周辺",
    expectedVisitors: "約12万人",
    fireworksCount: 0.5,
    venue: "東京都昭島市 昭島市民会館周辺",
  },
  "chofu-hanabi-2025": {
    date: "2025年9月20日",
    location: "東京都調布市 多摩川河川敷",
    expectedVisitors: "30万人",
    fireworksCount: 1,
    venue: "東京都調布市 多摩川河川敷",
  },
  "kozushima-nagisa-hanabi-32": {
    date: "2025年8月15日",
    location: "東京都神津島村 神津島港",
    expectedVisitors: "約3000人",
    fireworksCount: 0.3,
    venue: "東京都神津島村 神津島港",
  },
  "hachioji-hanabi-2025": {
    date: "2025年7月19日",
    location: "東京都八王子市 浅川河川敷",
    expectedVisitors: "約8万人",
    fireworksCount: 0.8,
    venue: "東京都八王子市 浅川河川敷",
  },
  "tachikawa-showa-2025": {
    date: "2025年7月26日",
    location: "東京都立川市 昭和記念公園",
    expectedVisitors: "約15万人",
    fireworksCount: 0.5,
    venue: "東京都立川市 昭和記念公園",
  },
  "mikurajima-hanabi-2025": {
    date: "2025年8月10日",
    location: "東京都御蔵島村 御蔵島港",
    expectedVisitors: "約500人",
    fireworksCount: 0.2,
    venue: "東京都御蔵島村 御蔵島港",
  },
  "jingu-yakyujo-hanabi-nights-2025": {
    date: "2025年8月22日",
    location: "東京都新宿区 明治神宮野球場",
    expectedVisitors: "約3万人",
    fireworksCount: 0.5,
    venue: "東京都新宿区 明治神宮野球場",
  },
};

// 修复每个活动的数据
Object.entries(allActivitiesMapping).forEach(([id, data]) => {
  console.log(`修复 ${id}...`);

  // 修复location字段 - 使用更精确的正则表达式
  const locationPattern = new RegExp(
    `(id: "${id}"[\\s\\S]*?location: ")[\\s\\S]*?(",[\\s\\S]*?description:)`,
    "g"
  );
  pageContent = pageContent.replace(locationPattern, `$1${data.location}$2`);

  // 修复venue字段 - 使用更精确的正则表达式
  const venuePattern = new RegExp(
    `(id: "${id}"[\\s\\S]*?venue: ")[\\s\\S]*?(",[\\s\\S]*?detailLink:)`,
    "g"
  );
  pageContent = pageContent.replace(venuePattern, `$1${data.venue}$2`);

  // 修复其他字段
  const datePattern = new RegExp(`(id: "${id}"[\\s\\S]*?date: ")[^"]*(")`);
  pageContent = pageContent.replace(datePattern, `$1${data.date}$2`);

  const visitorsPattern = new RegExp(
    `(id: "${id}"[\\s\\S]*?expectedVisitors: ")[^"]*(")`
  );
  pageContent = pageContent.replace(
    visitorsPattern,
    `$1${data.expectedVisitors}$2`
  );

  const fireworksPattern = new RegExp(
    `(id: "${id}"[\\s\\S]*?fireworksCount: )[^,]*`
  );
  pageContent = pageContent.replace(
    fireworksPattern,
    `$1${data.fireworksCount}`
  );
});

// 保存修复后的文件
fs.writeFileSync(pageFilePath, pageContent, "utf8");

console.log("✅ 东京花火数据最终修复完成！");
console.log("修复的活动数量：", Object.keys(allActivitiesMapping).length);
console.log("所有活动的location和venue字段都已清理为简洁格式");
