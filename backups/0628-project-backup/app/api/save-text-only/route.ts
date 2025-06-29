import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

// 地区映射
const regionMapping: { [key: string]: string } = {
  'tokyo': 'tokyo',
  'saitama': 'saitama', 
  'chiba': 'chiba',
  'kanagawa': 'kanagawa',
  'kitakanto': 'kitakanto',
  'koshinetsu': 'koshinetsu'
};

// 活动类型到表名映射
const activityTableMapping: { [key: string]: string } = {
  'hanabi': 'hanabi_events',
  'matsuri': 'matsuri_events',
  'hanami': 'hanami_events',
  'momiji': 'momiji_events',
  'illumination': 'illumination_events',
  'culture': 'culture_events'
};

export async function POST(request: NextRequest) {
  try {
    const { targetId, textData, region, activityType } = await request.json();

    console.log('保存基本文本信息请求:', { targetId, hasTextData: !!textData, region, activityType });

    if (!textData) {
      return NextResponse.json({
        success: false,
        error: '缺少文本数据'
      }, { status: 400 });
    }

    // 如果提供了targetId，直接更新指定记录
    if (targetId) {
      // 确定要查询的表
      let tableName = '';
      if (activityType && activityTableMapping[activityType]) {
        tableName = activityTableMapping[activityType];
      } else {
        // 如果没有指定活动类型，需要在所有表中查找
        const tables = Object.values(activityTableMapping);
        let foundTable = '';
        
        for (const table of tables) {
          try {
            const result = await prisma.$queryRawUnsafe(
              `SELECT id FROM ${table} WHERE id = ?`,
              targetId
            );
            if (Array.isArray(result) && result.length > 0) {
              foundTable = table;
              break;
            }
          } catch (error) {
            console.log(`在表 ${table} 中查找ID ${targetId} 失败:`, error);
          }
        }
        
        if (!foundTable) {
          return NextResponse.json({
            success: false,
            error: `未找到ID为 ${targetId} 的记录`
          }, { status: 404 });
        }
        
        tableName = foundTable;
      }

      // 准备要更新的字段
      const updateFields = [];
      const updateValues = [];
      
      if (textData.name) {
        updateFields.push('name = ?');
        updateValues.push(textData.name);
      }
      if (textData.address) {
        updateFields.push('address = ?');
        updateValues.push(textData.address);
      }
      if (textData.period) {
        updateFields.push('datetime = ?');
        updateValues.push(textData.period);
      }
      if (textData.venue) {
        updateFields.push('venue = ?');
        updateValues.push(textData.venue);
      }
      if (textData.access) {
        updateFields.push('access = ?');
        updateValues.push(textData.access);
      }
      if (textData.organizer) {
        updateFields.push('organizer = ?');
        updateValues.push(textData.organizer);
      }
      if (textData.price) {
        updateFields.push('price = ?');
        updateValues.push(textData.price);
      }
      if (textData.contact) {
        updateFields.push('contact = ?');
        updateValues.push(textData.contact);
      }
      if (textData.website) {
        updateFields.push('website = ?');
        updateValues.push(textData.website);
      }

      if (updateFields.length === 0) {
        return NextResponse.json({
          success: false,
          error: '没有可更新的字段'
        }, { status: 400 });
      }

      // 添加updatedAt字段
      updateFields.push('updatedAt = CURRENT_TIMESTAMP');
      updateValues.push(targetId); // 最后一个参数是WHERE条件的值

      // 更新记录
      try {
        await prisma.$queryRawUnsafe(
          `UPDATE ${tableName} SET ${updateFields.join(', ')} WHERE id = ?`,
          ...updateValues
        );

        // 验证更新是否成功
        const updatedRecord = await prisma.$queryRawUnsafe(
          `SELECT id, name FROM ${tableName} WHERE id = ?`,
          targetId
        );

        if (Array.isArray(updatedRecord) && updatedRecord.length > 0) {
          return NextResponse.json({
            success: true,
            message: '成功更新基本信息',
            recordId: targetId,
            recordName: (updatedRecord[0] as any).name,
            action: 'updated',
            updatedFields: updateFields.length - 1 // 减去updatedAt字段
          });
        } else {
          return NextResponse.json({
            success: false,
            error: '更新后无法找到记录'
          }, { status: 500 });
        }
      } catch (error) {
        console.error('更新基本信息失败:', error);
        return NextResponse.json({
          success: false,
          error: '数据库更新失败'
        }, { status: 500 });
      }
    }

    // 如果没有提供targetId，但提供了region和activityType，尝试智能匹配
    if (region && activityType) {
      const tableName = activityTableMapping[activityType];
      if (!tableName) {
        return NextResponse.json({
          success: false,
          error: '无效的活动类型'
        }, { status: 400 });
      }

      // 查找该地区该类型的记录
      try {
        const records = await prisma.$queryRawUnsafe(
          `SELECT id, name, address FROM ${tableName} WHERE region = ? ORDER BY createdAt DESC LIMIT 10`,
          region
        );

        if (Array.isArray(records) && records.length > 0) {
          return NextResponse.json({
            success: false,
            error: '找到多个匹配记录，请指定具体的ID',
            availableRecords: records.map((record: any) => ({
              id: record.id,
              name: record.name,
              address: record.address
            }))
          }, { status: 400 });
        } else {
          return NextResponse.json({
            success: false,
            error: '未找到匹配的记录'
          }, { status: 404 });
        }
      } catch (error) {
        console.error('查询记录失败:', error);
        return NextResponse.json({
          success: false,
          error: '查询数据库失败'
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: false,
      error: '请提供目标ID或地区+活动类型信息'
    }, { status: 400 });

  } catch (error) {
    console.error('保存基本信息失败:', error);
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 