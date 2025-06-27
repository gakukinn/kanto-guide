const { PrismaClient } = require('./src/generated/prisma');
const { parse } = require('node-html-parser');
const { chromium } = require('playwright');

const prisma = new PrismaClient();

// 🎯 统一数据结构定义
class ActivityDataStructure {
  constructor() {
    this.requiredFields = [
      'name',         // 活动名称
      'address',      // 完整地址  
      'datetime',     // 日期时间
      'venue',        // 场地名称
      'access',       // 交通方式
      'organizer',    // 主办方
      'price',        // 费用信息
      'contact',      // 联系方式
      'website',      // 官网链接
      'googleMap'     // 地图坐标
    ];
  }

  // 创建标准活动对象
  createStandardActivity(rawData, region, category) {
    return {
      name: this.validateName(rawData.name),
      address: this.validateAddress(rawData.address, region),
      datetime: this.validateDateTime(rawData.datetime),
      venue: this.validateVenue(rawData.venue),
      access: this.validateAccess(rawData.access),
      organizer: this.validateOrganizer(rawData.organizer),
      price: this.validatePrice(rawData.price),
      contact: this.validateContact(rawData.contact),
      website: this.validateWebsite(rawData.website),
      googleMap: this.validateGoogleMap(rawData.googleMap, region),
      category: category,
      regionId: region.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // 🔍 数据验证方法
  validateName(name) {
    if (!name || name.trim().length === 0) {
      throw new Error('活动名称不能为空');
    }
    return name.trim();
  }

  validateAddress(address, region) {
    if (!address || address.trim().length === 0) {
      throw new Error('活动地址不能为空');
    }
    
    // 确保地址包含地区信息
    const cleanAddress = address.trim();
    if (!cleanAddress.includes(region.nameJp)) {
      return `${region.nameJp}${cleanAddress}`;
    }
    return cleanAddress;
  }

  validateDateTime(datetime) {
    if (!datetime || datetime.trim().length === 0) {
      throw new Error('活动时间不能为空');
    }
    return datetime.trim();
  }

  validateVenue(venue) {
    return venue ? venue.trim() : '';
  }

  validateAccess(access) {
    return access ? access.trim() : '';
  }

  validateOrganizer(organizer) {
    return organizer ? organizer.trim() : '';
  }

  validatePrice(price) {
    return price ? price.trim() : '未明确';
  }

  validateContact(contact) {
    return contact ? contact.trim() : '';
  }

  validateWebsite(website) {
    if (website && !website.startsWith('http')) {
      return `https://${website}`;
    }
    return website || '';
  }

  validateGoogleMap(googleMap, region) {
    if (!googleMap) return '';
    
    // 验证坐标是否在地区范围内
    if (region.coordinateRange) {
      const coords = this.extractCoordinates(googleMap);
      if (coords && !this.isWithinRegion(coords, region.coordinateRange)) {
        console.warn(`警告：坐标 ${coords.lat}, ${coords.lng} 可能不在 ${region.nameJp} 范围内`);
      }
    }
    return googleMap;
  }

  extractCoordinates(googleMapUrl) {
    const match = googleMapUrl.match(/ll=([0-9.-]+),([0-9.-]+)/);
    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }
    return null;
  }

  isWithinRegion(coords, range) {
    return coords.lat >= range.south && 
           coords.lat <= range.north && 
           coords.lng >= range.west && 
           coords.lng <= range.east;
  }

  // 数据完整性检查
  validateCompleteness(activityData) {
    const missingFields = [];
    
    this.requiredFields.forEach(field => {
      if (!activityData[field] || activityData[field].toString().trim().length === 0) {
        missingFields.push(field);
      }
    });

    const completeness = ((this.requiredFields.length - missingFields.length) / this.requiredFields.length) * 100;
    
    return {
      isComplete: missingFields.length === 0,
      completeness: Math.round(completeness),
      missingFields: missingFields,
      status: completeness >= 90 ? '优秀' : completeness >= 70 ? '良好' : '需改进'
    };
  }
}

// 🌍 地区配置管理器
class RegionConfigManager {
  constructor() {
    this.regions = {
      tokyo: {
        name: '東京都',
        nameEn: 'Tokyo',
        jalanCode: '130000',
        baseUrl: 'https://www.jalan.net/event/130000/',
        coordinateRange: {
          north: 35.9,
          south: 35.5,
          east: 139.9,
          west: 139.3
        },
        categories: ['文化', '祭典', '花火', '赏花', '灯光'],
        specialSelectors: {
          // 东京特殊的HTML结构选择器
          activityList: '.event-list .event-item',
          detailPage: '.event-detail-content'
        }
      },
      osaka: {
        name: '大阪府', 
        nameEn: 'Osaka',
        jalanCode: '270000',
        baseUrl: 'https://www.jalan.net/event/270000/',
        coordinateRange: {
          north: 34.8,
          south: 34.3,
          east: 135.8,
          west: 135.1
        },
        categories: ['文化', '祭典', '花火', '赏花', '灯光'],
        specialSelectors: {
          activityList: '.event-list .event-item',
          detailPage: '.event-detail-content'
        }
      },
      kyoto: {
        name: '京都府',
        nameEn: 'Kyoto', 
        jalanCode: '260000',
        baseUrl: 'https://www.jalan.net/event/260000/',
        coordinateRange: {
          north: 35.8,
          south: 34.7,
          east: 136.1,
          west: 135.0
        },
        categories: ['文化', '祭典', '花火', '赏花', '灯光'],
        specialSelectors: {
          activityList: '.event-list .event-item',
          detailPage: '.event-detail-content'
        }
      }
    };
  }

