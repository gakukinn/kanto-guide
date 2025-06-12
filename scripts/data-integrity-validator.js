/**
 * 数据完整性验证器
 * 确保所有花火页面数据完整性和一致性
 */

const fs = require('fs');
const path = require('path');

class DataIntegrityValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.requiredFields = {
      level5: [
        'id', 'name', 'japaneseName', 'englishName', 'year', 'month', 'date',
        'time', 'duration', 'fireworksCount', 'expectedVisitors', 'ticketPrice',
        'status', 'themeColor', 'venues', 'access', 'viewingSpots', 'history',
        'tips', 'contact', 'mapInfo', 'weatherInfo', 'mapEmbedUrl', 'media'
      ]
    };
  }

  validateLevel5Data(filePath, data) {
    console.log(`🔍 验证第五层数据: ${filePath}`);
    
    // 检查必填字段
    this.requiredFields.level5.forEach(field => {
      if (!data[field]) {
        this.errors.push(`❌ ${filePath}: 缺少必填字段 "${field}"`);
      }
    });

    // 检查media字段
    if (!data.media || !Array.isArray(data.media) || data.media.length === 0) {
      this.errors.push(`❌ ${filePath}: media字段缺失或为空，将导致图片区域显示占位符`);
    } else {
      // 验证media配置
      data.media.forEach((item, index) => {
        if (!item.type || !item.url || !item.title) {
          this.errors.push(`❌ ${filePath}: media[${index}]缺少必要字段(type/url/title)`);
        }
      });
    }

    // 检查mapEmbedUrl
    if (!data.mapEmbedUrl || !data.mapEmbedUrl.includes('google.com/maps/embed')) {
      this.errors.push(`❌ ${filePath}: mapEmbedUrl无效或缺失，地图无法显示`);
    }

    // 检查日文字符
    const content = JSON.stringify(data);
    if (/[ひらがなカタカナァ-ヴー]/.test(content)) {
      this.errors.push(`❌ ${filePath}: 检测到日文假名字符，违反中文化要求`);
    }

    // 检查venues数组
    if (!data.venues || !Array.isArray(data.venues) || data.venues.length === 0) {
      this.errors.push(`❌ ${filePath}: venues字段缺失或为空`);
    }

    // 检查access数组
    if (!data.access || !Array.isArray(data.access) || data.access.length === 0) {
      this.errors.push(`❌ ${filePath}: access字段缺失或为空`);
    }

    return this.errors.length === 0;
  }

  validatePageFile(pagePath, dataExport) {
    console.log(`🔍 验证页面文件: ${pagePath}`);
    
    if (!fs.existsSync(pagePath)) {
      this.errors.push(`❌ 页面文件不存在: ${pagePath}`);
      return false;
    }

    const content = fs.readFileSync(pagePath, 'utf8');
    
    // 检查导入语句
    if (!content.includes('HanabiDetailTemplate')) {
      this.errors.push(`❌ ${pagePath}: 缺少HanabiDetailTemplate导入`);
    }

    if (!content.includes(dataExport)) {
      this.errors.push(`❌ ${pagePath}: 缺少数据导入 ${dataExport}`);
    }

    // 检查regionKey
    if (!content.includes('regionKey=')) {
      this.errors.push(`❌ ${pagePath}: 缺少regionKey属性`);
    }

    return true;
  }

  validateLevel4Link(level4Path, detailLink) {
    console.log(`🔍 验证第四层链接: ${level4Path} -> ${detailLink}`);
    
    if (!fs.existsSync(level4Path)) {
      this.errors.push(`❌ 第四层数据文件不存在: ${level4Path}`);
      return false;
    }

    const content = fs.readFileSync(level4Path, 'utf8');
    if (!content.includes(detailLink)) {
      this.errors.push(`❌ ${level4Path}: 缺少detailLink "${detailLink}"`);
      this.warnings.push(`💡 运行: npm run add-detail-link 来修复`);
    }

    return true;
  }

  validateNewPage(config) {
    console.log('🔍 开始验证新建页面完整性...');
    this.errors = [];
    this.warnings = [];

    const {
      dataFilePath,
      pageFilePath,
      level4FilePath,
      dataExportName,
      detailLink
    } = config;

    // 1. 验证数据文件
    if (!fs.existsSync(dataFilePath)) {
      this.errors.push(`❌ 数据文件不存在: ${dataFilePath}`);
    } else {
      try {
        const dataModule = require(path.resolve(dataFilePath));
        const data = dataModule[dataExportName];
        if (!data) {
          this.errors.push(`❌ 数据导出不存在: ${dataExportName} in ${dataFilePath}`);
        } else {
          this.validateLevel5Data(dataFilePath, data);
        }
      } catch (error) {
        this.errors.push(`❌ 数据文件语法错误: ${dataFilePath} - ${error.message}`);
      }
    }

    // 2. 验证页面文件
    this.validatePageFile(pageFilePath, dataExportName);

    // 3. 验证第四层链接
    if (level4FilePath && detailLink) {
      this.validateLevel4Link(level4FilePath, detailLink);
    }

    // 输出结果
    if (this.errors.length > 0) {
      console.log('🚨 发现错误:');
      this.errors.forEach(error => console.log(error));
    }

    if (this.warnings.length > 0) {
      console.log('⚠️ 警告信息:');
      this.warnings.forEach(warning => console.log(warning));
    }

    if (this.errors.length === 0) {
      console.log('✅ 页面验证通过，数据完整性良好');
    }

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }

  generateReport() {
    return {
      timestamp: new Date().toISOString(),
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length,
      errors: this.errors,
      warnings: this.warnings,
      isValid: this.errors.length === 0
    };
  }
}

// 命令行接口
if (require.main === module) {
  const validator = new DataIntegrityValidator();
  
  // 示例用法
  const config = {
    dataFilePath: process.argv[2],
    pageFilePath: process.argv[3],
    level4FilePath: process.argv[4],
    dataExportName: process.argv[5],
    detailLink: process.argv[6]
  };

  if (!config.dataFilePath) {
    console.log('用法: node data-integrity-validator.js <数据文件> <页面文件> [第四层文件] [导出名] [详情链接]');
    console.log('示例: node data-integrity-validator.js src/data/level5-august-koga-hanabi.ts src/app/august/hanabi/kitakanto/koga/page.tsx');
    process.exit(1);
  }

  const result = validator.validateNewPage(config);
  process.exit(result.isValid ? 0 : 1);
}

module.exports = DataIntegrityValidator; 