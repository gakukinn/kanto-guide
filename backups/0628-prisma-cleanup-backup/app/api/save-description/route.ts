import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { description, region, activityType, sourceUrl } = await request.json();

    if (!description || !region || !activityType) {
      return NextResponse.json({ 
        success: false, 
        message: '请提供完整的信息：内容简介、地区和活动类型' 
      });
    }

    console.log('保存内容简介到数据库:', {
      description: description.substring(0, 100) + '...',
      region,
      activityType,
      sourceUrl
    });

    let result;
    
    // 根据活动类型选择相应的模型
    switch (activityType) {
      case 'hanabi':
        result = await prisma.hanabiEvent.create({
          data: {
            name: '临时花火记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      case 'matsuri':
        result = await prisma.matsuriEvent.create({
          data: {
            name: '临时祭典记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      case 'hanami':
        result = await prisma.hanamiEvent.create({
          data: {
            name: '临时花见记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      case 'momiji':
        result = await prisma.momijiEvent.create({
          data: {
            name: '临时红叶记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      case 'illumination':
        result = await prisma.illuminationEvent.create({
          data: {
            name: '临时灯光记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      case 'culture':
        result = await prisma.cultureEvent.create({
          data: {
            name: '临时文艺记录 - 待完善',
            region: region,
            address: '待完善',
            datetime: '待完善',
            venue: '待完善',
            access: '待完善',
            organizer: '待完善',
            price: '待完善',
            contact: '待完善',
            website: sourceUrl || '待完善',
            googleMap: '待完善',
            description: description,
            regionId: 'temp-region-id', // 临时区域ID
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        break;
      
      default:
        return NextResponse.json({ 
          success: false, 
          message: '不支持的活动类型：' + activityType 
        });
    }

    console.log('成功创建临时活动记录:', result.id);

    return NextResponse.json({
      success: true,
      message: '内容简介已保存到数据库',
      activityId: result.id,
      data: {
        id: result.id,
        description: description,
        region: region,
        activityType: activityType,
        sourceUrl: sourceUrl
      }
    });

  } catch (error) {
    console.error('保存到数据库错误:', error);
    return NextResponse.json({ 
      success: false, 
      message: '保存失败：' + (error as Error).message 
    });
  } finally {
    await prisma.$disconnect();
  }
} 