import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function crawlKoshinetsuLaunchHanabi() {
    console.log('🚀 开始获取甲信越地区花火大会Launch页面数据...');
    
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
        const url = 'https://hanabi.walkerplus.com/launch/ar0400/';
        console.log(`📡 正在访问: ${url}`);
        
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForTimeout(3000);
        
        // 获取页面HTML内容
        const html = await page.content();
        const $ = cheerio.load(html);
        
        const events = [];
        
        // 查找花火大会列表项 - 尝试多种选择器
        const selectors = [
            '.p-event-list__item',
            '.event-item',
            '.hanabi-item',
            '.list-item',
            'article',
            '.event-card',
            '[data-event]',
            '.item'
        ];
        
        let foundItems = false;
        
        for (const selector of selectors) {
            const items = $(selector);
            if (items.length > 0) {
                console.log(`✅ 找到 ${items.length} 个项目，使用选择器: ${selector}`);
                foundItems = true;
                
                items.each((index, element) => {
                    const $item = $(element);
                    
                    // 提取标题
                    const title = $item.find('h3, h2, .title, .event-title, .name, a[href*="detail"]').first().text().trim() ||
                                 $item.find('a').first().text().trim() ||
                                 $item.text().split('\n')[0].trim();
                    
                    // 提取链接
                    const link = $item.find('a[href*="detail"]').first().attr('href') ||
                                $item.find('a').first().attr('href') ||
                                '';
                    
                    // 提取日期
                    const dateText = $item.find('.date, .event-date, .time').text().trim() ||
                                    $item.text().match(/\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日|\d{1,2}\/\d{1,2}/)?.[0] ||
                                    '';
                    
                    // 提取地点
                    const location = $item.find('.location, .place, .venue').text().trim() ||
                                   $item.text().match(/[都道府県市区町村]/)?.[0] ||
                                   '';
                    
                    // 提取观众数
                    const visitorsText = $item.text().match(/(\d+(?:,\d+)*)\s*[人名]/)?.[1] || '';
                    
                    // 提取花火数
                    const fireworksText = $item.text().match(/(\d+(?:,\d+)*)\s*[発発]/)?.[1] || '';
                    
                    if (title && title.length > 3) {
                        events.push({
                            rank: index + 1,
                            title: title,
                            date: dateText,
                            location: location,
                            visitors: visitorsText,
                            fireworks: fireworksText,
                            link: link.startsWith('http') ? link : `https://hanabi.walkerplus.com${link}`,
                            source: 'WalkerPlus Launch Page',
                            crawledAt: new Date().toISOString()
                        });
                        
                        console.log(`📝 提取事件 ${index + 1}: ${title}`);
                    }
                });
                
                break; // 找到数据后退出循环
            }
        }
        
        if (!foundItems) {
            console.log('⚠️ 未找到标准列表项，尝试提取所有链接...');
            
            // 备用方案：提取所有包含花火相关的链接
            $('a[href*="detail"]').each((index, element) => {
                const $link = $(element);
                const title = $link.text().trim();
                const href = $link.attr('href');
                
                if (title && title.includes('花火') && href) {
                    events.push({
                        rank: index + 1,
                        title: title,
                        date: '',
                        location: '',
                        visitors: '',
                        fireworks: '',
                        link: href.startsWith('http') ? href : `https://hanabi.walkerplus.com${href}`,
                        source: 'WalkerPlus Launch Page (Links)',
                        crawledAt: new Date().toISOString()
                    });
                    
                    console.log(`🔗 提取链接 ${index + 1}: ${title}`);
                }
            });
        }
        
        // 如果仍然没有数据，输出页面结构用于调试
        if (events.length === 0) {
            console.log('⚠️ 未找到花火大会数据，输出页面结构用于调试...');
            
            // 输出页面标题
            const pageTitle = $('title').text();
            console.log(`页面标题: ${pageTitle}`);
            
            // 输出主要内容区域
            const mainContent = $('main, .main, .content, #content').first().text().substring(0, 500);
            console.log(`主要内容: ${mainContent}...`);
            
            // 输出所有链接
            const allLinks = [];
            $('a').each((index, element) => {
                const $link = $(element);
                const text = $link.text().trim();
                const href = $link.attr('href');
                if (text && href) {
                    allLinks.push({ text, href });
                }
            });
            
            console.log(`找到 ${allLinks.length} 个链接`);
            allLinks.slice(0, 10).forEach((link, index) => {
                console.log(`链接 ${index + 1}: ${link.text} -> ${link.href}`);
            });
        }
        
        console.log(`\n📊 数据提取完成:`);
        console.log(`- 总计获取: ${events.length} 个花火大会信息`);
        console.log(`- 数据来源: WalkerPlus Launch页面`);
        console.log(`- 获取时间: ${new Date().toLocaleString()}`);
        
        // 保存数据到文件
        const filename = 'koshinetsu-hanabi-launch-data.json';
        fs.writeFileSync(filename, JSON.stringify(events, null, 2), 'utf8');
        console.log(`✅ 数据已保存到: ${filename}`);
        
        // 输出详细统计
        const withDate = events.filter(e => e.date).length;
        const withLocation = events.filter(e => e.location).length;
        const withVisitors = events.filter(e => e.visitors).length;
        const withFireworks = events.filter(e => e.fireworks).length;
        
        console.log(`\n📈 数据完整性统计:`);
        console.log(`- 包含日期信息: ${withDate}/${events.length} (${Math.round(withDate/events.length*100)}%)`);
        console.log(`- 包含地点信息: ${withLocation}/${events.length} (${Math.round(withLocation/events.length*100)}%)`);
        console.log(`- 包含观众数信息: ${withVisitors}/${events.length} (${Math.round(withVisitors/events.length*100)}%)`);
        console.log(`- 包含花火数信息: ${withFireworks}/${events.length} (${Math.round(withFireworks/events.length*100)}%)`);
        
        return events;
        
    } catch (error) {
        console.error('❌ 爬取过程中发生错误:', error.message);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// 运行爬虫
crawlKoshinetsuLaunchHanabi()
    .then(events => {
        console.log(`\n🎯 任务完成! 成功获取 ${events.length} 个花火大会信息`);
        if (events.length >= 10) {
            console.log('✅ 达到目标：获取至少10个活动信息');
        } else {
            console.log(`⚠️ 未达到目标：仅获取 ${events.length} 个活动信息，目标是至少10个`);
        }
    })
    .catch(error => {
        console.error('❌ 脚本执行失败:', error);
    }); 