#!/usr/bin/env node

/**
 * 花火数据结构验证脚本
 * 验证所有花火页面的数据结构是否符合HanabiMedia接口要求
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🎆 开始验证花火数据结构...\n");

// 读取HanabiMedia接口定义
function getHanabiMediaInterface() {
  try {
    const typesFile = "./src/types/hanabi.ts";
    const content = fs.readFileSync(typesFile, "utf8");

    // 提取HanabiMedia接口
    const interfaceMatch = content.match(
      /interface HanabiMedia \{([\s\S]*?)\}/
    );
    if (!interfaceMatch) {
      throw new Error("HanabiMedia interface not found");
    }

    const interfaceBody = interfaceMatch[1];
    const requiredFields = [];
    const optionalFields = [];

    // 解析字段
    const fieldMatches = interfaceBody.match(/(\w+)(\?)?:\s*string/g);
    if (fieldMatches) {
      fieldMatches.forEach((field) => {
        const [, fieldName, optional] = field.match(/(\w+)(\?)?:/);
        if (optional) {
          optionalFields.push(fieldName);
        } else {
          requiredFields.push(fieldName);
        }
      });
    }

    return { requiredFields, optionalFields };
  } catch (error) {
    console.error("❌ 无法读取HanabiMedia接口:", error.message);
    process.exit(1);
  }
}

// 验证单个文件
function validateFile(filePath, requiredFields) {
  const errors = [];
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, "utf8");

    // 检查是否包含媒体数据
    if (!content.includes("media:")) {
      return { errors, warnings, hasMedia: false };
    }

    // 检查必需字段
    for (const field of requiredFields) {
      if (!content.includes(`${field}:`)) {
        errors.push(`缺少必需字段: ${field}`);
      }
    }

    // 检查是否使用了废弃的字段
    const deprecatedFields = ["alt", "caption"];
    for (const field of deprecatedFields) {
      if (content.includes(`${field}:`)) {
        warnings.push(`使用了废弃字段: ${field} (应使用 title/description)`);
      }
    }

    // 检查媒体数组结构
    const mediaMatch = content.match(/media:\s*\[([\s\S]*?)\]/);
    if (mediaMatch) {
      const mediaContent = mediaMatch[1];
      const mediaObjects = mediaContent.split("},").length;
      if (mediaObjects === 0) {
        warnings.push("媒体数组为空");
      }
    }

    return { errors, warnings, hasMedia: true };
  } catch (error) {
    errors.push(`文件读取错误: ${error.message}`);
    return { errors, warnings, hasMedia: false };
  }
}

// 递归验证目录
function validateDirectory(dir, requiredFields) {
  const results = {
    totalFiles: 0,
    validFiles: 0,
    filesWithMedia: 0,
    errors: [],
    warnings: [],
  };

  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        const subResults = validateDirectory(fullPath, requiredFields);
        results.totalFiles += subResults.totalFiles;
        results.validFiles += subResults.validFiles;
        results.filesWithMedia += subResults.filesWithMedia;
        results.errors = results.errors.concat(subResults.errors);
        results.warnings = results.warnings.concat(subResults.warnings);
      } else if (file.name === "page.tsx") {
        results.totalFiles++;

        const validation = validateFile(fullPath, requiredFields);
        const relativePath = fullPath.replace(process.cwd(), ".");

        if (validation.hasMedia) {
          results.filesWithMedia++;
        }

        if (validation.errors.length === 0) {
          results.validFiles++;
        } else {
          results.errors.push({
            file: relativePath,
            errors: validation.errors,
          });
        }

        if (validation.warnings.length > 0) {
          results.warnings.push({
            file: relativePath,
            warnings: validation.warnings,
          });
        }
      }
    }
  } catch (error) {
    results.errors.push({
      file: dir,
      errors: [`目录读取错误: ${error.message}`],
    });
  }

  return results;
}

// 生成报告
function generateReport(results, interfaceInfo) {
  console.log("📊 验证报告:");
  console.log("=".repeat(50));

  console.log(`📁 总文件数: ${results.totalFiles}`);
  console.log(`🎆 包含媒体的文件: ${results.filesWithMedia}`);
  console.log(`✅ 有效文件: ${results.validFiles}`);
  console.log(`❌ 错误文件: ${results.errors.length}`);
  console.log(`⚠️  警告文件: ${results.warnings.length}`);

  console.log("\n🔍 接口要求:");
  console.log(`   必需字段: ${interfaceInfo.requiredFields.join(", ")}`);
  console.log(`   可选字段: ${interfaceInfo.optionalFields.join(", ")}`);

  if (results.errors.length > 0) {
    console.log("\n❌ 错误详情:");
    results.errors.forEach(({ file, errors }) => {
      console.log(`   ${file}:`);
      errors.forEach((error) => console.log(`     - ${error}`));
    });
  }

  if (results.warnings.length > 0) {
    console.log("\n⚠️  警告详情:");
    results.warnings.forEach(({ file, warnings }) => {
      console.log(`   ${file}:`);
      warnings.forEach((warning) => console.log(`     - ${warning}`));
    });
  }

  // 生成JSON报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.totalFiles,
      filesWithMedia: results.filesWithMedia,
      validFiles: results.validFiles,
      errorFiles: results.errors.length,
      warningFiles: results.warnings.length,
    },
    interface: interfaceInfo,
    errors: results.errors,
    warnings: results.warnings,
  };

  fs.writeFileSync(
    "hanabi-validation-report.json",
    JSON.stringify(report, null, 2)
  );
  console.log("\n📄 详细报告已保存到: hanabi-validation-report.json");

  return results.errors.length === 0;
}

// 主函数
function main() {
  try {
    // 获取接口定义
    const interfaceInfo = getHanabiMediaInterface();
    console.log(`🔍 检测到HanabiMedia接口:`);
    console.log(`   必需字段: ${interfaceInfo.requiredFields.join(", ")}`);
    console.log(`   可选字段: ${interfaceInfo.optionalFields.join(", ")}\n`);

    // 验证所有花火页面
    const results = validateDirectory(
      "./src/app",
      interfaceInfo.requiredFields
    );

    // 生成报告
    const isValid = generateReport(results, interfaceInfo);

    if (isValid) {
      console.log("\n🎉 所有花火数据结构验证通过!");
      process.exit(0);
    } else {
      console.log("\n💡 建议运行: npm run fix-types 自动修复错误");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ 验证过程失败:", error.message);
    process.exit(1);
  }
}

// 主执行
main();

export { getHanabiMediaInterface, validateDirectory, validateFile };
