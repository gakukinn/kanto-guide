const fs = require("fs");
const path = require("path");

// 从三层页面提取活动信息
function extractLayer3Data() {
  const pageFile = path.join(__dirname, "../src/app/kitakanto/hanabi/page.tsx");
  const content = fs.readFileSync(pageFile, "utf8");

  // 提取活动数组
  const arrayMatch = content.match(
    /const kitakantoHanabiEvents = \[([\s\S]*?)\];/
  );
  if (!arrayMatch) {
    throw new Error("无法找到活动数组");
  }

  const activities = [];
  const eventRegex =
    /{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?date:\s*"([^"]+)",[\s\S]*?location:\s*"([^"]+)",[\s\S]*?fireworksCount:\s*"([^"]+)",[\s\S]*?fireworksCountNum:\s*(\d+),[\s\S]*?expectedVisitors:\s*"([^"]+)",[\s\S]*?expectedVisitorsNum:\s*(\d+),[\s\S]*?venue:\s*"([^"]+)",[\s\S]*?detailLink:\s*"([^"]+)",[\s\S]*?}/g;

  let match;
  while ((match = eventRegex.exec(arrayMatch[1])) !== null) {
    activities.push({
      id: match[1],
      name: match[2],
      date: match[3],
      location: match[4],
      fireworksCount: match[5],
      fireworksCountNum: parseInt(match[6]),
      expectedVisitors: match[7],
      expectedVisitorsNum: parseInt(match[8]),
      venue: match[9],
      detailLink: match[10],
    });
  }

  return activities;
}

// 从四层页面提取活动信息
function extractLayer4Data(detailLink) {
  const pagePath = path.join(__dirname, "../src/app", detailLink, "page.tsx");

  if (!fs.existsSync(pagePath)) {
    return { error: "页面文件不存在" };
  }

  const content = fs.readFileSync(pagePath, "utf8");

  // 检查是否使用外部数据文件
  const importMatch = content.match(/from\s+["']@\/data\/([^"']+)["']/);

  if (importMatch) {
    // 使用外部数据文件
    const dataFileName = importMatch[1] + ".ts";
    const dataFilePath = path.join(__dirname, "../src/data", dataFileName);

    if (!fs.existsSync(dataFilePath)) {
      return { error: "数据文件不存在" };
    }

    const dataContent = fs.readFileSync(dataFilePath, "utf8");
    return extractDataFromContent(dataContent);
  } else {
    // 内联数据定义
    return extractDataFromContent(content);
  }
}

