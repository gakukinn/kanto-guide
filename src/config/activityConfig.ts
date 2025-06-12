// 通用活动配置系统 - 支持所有月份的各种活动

export interface ActivityEvent {
 id: string;
 name: string;
 englishName: string;
 date: string;
 specificDate: string;
 time: string;
 location: string;
 area: string;
 visitors: string;
 capacity?: string;
 highlights: string[];
 level: 'primary' | 'secondary';
 crowdLevel: 'high' | 'medium' | 'low';
 station: string;
 walkingTime: string;
 mapUrl: string;
 image: string;
 category?: string; // 活动分类：hanabi, matsuri, festivals等
}

export interface RegionInfo {
 name: string;
 englishName: string;
 icon: string;
 description: string;
 urlSlug: string;
 features: {
 icon: string;
 title: string;
 description: string;
 }[];
 navigationLinks: {
 label: string;
 href: string;
 isPrimary?: boolean;
 }[];
}

export interface ActivityCategory {
 id: string;
 name: string;
 description: string;
 icon: string;
 template: string; // 使用的模板类型
 regions: string[]; // 支持的地区
}

export interface MonthActivityConfig {
 monthId: number;
 activities: {
 [activityId: string]: {
 category: ActivityCategory;
 regions: {
 [regionId: string]: {
 info: RegionInfo;
 events: ActivityEvent[];
 };
 };
 };
 };
}

// 标准地区配置
export const standardRegions = {
 tokyo: {
 name: '东京',
 englishName: 'Tokyo',
 icon: '🗼',
 urlSlug: 'tokyo'
 },
 kanagawa: {
 name: '神奈川',
 englishName: 'Kanagawa',
 icon: '🌊',
 urlSlug: 'kanagawa'
 },
 chiba: {
 name: '千叶',
 englishName: 'Chiba',
 icon: '🏖️',
 urlSlug: 'chiba'
 },
 saitama: {
 name: '埼玉',
 englishName: 'Saitama',
 icon: '🌸',
 urlSlug: 'saitama'
 },
 koshinetsu: {
 name: '甲越信',
 englishName: 'Koshinetsu',
 icon: '🏔️',
 urlSlug: 'koshinetsu'
 },
 kitakanto: {
 name: '北关东',
 englishName: 'Kita-Kanto',
 icon: '🌿',
 urlSlug: 'kitakanto'
 }
};

// 活动类型定义
export const activityCategories = {
 hanabi: {
 id: 'hanabi',
 name: '花火大会',
 description: '夏日烟花的绚烂盛典',
 icon: '🎆',
 template: 'regional',
 // 固定地区顺序：第一行：东京，埼玉，千叶 第二行：神奈川，北关东，甲越信
 regions: ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu']
 },
 matsuri: {
 id: 'matsuri',
 name: '夏日祭典',
 description: '传统夏季祭典活动',
 icon: '🏮',
 template: 'regional',
 // 固定地区顺序：第一行：东京，埼玉，千叶 第二行：神奈川，甲越信，北关东
 regions: ['tokyo', 'saitama', 'chiba', 'kanagawa', 'koshinetsu', 'kitakanto']
 },
 festivals: {
 id: 'festivals',
 name: '特色节庆',
 description: '各地独特的节庆活动',
 icon: '🌻',
 template: 'regional',
 // 固定地区顺序：第一行：东京，埼玉，千叶 第二行：神奈川，甲越信，北关东
 regions: ['tokyo', 'saitama', 'chiba', 'kanagawa', 'koshinetsu', 'kitakanto']
 }
};

// 工具函数
export const getActivityPath = (monthId: number, activityId: string, regionId?: string, eventId?: string): string => {
 const monthNames = ['', 'january', 'february', 'march', 'april', 'may', 'june', 
 'july', 'august', 'september', 'october', 'november', 'december'];
 
 let path = `/${monthNames[monthId]}/${activityId}`;
 if (regionId) path += `/${regionId}`;
 if (eventId) path += `/${eventId}`;
 
 return path;
};

export const getMonthName = (monthId: number): { chinese: string; traditional: string; urlPath: string } => {
 const monthData: { chinese: string; traditional: string; urlPath: string }[] = [
 { chinese: '', traditional: '', urlPath: '' }, // 0
 { chinese: '一月', traditional: '睦月', urlPath: 'january' },
 { chinese: '二月', traditional: '如月', urlPath: 'february' },
 { chinese: '三月', traditional: '弥生', urlPath: 'march' },
 { chinese: '四月', traditional: '卯月', urlPath: 'april' },
 { chinese: '五月', traditional: '皐月', urlPath: 'may' },
 { chinese: '六月', traditional: '水無月', urlPath: 'june' },
 { chinese: '七月', traditional: '文月', urlPath: 'july' },
 { chinese: '八月', traditional: '葉月', urlPath: 'august' },
 { chinese: '九月', traditional: '長月', urlPath: 'september' },
 { chinese: '十月', traditional: '神無月', urlPath: 'october' },
 { chinese: '十一月', traditional: '霜月', urlPath: 'november' },
 { chinese: '十二月', traditional: '師走', urlPath: 'december' }
 ];
 
 return monthData[monthId] || { chinese: '', traditional: '', urlPath: '' };
}; 