import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { activityId, fromType, toType } = await request.json();
    
    if (!activityId || !fromType || !toType) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }
    
    // 查找源活动
    const sourceActivity = await (prisma as any)[`${fromType}Event`].findUnique({
      where: { id: activityId }
    });
    
    if (!sourceActivity) {
      return NextResponse.json(
        { success: false, error: '未找到源活动记录' },
        { status: 404 }
      );
    }
    
    // 使用事务确保数据一致性
    const result = await prisma.$transaction(async (tx) => {
      // 创建新记录
      const newActivity = await (tx as any)[`${toType}Event`].create({
        data: {
          name: sourceActivity.name,
          address: sourceActivity.address,
          datetime: sourceActivity.datetime,
          venue: sourceActivity.venue,
          access: sourceActivity.access,
          organizer: sourceActivity.organizer,
          price: sourceActivity.price,
          contact: sourceActivity.contact,
          website: sourceActivity.website,
          googleMap: sourceActivity.googleMap,
          region: sourceActivity.region,
          detailLink: sourceActivity.detailLink,
          regionId: sourceActivity.regionId,
          verified: sourceActivity.verified
        }
      });
      
      // 删除原记录
      await (tx as any)[`${fromType}Event`].delete({
        where: { id: activityId }
      });
      
      return newActivity;
    });
    
    return NextResponse.json({
      success: true,
      newId: result.id,
      message: '活动类型修改成功'
    });
    
  } catch (error) {
    console.error('修改活动类型失败:', error);
    return NextResponse.json(
      { success: false, error: '修改活动类型失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 