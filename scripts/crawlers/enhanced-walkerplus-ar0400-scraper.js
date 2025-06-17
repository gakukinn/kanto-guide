import { PlaywrightCrawler, Dataset } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';

/**
 * 增强版WalkerPlus ar0400花火信息抓取器
 * 使用Playwright+Cheerio+Crawlee最佳实践
 * 基于GitHub优秀项目的技术方案
 */

async function scrapeWalkerPlusAr0400() {
    console.log('🚀 启动增强版WalkerPlus ar0400花火抓取器...');
    
    const results = [];
    
    const crawler = new PlaywrightCrawler({
        // 使用最佳实践配置
        headless: true,
        maxRequestsPerCrawl: 50,
        requestHandlerTimeoutSecs: 60,
        
        // 反检测配置
        launchContext: {
            launchOptions: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            }
        },
        
        // 请求处理器
        requestHandler: async ({ page, request, log, parseWithCheerio }) => {
            log.info(`正在处理: ${request.url}`);
            
            try {
                // 等待页面完全加载
                await page.waitForLoadState('networkidle');
                
                // 等待关键元素出现
                await page.waitForSelector('body', { timeout: 30000 });
                
                // 使用Cheerio解析HTML
                const $ = await parseWithCheerio();
                
                // 提取花火大会信息
                const hanabis = extractHanabiData($, log);
                
                if (hanabis.length > 0) {
                    results.push(...hanabis);
                    log.info(`✅ 成功提取 ${hanabis.length} 个花火大会信息`);
                } else {
                    log.warn('⚠️ 未找到花火大会信息');
                }
                
            } catch (error) {
                log.error(`❌ 处理页面时出错: ${error.message}`);
            }
        },
        
        // 失败请求处理器
        failedRequestHandler: async ({ request, log }) => {
            log.error(`❌ 请求失败: ${request.url}`);
        }
    });
    
    // 运行爬虫
    await crawler.run(['https://hanabi.walkerplus.com/crowd/ar0400/']);
    
    return results;
}

/**
 * 提取花火大会数据的核心函数
 * 使用多种选择器策略确保数据准确性
 */
function extractHanabiData($, log) {
    const hanabis = [];
    
    try {
        // 策略1: 查找JSON-LD结构化数据
        const jsonLdData = extractFromJsonLd($);
        if (jsonLdData.length > 0) {
            log.info('✅ 使用JSON-LD数据提取');
            return jsonLdData;
        }
        
        // 策略2: 查找列表项
        const listItems = $('.list-item, .event-item, .hanabi-item, .item');
        if (listItems.length > 0) {
            log.info(`✅ 找到 ${listItems.length} 个列表项`);
            
            listItems.each((index, element) => {
                const hanabi = extractHanabiFromElement($, element, log);
                if (hanabi && hanabi.title) {
                    hanabis.push(hanabi);
                }
            });
        }
        
        // 策略3: 查找表格数据
        if (hanabis.length === 0) {
            const tableRows = $('table tr, .table-row');
            if (tableRows.length > 0) {
                log.info(`✅ 找到 ${tableRows.length} 个表格行`);
                
                tableRows.each((index, element) => {
                    const hanabi = extractHanabiFromTableRow($, element, log);
                    if (hanabi && hanabi.title) {
                        hanabis.push(hanabi);
                    }
                });
            }
        }
        
        // 策略4: 通用内容提取
        if (hanabis.length === 0) {
            log.info('🔍 使用通用内容提取策略');
            const genericData = extractGenericContent($, log);
            hanabis.push(...genericData);
        }
        
    } catch (error) {
        log.error(`❌ 数据提取错误: ${error.message}`);
    }
    
    return hanabis;
}

/**
 * 从JSON-LD结构化数据中提取信息
 */
