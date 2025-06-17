const fs = require("fs");
const path = require("path");

// 从三层页面提取所有detailLink
const pageFilePath = path.join(
  __dirname,
  "../../src/app/tokyo/hanabi/page.tsx"
);
const pageContent = fs.readFileSync(pageFilePath, "utf8");

// 提取所有detailLink
const detailLinkRegex = /detailLink: "([^"]+)"/g;
const detailLinks = [];
let match;
while ((match = detailLinkRegex.exec(pageContent)) !== null) {
  detailLinks.push(match[1]);
}

console.log("🔍 检查东京花火活动的四层详情页面...\n");
console.log(`总共找到 ${detailLinks.length} 个详情链接：\n`);

const results = [];

detailLinks.forEach((link, index) => {
  // 将链接转换为文件路径
  const filePath = path.join(__dirname, "../../src/app", link, "page.tsx");
  const exists = fs.existsSync(filePath);

  const result = {
    index: index + 1,
    link: link,
    filePath: filePath.replace(path.join(__dirname, "../../"), ""),
    exists: exists,
    status: exists ? "✅ 存在" : "❌ 缺失",
  };

  results.push(result);

  console.log(`${result.index}. ${result.link}`);
  console.log(`   文件路径: ${result.filePath}`);
  console.log(`   状态: ${result.status}\n`);
});

// 统计结果
const existingPages = results.filter((r) => r.exists);
const missingPages = results.filter((r) => !r.exists);

console.log("📊 统计结果：");
console.log(`✅ 存在的页面: ${existingPages.length}/${results.length}`);
console.log(`❌ 缺失的页面: ${missingPages.length}/${results.length}\n`);

if (missingPages.length > 0) {
  console.log("❌ 缺失的页面列表：");
  missingPages.forEach((page) => {
    console.log(`- ${page.link} (${page.filePath})`);
  });
  console.log("\n⚠️  请向用户汇报这些缺失的页面，等待指令后再添加。");
} else {
  console.log("🎉 所有四层详情页面都已存在！");
}

// 保存检查结果到文件
const reportPath = path.join(__dirname, "tokyo-hanabi-pages-check-report.json");
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      totalPages: results.length,
      existingPages: existingPages.length,
      missingPages: missingPages.length,
      results: results,
      missingPagesList: missingPages,
    },
    null,
    2
  ),
  "utf8"
);

console.log(`\n📄 详细报告已保存到: ${reportPath}`);
