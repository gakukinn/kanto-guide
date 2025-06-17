import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function crawlKoshinetsuHanabiRankingPrecise() {
    console.log('🚀 开始精确获取甲信越地区花火大会排行榜数据...');
    
    let browser;
    try {
        // 启动浏览器
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        page.setDefaultTimeout(60000);
        
        // 访问目标页面
        const url = 'https://hanabi.walkerplus.com/crowd/ar0400/';
        console.log(`📡 正在访问: ${url}`);
        
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(3000);
        
        // 获取页面HTML内容
        const html = await page.content();
        const $ = cheerio.load(html);
        
        console.log(`📄 页面HTML长度: ${html.length} 字符`);
        
        const events = [];
        
        // 专门查找排行榜中的花火大会项目
        console.log('🔍 查找排行榜中的花火大会...');
        
        // 方法1: 查找包含排名数字的项目
        $('li').each((index, element) => {
            const $item = $(element);
            const text = $item.text().trim();
            
            // 查找包含排名数字和花火大会链接的项目
            const rankMatch = text.match(/^(\d+)\s*(.+)/);
            if (rankMatch) {
                const rank = rankMatch[1];
                const title = rankMatch[2].trim();
                const detailLink = $item.find('a').attr('href');
                
                if (detailLink && detailLink.includes('/detail/')) {
                    events.push({
                        rank: parseInt(rank),
                        title: title,
                        date: '',
                        location: '',
                        expectedVisitors: '',
                        fireworksCount: '',
                        detailLink: detailLink,
                        sourceUrl: url,
                        extractedWith: 'ranking-method1'
                    });
                    console.log(`✅ 找到排名 ${rank}: ${title}`);
                }
            }
        });
        
        // 方法2: 查找所有包含detail链接的项目
        if (events.length === 0) {
            console.log('🔍 使用方法2: 查找所有detail链接...');
            
            $('a[href*="/detail/"]').each((index, element) => {
                const $link = $(element);
                const href = $link.attr('href');
                const title = $link.text().trim();
                
                if (title && title.length > 5 && !title.includes('詳細') && !title.includes('もっと見る')) {
                    const $parent = $link.closest('li, div, article');
                    const parentText = $parent.text().trim();
                    
                    // 尝试从父元素中提取更多信息
                    const dateMatch = parentText.match(/(\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}\/\d{1,2})/);
                    const visitorMatch = parentText.match(/(\d+(?:,\d+)*)\s*万?人/);
                    const fireworkMatch = parentText.match(/(\d+(?:,\d+)*)\s*発/);
                    
                    events.push({
                        rank: index + 1,
                        title: title,
                        date: dateMatch ? dateMatch[1] : '',
                        location: '',
                        expectedVisitors: visitorMatch ? visitorMatch[1].replace(/,/g, '') : '',
                        fireworksCount: fireworkMatch ? fireworkMatch[1].replace(/,/g, '') : '',
                        detailLink: href,
                        sourceUrl: url,
                        extractedWith: 'detail-links'
                    });
                    console.log(`✅ 找到花火大会: ${title}`);
                }
            });
        }
        
        // 方法3: 查找特定的排行榜结构
        if (events.length === 0) {
            console.log('🔍 使用方法3: 查找特定排行榜结构...');
            
            // 查找可能的排行榜容器
            const rankingSelectors = [
                '.ranking-list',
                '.crowd-ranking',
                '.event-ranking',
                '.hanabi-ranking',
                'ol li',
                'ul li'
            ];
            
            for (const selector of rankingSelectors) {
                const items = $(selector);
                if (items.length > 0) {
                    console.log(`✅ 使用选择器 "${selector}" 找到 ${items.length} 个项目`);
                    
                    items.each((index, element) => {
                        const $item = $(element);
                        const $link = $item.find('a[href*="/detail/"]').first();
                        
                        if ($link.length > 0) {
                            const title = $link.text().trim() || $item.find('h3, h2, .title').text().trim();
                            const href = $link.attr('href');
                            
                            if (title && title.length > 5) {
                                events.push({
                                    rank: index + 1,
                                    title: title,
                                    date: '',
                                    location: '',
                                    expectedVisitors: '',
                                    fireworksCount: '',
                                    detailLink: href,
                                    sourceUrl: url,
                                    extractedWith: selector
                                });
                                console.log(`✅ 找到花火大会: ${title}`);
                            }
                        }
                    });
                    
                    if (events.length > 0) break;
                }
            }
        }
        
        // 去重并排序
        const uniqueEvents = [];
        const seenTitles = new Set();
        
        for (const event of events) {
            if (!seenTitles.has(event.title) && event.detailLink && event.detailLink.includes('/detail/')) {
                seenTitles.add(event.title);
                uniqueEvents.push(event);
            }
        }
        
        // 按排名排序
        uniqueEvents.sort((a, b) => a.rank - b.rank);
        
        console.log(`✅ 成功获取 ${uniqueEvents.length} 个花火大会排行榜信息`);
        
        // 保存数据到文件
        const outputFile = 'koshinetsu-hanabi-ranking-precise.json';
        fs.writeFileSync(outputFile, JSON.stringify(uniqueEvents, null, 2), 'utf8');
        console.log(`📁 数据已保存到 ${outputFile}`);
        
        // 输出获取的事件信息
        uniqueEvents.forEach((event, index) => {
            console.log(`\n排名 ${event.rank}. ${event.title}`);
            console.log(`   日期: ${event.date || '未获取'}`);
            console.log(`   地点: ${event.location || '未获取'}`);
            console.log(`   观众数: ${event.expectedVisitors || '未获取'}`);
            console.log(`   花火数: ${event.fireworksCount || '未获取'}`);
            console.log(`   详情链接: ${event.detailLink}`);
            console.log(`   提取方式: ${event.extractedWith}`);
        });
        
        console.log(`\n📊 总计获取了 ${uniqueEvents.length} 个甲信越地区花火大会排行榜信息`);
        
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
crawlKoshinetsuHanabiRankingPrecise().catch(console.error); 