/**
 * 增强版活动页面生成器
 * 功能：同时生成传统页面文件和静态JSON数据文件
 * 日期：2025年6月26日
 * 目标：为静态化转换做数据准备，同时保持现有功能
 */

import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// 活动类型配置
const ACTIVITY_CONFIGS = {
  hanabi: {
    name: '花火大会',
    template: 'HanabiDetail',
    urlPath: 'hanabi',
    tableName: 'hanabiEvent'
  },
  matsuri: {
    name: '祭典',
    template: 'MatsuriDetail',
    urlPath: 'matsuri',
    tableName: 'matsuriEvent'
  },
  hanami: {
    name: '花见',
    template: 'HanamiDetail', 
    urlPath: 'hanami',
    tableName: 'hanamiEvent'
  },
  momiji: {
    name: '狩枫',
    template: 'MomijiDetail',
    urlPath: 'momiji', 
    tableName: 'momijiEvent'
  },
  illumination: {
    name: '灯光秀',
    template: 'IlluminationDetail',
    urlPath: 'illumination',
    tableName: 'illuminationEvent'
  },
  culture: {
    name: '文艺活动',
    template: 'CultureDetail',
    urlPath: 'culture',
    tableName: 'cultureEvent'
  }
} as const;

// 地区映射
const REGION_MAP: { [key: string]: string } = {
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
  '山梨県': 'koshinetsu'
};

interface GenerationResult {
  success: boolean;
  message: string;
  data?: {
    traditionalPage: {
      filePath: string;
      url: string;
      directory: string;
    };
    staticDataFiles: {
      activityJsonPath: string;
      regionJsonPath: string;
      generated: string[];
    };
    migration: {
      ready: boolean;
      jsonDataAvailable: boolean;
      staticConversionReady: boolean;
    };
  };
  error?: string;
}

class EnhancedActivityPageGenerator {
  
  /**
   * 主要生成函数 - 双轨生成策略
   */
  async generatePage(
    databaseId: string, 
    activityType: keyof typeof ACTIVITY_CONFIGS,
    options: { forceOverwrite?: boolean; uploadedImages?: string[] } = {}
  ): Promise<GenerationResult> {
    try {
      console.log(`🚀 开始双轨生成：${databaseId} (${activityType})`);
      
      // 1. 获取数据库数据
      const data = await this.getActivityData(databaseId, activityType);
      if (!data) {
        return {
          success: false,
          message: '数据库中找不到指定的活动记录',
          error: `ID: ${databaseId} 在 ${activityType} 表中不存在`
        };
      }

      // 2. 并行生成：传统页面 + JSON数据文件
      const [traditionalResult, staticDataResult] = await Promise.all([
        this.generateTraditionalPage(data, activityType, options),
        this.generateStaticDataFiles(data, activityType)
      ]);

      console.log('✅ 双轨生成完成！');

      return {
        success: true,
        message: `${ACTIVITY_CONFIGS[activityType].name}页面和数据文件生成成功！`,
        data: {
          traditionalPage: traditionalResult,
          staticDataFiles: staticDataResult,
          migration: {
            ready: true,
            jsonDataAvailable: true,
            staticConversionReady: true
          }
        }
      };

    } catch (error) {
      console.error('💥 双轨生成失败:', error);
      return {
        success: false,
        message: '生成失败',
        error: error instanceof Error ? error.message : '未知错误'
      };
    }
  }

  /**
   * 从数据库获取活动数据
   */
  private async getActivityData(databaseId: string, activityType: keyof typeof ACTIVITY_CONFIGS) {
    const config = ACTIVITY_CONFIGS[activityType];
    const tableName = config.tableName;
    
    try {
      const data = await (prisma as any)[tableName].findUnique({
        where: { id: databaseId }
      });
      
      console.log(`📊 数据库查询结果: ${data ? '找到数据' : '未找到数据'}`);
      return data;
    } catch (error) {
      console.error(`❌ 数据库查询失败 (${tableName}):`, error);
      throw error;
    }
  }

  /**
   * 生成传统页面文件（保持原有逻辑）
   */
  private async generateTraditionalPage(
    data: any, 
    activityType: keyof typeof ACTIVITY_CONFIGS,
    options: { forceOverwrite?: boolean; uploadedImages?: string[] } = {}
  ) {
    const config = ACTIVITY_CONFIGS[activityType];
    
    // 确定路径
    const regionPath = REGION_MAP[data.region] || 'tokyo';
    const activityTypePath = config.urlPath;
    
    // 生成活动详情路径
    const englishName = data.englishName || '';
    const sanitizedEnglishName = englishName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);
    
