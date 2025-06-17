/**
 * 日文数据库验证脚本
 * @description 基于WalkerPlus数据源验证花火活动的关键信息
 * @author AI Assistant
 * @date 2025-01-13
 */

const fs = require("fs");
const path = require("path");

// 读取日文数据库
const japaneseDatabase = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../src/database/walkerplus-japanese-database.json"),
    "utf8"
  )
);

// 验证结果统计
let validationResults = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

/**
 * 验证日期格式
 * @param {string} date - 日期字符串
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateDate(date, eventName) {
  const result = {
    field: "date",
    eventName,
    value: date,
    valid: true,
    message: "",
    priority: "highest",
  };

  // 检查日期格式：YYYY年MM月DD日
  const datePattern = /^\d{4}年\d{1,2}月\d{1,2}日$/;
  if (!datePattern.test(date)) {
    result.valid = false;
    result.message = `日期格式不符合WalkerPlus标准："${date}" 应为 "YYYY年MM月DD日" 格式`;
  } else {
    result.message = `日期格式正确：${date}`;
  }

  return result;
}

/**
 * 验证地址格式
 * @param {string} location - 地址字符串
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateLocation(location, eventName) {
  const result = {
    field: "location",
    eventName,
    value: location,
    valid: true,
    message: "",
    priority: "highest",
  };

  const validationRules = japaneseDatabase.validationRules.locationValidation;

  // 检查是否包含都道府県
  const hasPrefix =
    location.includes("都") ||
    location.includes("県") ||
    location.includes("府") ||
    location.includes("道");

  // 检查是否为允许的专有名词
  const isSpecialName = validationRules.allowSpecialNames.some((name) =>
    location.includes(name)
  );

  if (!hasPrefix && !isSpecialName) {
    result.valid = false;
    result.message = `地址格式可能不完整："${location}" 缺少都道府県信息`;
  } else {
    result.message = `地址格式符合WalkerPlus标准：${location}`;
  }

  return result;
}

/**
 * 验证观众数
 * @param {string} visitors - 观众数字符串
 * @param {number} visitorsNum - 观众数数值
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateVisitors(visitors, visitorsNum, eventName) {
  const result = {
    field: "expectedVisitors",
    eventName,
    value: visitors,
    valid: true,
    message: "",
    priority: "medium",
  };

  const validationRules = japaneseDatabase.validationRules.visitorsValidation;

  // 检查格式
  const validFormats = ["約", "万人", "非公表"];
  const hasValidFormat = validFormats.some((format) =>
    visitors.includes(format)
  );

  if (!hasValidFormat) {
    result.valid = false;
    result.message = `观众数格式不符合WalkerPlus标准："${visitors}"`;
  } else if (visitorsNum && visitorsNum > validationRules.maxReasonable) {
    result.message = `观众数较高但在合理范围内：${visitors} (${visitorsNum}人)`;
  } else {
    result.message = `观众数格式正确：${visitors}`;
  }

  return result;
}

/**
 * 验证花火数
 * @param {string} fireworks - 花火数字符串
 * @param {number} fireworksNum - 花火数数值
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateFireworks(fireworks, fireworksNum, eventName) {
  const result = {
    field: "fireworksCount",
    eventName,
    value: fireworks,
    valid: true,
    message: "",
    priority: "medium",
  };

  const validationRules = japaneseDatabase.validationRules.fireworksValidation;

  // 检查格式
  const validFormats = ["約", "発", "万発"];
  const hasValidFormat = validFormats.some((format) =>
    fireworks.includes(format)
  );

  if (!hasValidFormat) {
    result.valid = false;
    result.message = `花火数格式不符合WalkerPlus标准："${fireworks}"`;
  } else if (fireworksNum && fireworksNum > validationRules.maxReasonable) {
    result.message = `花火数较高但在合理范围内：${fireworks} (${fireworksNum}发)`;
  } else {
    result.message = `花火数格式正确：${fireworks}`;
  }

  return result;
}

/**
 * 验证官方网站
 * @param {string} website - 网站URL
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateWebsite(website, eventName) {
  const result = {
    field: "officialWebsite",
    eventName,
    value: website,
    valid: true,
    message: "",
    priority: "high",
  };

  const urlPattern = /^https?:\/\/.+\..+/;
  if (!urlPattern.test(website)) {
    result.valid = false;
    result.message = `官方网站格式无效："${website}"`;
  } else {
    result.message = `官方网站格式正确：${website}`;
  }

  return result;
}

/**
 * 验证谷歌地图
 * @param {string} mapUrl - 地图URL
 * @param {string} eventName - 活动名称
 * @returns {object} 验证结果
 */
function validateGoogleMap(mapUrl, eventName) {
  const result = {
    field: "mapEmbedUrl",
    eventName,
    value: mapUrl,
    valid: true,
    message: "",
    priority: "high",
  };

  const validationRules = japaneseDatabase.validationRules.mapValidation;

  if (!mapUrl.includes(validationRules.mustContain)) {
    result.valid = false;
    result.message = `谷歌地图URL格式无效："${mapUrl}"`;
  } else {
    result.message = `谷歌地图URL格式正确：已包含google.com/maps/embed`;
  }

  return result;
}

