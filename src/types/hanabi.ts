// 花火大会数据结构类型定义

export interface HanabiStation {
  name: string;
  lines: string[];
  walkTime: string;
}

export interface HanabiVenue {
  name: string;
  location: string;
  startTime: string;
  features?: string[];
}

export interface HanabiAccess {
  venue: string;
  stations: HanabiStation[];
}

export interface HanabiViewingSpot {
  name: string;
  rating: number;
  crowdLevel: string;
  tips: string;
  pros: string[];
  cons: string[];
}

export interface HanabiHistory {
  established: number;
  significance: string;
  highlights: string[];
}

export interface HanabiTipCategory {
  category: string;
  items: string[];
}

export interface HanabiContact {
  organizer: string;
  phone: string;
  website: string;
  socialMedia: string;
  walkerPlusUrl?: string;
}

export interface HanabiMapInfo {
  hasMap: boolean;
  mapNote: string;
  parking: string;
  googleMapsUrl?: string;
}

export interface HanabiWeatherInfo {
  month: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  recommendation: string;
  rainPolicy?: string;
  note?: string;
}

export interface HanabiSpecialFeatures {
  scale?: string;
  location?: string;
  tradition?: string;
  atmosphere?: string;
  collaboration?: string;
}

export interface HanabiSpecial2025 {
  theme?: string;
  concept?: string;
  memorial?: string;
  features?: string[];
}

// 媒体内容类型定义
export interface HanabiMedia {
  type: 'image' | 'video';
  url: string;
  title: string;        // 必需：图片标题
  description?: string; // 可选：图片描述
  alt?: string;         // 可选：替代文本
  caption?: string;     // 可选：图片说明
  thumbnail?: string;   // 可选：视频缩略图
  duration?: string;    // 可选：视频时长
}

// 关联推荐项目类型
export interface HanabiRecommendation {
  id: string;
  name: string;
  date: string;
  location: string;
  visitors: string;
  link: string;
}

// 关联推荐集合类型
export interface HanabiRelated {
  regionRecommendations: HanabiRecommendation[];
  timeRecommendations: HanabiRecommendation[];
  sameMonth?: string[];
  sameRegion?: string[];
  recommended?: string[];
}

// 新增动态数据字段
export interface HanabiDynamicData {
  // Walker Plus 数据源字段
  popularity: {
    wantToGo: number; // 想去参加数
    wentAndGood: number; // 参加评价数
    lastUpdated: string; // 最后更新时间
  };

  // 实时更新字段
  schedule: {
    confirmed: boolean; // 是否确认举办
    dateStatus: 'confirmed' | 'tentative' | 'cancelled';
    updates: string[]; // 最新更新信息
  };

  // 票务信息
  ticketing: {
    salesStart: string; // 开始销售时间
    salesEnd: string; // 销售截止时间
    availability: 'available' | 'sold-out' | 'not-yet';
    officialUrl?: string; // 官方票务链接
  };

  // 会场详细信息
  venueDetails: {
    capacity?: number; // 容纳人数
    facilities: string[]; // 设施信息
    restrictions: string[]; // 限制事项
  };

  // 数据源信息
  dataSources: {
    primary: string; // 主要数据源
    lastSync: string; // 最后同步时间
    verification: boolean; // 数据验证状态
  };
}

export interface HanabiData {
  // 🚨 数据库中实际存在的十二项字段
  id: string; // 数据库ID
  name: string; // 1. 名称
  address: string; // 2. 所在地
  datetime: string; // 3. 开催期间时间
  venue: string; // 4. 开催场所
  access: string; // 5. 交通方式
  organizer: string; // 6. 主办方
  price: string; // 7. 料金
  contact: string; // 8. 联系方式
  website: string; // 9. 官方网站
  googleMap: string; // 10. 谷歌地图位置
  region: string; // 11. 地区
  description?: string; // 12. 活动简介（可选）

  // 🎯 模板显示需要的最小字段（固定值）
  themeColor?: string; // 主题颜色（固定为red）
  status?: string; // 状态（固定为scheduled）

  // 🖼️ 媒体文件（上传的图片）
  media?: HanabiMedia[];
}

// 保持向后兼容的类型别名
export interface Venue extends HanabiVenue {}
export interface Station extends HanabiStation {}
export interface Access {
  venue: string;
  stations: HanabiStation[];
}
export interface ViewingSpot extends HanabiViewingSpot {}
export interface History {
  established: number;
  significance: string;
  highlights: string[];
}

export interface TipCategory {
  category: string;
  items: string[];
}

export interface Contact extends HanabiContact {}

export interface MapInfo {
  hasMap: boolean;
  mapNote: string;
  parking: string;
  googleMapsUrl?: string;
}

export interface WeatherInfo extends HanabiWeatherInfo {}

export interface SpecialFeatures {
  scale: string;
  location: string;
  tradition: string;
  atmosphere: string;
}
