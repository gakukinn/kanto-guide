/**
 * Level4文件分析器
 * 专门分析四层详情文件，确保符合86个文件的要求
 */

import { promises as fs } from 'fs';
import { join, resolve } from 'path';

export interface Level4File {
  fileName: string;
  region: string;
  filePath: string;
  isLevel4: boolean;
  hasValidData: boolean;
  activityId?: string;
  activityName?: string;
}

export class Level4FileAnalyzer {
  private expectedCounts: { [key: string]: number } = {
    tokyo: 16,
    saitama: 13,
    chiba: 15,
    kanagawa: 15,
    kitakanto: 13,
    koshinetsu: 14,
  };

  private level4Files: Level4File[] = [];
  private nonLevel4Files: Level4File[] = [];

  constructor() {
    console.log('🔍 初始化Level4文件分析器');
    console.log('目标: 86个四层详情文件 (16+13+15+15+13+14)');
  }

  /**
   * 执行完整分析
   */
  async analyze(): Promise<void> {
    console.log('\n📋 开始分析所有数据文件...');

    const regions = [
      'tokyo',
      'saitama',
      'chiba',
      'kanagawa',
      'kitakanto',
      'koshinetsu',
    ];

    for (const region of regions) {
      await this.analyzeRegion(region);
    }

    this.generateReport();
    this.identifyExtraFiles();
    this.provideDeletionRecommendations();
  }

  /**
   * 分析单个区域
   */
  private async analyzeRegion(region: string): Promise<void> {
    console.log(
      `\n📁 分析区域: ${region} (预期: ${this.expectedCounts[region]}个level4文件)`
    );

    const regionPath = resolve('src/data/hanabi', region);

    try {
      const files = await fs.readdir(regionPath);
      const tsFiles = files.filter(
        file => file.endsWith('.ts') && !file.includes('index')
      );

      console.log(`  发现 ${tsFiles.length} 个数据文件`);

      for (const file of tsFiles) {
        const filePath = join(regionPath, file);
        const isLevel4 = file.startsWith('level4-');

        try {
          const hasValidData = await this.checkFileData(filePath);

          const fileInfo: Level4File = {
            fileName: file,
            region: region,
            filePath: filePath,
            isLevel4: isLevel4,
            hasValidData: hasValidData,
          };

          if (hasValidData) {
            const { activityId, activityName } =
              await this.extractActivityInfo(filePath);
            fileInfo.activityId = activityId;
            fileInfo.activityName = activityName;
          }

          if (isLevel4) {
            this.level4Files.push(fileInfo);
            console.log(
              `  ✅ Level4: ${file} - 数据: ${hasValidData ? '✅' : '❌'}`
            );
          } else {
            this.nonLevel4Files.push(fileInfo);
            console.log(
              `  📄 其他: ${file} - 数据: ${hasValidData ? '✅' : '❌'}`
            );
          }
        } catch (error) {
          console.warn(`  ⚠️  文件分析失败 ${file}: ${error}`);

          const fileInfo: Level4File = {
            fileName: file,
            region: region,
            filePath: filePath,
            isLevel4: isLevel4,
            hasValidData: false,
          };

          if (isLevel4) {
            this.level4Files.push(fileInfo);
          } else {
            this.nonLevel4Files.push(fileInfo);
          }
        }
      }
    } catch (error) {
      console.error(`❌ 区域 ${region} 分析失败: ${error}`);
    }
  }

