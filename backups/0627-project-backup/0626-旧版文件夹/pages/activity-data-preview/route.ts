import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

// 活动类型到数据库表的映射
const ACTIVITY_TABLE_MAP = {
  matsuri: 'matsuriEvent',
  hanami: 'hanamiEvent', 
  hanabi: 'hanabiEvent',
  momiji: 'momijiEvent',
  illumination: 'illuminationEvent',
  culture: 'cultureEvent'
} as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type') as keyof typeof ACTIVITY_TABLE_MAP;

    // 验证参数
    if (!id) {
      return NextResponse.json({
        success: false,
        message: '缺少数据库记录ID参数'
      }, { status: 400 });
    }

    if (!type || !ACTIVITY_TABLE_MAP[type]) {
      return NextResponse.json({
        success: false,
        message: '无效的活动类型参数'
      }, { status: 400 });
    }

    console.log(`开始预览${type}活动数据，ID: ${id}`);

    // 根据活动类型查询对应的数据库表
    const tableName = ACTIVITY_TABLE_MAP[type];
    const data = await (prisma as any)[tableName].findUnique({
      where: { id: id.trim() }
    });

    if (!data) {
      return NextResponse.json({
        success: false,
        message: `未找到ID为 ${id} 的${type}活动记录`
      }, { status: 404 });
    }

    // 返回十项核心数据
    const previewData = {
      id: data.id,
      name: data.name,           // 1. 名称
      address: data.address,     // 2. 所在地
      datetime: data.datetime,   // 3. 开催期间
      venue: data.venue,         // 4. 开催场所
      access: data.access,       // 5. 交通方式
      organizer: data.organizer, // 6. 主办方
      price: data.price,         // 7. 料金
      contact: data.contact,     // 8. 联系方式
      website: data.website,     // 9. 官方网站
      googleMap: data.googleMap, // 10. 谷歌地图
      region: data.region,       // 地区信息
      verified: data.verified,   // 验证状态
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };

    console.log(`成功获取${type}活动数据:`, {
      id: data.id,
      name: data.name,
      region: data.region,
      verified: data.verified
    });

    return NextResponse.json({
      success: true,
      message: `成功获取${type}活动数据`,
      data: previewData
    });

  } catch (error) {
    console.error('数据预览失败:', error);
    return NextResponse.json({
      success: false,
      message: '数据预览失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 