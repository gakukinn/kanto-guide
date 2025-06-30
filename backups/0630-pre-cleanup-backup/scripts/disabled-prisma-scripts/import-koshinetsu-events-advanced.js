#!/usr/bin/env node

/**
 * 导入甲信越地区（山梨県）活动信息到Prisma数据库
 * 使用高级Google Maps坐标提取技术获取的数据
 * 参考：0622-谷歌地图Playwright和Cheerio坐标提取技术指南
 */

const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');

const prisma = new PrismaClient();

// 清理地址信息
function cleanAddress(address) {
  if (!address) return '';
  
  const lines = address.split('\n');
  const mainLine = lines[0] || '';
  
  const match = mainLine.match(/〒\d{3}\s*-\s*\d{4}\s*(.+?)(?=\s*←|$)/);
  if (match) {
    return match[0].trim();
  }
  
  return mainLine.split('←')[0].trim();
}

// 清理时间信息
function cleanPeriod(period) {
  if (!period) return '';
  
  const cleaned = period.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();
  const dateMatch = cleaned.match(/\d{4}年\d{1,2}月\d{1,2}日[^\t\n]*/);
  return dateMatch ? dateMatch[0] : cleaned;
}

// 处理地图信息
function processMapInfo(eventData) {
  const mapInfo = {};
  
  if (eventData.coordinates) {
    // 有真实坐标的情况
    mapInfo.coordinates = eventData.coordinates;
    mapInfo.googleMap = eventData.google_map;
    mapInfo.embedUrl = eventData.embed_url;
    mapInfo.coordsSource = eventData.coords_source;
    mapInfo.extractionMethod = eventData.extraction_method;
    mapInfo.verified = true;
  } else if (eventData.google_map) {
    // 只有搜索链接的情况
    mapInfo.googleMap = eventData.google_map;
    mapInfo.coordsSource = eventData.coords_source || "地址搜索链接";
    mapInfo.verified = false;
  }
  
  return mapInfo;
}

// 根据地址判断正确的县名
function detectPrefecture(address, venue) {
  const fullText = `${address} ${venue}`.toLowerCase();
  
  if (fullText.includes('山梨')) {
    return '山梨県';
  } else if (fullText.includes('長野')) {
    return '長野県';
  } else if (fullText.includes('新潟')) {
    return '新潟県';
  }
  
  // 根据邮编判断
  const postalMatch = address.match(/〒(\d{3})/);
  if (postalMatch) {
    const postal = parseInt(postalMatch[1]);
    if (postal >= 400 && postal <= 409) {
      return '山梨県';
    } else if (postal >= 380 && postal <= 399) {
      return '長野県';
    } else if (postal >= 940 && postal <= 959) {
      return '新潟県';
    }
  }
  
  return '山梨県'; // 默认
}

