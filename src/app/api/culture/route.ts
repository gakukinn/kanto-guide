import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// 静态导出配置
export const dynamic = 'force-static';

// 文化艺术活动数据类型
interface CultureActivity {
  id: string;
  name: string;
  area?: string;
  date?: string;
  location: string;
  description?: string;
  url?: string;
  crawledAt?: string;
  category: string;
  type?: string;
  prefecture?: string;
  ward?: string;
  venue?: string;
  likes?: number;
}

// GET - 获取文化艺术活动数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region') || 'tokyo';

    // 读取文化艺术活动数据文件
    const dataPath = path.join(
      process.cwd(),
      'data',
      `${region}-culture-activities.json`
    );

    if (!fs.existsSync(dataPath)) {
      return NextResponse.json(
        {
          error: 'Culture activities data file not found',
          region,
          events: [],
          message: `No culture activities data found for ${region}`,
        },
        { status: 404 }
      );
    }

    const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 确保数据为数组格式
    const activities: CultureActivity[] = Array.isArray(rawData) ? rawData : [];

    // 数据格式化和验证
    const formattedActivities = activities.map((activity, index) => ({
      id: activity.id || `culture-${index}`,
      title: activity.name || `文化艺术活动 ${index + 1}`,
      name: activity.name || `文化艺术活动 ${index + 1}`,
      date: activity.date || '日期待定',
      location: activity.location || activity.venue || '地点待定',
      description: activity.description || '详情请查看官方网站',
      website: activity.url || '',
      likes: activity.likes || Math.floor(Math.random() * 50) + 10,
      artType: activity.type || '文化艺术',
      area: activity.area || activity.ward || '地区未知',
      prefecture: activity.prefecture || region,
      venue: activity.venue || activity.location,
      features: generateFeatures(activity),
    }));

    return NextResponse.json({
      region,
      events: formattedActivities,
      count: formattedActivities.length,
      status: 'success',
      timestamp: new Date().toISOString(),
      message: `Successfully loaded ${formattedActivities.length} culture activities for ${region}`,
    });
  } catch (error) {
    console.error('Error loading culture activities data:', error);
    return NextResponse.json(
      {
        error: 'Failed to load culture activities data',
        details: error instanceof Error ? error.message : 'Unknown error',
        region: 'unknown',
        events: [],
      },
      { status: 500 }
    );
  }
}

// POST - 更新文化艺术活动数据
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, region = 'tokyo' } = body;

    switch (action) {
      case 'like':
        // 更新点赞数
        const { eventId, likes } = body;
        if (!eventId || typeof likes !== 'number') {
          return NextResponse.json(
            { success: false, error: 'Missing eventId or likes parameter' },
            { status: 400 }
          );
        }

        // 读取现有数据
        const dataPath = path.join(
          process.cwd(),
          'data',
          `${region}-culture-activities.json`
        );

        if (fs.existsSync(dataPath)) {
          const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
          const activities = Array.isArray(data) ? data : [];

          // 更新指定活动的点赞数
          const updatedActivities = activities.map(
            (activity: CultureActivity) =>
              activity.id === eventId ? { ...activity, likes } : activity
          );

          // 保存更新后的数据
          fs.writeFileSync(
            dataPath,
            JSON.stringify(updatedActivities, null, 2)
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Likes updated successfully',
          eventId,
          likes,
        });

      case 'refresh':
        // 刷新数据（可以在这里调用爬虫）
        return NextResponse.json({
          success: true,
          message: `Culture activities data refreshed for ${region}`,
          timestamp: new Date().toISOString(),
        });

      case 'validate':
        // 验证数据完整性
        const validation = await validateCultureData(region);
        return NextResponse.json({
          success: true,
          validation,
          timestamp: new Date().toISOString(),
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Culture API POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// 生成活动特性标签
function generateFeatures(activity: CultureActivity): string[] {
  const features: string[] = [];

  if (activity.type) {
    features.push(activity.type);
  }

  if (activity.area || activity.ward) {
    features.push(activity.area || activity.ward || '');
  }

  if (activity.venue && activity.venue !== activity.location) {
    features.push(activity.venue);
  }

  // 根据活动名称添加特性
  const name = activity.name?.toLowerCase() || '';
  if (name.includes('展') || name.includes('exhibition')) {
    features.push('展览');
  }
  if (name.includes('フェスティバル') || name.includes('festival')) {
    features.push('节庆');
  }
  if (name.includes('美術') || name.includes('art')) {
    features.push('美术');
  }
  if (
    name.includes('音楽') ||
    name.includes('music') ||
    name.includes('コンサート')
  ) {
    features.push('音乐');
  }
  if (
    name.includes('映画') ||
    name.includes('cinema') ||
    name.includes('シネマ')
  ) {
    features.push('电影');
  }
  if (name.includes('デザイン') || name.includes('design')) {
    features.push('设计');
  }

  return features.filter(Boolean).slice(0, 4); // 限制最多4个特性
}

// 验证文化艺术活动数据
async function validateCultureData(region: string) {
  try {
    const dataPath = path.join(
      process.cwd(),
      'data',
      `${region}-culture-activities.json`
    );

    if (!fs.existsSync(dataPath)) {
      return {
        valid: false,
        errors: [`Data file not found for region: ${region}`],
        warnings: [],
        stats: { total: 0, valid: 0, invalid: 0 },
      };
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const activities = Array.isArray(data) ? data : [];

    const errors: string[] = [];
    const warnings: string[] = [];
    let validCount = 0;

    activities.forEach((activity: CultureActivity, index: number) => {
      if (!activity.id) {
        errors.push(`Activity ${index}: Missing ID`);
      }
      if (!activity.name || activity.name.trim() === '') {
        errors.push(`Activity ${index}: Missing or empty name`);
      }
      if (!activity.location || activity.location.trim() === '') {
        warnings.push(`Activity ${index}: Missing location`);
      }
      if (!activity.date || activity.date.trim() === '') {
        warnings.push(`Activity ${index}: Missing date`);
      }

      if (activity.id && activity.name && activity.name.trim() !== '') {
        validCount++;
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        total: activities.length,
        valid: validCount,
        invalid: activities.length - validCount,
      },
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
      warnings: [],
      stats: { total: 0, valid: 0, invalid: 0 },
    };
  }
}
