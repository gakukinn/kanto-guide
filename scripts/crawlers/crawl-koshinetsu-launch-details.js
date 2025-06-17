import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function crawlKoshinetsuLaunchDetails() {
    console.log('🚀 开始获取甲信越地区花火大会详细信息...');
    
    // 读取之前获取的基础数据
    let baseData = [];
    try {
        const data = fs.readFileSync('koshinetsu-hanabi-launch-data.json', 'utf8');
        baseData = JSON.parse(data);
        console.log(`📋 读取到 ${baseData.length} 个基础数据`);
    } catch (error) {
        console.log('⚠️ 未找到基础数据文件，将直接从Launch页面获取');
    }
    
    let browser;
    try {
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        page.setDefaultTimeout(60000);
        
        const detailedEvents = [];
        
        // 如果没有基础数据，先从Launch页面获取
        if (baseData.length === 0) {
            console.log('📡 正在访问Launch页面获取基础数据...');
            await page.goto('https://hanabi.walkerplus.com/launch/ar0400/', { waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(3000);
            
            const html = await page.content();
            const $ = cheerio.load(html);
            
            // 提取所有花火相关链接
            $('a[href*="detail"]').each((index, element) => {
                const $link = $(element);
                const title = $link.text().trim();
                const href = $link.attr('href');
                
                if (title && title.includes('花火') && href) {
                    baseData.push({
                        title: title,
                        link: href.startsWith('http') ? href : `https://hanabi.walkerplus.com${href}`
                    });
                }
            });
        }
        
        console.log(`🔍 开始获取 ${baseData.length} 个花火大会的详细信息...`);
        
        for (let i = 0; i < Math.min(baseData.length, 15); i++) {
            const event = baseData[i];
            console.log(`\\n📝 正在处理 ${i + 1}/${baseData.length}: ${event.title}`);
            
            try {
                if (!event.link || !event.link.includes('detail')) {
                    console.log('⚠️ 跳过：无效链接');
                    continue;
                }
                
                await page.goto(event.link, { waitUntil: 'domcontentloaded', timeout: 30000 });
                await page.waitForTimeout(2000);
                
                const detailHtml = await page.content();
                const $detail = cheerio.load(detailHtml);
                
                // 提取详细信息
                const title = $detail('h1, .event-title, .title').first().text().trim() || event.title;
                
                // 提取日期
                const dateSelectors = [
                    '.event-date',
                    '.date',
                    '.period',
                    '[class*="date"]',
                    'dt:contains("期間") + dd',
                    'dt:contains("開催日") + dd'
                ];
                
                let date = '';
                for (const selector of dateSelectors) {
                    const dateText = $detail(selector).first().text().trim();
                    if (dateText && dateText.match(/\\d{4}年|\\d{1,2}月/)) {
                        date = dateText;
                        break;
                    }
                }
                
                // 从页面文本中提取日期
                if (!date) {
                    const pageText = $detail('body').text();
                    const dateMatch = pageText.match(/期間[：:](.*?)(?=\\n|例年|行って|打ち上げ)/);
                    if (dateMatch) {
                        date = dateMatch[1].trim();
                    }
                }
                
                // 提取地点
                const locationSelectors = [
                    '.location',
                    '.venue',
                    '.place',
                    '[class*="location"]',
                    'dt:contains("会場") + dd',
                    'dt:contains("場所") + dd'
                ];
                
                let location = '';
                for (const selector of locationSelectors) {
                    const locationText = $detail(selector).first().text().trim();
                    if (locationText && locationText.length > 3) {
                        location = locationText;
                        break;
                    }
                }
                
                // 从页面文本中提取地点
                if (!location) {
                    const pageText = $detail('body').text();
                    const locationMatch = pageText.match(/([都道府県市区町村][^\\n]*)/);
                    if (locationMatch) {
                        location = locationMatch[1].trim();
                    }
                }
                
                // 提取观众数
                let visitors = '';
                const pageText = $detail('body').text();
                const visitorsMatch = pageText.match(/例年の人出[：:]?\\s*約?([\\d,万]+人?)/);
                if (visitorsMatch) {
                    visitors = visitorsMatch[1];
                }
                
                // 提取花火数
                let fireworks = '';
                const fireworksMatch = pageText.match(/打ち上げ数[：:]?\\s*約?([\\d,万]+発?)/);
                if (fireworksMatch) {
                    fireworks = fireworksMatch[1];
                }
                
                // 提取其他信息
                const likesMatch = pageText.match(/行ってみたい[：:]?\\s*(\\d+)/);
                const likes = likesMatch ? parseInt(likesMatch[1]) : 0;
                
                const reviewsMatch = pageText.match(/行ってよかった[：:]?\\s*(\\d+)/);
                const reviews = reviewsMatch ? parseInt(reviewsMatch[1]) : 0;
                
                detailedEvents.push({
                    rank: i + 1,
                    title: title,
                    date: date,
                    location: location,
                    visitors: visitors,
                    fireworks: fireworks,
                    likes: likes,
                    reviews: reviews,
                    link: event.link,
                    source: 'WalkerPlus Detail Page',
                    crawledAt: new Date().toISOString()
                });
                
                console.log(`✅ 成功提取: ${title}`);
                console.log(`   日期: ${date || '未获取'}`);
                console.log(`   地点: ${location || '未获取'}`);
                console.log(`   观众: ${visitors || '未获取'}`);
                console.log(`   花火: ${fireworks || '未获取'}`);
                
            } catch (error) {
                console.log(`❌ 处理失败: ${error.message}`);
                // 即使失败也添加基础信息
                detailedEvents.push({
                    rank: i + 1,
                    title: event.title,
                    date: '',
                    location: '',
                    visitors: '',
                    fireworks: '',
                    likes: 0,
                    reviews: 0,
                    link: event.link,
                    source: 'WalkerPlus (Failed)',
                    crawledAt: new Date().toISOString()
                });
            }
        }
        
        console.log(`\\n📊 详细数据提取完成:`);
        console.log(`- 总计处理: ${detailedEvents.length} 个花火大会`);
        console.log(`- 数据来源: WalkerPlus详情页面`);
        console.log(`- 获取时间: ${new Date().toLocaleString()}`);
        
        // 保存详细数据
        const filename = 'koshinetsu-hanabi-launch-detailed.json';
        fs.writeFileSync(filename, JSON.stringify(detailedEvents, null, 2), 'utf8');
        console.log(`✅ 详细数据已保存到: ${filename}`);
        
        // 统计数据完整性
        const withDate = detailedEvents.filter(e => e.date).length;
        const withLocation = detailedEvents.filter(e => e.location).length;
        const withVisitors = detailedEvents.filter(e => e.visitors).length;
        const withFireworks = detailedEvents.filter(e => e.fireworks).length;
        
        console.log(`\\n📈 详细数据完整性统计:`);
        console.log(`- 包含日期信息: ${withDate}/${detailedEvents.length} (${Math.round(withDate/detailedEvents.length*100)}%)`);
        console.log(`- 包含地点信息: ${withLocation}/${detailedEvents.length} (${Math.round(withLocation/detailedEvents.length*100)}%)`);
        console.log(`- 包含观众数信息: ${withVisitors}/${detailedEvents.length} (${Math.round(withVisitors/detailedEvents.length*100)}%)`);
        console.log(`- 包含花火数信息: ${withFireworks}/${detailedEvents.length} (${Math.round(withFireworks/detailedEvents.length*100)}%)`);
        
        return detailedEvents;
        
    } catch (error) {
        console.error('❌ 详细信息获取过程中发生错误:', error.message);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// 运行详细信息爬虫
crawlKoshinetsuLaunchDetails()
    .then(events => {
        console.log(`\\n🎯 详细信息获取完成! 成功处理 ${events.length} 个花火大会`);
        
        const completeEvents = events.filter(e => e.date && e.location && (e.visitors || e.fireworks));
        console.log(`✅ 完整信息事件: ${completeEvents.length}/${events.length}`);
        
        if (events.length >= 10) {
            console.log('✅ 达到目标：获取至少10个活动信息');
        } else {
            console.log(`⚠️ 未达到目标：仅获取 ${events.length} 个活动信息，目标是至少10个`);
        }
    })
    .catch(error => {
        console.error('❌ 详细信息获取脚本执行失败:', error);
    }); 