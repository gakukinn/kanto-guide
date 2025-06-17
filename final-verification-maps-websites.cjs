const fs = require("fs");
const path = require("path");

// 北关东活动列表
const kitakantoActivities = [
  "ashikaga",
  "moka",
  "takasaki",
  "joso-kinugawa-hanabi-2025",
  "numata-hanabi-2025",
  "oarai-hanabi-2025",
  "koga-hanabi-2025",
  "mito-hanabi-2025",
  "tsuchiura-hanabi-2025",
  "toride-hanabi-2025",
  "tonegawa-hanabi-2025",
  "oyama-hanabi-2025",
  "maebashi-hanabi-2025",
  "tamamura-hanabi-2025",
];

console.log("=== 最终验证北关东四层页面地图和网站信息 ===\n");

function checkPageAndDataFile(activityId) {
  const pagePath = `src/app/kitakanto/hanabi/${activityId}/page.tsx`;

  if (!fs.existsSync(pagePath)) {
    return {
      activityId,
      exists: false,
      hasMapInfo: false,
      hasWebsiteInfo: false,
      dataSource: "none",
    };
  }

  const pageContent = fs.readFileSync(pagePath, "utf8");

  // 检查页面本身是否包含地图和网站信息
  const pageHasMapEmbedUrl =
    pageContent.includes("mapEmbedUrl") &&
    pageContent.includes("google.com/maps/embed");
  const pageHasMapInfo =
    pageContent.includes("mapInfo") && pageContent.includes("hasMap: true");
  const pageHasWebsite =
    pageContent.includes("website:") && pageContent.includes("http");

  let dataFileMapInfo = false;
  let dataFileWebsiteInfo = false;
  let dataFilePath = null;

  // 查找外部数据文件
  const importMatches = pageContent.match(
    /import\s+{[^}]+}\s+from\s+["']([^"']+)["']/g
  );

  if (importMatches) {
    for (const importMatch of importMatches) {
      const pathMatch = importMatch.match(/from\s+["']([^"']+)["']/);
      if (pathMatch) {
        const importPath = pathMatch[1];

        // 跳过组件导入
        if (importPath.includes("components") || importPath === "next") {
          continue;
        }

        // 转换路径
        let possibleDataFilePath;
        if (importPath.startsWith("@/")) {
          possibleDataFilePath = `src/${importPath.slice(2)}.ts`;
        } else if (importPath.startsWith("../")) {
          const basePath = path.dirname(pagePath);
          possibleDataFilePath = path.resolve(basePath, importPath + ".ts");
        } else {
          possibleDataFilePath = importPath + ".ts";
        }

        // 检查文件是否存在
        if (fs.existsSync(possibleDataFilePath)) {
          dataFilePath = possibleDataFilePath;
          const dataContent = fs.readFileSync(possibleDataFilePath, "utf8");
          dataFileMapInfo =
            (dataContent.includes("mapEmbedUrl") &&
              dataContent.includes("google.com/maps/embed")) ||
            (dataContent.includes("mapInfo") &&
              dataContent.includes("hasMap: true"));
          dataFileWebsiteInfo =
            dataContent.includes("website:") && dataContent.includes("http");
          break;
        }

        // 尝试.js扩展名
        const jsPath = possibleDataFilePath.replace(".ts", ".js");
        if (fs.existsSync(jsPath)) {
          dataFilePath = jsPath;
          const dataContent = fs.readFileSync(jsPath, "utf8");
          dataFileMapInfo =
            (dataContent.includes("mapEmbedUrl") &&
              dataContent.includes("google.com/maps/embed")) ||
            (dataContent.includes("mapInfo") &&
              dataContent.includes("hasMap: true"));
          dataFileWebsiteInfo =
            dataContent.includes("website:") && dataContent.includes("http");
          break;
        }
      }
    }
  }

  // 综合判断
  const hasCompleteMapInfo =
    pageHasMapEmbedUrl || pageHasMapInfo || dataFileMapInfo;
  const hasCompleteWebsiteInfo = pageHasWebsite || dataFileWebsiteInfo;

  let dataSource = "none";
  if (dataFilePath && (dataFileMapInfo || dataFileWebsiteInfo)) {
    dataSource = "external_file";
  } else if (pageHasMapEmbedUrl || pageHasMapInfo || pageHasWebsite) {
    dataSource = "inline_data";
  }

  return {
    activityId,
    exists: true,
    hasMapInfo: hasCompleteMapInfo,
    hasWebsiteInfo: hasCompleteWebsiteInfo,
    dataSource,
    dataFilePath,
    pageMapInfo: pageHasMapEmbedUrl || pageHasMapInfo,
    pageWebsiteInfo: pageHasWebsite,
    dataFileMapInfo,
    dataFileWebsiteInfo,
  };
}

