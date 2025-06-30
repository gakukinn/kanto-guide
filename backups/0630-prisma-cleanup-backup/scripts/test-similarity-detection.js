// 测试相似度检测功能
const path = require('path');
const fs = require('fs').promises;

// 复制相似度计算函数
const calculateSimilarity = (str1, str2) => {
  if (!str1 || !str2) return 0;
  
  const normalize = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[（）()【】\[\]]/g, '')
      .replace(/[ー－]/g, '')
      .trim();
  };

  const s1 = normalize(str1);
  const s2 = normalize(str2);
  
  if (s1 === s2) return 1;
  
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;
  
  const editDistance = (s1, s2) => {
    const costs = [];
    for (let i = 0; i <= s2.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s1.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(j - 1) !== s2.charAt(i - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s1.length] = lastValue;
    }
    return costs[s1.length];
  };

  return (longer.length - editDistance(longer, shorter)) / longer.length;
};

const areDatesSimilar = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  const extractNumbers = (dateStr) => {
    const matches = dateStr.match(/(\d{1,2})月(\d{1,2})日/g);
    return matches ? matches.map(match => {
      const [, month, day] = match.match(/(\d{1,2})月(\d{1,2})日/);
      return `${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }) : [];
  };
  
  const dates1 = extractNumbers(date1);
  const dates2 = extractNumbers(date2);
  
  return dates1.some(d1 => dates2.includes(d1));
};

const areAddressesSimilar = (addr1, addr2) => {
  if (!addr1 || !addr2) return false;
  
  const extractKeywords = (address) => {
    const keywords = [];
    const patterns = [
      /([東京都|神奈川県|埼玉県|千葉県])/g,
      /([市区町村])/g,
      /([^\s,，、]+[区市町村])/g,
      /([^\s,，、]+[公園|会場|球場|競技場|グラウンド|河川敷])/g
    ];
    
    patterns.forEach(pattern => {
      const matches = address.match(pattern);
      if (matches) keywords.push(...matches);
    });
    
    return keywords.filter(k => k && k.length > 1);
  };
  
  const keywords1 = extractKeywords(addr1);
  const keywords2 = extractKeywords(addr2);
  
  return keywords1.some(k1 => 
    keywords2.some(k2 => calculateSimilarity(k1, k2) > 0.7)
  );
};

async function testSimilarityDetection() {
  console.log('🧪 测试相似度检测功能\n');
  
  // 测试数据：与现有活动相似的新活动
  const testActivity = {
    name: "葛飾花火大会", // 与现有的"葛飾納涼花火大会"相似
    period: "2025年7月22日",
    address: "東京都葛飾区柴又",
    venue: "柴又野球場"
  };
  
  // 读取现有活动
  const activitiesDir = path.join(process.cwd(), 'data', 'activities');
  
  try {
    const files = await fs.readdir(activitiesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    console.log(`📂 找到 ${jsonFiles.length} 个现有活动文件\n`);
    
    for (const file of jsonFiles) {
      const filePath = path.join(activitiesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const existingData = JSON.parse(content);
      
      console.log(`🔍 检查活动: ${existingData.name}`);
      console.log(`   文件: ${file}`);
      console.log(`   地区: ${existingData.region}`);
      console.log(`   类型: ${existingData.activityType}`);
      
      // 相似度分析
      const nameSimilarity = calculateSimilarity(testActivity.name, existingData.name);
      const dateSimilar = areDatesSimilar(testActivity.period, existingData.datetime || existingData.period);
      const addressSimilar = areAddressesSimilar(testActivity.address, existingData.address);
      
      console.log(`   📊 相似度分析:`);
      console.log(`      名称相似度: ${(nameSimilarity * 100).toFixed(1)}%`);
      console.log(`      日期相似: ${dateSimilar ? '✅' : '❌'}`);
      console.log(`      地址相似: ${addressSimilar ? '✅' : '❌'}`);
      
      // 判断条件（当前设置）
      const overallSimilarity = nameSimilarity >= 0.8 ? nameSimilarity : 
                              (nameSimilarity >= 0.6 && (dateSimilar || addressSimilar)) ? nameSimilarity : 0;
      
      console.log(`   🎯 总体相似度: ${(overallSimilarity * 100).toFixed(1)}%`);
      
      if (overallSimilarity >= 0.8) {
        console.log(`   ✅ 高度相似活动 (阈值: 80%)`);
      } else if (overallSimilarity >= 0.6) {
        console.log(`   ⚠️  中等相似活动 (阈值: 60%)`);
      } else {
        console.log(`   ❌ 相似度不足`);
      }
      
      console.log('');
    }
    
    // 建议
    console.log('💡 建议:');
    console.log('   - 如果没有检测到高度相似活动，可以降低阈值到60%');
    console.log('   - 或者测试更相似的活动名称');
    console.log('   - 检查地区和活动类型是否匹配');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testSimilarityDetection(); 