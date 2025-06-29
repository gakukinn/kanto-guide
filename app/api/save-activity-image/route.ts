import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const { activityId, activityType, imageUrl, region } = await request.json();
    
    if (!activityId || !activityType || !imageUrl || !region) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 创建目录结构，与页面文件结构保持一致
    // 页面结构: /app/{region}/{activityType}/activity-{id}/
    // 图片结构: /public/images/{region}/{activityType}/activity-{id}/
    const imageDir = path.join(process.cwd(), 'public', 'images', region, activityType, `activity-${activityId}`);
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    // 下载图片
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`下载图片失败: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // 使用Sharp处理图片
    const processedImage = await sharp(buffer)
      .resize(1456, 816, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toBuffer();

    // 检查文件大小，如果超过1MB则进一步压缩
    let finalImage = processedImage;
    if (processedImage.length > 1024 * 1024) { // 1MB
      finalImage = await sharp(buffer)
        .resize(1456, 816, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({
          quality: 70,
          progressive: true
        })
        .toBuffer();
    }

    // 保存图片，使用main.jpg作为主图片名称
    const imagePath = path.join(imageDir, 'main.jpg');
    fs.writeFileSync(imagePath, finalImage);

    // 获取最终文件大小
    const stats = fs.statSync(imagePath);
    const fileSizeKB = (stats.size / 1024).toFixed(1);

    return NextResponse.json({
      success: true,
      message: '图片保存成功',
      imagePath: `/images/${region}/${activityType}/activity-${activityId}/main.jpg`,
      fileSize: `${fileSizeKB}KB`
    });

  } catch (error) {
    console.error('保存图片失败:', error);
    return NextResponse.json(
      { success: false, error: '保存图片失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 