function extractFromJsonLd($) {
    const hanabis = [];
    
    $('script[type="application/ld+json"]').each((index, element) => {
        try {
            const jsonData = JSON.parse($(element).html());
            
            if (jsonData['@type'] === 'Event' || 
                (Array.isArray(jsonData) && jsonData.some(item => item['@type'] === 'Event'))) {
                
                const events = Array.isArray(jsonData) ? jsonData : [jsonData];
                
                events.forEach(event => {
                    if (event['@type'] === 'Event') {
                        hanabis.push({
                            title: event.name || '',
                            date: event.startDate || '',
                            location: event.location?.name || event.location?.address?.addressLocality || '',
                            audience: extractAudienceFromEvent(event),
                            fireworks: extractFireworksFromEvent(event),
                            url: event.url || ''
                        });
                    }
                });
            }
        } catch (error) {
            // JSON解析失败，继续下一个
        }
    });
    
    return hanabis;
}

/**
 * 从单个元素中提取花火信息
 */
function extractHanabiFromElement($, element, log) {
    try {
        const $el = $(element);
        
        // 提取标题
        const title = $el.find('h1, h2, h3, h4, .title, .name, .event-name').first().text().trim() ||
                     $el.find('a').first().text().trim() ||
                     $el.text().split('\n')[0].trim();
        
        // 提取日期
        const date = extractDateFromElement($el);
        
        // 提取地点
        const location = extractLocationFromElement($el);
        
        // 提取观众数
        const audience = extractAudienceFromElement($el);
        
        // 提取花火数
        const fireworks = extractFireworksFromElement($el);
        
        // 提取URL
        const url = $el.find('a').first().attr('href') || '';
        
        if (title && title.length > 3) {
            return {
                title: cleanText(title),
                date: cleanText(date),
                location: cleanText(location),
                audience: cleanText(audience),
                fireworks: cleanText(fireworks),
                url: url.startsWith('http') ? url : `https://hanabi.walkerplus.com${url}`
            };
        }
        
    } catch (error) {
        log.error(`❌ 元素提取错误: ${error.message}`);
    }
    
    return null;
}

/**
 * 从表格行中提取花火信息
 */
function extractHanabiFromTableRow($, element, log) {
    try {
        const $row = $(element);
        const cells = $row.find('td, th');
        
        if (cells.length >= 2) {
            const title = cells.eq(0).text().trim();
            const date = cells.eq(1).text().trim();
            const location = cells.length > 2 ? cells.eq(2).text().trim() : '';
            const audience = cells.length > 3 ? cells.eq(3).text().trim() : '';
            const fireworks = cells.length > 4 ? cells.eq(4).text().trim() : '';
            
            if (title && title.length > 3) {
                return {
                    title: cleanText(title),
                    date: cleanText(date),
                    location: cleanText(location),
                    audience: cleanText(audience),
                    fireworks: cleanText(fireworks),
                    url: $row.find('a').first().attr('href') || ''
                };
            }
        }
        
    } catch (error) {
        log.error(`❌ 表格行提取错误: ${error.message}`);
    }
    
    return null;
}

/**
 * 通用内容提取
 */
function extractGenericContent($, log) {
    const hanabis = [];
    
    try {
        // 查找包含"花火"、"大会"等关键词的文本
        const keywords = ['花火', '大会', '祭り', 'まつり', '煙火'];
        const textNodes = $('*').contents().filter(function() {
            return this.nodeType === 3 && // 文本节点
                   keywords.some(keyword => this.nodeValue.includes(keyword));
        });
        
        textNodes.each((index, node) => {
            const text = $(node).text().trim();
            if (text.length > 10) {
                hanabis.push({
                    title: text.substring(0, 100),
                    date: '',
                    location: '',
                    audience: '',
                    fireworks: '',
                    url: ''
                });
            }
        });
        
    } catch (error) {
        log.error(`❌ 通用提取错误: ${error.message}`);
    }
    
    return hanabis.slice(0, 10); // 限制数量
}

/**
 * 辅助函数：从元素中提取日期
 */
function extractDateFromElement($el) {
    const dateSelectors = ['.date', '.time', '.when', '.schedule'];
    
    for (const selector of dateSelectors) {
        const dateText = $el.find(selector).text().trim();
        if (dateText) return dateText;
    }
    
    // 查找包含日期模式的文本
    const text = $el.text();
    const dateMatch = text.match(/\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}\/\d{1,2}|\d{4}-\d{2}-\d{2}/);
    return dateMatch ? dateMatch[0] : '';
}

