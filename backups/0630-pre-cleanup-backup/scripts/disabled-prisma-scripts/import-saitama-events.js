#!/usr/bin/env node

/**
 * 埼玉县活动信息数据库录入脚本
 * 将爬取的前10个活动信息录入到Prisma数据库的对应表中
 */

const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// 爬取的活动数据文件路径
const DATA_FILE = path.join(__dirname, '..', 'saitama_events_accurate_ten_fields.json');

/**
 * 数据库字段映射
 * 将爬取的字段映射到数据库字段
 */
function mapToDbFields(eventData) {
  return {
    name: eventData.名称 || '',
    address: eventData.所在地 || '埼玉県',
    datetime: eventData.開催期間 || '',
    venue: eventData.開催場所 || '',
    access: eventData.交通アクセス || '',
    organizer: eventData.主催 || '',
    price: eventData.料金 || '',
    contact: eventData.問合せ先 || '',
    website: eventData.ホームページ || '',
    googleMap: eventData.谷歌网站 || '',
    region: '埼玉県',
    verified: true  // 标记为已验证的数据
  };
}

/**
 * 判断活动类型
 * 根据活动名称判断应该录入到哪个表
 */
function determineEventType(eventName) {
  if (eventName.includes('花火')) {
    return 'hanabi';
  } else if (eventName.includes('祭') || eventName.includes('祭典') || eventName.includes('祭典')) {
    return 'matsuri';
  } else if (eventName.includes('フェスタ') || eventName.includes('デザイン') || eventName.includes('文化') || eventName.includes('アート')) {
    return 'culture';
  } else {
    // 其他活动默认归类为文化活动
    return 'culture';
  }
}

/**
 * 获取或创建埼玉地区记录
 */
async function getSaitamaRegion() {
  try {
    // 先尝试查找现有的埼玉地区记录
    let saitamaRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'saitama' },
          { nameCn: '埼玉' },
          { nameJp: '埼玉県' }
        ]
      }
    });

    // 如果不存在，创建一个
    if (!saitamaRegion) {
      console.log('📍 创建埼玉地区记录...');
      saitamaRegion = await prisma.region.create({
        data: {
          code: 'saitama',
          nameCn: '埼玉',
          nameJp: '埼玉県'
        }
      });
      console.log('✅ 埼玉地区记录创建成功');
    } else {
      console.log('✅ 找到现有埼玉地区记录');
    }

    return saitamaRegion;
  } catch (error) {
    console.error('❌ 获取埼玉地区记录失败:', error);
    throw error;
  }
}

/**
 * 录入单个活动到对应的表
 */
async function insertEvent(eventData, eventType, regionId) {
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
          console.log(`⚠️  花火活动已存在: ${dbData.name}`);
          return existingHanabi;
        }
        
        result = await prisma.hanabiEvent.create({
          data: dbData
        });
        console.log(`✅ 花火活动录入成功: ${dbData.name}`);
        break;

      case 'matsuri':
        // 检查是否已存在相同名称的祭典活动
        const existingMatsuri = await prisma.matsuriEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingMatsuri) {
          console.log(`⚠️  祭典活动已存在: ${dbData.name}`);
          return existingMatsuri;
        }
        
        result = await prisma.matsuriEvent.create({
          data: dbData
        });
        console.log(`✅ 祭典活动录入成功: ${dbData.name}`);
        break;

      case 'culture':
        // 检查是否已存在相同名称的文化活动
        const existingCulture = await prisma.cultureEvent.findFirst({
          where: { name: dbData.name }
        });
        
        if (existingCulture) {
          console.log(`⚠️  文化活动已存在: ${dbData.name}`);
          return existingCulture;
        }
        
        result = await prisma.cultureEvent.create({
          data: dbData
        });
        console.log(`✅ 文化活动录入成功: ${dbData.name}`);
        break;

      default:
        throw new Error(`未知的活动类型: ${eventType}`);
    }

    return result;
  } catch (error) {
    console.error(`❌ 录入活动失败 (${eventData.名称}):`, error);
    throw error;
  }
}

/**
 * 主要录入函数
 */
async function importSaitamaEvents() {
  console.log('🚀 开始录入埼玉县活动信息到数据库...\n');

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

    // 2. 获取或创建埼玉地区记录
    const saitamaRegion = await getSaitamaRegion();
    console.log(`📍 埼玉地区ID: ${saitamaRegion.id}\n`);

    // 3. 录入统计
    const stats = {
      hanabi: 0,
      matsuri: 0,
      culture: 0,
      total: 0,
      skipped: 0
    };

    // 4. 逐个录入活动
    for (let i = 0; i < eventsData.events.length; i++) {
      const eventData = eventsData.events[i];
      const eventType = determineEventType(eventData.名称);
      
      console.log(`📝 处理第 ${i + 1}/${eventsData.events.length} 个活动:`);
      console.log(`   名称: ${eventData.名称}`);
      console.log(`   类型: ${eventType}`);
      
      try {
        const result = await insertEvent(eventData, eventType, saitamaRegion.id);
        
        if (result) {
          stats[eventType]++;
          stats.total++;
        } else {
          stats.skipped++;
        }
      } catch (error) {
        console.error(`   ❌ 录入失败: ${error.message}`);
        stats.skipped++;
      }
      
      console.log(''); // 空行分隔
    }

    // 5. 打印录入统计
    console.log('🎉 录入完成！统计信息:');
    console.log('=' * 50);
    console.log(`📊 总活动数: ${eventsData.events.length}`);
    console.log(`✅ 成功录入: ${stats.total}`);
    console.log(`   - 花火活动: ${stats.hanabi}`);
    console.log(`   - 祭典活动: ${stats.matsuri}`);
    console.log(`   - 文化活动: ${stats.culture}`);
    console.log(`⚠️  跳过重复: ${stats.skipped}`);
    console.log('=' * 50);

    // 6. 验证录入结果
    const hanabiCount = await prisma.hanabiEvent.count({
      where: { regionId: saitamaRegion.id }
    });
    const matsuriCount = await prisma.matsuriEvent.count({
      where: { regionId: saitamaRegion.id }
    });
    const cultureCount = await prisma.cultureEvent.count({
      where: { regionId: saitamaRegion.id }
    });

    console.log('\n📈 数据库中埼玉地区活动总数:');
    console.log(`   - 花火活动: ${hanabiCount}`);
    console.log(`   - 祭典活动: ${matsuriCount}`);
    console.log(`   - 文化活动: ${cultureCount}`);
    console.log(`   - 总计: ${hanabiCount + matsuriCount + cultureCount}`);

  } catch (error) {
    console.error('❌ 录入过程发生错误:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 运行脚本
if (require.main === module) {
  importSaitamaEvents()
    .then(() => {
      console.log('\n✅ 脚本执行完成！');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ 脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { importSaitamaEvents }; 