async function importKoshinetsuEvents() {
  console.log('🚀 开始导入甲信越地区活动信息到数据库...');
  console.log('🗺️  包含高级Google Maps坐标信息');
  console.log('🔧 自动检测并修正地区信息\n');

  try {
    // 读取爬取的数据
    const jsonFiles = fs.readdirSync('.').filter(file => 
      file.startsWith('koshinetsu_events_advanced_') && file.endsWith('.json')
    );
    
    if (jsonFiles.length === 0) {
      console.log('❌ 未找到甲信越地区活动数据文件');
      return;
    }

    const latestFile = jsonFiles.sort().pop();
    console.log(`📂 读取数据文件: ${latestFile}`);
    
    const rawData = fs.readFileSync(latestFile, 'utf-8');
    const eventsData = JSON.parse(rawData);

    // 获取或创建甲信越地区
    let koshinetsuRegion = await prisma.region.findFirst({
      where: {
        OR: [
          { code: 'koshinetsu' },
          { nameCn: '甲信越' }
        ]
      }
    });

    if (!koshinetsuRegion) {
      koshinetsuRegion = await prisma.region.create({
        data: {
          code: 'koshinetsu',
          nameCn: '甲信越',
          nameJp: '甲信越'
        }
      });
      console.log(`✅ 已创建甲信越地区记录 (ID: ${koshinetsuRegion.id})`);
    } else {
      console.log(`📍 使用现有甲信越地区记录 (ID: ${koshinetsuRegion.id})`);
    }

    // 处理每个活动
    for (const [index, eventData] of eventsData.entries()) {
      console.log(`\n📝 处理活动 ${index + 1}: ${eventData.name}`);

      // 自动检测正确的県名
      const correctPrefecture = detectPrefecture(eventData.location, eventData.venue);
      console.log(`   🔧 地区修正: ${eventData.prefecture} → ${correctPrefecture}`);

      // 清理基本数据
      const cleanedData = {
        name: eventData.name || '',
        address: cleanAddress(eventData.location),
        datetime: cleanPeriod(eventData.period),
        venue: eventData.venue || '',
        access: eventData.access || '',
        organizer: eventData.organizer || '',
        price: eventData.fee || '',
        contact: eventData.contact || '',
        website: eventData.website === 'https://point.recruit.co.jp/member/relExpCont?siteCd=JLN' ? '' : eventData.website,
        region: eventData.region || '甲信越',
        regionId: koshinetsuRegion.id
      };

      // 处理地图信息
      const mapInfo = processMapInfo(eventData);
      
      // 将地图信息添加到基本数据中
      if (mapInfo.coordinates) {
        // 将完整地图信息序列化，并添加正确的県名
        cleanedData.googleMap = JSON.stringify({
          url: mapInfo.googleMap,
          coordinates: mapInfo.coordinates,
          embedUrl: mapInfo.embedUrl,
          source: mapInfo.coordsSource,
          method: mapInfo.extractionMethod,
          verified: mapInfo.verified,
          prefecture: correctPrefecture
        });
      } else {
        cleanedData.googleMap = mapInfo.googleMap || '';
      }

      // 根据分类选择对应的表
      const category = eventData.category;
      let targetTable;
      
      switch (category) {
        case '祭典':
          targetTable = 'matsuriEvent';
          break;
        case '花火':
          targetTable = 'hanabiEvent';
          break;
        case '赏花':
          targetTable = 'hanamiEvent';
          break;
        case '狩枫':
          targetTable = 'momijiEvent';
          break;
        case '灯光':
          targetTable = 'illuminationEvent';
          break;
        default:
          targetTable = 'matsuriEvent';
      }

      try {
        // 检查是否已存在相同名称的活动
        const existingEvent = await prisma[targetTable].findFirst({
          where: { 
            name: cleanedData.name,
            regionId: koshinetsuRegion.id 
          }
        });

        if (existingEvent) {
          // 更新现有记录
          await prisma[targetTable].update({
            where: { id: existingEvent.id },
            data: cleanedData
          });
          console.log(`   🔄 已更新现有记录 (ID: ${existingEvent.id}) - 分类: ${category}`);
        } else {
          // 创建新记录
          const newEvent = await prisma[targetTable].create({
            data: cleanedData
          });
          console.log(`   ✅ 已创建新记录 (ID: ${newEvent.id}) - 分类: ${category}`);
        }
        
        // 显示地图信息状态
        if (mapInfo.coordinates) {
          console.log(`   🗺️  真实坐标: ${mapInfo.coordinates.lat}, ${mapInfo.coordinates.lng}`);
          console.log(`   📍 坐标来源: ${mapInfo.extractionMethod}方法 - ${mapInfo.coordsSource.substring(0, 50)}...`);
          console.log(`   🏔️  实际地区: ${correctPrefecture} (甲信越)`);
        } else if (mapInfo.googleMap) {
          console.log(`   🔍 地址搜索: ${mapInfo.coordsSource}`);
        }

      } catch (error) {
        console.log(`   ❌ 处理失败: ${error.message}`);
      }
    }

    // 统计结果
    console.log('\n🎉 导入完成！');
    
    const region = await prisma.region.findUnique({
      where: { id: koshinetsuRegion.id }
    });

    if (region) {
      console.log('\n🔍 验证导入结果...');
      
      // 统计各分类的活动数量
      const hanamiEvents = await prisma.hanamiEvent.count({
        where: { regionId: region.id }
      });
      
      const hanabiEvents = await prisma.hanabiEvent.count({
        where: { regionId: region.id }
      });
      
      const matsuriEvents = await prisma.matsuriEvent.count({
        where: { regionId: region.id }
      });

      const momijiEvents = await prisma.momijiEvent.count({
        where: { regionId: region.id }
      });

      const illuminationEvents = await prisma.illuminationEvent.count({
        where: { regionId: region.id }
      });

      const total = hanamiEvents + hanabiEvents + matsuriEvents + momijiEvents + illuminationEvents;

      console.log(`📊 甲信越地区（山梨県）活动统计:`);
      console.log(`   赏花活动: ${hanamiEvents}个`);
      console.log(`   花火活动: ${hanabiEvents}个`);
      console.log(`   祭典活动: ${matsuriEvents}个`);
      console.log(`   狩枫活动: ${momijiEvents}个`);
      console.log(`   灯光活动: ${illuminationEvents}个`);
      console.log(`   总计: ${total}个`);
      
      // 统计有真实坐标的活动数量
      const eventsWithCoords = await Promise.all([
        prisma.matsuriEvent.findMany({ 
          where: { 
            regionId: region.id,
            googleMap: { contains: 'coordinates' }
          } 
        }),
        prisma.hanabiEvent.findMany({ 
          where: { 
            regionId: region.id,
            googleMap: { contains: 'coordinates' }
          } 
        }),
        prisma.hanamiEvent.findMany({ 
          where: { 
            regionId: region.id,
            googleMap: { contains: 'coordinates' }
          } 
        })
      ]);
      
      const totalWithCoords = eventsWithCoords.reduce((sum, events) => sum + events.length, 0);
      console.log(`\n🗺️  地图坐标统计:`);
      console.log(`   有真实坐标的活动: ${totalWithCoords}个`);
      console.log(`   坐标提取成功率: ${total > 0 ? ((totalWithCoords / total) * 100).toFixed(1) : 0}%`);
      console.log(`   技术方案效果: ${totalWithCoords >= 3 ? '🎯 高级坐标提取技术完美运行' : '⚠️  需要检查坐标提取'}`);
    }

  } catch (error) {
    console.error('❌ 导入过程中发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行导入
importKoshinetsuEvents(); 