import { useJapaneseTranslation } from './useJapaneseTranslation';

// 扩展的翻译词典，专门针对四层页面数据
const walkerPlusTranslations: Record<string, string> = {
  // 花火相关数据格式
  '約': '约',
  '万発': '万发',
  '千発': '千发',
  '発': '发',
  '万人': '万人',
  '千人': '千人',
  '人': '人',
  
  // 时间格式
  '月': '月',
  '日': '日',
  '時': '时',
  '分': '分',
  '秒': '秒',
  '(土)': '(周六)',
  '(日)': '(周日)',
  '(月)': '(周一)',
  '(火)': '(周二)',
  '(水)': '(周三)',
  '(木)': '(周四)',
  '(金)': '(周五)',
  
  // 地点和交通
  '駅': '站',
  '南口': '南口',
  '北口': '北口',
  '東口': '东口',
  '西口': '西口',
  'から': '从',
  'まで': '到',
  '徒歩': '步行',
  'バス': '巴士',
  '電車': '电车',
  'JR': 'JR',
  '京成': '京成',
  
  // 常用词汇
  'あり': '有',
  'なし': '无',
  '×': '无',
  '○': '有',
  '詳見官網': '详见官网',
  '詳細': '详情',
  '公式': '官方',
  '官方网站': '官方网站',
  
  // 价格相关
  '円': '日元',
  '無料': '免费',
  '有料': '收费',
  '席': '席位',
  '当日': '当日',
  '前売': '预售',
  
  // 具体活动名称翻译
  '花火大会': '花火大会',
  '市民': '市民',
  '納涼': '纳凉',
  '夏祭り': '夏日祭典',
  '夜景': '夜景',
  '競馬場': '竞马场',
};

// 地名翻译词典
const placeNameTranslations: Record<string, string> = {
  // 东京地区
  '市川': '市川',
  '市川駅': '市川站',
  '本八幡駅': '本八幡站',
  '江戸川': '江户川',
  '河川敷': '河滩',
  '府中競馬場': '府中竞马场',
  '東京競馬場': '东京竞马场',
  
  // 交通站点
  '大州防災公園': '大州防灾公园',
  '停留所': '站台',
  
  // 通用地点词汇
  '会場': '会场',
  '会場周辺': '会场周边',
  '周辺': '周边',
  '河川敷': '河滩',
  '公園': '公园',
  '駐車場': '停车场',
};

export function useDataTranslation() {
  const { translateJapanese } = useJapaneseTranslation();
  
  // 翻译活动名称（保留汉字，翻译假名）
  const translateActivityName = (name: string): string => {
    if (!name) return name;
    
    let translated = name;
    
    // 应用WalkerPlus特定翻译
    Object.entries(walkerPlusTranslations).forEach(([jp, cn]) => {
      const regex = new RegExp(jp, 'g');
      translated = translated.replace(regex, cn);
    });
    
    // 应用地名翻译
    Object.entries(placeNameTranslations).forEach(([jp, cn]) => {
      const regex = new RegExp(jp, 'g');
      translated = translated.replace(regex, cn);
    });
    
    return translated;
  };
  
  // 翻译基本信息字段
  const translateBasicInfo = (text: string): string => {
    if (!text) return text;
    
    let translated = text;
    
    // 首先应用WalkerPlus翻译
    Object.entries(walkerPlusTranslations).forEach(([jp, cn]) => {
      const regex = new RegExp(jp, 'g');
      translated = translated.replace(regex, cn);
    });
    
    // 然后应用地名翻译
    Object.entries(placeNameTranslations).forEach(([jp, cn]) => {
      const regex = new RegExp(jp, 'g');
      translated = translated.replace(regex, cn);
    });
    
    // 最后应用通用日文翻译
    translated = translateJapanese(translated);
    
    return translated;
  };
  
  // 翻译复杂文本（描述、交通信息等）
  const translateComplexText = (text: string): string => {
    if (!text) return text;
    
    // 处理多行文本
    const lines = text.split('\n');
    const translatedLines = lines.map(line => translateBasicInfo(line));
    
    return translatedLines.join('\n');
  };
  
  // 翻译WalkerPlus数据对象
  const translateWalkerPlusData = (data: any) => {
    if (!data) return data;
    
    return {
      ...data,
      // 翻译活动名称
      name: translateActivityName(data.name),
      
      // 翻译基本信息字段
      fireworksCount: translateBasicInfo(data.fireworksCount),
      fireworksTime: translateBasicInfo(data.fireworksTime),
      expectedVisitors: translateBasicInfo(data.expectedVisitors),
      date: translateBasicInfo(data.date),
      time: translateBasicInfo(data.time),
      venue: translateBasicInfo(data.venue),
      weatherInfo: translateBasicInfo(data.weatherInfo),
      parking: translateBasicInfo(data.parking),
      price: translateComplexText(data.price),
      contact: translateBasicInfo(data.contact),
      foodStalls: translateBasicInfo(data.foodStalls),
      notes: translateBasicInfo(data.notes),
      
      // 翻译复杂文本字段
      access: translateComplexText(data.access),
      description: translateComplexText(data.description),
      highlights: translateComplexText(data.highlights),
    };
  };
  
  return {
    translateActivityName,
    translateBasicInfo,
    translateComplexText,
    translateWalkerPlusData,
  };
} 