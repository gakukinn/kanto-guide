// 测试活动分类识别功能 - 直接复制逻辑代码

// 活动分类关键词配置
const CLASSIFICATION_RULES = {
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
    weight: 1.0
  },
  
  matsuri: {
    name: '传统祭典',
    keywords: [
      // 祭典核心词汇
      '祭', '祭り', '祭典', 'マツリ', 'festival',
      // 传统祭典类型
      '神社祭', '寺院祭', '地域祭', '伝統祭', '郷土祭',
      // 特定祭典名称
      '祇園祭', '天神祭', '神田祭', '山王祭', '三社祭',
      // 祭典活动
      '神輿', '山車', '踊り', '太鼓', '獅子舞', '盆踊り',
      // 传统季节活动
      '納涼', '納涼祭', '涼み', '夕涼み'
    ],
    excludeKeywords: [], // 移除花火排除规则，带有祭典的一律视为传统祭典
    weight: 1.2 // 提高权重，确保祭典优先级最高
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
      '梅', '菜の花', 'チューリップ', 'ツツジ', '藤'
    ],
    excludeKeywords: [],
    weight: 1.0
  }
};

/**
 * 自动识别活动分类
 */
function classifyActivity(textData) {
  const searchText = [
    textData.name,
    textData.venue || '',
    textData.organizer || '',
    textData.website || ''
  ].join(' ').toLowerCase();
  
  console.log(`  搜索文本: "${searchText}"`);
  
  const classifications = [];
  
  // 对每种活动类型进行评分
  for (const [type, config] of Object.entries(CLASSIFICATION_RULES)) {
    let score = 0;
    const matchedKeywords = [];
    
    console.log(`  检查类型: ${type} (${config.name})`);
    
    // 检查关键词匹配
    for (const keyword of config.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        score += config.weight;
        matchedKeywords.push(keyword);
        console.log(`    匹配关键词: "${keyword}" (得分+${config.weight})`);
      }
    }
    
    // 检查排除关键词
    for (const excludeKeyword of config.excludeKeywords) {
      if (searchText.includes(excludeKeyword.toLowerCase())) {
        score -= 0.5; // 减分
        console.log(`    排除关键词: "${excludeKeyword}" (得分-0.5)`);
      }
    }
    
    console.log(`    ${type} 总得分: ${score}`);
    
    if (score > 0) {
      classifications.push({
        type: type,
        score,
        matchedKeywords,
        reason: `匹配关键词: ${matchedKeywords.join(', ')}`
      });
    }
  }
  
  // 按得分排序
  classifications.sort((a, b) => b.score - a.score);
  
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

// 测试数据
const testActivities = [
  {
    name: '葛飾納涼花火大会（かつしかのうりょうはなびたいかい）',
    venue: '葛飾区',
    organizer: '葛飾区',
    website: ''
  },
  {
    name: '隅田川花火大会',
    venue: '隅田川',
    organizer: '台東区',
    website: ''
  },
  {
    name: '三社祭',
    venue: '浅草神社',
    organizer: '浅草神社',
    website: ''
  }
];

console.log('=== 活动分类识别测试 ===\n');

testActivities.forEach((activity, index) => {
  console.log(`测试 ${index + 1}: ${activity.name}`);
  try {
    const result = classifyActivity(activity);
    console.log(`  最终分类结果: ${result.type} (${result.confidence}%)`);
    console.log(`  原因: ${result.reason}`);
    console.log(`  匹配关键词: ${result.keywords.join(', ')}`);
  } catch (error) {
    console.log(`  错误: ${error.message}`);
  }
  console.log('\n' + '='.repeat(50) + '\n');
}); 