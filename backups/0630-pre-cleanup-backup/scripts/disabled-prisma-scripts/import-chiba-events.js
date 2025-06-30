#!/usr/bin/env node

/**
 * 千叶县活动信息数据库录入脚本
 * 将爬取的前10个活动信息录入到Prisma数据库的对应表中
 * 按照用户指定分类：祭典，赏花，花火，狩枫，灯光
 */

const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// 爬取的活动数据文件路径
const DATA_FILE = path.join(__dirname, '..', 'chiba_events_accurate_ten_fields.json');

/**
 * 数据库字段映射
 * 将爬取的字段映射到数据库字段
 */
function mapToDbFields(eventData) {
  return {
    name: eventData.名称 || '',
    address: eventData.所在地 || '千葉県',
    datetime: eventData.開催期間 || '',
    venue: eventData.開催場所 || '',
    access: eventData.交通アクセス || '',
    organizer: eventData.主催 || '',
    price: eventData.料金 || '',
    contact: eventData.問合せ先 || '',
    website: eventData.ホームページ || '',
    googleMap: eventData.谷歌网站 || '',
    region: '千葉県',
    verified: true  // 标记为已验证的数据
  };
}

/**
 * 判断活动类型 - 按照用户指定的分类
 * 祭典，赏花，花火，狩枫，灯光
 */
function determineEventType(eventName) {
  // 花火活动（花火大会）
  if (eventName.includes('花火')) {
    return 'hanabi';
  }
  // 祭典活动（各种祭典、祭典）
  else if (eventName.includes('祭') || eventName.includes('祭典') || eventName.includes('パレード')) {
    return 'matsuri';
  }
  // 赏花活动（花、桜、あやめ等）
  else if (eventName.includes('花') || eventName.includes('桜') || eventName.includes('あやめ') || 
           eventName.includes('梅') || eventName.includes('紫陽花') || eventName.includes('菊')) {
    return 'hanami';
  }
  // 狩枫活动（紅葉、もみじ等）
  else if (eventName.includes('紅葉') || eventName.includes('もみじ') || eventName.includes('紅葉狩り')) {
    return 'momiji';
  }
  // 灯光活动（イルミネーション、ライトアップ等）
  else if (eventName.includes('イルミネーション') || eventName.includes('ライトアップ') || 
           eventName.includes('灯り') || eventName.includes('ランタン')) {
    return 'illumination';
  }
  // 默认归类为文化活动
  else {
    return 'culture';
  }
}

/**
 * 获取或创建千叶地区记录
 */
async function getChibaRegion() {
  try {
    // 先尝试查找现有的千叶地区记录
    let chibaRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'chiba' },
          { nameCn: '千叶' },
          { nameJp: '千葉県' }
        ]
      }
    });

    // 如果不存在，创建一个
    if (!chibaRegion) {
      console.log('📍 创建千叶地区记录...');
      chibaRegion = await prisma.region.create({
        data: {
          code: 'chiba',
          nameCn: '千叶',
          nameJp: '千葉県'
        }
      });
      console.log('✅ 千叶地区记录创建成功');
    } else {
      console.log('✅ 找到现有千叶地区记录');
    }

    return chibaRegion;
  } catch (error) {
    console.error('❌ 获取千叶地区记录失败:', error);
    throw error;
  }
}

/**
 * 录入或更新单个活动到对应的表
 * 重复名称则更新，保留一份数据
 */
