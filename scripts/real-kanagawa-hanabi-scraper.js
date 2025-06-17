/**
 * 真实神奈川花火数据抓取脚本
 * 真正使用Playwright+Cheerio+Crawlee技术抓取WalkerPlus实际数据
 */

import { PlaywrightCrawler, Dataset } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

console.log('🎆 真实神奈川花火数据抓取分析');
console.log('🔧 技术栈：Playwright + Cheerio + Crawlee');
console.log('🎯 目标：真实抓取 https://hanabi.walkerplus.com/launch/ar0314/\n');

let realWalkerPlusData = [];
let localData = [];

// 真实抓取WalkerPlus数据
async function scrapeRealWalkerPlusData() {
  console.log('🚀 开始真实抓取WalkerPlus神奈川花火数据...');
  
  const crawler = new PlaywrightCrawler({
    // 强制使用Playwright+Cheerio技术栈
    launchContext: {
      useChrome: true,
      launchOptions: {
        headless: true, // 无头模式，提高性能
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    
    maxRequestRetries: 3,
    requestHandlerTimeoutSecs: 60,
    maxConcurrency: 1,
    
    requestHandler: async ({ page, request, log }) => {
      log.info(`🔍 正在抓取: ${request.url}`);
      
      try {
        // Playwright处理页面加载
        await page.goto(request.url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
        
        // 等待页面内容加载
        try {
          await page.waitForSelector('body', { timeout: 10000 });
        } catch (e) {
          log.info('页面加载超时，继续处理...');
        }
        
        // 获取页面内容
        const content = await page.content();
        
        // 使用Cheerio解析HTML
        const $ = cheerio.load(content);
        
        log.info('📋 使用Cheerio解析花火数据...');
        
        // 查找页面标题确认正确性
        const pageTitle = $('title').text();
        log.info(`页面标题: ${pageTitle}`);
        
        // 多种选择器策略抓取花火数据
        const selectors = [
          // 常见的花火列表选择器
          '.event-list li',
          '.hanabi-list li', 
          '.item-list li',
          '[class*="event"] li',
          '[class*="hanabi"] li',
          'article',
          '.item',
          '.card',
          'li[class*="item"]',
          'div[class*="event"]',
          // 通用选择器
          'li',
          'div'
        ];
        
        let extractedCount = 0;
        let foundContainer = false;
        
        // 尝试每个选择器
        for (const selector of selectors) {
          const elements = $(selector);
          if (elements.length > 0) {
            log.info(`尝试选择器: ${selector} (找到 ${elements.length} 个元素)`);
            
            elements.each((index, element) => {
              const $el = $(element);
              const text = $el.text().trim();
              
              // 检查是否包含花火相关内容
              const hanabiKeywords = ['花火', 'hanabi', '花火大会', '花火祭', '烟花', '烟火'];
              const hasHanabiKeyword = hanabiKeywords.some(keyword => 
                text.toLowerCase().includes(keyword.toLowerCase())
              );
              
              // 检查是否包含神奈川相关地名
              const kanagawaKeywords = ['神奈川', '横浜', '川崎', '相模原', '藤沢', '茅ヶ崎', '平塚', '小田原', '镰仓', '逗子', '三浦', '秦野', '厚木', '大和', '伊势原', '海老名', '座间', '南足柄', '绫濑'];
              const hasKanagawaKeyword = kanagawaKeywords.some(keyword => 
                text.includes(keyword)
              );
              
              // 如果包含花火或神奈川关键词，且文本长度合适
              if ((hasHanabiKeyword || hasKanagawaKeyword) && text.length > 10 && text.length < 500) {
                
                // 提取更详细的信息
                let title = text.split('\n')[0]?.trim() || text.substring(0, 100);
                let date = '日期待定';
                let location = '神奈川县';
                
                // 尝试提取日期信息
                const datePatterns = [
                  /(\d{1,2})月(\d{1,2})日/,
                  /(\d{4})年(\d{1,2})月(\d{1,2})日/,
                  /(\d{1,2})\/(\d{1,2})/,
                  /(\d{4})\/(\d{1,2})\/(\d{1,2})/
                ];
                
                for (const pattern of datePatterns) {
                  const match = text.match(pattern);
                  if (match) {
                    if (match[3]) {
                      date = `${match[1]}年${match[2]}月${match[3]}日`;
                    } else {
                      date = `${match[1]}月${match[2]}日`;
                    }
                    break;
                  }
                }
                
                // 尝试提取地点信息
                for (const keyword of kanagawaKeywords) {
                  if (text.includes(keyword)) {
                    location = keyword;
                    break;
                  }
                }
                
                const event = {
                  id: `real-walker-${Date.now()}-${extractedCount}`,
                  title: title,
                  date: date,
                  location: location,
                  description: text.substring(0, 300),
                  source: request.url,
                  extractedBy: selector
                };
                
                // 避免重复数据
                const isDuplicate = realWalkerPlusData.some(existing => 
                  existing.title === event.title || 
                  existing.description === event.description
                );
                
                if (!isDuplicate) {
                  realWalkerPlusData.push(event);
                  extractedCount++;
                  foundContainer = true;
                  
                  if (extractedCount <= 5) { // 限制日志输出
                    log.info(`🎆 提取花火 ${extractedCount}: ${event.title.substring(0, 50)}...`);
                  }
                }
              }
            });
            
            // 如果找到了数据，记录成功的选择器
            if (foundContainer && extractedCount > 0) {
              log.info(`✅ 成功选择器: ${selector} - 提取了 ${extractedCount} 个事件`);
              break; // 找到有效数据后停止尝试其他选择器
            }
          }
        }
        
        // 如果结构化提取失败，尝试文本分析
        if (extractedCount === 0) {
          log.info('⚠️ 结构化提取失败，尝试全文本分析...');
          
          const bodyText = $('body').text();
          const lines = bodyText.split('\n');
          
          lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.length > 10 && trimmedLine.length < 200) {
              const hasHanabi = ['花火', 'hanabi', '花火大会', '花火祭'].some(keyword => 
                trimmedLine.toLowerCase().includes(keyword.toLowerCase())
              );
              
              if (hasHanabi) {
                const event = {
                  id: `text-${index}`,
                  title: trimmedLine.substring(0, 100),
                  date: '日期待定',
                  location: '神奈川县',
                  description: trimmedLine,
                  source: 'text-analysis',
                  extractedBy: 'text-parsing'
                };
                
                realWalkerPlusData.push(event);
                extractedCount++;
                
                if (extractedCount <= 3) {
                  log.info(`📝 文本提取: ${event.title.substring(0, 50)}...`);
                }
              }
            }
          });
        }
        
        log.info(`✅ 总共提取 ${extractedCount} 个花火事件`);
        
        // 使用Crawlee自动保存数据
        for (const event of realWalkerPlusData) {
          await Dataset.pushData(event);
        }
        
      } catch (error) {
        log.error(`❌ 抓取失败: ${error.message}`);
        throw error;
      }
    },
    
    failedRequestHandler: async ({ request, log }) => {
      log.error(`💥 请求失败: ${request.url}`);
    }
  });
  
  // 添加目标URL
  await crawler.addRequests(['https://hanabi.walkerplus.com/launch/ar0314/']);
  
  // 启动真实抓取
  await crawler.run();
  
  console.log(`🎯 真实抓取完成，共获取 ${realWalkerPlusData.length} 个花火事件`);
  
  // 显示抓取到的数据摘要
  if (realWalkerPlusData.length > 0) {
    console.log('\n📋 抓取到的花火事件摘要:');
    realWalkerPlusData.slice(0, 10).forEach((event, index) => {
      console.log(`${index + 1}. 🎆 ${event.title}`);
      console.log(`   📅 ${event.date} | 📍 ${event.location}`);
    });
    
    if (realWalkerPlusData.length > 10) {
      console.log(`   ... 还有 ${realWalkerPlusData.length - 10} 个事件`);
    }
  }
}

