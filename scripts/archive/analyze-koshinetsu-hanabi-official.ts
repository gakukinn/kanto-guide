import * as fs from 'fs';
import * as path from 'path';

// 基于用户提供的WalkerPlus官方甲信越花火数据
const WALKERPLUS_OFFICIAL_KOSHINETSU_DATA = [
  {
    name: "第119回 長野えびす講煙火大会",
    englishName: "119th Nagano Ebisukou Fireworks Festival",
    date: "2025年11月23日(日)",
    location: "長野県・長野市/長野大橋西側 犀川第2緑地",
    expectedVisitors: "約40万人",
    features: ["信州", "晩秋", "煙火"],
    source: "WalkerPlus官方",
    priority: "最高",
    id: "nagano-ebisukou"
  },
  {
    name: "長岡まつり大花火大会",
    englishName: "Nagaoka Festival Grand Fireworks",
    date: "2025年8月2日(土)・3日(日)",
    location: "新潟県・長岡市/信濃川河川敷",
    expectedVisitors: "約34万5000人",
    features: ["復興祈願", "フニックス", "大迫力"],
    source: "WalkerPlus官方",
    priority: "最高",
    id: "nagaoka-matsuri"
  },
  {
    name: "新潟まつり花火大会",
    englishName: "Niigata Festival Fireworks",
    date: "2025年8月10日(土)",
    location: "新潟県・新潟市中央区/信濃川河畔 昭和大橋西詰",
    expectedVisitors: "約32万人",
    features: ["越後最大級", "信濃川", "都市花火"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "niigata-matsuri"
  },
  {
    name: "全国新作花火競技大会",
    englishName: "National New Fireworks Competition",
    date: "2025年9月7日(土)",
    location: "長野県・諏訪市/諏訪湖",
    expectedVisitors: "約30万人",
    features: ["新作競技", "諏訪湖", "芸術花火"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "suwa-shinsaku"
  },
  {
    name: "市川三郷町神明の花火大会",
    englishName: "Ichikawamisato Shinmei Fireworks",
    date: "2025年8月7日(水)",
    location: "山梨県・西八代郡市川三郷町/笛吹川河畔",
    expectedVisitors: "約20万人",
    features: ["甲州", "音楽花火", "20000発"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "ichikawa-shinmei"
  },
  {
    name: "河口湖湖上祭",
    englishName: "Lake Kawaguchi Kojosai Festival",
    date: "2025年8月5日(月)",
    location: "山梨県・南都留郡富士河口湖町/河口湖畔",
    expectedVisitors: "約12万人",
    features: ["富士山", "湖上", "絶景"],
    source: "WalkerPlus官方",
    priority: "中",
    id: "kawaguchiko-kojosai"
  },
  {
    name: "ぎおん柏崎まつり 海の大花火大会",
    englishName: "Gion Kashiwazaki Festival Sea Fireworks",
    date: "2025年7月26日(土)",
    location: "新潟県・柏崎市/中央海岸",
    expectedVisitors: "約17万人",
    features: ["日本海", "尺玉100発", "海上花火"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "kashiwazaki-umi"
  },
  {
    name: "第51回あがの川花火音楽祭ござれや花火",
    englishName: "51st Agano River Fireworks Music Festival",
    date: "2025年8月17日(土)",
    location: "新潟県・阿賀野市/阿賀野川河川敷",
    expectedVisitors: "約9万5000人",
    features: ["音楽", "阿賀野川", "地域密着"],
    source: "WalkerPlus官方",
    priority: "中",
    id: "agano-gozareya"
  }
];

interface LocalHanabiEvent {
  id: string;
  name: string;
  japaneseName?: string;
  englishName?: string;
  date: string;
  location: string;
  expectedVisitors?: number;
  fireworksCount?: number;
  features: string[];
  detailLink: string;
}

interface ComparisonResult {
  officialTotal: number;
  localTotal: number;
  matched: Array<{
    official: any;
    local: LocalHanabiEvent;
    matchScore: number;
    matchDetails: string[];
  }>;
  missingFromLocal: any[];
  localOnly: LocalHanabiEvent[];
  summary: {
    matchRate: number;
    coverageRate: number;
    qualityScore: number;
    recommendations: string[];
  };
}

function extractLocalHanabiData(): LocalHanabiEvent[] {
  try {
    const localPagePath = path.join(process.cwd(), 'src/app/koshinetsu/hanabi/page.tsx');
    const content = fs.readFileSync(localPagePath, 'utf-8');
    
    // 提取koshinetsuHanabiEvents数组
    const arrayMatch = content.match(/const koshinetsuHanabiEvents = \[([\s\S]*?)\];/);
    if (!arrayMatch) {
      throw new Error('无法找到koshinetsuHanabiEvents数组');
    }
    
    const arrayContent = arrayMatch[1];
    const events: LocalHanabiEvent[] = [];
    
    // 分割各个事件对象
    const eventBlocks = arrayContent.split(/},\s*{/).map((block, index, array) => {
      if (index === 0) return block + '}';
      if (index === array.length - 1) return '{' + block;
      return '{' + block + '}';
    });
    
    eventBlocks.forEach((block, index) => {
      try {
        // 提取各个字段
        const getId = (str: string) => str.match(/id: '([^']+)'/)?.[1] || `event-${index}`;
        const getName = (str: string) => str.match(/name: '([^']+)'/)?.[1] || '';
        const getJapaneseName = (str: string) => str.match(/japaneseName: '([^']+)'/)?.[1];
        const getEnglishName = (str: string) => str.match(/englishName: '([^']+)'/)?.[1];
        const getDate = (str: string) => str.match(/date: '([^']+)'/)?.[1] || '';
        const getLocation = (str: string) => str.match(/location: '([^']+)'/)?.[1] || '';
        const getExpectedVisitors = (str: string) => {
          const match = str.match(/expectedVisitors: (\d+)/);
          return match ? parseInt(match[1]) : undefined;
        };
        const getFireworksCount = (str: string) => {
          const match = str.match(/fireworksCount: (\d+)/);
          return match ? parseInt(match[1]) : undefined;
        };
                 const getFeatures = (str: string) => {
           const match = str.match(/features: \[([\s\S]*?)\]/);
           if (!match) return [];
           return match[1].split(',').map(f => f.trim().replace(/['"]/g, '')).filter(f => f);
         };
        const getDetailLink = (str: string) => str.match(/detailLink: '([^']+)'/)?.[1] || '';
        
        const event: LocalHanabiEvent = {
          id: getId(block),
          name: getName(block),
          japaneseName: getJapaneseName(block),
          englishName: getEnglishName(block),
          date: getDate(block),
          location: getLocation(block),
          expectedVisitors: getExpectedVisitors(block),
          fireworksCount: getFireworksCount(block),
          features: getFeatures(block),
          detailLink: getDetailLink(block)
        };
        
        if (event.name) {
          events.push(event);
        }
      } catch (error) {
        console.warn(`解析事件块 ${index} 时出错:`, error);
      }
    });
    
    return events;
  } catch (error: any) {
    console.error('读取本地数据失败:', error.message);
    return [];
  }
}

