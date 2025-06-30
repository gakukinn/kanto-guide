/**
 * 测试智能重复检测功能
 * 验证基于名称、日期、地址的相似度算法
 */

const fs = require('fs').promises;
const path = require('path');

// 🧠 智能相似度计算函数（复制自API）
const calculateSimilarity = (str1, str2) => {
  if (!str1 || !str2) return 0;
  
  // 清理字符串（移除空格、标点符号、括号内容等）
  const normalize = (str) => {
    return str
      .toLowerCase()
      // 移除括号及其内容
      .replace(/[（(][^）)]*[）)]/g, '')
      // 移除特殊符号
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      .trim();
  };
  
  const s1 = normalize(str1);
  const s2 = normalize(str2);
  
  if (s1 === s2) return 1.0;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // 检查包含关系（一个字符串是另一个的子集）
  if (s1.includes(s2) || s2.includes(s1)) {
    const shorter = Math.min(s1.length, s2.length);
    const longer = Math.max(s1.length, s2.length);
    return shorter / longer * 0.9; // 稍微降低权重
  }
  
  // 使用编辑距离算法
  const matrix = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  
  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }
  
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - (matrix[s2.length][s1.length] / maxLength);
};

// 🗓️ 日期相似度判断（复制自API）
const areDatesSimilar = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  // 提取年月日数字
  const extractNumbers = (dateStr) => {
    const matches = dateStr.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  };
  
  const nums1 = extractNumbers(date1);
  const nums2 = extractNumbers(date2);
  
  // 如果都有年月日信息，比较年月日
  if (nums1.length >= 3 && nums2.length >= 3) {
    return nums1[0] === nums2[0] && nums1[1] === nums2[1] && nums1[2] === nums2[2];
  }
  
  // 如果只有月日信息，比较月日
  if (nums1.length >= 2 && nums2.length >= 2) {
    const month1 = nums1[nums1.length >= 3 ? 1 : 0];
    const day1 = nums1[nums1.length >= 3 ? 2 : 1];
    const month2 = nums2[nums2.length >= 3 ? 1 : 0];
    const day2 = nums2[nums2.length >= 3 ? 2 : 1];
    return month1 === month2 && day1 === day2;
  }
  
  return false;
};

// 🏠 地址相似度判断（复制自API）
const areAddressesSimilar = (addr1, addr2) => {
  if (!addr1 || !addr2) return false;
  
  // 提取关键地名信息
  const extractKeywords = (address) => {
    // 匹配区、市、町、村等地名关键词
    const matches = address.match(/[^\s]+?[区市町村]/g) || [];
    return matches.map(match => match.replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ''));
  };
  
  const keywords1 = extractKeywords(addr1);
  const keywords2 = extractKeywords(addr2);
  
  // 检查是否有相同的地名关键词
  return keywords1.some(k1 => keywords2.some(k2 => k1.includes(k2) || k2.includes(k1)));
};

async function testSmartDuplicateDetection() {
  console.log('🧪 开始测试智能重复检测功能...\n');

  // 测试数据
  const testCases = [
    {
      name: '相同活动测试',
      activity1: {
        name: '葛飾納涼花火大会（かつしかのうりょうはなびたいかい）',
        period: '2025年7月22日　 打上時間/19:20～20:20',
        address: '〒125-0052　東京都葛飾区柴又7-17-13地先'
      },
      activity2: {
        name: '葛飾納涼花火大会',
        period: '2025年7月22日 19:20-20:20',
        address: '東京都葛飾区柴又'
      },
      expected: true
    },
    {
      name: '相似活动测试',
      activity1: {
        name: '隅田川花火大会',
        period: '2025年7月26日',
        address: '東京都台東区'
      },
      activity2: {
        name: '隅田川花火祭',
        period: '2025年7月26日',
        address: '東京都墨田区'
      },
      expected: true
    },
    {
      name: '不同活动测试',
      activity1: {
        name: '葛飾納涼花火大会',
        period: '2025年7月22日',
        address: '東京都葛飾区'
      },
      activity2: {
        name: '板橋花火大会',
        period: '2025年8月15日',
        address: '東京都板橋区'
      },
      expected: false
    }
  ];

  for (const testCase of testCases) {
    console.log(`🔍 测试: ${testCase.name}`);
    console.log(`   活动1: ${testCase.activity1.name}`);
    console.log(`   活动2: ${testCase.activity2.name}`);
    
    const nameSimilarity = calculateSimilarity(testCase.activity1.name, testCase.activity2.name);
    const dateSimilar = areDatesSimilar(testCase.activity1.period, testCase.activity2.period);
    const addressSimilar = areAddressesSimilar(testCase.activity1.address, testCase.activity2.address);
    
    console.log(`   名称相似度: ${(nameSimilarity * 100).toFixed(1)}%`);
    console.log(`   日期相似: ${dateSimilar ? '是' : '否'}`);
    console.log(`   地址相似: ${addressSimilar ? '是' : '否'}`);
    
    // 判断逻辑（与API保持一致）
    const isDuplicate = nameSimilarity >= 0.8 || 
                       (nameSimilarity >= 0.6 && (dateSimilar || addressSimilar));
    
    console.log(`   判定结果: ${isDuplicate ? '重复' : '不重复'}`);
    console.log(`   预期结果: ${testCase.expected ? '重复' : '不重复'}`);
    console.log(`   测试结果: ${isDuplicate === testCase.expected ? '✅ 通过' : '❌ 失败'}\n`);
  }

  // 检查现有的JSON文件
  console.log('📁 检查现有活动文件:');
  const activitiesDir = path.join(process.cwd(), 'data', 'activities');
  
  try {
    const files = await fs.readdir(activitiesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`   发现 ${jsonFiles.length} 个活动JSON文件`);
    
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(activitiesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        
        console.log(`   - ${file}:`);
        console.log(`     名称: ${data.name || '未知'}`);
        console.log(`     地区: ${data.region || '未知'}`);
        console.log(`     类型: ${data.activityType || '未知'}`);
        console.log(`     日期: ${data.period || '未知'}`);
      } catch (error) {
        console.log(`   - ${file}: 读取失败 (${error.message})`);
      }
    }
  } catch (error) {
    console.log(`   activities目录不存在或无法访问: ${error.message}`);
  }

  console.log('\n🎉 智能重复检测测试完成！');
}

// 运行测试
testSmartDuplicateDetection().catch(console.error); 