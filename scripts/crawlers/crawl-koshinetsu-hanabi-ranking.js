import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// 创建爬虫实例
const crawler = new PlaywrightCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    },
    requestHandler: async ({ page, request, log }) => {
        log.info(`Processing ${request.url}`);
        
        try {
            // 等待页面加载完成
            await page.waitForLoadState('networkidle');
            
            // 获取页面HTML内容
            const html = await page.content();
            const $ = cheerio.load(html);
            
            const events = [];
            
            // 查找花火大会列表项
            $('.p-event-list__item').each((index, element) => {
                const $item = $(element);
                
                // 提取标题
                const title = $item.find('.p-event-list__title a').text().trim();
                
                // 提取日期
                const dateText = $item.find('.p-event-list__date').text().trim();
                
                // 提取地点
                const location = $item.find('.p-event-list__place').text().trim();
                
                // 提取观众数
                const crowdText = $item.find('.p-event-list__crowd').text().trim();
                const crowdMatch = crowdText.match(/(\d+(?:,\d+)*)/);
                const expectedVisitors = crowdMatch ? crowdMatch[1].replace(/,/g, '') : '';
                
                // 提取花火数
                const fireworksText = $item.find('.p-event-list__fireworks').text().trim();
                const fireworksMatch = fireworksText.match(/(\d+(?:,\d+)*)/);
                const fireworksCount = fireworksMatch ? fireworksMatch[1].replace(/,/g, '') : '';
                
                // 提取详情链接
                const detailLink = $item.find('.p-event-list__title a').attr('href');
                
                if (title && dateText) {
                    events.push({
                        title: title,
                        date: dateText,
                        location: location,
                        expectedVisitors: expectedVisitors,
                        fireworksCount: fireworksCount,
                        detailLink: detailLink,
                        sourceUrl: request.url
                    });
                }
            });
            
            // 如果没有找到事件，尝试其他选择器
            if (events.length === 0) {
                $('.event-item, .hanabi-item, .list-item').each((index, element) => {
                    const $item = $(element);
                    
                    const title = $item.find('h3, .title, .event-title').text().trim() ||
                                 $item.find('a').first().text().trim();
                    
                    const dateText = $item.find('.date, .event-date, .schedule').text().trim();
                    const location = $item.find('.place, .location, .venue').text().trim();
                    
                    if (title && (dateText || location)) {
                        events.push({
                            title: title,
                            date: dateText,
                            location: location,
                            expectedVisitors: '',
                            fireworksCount: '',
                            detailLink: $item.find('a').attr('href'),
                            sourceUrl: request.url
                        });
                    }
                });
            }
            
            log.info(`Found ${events.length} events on ${request.url}`);
            
            // 保存数据到文件
            const outputFile = 'koshinetsu-hanabi-ranking-data.json';
            let allEvents = [];
            
            // 如果文件已存在，读取现有数据
            if (fs.existsSync(outputFile)) {
                const existingData = fs.readFileSync(outputFile, 'utf8');
                allEvents = JSON.parse(existingData);
            }
            
            // 添加新数据
            allEvents.push(...events);
            
            // 保存更新后的数据
            fs.writeFileSync(outputFile, JSON.stringify(allEvents, null, 2), 'utf8');
            
            console.log(`✅ 成功获取 ${events.length} 个花火大会信息`);
            console.log(`📁 数据已保存到 ${outputFile}`);
            
            // 输出获取的事件信息
            events.forEach((event, index) => {
                console.log(`\n${index + 1}. ${event.title}`);
                console.log(`   日期: ${event.date}`);
                console.log(`   地点: ${event.location}`);
                console.log(`   观众数: ${event.expectedVisitors || '未获取'}`);
                console.log(`   花火数: ${event.fireworksCount || '未获取'}`);
            });
            
        } catch (error) {
            log.error(`Error processing ${request.url}:`, error);
        }
    },
    
    failedRequestHandler: async ({ request, log }) => {
        log.error(`Request ${request.url} failed`);
    }
});

// 主函数
async function main() {
    console.log('🚀 开始获取甲信越地区花火大会排行榜数据...');
    
    try {
        // 添加要爬取的URL
        await crawler.addRequests([
            'https://hanabi.walkerplus.com/crowd/ar0400/'
        ]);
        
        // 运行爬虫
        await crawler.run();
        
        console.log('\n🎉 数据获取完成！');
        
        // 读取并汇总结果
        const outputFile = 'koshinetsu-hanabi-ranking-data.json';
        if (fs.existsSync(outputFile)) {
            const data = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
            console.log(`\n📊 总计获取了 ${data.length} 个花火大会活动信息`);
        }
        
    } catch (error) {
        console.error('❌ 爬取过程中出现错误:', error);
    }
}

// 运行主函数
main().catch(console.error); 