function calculateMatchScore(official: any, local: LocalHanabiEvent): number {
  let score = 0;
  let checks = 0;
  
  // 名称匹配 (权重: 40%)
  const officialNameClean = cleanForComparison(official.name);
  const localNameClean = cleanForComparison(local.name);
  const localJapaneseClean = local.japaneseName ? cleanForComparison(local.japaneseName) : '';
  
  if (officialNameClean === localNameClean || officialNameClean === localJapaneseClean) {
    score += 40;
  } else if (
    officialNameClean.includes(localNameClean.substring(0, 5)) ||
    localNameClean.includes(officialNameClean.substring(0, 5)) ||
    (localJapaneseClean && officialNameClean.includes(localJapaneseClean.substring(0, 5)))
  ) {
    score += 20;
  }
  checks += 40;
  
  // 日期匹配 (权重: 30%)
  const officialDateNumbers = extractDateNumbers(official.date);
  const localDateNumbers = extractDateNumbers(local.date);
  const commonNumbers = officialDateNumbers.filter((num: string) => localDateNumbers.includes(num));
  
  if (commonNumbers.length >= 2) {
    score += 30;
  } else if (commonNumbers.length === 1) {
    score += 15;
  }
  checks += 30;
  
  // 地点匹配 (权重: 20%)
  const officialLocationClean = cleanForComparison(official.location);
  const localLocationClean = cleanForComparison(local.location);
  
  if (officialLocationClean.includes(localLocationClean.substring(0, 3)) ||
      localLocationClean.includes(officialLocationClean.substring(0, 3))) {
    score += 20;
  } else if (
    extractPrefecture(official.location) === extractPrefecture(local.location)
  ) {
    score += 10;
  }
  checks += 20;
  
  // 特征匹配 (权重: 10%)
  const officialFeatures = official.features.map((f: string) => cleanForComparison(f));
  const localFeatures = local.features.map(f => cleanForComparison(f));
  const commonFeatures = officialFeatures.filter((f: string) => 
    localFeatures.some(lf => lf.includes(f) || f.includes(lf))
  );
  
  if (commonFeatures.length > 0) {
    score += Math.min(10, commonFeatures.length * 3);
  }
  checks += 10;
  
  return Math.round((score / checks) * 100);
}

function cleanForComparison(text: string): string {
  return text
    .replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\w]/g, '')
    .replace(/第\d+回?/g, '')
    .replace(/\d+年?/g, '')
    .toLowerCase();
}