/**
 * 验证单个活动
 * @param {object} event - 活动数据
 * @param {string} region - 地区名称
 */
function validateEvent(event, region) {
  console.log(`\n🎆 验证活动：${event.chineseName} (${region})`);
  console.log("=" * 60);

  // 验证日期（最重要）
  const dateResult = validateDate(event.date, event.chineseName);
  validationResults.details.push(dateResult);

  // 验证地址（最重要）
  const locationResult = validateLocation(event.location, event.chineseName);
  validationResults.details.push(locationResult);

  // 验证观众数（次要）
  const visitorsResult = validateVisitors(
    event.expectedVisitors,
    event.expectedVisitorsNum,
    event.chineseName
  );
  validationResults.details.push(visitorsResult);

  // 验证花火数（次要）
  const fireworksResult = validateFireworks(
    event.fireworksCount,
    event.fireworksCountNum,
    event.chineseName
  );
  validationResults.details.push(fireworksResult);

  // 验证官方网站（四层页面重点）
  const websiteResult = validateWebsite(
    event.officialWebsite,
    event.chineseName
  );
  validationResults.details.push(websiteResult);

  // 验证谷歌地图（四层页面重点）
  const mapResult = validateGoogleMap(event.mapEmbedUrl, event.chineseName);
  validationResults.details.push(mapResult);

  // 输出结果
  const results = [
    dateResult,
    locationResult,
    visitorsResult,
    fireworksResult,
    websiteResult,
    mapResult,
  ];
  results.forEach((result) => {
    const status = result.valid ? "✅" : "❌";
    const priority =
      result.priority === "highest"
        ? "🔥"
        : result.priority === "high"
        ? "⚡"
        : "⭐";
    console.log(`${status} ${priority} [${result.field}] ${result.message}`);

    if (result.valid) {
      validationResults.passed++;
    } else {
      validationResults.failed++;
    }
    validationResults.total++;
  });
}

/**
 * 主验证函数
 */
function runValidation() {
  console.log("🗾 启动日文数据库验证系统");
  console.log(`📊 数据源：${japaneseDatabase.dataSource}`);
  console.log(`📅 最后更新：${japaneseDatabase.lastUpdated}`);
  console.log("\n验证重点：");
  console.log("🔥 最重要：日期、地址");
  console.log("⚡ 高优先级：官方网站、谷歌地图");
  console.log("⭐ 中等：观众数、花火数");

  // 遍历所有地区和活动
  Object.keys(japaneseDatabase.regions).forEach((regionKey) => {
    const region = japaneseDatabase.regions[regionKey];
    console.log(`\n🗺️ 验证地区：${region.regionName}`);

    if (region.hanabi && region.hanabi.events) {
      region.hanabi.events.forEach((event) => {
        validateEvent(event, region.regionName);
      });
    }
  });

  // 输出总结
  console.log("\n\n📊 验证总结报告");
  console.log("=" * 50);
  console.log(`总验证项目：${validationResults.total}`);
  console.log(`✅ 通过：${validationResults.passed}`);
  console.log(`❌ 失败：${validationResults.failed}`);
  console.log(
    `通过率：${(
      (validationResults.passed / validationResults.total) *
      100
    ).toFixed(1)}%`
  );

  // 按优先级分组显示问题
  const criticalIssues = validationResults.details.filter(
    (d) => !d.valid && d.priority === "highest"
  );
  const highIssues = validationResults.details.filter(
    (d) => !d.valid && d.priority === "high"
  );
  const mediumIssues = validationResults.details.filter(
    (d) => !d.valid && d.priority === "medium"
  );

  if (criticalIssues.length > 0) {
    console.log(`\n🚨 严重问题 (${criticalIssues.length}个)：`);
    criticalIssues.forEach((issue) => {
      console.log(`   - ${issue.eventName}: ${issue.message}`);
    });
  }

  if (highIssues.length > 0) {
    console.log(`\n⚠️ 高优先级问题 (${highIssues.length}个)：`);
    highIssues.forEach((issue) => {
      console.log(`   - ${issue.eventName}: ${issue.message}`);
    });
  }

  if (mediumIssues.length > 0) {
    console.log(`\n💡 中等优先级问题 (${mediumIssues.length}个)：`);
    mediumIssues.forEach((issue) => {
      console.log(`   - ${issue.eventName}: ${issue.message}`);
    });
  }

  // 保存验证报告
  const reportPath = path.join(
    __dirname,
    "../logs/japanese-database-validation-report.json"
  );
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        summary: {
          total: validationResults.total,
          passed: validationResults.passed,
          failed: validationResults.failed,
          passRate:
            (
              (validationResults.passed / validationResults.total) *
              100
            ).toFixed(1) + "%",
        },
        details: validationResults.details,
        criticalIssues,
        highIssues,
        mediumIssues,
      },
      null,
      2
    )
  );

  console.log(`\n📄 详细报告已保存至：${reportPath}`);

  return validationResults.failed === 0;
}

// 运行验证
if (require.main === module) {
  const success = runValidation();
  process.exit(success ? 0 : 1);
}

module.exports = { runValidation, validateEvent };
