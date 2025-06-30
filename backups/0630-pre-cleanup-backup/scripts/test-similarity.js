// 测试相似度计算函数

// 字符串相似度计算（改进版，更适合日文文本）
function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  // 标准化字符串：去除空格、标点符号等
  const normalize = (str) => str.replace(/[\s\(\)（）～\-]/g, '');
  const norm1 = normalize(str1);
  const norm2 = normalize(str2);
  
  if (norm1 === norm2) return 1.0; // 完全匹配
  
  // 检查包含关系（如果一个字符串包含另一个，相似度应该很高）
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    const shorter = norm1.length < norm2.length ? norm1 : norm2;
    const longer = norm1.length < norm2.length ? norm2 : norm1;
    // 如果短字符串长度超过5个字符，给予更高的相似度
    const baseSimilarity = shorter.length / longer.length;
    return shorter.length >= 5 ? Math.max(baseSimilarity, 0.8) : baseSimilarity;
  }
  
  // 使用编辑距离计算
  const longer = norm1.length > norm2.length ? norm1 : norm2;
  const shorter = norm1.length > norm2.length ? norm2 : norm1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// 编辑距离算法
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// 测试数据
const testCases = [
  {
    name1: '雪の大谷ウォーク',
    name2: '雪の大谷ウォーク（ゆきのおおたにウォーク）',
    expected: '应该约80%相似'
  },
  {
    name1: '〒930-1414 富山県立山町室堂',
    name2: '富山県立山町室堂',
    expected: '应该约90%相似'
  },
  {
    name1: '2025年4月15日～11月30日',
    name2: '2025年4月15日-11月30日',
    expected: '应该约95%相似'
  }
];

console.log('=== 相似度计算测试 ===\n');

testCases.forEach((testCase, index) => {
  const similarity = calculateSimilarity(testCase.name1, testCase.name2);
  const percentage = Math.round(similarity * 100);
  
  console.log(`测试 ${index + 1}:`);
  console.log(`  字符串1: "${testCase.name1}"`);
  console.log(`  字符串2: "${testCase.name2}"`);
  console.log(`  相似度: ${percentage}% (${testCase.expected})`);
  console.log(`  是否达到50%阈值: ${similarity >= 0.5 ? '✅' : '❌'}`);
  console.log(`  是否达到90%阈值: ${similarity >= 0.9 ? '✅' : '❌'}`);
  console.log('');
});

// 测试重复检查逻辑
console.log('=== 重复检查逻辑测试 ===\n');

const inputData = {
  name: '雪の大谷ウォーク',
  address: '富山県立山町室堂',
  period: '2025年4月15日-11月30日'
};

const existingData = {
  name: '雪の大谷ウォーク（ゆきのおおたにウォーク）',
  address: '〒930-1414 富山県立山町室堂',
  datetime: '2025年4月15日～11月30日'
};

const nameSim = calculateSimilarity(inputData.name, existingData.name);
const addressSim = calculateSimilarity(inputData.address, existingData.address);
const dateSim = calculateSimilarity(inputData.period, existingData.datetime);

console.log('输入数据 vs 现有数据:');
console.log(`名称相似度: ${Math.round(nameSim * 100)}%`);
console.log(`地址相似度: ${Math.round(addressSim * 100)}%`);
console.log(`日期相似度: ${Math.round(dateSim * 100)}%`);
console.log('');

const shouldDetectDuplicate = nameSim >= 0.5 && (dateSim >= 0.9 || addressSim >= 0.9);
console.log(`重复检查结果: ${shouldDetectDuplicate ? '✅ 应该检测到重复' : '❌ 不会检测到重复'}`);
console.log(`检查条件: 名称≥50%(${nameSim >= 0.5 ? '✅' : '❌'}) AND (日期≥90%(${dateSim >= 0.9 ? '✅' : '❌'}) OR 地址≥90%(${addressSim >= 0.9 ? '✅' : '❌'}))`); 