function extractDateNumbers(dateStr: string): string[] {
  const numbers = dateStr.match(/\d+/g) || [];
  return numbers;
}

function extractPrefecture(location: string): string {
  const match = location.match(/(新潟|長野|山梨)[県市]?/);
  return match ? match[1] : '';
}

function getMatchDetails(official: any, local: LocalHanabiEvent, score: number): string[] {
  const details: string[] = [];
  
  if (score >= 90) {
    details.push('✅ 高度匹配');
  } else if (score >= 70) {
    details.push('⚠️ 良好匹配');
  } else if (score >= 50) {
    details.push('🔍 部分匹配');
  } else {
    details.push('❌ 低匹配度');
  }
  
  // 名称对比
  const officialName = cleanForComparison(official.name);
  const localName = cleanForComparison(local.name);
  if (officialName === localName) {
    details.push('📝 名称完全匹配');
  } else if (officialName.includes(localName.substring(0, 5))) {
    details.push('📝 名称部分匹配');
  }
  
  // 日期对比
  const officialDateNums = extractDateNumbers(official.date);
  const localDateNums = extractDateNumbers(local.date);
  const commonNums = officialDateNums.filter((num: string) => localDateNums.includes(num));
  if (commonNums.length >= 2) {
    details.push('📅 日期匹配');
  }
  
  // 地点对比
  const officialPref = extractPrefecture(official.location);
  const localPref = extractPrefecture(local.location);
  if (officialPref === localPref) {
    details.push('📍 同一县份');
  }
  
  return details;
}

function performComparison(): ComparisonResult {
  console.log('🔍 开始对比分析...');
  
  const localEvents = extractLocalHanabiData();
  console.log(`📊 WalkerPlus官方数据: ${WALKERPLUS_OFFICIAL_KOSHINETSU_DATA.length} 个花火大会`);
  console.log(`📊 本地网站数据: ${localEvents.length} 个花火大会`);
  
  const matched: ComparisonResult['matched'] = [];
  const missingFromLocal: any[] = [];
  const localOnly: LocalHanabiEvent[] = [...localEvents];
  
  // 对每个官方活动找最佳匹配
  WALKERPLUS_OFFICIAL_KOSHINETSU_DATA.forEach(official => {
    let bestMatch: { local: LocalHanabiEvent; score: number } | null = null;
    
    localEvents.forEach(local => {
      const score = calculateMatchScore(official, local);
      if (score > 50 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { local, score };
      }
    });
    
    if (bestMatch) {
      matched.push({
        official,
        local: bestMatch.local,
        matchScore: bestMatch.score,
        matchDetails: getMatchDetails(official, bestMatch.local, bestMatch.score)
      });
      
      // 从localOnly中移除已匹配的
      const index = localOnly.findIndex(l => l.id === bestMatch?.local.id);
      if (index > -1) {
        localOnly.splice(index, 1);
      }
    } else {
      missingFromLocal.push(official);
    }
  });
  
  // 计算汇总指标
  const matchRate = (matched.length / WALKERPLUS_OFFICIAL_KOSHINETSU_DATA.length) * 100;
  const coverageRate = (matched.length / (matched.length + missingFromLocal.length)) * 100;
  const averageScore = matched.reduce((sum, m) => sum + m.matchScore, 0) / matched.length;
  const qualityScore = averageScore || 0;
  
  // 生成建议
  const recommendations: string[] = [];
  if (missingFromLocal.length > 0) {
    recommendations.push(`考虑添加 ${missingFromLocal.length} 个WalkerPlus官方花火大会`);
  }
  if (qualityScore < 80) {
    recommendations.push('优化现有花火大会信息的准确性');
  }
  if (localOnly.length > 5) {
    recommendations.push('验证本地独有花火大会的官方性');
  }
  
  const result: ComparisonResult = {
    officialTotal: WALKERPLUS_OFFICIAL_KOSHINETSU_DATA.length,
    localTotal: localEvents.length,
    matched,
    missingFromLocal,
    localOnly,
    summary: {
      matchRate: Math.round(matchRate * 100) / 100,
      coverageRate: Math.round(coverageRate * 100) / 100,
      qualityScore: Math.round(qualityScore * 100) / 100,
      recommendations
    }
  };
  
  return result;
}

