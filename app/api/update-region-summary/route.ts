import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { region, activity, events } = await request.json();

    if (!region || !activity) {
      return NextResponse.json(
        { error: '地区和活动类型不能为空' },
        { status: 400 }
      );
    }

    // 构建地区汇总文件路径
    const regionDir = path.join(process.cwd(), 'data', 'regions', region);
    const filePath = path.join(regionDir, `${activity}.json`);

    // 确保目录存在
    if (!fs.existsSync(regionDir)) {
      fs.mkdirSync(regionDir, { recursive: true });
    }

    // 转换事件数据格式（从四层页面格式转换为三层页面格式）
    const regionEvents = events.map((event: any) => {
      // 生成正确的detailLink路径
      let detailLink = '';
      if (event.detailLink) {
        detailLink = event.detailLink;
      } else {
        // 根据事件ID查找对应的四层页面目录
        const eventId = event.id;
        const fullTimestamp = eventId.split('-').pop(); // 获取完整时间戳
        const shortTimestamp = fullTimestamp.slice(-8); // 获取后8位时间戳
        
        // 检查可能的四层页面目录
        const appDir = path.join(process.cwd(), 'app', region, activity);
        if (fs.existsSync(appDir)) {
          const subdirs = fs.readdirSync(appDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
          
          // 查找包含8位时间戳的目录
          const matchingDir = subdirs.find(dir => dir.includes(shortTimestamp));
          if (matchingDir) {
            detailLink = `/${region}/${activity}/${matchingDir}`;
          } else {
            // 如果找不到，使用8位时间戳格式
            detailLink = `/${region}/${activity}/activity-${shortTimestamp}`;
          }
        } else {
          detailLink = `/${region}/${activity}/activity-${shortTimestamp}`;
        }
      }
      
      return {
        id: event.id,
        title: event.name || event.title,
        description: event.description || '',
        location: event.location || '地点待定',
        date: event.datetime || event.date || '日期待定',
        image: event.media && event.media[0] ? event.media[0].url : '',
        detailLink: detailLink,
        likes: event.likes || 0,
        themeColor: event.themeColor || 'blue'
      };
    });

    // 写入文件
    fs.writeFileSync(filePath, JSON.stringify(regionEvents, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: `地区汇总文件已更新: ${region}/${activity}.json`,
      filePath: filePath,
      eventCount: regionEvents.length
    });

  } catch (error) {
    console.error('更新地区汇总文件失败:', error);
    return NextResponse.json(
      { error: '更新失败: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 