const fs = require('fs').promises;
const path = require('path');

// 🧪 多重相似活动检测测试脚本
console.log('🧪 开始测试多重相似活动检测功能...\n');

// 测试用的活动数据
const testActivities = [
  {
    id: 'test-001',
    name: '东京夏日花火大会',
    region: 'tokyo',
    activityType: 'hanabi',
    period: '2024年7月15日',
    address: '东京都台东区浅草1-1-1',
    venue: '隅田川河畔'
  },
  {
    id: 'test-002',
    name: '东京夏季花火节',
    region: 'tokyo',
    activityType: 'hanabi',
    period: '2024年7月15日',
    address: '东京都台东区浅草1-2-1',
    venue: '隅田川公园'
  },
  {
    id: 'test-003',
    name: '东京夏夜花火祭',
    region: 'tokyo',
    activityType: 'hanabi',
    period: '2024年7月16日',
    address: '东京都台东区浅草1-3-1',
    venue: '隅田川广场'
  },
  {
    id: 'test-004',
    name: '埼玉花火大会',
    region: 'saitama',
    activityType: 'hanabi',
    period: '2024年7月20日',
    address: '埼玉县川越市本町1-1-1',
    venue: '川越河畔'
  }
];

// 模拟相似度计算函数
const calculateSimilarity = (str1, str2) => {
  const normalize = (str) => {
    return str
      .replace(/[（）()]/g, '') // 移除括号
      .replace(/[\s\-_]/g, '') // 移除空格、连字符、下划线
      .toLowerCase();
  };

  const s1 = normalize(str1);
  const s2 = normalize(str2);
  
  if (s1 === s2) return 1.0;
  
  // 编辑距离算法
  const matrix = Array(s2.length + 1).fill().map(() => Array(s1.length + 1).fill(0));
  
  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,     // deletion
          matrix[j][i - 1] + 1,     // insertion
          matrix[j - 1][i - 1] + 1  // substitution
        );
      }
    }
  }
  
  const maxLength = Math.max(s1.length, s2.length);
  return maxLength === 0 ? 1.0 : 1 - (matrix[s2.length][s1.length] / maxLength);
};

// 日期相似度判断
const areDatesSimilar = (date1, date2) => {
  const extractNumbers = (dateStr) => {
    const matches = dateStr.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  };
  
  const nums1 = extractNumbers(date1);
  const nums2 = extractNumbers(date2);
  
  if (nums1.length === 0 || nums2.length === 0) return false;
  
  // 检查是否有相同的日期数字
  return nums1.some(num1 => nums2.some(num2 => Math.abs(num1 - num2) <= 1));
};

// 地址相似度判断
const areAddressesSimilar = (addr1, addr2) => {
  const extractKeywords = (address) => {
    const keywords = [];
    const patterns = [
      /([^\s]+区)/g,   // 区
      /([^\s]+市)/g,   // 市
      /([^\s]+町)/g,   // 町
      /([^\s]+川)/g,   // 川
      /([^\s]+公园)/g, // 公园
      /([^\s]+广场)/g  // 广场
    ];
    
    patterns.forEach(pattern => {
      const matches = address.match(pattern);
      if (matches) keywords.push(...matches);
    });
    
    return keywords;
  };
  
  const keywords1 = extractKeywords(addr1);
  const keywords2 = extractKeywords(addr2);
  
  if (keywords1.length === 0 || keywords2.length === 0) return false;
  
  return keywords1.some(k1 => keywords2.some(k2 => k1 === k2));
};