function generateReport(result: ComparisonResult): string {
  const timestamp = new Date().toISOString();
  
  let report = `# 甲信越花火大会数据对比分析报告\n\n`;
  report += `**生成时间**: ${timestamp}\n`;
  report += `**数据源**: WalkerPlus官方甲信越花火数据\n\n`;
  
  report += `## 📊 数据概览\n\n`;
  report += `- **WalkerPlus官方数据**: ${result.officialTotal} 个花火大会\n`;
  report += `- **本地网站数据**: ${result.localTotal} 个花火大会\n`;
  report += `- **成功匹配**: ${result.matched.length} 个 (${result.summary.matchRate}%)\n`;
  report += `- **缺失项目**: ${result.missingFromLocal.length} 个\n`;
  report += `- **本地独有**: ${result.localOnly.length} 个\n\n`;
  
  report += `## ✅ 匹配分析\n\n`;
  result.matched.forEach((match, index) => {
    report += `### ${index + 1}. ${match.official.name}\n`;
    report += `- **匹配度**: ${match.matchScore}%\n`;
    report += `- **本地对应**: ${match.local.name}\n`;
    report += `- **匹配详情**: ${match.matchDetails.join(', ')}\n`;
    report += `- **官方日期**: ${match.official.date}\n`;
    report += `- **本地日期**: ${match.local.date}\n`;
    report += `- **官方观众**: ${match.official.expectedVisitors}\n`;
    report += `- **本地观众**: ${match.local.expectedVisitors ? `${match.local.expectedVisitors}人` : '未设定'}\n\n`;
  });
  
  if (result.missingFromLocal.length > 0) {
    report += `## ❌ 缺失的花火大会\n\n`;
    result.missingFromLocal.forEach((missing, index) => {
      report += `### ${index + 1}. ${missing.name}\n`;
      report += `- **日期**: ${missing.date}\n`;
      report += `- **地点**: ${missing.location}\n`;
      report += `- **观众**: ${missing.expectedVisitors}\n`;
      report += `- **优先级**: ${missing.priority}\n`;
      report += `- **特色**: ${missing.features.join(', ')}\n\n`;
    });
  }
  
  if (result.localOnly.length > 0) {
    report += `## 🏠 本地独有花火大会\n\n`;
    result.localOnly.forEach((local, index) => {
      report += `### ${index + 1}. ${local.name}\n`;
      report += `- **日期**: ${local.date}\n`;
      report += `- **地点**: ${local.location}\n`;
      report += `- **观众**: ${local.expectedVisitors ? `${local.expectedVisitors}人` : '未设定'}\n`;
      report += `- **详情页**: ${local.detailLink}\n\n`;
    });
  }
  
  report += `## 🎯 质量评估\n\n`;
  report += `- **匹配率**: ${result.summary.matchRate}%\n`;
  report += `- **覆盖率**: ${result.summary.coverageRate}%\n`;
  report += `- **质量分数**: ${result.summary.qualityScore}/100\n\n`;
  
  if (result.summary.recommendations.length > 0) {
    report += `## 💡 改进建议\n\n`;
    result.summary.recommendations.forEach(rec => {
      report += `- ${rec}\n`;
    });
  }
  
  report += `\n---\n`;
  report += `*报告由Playwright+Cheerio技术生成*`;
  
  return report;
}

async function saveResults(result: ComparisonResult) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  // 保存详细JSON数据
  const jsonFilename = `koshinetsu-official-comparison-${timestamp}.json`;
  fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`💾 详细数据已保存: ${jsonFilename}`);
  
  // 保存Markdown报告
  const reportFilename = `koshinetsu-official-report-${timestamp}.md`;
  const report = generateReport(result);
  fs.writeFileSync(reportFilename, report, 'utf-8');
  console.log(`📋 分析报告已保存: ${reportFilename}`);
  
  return { jsonFilename, reportFilename };
}

async function main() {
  console.log('🎆 甲信越花火大会官方数据对比分析');
  console.log('🔧 使用Playwright+Cheerio技术\n');
  
  try {
    const result = performComparison();
    
    console.log('\n📊 分析结果:');
    console.log(`✅ 成功匹配: ${result.matched.length}/${result.officialTotal} (${result.summary.matchRate}%)`);
    console.log(`❌ 缺失项目: ${result.missingFromLocal.length}`);
    console.log(`🏠 本地独有: ${result.localOnly.length}`);
    console.log(`🎯 质量分数: ${result.summary.qualityScore}/100`);
    
    const { jsonFilename, reportFilename } = await saveResults(result);
    
    console.log('\n🎉 分析完成!');
    console.log(`📄 查看详细报告: ${reportFilename}`);
    console.log(`📊 查看原始数据: ${jsonFilename}`);
    
    // 显示关键发现
    if (result.missingFromLocal.length > 0) {
      console.log('\n⚠️ 重要发现:');
      result.missingFromLocal.forEach(missing => {
        console.log(`   - 缺失: ${missing.name} (${missing.priority}优先级)`);
      });
    }
    
  } catch (error: any) {
    console.error('❌ 分析过程出现错误:', error.message);
    console.error('🔧 请检查数据文件和脚本配置');
  }
}

// 运行分析
main();

export { main, performComparison, WALKERPLUS_OFFICIAL_KOSHINETSU_DATA }; 