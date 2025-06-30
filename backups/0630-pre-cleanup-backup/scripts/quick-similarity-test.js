// 快速测试相似度计算
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

console.log('🧪 快速相似度测试\n');

// 测试1：名称相似度
const existingName = "葛飾納涼花火大会（かつしかのうりょうはなびたいかい）";
const testName = "葛飾花火大会";

console.log('📝 名称相似度测试:');
console.log(`   现有: ${existingName}`);
console.log(`   测试: ${testName}`);
const nameSim = calculateSimilarity(testName, existingName);
console.log(`   相似度: ${(nameSim * 100).toFixed(1)}%\n`);

// 测试2：日期相似度
const existingDate = "2025年7月22日　 打上時間/19:20～20:20　※雨天決行（荒天中止）";
const testDate = "2025年7月22日";

console.log('📅 日期相似度测试:');
console.log(`   现有: ${existingDate}`);
console.log(`   测试: ${testDate}`);
const dateSim = areDatesSimilar(testDate, existingDate);
console.log(`   相似: ${dateSim ? '✅' : '❌'}\n`);

// 测试3：地址相似度
const existingAddr = "〒125-0052　東京都葛飾区柴又7-17-13地先";
const testAddr = "東京都葛飾区柴又";

console.log('📍 地址相似度测试:');
console.log(`   现有: ${existingAddr}`);
console.log(`   测试: ${testAddr}`);
const addrSim = areAddressesSimilar(testAddr, existingAddr);
console.log(`   相似: ${addrSim ? '✅' : '❌'}\n`);

// 综合判断
console.log('🎯 综合判断:');
const overallSimilarity = nameSim >= 0.8 ? nameSim : 
                         (nameSim >= 0.6 && (dateSim || addrSim)) ? nameSim :
                         (nameSim >= 0.2 && dateSim && addrSim) ? nameSim : 0;

console.log(`   总体相似度: ${(overallSimilarity * 100).toFixed(1)}%`);
console.log(`   判断条件:`);
console.log(`      条件1 (名称≥80%): ${nameSim >= 0.8 ? '✅' : '❌'}`);
console.log(`      条件2 (名称≥60% 且 (日期或地址)): ${(nameSim >= 0.6 && (dateSim || addrSim)) ? '✅' : '❌'}`);
console.log(`      条件3 (名称≥20% 且 日期 且 地址): ${(nameSim >= 0.2 && dateSim && addrSim) ? '✅' : '❌'}`);
console.log(`   是否触发检测 (>0%): ${overallSimilarity > 0 ? '✅' : '❌'}`);

if (overallSimilarity > 0) {
  console.log('\n✅ 这个测试数据应该能触发相似度检测！');
} else {
  console.log('\n❌ 这个测试数据不会触发相似度检测');
  console.log('💡 建议使用更相似的名称或确保日期/地址匹配');
} 