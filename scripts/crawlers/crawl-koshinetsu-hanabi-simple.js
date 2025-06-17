import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function crawlKoshinetsuHanabiRanking() {
    console.log('🚀 开始获取甲信越地区花火大会排行榜数据...');
    
    let browser;
    try {
        // 启动浏览器
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // 设置更长的超时时间
        page.setDefaultTimeout(60000);
        
        // 访问目标页面
        const url = 'https://hanabi.walkerplus.com/crowd/ar0400/';
        console.log(`📡 正在访问: ${url}`);
        
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            console.log('✅ 页面加载完成');
            
            // 等待一下让页面完全渲染
            await page.waitForTimeout(3000);
        } catch (error) {
            console.log('⚠️ 页面加载超时，尝试继续处理...');
        }
        
        // 获取页面HTML内容
        const html = await page.content();
        const $ = cheerio.load(html);
        
        console.log(`📄 页面HTML长度: ${html.length} 字符`);
        
        const events = [];
        
        // 查找花火大会列表项 - 尝试多种选择器
        const selectors = [
            '.p-event-list__item',
            '.event-item',
            '.hanabi-item',
            '.list-item',
            '.ranking-item',
            'article',
            '.item',
            'li',
            '.row'
        ];
        
        let foundItems = false;
        
        for (const selector of selectors) {
            const items = $(selector);
            if (items.length > 0) {
                console.log(`✅ 使用选择器 "${selector}" 找到 ${items.length} 个项目`);
                
                items.each((index, element) => {
                    const $item = $(element);
                    
                    // 尝试多种方式提取标题
                    const title = $item.find('.p-event-list__title a').text().trim() ||
                                 $item.find('h3').text().trim() ||
                                 $item.find('h2').text().trim() ||
                                 $item.find('.title').text().trim() ||
                                 $item.find('a').first().text().trim() ||
                                 $item.find('.event-title').text().trim();
                    
                    // 尝试多种方式提取日期
                    const dateText = $item.find('.p-event-list__date').text().trim() ||
                                    $item.find('.date').text().trim() ||
                                    $item.find('.event-date').text().trim() ||
                                    $item.find('.schedule').text().trim();
                    
                    // 尝试多种方式提取地点
                    const location = $item.find('.p-event-list__place').text().trim() ||
                                    $item.find('.place').text().trim() ||
                                    $item.find('.location').text().trim() ||
                                    $item.find('.venue').text().trim();
                    
                    // 提取观众数
                    const crowdText = $item.find('.p-event-list__crowd').text().trim() ||
                                     $item.find('.crowd').text().trim() ||
                                     $item.find('.visitors').text().trim();
                    const crowdMatch = crowdText.match(/(\d+(?:,\d+)*)/);
                    const expectedVisitors = crowdMatch ? crowdMatch[1].replace(/,/g, '') : '';
                    
                    // 提取花火数
                    const fireworksText = $item.find('.p-event-list__fireworks').text().trim() ||
                                         $item.find('.fireworks').text().trim() ||
                                         $item.find('.hanabi').text().trim();
                    const fireworksMatch = fireworksText.match(/(\d+(?:,\d+)*)/);
                    const fireworksCount = fireworksMatch ? fireworksMatch[1].replace(/,/g, '') : '';
                    
                    // 提取详情链接
                    const detailLink = $item.find('a').attr('href');
                    
                    if (title && title.length > 3) {
                        events.push({
                            title: title,
                            date: dateText,
                            location: location,
                            expectedVisitors: expectedVisitors,
                            fireworksCount: fireworksCount,
                            detailLink: detailLink,
                            sourceUrl: url,
                            extractedWith: selector
                        });
                    }
                });
                
                if (events.length > 0) {
                    foundItems = true;
                    break; // 找到数据后退出循环
                }
            }
        }
        
        if (!foundItems) {
            console.log('⚠️ 未找到标准选择器，尝试通用方法...');
            
            // 通用方法：查找所有包含链接的元素
            $('a').each((index, element) => {
                const $link = $(element);
                const href = $link.attr('href');
                const text = $link.text().trim();
                
                // 如果链接包含花火相关关键词或文本包含花火相关词汇
                if (href && text.length > 5 && 
                    (href.includes('hanabi') || href.includes('fireworks') || 
                     text.includes('花火') || text.includes('煙火') || text.includes('まつり'))) {
                    
                    const $parent = $link.closest('li, div, article, section');
                    
                    events.push({
                        title: text,
                        date: '',
                        location: '',
                        expectedVisitors: '',
                        fireworksCount: '',
                        detailLink: href,
                        sourceUrl: url,
                        extractedWith: 'generic'
                    });
                }
            });
        }
        
        // 去重
        const uniqueEvents = [];
        const seenTitles = new Set();
        
        for (const event of events) {
            if (!seenTitles.has(event.title)) {
                seenTitles.add(event.title);
                uniqueEvents.push(event);
            }
        }
        
        console.log(`✅ 成功获取 ${uniqueEvents.length} 个花火大会信息（去重后）`);
        
        // 保存数据到文件
        const outputFile = 'koshinetsu-hanabi-ranking-data.json';
        fs.writeFileSync(outputFile, JSON.stringify(uniqueEvents, null, 2), 'utf8');
        console.log(`📁 数据已保存到 ${outputFile}`);
        
        // 输出获取的事件信息
        uniqueEvents.forEach((event, index) => {
            console.log(`\n${index + 1}. ${event.title}`);
            console.log(`   日期: ${event.date || '未获取'}`);
            console.log(`   地点: ${event.location || '未获取'}`);
            console.log(`   观众数: ${event.expectedVisitors || '未获取'}`);
            console.log(`   花火数: ${event.fireworksCount || '未获取'}`);
            console.log(`   提取方式: ${event.extractedWith}`);
            if (event.detailLink) {
                console.log(`   详情链接: ${event.detailLink}`);
            }
        });
        
        console.log(`\n📊 总计获取了 ${uniqueEvents.length} 个花火大会活动信息`);
        
        return uniqueEvents;
        
    } catch (error) {
        console.error('❌ 爬取过程中出现错误:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// 运行主函数
crawlKoshinetsuHanabiRanking().catch(console.error); 