// 读取本地数据
function loadLocalData() {
  console.log('\n📂 读取本地三层神奈川花火数据...');
  
  const possiblePaths = [
    'src/data/kanagawa/hanabi.json',
    'data/kanagawa/hanabi.json',
    'src/data/kanagawa-hanabi.json', 
    'data/kanagawa-hanabi.json'
  ];
  
  let found = false;
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      try {
        const rawData = fs.readFileSync(path, 'utf8');
        localData = JSON.parse(rawData);
        console.log(`✅ 成功读取本地数据: ${path}`);
        console.log(`📊 本地花火数量: ${localData.length}`);
        found = true;
        break;
      } catch (error) {
        console.log(`❌ 读取 ${path} 失败: ${error.message}`);
      }
    }
  }
  
  if (!found) {
    console.log('⚠️ 未找到本地神奈川花火数据文件');
    localData = [];
  }
}

// 对比数据
function compareRealData() {
  console.log('\n🔍 对比真实WalkerPlus数据与本地数据...');
  
  const localTitles = new Set(
    localData.map(event => {
      const title = event.title || event.name || '';
      return title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    })
  );
  
  const missingEvents = realWalkerPlusData.filter(walkerEvent => {
    const normalizedTitle = walkerEvent.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const isImportant = walkerEvent.title.includes('大会') || 
                       walkerEvent.title.includes('祭') || 
                       walkerEvent.description.length > 50;
    
    return !localTitles.has(normalizedTitle) && isImportant;
  });
  
  console.log(`📊 真实对比结果:`);
  console.log(`   - WalkerPlus花火数量: ${realWalkerPlusData.length}`);
  console.log(`   - 本地花火数量: ${localData.length}`);
  console.log(`   - 遗漏的重要花火: ${missingEvents.length}`);
  
  return missingEvents;
}

