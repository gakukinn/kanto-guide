import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

// WalkerPlus北关东官方数据源URLs
const WALKERPLUS_URLS = {
  gunma: 'https://hanabi.walkerplus.com/crowd/ar0310/',     // 群马县
  tochigi: 'https://hanabi.walkerplus.com/crowd/ar0309/',   // 栃木县
  ibaraki: 'https://hanabi.walkerplus.com/crowd/ar0308/'    // 茨城县
};

interface WalkerPlusHanabiEvent {
  name: string;
  englishName?: string;
  date: string;
  location: string;
  expectedVisitors: string;
  features: string[];
  source: string;
  prefecture: string;
  priority: string;
  id: string;
}

interface LocalHanabiEvent {
  id: string;
  name: string;
  japaneseName?: string;
  englishName?: string;
  date: string;
  expectedVisitors?: string | number;
  location?: string;
  features?: string[];
  prefecture?: string;
}

interface ComparisonResult {
  timestamp: string;
  region: string;
  walkerPlusTotal: number;
  localTotal: number;
  prefectureBreakdown: {
    [key: string]: {
      walkerPlus: number;
      local: number;
      matched: number;
      missing: number;
    };
  };
  matchedEvents: Array<{
    walkerPlus: WalkerPlusHanabiEvent;
    local: LocalHanabiEvent;
    matchScore: number;
  }>;
  missingFromLocal: WalkerPlusHanabiEvent[];
  onlyInLocal: LocalHanabiEvent[];
  recommendations: string[];
  dataQuality: {
    highPriorityMissing: number;
    mediumPriorityMissing: number;
    totalVisitorsWalkerPlus: string;
    coverageRate: string;
  };
}

