import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StaticSiteDataValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    this.totalFiles = 0;
  }

  async validateAllData() {
    console.log("🚀 开始验证静态网站数据...\n");

    try {
      // 获取所有数据文件
      const dataFiles = this.getAllDataFiles();
      this.totalFiles = dataFiles.length;

      console.log(`📁 找到 ${this.totalFiles} 个数据文件`);

      // 验证每个文件
      for (const file of dataFiles) {
        await this.validateSingleFile(file);
      }

      // 生成报告
      this.generateReport();
    } catch (error) {
      console.error("❌ 验证过程中发生错误:", error.message);
      process.exit(1);
    }
  }

  getAllDataFiles() {
    const dataDir = path.join(__dirname, "../src/data");

    if (!fs.existsSync(dataDir)) {
      throw new Error(`数据目录不存在: ${dataDir}`);
    }

    return fs
      .readdirSync(dataDir)
      .filter((file) => file.startsWith("level5-") && file.endsWith(".ts"))
      .map((file) => ({
        path: path.join(dataDir, file),
        name: file,
        eventName: this.extractEventName(file),
      }));
  }

  extractEventName(filename) {
    // 从文件名提取活动名称
    const match = filename.match(/level5-(.+)\.ts$/);
    return match ? match[1].replace(/-/g, " ") : filename;
  }

  async validateSingleFile(file) {
    try {
      console.log(`🔍 验证: ${file.eventName}`);

      // 读取文件内容
      const fileContent = fs.readFileSync(file.path, "utf8");

      // 解析数据
      const data = this.parseDataFromFile(fileContent);

      // 执行各种验证
      this.validateRequiredFields(file, data);
      this.validateDateFormat(file, data);
      this.validateUrls(file, data);
      this.validateDataConsistency(file, data);

      this.validatedFiles++;
      console.log(`✅ ${file.eventName} - 验证完成`);
    } catch (error) {
      this.errors.push({
        file: file.name,
        error: `文件解析错误: ${error.message}`,
      });
      console.log(`❌ ${file.eventName} - 验证失败: ${error.message}`);
    }
  }

  parseDataFromFile(content) {
    // 简单的数据提取（适用于TypeScript文件）
    const data = {};

    // 提取标题
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    if (titleMatch) data.title = titleMatch[1];

    // 提取日期
    const dateMatch = content.match(/date:\s*['"`]([^'"`]+)['"`]/);
    if (dateMatch) data.date = dateMatch[1];

    // 提取地点
    const locationMatch = content.match(/location:\s*['"`]([^'"`]+)['"`]/);
    if (locationMatch) data.location = locationMatch[1];

    // 提取网站链接
    const websiteMatch = content.match(/website:\s*['"`]([^'"`]+)['"`]/);
    if (websiteMatch) data.website = websiteMatch[1];

    // 提取WalkerPlus链接
    const walkerPlusMatch = content.match(
      /walkerPlusUrl:\s*['"`]([^'"`]+)['"`]/
    );
    if (walkerPlusMatch) data.walkerPlusUrl = walkerPlusMatch[1];

    // 提取烟花数量
    const fireworksMatch = content.match(/fireworks:\s*['"`]([^'"`]+)['"`]/);
    if (fireworksMatch) data.fireworks = fireworksMatch[1];

    // 提取观众数量
    const visitorsMatch = content.match(/visitors:\s*['"`]([^'"`]+)['"`]/);
    if (visitorsMatch) data.visitors = visitorsMatch[1];

    return data;
  }

  validateRequiredFields(file, data) {
    const requiredFields = ["title", "date", "location"];

    for (const field of requiredFields) {
      if (!data[field]) {
        this.errors.push({
          file: file.name,
          field: field,
          error: `缺少必需字段: ${field}`,
        });
      }
    }
  }

  validateDateFormat(file, data) {
    if (data.date) {
      // 检查日期格式 (YYYY年MM月DD日)
      const datePattern = /^\d{4}年\d{1,2}月\d{1,2}日$/;
      if (!datePattern.test(data.date)) {
        this.warnings.push({
          file: file.name,
          field: "date",
          warning: `日期格式可能不标准: ${data.date}`,
        });
      }

      // 检查日期是否为未来日期
      const year = parseInt(data.date.match(/(\d{4})年/)?.[1]);
      const currentYear = new Date().getFullYear();
      if (year && year < currentYear) {
        this.warnings.push({
          file: file.name,
          field: "date",
          warning: `活动日期为过去时间: ${data.date}`,
        });
      }
    }
  }

  validateUrls(file, data) {
    const urlFields = ["website", "walkerPlusUrl"];

    for (const field of urlFields) {
      if (data[field]) {
        try {
          new URL(data[field]);
        } catch {
          this.errors.push({
            file: file.name,
            field: field,
            error: `无效的URL格式: ${data[field]}`,
          });
        }
      }
    }
  }

  validateDataConsistency(file, data) {
    // 检查数据的逻辑一致性
    if (data.fireworks && data.visitors) {
      // 检查数字格式
      const fireworksNum = this.extractNumber(data.fireworks);
      const visitorsNum = this.extractNumber(data.visitors);

      if (fireworksNum && visitorsNum) {
        // 简单的逻辑检查：观众数量应该远大于烟花数量
        if (visitorsNum < fireworksNum) {
          this.warnings.push({
            file: file.name,
            warning: `观众数量(${data.visitors})似乎小于烟花数量(${data.fireworks})，请检查数据`,
          });
        }
      }
    }
  }

  extractNumber(str) {
    if (!str) return null;
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  generateReport() {
    console.log("\n" + "=".repeat(50));
    console.log("📊 数据验证报告");
    console.log("=".repeat(50));

    console.log(`📁 总文件数: ${this.totalFiles}`);
    console.log(`✅ 已验证: ${this.validatedFiles}`);
    console.log(`❌ 错误数: ${this.errors.length}`);
    console.log(`⚠️  警告数: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log("\n❌ 发现的错误:");
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.file}: ${error.error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️  发现的警告:");
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.file}: ${warning.warning}`);
      });
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log("\n🎉 所有数据验证通过！");
    }

    // 保存详细报告到文件
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.totalFiles,
        validatedFiles: this.validatedFiles,
        errorCount: this.errors.length,
        warningCount: this.warnings.length,
      },
      errors: this.errors,
      warnings: this.warnings,
    };

    const reportPath = path.join(__dirname, "../validation-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 详细报告已保存到: ${reportPath}`);

    // 如果有错误，退出码为1
    if (this.errors.length > 0) {
      process.exit(1);
    }
  }
}

// 主执行函数
async function main() {
  const validator = new StaticSiteDataValidator();
  await validator.validateAllData();
}

// 直接执行主函数
main().catch((error) => {
  console.error("💥 验证失败:", error);
  process.exit(1);
});

export default StaticSiteDataValidator;
