import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function crawlHanabiDetails() {
    console.log('🚀 开始获取花火大会详细信息...');
    
    // 读取排行榜数据
    const rankingData = JSON.parse(fs.readFileSync('koshinetsu-hanabi-ranking-precise.json', 'utf8'));
    console.log(`📋 读取到 ${rankingData.length} 个花火大会排行榜数据`);
    
    let browser;
    try {
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        page.setDefaultTimeout(60000);
        
        const detailedEvents = [];
        
        for (const event of rankingData) {
            console.log(`\n🔍 正在获取详细信息: ${event.title}`);
            
            try {
                const detailUrl = `https://hanabi.walkerplus.com${event.detailLink}`;
                console.log(`📡 访问: ${detailUrl}`);
                
                await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
                await page.waitForTimeout(2000);
                
                const html = await page.content();
                const $ = cheerio.load(html);
                
                // 提取详细信息
                const eventDetails = {
                    ...event,
                    detailUrl: detailUrl
                };
                
                // 提取日期
                const dateSelectors = [
                    '.event-date',
                    '.schedule',
                    '.date',
                    '.p-event-detail__date',
                    '.event-info .date'
                ];
                
                for (const selector of dateSelectors) {
                    const dateText = $(selector).text().trim();
                    if (dateText && dateText.match(/\d{4}年|\d{1,2}月|\d{1,2}日/)) {
                        eventDetails.date = dateText;
                        break;
                    }
                }
                
                // 如果没有找到，尝试从页面文本中提取
                if (!eventDetails.date) {
                    const pageText = $('body').text();
                    const dateMatch = pageText.match(/(\d{4}年\d{1,2}月\d{1,2}日)/);
                    if (dateMatch) {
                        eventDetails.date = dateMatch[1];
                    }
                }
                
                // 提取地点
                const locationSelectors = [
                    '.event-location',
                    '.venue',
                    '.place',
                    '.p-event-detail__place',
                    '.event-info .place'
                ];
                
                for (const selector of locationSelectors) {
                    const locationText = $(selector).text().trim();
                    if (locationText && locationText.length > 2) {
                        eventDetails.location = locationText;
                        break;
                    }
                }
                
                // 提取观众数
                const crowdSelectors = [
                    '.crowd',
                    '.visitors',
                    '.attendance',
                    '.p-event-detail__crowd'
                ];
                
                for (const selector of crowdSelectors) {
                    const crowdText = $(selector).text().trim();
                    const crowdMatch = crowdText.match(/(\d+(?:,\d+)*)\s*万?人/);
                    if (crowdMatch) {
                        eventDetails.expectedVisitors = crowdMatch[1].replace(/,/g, '');
                        break;
                    }
                }
                
                // 如果没有找到，从页面文本中搜索
                if (!eventDetails.expectedVisitors) {
                    const pageText = $('body').text();
                    const visitorMatch = pageText.match(/(\d+(?:,\d+)*)\s*万?人/);
                    if (visitorMatch) {
                        eventDetails.expectedVisitors = visitorMatch[1].replace(/,/g, '');
                    }
                }
                
                // 提取花火数
                const fireworkSelectors = [
                    '.fireworks',
                    '.hanabi',
                    '.launch-count',
                    '.p-event-detail__fireworks'
                ];
                
                for (const selector of fireworkSelectors) {
                    const fireworkText = $(selector).text().trim();
                    const fireworkMatch = fireworkText.match(/(\d+(?:,\d+)*)\s*発/);
                    if (fireworkMatch) {
                        eventDetails.fireworksCount = fireworkMatch[1].replace(/,/g, '');
                        break;
                    }
                }
                
                // 如果没有找到，从页面文本中搜索
                if (!eventDetails.fireworksCount) {
                    const pageText = $('body').text();
                    const fireworkMatch = pageText.match(/(\d+(?:,\d+)*)\s*発/);
                    if (fireworkMatch) {
                        eventDetails.fireworksCount = fireworkMatch[1].replace(/,/g, '');
                    }
                }
                
                // 尝试从表格或列表中提取信息
                $('table tr, dl dt, dl dd, .info-list li').each((index, element) => {
                    const $elem = $(element);
                    const text = $elem.text().trim();
                    
                    // 日期信息
                    if (text.includes('開催日') || text.includes('日時') || text.includes('期間')) {
                        const nextText = $elem.next().text().trim() || text;
                        const dateMatch = nextText.match(/(\d{4}年\d{1,2}月\d{1,2}日)/);
                        if (dateMatch && !eventDetails.date) {
                            eventDetails.date = dateMatch[1];
                        }
                    }
                    
                    // 地点信息
                    if (text.includes('会場') || text.includes('場所') || text.includes('開催地')) {
                        const nextText = $elem.next().text().trim() || text;
                        if (nextText.length > 5 && !eventDetails.location) {
                            eventDetails.location = nextText.replace(/会場|場所|開催地/, '').trim();
                        }
                    }
                    
                    // 观众数信息
                    if (text.includes('人出') || text.includes('来場者') || text.includes('観客')) {
                        const nextText = $elem.next().text().trim() || text;
                        const visitorMatch = nextText.match(/(\d+(?:,\d+)*)\s*万?人/);
                        if (visitorMatch && !eventDetails.expectedVisitors) {
                            eventDetails.expectedVisitors = visitorMatch[1].replace(/,/g, '');
                        }
                    }
                    
                    // 花火数信息
                    if (text.includes('打上') || text.includes('発数') || text.includes('花火')) {
                        const nextText = $elem.next().text().trim() || text;
                        const fireworkMatch = nextText.match(/(\d+(?:,\d+)*)\s*発/);
                        if (fireworkMatch && !eventDetails.fireworksCount) {
                            eventDetails.fireworksCount = fireworkMatch[1].replace(/,/g, '');
                        }
                    }
                });
                
                detailedEvents.push(eventDetails);
                
                console.log(`✅ 获取完成:`);
                console.log(`   标题: ${eventDetails.title}`);
                console.log(`   日期: ${eventDetails.date || '未获取'}`);
                console.log(`   地点: ${eventDetails.location || '未获取'}`);
                console.log(`   观众数: ${eventDetails.expectedVisitors || '未获取'}`);
                console.log(`   花火数: ${eventDetails.fireworksCount || '未获取'}`);
                
            } catch (error) {
                console.error(`❌ 获取 ${event.title} 详细信息失败:`, error.message);
                detailedEvents.push(event); // 保留原始数据
            }
        }
        
        // 保存详细数据
        const outputFile = 'koshinetsu-hanabi-detailed-ranking.json';
        fs.writeFileSync(outputFile, JSON.stringify(detailedEvents, null, 2), 'utf8');
        console.log(`\n📁 详细数据已保存到 ${outputFile}`);
        
        // 输出汇总
        console.log(`\n📊 数据获取汇总:`);
        console.log(`总计处理: ${detailedEvents.length} 个花火大会`);
        
        let hasDateCount = 0, hasLocationCount = 0, hasVisitorsCount = 0, hasFireworksCount = 0;
        
        detailedEvents.forEach((event, index) => {
            console.log(`\n${index + 1}. ${event.title}`);
            console.log(`   排名: 第${event.rank}位`);
            console.log(`   日期: ${event.date || '未获取'}`);
            console.log(`   地点: ${event.location || '未获取'}`);
            console.log(`   观众数: ${event.expectedVisitors || '未获取'}`);
            console.log(`   花火数: ${event.fireworksCount || '未获取'}`);
            
            if (event.date) hasDateCount++;
            if (event.location) hasLocationCount++;
            if (event.expectedVisitors) hasVisitorsCount++;
            if (event.fireworksCount) hasFireworksCount++;
        });
        
        console.log(`\n📈 数据完整性统计:`);
        console.log(`日期信息: ${hasDateCount}/${detailedEvents.length} (${Math.round(hasDateCount/detailedEvents.length*100)}%)`);
        console.log(`地点信息: ${hasLocationCount}/${detailedEvents.length} (${Math.round(hasLocationCount/detailedEvents.length*100)}%)`);
        console.log(`观众数信息: ${hasVisitorsCount}/${detailedEvents.length} (${Math.round(hasVisitorsCount/detailedEvents.length*100)}%)`);
        console.log(`花火数信息: ${hasFireworksCount}/${detailedEvents.length} (${Math.round(hasFireworksCount/detailedEvents.length*100)}%)`);
        
        return detailedEvents;
        
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
crawlHanabiDetails().catch(console.error); 