// 从内容中提取数据
function extractDataFromContent(content) {
  const data = {};

  // 提取各种字段
  const patterns = {
    id: /id:\s*["']([^"']+)["']/,
    name: /name:\s*["']([^"']+)["']/,
    date: /date:\s*["']([^"']+)["']/,
    location: /location:\s*["']([^"']+)["']/,
    venue: /venue:\s*["']([^"']+)["']/,
    fireworksCount: /fireworksCount:\s*["']([^"']+)["']/,
    expectedVisitors: /expectedVisitors:\s*["']([^"']+)["']/,
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = content.match(pattern);
    if (match) {
      data[key] = match[1];
    }
  }

  // 提取数字值
  const fireworksNumMatch = content.match(
    /fireworksCount:\s*["']約?(\d+(?:,\d+)*)発?["']/
  );
  if (fireworksNumMatch) {
    data.fireworksCountNum = parseInt(fireworksNumMatch[1].replace(/,/g, ""));
  }

  const visitorsNumMatch = content.match(
    /expectedVisitors:\s*["']約?(\d+(?:,\d+)*)万?人?["']/
  );
  if (visitorsNumMatch) {
    data.expectedVisitorsNum =
      parseInt(visitorsNumMatch[1].replace(/,/g, "")) * 10000;
  }

  return data;
}

// 从数据库提取活动信息
function extractDatabaseData() {
  const dbPath = path.join(
    __dirname,
    "../data/kitakanto-hanabi-ranking-verified-2025-06-14.json"
  );

  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const dbContent = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return dbContent.events || [];
}

// 标准化数据格式
function normalizeData(data, source) {
  return {
    source,
    id: data.id || "",
    name: data.name || data.title || "",
    date: data.date || "",
    location: data.location || data.venue || "",
    fireworksCount: data.fireworksCount || "",
    fireworksCountNum: data.fireworksCountNum || 0,
    expectedVisitors: data.expectedVisitors || data.visitors || "",
    expectedVisitorsNum: data.expectedVisitorsNum || 0,
  };
}

// 比较两个数据项
function compareData(data1, data2, field) {
  const val1 = data1[field];
  const val2 = data2[field];

  if (field.includes("Num")) {
    return Math.abs(val1 - val2) <= val1 * 0.1; // 允许10%误差
  }

  if (field === "date") {
    // 日期比较，允许格式差异
    const date1 = val1
      .replace(/[年月日()土]/g, "")
      .replace(/第.*周六/, "")
      .trim();
    const date2 = val2
      .replace(/[年月日()土]/g, "")
      .replace(/第.*周六/, "")
      .trim();
    return date1.includes(date2) || date2.includes(date1);
  }

  if (field === "location") {
    // 地点比较，允许部分匹配
    return (
      val1.includes(val2) ||
      val2.includes(val1) ||
      val1.replace(/[県市町]/g, "").includes(val2.replace(/[県市町]/g, ""))
    );
  }

  return val1 === val2;
}

// 主检查函数
function checkConsistency() {
  console.log("🔍 检查北关东活动信息一致性...\n");

  // 获取三层页面数据
  const layer3Data = extractLayer3Data();
  console.log(`📋 三层页面找到 ${layer3Data.length} 个活动\n`);

  // 获取数据库数据
  const dbData = extractDatabaseData();
  console.log(`📋 数据库找到 ${dbData.length} 个活动\n`);

  const results = [];

  layer3Data.forEach((activity, index) => {
    console.log(`${index + 1}. 检查活动: ${activity.name}`);

    // 获取四层页面数据
    const layer4Data = extractLayer4Data(activity.detailLink);

    // 在数据库中查找匹配的活动
    const dbMatch = dbData.find(
      (db) =>
        db.title.includes(activity.name.replace(/第\d+回\s*/, "")) ||
        activity.name.includes(db.title.replace(/第\d+回\s*/, ""))
    );

    const normalized = {
      layer3: normalizeData(activity, "Layer3"),
      layer4: normalizeData(layer4Data, "Layer4"),
      database: dbMatch ? normalizeData(dbMatch, "Database") : null,
    };

    const comparison = {
      activity: activity.name,
      id: activity.id,
      detailLink: activity.detailLink,
      issues: [],
      consistency: {
        layer3_layer4: {},
        layer3_database: {},
        layer4_database: {},
      },
    };

    // 比较字段
    const fieldsToCheck = [
      "date",
      "location",
      "fireworksCount",
      "expectedVisitors",
    ];

    fieldsToCheck.forEach((field) => {
      // Layer3 vs Layer4
      if (layer4Data.error) {
        comparison.consistency.layer3_layer4[field] = "Layer4错误";
      } else {
        const match = compareData(normalized.layer3, normalized.layer4, field);
        comparison.consistency.layer3_layer4[field] = match ? "✅" : "❌";
        if (!match) {
          comparison.issues.push(
            `Layer3-Layer4 ${field}不一致: "${normalized.layer3[field]}" vs "${normalized.layer4[field]}"`
          );
        }
      }

      // Layer3 vs Database
      if (!normalized.database) {
        comparison.consistency.layer3_database[field] = "数据库无匹配";
      } else {
        const match = compareData(
          normalized.layer3,
          normalized.database,
          field
        );
        comparison.consistency.layer3_database[field] = match ? "✅" : "❌";
        if (!match) {
          comparison.issues.push(
            `Layer3-Database ${field}不一致: "${normalized.layer3[field]}" vs "${normalized.database[field]}"`
          );
        }
      }

      // Layer4 vs Database
      if (layer4Data.error || !normalized.database) {
        comparison.consistency.layer4_database[field] = "无法比较";
      } else {
        const match = compareData(
          normalized.layer4,
          normalized.database,
          field
        );
        comparison.consistency.layer4_database[field] = match ? "✅" : "❌";
        if (!match) {
          comparison.issues.push(
            `Layer4-Database ${field}不一致: "${normalized.layer4[field]}" vs "${normalized.database[field]}"`
          );
        }
      }
    });

    // 输出结果
    console.log(
      `   Layer3-Layer4: ${
        Object.values(comparison.consistency.layer3_layer4).filter(
          (v) => v === "✅"
        ).length
      }/4 一致`
    );
    console.log(
      `   Layer3-Database: ${
        Object.values(comparison.consistency.layer3_database).filter(
          (v) => v === "✅"
        ).length
      }/4 一致`
    );
    console.log(
      `   Layer4-Database: ${
        Object.values(comparison.consistency.layer4_database).filter(
          (v) => v === "✅"
        ).length
      }/4 一致`
    );

    if (comparison.issues.length > 0) {
      console.log(`   ❌ 问题: ${comparison.issues.length}个`);
      comparison.issues.forEach((issue) => console.log(`      - ${issue}`));
    } else {
      console.log(`   ✅ 所有信息一致`);
    }

    console.log("");
    results.push(comparison);
  });

  // 汇总报告
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const perfectActivities = results.filter((r) => r.issues.length === 0).length;

  console.log("\n📊 一致性检查汇总:");
  console.log(`✅ 完全一致的活动: ${perfectActivities}/${results.length}`);
  console.log(
    `❌ 有不一致问题的活动: ${results.length - perfectActivities}/${
      results.length
    }`
  );
  console.log(`🔧 总计需要修复的问题: ${totalIssues}个`);

  if (totalIssues > 0) {
    console.log("\n🚨 需要修复的不一致问题:");
    results.forEach((result) => {
      if (result.issues.length > 0) {
        console.log(`\n${result.activity}:`);
        result.issues.forEach((issue) => console.log(`  - ${issue}`));
      }
    });
  }

  // 保存详细报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalActivities: results.length,
      perfectActivities,
      activitiesWithIssues: results.length - perfectActivities,
      totalIssues,
    },
    details: results,
  };

  const reportPath = path.join(
    __dirname,
    "../data/reports/kitakanto-consistency-check.json"
  );
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📄 详细报告已保存到: ${reportPath}`);

  return report;
}

// 运行检查
if (require.main === module) {
  checkConsistency();
}

module.exports = { checkConsistency };
