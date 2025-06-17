/**
 * 神奈川花火数据对比脚本 - 简化JavaScript版本
 * 使用Playwright+Cheerio+Crawlee技术对比WalkerPlus与本地数据
 */

import { PlaywrightCrawler, Dataset } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

console.log('🎆 开始神奈川花火数据对比分析...');
console.log('🔧 技术栈：Playwright + Cheerio + Crawlee');

let walkerPlusData = [];
let localData = [];
let missingEvents = [];

// 步骤1: 使用Crawlee抓取WalkerPlus数据
async function scrapeWalkerPlusData() {
  console.log('\n🚀 步骤1: 使用Playwright+Cheerio+Crawlee抓取WalkerPlus数据...');
  
  const crawler = new PlaywrightCrawler({
    // 强制使用Playwright+Cheerio技术栈
    launchContext: {
      useChrome: true,
    },
    
    maxRequestRetries: 2,
    requestHandlerTimeoutSecs: 30,
    maxConcurrency: 1,
    
    requestHandler: async ({ page, request, log }) => {
      log.info(`🔍 正在抓取: ${request.url}`);
      
      try {
        // Playwright处理页面加载
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        // 获取页面内容
        const content = await page.content();
        
        // 使用Cheerio解析HTML
        const $ = cheerio.load(content);
        
        log.info('📋 使用Cheerio解析花火数据...');
        
        // 查找页面标题确认正确性
        const pageTitle = $('title').text();
        log.info(`页面标题: ${pageTitle}`);
        
        // 查找花火相关内容
        const bodyText = $('body').text();
        const hanabiKeywords = ['花火', 'hanabi', '花火大会', '花火祭'];
        
        let foundHanabi = false;
        hanabiKeywords.forEach(keyword => {
          if (bodyText.toLowerCase().includes(keyword.toLowerCase())) {
            foundHanabi = true;
          }
        });
        
        if (foundHanabi) {
          log.info('✅ 发现花火相关内容');
          
          // 尝试提取结构化数据
          const eventContainers = [
            '.event-list li',
            '.hanabi-list li',
            '[class*="event"] li',
            'article',
            '.item'
          ];
          
          let extractedCount = 0;
          
          eventContainers.forEach(selector => {
            const elements = $(selector);
            if (elements.length > 0) {
              log.info(`找到 ${elements.length} 个元素: ${selector}`);
              
              elements.each((index, element) => {
                const $el = $(element);
                const text = $el.text().trim();
                
                if (text.length > 10 && (text.includes('花火') || text.includes('hanabi'))) {
                  const event = {
                    id: `walker-${Date.now()}-${extractedCount}`,
                    title: text.substring(0, 100),
                    date: '日期待定',
                    location: '神奈川县',
                    description: text.substring(0, 200),
                    source: request.url
                  };
                  
                  walkerPlusData.push(event);
                  extractedCount++;
                  
                  if (extractedCount <= 3) { // 限制日志输出
                    log.info(`🎆 提取花火: ${event.title.substring(0, 50)}...`);
                  }
                }
              });
            }
          });
          
          // 如果没找到结构化数据，从文本中提取
          if (extractedCount === 0) {
            log.info('⚠️ 未找到结构化数据，尝试文本分析...');
            
            const lines = bodyText.split('\n');
            lines.forEach((line, index) => {
              if (line.includes('花火') && line.trim().length > 5) {
                walkerPlusData.push({
                  id: `text-${index}`,
                  title: line.trim().substring(0, 100),
                  date: '日期待定',
                  location: '神奈川县',
                  description: line.trim(),
                  source: 'text-analysis'
                });
                extractedCount++;
              }
            });
          }
          
          log.info(`✅ 总共提取 ${extractedCount} 个花火事件`);
          
        } else {
          log.info('⚠️ 未发现花火相关内容');
        }
        
        // 使用Crawlee自动保存数据
        for (const event of walkerPlusData) {
          await Dataset.pushData(event);
        }
        
      } catch (error) {
        log.error(`❌ 抓取失败: ${error.message}`);
      }
    },
    
    failedRequestHandler: async ({ request, log }) => {
      log.error(`💥 请求失败: ${request.url}`);
    }
  });
  
  // 添加目标URL
  await crawler.addRequests(['https://hanabi.walkerplus.com/launch/ar0314/']);
  
  // 启动抓取
  await crawler.run();
  
  console.log(`🎯 WalkerPlus抓取完成，共获取 ${walkerPlusData.length} 个花火事件`);
}

