const fs = require("fs");
const path = require("path");

// 甲信越花火三层列表数据和对应的详情文件映射
const koshinetsuHanabiEvents = [
  {
    id: "kawaguchiko-kojosai-2025",
    name: "河口湖湖上祭",
    date: "2025年8月5日",
    location: "河口湖畔船津浜",
    fireworksCount: 10000,
    expectedVisitors: 120000,
    detailFile: "level5-fuji-kawaguchi-lake-hanabi.ts",
  },
  {
    id: "ichikawa-shinmei-hanabi-2024",
    name: "市川三郷町ふるさと夏まつり　第37回「神明の花火大会」",
    date: "2025年8月7日",
    location: "三郡橋下流笛吹川河畔",
    fireworksCount: 20000,
    expectedVisitors: 200000,
    detailFile: "level5-august-shinmei-hanabi.ts",
  },
  {
    id: "anime-classics-anison-hanabi",
    name: "アニメクラシックス アニソン花火",
    date: "2025年7月5日",
    location: "富士川いきいきスポーツ公園 特設会場",
    fireworksCount: 10000,
    expectedVisitors: "未公布",
    detailFile: "level5-anime-classics-anisong-hanabi.ts",
  },
  {
    id: "nagaoka-matsuri-hanabi",
    name: "長岡まつり大花火大会",
    date: "2025年8月2日、3日",
    location: "信濃川河川敷",
    fireworksCount: 20000,
    expectedVisitors: 345000,
    detailFile: "level5-august-nagaoka-hanabi.ts",
  },
  {
    id: "gion-kashiwazaki-matsuri-hanabi",
    name: "ぎおん柏崎まつり 海の大花火大会",
    date: "2025年7月26日",
    location: "柏崎市中央海岸・みなとまち海浜公園一帯",
    fireworksCount: 16000,
    expectedVisitors: 170000,
    detailFile: "level5-gion-kashiwazaki-hanabi.ts",
  },
  {
    id: "nagano-ebisukou-hanabi-2025",
    name: "第119回 長野えびす講煙火大会",
    date: "2025年11月23日",
    location: "長野大橋西側  犀川第2緑地",
    fireworksCount: 10000,
    expectedVisitors: 400000,
    detailFile: "nagano-ebisukou-hanabi-2025.ts",
  },
  {
    id: "niigata-matsuri-hanabi-2025",
    name: "新潟まつり花火大会",
    date: "2025年8月10日",
    location: "新潟市中央区信濃川河畔(昭和大橋周辺)",
    fireworksCount: 3000,
    expectedVisitors: 320000,
    detailFile: "niigata-matsuri-hanabi-2025.ts",
  },
];

// 数字格式化处理函数
function normalizeFireworksCount(count) {
  if (typeof count === "number") {
    return count;
  }

  const str = String(count);

  // 处理"约X万发"格式
  const wanMatch = str.match(/約?(\d+(?:\.\d+)?)万発?/);
  if (wanMatch) {
    return parseInt(parseFloat(wanMatch[1]) * 10000);
  }

  // 处理"X000发"格式
  const numMatch = str.match(/(\d+)発?/);
  if (numMatch) {
    return parseInt(numMatch[1]);
  }

  return str;
}

// 观众数格式化处理函数
function normalizeVisitorCount(count) {
  if (count === "未公布" || count === "未公開") {
    return "未公布";
  }

  if (typeof count === "number") {
    return count;
  }

  const str = String(count);

  // 处理"约X万人"格式
  const wanMatch = str.match(/約?(\d+(?:\.\d+)?)万人?/);
  if (wanMatch) {
    return parseInt(parseFloat(wanMatch[1]) * 10000);
  }

  // 处理"X人"格式
  const numMatch = str.match(/(\d+)人?/);
  if (numMatch) {
    return parseInt(numMatch[1]);
  }

  return str;
}

// 日期格式化处理函数
function normalizeDateFormat(date) {
  const str = String(date);

  // 如果已经是"2025年X月X日"格式，直接返回
  if (str.match(/^\d{4}年\d{1,2}月\d{1,2}日/)) {
    return str;
  }

  // 转换"2025-XX-XX"格式
  const isoMatch = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const year = isoMatch[1];
    const month = parseInt(isoMatch[2]);
    const day = parseInt(isoMatch[3]);
    return `${year}年${month}月${day}日`;
  }

  // 移除星期标识"(X)"
  return str.replace(/\([月火水木金土日]\)/, "");
}

// 数据一致性检查函数
function checkDataConsistency(threeLayerData, fourLayerData) {
  const result = {
    dateConsistent: false,
    fireworksConsistent: false,
    visitorsConsistent: false,
  };

  // 日期检查（只比较核心日期部分）
  const normalizedThreeDate = normalizeDateFormat(threeLayerData.date);
  const normalizedFourDate = normalizeDateFormat(fourLayerData.date);

  // 提取年月日进行比较
  const threeDateCore = normalizedThreeDate.match(
    /(\d{4}年\d{1,2}月\d{1,2}日)/
  );
  const fourDateCore = normalizedFourDate.match(/(\d{4}年\d{1,2}月\d{1,2}日)/);

  if (threeDateCore && fourDateCore) {
    result.dateConsistent = threeDateCore[1] === fourDateCore[1];
  } else {
    result.dateConsistent = normalizedThreeDate === normalizedFourDate;
  }

  // 花火数检查
  const threeFireworks = normalizeFireworksCount(threeLayerData.fireworksCount);
  const fourFireworks = normalizeFireworksCount(fourLayerData.fireworksCount);
  result.fireworksConsistent = threeFireworks === fourFireworks;

  // 观众数检查
  const threeVisitors = normalizeVisitorCount(threeLayerData.expectedVisitors);
  const fourVisitors = normalizeVisitorCount(fourLayerData.expectedVisitors);
  result.visitorsConsistent = threeVisitors === fourVisitors;

  return result;
}

