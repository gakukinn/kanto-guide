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
}

export interface HanabiMapInfo {
 hasMap: boolean;
 mapNote: string;
 parking: string;
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
 title: string;
 description: string;
 thumbnail?: string; // 视频缩略图（可选）
 duration?: string; // 视频时长（可选）
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
 id: string;
 name: string;
 japaneseName?: string;
 englishName: string;
 year: number;
 date: string;
 time: string;
 duration: string;
 fireworksCount: string;
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
 typeTag: string; // 活动类型标签：花火
 layerTag: string; // 层级标签：Layer 4详情页
 };
 
 // 关联推荐
 related: HanabiRelated;
 
 // 动态数据字段
 dynamicData?: HanabiDynamicData;
 
 venues: HanabiVenue[];
 access: HanabiAccess[];
 viewingSpots: HanabiViewingSpot[];
 history: HanabiHistory;
 tips: HanabiTipCategory[];
 contact: HanabiContact;
 mapInfo: HanabiMapInfo;
 weatherInfo: HanabiWeatherInfo;
 specialFeatures?: HanabiSpecialFeatures;
 special2025?: HanabiSpecial2025;
 
 // 地图嵌入URL
 mapEmbedUrl?: string;
 
 // 媒体内容（视频和图片）
 media?: HanabiMedia[];
 
 // 月份（用于面包屑导航）
 month: number;
 
 // 官方网站
 website?: string;

 // 官方数据源验证
 officialSource?: {
   walkerPlusUrl: string;
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
}

export interface WeatherInfo extends HanabiWeatherInfo {}

export interface SpecialFeatures {
 scale: string;
 location: string;
 tradition: string;
 atmosphere: string;
} 