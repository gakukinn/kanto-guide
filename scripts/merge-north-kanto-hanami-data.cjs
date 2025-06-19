const fs = require('fs');
const path = require('path');

/**
 * 北关东花见数据合并脚本
 * 将茨城县、栃木县、群马县的花见数据合并为统一的北关东数据
 */
class NorthKantoHanamiDataMerger {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data', 'walkerplus-crawled');
    this.outputDir = this.dataDir;
    this.mergedData = [];

    console.log('🔀 北关东花见数据合并器初始化');
  }

  /**
   * 查找最新的数据文件
   */
  findLatestDataFile(regionCode) {
    const files = fs.readdirSync(this.dataDir);
    const regionFiles = files.filter(
      file =>
        file.startsWith(`${regionCode}-hanami-single-page-`) &&
        file.endsWith('.json')
    );

    if (regionFiles.length === 0) {
      throw new Error(`未找到 ${regionCode} 的数据文件`);
    }

    // 按时间戳排序，取最新的
    regionFiles.sort((a, b) => b.localeCompare(a));
    return regionFiles[0];
  }

  /**
   * 读取并合并数据
   */
  mergeData() {
    console.log('\n📊 开始合并北关东三县花见数据...');

    const regions = [
      { code: 'ar0308', name: '茨城县' },
      { code: 'ar0309', name: '栃木县' },
      { code: 'ar0310', name: '群马县' },
    ];

    let totalCount = 0;
    const sourceFiles = [];

    for (const region of regions) {
      try {
        const filename = this.findLatestDataFile(region.code);
        const filepath = path.join(this.dataDir, filename);

        console.log(`📁 读取 ${region.name} 数据: ${filename}`);

        const rawData = fs.readFileSync(filepath, 'utf8');
        const jsonData = JSON.parse(rawData);

        if (jsonData.data && Array.isArray(jsonData.data)) {
          this.mergedData.push(...jsonData.data);
          totalCount += jsonData.data.length;
          sourceFiles.push({
            region: region.name,
            file: filename,
            count: jsonData.data.length,
            crawlTime: jsonData.metadata.crawlTime,
          });

          console.log(`✅ ${region.name}: ${jsonData.data.length} 个景点`);
        }
      } catch (error) {
        console.error(`❌ 读取 ${region.name} 数据失败:`, error.message);
      }
    }

    console.log(`\n📊 合并完成，共 ${totalCount} 个北关东花见景点`);

    return { totalCount, sourceFiles };
  }

  /**
   * 保存合并后的数据
   */
  saveMergedData(metadata) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `north-kanto-hanami-merged-${timestamp}.json`;
      const filepath = path.join(this.outputDir, filename);

      const output = {
        metadata: {
          regionCode: 'north-kanto',
          regionName: '北关东',
          activityType: 'hanami',
          level: '三層',
          sourceRegions: ['茨城県', '栃木県', '群馬県'],
          sourceUrl: [
            'https://hanami.walkerplus.com/ranking/ar0308/',
            'https://hanami.walkerplus.com/ranking/ar0309/',
            'https://hanami.walkerplus.com/ranking/ar0310/',
          ],
          mergeTime: new Date().toISOString(),
          totalCount: this.mergedData.length,
          dataStructure: '三层（地区→花见会→列表）',
          sourceFiles: metadata.sourceFiles,
        },
        data: this.mergedData,
      };

      fs.writeFileSync(filepath, JSON.stringify(output, null, 2), 'utf8');

      console.log(`💾 合并数据已保存到: ${filepath}`);
      console.log(
        `📊 文件大小: ${(fs.statSync(filepath).size / 1024).toFixed(2)}KB`
      );

      return filepath;
    } catch (error) {
      console.error('❌ 保存合并数据失败:', error.message);
      throw error;
    }
  }

  /**
   * 生成合并报告
   */
  generateReport() {
    console.log('\n🌸 === 北关东花见数据合并报告 ===');
    console.log(`📊 总计景点数量: ${this.mergedData.length} 个`);
    console.log(`🗾 覆盖地区: 茨城县、栃木县、群马县`);

    if (this.mergedData.length > 0) {
      console.log('\n🏆 北关东花见景点列表:');

      // 按地区分组显示
      const groupByPrefecture = {};
      this.mergedData.forEach(spot => {
        if (!groupByPrefecture[spot.prefecture]) {
          groupByPrefecture[spot.prefecture] = [];
        }
        groupByPrefecture[spot.prefecture].push(spot);
      });

      Object.keys(groupByPrefecture).forEach(prefecture => {
        console.log(`\n【${prefecture}】`);
        groupByPrefecture[prefecture].forEach((spot, index) => {
          console.log(
            `${index + 1}. ${spot.name.split(' ')[0]} (${spot.location})`
          );
          console.log(`   见顷时期: ${spot.viewingSeason}`);
          console.log(`   详情链接: ${spot.detailUrl}`);
        });
      });
    }

    console.log('\n✅ 北关东花见数据合并完成！');
  }

  /**
   * 执行完整的合并流程
   */
  run() {
    try {
      const metadata = this.mergeData();
      this.saveMergedData(metadata);
      this.generateReport();
    } catch (error) {
      console.error('❌ 合并流程失败:', error.message);
      throw error;
    }
  }
}

// 执行合并
(async () => {
  const merger = new NorthKantoHanamiDataMerger();
  merger.run();
})();
