const fs = require('fs');
const path = require('path');
const UnifiedHanamiDatabaseManager = require('./unified-hanami-database-manager');

/**
 * 数据清理和迁移工具
 * 将现有的分散数据文件整合到统一数据库
 * 安全原则：只移动，不删除原始数据
 */
class DataCleanupAndMigration {
  constructor() {
    this.sourceDir = path.join(__dirname, '../../data/walkerplus-crawled');
    this.archiveDir = path.join(
      __dirname,
      '../../data/archive/migration-backup'
    );
    this.dbManager = new UnifiedHanamiDatabaseManager();

    // 确保备份目录存在
    if (!fs.existsSync(this.archiveDir)) {
      fs.mkdirSync(this.archiveDir, { recursive: true });
    }

    console.log('🔄 数据清理和迁移工具初始化');
    console.log(`📂 源目录: ${this.sourceDir}`);
    console.log(`🗃️ 备份目录: ${this.archiveDir}`);
  }

  /**
   * 分析现有数据文件
   */
  analyzeExistingData() {
    try {
      const files = fs
        .readdirSync(this.sourceDir)
        .filter(file => file.endsWith('.json'))
        .filter(file => file.includes('hanami') && !file.includes('batch'));

      console.log(`📊 发现 ${files.length} 个花见数据文件`);

      const regionData = {};

      files.forEach(file => {
        try {
          const filePath = path.join(this.sourceDir, file);
          const stats = fs.statSync(filePath);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // 提取地区代码
          const regionMatch = file.match(/^(ar\d{4})-hanabi/);
          if (!regionMatch) return;

          const regionCode = regionMatch[1];

          if (!regionData[regionCode]) {
            regionData[regionCode] = [];
          }

          regionData[regionCode].push({
            filename: file,
            filepath: filePath,
            size: stats.size,
            created: stats.mtime,
            dataCount: data.data ? data.data.length : 0,
            metadata: data.metadata || {},
            hasValidData:
              data.data && Array.isArray(data.data) && data.data.length > 0,
          });
        } catch (error) {
          console.warn(`⚠️ 无法解析文件 ${file}:`, error.message);
        }
      });

      // 排序找出最好的数据文件
      Object.keys(regionData).forEach(regionCode => {
        regionData[regionCode].sort((a, b) => {
          // 优先选择有效数据多的文件
          if (a.dataCount !== b.dataCount) {
            return b.dataCount - a.dataCount;
          }
          // 然后选择文件大小大的
          if (a.size !== b.size) {
            return b.size - a.size;
          }
          // 最后选择最新的
          return b.created - a.created;
        });
      });

      return regionData;
    } catch (error) {
      console.error('❌ 分析现有数据失败:', error.message);
      return {};
    }
  }