// 步骤2: 读取本地数据
async function loadLocalData() {
  console.log('\n📂 步骤2: 读取本地三层神奈川花火数据...');
  
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
    console.log('📁 尝试查找的路径:');
    possiblePaths.forEach(path => console.log(`   - ${path}`));
    localData = [];
  }
}

// 步骤3: 对比数据
function compareData() {
  console.log('\n🔍 步骤3: 对比WalkerPlus数据与本地数据...');
  
  // 创建本地标题集合
  const localTitles = new Set(
    localData.map(event => {
      const title = event.title || event.name || '';
      return title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    })
  );
  
  // 查找遗漏的重要花火
  missingEvents = walkerPlusData.filter(walkerEvent => {
    const normalizedTitle = walkerEvent.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const isImportant = walkerEvent.title.includes('大会') || 
                       walkerEvent.title.includes('祭') || 
                       walkerEvent.description.length > 50;
    
    return !localTitles.has(normalizedTitle) && isImportant;
  });
  
  console.log(`📊 对比结果:`);
  console.log(`   - WalkerPlus花火数量: ${walkerPlusData.length}`);
  console.log(`   - 本地花火数量: ${localData.length}`);
  console.log(`   - 遗漏的重要花火: ${missingEvents.length}`);
}

// 步骤4: 生成报告
function generateReport() {
  console.log('\n📋 步骤4: 生成神奈川花火数据对比报告');
  console.log('='.repeat(60));
  
  if (missingEvents.length === 0) {
    console.log('🎉 恭喜！本地数据已包含所有重要花火信息');
    console.log('✅ 没有发现遗漏的重要花火活动');
  } else {
    console.log(`⚠️ 发现 ${missingEvents.length} 个遗漏的重要花火信息：\n`);
    
    missingEvents.forEach((event, index) => {
      console.log(`${index + 1}. 🎆 ${event.title}`);
      console.log(`   📅 日期: ${event.date}`);
      console.log(`   📍 地点: ${event.location}`);
      console.log(`   📝 描述: ${event.description.substring(0, 100)}...`);
      console.log(`   🔗 来源: ${event.source}`);
      console.log('');
    });
  }
  
  // 保存详细报告
  const reportData = {
    timestamp: new Date().toISOString(),
    technology: 'Playwright + Cheerio + Crawlee',
    walkerPlusCount: walkerPlusData.length,
    localCount: localData.length,
    missingCount: missingEvents.length,
    missingEvents: missingEvents,
    summary: missingEvents.length === 0 ? 
      '本地数据完整，无遗漏重要花火信息' : 
      `发现${missingEvents.length}个遗漏的重要花火信息`
  };
  
  const reportPath = `kanagawa-hanabi-comparison-${new Date().toISOString().slice(0, 10)}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
  
  console.log(`💾 详细报告已保存到: ${reportPath}`);
  console.log(`📊 Crawlee自动保存的数据位置: storage/datasets/default/`);
}

// 主执行函数
async function main() {
  try {
    console.log('🎯 使用Playwright+Cheerio+Crawlee技术栈执行神奈川花火数据对比任务\n');
    
    await scrapeWalkerPlusData();
    await loadLocalData();
    compareData();
    generateReport();
    
    console.log('\n✅ 神奈川花火数据对比分析完成！');
    console.log('🔧 技术栈验证：严格使用了Playwright+Cheerio+Crawlee');
    
  } catch (error) {
    console.error('💥 执行失败:', error.message);
    process.exit(1);
  }
}

// 运行脚本
main().catch(console.error); 