async function upsertEvent(eventData, eventType, regionId) {
  const dbData = mapToDbFields(eventData);
  dbData.regionId = regionId;

  try {
    let result;
    
    switch (eventType) {
      case 'hanabi':
        // 检查是否已存在相同名称的花火活动
        const existingHanabi = await prisma.hanabiEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingHanabi) {
          console.log(`🔄 更新花火活动: ${dbData.name}`);
          result = await prisma.hanabiEvent.update({
            where: { id: existingHanabi.id },
            data: dbData
          });
          console.log(`✅ 花火活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.hanabiEvent.create({
            data: dbData
          });
          console.log(`✅ 花火活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      case 'matsuri':
        // 检查是否已存在相同名称的祭典活动
        const existingMatsuri = await prisma.matsuriEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingMatsuri) {
          console.log(`🔄 更新祭典活动: ${dbData.name}`);
          result = await prisma.matsuriEvent.update({
            where: { id: existingMatsuri.id },
            data: dbData
          });
          console.log(`✅ 祭典活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.matsuriEvent.create({
            data: dbData
          });
          console.log(`✅ 祭典活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      case 'hanami':
        // 检查是否已存在相同名称的赏花活动
        const existingHanami = await prisma.hanamiEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingHanami) {
          console.log(`🔄 更新赏花活动: ${dbData.name}`);
          result = await prisma.hanamiEvent.update({
            where: { id: existingHanami.id },
            data: dbData
          });
          console.log(`✅ 赏花活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.hanamiEvent.create({
            data: dbData
          });
          console.log(`✅ 赏花活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      case 'momiji':
        // 检查是否已存在相同名称的狩枫活动
        const existingMomiji = await prisma.momijiEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingMomiji) {
          console.log(`🔄 更新狩枫活动: ${dbData.name}`);
          result = await prisma.momijiEvent.update({
            where: { id: existingMomiji.id },
            data: dbData
          });
          console.log(`✅ 狩枫活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.momijiEvent.create({
            data: dbData
          });
          console.log(`✅ 狩枫活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      case 'illumination':
        // 检查是否已存在相同名称的灯光活动
        const existingIllumination = await prisma.illuminationEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingIllumination) {
          console.log(`🔄 更新灯光活动: ${dbData.name}`);
          result = await prisma.illuminationEvent.update({
            where: { id: existingIllumination.id },
            data: dbData
          });
          console.log(`✅ 灯光活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.illuminationEvent.create({
            data: dbData
          });
          console.log(`✅ 灯光活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      case 'culture':
        // 检查是否已存在相同名称的文化活动
        const existingCulture = await prisma.cultureEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingCulture) {
          console.log(`🔄 更新文化活动: ${dbData.name}`);
          result = await prisma.cultureEvent.update({
            where: { id: existingCulture.id },
            data: dbData
          });
          console.log(`✅ 文化活动更新成功: ${dbData.name}`);
          return { action: 'updated', result };
        } else {
          result = await prisma.cultureEvent.create({
            data: dbData
          });
          console.log(`✅ 文化活动录入成功: ${dbData.name}`);
          return { action: 'created', result };
        }

      default:
        throw new Error(`未知的活动类型: ${eventType}`);
    }
  } catch (error) {
    console.error(`❌ 操作活动失败 (${eventData.名称}):`, error);
    throw error;
  }
}

/**
 * 主要录入函数
 */
async function importChibaEvents() {
  console.log('🚀 开始录入千叶县活动信息到数据库...\n');

  try {
    // 1. 读取爬取的数据文件
    if (!fs.existsSync(DATA_FILE)) {
      throw new Error(`数据文件不存在: ${DATA_FILE}`);
    }

    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const eventsData = JSON.parse(rawData);

    if (!eventsData.events || !Array.isArray(eventsData.events)) {
      throw new Error('数据文件格式错误：缺少events数组');
    }

    console.log(`📄 读取到 ${eventsData.events.length} 个活动信息`);

    // 2. 获取或创建千叶地区记录
    const chibaRegion = await getChibaRegion();
    console.log(`📍 千叶地区ID: ${chibaRegion.id}\n`);

    // 3. 录入统计
    const stats = {
      hanabi: { created: 0, updated: 0 },
      matsuri: { created: 0, updated: 0 },
      hanami: { created: 0, updated: 0 },
      momiji: { created: 0, updated: 0 },
      illumination: { created: 0, updated: 0 },
      culture: { created: 0, updated: 0 },
      total_created: 0,
      total_updated: 0,
      failed: 0
    };

    // 4. 逐个录入活动
    for (let i = 0; i < eventsData.events.length; i++) {
      const eventData = eventsData.events[i];
      const eventType = determineEventType(eventData.名称);
      
      console.log(`📝 处理第 ${i + 1}/${eventsData.events.length} 个活动:`);
      console.log(`   名称: ${eventData.名称}`);
      console.log(`   分类: ${eventType}`);
      
      try {
        const operationResult = await upsertEvent(eventData, eventType, chibaRegion.id);
        
        if (operationResult.action === 'created') {
          stats[eventType].created++;
          stats.total_created++;
        } else if (operationResult.action === 'updated') {
          stats[eventType].updated++;
          stats.total_updated++;
        }
      } catch (error) {
        console.error(`   ❌ 操作失败: ${error.message}`);
        stats.failed++;
      }
      
      console.log(''); // 空行分隔
    }

    // 5. 打印录入统计
    console.log('🎉 操作完成！统计信息:');
    console.log('=' * 80);
    console.log(`📊 总活动数: ${eventsData.events.length}`);
    console.log(`✅ 新增录入: ${stats.total_created}`);
    console.log(`🔄 更新记录: ${stats.total_updated}`);
    console.log(`❌ 操作失败: ${stats.failed}`);
    console.log('\n分类详情:');
    
    const categories = [
      { key: 'hanabi', name: '花火活动' },
      { key: 'matsuri', name: '祭典活动' },
      { key: 'hanami', name: '赏花活动' },
      { key: 'momiji', name: '狩枫活动' },
      { key: 'illumination', name: '灯光活动' },
      { key: 'culture', name: '文化活动' }
    ];
    
    categories.forEach(category => {
      if (stats[category.key].created > 0 || stats[category.key].updated > 0) {
        console.log(`   - ${category.name}: 新增 ${stats[category.key].created}, 更新 ${stats[category.key].updated}`);
      }
    });
    console.log('=' * 80);

    // 6. 验证录入结果
    const finalCounts = {};
    for (const category of categories) {
      try {
        let count = 0;
        switch (category.key) {
          case 'hanabi':
            count = await prisma.hanabiEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
          case 'matsuri':
            count = await prisma.matsuriEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
          case 'hanami':
            count = await prisma.hanamiEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
          case 'momiji':
            count = await prisma.momijiEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
          case 'illumination':
            count = await prisma.illuminationEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
          case 'culture':
            count = await prisma.cultureEvent.count({
              where: { regionId: chibaRegion.id }
            });
            break;
        }
        finalCounts[category.key] = count;
      } catch (error) {
        console.warn(`⚠️  无法统计 ${category.name}: ${error.message}`);
        finalCounts[category.key] = 0;
      }
    }

    console.log('\n📈 数据库中千叶地区活动总数:');
    categories.forEach(category => {
      console.log(`   - ${category.name}: ${finalCounts[category.key]} 个`);
    });
    
    const totalFinal = Object.values(finalCounts).reduce((sum, count) => sum + count, 0);
    console.log(`   - 总计: ${totalFinal} 个`);

  } catch (error) {
    console.error('❌ 录入过程发生错误:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 运行脚本
if (require.main === module) {
  importChibaEvents()
    .then(() => {
      console.log('\n✅ 脚本执行完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { importChibaEvents }; 