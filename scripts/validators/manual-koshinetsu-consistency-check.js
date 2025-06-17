const fs = require("fs");
const path = require("path");

// 甲信越花火三层列表数据
const koshinetsuHanabiEvents = [
  {
    id: "kawaguchiko-kojosai-2025",
    name: "河口湖湖上祭",
    date: "2025年8月5日",
    location: "河口湖畔船津浜",
    fireworksCount: 10000,
    expectedVisitors: 100000,
  },
  {
    id: "ichikawa-shinmei-hanabi-2024",
    name: "市川三郷町ふるさと夏まつり　第37回「神明の花火大会」",
    date: "2025年8月7日",
    location: "三郡橋下流笛吹川河畔",
    fireworksCount: 20000,
    expectedVisitors: 200000,
  },
  {
    id: "anime-classics-anison-hanabi",
    name: "アニメクラシックス アニソン花火",
    date: "2025年7月5日",
    location: "富士川いきいきスポーツ公園 特設会場",
    fireworksCount: 10000,
    expectedVisitors: "未公布",
  },
  {
    id: "nagaoka-matsuri-hanabi",
    name: "長岡まつり大花火大会",
    date: "2025年8月2日、3日",
    location: "信濃川河川敷",
    fireworksCount: 20000,
    expectedVisitors: 345000,
  },
  {
    id: "gion-kashiwazaki-matsuri-hanabi",
    name: "ぎおん柏崎まつり 海の大花火大会",
    date: "2025年7月26日",
    location: "柏崎市中央海岸・みなとまち海浜公園一帯",
    fireworksCount: 16000,
    expectedVisitors: 170000,
  },
];

// 检查四层详情文件是否存在
function checkDetailFiles() {
  const results = [];

  for (const event of koshinetsuHanabiEvents) {
    const detailFilePath = path.join(
      __dirname,
      "../../src/data",
      `level5-${event.id}.ts`
    );

    const result = {
      id: event.id,
      name: event.name,
      threeLayerData: {
        date: event.date,
        location: event.location,
        fireworksCount: event.fireworksCount,
        expectedVisitors: event.expectedVisitors,
      },
      fourLayerExists: fs.existsSync(detailFilePath),
      fourLayerData: null,
      consistency: {},
    };

    if (result.fourLayerExists) {
      try {
        const fileContent = fs.readFileSync(detailFilePath, "utf8");

        // 提取关键字段
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        const fireworksMatch = fileContent.match(
          /fireworksCount:\s*["']([^"']+)["']/
        );
        const visitorsMatch = fileContent.match(
          /expectedVisitors:\s*["']([^"']+)["']/
        );
        const nameMatch = fileContent.match(/name:\s*["']([^"']+)["']/);

        result.fourLayerData = {
          date: dateMatch ? dateMatch[1] : "Not found",
          fireworksCount: fireworksMatch ? fireworksMatch[1] : "Not found",
          expectedVisitors: visitorsMatch ? visitorsMatch[1] : "Not found",
          name: nameMatch ? nameMatch[1] : "Not found",
        };

        // 检查一致性
        result.consistency.dateConsistent = checkDateConsistency(
          event.date,
          result.fourLayerData.date
        );
        result.consistency.fireworksConsistent = checkFireworksConsistency(
          event.fireworksCount,
          result.fourLayerData.fireworksCount
        );
        result.consistency.visitorsConsistent = checkVisitorsConsistency(
          event.expectedVisitors,
          result.fourLayerData.expectedVisitors
        );
      } catch (error) {
        result.fourLayerData = { error: error.message };
      }
    }

    results.push(result);
  }

  return results;
}

function checkDateConsistency(threeLayer, fourLayer) {
  if (!fourLayer || fourLayer === "Not found") return false;

  // 将日期格式统一
  const threeLayerFormatted = threeLayer
    .replace(/年|月|日/g, "")
    .replace(/、/g, ",");
  const fourLayerFormatted = fourLayer.replace(/-/g, "");

  // 简单匹配主要日期部分
  return (
    threeLayerFormatted.includes(fourLayerFormatted.substring(0, 8)) ||
    fourLayerFormatted.includes(threeLayerFormatted.substring(0, 8))
  );
}

function checkFireworksConsistency(threeLayer, fourLayer) {
  if (!fourLayer || fourLayer === "Not found") return false;

  // 转换数字
  const threeLayerNum =
    typeof threeLayer === "number" ? threeLayer : parseInt(threeLayer);

  // 处理四层的文字表述
  if (fourLayer.includes("万")) {
    const num = parseFloat(fourLayer.replace(/[^0-9.]/g, ""));
    return threeLayerNum === num * 10000;
  }

  const fourLayerNum = parseInt(fourLayer.replace(/[^0-9]/g, ""));
  return threeLayerNum === fourLayerNum;
}