  /**
   * 检查文件是否有有效数据
   */
  private async checkFileData(filePath: string): Promise<boolean> {
    try {
      const fullPath = resolve(filePath);
      const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
      const importedModule = await import(fileUrl);

      const dataKeys = Object.keys(importedModule).filter(
        key =>
          key.includes('Data') || key.endsWith('data') || key.includes('hanabi')
      );

      if (dataKeys.length === 0) return false;

      for (const key of dataKeys) {
        const data = importedModule[key];
        if (data && data.id && data.name) {
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * 提取活动信息
   */
  private async extractActivityInfo(
    filePath: string
  ): Promise<{ activityId?: string; activityName?: string }> {
    try {
      const fullPath = resolve(filePath);
      const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
      const importedModule = await import(fileUrl);

      const dataKeys = Object.keys(importedModule).filter(
        key =>
          key.includes('Data') || key.endsWith('data') || key.includes('hanabi')
      );

      for (const key of dataKeys) {
        const data = importedModule[key];
        if (data && data.id && data.name) {
          return {
            activityId: data.id,
            activityName: data.name,
          };
        }
      }

      return {};
    } catch (error) {
      return {};
    }
  }

  /**
   * 生成分析报告
   */
  private generateReport(): void {
    console.log('\n📊 === Level4文件分析报告 ===');

    const level4Count = this.level4Files.length;
    const nonLevel4Count = this.nonLevel4Files.length;
    const totalCount = level4Count + nonLevel4Count;

    console.log(`总文件数: ${totalCount}`);
    console.log(`Level4文件: ${level4Count} (目标: 86)`);
    console.log(`其他文件: ${nonLevel4Count}`);

    // 按区域统计Level4文件
    console.log('\nLevel4文件区域分布:');
    const regionCounts: { [key: string]: number } = {};
    this.level4Files.forEach(file => {
      regionCounts[file.region] = (regionCounts[file.region] || 0) + 1;
    });

    Object.entries(this.expectedCounts).forEach(([region, expected]) => {
      const actual = regionCounts[region] || 0;
      const status =
        actual === expected ? '✅' : actual > expected ? '⚠️ 超出' : '❌ 不足';
      console.log(`  ${region}: ${actual}/${expected} ${status}`);
    });

    // 按区域统计其他文件
    console.log('\n其他文件区域分布:');
    const otherRegionCounts: { [key: string]: number } = {};
    this.nonLevel4Files.forEach(file => {
      otherRegionCounts[file.region] =
        (otherRegionCounts[file.region] || 0) + 1;
    });

    Object.entries(otherRegionCounts).forEach(([region, count]) => {
      console.log(`  ${region}: ${count} 个非level4文件`);
    });
  }

  /**
   * 识别多出来的文件
   */
  private identifyExtraFiles(): void {
    console.log('\n🔍 识别多出来的文件...');

    const totalLevel4 = this.level4Files.length;
    const expectedTotal = Object.values(this.expectedCounts).reduce(
      (a, b) => a + b,
      0
    );

    if (totalLevel4 > expectedTotal) {
      const extra = totalLevel4 - expectedTotal;
      console.log(
        `⚠️  Level4文件超出 ${extra} 个 (${totalLevel4}/${expectedTotal})`
      );

      // 找出每个区域超出的文件
      Object.entries(this.expectedCounts).forEach(([region, expected]) => {
        const regionFiles = this.level4Files.filter(f => f.region === region);
        if (regionFiles.length > expected) {
          const extra = regionFiles.length - expected;
          console.log(`  ${region}: 超出 ${extra} 个文件`);
          regionFiles.forEach((file, index) => {
            const status = index >= expected ? '🔄 超出' : '✅ 保留';
            console.log(
              `    ${status}: ${file.fileName} - ${file.activityName || '未知活动'}`
            );
          });
        }
      });
    } else if (totalLevel4 < expectedTotal) {
      const missing = expectedTotal - totalLevel4;
      console.log(
        `❌ Level4文件不足 ${missing} 个 (${totalLevel4}/${expectedTotal})`
      );
    } else {
      console.log(`✅ Level4文件数量正确: ${totalLevel4}个`);
    }

    // 分析其他可能删除的文件
    console.log('\n📄 其他文件分析:');
    this.nonLevel4Files.forEach(file => {
      if (!file.hasValidData) {
        console.log(
          `  🗑️  可删除: ${file.fileName} (${file.region}) - 无有效数据`
        );
      } else {
        console.log(
          `  📄 保留: ${file.fileName} (${file.region}) - ${file.activityName || '有效数据'}`
        );
      }
    });
  }

  /**
   * 提供删除建议
   */
  private provideDeletionRecommendations(): void {
    console.log('\n💡 删除建议:');

    const filesToDelete: Level4File[] = [];

    // 1. 超出的Level4文件
    Object.entries(this.expectedCounts).forEach(([region, expected]) => {
      const regionFiles = this.level4Files.filter(f => f.region === region);
      if (regionFiles.length > expected) {
        const extraFiles = regionFiles.slice(expected);
        filesToDelete.push(...extraFiles);
      }
    });

    // 2. 无效数据的文件
    const invalidFiles = [...this.level4Files, ...this.nonLevel4Files].filter(
      f => !f.hasValidData
    );
    filesToDelete.push(...invalidFiles);

    if (filesToDelete.length > 0) {
      console.log('\n🗑️  建议删除的文件:');
      filesToDelete.forEach((file, index) => {
        const reason = !file.hasValidData ? '无有效数据' : '超出数量限制';
        console.log(
          `${index + 1}. ${file.fileName} (${file.region}) - ${reason}`
        );
      });

      console.log(`\n总计建议删除: ${filesToDelete.length} 个文件`);
      console.log('删除后预计达到目标: 86个有效的level4文件');
    } else {
      console.log('✅ 无需删除文件，文件数量和质量都符合要求');
    }
  }

  /**
   * 获取分析结果
   */
  public getResults() {
    return {
      level4Files: this.level4Files,
      nonLevel4Files: this.nonLevel4Files,
      totalLevel4: this.level4Files.length,
      expectedTotal: Object.values(this.expectedCounts).reduce(
        (a, b) => a + b,
        0
      ),
      regionCounts: this.level4Files.reduce(
        (acc: { [key: string]: number }, file) => {
          acc[file.region] = (acc[file.region] || 0) + 1;
          return acc;
        },
        {}
      ),
    };
  }
}

// 便捷的执行函数
export async function analyzeLevel4Files(): Promise<void> {
  const analyzer = new Level4FileAnalyzer();
  await analyzer.analyze();
}