  getRegion(regionCode) {
    return this.regions[regionCode];
  }

  getAllRegions() {
    return Object.keys(this.regions);
  }

  addRegion(code, config) {
    this.regions[code] = config;
  }
}

// 🔧 活动分类器
class ActivityClassifier {
  constructor() {
    this.classificationRules = {
      culture: {
        keywords: ['文化', 'カルチャー', 'アート', '美術', '展示', '博物館', '文化財', 'ワンダーフェスティバル', '陸上', 'スポーツ', '競技', 'コンサート', '音楽'],
        priority: 3
      },
      matsuri: {
        keywords: ['祭り', 'まつり', 'フェスティバル', '神社', '例大祭', '盆踊り', '夏祭り', 'こいち祭', '神社', '寺院'],
        priority: 2
      },
      hanabi: {
        keywords: ['花火', 'hanabi', 'fireworks', '納涼花火', '花火大会'],
        priority: 1  // 最高优先级
      },
      sakura: {
        keywords: ['桜', 'さくら', '花見', '桜祭り', '春祭り'],
        priority: 2
      },
      illumination: {
        keywords: ['イルミネーション', 'ライトアップ', '灯り', '電飾', 'クリスマス'],
        priority: 3
      }
    };
  }

  classifyActivity(name, description = '') {
    const content = (name + ' ' + (description || '')).toLowerCase();
    let bestMatch = { category: 'culture', priority: 999 };

    Object.entries(this.classificationRules).forEach(([category, rules]) => {
      const matchCount = rules.keywords.filter(keyword => 
        content.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > 0 && rules.priority < bestMatch.priority) {
        bestMatch = { category, priority: rules.priority, matchCount };
      }
    });

    return bestMatch.category;
  }

  getTableName(category) {
    const tableMapping = {
      culture: 'cultureEvent',
      matsuri: 'matsuriEvent', 
      hanabi: 'hanabiEvent',
      sakura: 'sakuraEvent',
      illumination: 'illuminationEvent'
    };
    return tableMapping[category] || 'cultureEvent';
  }
}

// 📊 数据质量报告器
class DataQualityReporter {
  constructor() {
    this.dataStructure = new ActivityDataStructure();
  }

