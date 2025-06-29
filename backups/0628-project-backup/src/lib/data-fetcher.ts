import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// 活动类型映射
const ACTIVITY_TYPE_MAP = {
  hanabi: 'hanabiEvent',
  matsuri: 'matsuriEvent',
  hanami: 'hanamiEvent',
  culture: 'cultureEvent',
  momiji: 'momijiEvent',
  illumination: 'illuminationEvent'
} as const;

// 地区名称映射
const REGION_MAP = {
  tokyo: '东京',
  saitama: '埼玉',
  chiba: '千叶',
  kanagawa: '神奈川',
  kitakanto: '北关东',
  koshinetsu: '甲信越'
} as const;

// 获取指定地区和活动类型的数据
export async function getRegionActivityData(
  regionKey: keyof typeof REGION_MAP,
  activityKey: keyof typeof ACTIVITY_TYPE_MAP
) {
  try {
    const regionName = REGION_MAP[regionKey];
    const activityModel = ACTIVITY_TYPE_MAP[activityKey];
    
    // 根据活动类型查询对应的数据表
    let events: any[] = [];
    
    switch (activityModel) {
      case 'hanabiEvent':
        events = await prisma.hanabiEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
        
      case 'matsuriEvent':
        events = await prisma.matsuriEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
        
      case 'hanamiEvent':
        events = await prisma.hanamiEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
        
      case 'cultureEvent':
        events = await prisma.cultureEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
        
      case 'momijiEvent':
        events = await prisma.momijiEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
        
      case 'illuminationEvent':
        events = await prisma.illuminationEvent.findMany({
          where: {
            region: {
              contains: regionName
            }
          },
          orderBy: {
            datetime: 'asc'
          }
        });
        break;
    }

    // 转换数据格式以适配 UniversalStaticPageTemplate
    // ⚠️ 重要：只使用数据库中经过Walker Plus和Jalan验证的真实数据
    const formattedEvents = events.map(event => ({
      id: event.id,
      title: event.name,
      name: event.name,
      date: event.datetime,
      location: event.address,
      venue: event.venue,
      likes: 0, // 暂时设为0，等待用户确认如何处理点赞数据
      description: event.description || '',
      website: event.website,
      detailLink: `/${regionKey}/${activityKey}/${event.id}` // 链接到四层页面
    }));

    return formattedEvents;
    
  } catch (error) {
    console.error(`获取${regionKey}地区${activityKey}数据失败:`, error);
    return [];
  }
}

// 静态数据获取函数（编译时使用）- 从JSON文件读取
export async function getStaticRegionActivityData(
  regionKey: keyof typeof REGION_MAP,
  activityKey: keyof typeof ACTIVITY_TYPE_MAP
) {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    // 构建JSON文件路径
    const filePath = path.join(process.cwd(), 'data', 'regions', regionKey, `${activityKey}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.warn(`JSON文件不存在: ${filePath}`);
      return [];
    }
    
    // 读取JSON文件
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const events = JSON.parse(fileContent);
    
    return events;
    
  } catch (error) {
    console.error(`读取${regionKey}地区${activityKey}的JSON文件失败:`, error);
    // 如果JSON文件读取失败，回退到数据库
    return await getRegionActivityData(regionKey, activityKey);
  }
}

// 关闭数据库连接
export async function closePrismaConnection() {
  await prisma.$disconnect();
}

// 获取三层页面的第一个活动数据（用于二层页面显示）
export async function getFirstActivityFromThirdLayer(
  regionKey: keyof typeof REGION_MAP,
  activityKey: keyof typeof ACTIVITY_TYPE_MAP
) {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    // 构建JSON文件路径
    const filePath = path.join(process.cwd(), 'data', 'regions', regionKey, `${activityKey}.json`);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.warn(`JSON文件不存在: ${filePath}`);
      return null;
    }
    
    // 读取JSON文件
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const events = JSON.parse(fileContent);
    
    // 返回第一个活动，如果存在的话
    if (events && events.length > 0) {
      return events[0];
    }
    
    return null;
    
  } catch (error) {
    console.error(`读取三层页面数据失败 (${regionKey}/${activityKey}):`, error);
    return null;
  }
} 