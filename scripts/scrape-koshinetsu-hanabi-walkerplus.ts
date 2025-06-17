import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface HanabiData {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  url: string;
  source: string;
}

async function scrapeKoshinetsuHanabiFromWalkerPlus(): Promise<HanabiData[]> {
  console.log('🚀 启动Playwright浏览器...');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    console.log('📥 访问WalkerPlus甲信越花火页面...');
    const targetUrl = 'https://hanabi.walkerplus.com/crowd/ar0400/';
    
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    console.log('⏳ 等待页面内容加载...');
    await page.waitForTimeout(3000);
    
    // 获取页面HTML内容
    const html = await page.content();
    console.log('📋 页面HTML获取成功，开始解析...');
    
    // 使用Cheerio解析HTML
    const $ = cheerio.load(html);
    const hanabiEvents: HanabiData[] = [];
    
    // 分析页面结构，寻找花火大会信息
    console.log('🔍 分析页面结构...');
    
    // 尝试多种可能的选择器
    const possibleSelectors = [
      '.event-item',
      '.hanabi-item', 
      '.list-item',
      '.item',
      'article',
      '.event',
      '.hanabi',
      '[data-event]',
      '.spot-item'
    ];
    
    let foundEvents = false;
    
    for (const selector of possibleSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        console.log(`✅ 发现 ${elements.length} 个元素使用选择器: ${selector}`);
        
        elements.each((index, element) => {
          const $element = $(element);
          const text = $element.text().trim();
          
          // 检查是否包含花火相关关键词
          if (text.includes('花火') || text.includes('hanabi') || text.includes('fireworks')) {
            const title = $element.find('h2, h3, .title, .name').first().text().trim() || 
                         $element.find('a').first().text().trim() ||
                         text.split('\n')[0].trim();
            
            if (title && title.length > 3) {
              // 提取详细信息
              const dateText = extractDateInfo(text);
              const locationText = extractLocationInfo(text);
              const linkElement = $element.find('a').first();
              const eventUrl = linkElement.length > 0 ? linkElement.attr('href') || '' : '';
              
              const event: HanabiData = {
                id: generateId(title),
                name: title,
                date: dateText,
                location: locationText,
                description: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
                url: eventUrl.startsWith('http') ? eventUrl : `https://hanabi.walkerplus.com${eventUrl}`,
                source: 'WalkerPlus甲信越花火'
              };
              
              hanabiEvents.push(event);
              console.log(`📋 提取花火: ${title}`);
            }
          }
        });
        
        if (hanabiEvents.length > 0) {
          foundEvents = true;
          break;
        }
      }
    }
    
    // 如果没有找到结构化数据，尝试文本分析
    if (!foundEvents) {
      console.log('🔍 尝试文本分析方法...');
      const bodyText = $('body').text();
      const lines = bodyText.split('\n').filter(line => 
        line.trim().length > 5 && 
        (line.includes('花火') || line.includes('祭') || line.includes('festival'))
      );
      
      console.log(`📝 找到 ${lines.length} 行相关文本`);
      lines.slice(0, 20).forEach(line => {
        console.log(`📋 文本: ${line.trim().substring(0, 100)}`);
      });
    }
    
    console.log(`🎆 总共提取到 ${hanabiEvents.length} 个花火大会`);
    return hanabiEvents;
    
  } catch (error) {
    console.error('❌ 抓取过程中出现错误:', error);
    return [];
  } finally {
    await browser.close();
    console.log('🔒 浏览器已关闭');
  }
}

function extractDateInfo(text: string): string {
  // 提取日期信息的正则表达式
  const datePatterns = [
    /(\d{4}年\d{1,2}月\d{1,2}日)/g,
    /(\d{1,2}月\d{1,2}日)/g,
    /(\d{4}\/\d{1,2}\/\d{1,2})/g,
    /(\d{1,2}\/\d{1,2})/g
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return '日期未确定';
}

function extractLocationInfo(text: string): string {
  // 提取地点信息的正则表达式
  const locationPatterns = [
    /([\u4e00-\u9fa5]+[県市区町村][\u4e00-\u9fa5]*)/g,
    /(新潟[県市]?[\u4e00-\u9fa5]*)/g,
    /(長野[県市]?[\u4e00-\u9fa5]*)/g,
    /(山梨[県市]?[\u4e00-\u9fa5]*)/g
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return '地点未确定';
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

async function compareWithLocalData(walkerPlusData: HanabiData[]) {
  console.log('\n🔍 开始对比本地数据...');
  
  // 读取本地甲信越花火数据
  try {
    const localPagePath = path.join(process.cwd(), 'src/app/koshinetsu/hanabi/page.tsx');
    const localContent = fs.readFileSync(localPagePath, 'utf-8');
    
    // 提取本地花火大会名称
    const localEvents: string[] = [];
    const nameMatches = localContent.match(/name: '([^']+)'/g);
    if (nameMatches) {
      nameMatches.forEach(match => {
        const name = match.replace(/name: '/, '').replace(/'$/, '');
        localEvents.push(name);
      });
    }
    
    console.log(`📋 本地花火大会数量: ${localEvents.length}`);
    console.log('📋 本地花火大会列表:');
    localEvents.forEach((name, index) => {
      console.log(`   ${index + 1}. ${name}`);
    });
    
    console.log(`\n📋 WalkerPlus花火大会数量: ${walkerPlusData.length}`);
    console.log('📋 WalkerPlus花火大会列表:');
    walkerPlusData.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.name}`);
    });
    
    // 查找缺失的活动
    console.log('\n🔍 分析缺失活动...');
    const missingEvents = walkerPlusData.filter(walkerEvent => {
      return !localEvents.some(localEvent => 
        localEvent.includes(walkerEvent.name.substring(0, 10)) ||
        walkerEvent.name.includes(localEvent.substring(0, 10))
      );
    });
    
    if (missingEvents.length > 0) {
      console.log('⚠️ 发现可能缺失的重要花火大会:');
      missingEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. ${event.name} (${event.date})`);
        console.log(`      地点: ${event.location}`);
        console.log(`      链接: ${event.url}`);
      });
    } else {
      console.log('✅ 本地数据覆盖了WalkerPlus的主要花火大会');
    }
    
  } catch (error) {
    console.error('❌ 读取本地数据时出错:', error);
  }
}

async function saveResults(data: HanabiData[]) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `koshinetsu-walkerplus-hanabi-${timestamp}.json`;
  const filepath = path.join(process.cwd(), filename);
  
  const result = {
    source: 'WalkerPlus甲信越花火',
    url: 'https://hanabi.walkerplus.com/crowd/ar0400/',
    scrapeTime: new Date().toISOString(),
    total: data.length,
    events: data
  };
  
  fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`💾 数据已保存到: ${filename}`);
}

// 主执行函数
async function main() {
  console.log('🎆 开始抓取WalkerPlus甲信越花火数据...\n');
  
  const walkerPlusData = await scrapeKoshinetsuHanabiFromWalkerPlus();
  
  if (walkerPlusData.length > 0) {
    await saveResults(walkerPlusData);
    await compareWithLocalData(walkerPlusData);
  } else {
    console.log('⚠️ 未能抓取到花火数据，可能需要调整抓取策略');
  }
  
  console.log('\n✅ 抓取任务完成');
}

// 直接执行
main().catch(console.error);

export { scrapeKoshinetsuHanabiFromWalkerPlus };
export type { HanabiData }; 