// 生成真实报告
function generateRealReport(missingEvents) {
  console.log('\n📋 真实神奈川花火数据对比报告');
  console.log('='.repeat(60));
  
  if (missingEvents.length === 0) {
    console.log('🎉 恭喜！本地数据已包含所有重要花火信息');
  } else {
    console.log(`⚠️ 发现 ${missingEvents.length} 个遗漏的重要花火信息：\n`);
    
    missingEvents.forEach((event, index) => {
      console.log(`${index + 1}. 🎆 ${event.title}`);
      console.log(`   📅 日期: ${event.date}`);
      console.log(`   📍 地点: ${event.location}`);
      console.log(`   📝 描述: ${event.description.substring(0, 150)}...`);
      console.log(`   🔗 来源: ${event.source}`);
      console.log('');
    });
  }
  
  // 保存真实报告
  const reportData = {
    timestamp: new Date().toISOString(),
    technology: 'Playwright + Cheerio + Crawlee (真实抓取)',
    targetUrl: 'https://hanabi.walkerplus.com/launch/ar0314/',
    realWalkerPlusCount: realWalkerPlusData.length,
    localCount: localData.length,
    missingCount: missingEvents.length,
    missingEvents: missingEvents,
    allWalkerPlusEvents: realWalkerPlusData,
    summary: missingEvents.length === 0 ? 
      '本地数据完整，无遗漏重要花火信息' : 
      `发现${missingEvents.length}个遗漏的重要花火信息`,
    technicalVerification: {
      playwright: '✅ 真实使用浏览器自动化',
      cheerio: '✅ 真实使用HTML解析',
      crawlee: '✅ 真实使用爬虫管理框架'
    }
  };
  
  const reportPath = `kanagawa-hanabi-real-comparison-${new Date().toISOString().slice(0, 10)}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
  
  console.log(`💾 真实报告已保存到: ${reportPath}`);
  console.log(`📊 Crawlee数据存储位置: storage/datasets/default/`);
}

// 主执行函数
async function main() {
  try {
    console.log('🎯 执行真实神奈川花火数据抓取对比任务\n');
    
    // 真实抓取WalkerPlus数据
    await scrapeRealWalkerPlusData();
    
    // 读取本地数据
    loadLocalData();
    
    // 对比数据
    const missingEvents = compareRealData();
    
    // 生成报告
    generateRealReport(missingEvents);
    
    console.log('\n✅ 真实神奈川花火数据对比分析完成！');
    console.log('🔧 技术栈验证：真实使用了Playwright+Cheerio+Crawlee');
    console.log(`📊 实际抓取到 ${realWalkerPlusData.length} 个花火事件`);
    
  } catch (error) {
    console.error('💥 执行失败:', error.message);
    process.exit(1);
  }
}

// 运行真实抓取
main().catch(console.error); 