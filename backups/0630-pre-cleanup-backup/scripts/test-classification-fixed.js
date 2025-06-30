// JavaScript版本的活动分类测试脚本

// 修正后的分类函数
function classifyActivity(textData) {
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
      reason: `包含花火关键词，强制识别为花火大会: ${matchedHanabiKeywords.join(', ')}`,
      keywords: matchedHanabiKeywords
    };
  }
  
  // 活动分类规则
  const rules = {
    matsuri: {
      name: '传统祭典',
      keywords: ['祭', '祭り', '祭典', 'マツリ', 'festival', '納涼', '納涼祭', '神輿', '山車'],
      excludeKeywords: ['花火', 'はなび', 'ハナビ'],
      weight: 1.0,
      priority: 50
    },
    hanami: {
      name: '花见会',
      keywords: ['花見', '桜', 'さくら', 'サクラ', 'cherry blossom', '桜祭り', '桜祭典'],
      excludeKeywords: ['花火', 'はなび', 'ハナビ'],
      weight: 1.0,
      priority: 80
    },
    momiji: {
      name: '红叶狩',
      keywords: ['紅葉', 'もみじ', 'モミジ', '紅葉狩り', 'autumn leaves'],
      excludeKeywords: ['花火', 'はなび', 'ハナビ'],
      weight: 1.0,
      priority: 50
    },
    illumination: {
      name: '灯光秀',
      keywords: ['イルミネーション', 'illumination', 'ライトアップ', 'light up', 'LED'],
      excludeKeywords: ['花火', 'はなび', 'ハナビ'],
      weight: 1.0,
      priority: 50
    },
    culture: {
      name: '文化艺术',
      keywords: ['文化', '芸術', '美術', 'アート', 'art', 'culture', '展覧会'],
      excludeKeywords: ['花火', 'はなび', 'ハナビ'],
      weight: 0.8,
      priority: 30
    }
  };
  
  const classifications = [];
  
  // 对每种活动类型进行评分
  for (const [type, config] of Object.entries(rules)) {
    let score = 0;
    const matchedKeywords = [];
    
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
        score = 0; // 如果包含排除关键词，直接将分数设为0
        break;
      }
    }
    
    if (score > 0) {
      classifications.push({
        type,
        score,
        matchedKeywords,
        reason: `匹配关键词: ${matchedKeywords.join(', ')}`,
        priority: config.priority
      });
    }
  }
  
  // 按优先级和得分排序
  classifications.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return b.score - a.score;
  });
  
  if (classifications.length === 0) {
    return {
      type: 'culture',
      confidence: 30,
      reason: '未找到明确分类关键词，默认归类为文化艺术',
      keywords: []
    };
  }
  
  const topClassification = classifications[0];
  const confidence = Math.min(95, Math.round((topClassification.score / 3) * 100));
  
  return {
    type: topClassification.type,
    confidence,
    reason: topClassification.reason,
    keywords: topClassification.matchedKeywords
  };
}

// 测试用例
const testCases = [
  {
    name: '葛飾納涼花火大会',
    description: '包含花火和納涼，应该识别为花火大会',
    expected: 'hanabi'
  },
  {
    name: '久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）',
    description: '包含花火和祭，应该识别为花火大会',
    expected: 'hanabi'
  },
  {
    name: '湘南ひらつか七夕祭典（しょうなんひらつかたなばた祭典）',
    description: '只包含祭典，应该识别为传统祭典',
    expected: 'matsuri'
  },
  {
    name: '東京競馬場花火大会',
    description: '包含花火，应该识别为花火大会',
    expected: 'hanabi'
  },
  {
    name: '神田祭',
    description: '只包含祭，应该识别为传统祭典',
    expected: 'matsuri'
  },
  {
    name: '桜祭り',
    description: '包含桜和祭，应该识别为花见会',
    expected: 'hanami'
  }
];

function getTypeName(type) {
  const typeNames = {
    'hanabi': '花火大会',
    'matsuri': '传统祭典', 
    'hanami': '花见会',
    'momiji': '红叶狩',
    'illumination': '灯光秀',
    'culture': '文化艺术'
  };
  return typeNames[type] || '未知';
}

console.log('🧪 修正后的活动分类算法测试\n');
console.log('=' .repeat(80));

let passedTests = 0;
let totalTests = testCases.length;

testCases.forEach((testCase, index) => {
  console.log(`\n测试 ${index + 1}: ${testCase.name}`);
  console.log(`预期: ${testCase.description}`);
  
  try {
    const result = classifyActivity({ name: testCase.name });
    
    console.log(`结果: ${result.type} (${getTypeName(result.type)})`);
    console.log(`置信度: ${result.confidence}%`);
    console.log(`原因: ${result.reason}`);
    console.log(`关键词: [${result.keywords.join(', ')}]`);
    
    // 验证结果
    const isCorrect = result.type === testCase.expected;
    if (isCorrect) {
      console.log('✅ 正确：分类结果符合预期');
      passedTests++;
    } else {
      console.log(`❌ 错误：期望 ${testCase.expected} (${getTypeName(testCase.expected)})，实际 ${result.type} (${getTypeName(result.type)})`);
    }
    
    // 特别检查花火关键词
    if (testCase.name.includes('花火') && result.type !== 'hanabi') {
      console.log('🚨 严重错误：包含花火关键词但未识别为花火大会！');
    } else if (testCase.name.includes('花火') && result.type === 'hanabi') {
      console.log('🎯 花火优先级规则正确生效');
    }
    
  } catch (error) {
    console.log(`❌ 错误: ${error.message}`);
  }
  
  console.log('-'.repeat(60));
});

console.log(`\n🎯 测试完成！通过率: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);

if (passedTests === totalTests) {
  console.log('🎉 所有测试通过！分类算法修正成功！');
} else {
  console.log('⚠️  仍有测试失败，需要进一步调整算法');
} 