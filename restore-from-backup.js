const fs = require("fs");
const path = require("path");

const criticalFiles = [
  "app/layout.tsx",
  "app/page.tsx", 
  "app/not-found.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/tokyo/page.tsx",
  "app/tokyo/momiji/page.tsx",
  "app/tokyo/hanabi/page.tsx",
  "app/saitama/page.tsx",
  "app/saitama/hanami/page.tsx",
  "app/chiba/page.tsx",
  "app/chiba/hanami/page.tsx",
  "app/kanagawa/page.tsx",
  "app/kanagawa/hanami/page.tsx",
  "app/kitakanto/page.tsx",
  "app/kitakanto/hanami/page.tsx",
  "app/koshinetsu/page.tsx",
  "app/koshinetsu/hanami/page.tsx"
];

const backupDir = "../Kanto Guide/src";
let restoredCount = 0;

console.log("开始从备份项目恢复关键文件...");

criticalFiles.forEach(filePath => {
  try {
    const backupFilePath = path.join(backupDir, filePath);
    const currentFilePath = filePath;
    
    if (fs.existsSync(backupFilePath)) {
      fs.copyFileSync(backupFilePath, currentFilePath);
      console.log(` 已恢复: ${filePath}`);
      restoredCount++;
    } else {
      console.log(`  备份文件不存在: ${backupFilePath}`);
    }
  } catch (error) {
    console.error(` 恢复失败 ${filePath}:`, error.message);
  }
});

console.log(`恢复完成！成功恢复: ${restoredCount} 个文件`);