// 从WalkerPlus抓取花火数据
async function scrapeWalkerPlusHanabi(url: string, prefecture: string): Promise<WalkerPlusHanabiEvent[]> {
  let browser: Browser | null = null;
  try {
    console.log(`🌐 启动浏览器抓取${prefecture}花火数据...`);
    browser = await chromium.launch({ 
      headless: true,
      timeout: 60000 
    });
    
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    console.log(`📥 访问WalkerPlus ${prefecture} 花火页面: ${url}`);
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // 等待页面加载完成
    await page.waitForTimeout(3000);
    
    const content = await page.content();
    const $ = cheerio.load(content);
    const events: WalkerPlusHanabiEvent[] = [];
    
    // 抓取花火大会列表数据
    $('.event-item, .hanabi-item, [class*="event"], [class*="hanabi"]').each((index, element) => {
      const $item = $(element);
      
      // 提取基本信息
      const name = $item.find('h3, h4, .title, .event-title, .name').first().text().trim();
      const date = $item.find('.date, .event-date, [class*="date"]').text().trim();
      const location = $item.find('.location, .venue, .place, [class*="location"]').text().trim();
      const visitors = $item.find('.visitors, .attendance, [class*="visitor"]').text().trim();
      
      if (name && name.length > 5) { // 过滤掉过短的标题
        const event: WalkerPlusHanabiEvent = {
          name: name,
          englishName: convertToEnglish(name),
          date: date || '未知',
          location: location || `${prefecture}内`,
          expectedVisitors: visitors || '未公布',
          features: extractFeatures(name, location),
          source: 'WalkerPlus官方',
          prefecture: prefecture,
          priority: determinePriority(name, visitors),
          id: generateId(name, prefecture)
        };
        
        events.push(event);
      }
    });
    
    // 如果主要选择器没有找到，尝试备用选择器
    if (events.length === 0) {
      $('article, .item, .card, li').each((index, element) => {
        const $item = $(element);
        const text = $item.text();
        
        if (text.includes('花火') && text.length > 20) {
          const nameMatch = text.match(/([^。]+花火[^。]+)/);
          const dateMatch = text.match(/(\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日)/);
          const visitorsMatch = text.match(/(約?\d+万人|\d+万人)/);
          
          if (nameMatch) {
            const event: WalkerPlusHanabiEvent = {
              name: nameMatch[1].trim(),
              englishName: convertToEnglish(nameMatch[1]),
              date: dateMatch ? dateMatch[1] : '未知',
              location: `${prefecture}内`,
              expectedVisitors: visitorsMatch ? visitorsMatch[1] : '未公布',
              features: extractFeatures(nameMatch[1], ''),
              source: 'WalkerPlus官方',
              prefecture: prefecture,
              priority: determinePriority(nameMatch[1], visitorsMatch?.[1] || ''),
              id: generateId(nameMatch[1], prefecture)
            };
            
            events.push(event);
          }
        }
      });
    }
    
    console.log(`✅ 从${prefecture}获取到 ${events.length} 个花火大会`);
    return events;
    
  } catch (error: any) {
    console.error(`❌ 抓取${prefecture}数据失败:`, error.message);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 获取本地北关东花火数据
async function getLocalKitakantoHanabiData(): Promise<LocalHanabiEvent[]> {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/kitakanto-hanabi.json');
    if (!fs.existsSync(dataPath)) {
      console.log('📂 本地北关东花火数据文件不存在，尝试从页面组件读取...');
      return await scrapeLocalHanabiPage();
    }
    
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    return Array.isArray(data) ? data : (data.events || []);
  } catch (error: any) {
    console.log('⚠️ 无法读取本地数据文件，尝试从网页抓取...');
    return await scrapeLocalHanabiPage();
  }
}

// 从本地网页抓取北关东花火数据
async function scrapeLocalHanabiPage(): Promise<LocalHanabiEvent[]> {
  let browser: Browser | null = null;
  try {
    console.log('🌐 启动浏览器获取本地北关东花火数据...');
    browser = await chromium.launch({ 
      headless: true,
      timeout: 60000 
    });
    
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    console.log('📥 访问本地北关东花火页面...');
    await page.goto('http://localhost:3003/kitakanto/hanabi', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);
    const events: LocalHanabiEvent[] = [];
    
    // 抓取花火大会卡片数据
    $('[data-testid="hanabi-card"], .hanabi-card, .event-card, .card').each((index, element) => {
      const $card = $(element);
      const name = $card.find('h3, .event-title, [data-testid="event-name"]').first().text().trim();
      const date = $card.find('[data-testid="event-date"], .event-date').text().trim();
      const visitors = $card.find('[data-testid="expected-visitors"], .expected-visitors').text().trim();
      const location = $card.find('.location, .venue').text().trim();
      
      if (name) {
        const event: LocalHanabiEvent = {
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: name,
          date: date || '未知',
          expectedVisitors: visitors || '未知',
          location: location || '未知',
          prefecture: determinePrefecture(name, location)
        };
        
        events.push(event);
      }
    });
    
    console.log(`✅ 从本地网站获取到 ${events.length} 个北关东花火大会`);
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

// 辅助函数
function convertToEnglish(japaneseName: string): string {
  const conversions: { [key: string]: string } = {
    '花火大会': 'Fireworks Festival',
    '花火': 'Fireworks',
    '祭': 'Festival',
    '夏祭': 'Summer Festival',
    '大会': 'Grand Event',
    '第': '',
    '回': 'th'
  };
  
  let english = japaneseName;
  Object.keys(conversions).forEach(jp => {
    english = english.replace(new RegExp(jp, 'g'), conversions[jp]);
  });
  
  return english.trim() || japaneseName;
}

function extractFeatures(name: string, location: string): string[] {
  const features = [];
  
  if (name.includes('川') || location.includes('川')) features.push('河川花火');
  if (name.includes('湖') || location.includes('湖')) features.push('湖上花火');
  if (name.includes('海') || location.includes('海')) features.push('海上花火');
  if (name.includes('祭') || name.includes('まつり')) features.push('祭典花火');
  if (name.includes('夏')) features.push('夏季花火');
  if (name.includes('大会')) features.push('花火大会');
  
  return features.length > 0 ? features : ['花火'];
}

function determinePriority(name: string, visitors: string): string {
  const visitorsNum = extractVisitorNumber(visitors);
  
  if (visitorsNum >= 200000) return '最高';
  if (visitorsNum >= 100000) return '高';
  if (visitorsNum >= 50000) return '中';
  return '低';
}

function extractVisitorNumber(visitors: string): number {
  const match = visitors.match(/(\d+(?:\.\d+)?)万人/);
  if (match) {
    return parseFloat(match[1]) * 10000;
  }
  return 0;
}

function generateId(name: string, prefecture: string): string {
  const cleanName = name.replace(/[^ぁ-ん-ヶー一-龯a-zA-Z0-9]/g, '').toLowerCase();
  const prefixMap: { [key: string]: string } = {
    '群马县': 'gunma',
    '栃木县': 'tochigi', 
    '茨城县': 'ibaraki'
  };
  
  const prefix = prefixMap[prefecture] || prefecture.toLowerCase();
  return `${prefix}-${cleanName}`;
}

function determinePrefecture(name: string, location: string): string {
  if (name.includes('前橋') || name.includes('高崎') || name.includes('群馬')) return '群马县';
  if (name.includes('宇都宮') || name.includes('栃木') || name.includes('那須')) return '栃木县';
  if (name.includes('水戸') || name.includes('つくば') || name.includes('茨城')) return '茨城县';
  
  if (location.includes('群馬') || location.includes('前橋') || location.includes('高崎')) return '群马县';
  if (location.includes('栃木') || location.includes('宇都宮') || location.includes('那須')) return '栃木县';
  if (location.includes('茨城') || location.includes('水戸') || location.includes('つくば')) return '茨城县';
  
  return '未知';
}

// 计算事件匹配度
function calculateMatchScore(walkerEvent: WalkerPlusHanabiEvent, localEvent: LocalHanabiEvent): number {
  let score = 0;
  
  // 名称匹配（权重最高）
  const walkerName = walkerEvent.name.replace(/[^ぁ-ん-ヶー一-龯a-zA-Z0-9]/g, '');
  const localName = (localEvent.name || '').replace(/[^ぁ-ん-ヶー一-龯a-zA-Z0-9]/g, '');
  const localJapaneseName = (localEvent.japaneseName || '').replace(/[^ぁ-ん-ヶー一-龯a-zA-Z0-9]/g, '');
  
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
  
  // 地点/县匹配
  if (walkerEvent.prefecture && localEvent.prefecture) {
    if (walkerEvent.prefecture === localEvent.prefecture) {
      score += 10;
    }
  }
  
  return score;
}

// 执行完整的数据对比分析
async function compareKitakantoHanabiData(): Promise<ComparisonResult> {
  console.log('🎆 开始北关东花火数据对比分析...');
  
  // 并行抓取3个县的WalkerPlus数据
  const [gunmaEvents, tochigiEvents, ibarakiEvents, localEvents] = await Promise.all([
    scrapeWalkerPlusHanabi(WALKERPLUS_URLS.gunma, '群马县'),
    scrapeWalkerPlusHanabi(WALKERPLUS_URLS.tochigi, '栃木县'),
    scrapeWalkerPlusHanabi(WALKERPLUS_URLS.ibaraki, '茨城县'),
    getLocalKitakantoHanabiData()
  ]);
  
  const allWalkerPlusEvents = [...gunmaEvents, ...tochigiEvents, ...ibarakiEvents];
  
  const matchedEvents: any[] = [];
  const missingFromLocal: WalkerPlusHanabiEvent[] = [];
  const onlyInLocal: LocalHanabiEvent[] = [...localEvents];
  
  // 建立县份统计
  const prefectureBreakdown: any = {
    '群马县': { walkerPlus: gunmaEvents.length, local: 0, matched: 0, missing: 0 },
    '栃木县': { walkerPlus: tochigiEvents.length, local: 0, matched: 0, missing: 0 },
    '茨城县': { walkerPlus: ibarakiEvents.length, local: 0, matched: 0, missing: 0 }
  };
  
  // 统计本地数据的县份分布
  localEvents.forEach(event => {
    const pref = event.prefecture || '未知';
    if (prefectureBreakdown[pref]) {
      prefectureBreakdown[pref].local++;
    }
  });
  
  // 寻找匹配和缺失的事件
  for (const walkerEvent of allWalkerPlusEvents) {
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
      
      // 更新县份匹配统计
      if (prefectureBreakdown[walkerEvent.prefecture]) {
        prefectureBreakdown[walkerEvent.prefecture].matched++;
      }
      
      // 从onlyInLocal中移除已匹配的事件
      const index = onlyInLocal.findIndex(e => e.id === bestMatch!.event.id);
      if (index !== -1) {
        onlyInLocal.splice(index, 1);
      }
    } else {
      missingFromLocal.push(walkerEvent);
      if (prefectureBreakdown[walkerEvent.prefecture]) {
        prefectureBreakdown[walkerEvent.prefecture].missing++;
      }
    }
  }
  
  // 生成建议
  const recommendations: string[] = [];
  const highPriorityMissing = missingFromLocal.filter(e => e.priority === '最高' || e.priority === '高').length;
  const mediumPriorityMissing = missingFromLocal.filter(e => e.priority === '中').length;
  
  if (missingFromLocal.length > 0) {
    recommendations.push(`❗ 发现${missingFromLocal.length}个WalkerPlus官方北关东花火大会未在本地网站中展示`);
    if (highPriorityMissing > 0) {
      recommendations.push(`🚨 高优先级缺失${highPriorityMissing}个重要花火大会，建议立即添加`);
    }
  }
  
  if (matchedEvents.length > 0) {
    recommendations.push(`✅ 成功匹配${matchedEvents.length}个花火大会`);
  }
  
  const coverageRate = allWalkerPlusEvents.length > 0 ? 
    ((matchedEvents.length / allWalkerPlusEvents.length) * 100).toFixed(1) + '%' : '0%';
  
  return {
    timestamp: new Date().toISOString(),
    region: 'kitakanto',
    walkerPlusTotal: allWalkerPlusEvents.length,
    localTotal: localEvents.length,
    prefectureBreakdown,
    matchedEvents,
    missingFromLocal,
    onlyInLocal,
    recommendations,
    dataQuality: {
      highPriorityMissing,
      mediumPriorityMissing,
      totalVisitorsWalkerPlus: calculateTotalVisitors(allWalkerPlusEvents),
      coverageRate
    }
  };
}

// 计算总观众数
function calculateTotalVisitors(events: WalkerPlusHanabiEvent[]): string {
  let total = 0;
  events.forEach(event => {
    const num = extractVisitorNumber(event.expectedVisitors);
    total += num;
  });
  
  if (total >= 10000) {
    return `约${(total / 10000).toFixed(1)}万人`;
  }
  return `约${total}人`;
}

// 生成详细报告
function generateDetailedReport(result: ComparisonResult): string {
  const report = `
# 北关东花火大会数据对比分析报告
## 📊 数据概览
- **WalkerPlus官方数据**: ${result.walkerPlusTotal}个花火大会
- **本地网站数据**: ${result.localTotal}个花火大会  
- **成功匹配**: ${result.matchedEvents.length}个
- **本地缺失**: ${result.missingFromLocal.length}个
- **本地独有**: ${result.onlyInLocal.length}个
- **覆盖率**: ${result.dataQuality.coverageRate}

## 🏛️ 各县数据分布

${Object.keys(result.prefectureBreakdown).map(prefecture => {
  const data = result.prefectureBreakdown[prefecture];
  return `### ${prefecture}
- **WalkerPlus官方**: ${data.walkerPlus}个
- **本地网站**: ${data.local}个
- **成功匹配**: ${data.matched}个
- **缺失**: ${data.missing}个
- **县内覆盖率**: ${data.walkerPlus > 0 ? ((data.matched / data.walkerPlus) * 100).toFixed(1) + '%' : '0%'}`;
}).join('\n\n')}

## 🎯 数据质量分析
- **高优先级缺失**: ${result.dataQuality.highPriorityMissing}个
- **中优先级缺失**: ${result.dataQuality.mediumPriorityMissing}个
- **WalkerPlus总观众数**: ${result.dataQuality.totalVisitorsWalkerPlus}

## ❌ 本地网站缺失的重要花火大会

${result.missingFromLocal.map((event, index) => `
### ${index + 1}. ${event.name}
- **优先级**: ${event.priority}
- **县份**: ${event.prefecture}
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
- **县份**: ${match.walkerPlus.prefecture}
- **状态**: ${match.matchScore >= 70 ? '✅ 完全匹配' : '⚠️ 部分匹配，建议核实'}
`).join('')}

## 📋 建议行动

${result.recommendations.map(rec => `- ${rec}`).join('\n')}

## 🔧 技术说明
- **分析时间**: ${result.timestamp}
- **数据来源**: WalkerPlus官方网站
  - 群马县: https://hanabi.walkerplus.com/crowd/ar0310/
  - 栃木县: https://hanabi.walkerplus.com/crowd/ar0309/
  - 茨城县: https://hanabi.walkerplus.com/crowd/ar0308/
- **使用技术**: Playwright + Cheerio
- **匹配算法**: 基于名称、日期、地点、县份的多维度匹配

---
*此报告由AI基于WalkerPlus官方数据自动生成*
`;
  
  return report;
}

// 主函数
async function main() {
  try {
    console.log('🎆 开始北关东花火大会数据对比...');
    console.log('📊 使用Playwright+Cheerio技术对比3个县的WalkerPlus官方数据...');
    
    const result = await compareKitakantoHanabiData();
    const report = generateDetailedReport(result);
    
    // 保存分析结果
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFile = `kitakanto-walkerplus-comparison-${timestamp}.json`;
    const reportFile = `kitakanto-walkerplus-report-${timestamp}.md`;
    
    fs.writeFileSync(jsonFile, JSON.stringify(result, null, 2), 'utf-8');
    fs.writeFileSync(reportFile, report, 'utf-8');
    
    console.log('\n🎯 北关东花火数据对比分析完成！');
    console.log(`📁 详细报告已保存至: ${reportFile}`);
    console.log(`📁 JSON数据已保存至: ${jsonFile}`);
    
    // 输出关键结果
    console.log('\n📊 关键发现:');
    result.recommendations.forEach(rec => console.log(rec));
    
    console.log('\n🏛️ 各县数据概况:');
    Object.keys(result.prefectureBreakdown).forEach(prefecture => {
      const data = result.prefectureBreakdown[prefecture];
      const coverage = data.walkerPlus > 0 ? ((data.matched / data.walkerPlus) * 100).toFixed(1) + '%' : '0%';
      console.log(`${prefecture}: ${data.matched}/${data.walkerPlus} 匹配 (覆盖率${coverage})`);
    });
    
    if (result.missingFromLocal.length > 0) {
      console.log('\n🚨 重要提醒:');
      console.log(`本地网站缺失 ${result.missingFromLocal.length} 个WalkerPlus官方北关东花火大会`);
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

export { main, compareKitakantoHanabiData, WALKERPLUS_URLS }; 