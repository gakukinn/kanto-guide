/**
 * 改进的路径生成器
 * 日期：2025年6月26日
 * 目标：解决路径冲突，优化URL结构，支持静态化
 */

import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// 地区映射配置
const REGION_CONFIG = {
  tokyo: { code: 'tokyo', nameJa: '東京都', nameZh: '东京都' },
  saitama: { code: 'saitama', nameJa: '埼玉県', nameZh: '埼玉县' },
  chiba: { code: 'chiba', nameJa: '千葉県', nameZh: '千叶县' },
  kanagawa: { code: 'kanagawa', nameJa: '神奈川県', nameZh: '神奈川县' },
  kitakanto: { code: 'kitakanto', nameJa: '北関東', nameZh: '北关东' },
  koshinetsu: { code: 'koshinetsu', nameJa: '甲信越', nameZh: '甲信越' }
} as const;

// 活动类型配置
const ACTIVITY_CONFIG = {
  hanabi: { code: 'hanabi', nameJa: '花火大会', nameZh: '花火大会' },
  matsuri: { code: 'matsuri', nameJa: '祭典', nameZh: '祭典' },
  hanami: { code: 'hanami', nameJa: '花見', nameZh: '花见' },
  momiji: { code: 'momiji', nameJa: '紅葉狩り', nameZh: '红叶狩' },
  illumination: { code: 'illumination', nameJa: 'イルミネーション', nameZh: '灯光秀' },
  culture: { code: 'culture', nameJa: '文化芸術', nameZh: '文化艺术' }
} as const;

interface ActivityPathData {
  id: string;
  name: string;
  region: string;
  activityType: string;
  englishName?: string;
  datetime?: string;
}

class ImprovedPathGenerator {
  private existingPaths: Set<string> = new Set();
  private pathDatabase: Map<string, ActivityPathData> = new Map();

  constructor() {
    console.log('🚀 初始化改进的路径生成器');
  }

  /**
   * 主要路径生成函数
   */
  async generateOptimizedPath(data: ActivityPathData): Promise<{
    success: boolean;
    path: string;
    directory: string;
    url: string;
    conflicts?: string[];
  }> {
    try {
      // 1. 生成基础路径
      const basePath = this.createBasePath(data);
      
      // 2. 检查冲突并解决
      const resolvedPath = await this.resolvePathConflicts(basePath, data);
      
      // 3. 生成完整目录结构
      const directory = this.createDirectoryPath(resolvedPath);
      const url = this.createURL(resolvedPath);
      
      // 4. 记录路径
      this.existingPaths.add(resolvedPath);
      this.pathDatabase.set(data.id, data);
      
      return {
        success: true,
        path: resolvedPath,
        directory,
        url,
      };
    } catch (error) {
      console.error('路径生成失败:', error);
      return {
        success: false,
        path: '',
        directory: '',
        url: ''
      };
    }
  }

  /**
   * 创建基础路径
   */
  private createBasePath(data: ActivityPathData): string {
    // 1. 标准化地区代码
    const regionCode = this.standardizeRegion(data.region);
    
    // 2. 标准化活动类型
    const activityCode = this.standardizeActivityType(data.activityType);
    
    // 3. 生成活动ID段
    const activityId = this.generateActivityId(data);
    
    return `${regionCode}/${activityCode}/${activityId}`;
  }

  /**
   * 标准化地区代码
   */
  private standardizeRegion(region: string): string {
    const regionMap: { [key: string]: string } = {
      // 日文格式
      '東京都': 'tokyo',
      '東京': 'tokyo',
      '埼玉県': 'saitama',
      '埼玉': 'saitama',
      '千葉県': 'chiba',
      '千葉': 'chiba',
      '神奈川県': 'kanagawa',
      '神奈川': 'kanagawa',
      '茨城県': 'kitakanto',
      '栃木県': 'kitakanto',
      '群馬県': 'kitakanto',
      '新潟県': 'koshinetsu',
      '長野県': 'koshinetsu',
      '山梨県': 'koshinetsu',
      // 英文格式
      'tokyo': 'tokyo',
      'saitama': 'saitama',
      'chiba': 'chiba',
      'kanagawa': 'kanagawa',
      'kitakanto': 'kitakanto',
      'koshinetsu': 'koshinetsu'
    };

    return regionMap[region] || 'tokyo';
  }

