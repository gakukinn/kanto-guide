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
    
    // 智能日期解析和排序函数
    const parseDateForSorting = (dateStr: string): Date => {
      if (!dateStr) return new Date('2999-12-31'); // 无日期的放最后
      
      try {
        // 1. 处理标准格式：2025年7月2日
        const standardMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
        if (standardMatch) {
          const [, year, month, day] = standardMatch;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        
        // 2. 处理上中下旬格式：7月上旬 → 7月5日，7月中旬 → 7月15日，7月下旬 → 7月25日
        const periodMatch = dateStr.match(/(\d{1,2})月(上旬|中旬|下旬)/);
        if (periodMatch) {
          const [, month, period] = periodMatch;
          const currentYear = new Date().getFullYear();
          const periodDays = { '上旬': 5, '中旬': 15, '下旬': 25 };
          return new Date(currentYear, parseInt(month) - 1, periodDays[period as keyof typeof periodDays]);
        }
        
        // 3. 处理范围日期：7月22日・23日 或 7月19日-8月11日 - 取第一个日期
        const rangeMatch = dateStr.match(/(\d{4}年)?(\d{1,2})月(\d{1,2})日/);
        if (rangeMatch) {
          const [, yearPart, month, day] = rangeMatch;
          const year = yearPart ? parseInt(yearPart.replace('年', '')) : new Date().getFullYear();
          return new Date(year, parseInt(month) - 1, parseInt(day));
        }
        
        // 4. 处理简单月日格式：7月2日
        const simpleMatch = dateStr.match(/(\d{1,2})月(\d{1,2})日/);
        if (simpleMatch) {
          const [, month, day] = simpleMatch;
          const currentYear = new Date().getFullYear();
          return new Date(currentYear, parseInt(month) - 1, parseInt(day));
        }
        
        // 5. 尝试原生Date解析
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
          return parsed;
        }
        
        console.warn('无法解析日期格式:', dateStr);
        return new Date('2999-12-31'); // 无法解析的放最后
        
      } catch (error) {
        console.warn('日期解析错误:', dateStr, error);
        return new Date('2999-12-31'); // 错误的放最后
      }
    };

    // 确保返回的数据是数组
    if (!Array.isArray(events)) {
      console.warn(`数据格式错误，期望数组，实际为: ${typeof events}`);
      return [];
    }

    // 按日期排序数据
    const sortedEvents = events.sort((a, b) => {
      const dateA = parseDateForSorting(a.date || a.dates || '');
      const dateB = parseDateForSorting(b.date || b.dates || '');
      
      // 按时间升序排列
      return dateA.getTime() - dateB.getTime();
    });

    console.log(`成功加载 ${regionKey}/${activityKey} 数据: ${sortedEvents.length} 条记录`);
    return sortedEvents;
    
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