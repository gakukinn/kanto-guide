// 地区名称映射
const REGION_MAP = {
  tokyo: '东京',
  saitama: '埼玉',
  chiba: '千叶',
  kanagawa: '神奈川',
  kitakanto: '北关东',
  koshinetsu: '甲信越'
} as const;

// 活动类型映射
const ACTIVITY_TYPE_MAP = {
  hanabi: 'hanabi',
  matsuri: 'matsuri',
  hanami: 'hanami',
  culture: 'culture',
  momiji: 'momiji',
  illumination: 'illumination'
} as const;

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
        
        // 如果都解析失败，返回一个默认日期
        console.warn(`无法解析日期格式: ${dateStr}`);
        return new Date('2999-12-31');
        
      } catch (error) {
        console.warn(`日期解析出错: ${dateStr}`, error);
        return new Date('2999-12-31');
      }
    };
    
    // 按日期排序 - 未来活动在前，过期活动在后
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 重置到当天00:00
    
    const sortedEvents = events.sort((a: any, b: any) => {
      const dateA = parseDateForSorting(a.date || '');
      const dateB = parseDateForSorting(b.date || '');
      
      // 判断是否过期（设置到当天00:00进行比较）
      const dateANormalized = new Date(dateA);
      dateANormalized.setHours(0, 0, 0, 0);
      const dateBNormalized = new Date(dateB);
      dateBNormalized.setHours(0, 0, 0, 0);
      
      const isAExpired = dateANormalized < today;
      const isBExpired = dateBNormalized < today;
      
      // 未来活动 vs 过期活动
      if (!isAExpired && isBExpired) {
        return -1; // A在前
      }
      if (isAExpired && !isBExpired) {
        return 1; // B在前
      }
      
      // 同类活动按时间升序
      return dateA.getTime() - dateB.getTime();
    });
    
    // 转换数据格式以适配 UniversalStaticPageTemplate
    const formattedEvents = sortedEvents.map((event: any) => ({
      id: event.id,
      title: event.name || event.title,
      name: event.name || event.title,
      date: event.date,
      location: event.location || event.address,
      venue: event.venue,
      likes: event.likes || 0,
      description: event.description || '',
      website: event.website,
      image: event.image, // 添加图片字段
      detailLink: event.detailLink || `/${regionKey}/${activityKey}/activity-${event.id.slice(-8)}`
    }));

    return formattedEvents;
    
  } catch (error) {
    console.error(`获取${regionKey}地区${activityKey}数据失败:`, error);
    return [];
  }
}

// 获取三层页面的第一个活动（用于生成器）
export async function getFirstActivityFromThirdLayer(
  regionKey: keyof typeof REGION_MAP,
  activityKey: keyof typeof ACTIVITY_TYPE_MAP
) {
  try {
    const events = await getStaticRegionActivityData(regionKey, activityKey);
    return events.length > 0 ? events[0] : null;
  } catch (error) {
    console.error(`获取${regionKey}地区${activityKey}第一个活动失败:`, error);
    return null;
  }
} 