  /**
   * 标准化活动类型
   */
  private standardizeActivityType(activityType: string): string {
    const typeMap: { [key: string]: string } = {
      'hanabi': 'hanabi',
      'matsuri': 'matsuri',
      'hanami': 'hanami',
      'momiji': 'momiji',
      'illumination': 'illumination',
      'culture': 'culture',
      // 日文别名
      '花火': 'hanabi',
      '祭典': 'matsuri',
      '花見': 'hanami',
      '紅葉': 'momiji',
      'イルミネーション': 'illumination',
      '文化': 'culture'
    };

    return typeMap[activityType] || 'hanabi';
  }

  /**
   * 生成活动ID段 - 改进算法
   */
  private generateActivityId(data: ActivityPathData): string {
    // 优先级1: 使用英文名称
    if (data.englishName && data.englishName.length >= 3) {
      const sanitized = this.sanitizeEnglishName(data.englishName);
      if (sanitized.length >= 3) {
        return `${sanitized}-${this.getShortId(data.id)}`;
      }
    }

    // 优先级2: 从日文名称生成简短标识
    const nameId = this.generateNameId(data.name);
    if (nameId) {
      return `${nameId}-${this.getShortId(data.id)}`;
    }

    // 优先级3: 使用时间戳（如果有日期信息）
    if (data.datetime) {
      const dateId = this.generateDateId(data.datetime);
      return `${dateId}-${this.getShortId(data.id)}`;
    }

    // 兜底方案: activity-{短ID}
    return `activity-${this.getShortId(data.id)}`;
  }

