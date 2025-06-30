const { classifyActivity } = require('../src/utils/activity-classifier.ts');

// 测试用例
const testCases = [
  {
    name: '葛飾納涼花火大会',
    description: '包含花火和納涼，应该识别为花火大会'
  },
  {
    name: '久里浜ペリー祭　花火大会（くりはまペリーさい　はなびたいかい）',
    description: '包含花火和祭，应该识别为花火大会'
  },
  {
    name: '湘南ひらつか七夕祭典（しょうなんひらつかたなばた祭典）',
    description: '只包含祭典，应该识别为传统祭典'
  },
  {
    name: '東京競馬場花火大会',
    description: '包含花火，应该识别为花火大会'
  },
  {
    name: '神田祭',
    description: '只包含祭，应该识别为传统祭典'
  },
  {
    name: '桜祭り',
    description: '包含桜和祭，应该识别为花见会'
  }
];

console.log('🧪 活动分类算法测试\n');
console.log('=' .repeat(80));

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
    if (testCase.name.includes('花火') && result.type !== 'hanabi') {
      console.log('❌ 错误：包含花火关键词但未识别为花火大会');
    } else if (testCase.name.includes('花火') && result.type === 'hanabi') {
      console.log('✅ 正确：包含花火关键词，正确识别为花火大会');
    } else {
      console.log('ℹ️  其他分类结果');
    }
    
  } catch (error) {
    console.log(`❌ 错误: ${error.message}`);
  }
  
  console.log('-'.repeat(60));
});

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

console.log('\n🎯 测试完成！'); 