// 活动分类自动识别工具
export type ActivityType = 'hanabi' | 'matsuri' | 'hanami' | 'momiji' | 'illumination' | 'culture';

export interface ActivityClassification {
  type: ActivityType;
  confidence: number; // 置信度 0-100
  reason: string; // 分类原因
  keywords: string[]; // 匹配的关键词
}

// 活动分类关键词配置
const CLASSIFICATION_RULES: Record<string, {
  name: string;
  keywords: string[];
  excludeKeywords: string[];
  weight: number;
  priority: number; // 🔥 优先级字段
}> = {
  hanabi: {
    name: '花火大会',
    keywords: [
      // 直接关键词（高权重）
      '花火', '花火大会', 'はなび', 'ハナビ', 'fireworks',
      // 特定花火活动词汇
      '夏祭り', '夏祭典', '大花火', '花火祭', '花火フェス',
      // 花火相关场所
      '河川敷', '海岸', '湖畔', '川下', '河畔'
    ],
    excludeKeywords: [], // 排除关键词
    weight: 1.0,
    priority: 100 // 🔥 最高优先级：包含花火关键词必须优先识别为花火大会
  },
  
  momiji: {
    name: '红叶狩',
    keywords: [
      // 红叶核心词汇
      '紅葉', 'もみじ', 'モミジ', 'autumn leaves',
      // 红叶活动
      '紅葉狩り', 'もみじ狩り', '紅葉祭', 'もみじ祭典',
      // 红叶场所
      '紅葉山', 'もみじ谷', '紅葉の名所', '楓'
    ],
    excludeKeywords: ['花火', 'はなび', 'ハナビ'],
    weight: 1.0,
    priority: 90 // 🔥 第二优先级
  },
  
  illumination: {
    name: '灯光秀',
    keywords: [
      // 灯光核心词汇
      'イルミネーション', 'ライトアップ', 'LED', 'illumination',
      // 灯光活动
      '光の祭典', 'ひかり祭典', 'ライトフェス', '電飾',
      // 灯光场所
      '夜景', 'ナイトビュー', '光の庭', '電球'
    ],
    excludeKeywords: ['花火', 'はなび', 'ハナビ'],
    weight: 1.0,
    priority: 80 // 🔥 第三优先级
  },

  hanami: {
    name: '花见会',
    keywords: [
      // 花见核心词汇
      '花見', '桜', 'さくら', 'サクラ', 'cherry blossom',
      // 花见活动
      '桜祭り', '桜祭典', '花見祭', 'お花見',
      // 花见场所
      '桜並木', '桜公園', '桜の名所', '桜坂',
      // 其他花卉
      '梅', '菜の花', 'チューリップ', 'ツツジ', '藤',
      // 🔥 紫阳花相关关键词
      'あじさい', 'アジサイ', '紫陽花', 'hydrangea'
    ],
    excludeKeywords: ['花火', 'はなび', 'ハナビ'], // 🔥 排除花火关键词
    weight: 1.0,
    priority: 70 // 🔥 第四优先级
  },
  
  matsuri: {
    name: '传统祭典',
    keywords: [
      // 祭典核心词汇
      '祭', '祭り', '祭典', 'マツリ', 'festival',
      // 传统祭典活动
      '納涼祭', '夏祭り', '秋祭り', '春祭り', '冬祭り',
      // 祭典元素
      '神輿', '山車', '屋台', '盆踊り', '太鼓',
      // 祭典场所
      '神社', '寺院', '境内', '参道'
    ],
    excludeKeywords: ['花火', 'はなび', 'ハナビ', '紅葉', 'もみじ', 'イルミネーション', '桜', 'あじさい'],
    weight: 1.0,
    priority: 60 // 🔥 第五优先级
  },
  
  culture: {
    name: '文化艺术',
    keywords: [
      // 文化核心词汇
      '文化', '芸術', '美術', 'culture', 'art',
      // 文化活动
      '展覧会', '展示会', 'アート', 'ギャラリー',
      // 文化场所
      '美術館', '博物館', '文化会館', '劇場',
      // 艺术形式
      '絵画', '彫刻', '音楽', '演劇', 'コンサート'
    ],
    excludeKeywords: ['花火', 'はなび', 'ハナビ', '紅葉', 'もみじ', 'イルミネーション', '桜', 'あじさい', '祭'],
    weight: 1.0,
    priority: 50 // 🔥 最低优先级
  }
};

