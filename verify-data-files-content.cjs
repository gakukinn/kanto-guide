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

console.log("=== 重新验证北关东四层页面数据文件内容 ===\n");

function findDataFile(activityId) {
  const pagePath = `src/app/kitakanto/hanabi/${activityId}/page.tsx`;

  if (!fs.existsSync(pagePath)) {
    return null;
  }

  const pageContent = fs.readFileSync(pagePath, "utf8");

  // 查找import语句中的数据文件
  const importMatches = pageContent.match(
    /import\s+{[^}]+}\s+from\s+["']([^"']+)["']/g
  );

  if (!importMatches) {
    return null;
  }

  for (const importMatch of importMatches) {
    const pathMatch = importMatch.match(/from\s+["']([^"']+)["']/);
    if (pathMatch) {
      const importPath = pathMatch[1];

      // 跳过组件导入
      if (importPath.includes("components") || importPath === "next") {
        continue;
      }

      // 转换路径
      let dataFilePath;
      if (importPath.startsWith("@/")) {
        dataFilePath = `src/${importPath.slice(2)}.ts`;
      } else if (importPath.startsWith("../")) {
        // 相对路径处理
        const basePath = path.dirname(pagePath);
        dataFilePath = path.resolve(basePath, importPath + ".ts");
      } else {
        dataFilePath = importPath + ".ts";
      }

      // 检查文件是否存在
      if (fs.existsSync(dataFilePath)) {
        return dataFilePath;
      }

      // 尝试.js扩展名
      const jsPath = dataFilePath.replace(".ts", ".js");
      if (fs.existsSync(jsPath)) {
        return jsPath;
      }
    }
  }

  return null;
}

function checkDataFileContent(dataFilePath) {
  if (!dataFilePath || !fs.existsSync(dataFilePath)) {
    return {
      hasMapEmbedUrl: false,
      hasMapInfo: false,
      hasContactWebsite: false,
      hasGoogleMapsUrl: false,
      details: "数据文件不存在",
    };
  }

  const content = fs.readFileSync(dataFilePath, "utf8");

  // 检查各种地图相关字段
  const hasMapEmbedUrl =
    content.includes("mapEmbedUrl") &&
    content.includes("google.com/maps/embed");
  const hasMapInfo =
    content.includes("mapInfo") && content.includes("hasMap: true");
  const hasGoogleMapsUrl =
    content.includes("maps.google.com") || content.includes("google.com/maps");

  // 检查网站相关字段
  const hasContactWebsite =
    content.includes("website:") && content.includes("http");

  // 提取具体信息
  let mapEmbedUrl = "";
  let websiteUrl = "";

  const mapEmbedMatch = content.match(/mapEmbedUrl:\s*["']([^"']+)["']/);
  if (mapEmbedMatch) {
    mapEmbedUrl = mapEmbedMatch[1];
  }

  const websiteMatch = content.match(/website:\s*["']([^"']+)["']/);
  if (websiteMatch) {
    websiteUrl = websiteMatch[1];
  }

  return {
    hasMapEmbedUrl,
    hasMapInfo,
    hasContactWebsite,
    hasGoogleMapsUrl,
    mapEmbedUrl,
    websiteUrl,
    details: "已检查",
  };
}

// 检查所有活动
const results = [];

kitakantoActivities.forEach((activityId) => {
  console.log(`📍 检查 ${activityId}:`);

  const dataFilePath = findDataFile(activityId);
  console.log(`   数据文件: ${dataFilePath || "未找到"}`);

  if (dataFilePath) {
    const analysis = checkDataFileContent(dataFilePath);

    console.log(`   地图嵌入URL: ${analysis.hasMapEmbedUrl ? "✅" : "❌"}`);
    console.log(`   地图信息字段: ${analysis.hasMapInfo ? "✅" : "❌"}`);
    console.log(`   谷歌地图链接: ${analysis.hasGoogleMapsUrl ? "✅" : "❌"}`);
    console.log(`   联系网站: ${analysis.hasContactWebsite ? "✅" : "❌"}`);

    if (analysis.mapEmbedUrl) {
      console.log(`   地图URL: ${analysis.mapEmbedUrl.substring(0, 50)}...`);
    }
    if (analysis.websiteUrl) {
      console.log(`   网站URL: ${analysis.websiteUrl}`);
    }

    const hasCompleteMapInfo = analysis.hasMapEmbedUrl || analysis.hasMapInfo;
    const hasCompleteWebsiteInfo = analysis.hasContactWebsite;

    console.log(`   🗺️ 地图信息完整: ${hasCompleteMapInfo ? "✅" : "❌"}`);
    console.log(`   🌐 网站信息完整: ${hasCompleteWebsiteInfo ? "✅" : "❌"}`);

    results.push({
      activityId,
      dataFilePath,
      hasCompleteMapInfo,
      hasCompleteWebsiteInfo,
      ...analysis,
    });
  } else {
    console.log(`   ❌ 未找到数据文件`);
    results.push({
      activityId,
      dataFilePath: null,
      hasCompleteMapInfo: false,
      hasCompleteWebsiteInfo: false,
    });
  }

  console.log("");
});

// 统计结果
const totalPages = results.length;
const pagesWithMaps = results.filter((r) => r.hasCompleteMapInfo).length;
const pagesWithWebsites = results.filter(
  (r) => r.hasCompleteWebsiteInfo
).length;
const missingMaps = results.filter((r) => !r.hasCompleteMapInfo);
const missingWebsites = results.filter((r) => !r.hasCompleteWebsiteInfo);

console.log("=== 验证结果统计 ===");
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

if (missingMaps.length > 0) {
  console.log(`\n❌ 缺少地图信息的页面 (${missingMaps.length}个):`);
  missingMaps.forEach((item) => {
    console.log(
      `   - ${item.activityId} ${
        item.dataFilePath ? "(有数据文件)" : "(无数据文件)"
      }`
    );
  });
}

if (missingWebsites.length > 0) {
  console.log(`\n❌ 缺少网站信息的页面 (${missingWebsites.length}个):`);
  missingWebsites.forEach((item) => {
    console.log(
      `   - ${item.activityId} ${
        item.dataFilePath ? "(有数据文件)" : "(无数据文件)"
      }`
    );
  });
}

// 保存详细结果到JSON文件
const detailedResults = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPages,
    pagesWithMaps,
    pagesWithWebsites,
    missingMapsCount: missingMaps.length,
    missingWebsitesCount: missingWebsites.length,
  },
  results,
};

fs.writeFileSync(
  "kitakanto-maps-websites-verification.json",
  JSON.stringify(detailedResults, null, 2)
);
console.log("\n✅ 详细结果已保存到 kitakanto-maps-websites-verification.json");
