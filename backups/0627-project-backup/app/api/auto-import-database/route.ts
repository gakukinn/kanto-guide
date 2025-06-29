import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';
import { classifyActivity, getActivityTypeName, getPrismaModelName, type ActivityType } from '../../../src/utils/activity-classifier';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { textData, mapData, contentData, action, manualActivityType, overwriteId } = await request.json();
    
    console.log('接收到的数据:');
    console.log('文本数据:', textData);
    console.log('地图数据:', mapData);
    console.log('内容数据:', contentData);
    console.log('操作类型:', action);
    console.log('指定覆盖ID:', overwriteId);
    
    // 1. 活动分类识别 🔥 新增
    const autoClassification = classifyActivity(textData);
    
    // 🔥 如果用户手动选择了活动类型，使用用户选择的，否则使用AI识别的
    const finalActivityType = manualActivityType || autoClassification.type;
    const classification = {
      type: finalActivityType,
      confidence: manualActivityType ? 100 : autoClassification.confidence, // 手动选择置信度100%
      reason: manualActivityType ? '用户手动选择' : autoClassification.reason,
      keywords: manualActivityType ? [] : autoClassification.keywords
    };
    
    console.log('活动分类识别:', {
      auto: {
        type: autoClassification.type,
        typeName: getActivityTypeName(autoClassification.type),
        confidence: autoClassification.confidence
      },
      manual: manualActivityType,
      final: {
        type: classification.type,
        typeName: getActivityTypeName(classification.type),
        confidence: classification.confidence,
        reason: classification.reason
      }
    });
    
    // 2. 地区识别 - 优先使用文本地址识别，更准确
    const region = identifyRegion(textData.address) || mapData.region;
    
    // 3. 获取或创建地区记录
    let regionRecord = await prisma.region.findFirst({
      where: { code: region }
    });
    
    if (!regionRecord) {
      // 如果地区不存在，创建一个
      const regionNames: Record<string, { nameCn: string; nameJp: string }> = {
        'tokyo': { nameCn: '东京都', nameJp: '東京都' },
        'saitama': { nameCn: '埼玉县', nameJp: '埼玉県' },
        'chiba': { nameCn: '千叶县', nameJp: '千葉県' },
        'kanagawa': { nameCn: '神奈川县', nameJp: '神奈川県' },
        'kitakanto': { nameCn: '北关东', nameJp: '北関東' },
        'koshinetsu': { nameCn: '甲信越', nameJp: '甲信越' },
        'other': { nameCn: '其他地区', nameJp: 'その他' }
      };
      
      const names = regionNames[region] || regionNames['other'];
      regionRecord = await prisma.region.create({
        data: {
          code: region,
          nameCn: names.nameCn,
          nameJp: names.nameJp
        }
      });
    }
    
    const regionId = regionRecord.id;
    
    // 4. 防重复检查（根据活动类型）
    const duplicateEvents = await checkDuplicateEvent(textData, classification.type);
    console.log('重复检查结果:', duplicateEvents);
    console.log('当前action:', action);
    
    // 如果是检查阶段且发现重复数据
    if (action === 'check' && duplicateEvents && duplicateEvents.length > 0) {
      console.log('返回重复数据给前端');
      return NextResponse.json({
        success: false,
        hasDuplicates: true,
        duplicates: duplicateEvents,
        message: `发现 ${duplicateEvents.length} 个相似活动`,
        classification: {
          type: classification.type,
          typeName: getActivityTypeName(classification.type),
          confidence: classification.confidence
        },
        newData: {
          name: textData.name,
          address: textData.address,
          period: textData.period,
          region: region
        }
      });
    }
    
    // 5. 处理用户选择 - 覆盖数据
    if (action === 'overwrite' && duplicateEvents && duplicateEvents.length > 0) {
      // 🔥 使用用户指定的ID，如果没有指定则使用第一个（向后兼容）
      const targetEvent = overwriteId 
        ? duplicateEvents.find(event => event.id === overwriteId) || duplicateEvents[0]
        : duplicateEvents[0];
      const updateData = {
        name: textData.name,
        address: textData.address,
        datetime: textData.period,
        venue: textData.venue,
        access: textData.access,
        organizer: textData.organizer || '',
        price: textData.price || '',
        contact: textData.contact || '',
        website: textData.website || '',
        googleMap: mapData.mapEmbedUrl,
        description: contentData?.description || '', // 🔥 新增：内容简介
        region: region,
        regionId: regionId,
        updatedAt: new Date()
      };
      
      // 根据活动类型更新对应的表
      let updatedEvent: any;
      switch (classification.type) {
        case 'hanabi':
          updatedEvent = await prisma.hanabiEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        case 'matsuri':
          updatedEvent = await prisma.matsuriEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        case 'hanami':
          updatedEvent = await prisma.hanamiEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        case 'momiji':
          updatedEvent = await prisma.momijiEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        case 'illumination':
          updatedEvent = await prisma.illuminationEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        case 'culture':
          updatedEvent = await prisma.cultureEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
        default:
          updatedEvent = await prisma.matsuriEvent.update({
            where: { id: targetEvent.id },
            data: updateData
          });
          break;
      }
      
      return NextResponse.json({
        success: true,
        action: 'overwrite',
        eventId: updatedEvent.id,
        activityType: classification.type,
        activityTypeName: getActivityTypeName(classification.type),
        message: `已覆盖${getActivityTypeName(classification.type)}"${textData.name}"的数据`,
        data: {
          name: updatedEvent.name,
          region: updatedEvent.region,
          coordinates: mapData.coordinates,
          googleMapUrl: updatedEvent.googleMap
        }
      });
    }
    
    // 6. 准备录入数据（新建或无重复时）
    const eventData = {
      name: textData.name,
      address: textData.address,
      datetime: textData.period,
      venue: textData.venue,
      access: textData.access,
      organizer: textData.organizer || '',
      price: textData.price || '',
      contact: textData.contact || '',
      website: textData.website || '',
      googleMap: mapData.mapEmbedUrl,
      description: contentData?.description || '', // 🔥 新增：内容简介
      region: region,
      regionId: regionId,
      verified: true
    };
    
    console.log('准备录入的数据:', eventData);
    console.log('录入表类型:', classification.type);
    
    // 7. 根据活动类型录入对应的表
    let createdEvent: any;
    switch (classification.type) {
      case 'hanabi':
        createdEvent = await prisma.hanabiEvent.create({ data: eventData });
        break;
      case 'matsuri':
        createdEvent = await prisma.matsuriEvent.create({ data: eventData });
        break;
      case 'hanami':
        createdEvent = await prisma.hanamiEvent.create({ data: eventData });
        break;
      case 'momiji':
        createdEvent = await prisma.momijiEvent.create({ data: eventData });
        break;
      case 'illumination':
        createdEvent = await prisma.illuminationEvent.create({ data: eventData });
        break;
      case 'culture':
        createdEvent = await prisma.cultureEvent.create({ data: eventData });
        break;
      default:
        createdEvent = await prisma.matsuriEvent.create({ data: eventData });
        break;
    }
    
    console.log('录入成功:', createdEvent.id);
    
    return NextResponse.json({
      success: true,
      eventId: createdEvent.id,
      activityType: classification.type,
      activityTypeName: getActivityTypeName(classification.type),
      classification: {
        confidence: classification.confidence,
        reason: classification.reason,
        keywords: classification.keywords
      },
      message: `${getActivityTypeName(classification.type)}"${textData.name}"已成功录入数据库`,
      data: {
        name: createdEvent.name,
        region: createdEvent.region,
        coordinates: mapData.coordinates,
        googleMapUrl: createdEvent.googleMap
      }
    });

  } catch (error) {
    console.error('数据库录入错误:', error);
    return NextResponse.json({ 
      success: false, 
      error: '数据库录入失败',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// 地区识别函数
function identifyRegion(address: string): string {
  if (!address) return 'other';
  
  // 地区识别规则
  const regionRules = {
    'tokyo': ['东京都', '東京都'],
    'saitama': ['埼玉県', '埼玉县'],
    'chiba': ['千葉県', '千叶县'],
    'kanagawa': ['神奈川県', '神奈川县'],
    'kitakanto': ['茨城県', '栃木県', '群馬県'],
    'koshinetsu': ['山梨県', '長野県', '新潟県', '富山県']
  };
  
  for (const [region, keywords] of Object.entries(regionRules)) {
    if (keywords.some(keyword => address.includes(keyword))) {
      return region;
    }
  }
  
  return 'other'; // 其他地区（京都府、大阪府等）
}

// 防重复检查 - 根据活动类型查询对应表
async function checkDuplicateEvent(textData: any, activityType: ActivityType) {
  try {
    // 根据活动类型获取对应表的数据
    let allEvents: any[] = [];
    
    switch (activityType) {
      case 'hanabi':
        allEvents = await prisma.hanabiEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      case 'matsuri':
        allEvents = await prisma.matsuriEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      case 'hanami':
        allEvents = await prisma.hanamiEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      case 'momiji':
        allEvents = await prisma.momijiEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      case 'illumination':
        allEvents = await prisma.illuminationEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      case 'culture':
        allEvents = await prisma.cultureEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
      default:
        allEvents = await prisma.matsuriEvent.findMany({
          select: { id: true, name: true, address: true, datetime: true, venue: true, contact: true, website: true, createdAt: true }
        });
        break;
    }

    const duplicates = [];

    for (const event of allEvents) {
      const nameSimilarity = calculateSimilarity(textData.name, event.name);
      const addressSimilarity = calculateSimilarity(textData.address, event.address);
      const dateSimilarity = calculateSimilarity(textData.period, event.datetime);
      
      // 🔥 优先级判断系统
      const contactSimilarity = calculateSimilarity(textData.contact || '', event.contact || '');
      const websiteSimilarity = calculateSimilarity(textData.website || '', event.website || '');
      
      let isDuplicate = false;
      let matchReason = '';
      let priority = 0;
      
      // 🥇 优先级1（最高）: 电话号码相同
      if (textData.contact && event.contact && contactSimilarity >= 0.95) {
        isDuplicate = true;
        matchReason = '电话号码相同';
        priority = 1;
      }
      
      // 🥈 优先级2: 官网URL相同
      else if (textData.website && event.website && websiteSimilarity >= 0.95) {
        isDuplicate = true;
        matchReason = '官方网站相同';
        priority = 2;
      }
      
      // 🥉 优先级3: 地址相同（90%以上相似）
      else if (textData.address && event.address && addressSimilarity >= 0.9) {
        isDuplicate = true;
        matchReason = '地址相同';
        priority = 3;
      }
      
      // 📋 优先级4（最低）: 名称相似 + 日期相同
      else if (nameSimilarity >= 0.5 && dateSimilarity >= 0.9) {
        isDuplicate = true;
        matchReason = '名称日期相似';
        priority = 4;
      }
      
      if (isDuplicate) {
        duplicates.push({
          ...event,
          matchReason,
          priority,
          similarity: {
            name: Math.round(nameSimilarity * 100),
            address: Math.round(addressSimilarity * 100),
            date: Math.round(dateSimilarity * 100),
            contact: Math.round(contactSimilarity * 100),
            website: Math.round(websiteSimilarity * 100)
          }
        });
      }
    }

    // 按优先级排序（优先级数字越小越重要）
    if (duplicates.length > 0) {
      duplicates.sort((a, b) => a.priority - b.priority);
      return duplicates;
    }
    
    return null;
  } catch (error) {
    console.error('重复检查失败:', error);
    return null;
  }
}

// 字符串相似度计算（改进版，更适合日文文本）
function calculateSimilarity(str1: string, str2: string): number {
  if (!str1 || !str2) return 0;
  
  // 标准化字符串：去除空格、标点符号等
  const normalize = (str: string) => str.replace(/[\s\(\)（）～\-]/g, '');
  const norm1 = normalize(str1);
  const norm2 = normalize(str2);
  
  if (norm1 === norm2) return 1.0; // 完全匹配
  
  // 检查包含关系（如果一个字符串包含另一个，相似度应该很高）
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    const shorter = norm1.length < norm2.length ? norm1 : norm2;
    const longer = norm1.length < norm2.length ? norm2 : norm1;
    // 如果短字符串长度超过5个字符，给予更高的相似度
    const baseSimilarity = shorter.length / longer.length;
    return shorter.length >= 5 ? Math.max(baseSimilarity, 0.8) : baseSimilarity;
  }
  
  // 使用编辑距离计算
  const longer = norm1.length > norm2.length ? norm1 : norm2;
  const shorter = norm1.length > norm2.length ? norm2 : norm1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// 编辑距离算法
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
} 