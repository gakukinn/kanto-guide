const fs = require("fs");
const path = require("path");

// 从页面文件中提取所有详情链接
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

// 检查页面文件是否存在
function checkPageExists(detailLink) {
  // 将链接转换为文件路径
  const filePath = path.join(__dirname, "../src/app", detailLink, "page.tsx");
  return fs.existsSync(filePath);
}

// 检查数据文件是否存在
function checkDataFileExists(detailLink) {
  const pagePath = path.join(__dirname, "../src/app", detailLink, "page.tsx");

  if (!fs.existsSync(pagePath)) {
    return { exists: false, reason: "Page file not found" };
  }

  const pageContent = fs.readFileSync(pagePath, "utf8");

  // 提取数据文件导入
  const importMatch = pageContent.match(/from\s+["']@\/data\/([^"']+)["']/);
  if (!importMatch) {
    return { exists: false, reason: "No data import found" };
  }

  const dataFileName = importMatch[1] + ".ts";
  const dataFilePath = path.join(__dirname, "../src/data", dataFileName);

  return {
    exists: fs.existsSync(dataFilePath),
    dataFile: dataFileName,
    reason: fs.existsSync(dataFilePath) ? "OK" : "Data file not found",
  };
}

// 主检查函数
function checkAllDetailLinks() {
  console.log("🔍 检查北关东花火大会详情链接...\n");

  const detailLinks = extractDetailLinks();
  console.log(`📋 找到 ${detailLinks.length} 个详情链接:\n`);

  const results = [];

  detailLinks.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);

    const pageExists = checkPageExists(link);
    const dataCheck = checkDataFileExists(link);

    const result = {
      link,
      pageExists,
      dataExists: dataCheck.exists,
      dataFile: dataCheck.dataFile,
      status: pageExists && dataCheck.exists ? "✅ 正常" : "❌ 有问题",
      issues: [],
    };

    if (!pageExists) {
      result.issues.push("页面文件不存在");
    }

    if (!dataCheck.exists) {
      result.issues.push(`数据文件问题: ${dataCheck.reason}`);
    }

    console.log(`   页面文件: ${pageExists ? "✅" : "❌"}`);
    console.log(
      `   数据文件: ${dataCheck.exists ? "✅" : "❌"} ${
        dataCheck.dataFile || ""
      }`
    );
    console.log(`   状态: ${result.status}`);

    if (result.issues.length > 0) {
      console.log(`   问题: ${result.issues.join(", ")}`);
    }

    console.log("");
    results.push(result);
  });

  // 汇总报告
  const workingLinks = results.filter((r) => r.pageExists && r.dataExists);
  const brokenLinks = results.filter((r) => !r.pageExists || !r.dataExists);

  console.log("\n📊 检查结果汇总:");
  console.log(`✅ 正常链接: ${workingLinks.length}/${results.length}`);
  console.log(`❌ 有问题链接: ${brokenLinks.length}/${results.length}`);

  if (brokenLinks.length > 0) {
    console.log("\n🚨 需要修复的链接:");
    brokenLinks.forEach((link) => {
      console.log(`- ${link.link}: ${link.issues.join(", ")}`);
    });
  }

  // 保存详细报告
  const report = {
    timestamp: new Date().toISOString(),
    totalLinks: results.length,
    workingLinks: workingLinks.length,
    brokenLinks: brokenLinks.length,
    details: results,
  };

  const reportPath = path.join(
    __dirname,
    "../data/reports/kitakanto-hanabi-links-check.json"
  );
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n📄 详细报告已保存到: ${reportPath}`);

  return report;
}

// 运行检查
if (require.main === module) {
  checkAllDetailLinks();
}

module.exports = { checkAllDetailLinks };
