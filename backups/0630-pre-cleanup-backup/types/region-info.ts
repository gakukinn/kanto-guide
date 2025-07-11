// 地区信息接口
export interface RegionInfo {
  name: string;
  icon: string;
  description: string;
  totalEvents?: number; // 可选字段，避免数量统计的维护麻烦
  nextRegion: string;
  previousRegion: string;
  features?: RegionFeature[];
}

// 地区特色接口
export interface RegionFeature {
  icon: string;
  title: string;
  description: string;
}

// 月份信息接口
export interface MonthInfo {
  month: string;
  monthName: string;
  urlPath: string;
}

// 花火事件接口
export interface HanabiEvent {
  id: string;
  name: string; // 中文名称（主要显示）
  englishName?: string; // 英文名称

  // 内部参考字段（日文源数据）
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };

  date: string;
  location: string;
  visitors: string;
  fireworks: string;
  likes: number;
  imageUrl: string;
  category: string;
  slug: string;
  area: string;
  level?: 'primary' | 'secondary';
  crowdLevel?: 'high' | 'medium' | 'low';
  station: string;
  walkingTime: string;
  specificDate: string;
  detailLink?: string;
}

// 活动事件信息接口（向后兼容）
export interface EventInfo {
  id: string;
  name: string;
  specificDate: string;
  area: string;
  level: 'S' | 'A' | 'B' | 'C';
  crowdLevel: 'S' | 'A' | 'B' | 'C';
  likes: number;
  station: string;
  walkingTime: string;
  detailLink: string;
}
