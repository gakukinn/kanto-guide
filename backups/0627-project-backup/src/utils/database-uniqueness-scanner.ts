/**
 * 数据库唯一性扫描器
 * 确保每个活动只有一个数据库文件
 */

import { HanabiData } from '@/types/hanabi';
import { promises as fs } from 'fs';
import { join, resolve } from 'path';

export interface ActivityDatabase {
  id: string;
  name: string;
  region: string;
  filePath: string;
  fileName: string;
  hasTimeAndLocation: boolean;
  timeInfo?: string;
  locationInfo?: string;
}

export interface DuplicateGroup {
  activityId: string;
  activityName: string;
  files: ActivityDatabase[];
  region: string;
}

export class DatabaseUniquenessScanner {
  private activities: Map<string, ActivityDatabase[]> = new Map();
  private duplicates: DuplicateGroup[] = [];
  private missingData: ActivityDatabase[] = [];

  constructor() {
    console.log('🔍 初始化数据库唯一性扫描器');
  }

  /**
   * 执行完整扫描
   */
  async scan(): Promise<void> {
    console.log('\n📋 开始扫描数据库文件...');

    const regions = [
      'tokyo',
      'kanagawa',
      'chiba',
      'saitama',
      'kitakanto',
      'koshinetsu',
    ];

    for (const region of regions) {
      await this.scanRegion(region);
    }

    this.analyzeDuplicates();
    this.analyzeData();
    this.generateReport();
  }

  /**
   * 扫描单个区域
   */
  private async scanRegion(region: string): Promise<void> {
    console.log(`\n📁 扫描区域: ${region}`);

    const regionPath = resolve('src/data/hanabi', region);

    try {
      const files = await fs.readdir(regionPath);
      const tsFiles = files.filter(
        file => file.endsWith('.ts') && !file.includes('index')
      );

      console.log(`  发现 ${tsFiles.length} 个数据文件`);

      for (const file of tsFiles) {
        const filePath = join(regionPath, file);
        try {
          await this.analyzeFile(region, file, filePath);
        } catch (error) {
          console.warn(`  ⚠️  文件分析失败 ${file}: ${error}`);
        }
      }
    } catch (error) {
      console.error(`❌ 区域 ${region} 扫描失败: ${error}`);
    }
  }

  /**
   * 分析单个文件
   */
  private async analyzeFile(
    region: string,
    fileName: string,
    filePath: string
  ): Promise<void> {
    try {
      // 动态导入数据文件
      const fullPath = resolve(filePath);
      const fileUrl = `file://${fullPath.replace(/\\/g, '/')}`;
      const importedModule = await import(fileUrl);

      // 查找数据导出
      const dataKeys = Object.keys(importedModule).filter(
        key =>
          key.includes('Data') || key.endsWith('data') || key.includes('hanabi')
      );

      if (dataKeys.length === 0) {
        console.warn(`  ⚠️  文件 ${fileName} 中未找到数据导出`);
        return;
      }

      for (const key of dataKeys) {
        const data: HanabiData = importedModule[key];

        if (!data || !data.id) {
          console.warn(`  ⚠️  文件 ${fileName} 中的 ${key} 缺少有效数据`);
          continue;
        }

        // 检查时间和地点信息
        const hasTime = !!(data.date && data.time);
        const hasLocation = !!(
          data.venues &&
          data.venues.length > 0 &&
          data.venues[0].location
        );

        const activity: ActivityDatabase = {
          id: data.id,
          name: data.name,
          region: region,
          filePath: filePath,
          fileName: fileName,
          hasTimeAndLocation: hasTime && hasLocation,
          timeInfo: hasTime ? `${data.date} ${data.time}` : undefined,
          locationInfo: hasLocation ? data.venues[0].location : undefined,
        };

        // 记录活动
        if (!this.activities.has(data.id)) {
          this.activities.set(data.id, []);
        }
        this.activities.get(data.id)!.push(activity);

        console.log(
          `  ✅ 发现活动: ${data.name} (${data.id}) - 时间地点: ${activity.hasTimeAndLocation ? '✅' : '❌'}`
        );
      }
    } catch (error) {
      console.warn(`  ⚠️  文件解析失败 ${fileName}: ${error}`);
    }
  }

  /**
   * 分析重复项
   */
  private analyzeDuplicates(): void {
    console.log('\n🔍 分析重复活动...');

    this.duplicates = [];

    for (const [activityId, databases] of this.activities) {
      if (databases.length > 1) {
        this.duplicates.push({
          activityId,
          activityName: databases[0].name,
          files: databases,
          region: databases[0].region,
        });

        console.log(
          `  🔄 发现重复: ${databases[0].name} (${activityId}) - ${databases.length} 个文件`
        );
        databases.forEach(db => {
          console.log(`    - ${db.fileName}`);
        });
      }
    }
  }

  /**
   * 分析数据完整性
   */
  private analyzeData(): void {
    console.log('\n📊 分析数据完整性...');

    this.missingData = [];

    for (const [activityId, databases] of this.activities) {
      // 只检查第一个文件（如果有重复，稍后处理）
      const primaryDb = databases[0];

      if (!primaryDb.hasTimeAndLocation) {
        this.missingData.push(primaryDb);

        const missing = [];
        if (!primaryDb.timeInfo) missing.push('时间信息');
        if (!primaryDb.locationInfo) missing.push('地点信息');

        console.log(
          `  ❌ 缺少数据: ${primaryDb.name} (${activityId}) - 缺少: ${missing.join(', ')}`
        );
      }
    }
  }