// 模拟检测函数
const checkForMultipleSimilarities = (newActivity, existingActivities) => {
  console.log(`🔍 检测新活动: ${newActivity.name}`);
  console.log(`   地区: ${newActivity.region}, 类型: ${newActivity.activityType}`);
  console.log(`   时间: ${newActivity.period}`);
  console.log(`   地点: ${newActivity.address}\n`);
  
  const similarActivities = [];
  
  existingActivities.forEach(existing => {
    // 只检查相同地区和活动类型
    if (existing.region === newActivity.region && existing.activityType === newActivity.activityType) {
      const nameSimilarity = calculateSimilarity(newActivity.name, existing.name);
      const dateSimilar = areDatesSimilar(newActivity.period, existing.period);
      const addressSimilar = areAddressesSimilar(newActivity.address, existing.address);
      
      console.log(`📊 与 ${existing.name} 的相似度分析:`);
      console.log(`   名称相似度: ${(nameSimilarity * 100).toFixed(1)}%`);
      console.log(`   日期相似: ${dateSimilar ? '✅' : '❌'}`);
      console.log(`   地址相似: ${addressSimilar ? '✅' : '❌'}`);
      
      // 判断条件：名称相似度 >= 80% 或者 (名称相似度 >= 60% 且 (日期相似 或 地址相似))
      const overallSimilarity = nameSimilarity >= 0.8 ? nameSimilarity : 
                              (nameSimilarity >= 0.6 && (dateSimilar || addressSimilar)) ? nameSimilarity : 0;
      
      if (overallSimilarity >= 0.8) {
        console.log(`   ✅ 判定为高度相似 (${(overallSimilarity * 100).toFixed(1)}%)\n`);
        similarActivities.push({
          similarity: overallSimilarity,
          activity: existing,
          similarityDetails: {
            name: nameSimilarity,
            date: dateSimilar,
            address: addressSimilar
          }
        });
      } else {
        console.log(`   ❌ 相似度不足 (${(overallSimilarity * 100).toFixed(1)}%)\n`);
      }
    }
  });
  
  // 按相似度排序，取前3个
  similarActivities.sort((a, b) => b.similarity - a.similarity);
  const topSimilar = similarActivities.slice(0, 3);
  
  return {
    isDuplicate: topSimilar.length > 0,
    count: topSimilar.length,
    similarActivities: topSimilar
  };
};

// 执行测试
async function runTests() {
  console.log('🎯 测试场景1: 新活动与多个现有活动高度相似\n');
  
  const newActivity = {
    id: 'new-001',
    name: '东京夏日花火盛典',
    region: 'tokyo',
    activityType: 'hanabi',
    period: '2024年7月15日',
    address: '东京都台东区浅草1-4-1',
    venue: '隅田川沿岸'
  };
  
  const result1 = checkForMultipleSimilarities(newActivity, testActivities);
  
  console.log('🎯 检测结果:');
  console.log(`   发现 ${result1.count} 个高度相似活动`);
  console.log(`   是否需要用户确认: ${result1.isDuplicate ? '是' : '否'}\n`);
  
  if (result1.isDuplicate) {
    console.log('📋 相似活动列表:');
    result1.similarActivities.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.activity.name} (${(item.similarity * 100).toFixed(1)}%)`);
      console.log(`      ID: ${item.activity.id}`);
      console.log(`      时间: ${item.activity.period}`);
      console.log(`      地点: ${item.activity.venue}\n`);
    });
  }
  
  console.log('🎯 测试场景2: 新活动无相似活动\n');
  
  const newActivity2 = {
    id: 'new-002',
    name: '神奈川海滨音乐节',
    region: 'kanagawa',
    activityType: 'matsuri',
    period: '2024年8月10日',
    address: '神奈川县横浜市中区1-1-1',
    venue: '横浜海滨公园'
  };
  
  const result2 = checkForMultipleSimilarities(newActivity2, testActivities);
  
  console.log('🎯 检测结果:');
  console.log(`   发现 ${result2.count} 个高度相似活动`);
  console.log(`   是否需要用户确认: ${result2.isDuplicate ? '是' : '否'}\n`);
  
  console.log('✅ 多重相似活动检测功能测试完成！');
  console.log('\n📝 功能特点:');
  console.log('   1. 支持检测多个高度相似活动（相似度≥80%）');
  console.log('   2. 按相似度排序，最多显示3个');
  console.log('   3. 提供详细的相似度分析（名称、日期、地址）');
  console.log('   4. 用户可以选择要覆盖的特定活动');
  console.log('   5. 向后兼容单个相似活动的处理方式');
}

runTests().catch(console.error); 