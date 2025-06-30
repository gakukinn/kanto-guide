import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

// 地区映射
const REGION_MAPPING: { [key: string]: string } = {
  'tokyo': 'cmc7o1zj30000vl0snlxsllso',
  'saitama': 'cmc7o9np50000vlcw72kotl0k', 
  'chiba': 'cmc7ojtpp0000vlagmqnxeasf',
  'kanagawa': 'cmc7ovoku0000vl9c8f38nu42',
  'koshinetsu': 'cmc7q7n2c0000vl6cyeobsi3h',
  'kitakanto': 'cmc8odd3c0002vl8s3lp6z0yz'
};

export async function POST(request: NextRequest) {
  try {
    const completeData = await request.json();

    console.log('🔥 收到保存完整活动数据请求:', {
      name: completeData.name,
      region: completeData.region,
      activityType: completeData.activityType,
      hasDescription: !!completeData.description,
      descriptionLength: completeData.description?.length || 0,
      description: completeData.description?.substring(0, 50) + '...'
    });

    // 验证必要字段
    if (!completeData.name) {
      console.log('❌ 缺少活动名称');
      return NextResponse.json({ 
        success: false, 
        message: '缺少活动名称' 
      });
    }

    if (!completeData.region) {
      console.log('❌ 缺少地区信息');
      return NextResponse.json({ 
        success: false, 
        message: '缺少地区信息' 
      });
    }

    if (!completeData.activityType) {
      console.log('❌ 缺少活动类型');
      return NextResponse.json({ 
        success: false, 
        message: '缺少活动类型' 
      });
    }

    // 获取regionId
    const regionId = REGION_MAPPING[completeData.region];
    if (!regionId) {
      console.log('❌ 不支持的地区:', completeData.region);
      return NextResponse.json({ 
        success: false, 
        message: '不支持的地区：' + completeData.region 
      });
    }

    console.log('✅ 地区映射成功:', completeData.region, '->', regionId);

    let result;
    let action = 'created'; // 'created' 或 'updated'
    
    // 根据活动类型选择相应的模型
    switch (completeData.activityType) {
      case 'hanabi':
        // 先尝试查找现有记录（基于名称和地区匹配）
        const existingHanabi = await prisma.hanabiEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingHanabi) {
          // 更新现有记录
          console.log('🔄 找到现有花火记录，准备更新:', {
            id: existingHanabi.id,
            name: existingHanabi.name,
            oldDescription: existingHanabi.description ? '有内容' : '空',
            newDescription: completeData.description ? '有内容' : '空'
          });
          
          result = await prisma.hanabiEvent.update({
            where: { id: existingHanabi.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
          console.log('✅ 成功更新现有花火记录:', existingHanabi.id);
        } else {
          // 创建新记录
          console.log('➕ 未找到现有记录，准备创建新记录');
          
          result = await prisma.hanabiEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
          console.log('✅ 成功创建新花火记录:', result.id);
        }
        break;
      
      case 'matsuri':
        const existingMatsuri = await prisma.matsuriEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingMatsuri) {
          result = await prisma.matsuriEvent.update({
            where: { id: existingMatsuri.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
        } else {
          result = await prisma.matsuriEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
        }
        break;
      
      case 'hanami':
        const existingHanami = await prisma.hanamiEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingHanami) {
          result = await prisma.hanamiEvent.update({
            where: { id: existingHanami.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
        } else {
          result = await prisma.hanamiEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
        }
        break;
      
      case 'momiji':
        const existingMomiji = await prisma.momijiEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingMomiji) {
          result = await prisma.momijiEvent.update({
            where: { id: existingMomiji.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
        } else {
          result = await prisma.momijiEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
        }
        break;
      
      case 'illumination':
        const existingIllumination = await prisma.illuminationEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingIllumination) {
          result = await prisma.illuminationEvent.update({
            where: { id: existingIllumination.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
        } else {
          result = await prisma.illuminationEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
        }
        break;
      
      case 'culture':
        const existingCulture = await prisma.cultureEvent.findFirst({
          where: {
            OR: [
              { name: { contains: completeData.name.replace(/[（）()]/g, '').trim() } },
              { name: { contains: completeData.name.split('（')[0].trim() } }
            ],
            region: completeData.region
          }
        });

        if (existingCulture) {
          result = await prisma.cultureEvent.update({
            where: { id: existingCulture.id },
            data: {
              name: completeData.name,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description
            }
          });
          action = 'updated';
        } else {
          result = await prisma.cultureEvent.create({
            data: {
              name: completeData.name,
              region: completeData.region,
              address: completeData.address,
              datetime: completeData.datetime,
              venue: completeData.venue,
              access: completeData.access,
              organizer: completeData.organizer,
              price: completeData.price,
              contact: completeData.contact,
              website: completeData.website,
              googleMap: completeData.googleMap,
              description: completeData.description,
              regionId: regionId
            }
          });
        }
        break;
      
      default:
        return NextResponse.json({ 
          success: false, 
          message: '不支持的活动类型：' + completeData.activityType 
        });
    }

    console.log(`🎉 成功${action === 'updated' ? '更新' : '创建'}完整活动数据:`, {
      id: result.id,
      name: result.name,
      action: action,
      hasDescription: !!result.description
    });

    return NextResponse.json({
      success: true,
      message: `完整活动数据已${action === 'updated' ? '更新到' : '保存到'}数据库`,
      activityId: result.id,
      activityType: completeData.activityType,
      action: action,
      data: {
        id: result.id,
        name: completeData.name,
        region: completeData.region,
        activityType: completeData.activityType,
        hasDescription: !!completeData.description,
        hasCoordinates: !!completeData.googleMap,
        sourceUrl: completeData.sourceUrl
      }
    });

  } catch (error) {
    console.error('❌ 保存完整数据错误:', error);
    return NextResponse.json({ 
      success: false, 
      message: '保存失败：' + (error as Error).message 
    });
  } finally {
    await prisma.$disconnect();
  }
} 