function checkVisitorsConsistency(threeLayer, fourLayer) {
  if (!fourLayer || fourLayer === "Not found") return false;

  // 如果都是"未公布"
  if (
    (threeLayer === "未公布" || threeLayer === "未公开") &&
    (fourLayer === "未公布" || fourLayer === "未公开")
  ) {
    return true;
  }

  // 如果三层是数字，四层是文字
  if (typeof threeLayer === "number" && typeof fourLayer === "string") {
    if (fourLayer.includes("万")) {
      const num = parseFloat(fourLayer.replace(/[^0-9.]/g, ""));
      return threeLayer === num * 10000;
    }
    const fourLayerNum = parseInt(fourLayer.replace(/[^0-9]/g, ""));
    return threeLayer === fourLayerNum;
  }

  return threeLayer === fourLayer;
}

function generateReport(results) {
  console.log("\n🎆 甲信越花火活动数据一致性检查报告");
  console.log("=" * 60);

  let totalEvents = results.length;
  let eventsWithDetails = results.filter((r) => r.fourLayerExists).length;
  let consistentEvents = 0;

  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.name}`);
    console.log(`   ID: ${result.id}`);
    console.log(
      `   四层详情文件: ${result.fourLayerExists ? "✅ 存在" : "❌ 不存在"}`
    );

    if (result.fourLayerExists) {
      console.log("   三层数据:");
      console.log(`     日期: ${result.threeLayerData.date}`);
      console.log(`     地点: ${result.threeLayerData.location}`);
      console.log(`     花火数: ${result.threeLayerData.fireworksCount}`);
      console.log(`     观众数: ${result.threeLayerData.expectedVisitors}`);

      console.log("   四层数据:");
      if (result.fourLayerData.error) {
        console.log(`     ❌ 读取错误: ${result.fourLayerData.error}`);
      } else {
        console.log(`     日期: ${result.fourLayerData.date}`);
        console.log(`     花火数: ${result.fourLayerData.fireworksCount}`);
        console.log(`     观众数: ${result.fourLayerData.expectedVisitors}`);

        console.log("   一致性检查:");
        console.log(
          `     日期: ${result.consistency.dateConsistent ? "✅" : "❌"}`
        );
        console.log(
          `     花火数: ${result.consistency.fireworksConsistent ? "✅" : "❌"}`
        );
        console.log(
          `     观众数: ${result.consistency.visitorsConsistent ? "✅" : "❌"}`
        );

        if (
          result.consistency.dateConsistent &&
          result.consistency.fireworksConsistent &&
          result.consistency.visitorsConsistent
        ) {
          consistentEvents++;
        }
      }
    }
  });

  console.log("\n📊 统计摘要:");
  console.log(`   总活动数: ${totalEvents}`);
  console.log(`   有详情文件: ${eventsWithDetails}`);
  console.log(`   数据一致: ${consistentEvents}`);
  console.log(
    `   一致性率: ${
      eventsWithDetails > 0
        ? Math.round((consistentEvents / eventsWithDetails) * 100)
        : 0
    }%`
  );

  // 报告不一致的活动
  const inconsistentEvents = results.filter(
    (r) =>
      r.fourLayerExists &&
      !r.fourLayerData.error &&
      (!r.consistency.dateConsistent ||
        !r.consistency.fireworksConsistent ||
        !r.consistency.visitorsConsistent)
  );

  if (inconsistentEvents.length > 0) {
    console.log("\n⚠️ 数据不一致的活动:");
    inconsistentEvents.forEach((event) => {
      console.log(`   ${event.name}:`);
      if (!event.consistency.dateConsistent) console.log("     - 日期不一致");
      if (!event.consistency.fireworksConsistent)
        console.log("     - 花火数不一致");
      if (!event.consistency.visitorsConsistent)
        console.log("     - 观众数不一致");
    });
  }
}

// 主函数
function main() {
  console.log("开始甲信越花火活动数据一致性检查...");

  const results = checkDetailFiles();
  generateReport(results);

  // 输出到文件
  const reportPath = path.join(
    __dirname,
    "../../data/reports/koshinetsu-consistency-manual-check.json"
  );
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📝 详细报告已保存到: ${reportPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { checkDetailFiles, generateReport };
