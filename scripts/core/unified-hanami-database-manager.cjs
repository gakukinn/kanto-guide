const fs = require('fs');
const path = require('path');

/**
 * 统一花见数据库管理器
 * 确保只有一个数据库文件：data/hanami-database.json
 * 三层结构：地区 → 花见会 → 列表
 */
class UnifiedHanamiDatabaseManager {
  constructor() {
    this.databasePath = path.join(__dirname, '../../data/hanami-database.json');
    this.backupDir = path.join(__dirname, '../../data/database-backups');

    // 确保目录存在
    if (!fs.existsSync(path.dirname(this.databasePath))) {
      fs.mkdirSync(path.dirname(this.databasePath), { recursive: true });
    }

    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }

    console.log('🗄️ 统一花见数据库管理器初始化');
    console.log(`📍 数据库路径: ${this.databasePath}`);
  }

  /**
   * 初始化空数据库
   */
  initializeDatabase() {
    const initialStructure = {
      metadata: {
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        description: '日本花见活动统一数据库',
        dataStructure: '三层：地区 → 花见会 → 列表',
        totalRegions: 0,
        totalSpots: 0,
      },
      regions: {},
    };

    fs.writeFileSync(
      this.databasePath,
      JSON.stringify(initialStructure, null, 2)
    );
    console.log('🆕 初始化空数据库完成');
    return initialStructure;
  }

  /**
   * 读取数据库
   */
  loadDatabase() {
    try {
      if (!fs.existsSync(this.databasePath)) {
        console.log('📝 数据库文件不存在，创建新的数据库');
        return this.initializeDatabase();
      }

      const data = fs.readFileSync(this.databasePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ 读取数据库失败:', error.message);
      console.log('🔄 创建新的数据库');
      return this.initializeDatabase();
    }
  }

  /**
   * 保存数据库（带备份）
   */
  saveDatabase(database) {
    try {
      // 创建备份
      if (fs.existsSync(this.databasePath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(
          this.backupDir,
          `hanami-database-backup-${timestamp}.json`
        );
        fs.copyFileSync(this.databasePath, backupPath);
        console.log(`💾 创建备份: ${backupPath}`);
      }

      // 更新元数据
      database.metadata.lastUpdated = new Date().toISOString();
      database.metadata.totalRegions = Object.keys(database.regions).length;
      database.metadata.totalSpots = Object.values(database.regions).reduce(
        (total, region) => total + (region.spots ? region.spots.length : 0),
        0
      );

      // 保存数据库
      fs.writeFileSync(this.databasePath, JSON.stringify(database, null, 2));
      console.log('✅ 数据库保存成功');
      return true;
    } catch (error) {
      console.error('❌ 保存数据库失败:', error.message);
      return false;
    }
  }

  /**
   * 更新地区数据
   */
  updateRegionData(regionCode, regionData) {
    try {
      const database = this.loadDatabase();

      console.log(`🔄 更新地区数据: ${regionCode} (${regionData.regionName})`);

      database.regions[regionCode] = {
        regionName: regionData.regionName || regionCode,
        spots: regionData.spots || [],
        lastUpdated: new Date().toISOString(),
        metadata: {
          totalSpots: regionData.spots ? regionData.spots.length : 0,
          sourceUrl: regionData.sourceUrl || '',
          scrapedAt: regionData.scrapedAt || new Date().toISOString(),
          technology: regionData.technology || 'Playwright + Cheerio',
          commercial: '真实数据，严禁编造',
        },
      };

      const saved = this.saveDatabase(database);
      if (saved) {
        console.log(
          `✅ 地区 ${regionCode} 数据更新完成，共 ${database.regions[regionCode].spots.length} 个花见地点`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`❌ 更新地区 ${regionCode} 失败:`, error.message);
      return false;
    }
  }

  /**
   * 获取地区数据
   */
  getRegionData(regionCode) {
    try {
      const database = this.loadDatabase();
      return database.regions[regionCode] || null;
    } catch (error) {
      console.error(`❌ 获取地区 ${regionCode} 数据失败:`, error.message);
      return null;
    }
  }

  /**
   * 获取所有地区列表
   */
  getAllRegions() {
    try {
      const database = this.loadDatabase();
      return Object.keys(database.regions);
    } catch (error) {
      console.error('❌ 获取地区列表失败:', error.message);
      return [];
    }
  }

  /**
   * 获取数据库统计信息
   */
  getStatistics() {
    try {
      const database = this.loadDatabase();
      return {
        totalRegions: Object.keys(database.regions).length,
        totalSpots: Object.values(database.regions).reduce(
          (total, region) => total + (region.spots ? region.spots.length : 0),
          0
        ),
        lastUpdated: database.metadata.lastUpdated,
        regions: Object.entries(database.regions).map(([code, data]) => ({
          code,
          name: data.regionName,
          spots: data.spots ? data.spots.length : 0,
          lastUpdated: data.lastUpdated,
        })),
      };
    } catch (error) {
      console.error('❌ 获取统计信息失败:', error.message);
      return null;
    }
  }

  /**
   * 清理备份文件（保留最新5个）
   */
  cleanupBackups() {
    try {
      const backupFiles = fs
        .readdirSync(this.backupDir)
        .filter(file => file.startsWith('hanami-database-backup-'))
        .sort()
        .reverse();

      if (backupFiles.length > 5) {
        const filesToDelete = backupFiles.slice(5);
        filesToDelete.forEach(file => {
          fs.unlinkSync(path.join(this.backupDir, file));
          console.log(`🗑️ 删除旧备份: ${file}`);
        });
      }
    } catch (error) {
      console.error('❌ 清理备份文件失败:', error.message);
    }
  }
}

module.exports = UnifiedHanamiDatabaseManager;