// 检查所有活动
const results = [];

kitakantoActivities.forEach((activityId) => {
  console.log(`📍 检查 ${activityId}:`);

  const analysis = checkPageAndDataFile(activityId);

  if (!analysis.exists) {
    console.log(`   ❌ 页面不存在`);
    results.push(analysis);
    console.log("");
    return;
  }

  console.log(
    `   数据来源: ${
      analysis.dataSource === "external_file"
        ? "外部数据文件"
        : analysis.dataSource === "inline_data"
        ? "页面内联数据"
        : "未知"
    }`
  );

  if (analysis.dataFilePath) {
    console.log(`   数据文件: ${analysis.dataFilePath}`);
  }

  console.log(`   页面地图信息: ${analysis.pageMapInfo ? "✅" : "❌"}`);
  console.log(`   页面网站信息: ${analysis.pageWebsiteInfo ? "✅" : "❌"}`);

  if (analysis.dataFilePath) {
    console.log(
      `   数据文件地图信息: ${analysis.dataFileMapInfo ? "✅" : "❌"}`
    );
    console.log(
      `   数据文件网站信息: ${analysis.dataFileWebsiteInfo ? "✅" : "❌"}`
    );
  }

  console.log(`   🗺️ 地图信息完整: ${analysis.hasMapInfo ? "✅" : "❌"}`);
  console.log(`   🌐 网站信息完整: ${analysis.hasWebsiteInfo ? "✅" : "❌"}`);

  results.push(analysis);
  console.log("");
});

// 统计结果
const existingPages = results.filter((r) => r.exists);
const totalPages = existingPages.length;
const pagesWithMaps = existingPages.filter((r) => r.hasMapInfo).length;
const pagesWithWebsites = existingPages.filter((r) => r.hasWebsiteInfo).length;
const missingMaps = existingPages.filter((r) => !r.hasMapInfo);
const missingWebsites = existingPages.filter((r) => !r.hasWebsiteInfo);

console.log("=== 最终验证结果 ===");
console.log(`总页面数: ${totalPages}`);
console.log(
  `有完整地图信息: ${pagesWithMaps} (${(
    (pagesWithMaps / totalPages) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `有完整网站信息: ${pagesWithWebsites} (${(
    (pagesWithWebsites / totalPages) *
    100
  ).toFixed(1)}%)`
);

// 按数据源分类统计
const externalFilePages = existingPages.filter(
  (r) => r.dataSource === "external_file"
).length;
const inlineDataPages = existingPages.filter(
  (r) => r.dataSource === "inline_data"
).length;

console.log(`\n=== 数据源分布 ===`);
console.log(
  `使用外部数据文件: ${externalFilePages} (${(
    (externalFilePages / totalPages) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `使用页面内联数据: ${inlineDataPages} (${(
    (inlineDataPages / totalPages) *
    100
  ).toFixed(1)}%)`
);

if (missingMaps.length > 0) {
  console.log(`\n❌ 缺少地图信息的页面 (${missingMaps.length}个):`);
  missingMaps.forEach((item) => {
    console.log(`   - ${item.activityId} (${item.dataSource})`);
  });
} else {
  console.log(`\n✅ 所有页面都有完整的地图信息！`);
}

if (missingWebsites.length > 0) {
  console.log(`\n❌ 缺少网站信息的页面 (${missingWebsites.length}个):`);
  missingWebsites.forEach((item) => {
    console.log(`   - ${item.activityId} (${item.dataSource})`);
  });
} else {
  console.log(`\n✅ 所有页面都有完整的网站信息！`);
}

// 保存最终结果
const finalResults = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPages,
    pagesWithMaps,
    pagesWithWebsites,
    externalFilePages,
    inlineDataPages,
    missingMapsCount: missingMaps.length,
    missingWebsitesCount: missingWebsites.length,
    completionRate: {
      maps: ((pagesWithMaps / totalPages) * 100).toFixed(1) + "%",
      websites: ((pagesWithWebsites / totalPages) * 100).toFixed(1) + "%",
    },
  },
  results: existingPages,
};

fs.writeFileSync(
  "kitakanto-final-maps-websites-verification.json",
  JSON.stringify(finalResults, null, 2)
);
console.log(
  "\n✅ 最终验证结果已保存到 kitakanto-final-maps-websites-verification.json"
);

if (pagesWithMaps === totalPages && pagesWithWebsites === totalPages) {
  console.log("\n🎉 恭喜！所有北关东四层页面都已具备完整的地图和网站信息！");
  console.log(
    "📋 统一标准已达成：所有页面都有mapEmbedUrl/mapInfo和contact.website字段"
  );
} else {
  console.log("\n📝 建议：需要为缺少信息的页面补充地图和网站信息");
}
