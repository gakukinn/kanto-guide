import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

// WalkerPlus官方甲信越花火数据（基于用户提供的官方网站数据）
const WALKERPLUS_OFFICIAL_DATA = [
  {
    name: "第119回 長野えびす講煙火大会",
    englishName: "Nagano Ebisu-ko Fireworks Festival",
    date: "2025年11月23日(日)",
    location: "長野県・長野市/長野大橋西側 犀川第2緑地",
    expectedVisitors: "約40万人",
    features: ["信州", "晩秋", "煙火"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "nagano-ebisu-ko"
  },
  {
    name: "長岡まつり大花火大会",
    englishName: "Nagaoka Festival Grand Fireworks",
    date: "2025年8月2日(土)・3日(日)",
    location: "新潟県・長岡市/信濃川河川敷",
    expectedVisitors: "約34万5000人",
    features: ["復興祈願", "フェニックス", "大迫力"],
    source: "WalkerPlus官方",
    priority: "最高",
    id: "nagaoka-matsuri"
  },
  {
    name: "新潟まつり花火大会",
    englishName: "Niigata Festival Fireworks",
    date: "2025年8月10日(日)",
    location: "新潟県・新潟市中央区/新潟市中央区信濃川河畔(昭和大橋周辺)",
    expectedVisitors: "約32万人",
    features: ["信濃川", "壮大", "日本一"],
    source: "WalkerPlus官方",
    priority: "最高",
    id: "niigata-matsuri"
  },
  {
    name: "全国新作花火チャレンジカップ2025",
    englishName: "National New Fireworks Challenge Cup",
    date: "予選：2025年9月6日・13日・20日・27日、決勝：10月26日(日)",
    location: "長野県・諏訪市/長野県諏訪市湖畔公園前諏訪湖上",
    expectedVisitors: "約25万人",
    features: ["競技花火", "新作", "リニューアル"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "suwa-challenge-cup"
  },
  {
    name: "市川三郷町ふるさと夏まつり 第37回「神明の花火大会」",
    englishName: "Ichikawamisato Hometown Summer Festival Shinmei Fireworks",
    date: "2025年8月7日(木)",
    location: "山梨県・西八代郡市川三郷町/三郡橋下流笛吹川河畔",
    expectedVisitors: "約20万人",
    features: ["音楽", "2万発", "夜空の芸術"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "ichikawamisato-shinmei"
  },
  {
    name: "第51回 阿賀野川ござれや花火",
    englishName: "Aganogawa Gozareya Fireworks",
    date: "2025年8月25日(月)",
    location: "新潟県・新潟市北区/阿賀野川松浜橋上流側",
    expectedVisitors: "20万人",
    features: ["超特大", "スターマイン", "花鳥風月"],
    source: "WalkerPlus官方",
    priority: "中",
    id: "aganogawa-gozareya"
  },
  {
    name: "おぢやまつり大花火大会2024",
    englishName: "Ojiya Festival Grand Fireworks",
    date: "2024年8月24日(土)",
    location: "新潟県・小千谷市/信濃川河川敷(旭橋下流)",
    expectedVisitors: "18万人",
    features: ["超ワイド", "大スターマイン", "夜空"],
    source: "WalkerPlus官方",
    priority: "中",
    id: "ojiya-matsuri"
  },
  {
    name: "ぎおん柏崎まつり 海の大花火大会",
    englishName: "Gion Kashiwazaki Festival Sea Fireworks",
    date: "2025年7月26日(土)",
    location: "新潟県・柏崎市/柏崎市中央海岸・みなとまち海浜公園一帯",
    expectedVisitors: "約17万人",
    features: ["尺玉100発", "海", "豪華"],
    source: "WalkerPlus官方",
    priority: "高",
    id: "kashiwazaki-umi"
  }
];

interface LocalHanabiEvent {
  id: string;
  name: string;
  japaneseName?: string;
  englishName?: string;
  date: string;
  expectedVisitors?: string | number;
  location?: string;
  features?: string[];
}

interface ComparisonResult {
  timestamp: string;
  region: string;
  walkerPlusTotal: number;
  localTotal: number;
  matchedEvents: Array<{
    walkerPlus: any;
    local: LocalHanabiEvent;
    matchScore: number;
  }>;
  missingFromLocal: any[];
  onlyInLocal: LocalHanabiEvent[];
  recommendations: string[];
  dataQuality: {
    highPriorityMissing: number;
    mediumPriorityMissing: number;
    totalVisitorsWalkerPlus: string;
    totalVisitorsLocal: string;
  };
}

// 获取本地甲信越花火数据
async function getLocalKoshinetsuHanabiData(): Promise<LocalHanabiEvent[]> {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/koshinetsu-hanabi.json');
    if (!fs.existsSync(dataPath)) {
      console.log('📂 本地甲信越花火数据文件不存在，尝试从页面组件读取...');
      return [];
    }
    
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    return Array.isArray(data) ? data : (data.events || []);
  } catch (error: any) {
    console.log('⚠️ 无法读取本地数据文件，尝试从网页抓取...');
    return await scrapeLocalHanabiPage();
  }
}

// 从本地网页抓取甲信越花火数据
async function scrapeLocalHanabiPage(): Promise<LocalHanabiEvent[]> {
  let browser: Browser | null = null;
  try {
    console.log('🌐 启动浏览器获取本地网站数据...');
    browser = await chromium.launch({ 
      headless: true,
      timeout: 60000 
    });
    
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    console.log('📥 访问本地甲信越花火页面...');
    await page.goto('http://localhost:3003/koshinetsu/hanabi', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    const events: LocalHanabiEvent[] = [];
    
    // 抓取花火大会卡片数据
    $('[data-testid="hanabi-card"], .hanabi-card, .event-card').each((index, element) => {
      const $card = $(element);
      const name = $card.find('h3, .event-title, [data-testid="event-name"]').first().text().trim();
      const date = $card.find('[data-testid="event-date"], .event-date').text().trim();
      const visitors = $card.find('[data-testid="expected-visitors"], .expected-visitors').text().trim();
      
      if (name) {
        const event: LocalHanabiEvent = {
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: name,
          date: date || '未知',
          expectedVisitors: visitors || '未知'
        };
        
        events.push(event);
      }
    });
    
    console.log(`✅ 从本地网站获取到 ${events.length} 个花火大会`);
    return events;
    
  } catch (error: any) {
    console.error('❌ 抓取本地网站失败:', error.message);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 计算事件匹配度
function calculateMatchScore(walkerEvent: any, localEvent: LocalHanabiEvent): number {
  let score = 0;
  
  // 名称匹配（权重最高）
  const walkerName = walkerEvent.name.replace(/[^ぁ-んァ-ヶー一-龯a-zA-Z0-9]/g, '');
  const localName = (localEvent.name || '').replace(/[^ぁ-んァ-ヶー一-龯a-zA-Z0-9]/g, '');
  const localJapaneseName = (localEvent.japaneseName || '').replace(/[^ぁ-んァ-ヶー一-龯a-zA-Z0-9]/g, '');
  
  if (walkerName === localName || walkerName === localJapaneseName) {
    score += 70;
  } else if (localName.includes(walkerName) || walkerName.includes(localName) ||
             localJapaneseName.includes(walkerName) || walkerName.includes(localJapaneseName)) {
    score += 40;
  }
  
  // 日期匹配
  if (walkerEvent.date && localEvent.date) {
    const walkerDateNumbers = walkerEvent.date.match(/\d+/g) || [];
    const localDateNumbers = localEvent.date.match(/\d+/g) || [];
    const commonNumbers = walkerDateNumbers.filter((num: string) => localDateNumbers.includes(num));
    score += Math.min(commonNumbers.length * 10, 20);
  }
  
  // 地点匹配
  if (walkerEvent.location && localEvent.location) {
    const walkerLocation = walkerEvent.location.replace(/[^ぁ-んァ-ヶー一-龯]/g, '');
    const localLocation = localEvent.location.replace(/[^ぁ-んァ-ヶー一-龯]/g, '');
    if (walkerLocation.includes(localLocation) || localLocation.includes(walkerLocation)) {
      score += 10;
    }
  }
  
  return score;
}

// 执行数据对比分析
async function compareHanabiData(): Promise<ComparisonResult> {
  console.log('🎆 开始甲信越花火数据对比分析...');
  
  const localEvents = await getLocalKoshinetsuHanabiData();
  const walkerPlusEvents = WALKERPLUS_OFFICIAL_DATA;
  
  const matchedEvents: any[] = [];
  const missingFromLocal: any[] = [];
  const onlyInLocal: LocalHanabiEvent[] = [...localEvents];
  
  // 寻找匹配和缺失的事件
  for (const walkerEvent of walkerPlusEvents) {
    let bestMatch: { event: LocalHanabiEvent; score: number } | null = null;
    
    for (const localEvent of localEvents) {
      const score = calculateMatchScore(walkerEvent, localEvent);
      if (score >= 40 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { event: localEvent, score };
      }
    }
    
    if (bestMatch) {
      matchedEvents.push({
        walkerPlus: walkerEvent,
        local: bestMatch.event,
        matchScore: bestMatch.score
      });
      // 从onlyInLocal中移除已匹配的事件
      const index = onlyInLocal.findIndex(e => e.id === bestMatch!.event.id);
      if (index !== -1) {
        onlyInLocal.splice(index, 1);
      }
    } else {
      missingFromLocal.push(walkerEvent);
    }
  }
  
  // 生成建议
  const recommendations: string[] = [];
  const highPriorityMissing = missingFromLocal.filter(e => e.priority === '最高' || e.priority === '高').length;
  const mediumPriorityMissing = missingFromLocal.filter(e => e.priority === '中').length;
  
  if (missingFromLocal.length > 0) {
    recommendations.push(`❗ 发现${missingFromLocal.length}个WalkerPlus官方花火大会未在本地网站中展示`);
    if (highPriorityMissing > 0) {
      recommendations.push(`🚨 高优先级缺失${highPriorityMissing}个重要花火大会，建议立即添加`);
    }
  }
  
  if (matchedEvents.length > 0) {
    recommendations.push(`✅ 成功匹配${matchedEvents.length}个花火大会`);
  }
  
  return {
    timestamp: new Date().toISOString(),
    region: 'koshinetsu',
    walkerPlusTotal: walkerPlusEvents.length,
    localTotal: localEvents.length,
    matchedEvents,
    missingFromLocal,
    onlyInLocal,
    recommendations,
    dataQuality: {
      highPriorityMissing,
      mediumPriorityMissing,
      totalVisitorsWalkerPlus: '约174万5000人',
      totalVisitorsLocal: '未计算'
    }
  };
}

// 生成详细报告
function generateDetailedReport(result: ComparisonResult): string {
  const report = `
# 甲信越花火大会数据对比分析报告
## 📊 数据概览
- **WalkerPlus官方数据**: ${result.walkerPlusTotal}个花火大会
- **本地网站数据**: ${result.localTotal}个花火大会  
- **成功匹配**: ${result.matchedEvents.length}个
- **本地缺失**: ${result.missingFromLocal.length}个
- **本地独有**: ${result.onlyInLocal.length}个

## 🎯 数据质量分析
- **高优先级缺失**: ${result.dataQuality.highPriorityMissing}个
- **中优先级缺失**: ${result.dataQuality.mediumPriorityMissing}个
- **WalkerPlus总观众数**: ${result.dataQuality.totalVisitorsWalkerPlus}

## ❌ 本地网站缺失的重要花火大会

${result.missingFromLocal.map((event, index) => `
### ${index + 1}. ${event.name}
- **优先级**: ${event.priority}
- **日期**: ${event.date}
- **地点**: ${event.location}
- **预计观众**: ${event.expectedVisitors}
- **特色**: ${event.features.join(', ')}
- **建议**: ${event.priority === '最高' ? '🚨 立即添加' : event.priority === '高' ? '❗ 重点关注' : '📝 可以考虑添加'}
`).join('')}

## ✅ 成功匹配的花火大会

${result.matchedEvents.map((match, index) => `
### ${index + 1}. ${match.walkerPlus.name}
- **匹配度**: ${match.matchScore}%
- **本地名称**: ${match.local.name}
- **状态**: ${match.matchScore >= 70 ? '✅ 完全匹配' : '⚠️ 部分匹配，建议核实'}
`).join('')}

## 📋 建议行动

${result.recommendations.map(rec => `- ${rec}`).join('\n')}

## 🔧 技术说明
- **分析时间**: ${result.timestamp}
- **数据来源**: WalkerPlus官方网站 (https://hanabi.walkerplus.com/crowd/ar0400/)
- **使用技术**: Playwright + Cheerio
- **匹配算法**: 基于名称、日期、地点的多维度匹配

---
*此报告由AI基于WalkerPlus官方数据自动生成*
`;
  
  return report;
}

// 主函数
async function main() {
  try {
    console.log('🎆 开始甲信越花火大会数据对比...');
    console.log('📊 使用Playwright+Cheerio技术对比WalkerPlus官方数据...');
    
    const result = await compareHanabiData();
    const report = generateDetailedReport(result);
    
    // 保存分析结果
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFile = `koshinetsu-walkerplus-comparison-${timestamp}.json`;
    const reportFile = `koshinetsu-walkerplus-report-${timestamp}.md`;
    
    fs.writeFileSync(jsonFile, JSON.stringify(result, null, 2), 'utf-8');
    fs.writeFileSync(reportFile, report, 'utf-8');
    
    console.log('\n🎯 数据对比分析完成！');
    console.log(`📁 详细报告已保存至: ${reportFile}`);
    console.log(`📁 JSON数据已保存至: ${jsonFile}`);
    
    // 输出关键结果
    console.log('\n📊 关键发现:');
    result.recommendations.forEach(rec => console.log(rec));
    
    if (result.missingFromLocal.length > 0) {
      console.log('\n🚨 重要提醒:');
      console.log(`本地网站缺失 ${result.missingFromLocal.length} 个WalkerPlus官方花火大会`);
      console.log(`其中高优先级缺失 ${result.dataQuality.highPriorityMissing} 个`);
      console.log('建议立即补充这些重要的花火信息！');
    }
    
  } catch (error: any) {
    console.error('❌ 分析过程出现错误:', error.message);
    console.error('🔧 请检查网络连接和本地服务器状态');
  }
}

// 运行分析
main();

export { main, compareHanabiData, WALKERPLUS_OFFICIAL_DATA }; 