/**
 * 辅助函数：从元素中提取地点
 */
function extractLocationFromElement($el) {
    const locationSelectors = ['.location', '.place', '.where', '.venue'];
    
    for (const selector of locationSelectors) {
        const locationText = $el.find(selector).text().trim();
        if (locationText) return locationText;
    }
    
    return '';
}

/**
 * 辅助函数：从元素中提取观众数
 */
function extractAudienceFromElement($el) {
    const text = $el.text();
    const audienceMatch = text.match(/(\d+(?:,\d+)*)\s*(?:万人|人|名)/);
    return audienceMatch ? audienceMatch[0] : '';
}

/**
 * 辅助函数：从元素中提取花火数
 */
function extractFireworksFromElement($el) {
    const text = $el.text();
    const fireworksMatch = text.match(/(\d+(?:,\d+)*)\s*(?:発|発射|本)/);
    return fireworksMatch ? fireworksMatch[0] : '';
}

/**
 * 辅助函数：清理文本
 */
function cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * 从事件对象中提取观众数
 */
function extractAudienceFromEvent(event) {
    if (event.audience) return event.audience;
    if (event.description) {
        const match = event.description.match(/(\d+(?:,\d+)*)\s*(?:万人|人|名)/);
        return match ? match[0] : '';
    }
    return '';
}

/**
 * 从事件对象中提取花火数
 */
function extractFireworksFromEvent(event) {
    if (event.description) {
        const match = event.description.match(/(\d+(?:,\d+)*)\s*(?:発|発射|本)/);
        return match ? match[0] : '';
    }
    return '';
}

/**
 * 保存结果到文件
 */
async function saveResults(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // 保存为JSON
    const jsonFile = `walkerplus-ar0400-enhanced-${timestamp}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2), 'utf8');
    
    // 保存为CSV
    const csvFile = `walkerplus-ar0400-enhanced-${timestamp}.csv`;
    const csvContent = convertToCSV(results);
    fs.writeFileSync(csvFile, csvContent, 'utf8');
    
    console.log(`📁 结果已保存:`);
    console.log(`   JSON: ${jsonFile}`);
    console.log(`   CSV: ${csvFile}`);
}

/**
 * 转换为CSV格式
 */
function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = ['标题', '日期', '地点', '观众数', '花火数', 'URL'];
    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
        const row = [
            `"${item.title || ''}"`,
            `"${item.date || ''}"`,
            `"${item.location || ''}"`,
            `"${item.audience || ''}"`,
            `"${item.fireworks || ''}"`,
            `"${item.url || ''}"`
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

/**
 * 主函数
 */
async function main() {
    try {
        console.log('🎆 增强版WalkerPlus ar0400花火抓取器');
        console.log('📍 目标: https://hanabi.walkerplus.com/crowd/ar0400/');
        console.log('🛠️ 技术栈: Playwright + Cheerio + Crawlee');
        console.log('');
        
        const results = await scrapeWalkerPlusAr0400();
        
        if (results.length > 0) {
            console.log(`\n✅ 抓取完成! 共获取 ${results.length} 个花火大会信息:`);
            console.log('');
            
            results.forEach((hanabi, index) => {
                console.log(`${index + 1}. ${hanabi.title}`);
                if (hanabi.date) console.log(`   📅 日期: ${hanabi.date}`);
                if (hanabi.location) console.log(`   📍 地点: ${hanabi.location}`);
                if (hanabi.audience) console.log(`   👥 观众: ${hanabi.audience}`);
                if (hanabi.fireworks) console.log(`   🎆 花火: ${hanabi.fireworks}`);
                console.log('');
            });
            
            await saveResults(results);
            
        } else {
            console.log('❌ 未能获取到花火大会信息');
            console.log('💡 建议检查网站结构是否发生变化');
        }
        
    } catch (error) {
        console.error('❌ 程序执行出错:', error.message);
        console.error('📋 错误详情:', error.stack);
    }
}

// 运行程序
main().catch(console.error); 