  async generateRegionReport(regionId) {
    const report = {
      regionId,
      timestamp: new Date(),
      tables: {}
    };

    // 检查各个活动表的数据质量
    const tableNames = ['cultureEvent', 'matsuriEvent', 'hanabiEvent'];
    
    for (const tableName of tableNames) {
      const activities = await prisma[tableName].findMany({
        where: { regionId }
      });

      const tableReport = {
        totalCount: activities.length,
        completeActivities: 0,
        incompleteActivities: 0,
        averageCompleteness: 0,
        qualityBreakdown: { excellent: 0, good: 0, needsImprovement: 0 }
      };

      let totalCompleteness = 0;

      activities.forEach(activity => {
        const validation = this.dataStructure.validateCompleteness(activity);
        totalCompleteness += validation.completeness;

        if (validation.isComplete) {
          tableReport.completeActivities++;
        } else {
          tableReport.incompleteActivities++;
        }

        if (validation.completeness >= 90) {
          tableReport.qualityBreakdown.excellent++;
        } else if (validation.completeness >= 70) {
          tableReport.qualityBreakdown.good++;
        } else {
          tableReport.qualityBreakdown.needsImprovement++;
        }
      });

      tableReport.averageCompleteness = activities.length > 0 ? 
        Math.round(totalCompleteness / activities.length) : 0;

      report.tables[tableName] = tableReport;
    }

    return report;
  }

  printReport(report) {
    console.log(`\n📊 地区数据质量报告 - 时间: ${report.timestamp.toLocaleString()}`);
    console.log(`地区ID: ${report.regionId}\n`);

    Object.entries(report.tables).forEach(([tableName, data]) => {
      const chineseName = {
        cultureEvent: '文化活动',
        matsuriEvent: '祭典活动', 
        hanabiEvent: '花火活动'
      }[tableName];

      console.log(`📋 ${chineseName}:`);
      console.log(`   总数量: ${data.totalCount}`);
      console.log(`   完整活动: ${data.completeActivities}`);
      console.log(`   不完整活动: ${data.incompleteActivities}`);
      console.log(`   平均完整度: ${data.averageCompleteness}%`);
      console.log(`   质量分布: 优秀${data.qualityBreakdown.excellent} | 良好${data.qualityBreakdown.good} | 需改进${data.qualityBreakdown.needsImprovement}\n`);
    });
  }
}

// 🚀 统一爬虫引擎
class UnifiedActivityScraper {
  constructor() {
    this.dataStructure = new ActivityDataStructure();
    this.regionManager = new RegionConfigManager();
    this.classifier = new ActivityClassifier();
    this.reporter = new DataQualityReporter();
  }

  async scrapeRegion(regionCode) {
    console.log(`🚀 开始爬取地区: ${regionCode}`);
    
    const regionConfig = this.regionManager.getRegion(regionCode);
    if (!regionConfig) {
      throw new Error(`地区配置不存在: ${regionCode}`);
    }

    // 获取数据库中的地区信息
    const region = await prisma.region.findFirst({
      where: { nameJp: regionConfig.name }
    });

    if (!region) {
      throw new Error(`数据库中找不到地区: ${regionConfig.name}`);
    }

    console.log(`📍 地区信息: ${region.nameJp} (ID: ${region.id})`);

    // 这里插入实际的爬取逻辑
    // 使用 regionConfig 中的配置参数
    console.log(`🌐 目标URL: ${regionConfig.baseUrl}`);
    console.log(`📊 预期活动类型: ${regionConfig.categories.join(', ')}`);
    
    return region;
  }

