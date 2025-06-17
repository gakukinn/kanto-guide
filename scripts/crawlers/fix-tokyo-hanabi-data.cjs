const fs = require("fs");
const path = require("path");

// 读取抓取的数据
const scrapedDataPath = path.join(__dirname, "tokyo-hanabi-scraped-data.json");
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, "utf8"));

// 创建映射关系
const dataMapping = {
  "tokyo-keiba-2025": {
    date: "2025年7月2日",
    location: "東京都府中市 JRA東京競馬場",
    expectedVisitors: "非公表",
    fireworksCount: "1万4000発",
  },
  "sumida-river-48": {
    date: "2025年7月26日",
    location: "東京都墨田区 隅田川河川敷",
    expectedVisitors: "約91万人",
    fireworksCount: "約2万発",
  },
  "katsushika-59": {
    date: "2025年7月22日",
    location: "東京都葛飾区 柴又野球場",
    expectedVisitors: "約77万人",
    fireworksCount: "約1万5000発",
  },
  "itabashi-66": {
    date: "2025年8月2日",
    location: "東京都板橋区 荒川河川敷",
    expectedVisitors: "57万人",
    fireworksCount: "約1万5000発",
  },
  "adachi-47": {
    date: "2025年5月31日",
    location: "東京都足立区 荒川河川敷",
    expectedVisitors: "40万人",
    fireworksCount: "約1万4010発",
  },
  "edogawa-50": {
    date: "2025年8月2日",
    location: "東京都江戸川区 江戸川河川敷",
    expectedVisitors: "約3万人",
    fireworksCount: "約1万4000発",
  },
  "jingu-gaien-2025": {
    date: "2025年8月16日",
    location: "東京都新宿区 明治神宮外苑",
    expectedVisitors: "約100万人",
    fireworksCount: "約1万発",
  },
  "chofu-40": {
    date: "2025年9月20日",
    location: "東京都調布市 多摩川河川敷",
    expectedVisitors: "30万人",
    fireworksCount: "約1万発",
  },
  "kita-11": {
    date: "2024年9月28日",
    location: "東京都北区 荒川河川敷",
    expectedVisitors: "5万人以上",
    fireworksCount: "1万発",
  },
  "setagaya-tamagawa-47": {
    date: "2025年10月4日",
    location: "東京都世田谷区 二子玉川緑地運動場",
    expectedVisitors: "約31万人",
    fireworksCount: "約6000発",
  },
};

// 读取原始页面文件
const pageFilePath = path.join(
  __dirname,
  "../../src/app/tokyo/hanabi/page.tsx"
);
let pageContent = fs.readFileSync(pageFilePath, "utf8");

// 修复每个活动的数据
Object.entries(dataMapping).forEach(([id, data]) => {
  // 修复date字段
  const dateRegex = new RegExp(`(id: "${id}"[\\s\\S]*?date: ")[^"]*(")`);
  pageContent = pageContent.replace(dateRegex, `$1${data.date}$2`);

  // 修复location字段 - 替换为简洁的地点信息
  const locationRegex = new RegExp(
    `(id: "${id}"[\\s\\S]*?location: ")[\\s\\S]*?(",[\\s\\S]*?description:)`
  );
  pageContent = pageContent.replace(locationRegex, `$1${data.location}$2`);

  // 修复expectedVisitors字段
  const visitorsRegex = new RegExp(
    `(id: "${id}"[\\s\\S]*?expectedVisitors: ")[^"]*(")`
  );
  pageContent = pageContent.replace(
    visitorsRegex,
    `$1${data.expectedVisitors}$2`
  );

  // 修复fireworksCount字段 - 需要转换为数字
  let fireworksNum = 1;
  if (data.fireworksCount.includes("2万")) fireworksNum = 2;
  else if (data.fireworksCount.includes("1万5")) fireworksNum = 1.5;
  else if (data.fireworksCount.includes("1万4")) fireworksNum = 1.4;
  else if (data.fireworksCount.includes("1万")) fireworksNum = 1;
  else if (data.fireworksCount.includes("6000")) fireworksNum = 0.6;

  const fireworksRegex = new RegExp(
    `(id: "${id}"[\\s\\S]*?fireworksCount: )[^,]*`
  );
  pageContent = pageContent.replace(fireworksRegex, `$1${fireworksNum}`);

  // 修复venue字段 - 替换为简洁的地点信息
  const venueRegex = new RegExp(
    `(id: "${id}"[\\s\\S]*?venue: ")[\\s\\S]*?(",[\\s\\S]*?detailLink:)`
  );
  pageContent = pageContent.replace(venueRegex, `$1${data.location}$2`);
});

// 保存修复后的文件
fs.writeFileSync(pageFilePath, pageContent, "utf8");

console.log("✅ 东京花火数据修复完成！");
console.log("修复的数据项目：");
Object.entries(dataMapping).forEach(([id, data]) => {
  console.log(
    `- ${id}: ${data.date}, ${data.location}, ${data.expectedVisitors}, ${data.fireworksCount}`
  );
});