/**
 * 自动识别活动分类
 * @param textData 文本识别的活动数据
 * @param manualOverride 用户手动选择的活动类型，如果提供则优先使用
 * @returns 分类结果
 */
export function classifyActivity(textData: {
  name: string;
  address?: string;
  venue?: string;
  organizer?: string;
  website?: string;
}, manualOverride?: ActivityType): ActivityClassification {
  
  // 🔥 如果用户手动选择了活动类型，直接返回用户选择的结果
  if (manualOverride) {
    return {
      type: manualOverride,
      confidence: 100,
      reason: '用户手动选择',
      keywords: []
    };
  }
  
  const searchText = [
    textData.name,
    textData.venue || '',
    textData.organizer || '',
    textData.website || ''
  ].join(' ').toLowerCase();
  
  // 🔥 首先检查是否包含花火关键词，如果包含则直接返回花火分类
  const hanabiKeywords = ['花火', 'はなび', 'ハナビ', 'fireworks'];
  const matchedHanabiKeywords = hanabiKeywords.filter(keyword => 
    searchText.includes(keyword.toLowerCase())
  );
  
  if (matchedHanabiKeywords.length > 0) {
    return {
      type: 'hanabi',
      confidence: 100,
      reason: `包含花火关键词，自动识别为花火大会: ${matchedHanabiKeywords.join(', ')}`,
      keywords: matchedHanabiKeywords
    };
  }
  
  const classifications: Array<{
    type: ActivityType;
    score: number;
    matchedKeywords: string[];
    reason: string;
    priority: number;
  }> = [];
  
  // 对每种活动类型进行评分
  for (const [type, config] of Object.entries(CLASSIFICATION_RULES)) {
    let score = 0;
    const matchedKeywords: string[] = [];
    
    // 检查关键词匹配
    for (const keyword of config.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        score += config.weight;
        matchedKeywords.push(keyword);
      }
    }
    
    // 检查排除关键词
    for (const excludeKeyword of config.excludeKeywords) {
      if (searchText.includes(excludeKeyword.toLowerCase())) {
        score = 0; // 🔥 如果包含排除关键词，直接将分数设为0
        break;
      }
    }
    
    if (score > 0) {
      classifications.push({
        type: type as ActivityType,
        score,
        matchedKeywords,
        reason: `匹配关键词: ${matchedKeywords.join(', ')}`,
        priority: config.priority
      });
    }
  }
  
  // 🔥 按优先级和得分排序：优先级高的优先，同优先级按得分排序
  classifications.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // 优先级高的在前
    }
    return b.score - a.score; // 同优先级按得分排序
  });
  
  if (classifications.length === 0) {
    // 如果没有匹配，默认为文化艺术
    return {
      type: 'culture',
      confidence: 30,
      reason: '未找到明确分类关键词，默认归类为文化艺术',
      keywords: []
    };
  }
  
  const topClassification = classifications[0];
  const confidence = Math.min(95, Math.round((topClassification.score / 3) * 100)); // 最高95%
  
  return {
    type: topClassification.type,
    confidence,
    reason: topClassification.reason,
    keywords: topClassification.matchedKeywords
  };
}

/**
 * 获取活动类型的中文名称
 */
export function getActivityTypeName(type: ActivityType): string {
  const names = {
    hanabi: '花火大会',
    matsuri: '传统祭典',
    hanami: '花见会',
    momiji: '红叶狩',
    illumination: '灯光秀',
    culture: '文化艺术'
  };
  return names[type];
}

/**
 * 获取对应的Prisma模型名称
 */
export function getPrismaModelName(type: ActivityType): string {
  const models = {
    hanabi: 'hanabiEvent',
    matsuri: 'matsuriEvent', 
    hanami: 'hanamiEvent',
    momiji: 'momijiEvent',
    illumination: 'illuminationEvent',
    culture: 'cultureEvent'
  };
  return models[type];
} 