  /**
   * 迁移最佳数据到统一数据库
   */
  migrateBestData() {
    try {
      const regionData = this.analyzeExistingData();
      const migratedRegions = [];

      console.log('\n🚀 开始数据迁移...');

      Object.entries(regionData).forEach(([regionCode, files]) => {
        if (files.length === 0) return;

        const bestFile = files[0]; // 排序后的第一个就是最好的
        console.log(`\n📍 处理地区 ${regionCode}:`);
        console.log(
          `✅ 选择最佳文件: ${bestFile.filename} (${bestFile.dataCount} 条数据, ${(bestFile.size / 1024).toFixed(1)}KB)`
        );

        if (files.length > 1) {
          console.log(`🔄 发现 ${files.length - 1} 个重复文件将被备份:`);
          files.slice(1).forEach(file => {
            console.log(`   - ${file.filename} (${file.dataCount} 条数据)`);
          });
        }

        try {
          // 读取最佳数据文件
          const data = JSON.parse(fs.readFileSync(bestFile.filepath, 'utf8'));

          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            // 准备地区数据
            const regionInfo = {
              regionName: this.getRegionName(regionCode),
              spots: data.data,
              sourceUrl:
                data.metadata?.sourceUrl ||
                `https://hanami.walkerplus.com/ranking/${regionCode}/`,
              scrapedAt:
                data.metadata?.scrapedAt || bestFile.created.toISOString(),
              technology: data.metadata?.technology || 'Playwright + Cheerio',
            };

            // 更新统一数据库
            const success = this.dbManager.updateRegionData(
              regionCode,
              regionInfo
            );
            if (success) {
              migratedRegions.push({
                regionCode,
                regionName: regionInfo.regionName,
                spots: regionInfo.spots.length,
                sourceFile: bestFile.filename,
              });
              console.log(
                `✅ 地区 ${regionCode} 迁移完成: ${regionInfo.spots.length} 个花见地点`
              );
            }
          } else {
            console.log(`⚠️ 地区 ${regionCode} 数据为空，跳过迁移`);
          }
        } catch (error) {
          console.error(`❌ 迁移地区 ${regionCode} 失败:`, error.message);
        }
      });

      console.log('\n📊 迁移完成统计:');
      console.log(`✅ 成功迁移 ${migratedRegions.length} 个地区`);
      migratedRegions.forEach(region => {
        console.log(
          `   - ${region.regionCode} (${region.regionName}): ${region.spots} 个花见地点`
        );
      });

      return migratedRegions;
    } catch (error) {
      console.error('❌ 数据迁移失败:', error.message);
      return [];
    }
  }

  /**
   * 备份重复文件到归档目录
   */
  backupDuplicateFiles() {
    try {
      const regionData = this.analyzeExistingData();
      let backedUpCount = 0;

      console.log('\n🗃️ 开始备份重复文件...');

      Object.entries(regionData).forEach(([regionCode, files]) => {
        if (files.length <= 1) return;

        // 备份除最佳文件外的所有文件
        const duplicateFiles = files.slice(1);

        duplicateFiles.forEach(file => {
          try {
            const backupPath = path.join(this.archiveDir, file.filename);
            fs.copyFileSync(file.filepath, backupPath);
            console.log(
              `📋 备份: ${file.filename} → archive/migration-backup/`
            );
            backedUpCount++;
          } catch (error) {
            console.error(`❌ 备份文件 ${file.filename} 失败:`, error.message);
          }
        });
      });

      console.log(`✅ 完成备份 ${backedUpCount} 个重复文件`);
      return backedUpCount;
    } catch (error) {
      console.error('❌ 备份重复文件失败:', error.message);
      return 0;
    }
  }

  /**
   * 获取地区中文名称
   */
  getRegionName(regionCode) {
    const regionNames = {
      ar0313: '东京都',
      ar0314: '神奈川县',
      ar0312: '千叶县',
      ar0311: '埼玉县',
      ar0300: '北关东',
      ar0400: '甲信越',
    };
    return regionNames[regionCode] || regionCode;
  }

  /**
   * 执行完整的清理和迁移流程
   */
  async execute() {
    try {
      console.log('🚀 开始数据清理和迁移流程\n');

      // 1. 分析现有数据
      console.log('📊 步骤 1: 分析现有数据');
      const regionData = this.analyzeExistingData();

      // 2. 备份重复文件
      console.log('\n📋 步骤 2: 备份重复文件');
      const backedUpCount = this.backupDuplicateFiles();

      // 3. 迁移最佳数据
      console.log('\n🔄 步骤 3: 迁移数据到统一数据库');
      const migratedRegions = this.migrateBestData();

      // 4. 显示最终统计
      console.log('\n📈 步骤 4: 最终统计');
      const stats = this.dbManager.getStatistics();
      if (stats) {
        console.log(`✅ 统一数据库创建完成:`);
        console.log(`   - 总地区数: ${stats.totalRegions}`);
        console.log(`   - 总花见地点: ${stats.totalSpots}`);
        console.log(`   - 最后更新: ${stats.lastUpdated}`);
        console.log(`   - 备份重复文件: ${backedUpCount} 个`);
      }

      console.log('\n🎊 数据清理和迁移完成！');
      console.log('📍 统一数据库位置: data/hanami-database.json');
      console.log('🗃️ 重复文件备份: data/archive/migration-backup/');
      console.log('⚠️ 原始文件保持不变，可安全删除重复文件');

      return {
        success: true,
        migratedRegions: migratedRegions.length,
        backedUpFiles: backedUpCount,
        totalSpots: stats?.totalSpots || 0,
      };
    } catch (error) {
      console.error('❌ 清理和迁移流程失败:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// 如果直接执行此脚本
if (require.main === module) {
  const migration = new DataCleanupAndMigration();
  migration.execute().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = DataCleanupAndMigration;
