#!/usr/bin/env node

/**
 * TypeScript错误检查和自动修复脚本
 * 使用方法: node scripts/type-check-and-fix.js
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 开始TypeScript错误检查和修复...\n");

// 1. 运行TypeScript检查
function runTypeCheck() {
  console.log("📋 步骤1: 运行TypeScript类型检查...");
  try {
    execSync("npx tsc --noEmit --skipLibCheck", { stdio: "pipe" });
    console.log("✅ 没有发现TypeScript错误!\n");
    return true;
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || "";
    const errorLines = output
      .split("\n")
      .filter((line) => line.includes("error TS"));
    console.log(`❌ 发现 ${errorLines.length} 个TypeScript错误:`);
    errorLines.slice(0, 10).forEach((line) => console.log(`   ${line}`));
    if (errorLines.length > 10) {
      console.log(`   ... 还有 ${errorLines.length - 10} 个错误`);
    }
    console.log("");
    return false;
  }
}

// 2. 修复HanabiMedia接口相关错误
function fixHanabiMediaErrors() {
  console.log("🔧 步骤2: 修复HanabiMedia接口错误...");

  function fixMediaFields(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let fixedFiles = [];

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        fixedFiles = fixedFiles.concat(fixMediaFields(fullPath));
      } else if (file.name === "page.tsx") {
        try {
          let content = fs.readFileSync(fullPath, "utf8");
          let modified = false;

          // 检查是否有媒体字段需要修复
          if (content.includes("media:")) {
            // 修复alt -> title
            if (content.includes("alt:") && !content.includes("title:")) {
              content = content.replace(
                /alt:\s*(['"`])([^'"`]*?)\1/g,
                "title: $1$2$1"
              );
              modified = true;
            }

            // 修复caption -> description
            if (
              content.includes("caption:") &&
              !content.includes("description:")
            ) {
              content = content.replace(
                /caption:\s*(['"`])([^'"`]*?)\1/g,
                "description: $1$2$1"
              );
              modified = true;
            }

            // 确保有必需的title字段
            if (!content.includes("title:") && content.includes("media:")) {
              content = content.replace(
                /(media:\s*\[\s*{\s*)/g,
                '$1\n        title: "花火大会图片",'
              );
              modified = true;
            }

            // 确保有必需的description字段
            if (
              !content.includes("description:") &&
              content.includes("title:")
            ) {
              content = content.replace(
                /(title:\s*(['"`])[^'"`]*\2,?\s*)/g,
                '$1\n        description: "花火大会精彩瞬间",'
              );
              modified = true;
            }
          }

          if (modified) {
            fs.writeFileSync(fullPath, content, "utf8");
            fixedFiles.push(fullPath.replace(process.cwd(), "."));
          }
        } catch (e) {
          console.log(`   ⚠️  无法处理文件 ${fullPath}: ${e.message}`);
        }
      }
    }
    return fixedFiles;
  }

  const fixedFiles = fixMediaFields("./src/app");
  if (fixedFiles.length > 0) {
    console.log(`✅ 修复了 ${fixedFiles.length} 个文件:`);
    fixedFiles.forEach((file) => console.log(`   ${file}`));
  } else {
    console.log("✅ 没有文件需要修复");
  }
  console.log("");

  return fixedFiles.length;
}

// 3. 修复导入错误
function fixImportErrors() {
  console.log("🔧 步骤3: 修复导入错误...");

  try {
    // 检查常见的导入问题
    const commonFixes = [
      {
        pattern: /import.*from ['"]@\/components\/ui\/button['"]/g,
        replacement: 'import { Button } from "@/components/ui/button"',
      },
      {
        pattern: /import.*from ['"]@\/lib\/utils['"]/g,
        replacement: 'import { cn } from "@/lib/utils"',
      },
    ];

    let fixedCount = 0;

    function fixImportsInDir(dir) {
      const files = fs.readdirSync(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          fixImportsInDir(fullPath);
        } else if (file.name.endsWith(".tsx") || file.name.endsWith(".ts")) {
          try {
            let content = fs.readFileSync(fullPath, "utf8");
            let modified = false;

            for (const fix of commonFixes) {
              if (fix.pattern.test(content)) {
                content = content.replace(fix.pattern, fix.replacement);
                modified = true;
              }
            }

            if (modified) {
              fs.writeFileSync(fullPath, content, "utf8");
              fixedCount++;
            }
          } catch (e) {
            // 忽略读取错误
          }
        }
      }
    }

    fixImportsInDir("./src");

    if (fixedCount > 0) {
      console.log(`✅ 修复了 ${fixedCount} 个文件的导入错误`);
    } else {
      console.log("✅ 没有发现导入错误");
    }
  } catch (e) {
    console.log(`⚠️  导入错误修复失败: ${e.message}`);
  }
  console.log("");
}

// 4. 运行代码格式化
function formatCode() {
  console.log("🎨 步骤4: 格式化代码...");
  try {
    execSync('npx prettier --write "src/**/*.{ts,tsx}" --log-level silent');
    console.log("✅ 代码格式化完成");
  } catch (e) {
    console.log(`⚠️  代码格式化失败: ${e.message}`);
  }
  console.log("");
}

// 5. 生成报告
function generateReport(initialErrors, fixedFiles) {
  console.log("📊 步骤5: 生成修复报告...");

  const finalTypeCheckPassed = runTypeCheck();

  const report = {
    timestamp: new Date().toISOString(),
    initialErrors: !initialErrors,
    fixedFiles: fixedFiles,
    finalStatus: finalTypeCheckPassed ? "PASSED" : "FAILED",
  };

  fs.writeFileSync("type-check-report.json", JSON.stringify(report, null, 2));

  console.log("📋 修复报告:");
  console.log(`   初始状态: ${initialErrors ? "有错误" : "无错误"}`);
  console.log(`   修复文件数: ${fixedFiles}`);
  console.log(
    `   最终状态: ${finalTypeCheckPassed ? "✅ 通过" : "❌ 仍有错误"}`
  );
  console.log(`   报告文件: type-check-report.json`);

  return finalTypeCheckPassed;
}

// 主执行流程
async function main() {
  try {
    // 检查初始状态
    const initialTypeCheckPassed = runTypeCheck();

    // 如果有错误，尝试修复
    let totalFixedFiles = 0;
    if (!initialTypeCheckPassed) {
      totalFixedFiles += fixHanabiMediaErrors();
      fixImportErrors();
      formatCode();
    }

    // 生成最终报告
    const success = generateReport(initialTypeCheckPassed, totalFixedFiles);

    console.log("\n🎉 TypeScript错误检查和修复完成!");

    if (success) {
      console.log("✅ 所有TypeScript错误已修复!");
      process.exit(0);
    } else {
      console.log("❌ 仍有一些错误需要手动修复");
      console.log("💡 建议: 运行 npx tsc --noEmit 查看详细错误信息");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ 脚本执行失败:", error.message);
    process.exit(1);
  }
}

// 主执行
main();

export { fixHanabiMediaErrors, fixImportErrors, formatCode, runTypeCheck };