  /**
   * 清理英文名称
   */
  private sanitizeEnglishName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')  // 特殊字符转连字符
      .replace(/-+/g, '-')         // 多个连字符合并
      .replace(/^-|-$/g, '')       // 去除首尾连字符
      .substring(0, 25);           // 限制长度
  }

  /**
   * 从日文名称生成ID
   */
  private generateNameId(name: string): string {
    // 提取关键词（去除常见后缀）
    const cleanName = name
      .replace(/（.*?）/g, '')     // 去除括号内容
      .replace(/大会$|祭り$|祭$|会$|展$|フェス$|イベント$/g, '') // 去除常见后缀
      .substring(0, 10);

    // 如果是纯日文，返回romanized版本的简化形式
    if (/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/.test(cleanName)) {
      // 简化的romanization映射（核心区域名）
      const locationMap: { [key: string]: string } = {
        '隅田川': 'sumida',
        '多摩川': 'tama',
        '葛飾': 'katsushika',
        '浅草': 'asakusa',
        '渋谷': 'shibuya',
        '新宿': 'shinjuku',
        '池袋': 'ikebukuro',
        '品川': 'shinagawa',
        '足立': 'adachi',
        '板橋': 'itabashi',
        '江戸川': 'edogawa'
      };

      for (const [japanese, roman] of Object.entries(locationMap)) {
        if (cleanName.includes(japanese)) {
          return roman;
        }
      }
    }

    return '';
  }

  /**
   * 从日期生成ID
   */
  private generateDateId(datetime: string): string {
    // 提取月份和日期
    const monthMatch = datetime.match(/(\d{1,2})月/);
    const dayMatch = datetime.match(/(\d{1,2})日/);
    
    if (monthMatch && dayMatch) {
      const month = monthMatch[1].padStart(2, '0');
      const day = dayMatch[1].padStart(2, '0');
      return `${month}${day}`;
    }
    
    return '';
  }

  /**
   * 获取短ID
   */
  private getShortId(fullId: string): string {
    return fullId.slice(-8);
  }

  /**
   * 解决路径冲突
   */
  private async resolvePathConflicts(basePath: string, data: ActivityPathData): Promise<string> {
    let finalPath = basePath;
    let counter = 1;

    // 检查路径是否已存在
    while (this.existingPaths.has(finalPath) || await this.pathExistsOnDisk(finalPath)) {
      console.log(`⚠️ 路径冲突: ${finalPath}`);
      
      // 生成备选路径
      const pathParts = basePath.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      
      // 添加数字后缀
      pathParts[pathParts.length - 1] = `${lastPart}-${counter}`;
      finalPath = pathParts.join('/');
      
      counter++;
      
      // 防止无限循环
      if (counter > 100) {
        console.error('路径冲突解决失败，超过最大尝试次数');
        finalPath = `${basePath}-${Date.now()}`;
        break;
      }
    }

    if (finalPath !== basePath) {
      console.log(`✅ 路径冲突已解决: ${basePath} → ${finalPath}`);
    }

    return finalPath;
  }

  /**
   * 检查磁盘上是否存在路径
   */
  private async pathExistsOnDisk(relativePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(process.cwd(), 'app', relativePath, 'page.tsx');
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 创建目录路径
   */
  private createDirectoryPath(relativePath: string): string {
    return path.join(process.cwd(), 'app', relativePath);
  }

  /**
   * 创建URL
   */
  private createURL(relativePath: string): string {
    return `http://localhost:3000/${relativePath}`;
  }

  /**
   * 批量处理所有活动
   */
  async generateAllPaths(): Promise<{
    success: number;
    failed: number;
    conflicts: number;
    results: any[];
  }> {
    console.log('🔄 开始批量生成路径...');
    
    const results = [];
    let success = 0;
    let failed = 0;
    let conflicts = 0;

    // 加载现有路径
    await this.loadExistingPaths();

    // 获取所有活动数据
    const allActivities = await this.getAllActivitiesFromDB();
    
    console.log(`📊 找到 ${allActivities.length} 个活动`);

    for (const activity of allActivities) {
      try {
        const result = await this.generateOptimizedPath(activity);
        
        if (result.success) {
          success++;
          if (result.conflicts && result.conflicts.length > 0) {
            conflicts++;
          }
        } else {
          failed++;
        }
        
        results.push({
          id: activity.id,
          name: activity.name,
          ...result
        });
        
      } catch (error) {
        console.error(`处理活动 ${activity.id} 失败:`, error);
        failed++;
      }
    }

    console.log(`✅ 路径生成完成: 成功 ${success}, 失败 ${failed}, 冲突解决 ${conflicts}`);
    
    return { success, failed, conflicts, results };
  }

  /**
   * 加载现有路径
   */
  private async loadExistingPaths(): Promise<void> {
    const appDir = path.join(process.cwd(), 'app');
    
    for (const region of Object.keys(REGION_CONFIG)) {
      for (const activity of Object.keys(ACTIVITY_CONFIG)) {
        try {
          const activityDir = path.join(appDir, region, activity);
          const entries = await fs.readdir(activityDir, { withFileTypes: true });
          
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const existingPath = `${region}/${activity}/${entry.name}`;
              this.existingPaths.add(existingPath);
            }
          }
        } catch {
          // 目录不存在，跳过
        }
      }
    }
    
    console.log(`📁 加载了 ${this.existingPaths.size} 个现有路径`);
  }

  /**
   * 从数据库获取所有活动
   */
  private async getAllActivitiesFromDB(): Promise<ActivityPathData[]> {
    const activities: ActivityPathData[] = [];

    // 获取所有活动类型的数据
    const activityTypes = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];
    
    for (const activityType of activityTypes) {
      try {
        const modelName = `${activityType}Event` as keyof typeof prisma;
        const events = await (prisma[modelName] as any).findMany();
        
        for (const event of events) {
          activities.push({
            id: event.id,
            name: event.name,
            region: event.region,
            activityType: activityType,
            englishName: event.englishName,
            datetime: event.datetime
          });
        }
      } catch (error) {
        console.error(`获取 ${activityType} 数据失败:`, error);
      }
    }

    return activities;
  }

  /**
   * 导出路径映射表
   */
  async exportPathMapping(): Promise<void> {
    const mapping = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalPaths: this.existingPaths.size,
        regions: Object.keys(REGION_CONFIG),
        activityTypes: Object.keys(ACTIVITY_CONFIG)
      },
             paths: Array.from(this.existingPaths).map(pathStr => {
         const [region, activity, id] = pathStr.split('/');
         return {
           path: pathStr,
           region,
           activity,
           id,
           url: `http://localhost:3000/${pathStr}`,
           directory: path.join(process.cwd(), 'app', pathStr)
         };
       })
    };

    const outputPath = path.join(process.cwd(), 'scripts', 'path-mapping.json');
    await fs.writeFile(outputPath, JSON.stringify(mapping, null, 2), 'utf-8');
    
    console.log(`📄 路径映射表已导出: ${outputPath}`);
  }
}

// 主执行函数
async function main() {
  try {
    const generator = new ImprovedPathGenerator();
    
    console.log('🚀 开始改进路径生成...');
    
    // 生成所有路径
    const results = await generator.generateAllPaths();
    
    // 导出路径映射
    await generator.exportPathMapping();
    
    console.log('✅ 路径生成改进完成!');
    console.log('📊 生成结果:', results);
    
  } catch (error) {
    console.error('❌ 路径生成改进失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

export { ImprovedPathGenerator }; 