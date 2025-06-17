const fs = require("fs");
const path = require("path");

// 从三层页面提取所有详情链接
function extractDetailLinks() {
  const pageFile = path.join(__dirname, "../src/app/kitakanto/hanabi/page.tsx");
  const content = fs.readFileSync(pageFile, "utf8");

  const detailLinkRegex = /detailLink:\s*"([^"]+)"/g;
  const links = [];
  let match;

  while ((match = detailLinkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return links;
}

// 检查页面的地图和网站信息
function checkPageMapAndWebsite(detailLink) {
  const pagePath = path.join(__dirname, "../src/app", detailLink, "page.tsx");

  if (!fs.existsSync(pagePath)) {
    return { error: "页面文件不存在" };
  }

  const content = fs.readFileSync(pagePath, "utf8");

  // 检查是否使用外部数据文件
  const importMatch = content.match(/from\s+["']@\/data\/([^"']+)["']/);

  let dataContent = content;
  let dataSource = "inline";

  if (importMatch) {
    // 使用外部数据文件
    const dataFileName = importMatch[1] + ".ts";
    const dataFilePath = path.join(__dirname, "../src/data", dataFileName);

    if (!fs.existsSync(dataFilePath)) {
      return { error: "数据文件不存在" };
    }

    dataContent = fs.readFileSync(dataFilePath, "utf8");
    dataSource = "external";
  }

  // 提取地图信息
  const mapInfo = extractMapInfo(dataContent);

  // 提取网站信息
  const websiteInfo = extractWebsiteInfo(dataContent);

  return {
    dataSource,
    mapInfo,
    websiteInfo,
  };
}

// 提取地图信息
function extractMapInfo(content) {
  const mapInfo = {
    hasMapEmbedUrl: false,
    mapEmbedUrl: "",
    hasMapInfo: false,
    mapNote: "",
    parking: "",
  };

  // 检查 mapEmbedUrl
  const mapEmbedMatch = content.match(/mapEmbedUrl:\s*["']([^"']+)["']/);
  if (mapEmbedMatch) {
    mapInfo.hasMapEmbedUrl = true;
    mapInfo.mapEmbedUrl = mapEmbedMatch[1];
  }

  // 检查 mapInfo 对象
  const mapInfoMatch = content.match(/mapInfo:\s*{([^}]+)}/);
  if (mapInfoMatch) {
    mapInfo.hasMapInfo = true;

    const mapNoteMatch = mapInfoMatch[1].match(/mapNote:\s*["']([^"']+)["']/);
    if (mapNoteMatch) {
      mapInfo.mapNote = mapNoteMatch[1];
    }

    const parkingMatch = mapInfoMatch[1].match(/parking:\s*["']([^"']+)["']/);
    if (parkingMatch) {
      mapInfo.parking = parkingMatch[1];
    }
  }

  return mapInfo;
}

// 提取网站信息
function extractWebsiteInfo(content) {
  const websiteInfo = {
    hasContact: false,
    organizer: "",
    phone: "",
    website: "",
    socialMedia: "",
  };

  // 检查 contact 对象
  const contactMatch = content.match(/contact:\s*{([^}]+)}/);
  if (contactMatch) {
    websiteInfo.hasContact = true;

    const organizerMatch = contactMatch[1].match(
      /organizer:\s*["']([^"']+)["']/
    );
    if (organizerMatch) {
      websiteInfo.organizer = organizerMatch[1];
    }

    const phoneMatch = contactMatch[1].match(/phone:\s*["']([^"']+)["']/);
    if (phoneMatch) {
      websiteInfo.phone = phoneMatch[1];
    }

    const websiteMatch = contactMatch[1].match(/website:\s*["']([^"']+)["']/);
    if (websiteMatch) {
      websiteInfo.website = websiteMatch[1];
    }

    const socialMediaMatch = contactMatch[1].match(
      /socialMedia:\s*["']([^"']+)["']/
    );
    if (socialMediaMatch) {
      websiteInfo.socialMedia = socialMediaMatch[1];
    }
  }

  return websiteInfo;
}