  /**
   * 生成扫描报告
   */
  private generateReport(): void {
    console.log('\n📊 === 数据库唯一性扫描报告 ===');

    const totalActivities = this.activities.size;
    const duplicateActivities = this.duplicates.length;
    const missingDataActivities = this.missingData.length;
    const goodActivities =
      totalActivities - duplicateActivities - missingDataActivities;

    console.log(`总活动数: ${totalActivities}`);
    console.log(`✅ 数据完整且唯一: ${goodActivities} 个`);
    console.log(`🔄 存在重复文件: ${duplicateActivities} 个`);
    console.log(`❌ 缺少时间/地点: ${missingDataActivities} 个`);

    // 按区域统计
    const regionStats = this.getRegionStats();
    console.log('\n区域分布:');
    Object.entries(regionStats).forEach(([region, stats]) => {
      console.log(
        `  ${region}: ${stats.total} 个活动 (重复: ${stats.duplicates}, 缺失: ${stats.missing})`
      );
    });

    // 重复详情
    if (this.duplicates.length > 0) {
      console.log('\n🔄 重复活动详情:');
      this.duplicates.forEach((dup, index) => {
        console.log(`${index + 1}. ${dup.activityName} (${dup.activityId})`);
        dup.files.forEach(file => {
          console.log(`   - ${file.fileName} (${file.region})`);
        });
      });
    }

    // 缺失数据详情
    if (this.missingData.length > 0) {
      console.log('\n❌ 缺失数据详情:');
      this.missingData.forEach((activity, index) => {
        console.log(`${index + 1}. ${activity.name} (${activity.id})`);
        console.log(`   文件: ${activity.fileName}`);
        if (!activity.timeInfo) console.log(`   缺少: 时间信息`);
        if (!activity.locationInfo) console.log(`   缺少: 地点信息`);
      });
    }

    // 建议操作
    this.generateRecommendations();
  }

  /**
   * 获取区域统计
   */
  private getRegionStats(): Record<
    string,
    { total: number; duplicates: number; missing: number }
  > {
    const stats: Record<
      string,
      { total: number; duplicates: number; missing: number }
    > = {};

    // 初始化统计
    const regions = [
      'tokyo',
      'kanagawa',
      'chiba',
      'saitama',
      'kitakanto',
      'koshinetsu',
    ];
    regions.forEach(region => {
      stats[region] = { total: 0, duplicates: 0, missing: 0 };
    });

    // 统计总数
    for (const [activityId, databases] of this.activities) {
      const region = databases[0].region;
      stats[region].total++;
    }

    // 统计重复
    this.duplicates.forEach(dup => {
      stats[dup.region].duplicates++;
    });

    // 统计缺失
    this.missingData.forEach(activity => {
      stats[activity.region].missing++;
    });

    return stats;
  }

  /**
   * 生成操作建议
   */
  private generateRecommendations(): void {
    console.log('\n💡 操作建议:');

    if (this.duplicates.length > 0) {
      console.log('\n🔄 重复文件处理建议:');
      this.duplicates.forEach((dup, index) => {
        console.log(`${index + 1}. ${dup.activityName} (${dup.activityId})`);
        console.log(`   建议保留: ${this.selectPrimaryFile(dup.files)}`);
        console.log(
          `   建议删除: ${dup.files
            .filter(f => f.fileName !== this.selectPrimaryFile(dup.files))
            .map(f => f.fileName)
            .join(', ')}`
        );
      });
    }

    if (this.missingData.length > 0) {
      console.log('\n❌ 数据补全建议:');
      this.missingData.forEach((activity, index) => {
        console.log(
          `${index + 1}. ${activity.name} - 需要补全: ${!activity.timeInfo ? '时间' : ''}${!activity.timeInfo && !activity.locationInfo ? '和' : ''}${!activity.locationInfo ? '地点' : ''}`
        );
      });
    }

    if (this.duplicates.length === 0 && this.missingData.length === 0) {
      console.log('✅ 所有活动数据库文件都是唯一且完整的！');
    }

    console.log('\n📝 下一步操作:');
    console.log('1. 处理重复文件问题');
    console.log('2. 补全缺失的时间和地点信息');
    console.log('3. 确认所有活动只有一个权威数据库文件');
    console.log('4. 然后再开始四层一致性检查');
  }

  /**
   * 选择主要文件（保留哪个文件的建议）
   */
  private selectPrimaryFile(files: ActivityDatabase[]): string {
    // 优先选择有完整数据的文件
    const completeFiles = files.filter(f => f.hasTimeAndLocation);
    if (completeFiles.length > 0) {
      return completeFiles[0].fileName;
    }

    // 优先选择level4开头的文件（详细页面）
    const level4Files = files.filter(f => f.fileName.startsWith('level4-'));
    if (level4Files.length > 0) {
      return level4Files[0].fileName;
    }

    // 否则选择第一个
    return files[0].fileName;
  }

  /**
   * 获取扫描结果
   */
  public getResults() {
    return {
      totalActivities: this.activities.size,
      duplicates: this.duplicates,
      missingData: this.missingData,
      allActivities: Array.from(this.activities.entries()).map(
        ([id, databases]) => ({
          id,
          databases,
        })
      ),
    };
  }
}

// 便捷的执行函数
export async function scanDatabaseUniqueness(): Promise<void> {
  const scanner = new DatabaseUniquenessScanner();
  await scanner.scan();
}
