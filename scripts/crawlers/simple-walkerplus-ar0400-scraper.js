/**
 * 简化版 WalkerPlus ar0400地区花火信息抓取器
 * 使用 Playwright + Cheerio 技术栈（避免Crawlee内存问题）
 * 目标网站: https://hanabi.walkerplus.com/crowd/ar0400/
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

/**
 * 简化版WalkerPlus ar0400花火信息抓取器
 * 使用Playwright+Cheerio技术栈
 * 专门针对甲信越地区花火大会信息抓取
 */

async function scrapeWalkerPlusAr0400() {
    console.log('🚀 启动WalkerPlus ar0400花火抓取器...');
    
    let browser;
    const results = [];
    
    try {
        // 启动浏览器
        browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });
        
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        
        const page = await context.newPage();
        
        console.log('📍 正在访问: https://hanabi.walkerplus.com/crowd/ar0400/');
        
        // 访问页面
        await page.goto('https://hanabi.walkerplus.com/crowd/ar0400/', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        // 等待页面加载完成
        await page.waitForTimeout(3000);
        
        // 获取页面HTML
        const html = await page.content();
        
        // 使用Cheerio解析HTML
        const $ = cheerio.load(html);
        
        console.log('🔍 开始提取花火大会信息...');
        
        // 提取花火大会信息
        const hanabis = extractHanabiData($);
        
        if (hanabis.length > 0) {
            results.push(...hanabis);
            console.log(`✅ 成功提取 ${hanabis.length} 个花火大会信息`);
        } else {
            console.log('⚠️ 未找到花火大会信息，尝试其他提取方法...');
            
            // 备用提取方法
            const fallbackData = extractFallbackData($);
            if (fallbackData.length > 0) {
                results.push(...fallbackData);
                console.log(`✅ 使用备用方法提取 ${fallbackData.length} 个信息`);
            }
        }
        
    } catch (error) {
        console.error('❌ 抓取过程中出错:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
    
    return results;
}

/**
 * 提取花火大会数据
 */
function extractHanabiData($) {
    const hanabis = [];
    
    try {
        // 方法1: 查找JSON-LD结构化数据
        $('script[type="application/ld+json"]').each((index, element) => {
            try {
                const jsonData = JSON.parse($(element).html());
                
                if (jsonData['@type'] === 'Event' || 
                    (Array.isArray(jsonData) && jsonData.some(item => item['@type'] === 'Event'))) {
                    
                    const events = Array.isArray(jsonData) ? jsonData : [jsonData];
                    
                    events.forEach(event => {
                        if (event['@type'] === 'Event' && event.name) {
                            hanabis.push({
                                title: event.name,
                                date: event.startDate || '',
                                location: event.location?.name || event.location?.address?.addressLocality || '',
                                audience: extractAudienceFromText(event.description || ''),
                                fireworks: extractFireworksFromText(event.description || ''),
                                url: event.url || ''
                            });
                        }
                    });
                }
            } catch (error) {
                // JSON解析失败，继续
            }
        });
        
        if (hanabis.length > 0) {
            return hanabis;
        }
        
        // 方法2: 查找列表项
        const listSelectors = [
            '.list-item',
            '.event-item', 
            '.hanabi-item',
            '.item',
            'li',
            '.entry',
            '.post'
        ];
        
        for (const selector of listSelectors) {
            const items = $(selector);
            if (items.length > 0) {
                console.log(`🔍 使用选择器 ${selector} 找到 ${items.length} 个项目`);
                
                items.each((index, element) => {
                    const hanabi = extractFromElement($, element);
                    if (hanabi && hanabi.title && hanabi.title.length > 3) {
                        hanabis.push(hanabi);
                    }
                });
                
                if (hanabis.length > 0) {
                    break;
                }
            }
        }
        
        // 方法3: 查找表格数据
        if (hanabis.length === 0) {
            $('table tr').each((index, element) => {
                if (index === 0) return; // 跳过表头
                
                const $row = $(element);
                const cells = $row.find('td');
                
                if (cells.length >= 2) {
                    const title = cells.eq(0).text().trim();
                    const date = cells.eq(1).text().trim();
                    
                    if (title && title.length > 3 && (title.includes('花火') || title.includes('大会'))) {
                        hanabis.push({
                            title: cleanText(title),
                            date: cleanText(date),
                            location: cells.length > 2 ? cleanText(cells.eq(2).text()) : '',
                            audience: cells.length > 3 ? cleanText(cells.eq(3).text()) : '',
                            fireworks: cells.length > 4 ? cleanText(cells.eq(4).text()) : '',
                            url: $row.find('a').first().attr('href') || ''
                        });
                    }
                }
            });
        }
        
    } catch (error) {
        console.error('❌ 数据提取错误:', error.message);
    }
    
    return hanabis;
}

/**
 * 从单个元素中提取花火信息
 */
function extractFromElement($, element) {
    try {
        const $el = $(element);
        const text = $el.text();
        
        // 检查是否包含花火相关关键词
        if (!text.includes('花火') && !text.includes('大会') && !text.includes('祭り')) {
            return null;
        }
        
        // 提取标题
        let title = $el.find('h1, h2, h3, h4, .title, .name').first().text().trim();
        if (!title) {
            title = $el.find('a').first().text().trim();
        }
        if (!title) {
            title = text.split('\n')[0].trim();
        }
        
        // 提取日期
        const date = extractDateFromText(text);
        
        // 提取地点
        const location = extractLocationFromText(text);
        
        // 提取观众数
        const audience = extractAudienceFromText(text);
        
        // 提取花火数
        const fireworks = extractFireworksFromText(text);
        
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
        console.error('❌ 元素提取错误:', error.message);
    }
    
    return null;
}

/**
 * 备用数据提取方法
 */
function extractFallbackData($) {
    const hanabis = [];
    
    try {
        // 查找所有包含花火关键词的文本
        const keywords = ['花火', '大会', '祭り', 'まつり', '煙火'];
        
        $('*').each((index, element) => {
            const $el = $(element);
            const text = $el.text();
            
            if (keywords.some(keyword => text.includes(keyword)) && text.length > 10 && text.length < 200) {
                const lines = text.split('\n').filter(line => line.trim().length > 0);
                
                if (lines.length > 0) {
                    const title = lines[0].trim();
                    
                    if (title.length > 5 && title.length < 100) {
                        hanabis.push({
                            title: cleanText(title),
                            date: extractDateFromText(text),
                            location: extractLocationFromText(text),
                            audience: extractAudienceFromText(text),
                            fireworks: extractFireworksFromText(text),
                            url: $el.find('a').first().attr('href') || ''
                        });
                    }
                }
            }
        });
        
        // 去重
        const uniqueHanabis = [];
        const seenTitles = new Set();
        
        for (const hanabi of hanabis) {
            if (!seenTitles.has(hanabi.title)) {
                seenTitles.add(hanabi.title);
                uniqueHanabis.push(hanabi);
            }
        }
        
        return uniqueHanabis.slice(0, 15); // 限制数量
        
    } catch (error) {
        console.error('❌ 备用提取错误:', error.message);
    }
    
    return [];
}

/**
 * 从文本中提取日期
 */
function extractDateFromText(text) {
    const datePatterns = [
        /\d{4}年\d{1,2}月\d{1,2}日/,
        /\d{1,2}月\d{1,2}日/,
        /\d{4}-\d{2}-\d{2}/,
        /\d{1,2}\/\d{1,2}/
    ];
    
    for (const pattern of datePatterns) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    
    return '';
}

/**
 * 从文本中提取地点
 */
function extractLocationFromText(text) {
    const locationPatterns = [
        /([^、。\n]+(?:県|市|町|村|区))/,
        /([^、。\n]+(?:公園|会場|広場|河川|湖|海岸))/
    ];
    
    for (const pattern of locationPatterns) {
        const match = text.match(pattern);
        if (match) return match[1];
    }
    
    return '';
}

/**
 * 从文本中提取观众数
 */
function extractAudienceFromText(text) {
    const audiencePatterns = [
        /(\d+(?:,\d+)*)\s*万人/,
        /(\d+(?:,\d+)*)\s*人/,
        /(\d+(?:,\d+)*)\s*名/
    ];
    
    for (const pattern of audiencePatterns) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    
    return '';
}

/**
 * 从文本中提取花火数
 */
function extractFireworksFromText(text) {
    const fireworksPatterns = [
        /(\d+(?:,\d+)*)\s*発/,
        /(\d+(?:,\d+)*)\s*発射/,
        /(\d+(?:,\d+)*)\s*本/
    ];
    
    for (const pattern of fireworksPatterns) {
        const match = text.match(pattern);
        if (match) return match[0];
    }
    
    return '';
}

/**
 * 清理文本
 */
function cleanText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
}

/**
 * 保存结果到文件
 */
async function saveResults(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // 保存为JSON
    const jsonFile = `walkerplus-ar0400-simple-${timestamp}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2), 'utf8');
    
    // 保存为CSV
    const csvFile = `walkerplus-ar0400-simple-${timestamp}.csv`;
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
        console.log('🎆 WalkerPlus ar0400花火抓取器');
        console.log('📍 目标: 甲信越地区花火大会信息');
        console.log('🛠️ 技术栈: Playwright + Cheerio');
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
                if (hanabi.url) console.log(`   🔗 链接: ${hanabi.url}`);
                console.log('');
            });
            
            await saveResults(results);
            
        } else {
            console.log('❌ 未能获取到花火大会信息');
            console.log('💡 可能原因:');
            console.log('   - 网站结构发生变化');
            console.log('   - 网络连接问题');
            console.log('   - 反爬虫机制阻止');
        }
        
    } catch (error) {
        console.error('❌ 程序执行出错:', error.message);
        console.error('📋 错误详情:', error.stack);
    }
}

// 运行程序
main().catch(console.error); 