function checkKoshinetsuConsistency() {
  console.log("开始甲信越花火活动数据一致性检查...\n");

  let report = {
    totalEvents: koshinetsuHanabiEvents.length,
    eventsWithDetailFiles: 0,
    consistentEvents: 0,
    inconsistentEvents: [],
    detailedResults: [],
  };

  console.log("🎆 甲信越花火活动数据一致性检查报告");
  console.log("============================================================\n");

  for (const event of koshinetsuHanabiEvents) {
    console.log(`${report.detailedResults.length + 1}. ${event.name}`);
    console.log(`   ID: ${event.id}`);

    const detailFilePath = path.join("src/data", event.detailFile);
    const eventResult = {
      id: event.id,
      name: event.name,
      hasDetailFile: false,
      threeLayerData: {
        date: event.date,
        fireworksCount: event.fireworksCount,
        expectedVisitors: event.expectedVisitors,
      },
      fourLayerData: {},
      consistency: {
        dateConsistent: false,
        fireworksConsistent: false,
        visitorsConsistent: false,
      },
    };

    if (fs.existsSync(detailFilePath)) {
      eventResult.hasDetailFile = true;
      report.eventsWithDetailFiles++;
      console.log(`   四层详情文件: ✅ 存在 (${event.detailFile})`);

      try {
        const fileContent = fs.readFileSync(detailFilePath, "utf-8");

        // 提取数据
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        const fireworksMatch = fileContent.match(
          /fireworksCount:\s*["']([^"']+)["']/
        );
        const visitorsMatch = fileContent.match(
          /expectedVisitors:\s*["']([^"']+)["']/
        );

        if (dateMatch) eventResult.fourLayerData.date = dateMatch[1];
        if (fireworksMatch)
          eventResult.fourLayerData.fireworksCount = fireworksMatch[1];
        if (visitorsMatch)
          eventResult.fourLayerData.expectedVisitors = visitorsMatch[1];

        console.log(`   三层数据:`);
        console.log(`     日期: ${event.date}`);
        console.log(`     花火数: ${event.fireworksCount}`);
        console.log(`     观众数: ${event.expectedVisitors}`);

        console.log(`   四层数据:`);
        console.log(`     日期: ${eventResult.fourLayerData.date}`);
        console.log(`     花火数: ${eventResult.fourLayerData.fireworksCount}`);
        console.log(
          `     观众数: ${eventResult.fourLayerData.expectedVisitors}`
        );

        // 检查一致性
        eventResult.consistency = checkDataConsistency(
          eventResult.threeLayerData,
          eventResult.fourLayerData
        );

        console.log(`   一致性检查:`);
        console.log(
          `     日期: ${eventResult.consistency.dateConsistent ? "✅" : "❌"}`
        );
        console.log(
          `     花火数: ${
            eventResult.consistency.fireworksConsistent ? "✅" : "❌"
          }`
        );
        console.log(
          `     观众数: ${
            eventResult.consistency.visitorsConsistent ? "✅" : "❌"
          }`
        );

        const allConsistent =
          eventResult.consistency.dateConsistent &&
          eventResult.consistency.fireworksConsistent &&
          eventResult.consistency.visitorsConsistent;

        if (allConsistent) {
          report.consistentEvents++;
        } else {
          report.inconsistentEvents.push({
            id: event.id,
            name: event.name,
            issues: [],
          });

          if (!eventResult.consistency.dateConsistent) {
            report.inconsistentEvents[
              report.inconsistentEvents.length - 1
            ].issues.push("日期不一致");
          }
          if (!eventResult.consistency.fireworksConsistent) {
            report.inconsistentEvents[
              report.inconsistentEvents.length - 1
            ].issues.push("花火数不一致");
          }
          if (!eventResult.consistency.visitorsConsistent) {
            report.inconsistentEvents[
              report.inconsistentEvents.length - 1
            ].issues.push("观众数不一致");
          }
        }
      } catch (error) {
        console.log(`   ❌ 读取文件失败: ${error.message}`);
      }
    } else {
      console.log(`   四层详情文件: ❌ 不存在 (${event.detailFile})`);
    }

    report.detailedResults.push(eventResult);
    console.log("");
  }

  // 输出统计摘要
  console.log("📊 统计摘要:");
  console.log(`   总活动数: ${report.totalEvents}`);
  console.log(`   有详情文件: ${report.eventsWithDetailFiles}`);
  console.log(`   数据一致: ${report.consistentEvents}`);
  console.log(
    `   一致性率: ${Math.round(
      (report.consistentEvents / Math.max(report.eventsWithDetailFiles, 1)) *
        100
    )}%\n`
  );

  if (report.inconsistentEvents.length > 0) {
    console.log("⚠️ 数据不一致的活动:");
    report.inconsistentEvents.forEach((event) => {
      console.log(`   ${event.name}:`);
      event.issues.forEach((issue) => {
        console.log(`     - ${issue}`);
      });
    });
    console.log("");
  }

  // 保存详细报告
  const reportPath = path.join(
    "data/reports",
    "koshinetsu-consistency-manual-check.json"
  );

  // 确保目录存在
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📝 详细报告已保存到: ${path.resolve(reportPath)}`);
  } catch (error) {
    console.log(`❌ 保存报告失败: ${error.message}`);
  }
}

checkKoshinetsuConsistency();