// 验证URL是否有效
function isValidUrl(url) {
  if (!url || url.trim() === "") return false;
  if (url === "官方网站查询" || url === "无" || url === "N/A") return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 主检查函数
function checkAllMapsAndWebsites() {
  console.log("🔍 检查北关东四层页面的谷歌地图连接和官方网站信息...\n");

  const detailLinks = extractDetailLinks();
  console.log(`📋 找到 ${detailLinks.length} 个详情页面:\n`);

  const results = [];

  detailLinks.forEach((link, index) => {
    const activityName = link.split("/").pop();
    console.log(`${index + 1}. ${activityName}`);

    const checkResult = checkPageMapAndWebsite(link);

    if (checkResult.error) {
      console.log(`   ❌ 错误: ${checkResult.error}`);
      results.push({
        link,
        activityName,
        error: checkResult.error,
      });
      console.log("");
      return;
    }

    const result = {
      link,
      activityName,
      dataSource: checkResult.dataSource,
      mapStatus: {},
      websiteStatus: {},
      issues: [],
    };

    // 检查地图信息
    const mapInfo = checkResult.mapInfo;
    result.mapStatus = {
      hasMapEmbedUrl: mapInfo.hasMapEmbedUrl,
      mapEmbedUrl: mapInfo.mapEmbedUrl,
      hasMapInfo: mapInfo.hasMapInfo,
      mapNote: mapInfo.mapNote,
      parking: mapInfo.parking,
    };

    if (!mapInfo.hasMapEmbedUrl) {
      result.issues.push("缺少谷歌地图嵌入URL (mapEmbedUrl)");
    } else if (!isValidUrl(mapInfo.mapEmbedUrl)) {
      result.issues.push("谷歌地图URL格式无效");
    }

    if (!mapInfo.hasMapInfo) {
      result.issues.push("缺少地图信息对象 (mapInfo)");
    }

    // 检查网站信息
    const websiteInfo = checkResult.websiteInfo;
    result.websiteStatus = {
      hasContact: websiteInfo.hasContact,
      organizer: websiteInfo.organizer,
      phone: websiteInfo.phone,
      website: websiteInfo.website,
      socialMedia: websiteInfo.socialMedia,
    };

    if (!websiteInfo.hasContact) {
      result.issues.push("缺少联系信息对象 (contact)");
    } else {
      if (!websiteInfo.organizer) {
        result.issues.push("缺少主办方信息 (organizer)");
      }

      if (!websiteInfo.phone) {
        result.issues.push("缺少电话信息 (phone)");
      }

      if (!websiteInfo.website) {
        result.issues.push("缺少官方网站 (website)");
      } else if (!isValidUrl(websiteInfo.website)) {
        result.issues.push("官方网站URL格式无效");
      }
    }

    // 输出检查结果
    console.log(
      `   数据源: ${
        checkResult.dataSource === "external" ? "外部文件" : "内联数据"
      }`
    );
    console.log(
      `   谷歌地图: ${mapInfo.hasMapEmbedUrl ? "✅" : "❌"} ${
        mapInfo.mapEmbedUrl ? "(有URL)" : "(无URL)"
      }`
    );
    console.log(
      `   地图信息: ${mapInfo.hasMapInfo ? "✅" : "❌"} ${
        mapInfo.mapNote ? `"${mapInfo.mapNote}"` : ""
      }`
    );
    console.log(
      `   官方网站: ${websiteInfo.website ? "✅" : "❌"} ${
        websiteInfo.website || "(无网站)"
      }`
    );
    console.log(
      `   联系电话: ${websiteInfo.phone ? "✅" : "❌"} ${
        websiteInfo.phone || "(无电话)"
      }`
    );

    if (result.issues.length > 0) {
      console.log(`   ❌ 问题 (${result.issues.length}个):`);
      result.issues.forEach((issue) => console.log(`      - ${issue}`));
    } else {
      console.log(`   ✅ 所有信息完整`);
    }

    console.log("");
    results.push(result);
  });

  // 汇总报告
  const perfectPages = results.filter(
    (r) => !r.error && r.issues.length === 0
  ).length;
  const pagesWithIssues = results.filter(
    (r) => r.error || r.issues.length > 0
  ).length;
  const totalIssues = results.reduce(
    (sum, r) => sum + (r.issues ? r.issues.length : 0),
    0
  );

  console.log("\n📊 检查结果汇总:");
  console.log(`✅ 信息完整的页面: ${perfectPages}/${results.length}`);
  console.log(`❌ 有问题的页面: ${pagesWithIssues}/${results.length}`);
  console.log(`🔧 总计需要修复的问题: ${totalIssues}个`);

  if (pagesWithIssues > 0) {
    console.log("\n🚨 需要修复的页面:");
    results.forEach((result) => {
      if (result.error || (result.issues && result.issues.length > 0)) {
        console.log(`\n${result.activityName}:`);
        if (result.error) {
          console.log(`  - 错误: ${result.error}`);
        } else {
          result.issues.forEach((issue) => console.log(`  - ${issue}`));
        }
      }
    });
  }

  // 保存详细报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: results.length,
      perfectPages,
      pagesWithIssues,
      totalIssues,
    },
    details: results,
  };

  const reportPath = path.join(
    __dirname,
    "../data/reports/kitakanto-maps-websites-check.json"
  );
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📄 详细报告已保存到: ${reportPath}`);

  return report;
}

// 运行检查
if (require.main === module) {
  checkAllMapsAndWebsites();
}

module.exports = { checkAllMapsAndWebsites };
