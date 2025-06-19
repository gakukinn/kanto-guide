// 文化艺术活动数据结构类型定义

export interface CultureArtStation {
  name: string;
  lines: string[];
  walkTime: string;
}

export interface CultureArtVenue {
  name: string;
  location: string;
  startTime: string;
  features?: string[];
}

export interface CultureArtAccess {
  venue: string;
  stations: CultureArtStation[];
}

export interface CultureArtViewingSpot {
  name: string;
  rating: number;
  crowdLevel: string;
  tips: string;
  pros: string[];
  cons: string[];
}

export interface CultureArtHistory {
  established: number;
  significance: string;
  highlights: string[];
}

export interface CultureArtTipCategory {
  category: string;
  items: string[];
}

export interface CultureArtContact {
  organizer: string;
  phone: string;
  website: string;
  socialMedia: string;
  ticketUrl?: string;
}

export interface CultureArtMapInfo {
  hasMap: boolean;
  mapNote: string;
  parking: string;
}

export interface CultureArtWeatherInfo {
  month: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  recommendation: string;
  indoorVenue?: boolean;
  note?: string;
}

export interface CultureArtSpecialFeatures {
  artistLevel?: string;
  artForm?: string;
  tradition?: string;
  atmosphere?: string;
  collaboration?: string;
}

export interface CultureArtSpecial2025 {
  theme?: string;
  concept?: string;
  memorial?: string;
  features?: string[];
}

// 媒体内容类型定义
export interface CultureArtMedia {
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  alt?: string;
  caption?: string;
  thumbnail?: string; // 视频缩略图（可选）
  duration?: string; // 视频时长（可选）
}

// 关联推荐项目类型
export interface CultureArtRecommendation {
  id: string;
  name: string;
  date: string;
  location: string;
  visitors: string;
  link: string;
}

// 关联推荐集合类型
export interface CultureArtRelated {
  regionRecommendations: CultureArtRecommendation[];
  timeRecommendations: CultureArtRecommendation[];
  sameMonth?: string[];
  sameRegion?: string[];
  recommended?: string[];
}

// 新增动态数据字段
export interface CultureArtDynamicData {
  // 票务信息
  ticketing: {
    salesStart: string; // 开始销售时间
    salesEnd: string; // 销售截止时间
    availability: 'available' | 'sold-out' | 'not-yet';
    officialUrl?: string; // 官方票务链接
    priceRange?: string; // 价格范围
  };

  // 实时更新字段
  schedule: {
    confirmed: boolean; // 是否确认举办
    dateStatus: 'confirmed' | 'tentative' | 'cancelled';
    updates: string[]; // 最新更新信息
  };

  // 会场详细信息
  venueDetails: {
    capacity?: number; // 容纳人数
    facilities: string[]; // 设施信息
    restrictions: string[]; // 限制事项
    accessibility?: string[]; // 无障碍设施
  };

  // 艺术家/演出者信息
  performers: {
    artists: string[]; // 主要艺术家
    genres: string[]; // 艺术类型
    experience: string; // 经验水平
  };

  // 数据源信息
  dataSources: {
    primary: string; // 主要数据源
    lastSync: string; // 最后同步时间
    verification: boolean; // 数据验证状态
  };
}

export interface CultureArtData {
  id: string;
  name: string; // 中文名称（主要显示）
  englishName?: string; // 英文名称

  // 内部参考字段（日文源数据）
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
  year: number;
  date: string;
  displayDate?: string; // 用于用户友好显示的日期格式
  time: string;
  duration: string;
  artType: string; // 艺术类型（替代fireworksCount）
  expectedVisitors: string;
  weather: string;
  ticketPrice: string;
  status: string;
  ranking?: string;
  themeColor: string; // 主题颜色

  // 新增title和description字段用于元数据
  title?: string; // 页面标题元数据
  description?: string; // 页面描述元数据

  // 新增标签系统
  tags: {
    timeTag: string; // 时间标签：7月、8月、9月、10月
    regionTag: string; // 地区标签：东京都、神奈川县、千叶县等
    typeTag: string; // 活动类型标签：文化艺术
    layerTag: string; // 层级标签：Layer 4详情页
  };

  // 关联推荐
  related: CultureArtRelated;

  // 动态数据字段
  dynamicData?: CultureArtDynamicData;

  venues: CultureArtVenue[];
  access: CultureArtAccess[];
  viewingSpots: CultureArtViewingSpot[];
  history: CultureArtHistory;
  tips: CultureArtTipCategory[];
  contact: CultureArtContact;
  mapInfo: CultureArtMapInfo;
  weatherInfo: CultureArtWeatherInfo;
  specialFeatures?: CultureArtSpecialFeatures;
  special2025?: CultureArtSpecial2025;

  // 地图嵌入URL
  mapEmbedUrl?: string;

  // 媒体内容（视频和图片）
  media?: CultureArtMedia[];

  // 月份（用于面包屑导航）
  month: number;

  // 官方网站
  website?: string;

  // 官方数据源验证
  officialSource?: {
    sourceUrl: string;
    verificationDate: string;
    dataConfirmedBy: 'USER_PROVIDED';
    lastChecked: string;
  };

  // 数据完整性检查
  dataIntegrityCheck?: {
    hasOfficialSource: boolean;
    userVerified: boolean;
    lastValidated: string;
  };

  // 数据源URL（用于SEO和验证）
  dataSourceUrl?: string;
}

// 兼容性类型定义（保持向后兼容）
export interface Venue extends CultureArtVenue {}
export interface Station extends CultureArtStation {}
export interface Access {
  venue: string;
  stations: CultureArtStation[];
}

export interface ViewingSpot extends CultureArtViewingSpot {}
export interface History {
  established: number;
  significance: string;
  highlights: string[];
}

export interface TipCategory {
  category: string;
  items: string[];
}

export interface Contact extends CultureArtContact {}

export interface MapInfo {
  hasMap: boolean;
  mapNote: string;
  parking: string;
}

export interface WeatherInfo extends CultureArtWeatherInfo {}

export interface SpecialFeatures {
  artistLevel: string;
  artForm: string;
  tradition: string;
  atmosphere: string;
}
