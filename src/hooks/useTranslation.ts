// 直接定义翻译对象避免导入问题
const messages = {
  "navigation": {
    "home": "首页",
    "activities": "活动"
  },
  "regions": {
    "tokyo": "东京都",
    "saitama": "埼玉县",
    "chiba": "千叶县", 
    "kanagawa": "神奈川",
    "kitakanto": "北关东",
    "koshinetsu": "甲信越"
  },
  "activities": {
    "hanabi": "花火大会",
    "matsuri": "夏日祭典",
    "hanami": "花见会",
    "culture": "文化艺术",
    "momiji": "红叶狩",
    "illumination": "灯光秀"
  },
  "hanabi": {
    "fireworksCount": "烟花数量",
    "fireworksTime": "燃放时间",
    "expectedVisitors": "预计观众",
    "date": "举办日期",
    "time": "举办时间",
    "weatherInfo": "雨天安排",
    "price": "门票信息",
    "foodStalls": "小吃摊位",
    "notes": "其他说明",
    "venue": "举办地点",
    "access": "交通方式",
    "parking": "停车场",
    "contact": "联系方式",
    "highlights": "精彩看点",
    "basicInfo": "花火大会信息",
    "venueInfo": "会场・联系信息",
    "activityIntro": "活动简介",
    "locationMap": "位置地图"
  },
  "matsuri": {
    "reservationSystem": "预约制度",
    "viewingPoints": "观赏点",
    "expectedVisitors": "预计观众",
    "date": "举办日期",
    "time": "举办时间",
    "weatherInfo": "雨天安排",
    "price": "门票信息",
    "foodStalls": "小吃摊位",
    "notes": "其他说明",
    "venue": "举办地点",
    "access": "交通方式",
    "parking": "停车场",
    "contact": "联系方式",
    "highlights": "精彩看点",
    "basicInfo": "祭典信息",
    "venueInfo": "会场・联系信息",
    "activityIntro": "活动简介",
    "locationMap": "位置地图"
  },
  "common": {
    "seeOfficial": "详见官网",
    "pleaseCheckOfficial": "请以官方信息为准",
    "noImage": "暂无图片"
  }
};

type Messages = typeof messages;

// 递归获取嵌套对象的值
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // 如果找不到，返回原始key
    }
  }
  
  return typeof current === 'string' ? current : path;
}

// 创建翻译hook
export function useTranslation() {
  const t = (key: string): string => {
    return getNestedValue(messages, key);
  };
  
  return { t };
}

// 为了兼容现有代码，创建两个别名函数
export function useTranslations(namespace: string) {
  const t = (key: string): string => {
    const fullPath = `${namespace}.${key}`;
    const result = getNestedValue(messages, fullPath);
    
    // 如果找不到翻译，返回key而不是完整路径
    if (result === fullPath) {
      return key; // 返回最后的key部分
    }
    
    return result;
  };
  
  return t;
}

// 导出翻译消息类型（用于TypeScript支持）
export type TranslationMessages = Messages; 