  async validateAndSaveActivity(activityData, region, category) {
    try {
      // 使用统一数据结构验证和标准化数据
      const standardActivity = this.dataStructure.createStandardActivity(
        activityData, 
        region, 
        category
      );

      // 检查数据完整性
      const validation = this.dataStructure.validateCompleteness(standardActivity);
      console.log(`📋 数据完整度: ${validation.completeness}% (${validation.status})`);

      if (validation.missingFields.length > 0) {
        console.log(`⚠️ 缺失字段: ${validation.missingFields.join(', ')}`);
      }

      // 保存到对应的表
      const tableName = this.classifier.getTableName(category);
      
      // 检查是否已存在
      const existingActivity = await prisma[tableName].findFirst({
        where: { 
          name: standardActivity.name,
          regionId: region.id
        }
      });

      if (existingActivity) {
        console.log(`🔄 更新已存在活动: ${standardActivity.name}`);
        await prisma[tableName].update({
          where: { id: existingActivity.id },
          data: standardActivity
        });
        return { action: 'updated', activity: standardActivity };
      } else {
        console.log(`➕ 新增活动: ${standardActivity.name}`);
        await prisma[tableName].create({
          data: standardActivity
        });
        return { action: 'created', activity: standardActivity };
      }

    } catch (error) {
      console.error(`❌ 活动数据验证失败:`, error.message);
      return { action: 'failed', error: error.message };
    }
  }

  async generateRegionReport(regionCode) {
    const regionConfig = this.regionManager.getRegion(regionCode);
    const region = await prisma.region.findFirst({
      where: { nameJp: regionConfig.name }
    });

    if (region) {
      const report = await this.reporter.generateRegionReport(region.id);
      this.reporter.printReport(report);
      return report;
    }
  }
}

// 🧪 测试和演示功能
async function demonstrateUnifiedSystem() {
  console.log('🎯 统一活动数据系统演示\n');

  const scraper = new UnifiedActivityScraper();
  
  // 演示数据结构验证
  const testActivity = {
    name: '大阪城桜祭り2025',
    address: '大阪市中央区大阪城1-1',
    datetime: '2025年4月1日～15日',
    venue: '大阪城公園',
    access: 'JR環状線「大阪城公園駅」徒歩5分',
    organizer: '大阪市',
    price: '無料',
    contact: '06-1234-5678',
    website: 'https://osakacastle-sakura.jp',
    googleMap: 'https://maps.google.com/maps?ll=34.6873,135.5262&z=15'
  };

  const regionConfig = scraper.regionManager.getRegion('osaka');
  console.log('📍 地区配置:', regionConfig.name);

  const dataStructure = new ActivityDataStructure();
  
  try {
    console.log('\n🔍 数据验证测试:');
    const mockRegion = { 
      id: 'test-region', 
      nameJp: '大阪府',
      coordinateRange: regionConfig.coordinateRange 
    };
    
    const standardActivity = dataStructure.createStandardActivity(
      testActivity, 
      mockRegion, 
      'sakura'
    );
    
    const validation = dataStructure.validateCompleteness(standardActivity);
    console.log(`✅ 验证结果: ${validation.completeness}% 完整 (${validation.status})`);
    
    if (validation.missingFields.length > 0) {
      console.log(`⚠️ 缺失字段: ${validation.missingFields.join(', ')}`);
    } else {
      console.log('🎉 所有必填字段都已完整！');
    }

  } catch (error) {
    console.error('❌ 验证失败:', error.message);
  }

  console.log('\n📋 支持的地区列表:');
  scraper.regionManager.getAllRegions().forEach(code => {
    const config = scraper.regionManager.getRegion(code);
    console.log(`   ${code}: ${config.name} (${config.nameEn})`);
  });

  await prisma.$disconnect();
}

// 导出核心类和功能
module.exports = {
  UnifiedActivityScraper,
  ActivityDataStructure,
  RegionConfigManager,
  ActivityClassifier,
  DataQualityReporter,
  demonstrateUnifiedSystem
};

// 如果直接运行此文件，执行演示
if (require.main === module) {
  demonstrateUnifiedSystem().catch(console.error);
}