    const detailPageFolder = sanitizedEnglishName && sanitizedEnglishName.length >= 3 
      ? `${sanitizedEnglishName}-${data.id.slice(-8)}` 
      : `activity-${data.id.slice(-8)}`;
    
    const targetDir = path.join(process.cwd(), 'app', regionPath, activityTypePath, detailPageFolder);
    const filePath = path.join(targetDir, 'page.tsx');
    
    // 检查文件是否已存在
    if (!options.forceOverwrite) {
      try {
        await fs.access(filePath);
        throw new Error(`页面已存在: ${filePath}`);
      } catch (error) {
        // 文件不存在，可以继续
        if (!(error as Error).message?.includes('页面已存在')) {
          // 这是access的正常错误，文件不存在
        } else {
          throw error;
        }
      }
    }

    // 生成页面内容
    const pageContent = this.generatePageContent(data, activityType, options.uploadedImages);
    
    // 创建目录和文件
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(filePath, pageContent, 'utf-8');
    
    const url = `http://localhost:3000/${regionPath}/${activityTypePath}/${detailPageFolder}`;
    
    console.log(`📄 传统页面生成成功: ${filePath}`);
    
    return {
      filePath: filePath.replace(process.cwd(), ''),
      url,
      directory: targetDir
    };
  }

  /**
   * 生成静态数据文件
   */
  private async generateStaticDataFiles(data: any, activityType: keyof typeof ACTIVITY_CONFIGS) {
    const results = {
      activityJsonPath: '',
      regionJsonPath: '',
      generated: [] as string[]
    };

    // 1. 生成单个活动JSON文件
    const activityJsonPath = path.join(
      process.cwd(), 
      'data', 
      'activities', 
      `${data.id}.json`
    );
    
    // 清理数据（移除Prisma特有字段）
    const cleanData = {
      ...data,
      createdAt: data.createdAt?.toISOString(),
      updatedAt: data.updatedAt?.toISOString(),
      // 添加静态化元数据
      _staticMeta: {
        activityType,
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        source: 'database-export'
      }
    };

    await fs.mkdir(path.dirname(activityJsonPath), { recursive: true });
    await fs.writeFile(
      activityJsonPath, 
      JSON.stringify(cleanData, null, 2), 
      'utf-8'
    );
    
    results.activityJsonPath = activityJsonPath;
    (results.generated as string[]).push(`单个活动JSON: ${activityJsonPath.replace(process.cwd(), '')}`);
    
    // 2. 更新地区汇总JSON文件
    const regionJsonPath = path.join(
      process.cwd(),
      'data',
      'regions',
      REGION_MAP[data.region] || 'tokyo',
      `${activityType}.json`
    );
    
    await this.updateRegionSummaryFile(regionJsonPath, cleanData, activityType);
    results.regionJsonPath = regionJsonPath;
    (results.generated as string[]).push(`地区汇总JSON: ${regionJsonPath.replace(process.cwd(), '')}`);
    
    console.log(`📊 静态数据文件生成成功:`);
    results.generated.forEach(file => console.log(`   ✅ ${file}`));
    
    return results;
  }

  /**
   * 更新地区汇总文件
   */
  private async updateRegionSummaryFile(filePath: string, newActivity: any, activityType: string) {
    let regionData = {
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        region: REGION_MAP[newActivity.region] || 'tokyo',
        activityType: activityType,
        totalCount: 0,
        dataSource: "Jalan官方数据",
        generatedBy: "enhanced-activity-page-generator"
      },
      activities: [] as any[]
    };
    
    // 如果文件已存在，读取现有数据
    try {
      const existingContent = await fs.readFile(filePath, 'utf-8');
      regionData = JSON.parse(existingContent);
    } catch (error) {
      // 文件不存在，使用默认结构
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      console.log(`📁 创建新的地区汇总文件: ${filePath}`);
    }
    
    // 更新或添加活动数据
    const existingIndex = regionData.activities.findIndex(
      (activity: any) => activity.id === newActivity.id
    );
    
    if (existingIndex >= 0) {
      regionData.activities[existingIndex] = newActivity;
      console.log(`🔄 更新现有活动: ${newActivity.name}`);
    } else {
      regionData.activities.push(newActivity);
      console.log(`✨ 添加新活动: ${newActivity.name}`);
    }
    
    // 更新元数据
    regionData.metadata.lastUpdated = new Date().toISOString();
    regionData.metadata.totalCount = regionData.activities.length;
    
    // 保存文件
    await fs.writeFile(filePath, JSON.stringify(regionData, null, 2), 'utf-8');
  }

  /**
   * 生成页面内容（保持原有逻辑）
   */
  private generatePageContent(data: any, activityType: keyof typeof ACTIVITY_CONFIGS, uploadedImages: string[] = []) {
    const config = ACTIVITY_CONFIGS[activityType];
    
    // 转换数据为模板期望的格式
    const transformedData = this.transformDataForTemplate(data, activityType, uploadedImages);
    
    return `import React from 'react';
import ${config.template} from '../../../../src/components/${config.template}';

/**
 * ${config.name}详情页面
 * 数据库ID: ${data.id}
 * 生成时间: ${new Date().toLocaleString()}
 * 模板: ${config.template}
 * 
 * 🚀 静态化准备: JSON数据文件已同步生成
 * - 单个活动: data/activities/${data.id}.json
 * - 地区汇总: data/regions/${REGION_MAP[data.region] || 'tokyo'}/${activityType}.json
 * 
 * 十项核心数据:
 * 1. 名称: ${data.name || '未设置'}
 * 2. 所在地: ${data.address || '未设置'}
 * 3. 开催期间: ${data.datetime || '未设置'}
 * 4. 开催场所: ${data.venue || '未设置'}
 * 5. 交通方式: ${data.access || '未设置'}
 * 6. 主办方: ${data.organizer || '未设置'}
 * 7. 料金: ${data.price || '未设置'}
 * 8. 联系方式: ${data.contact || '未设置'}
 * 9. 官方网站: ${data.website || '未设置'}
 * 10. 谷歌地图: ${data.googleMap || '未设置'}
 */

const ${config.name.replace(/[^a-zA-Z0-9]/g, '')}DetailPage = () => {
  // 转换后的活动数据
  const activityData = ${JSON.stringify(transformedData, null, 2)
    .replace(/"type": "image"/g, 'type: "image" as const')
    .replace(/"type": "video"/g, 'type: "video" as const')
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"createdAt": "([^"]*)"/, 'createdAt: new Date("$1")')
    .replace(/"updatedAt": "([^"]*)"/, 'updatedAt: new Date("$1")')}

  return (
    <${config.template} 
      activity={activityData}
      showBackButton={true}
      enableSharing={true}
    />
  );
};

export default ${config.name.replace(/[^a-zA-Z0-9]/g, '')}DetailPage;`;
  }

  /**
   * 转换数据为模板期望的格式
   */
  private transformDataForTemplate(data: any, activityType: string, uploadedImages: string[] = []) {
    // 基础数据转换
    const transformed = {
      id: data.id,
      name: data.name,
      address: data.address,
      datetime: data.datetime,
      venue: data.venue,
      access: data.access,
      organizer: data.organizer,
      price: data.price,
      contact: data.contact,
      website: data.website,
      googleMap: data.googleMap,
      description: data.description || '',
      region: data.region,
      detailLink: data.detailLink,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      
      // 媒体文件处理
      media: uploadedImages.map((imageUrl, index) => ({
        id: `media-${index + 1}`,
        type: "image" as const,
        url: imageUrl,
        alt: `${data.name} - 图片 ${index + 1}`,
        description: data.description || `${data.name}的相关图片`
      }))
    };

    return transformed;
  }

  /**
   * 批量为现有页面生成JSON文件
   */
  async generateJsonForExistingPages() {
    console.log('🔄 开始为现有页面生成JSON文件...');
    
    const activityTypes = Object.keys(ACTIVITY_CONFIGS) as (keyof typeof ACTIVITY_CONFIGS)[];
    let totalGenerated = 0;
    
    for (const activityType of activityTypes) {
      const config = ACTIVITY_CONFIGS[activityType];
      
      try {
        // 获取该类型的所有活动
        const activities = await (prisma as any)[config.tableName].findMany();
        
        console.log(`📊 处理 ${config.name}: ${activities.length} 个活动`);
        
        for (const activity of activities) {
          try {
            await this.generateStaticDataFiles(activity, activityType);
            totalGenerated++;
          } catch (error) {
            console.error(`❌ 生成JSON失败 (${activity.id}):`, error);
          }
        }
        
      } catch (error) {
        console.error(`❌ 查询${config.name}数据失败:`, error);
      }
    }
    
    console.log(`🎉 批量JSON生成完成！总计: ${totalGenerated} 个文件`);
    return totalGenerated;
  }
}

// 导出主类
export default EnhancedActivityPageGenerator;

// 便捷函数导出
export async function generateEnhancedPage(
  databaseId: string,
  activityType: keyof typeof ACTIVITY_CONFIGS,
  options?: { forceOverwrite?: boolean; uploadedImages?: string[] }
) {
  const generator = new EnhancedActivityPageGenerator();
  return await generator.generatePage(databaseId, activityType, options);
}

export async function generateJsonForAllExistingPages() {
  const generator = new EnhancedActivityPageGenerator();
  return await generator.generateJsonForExistingPages();
} 