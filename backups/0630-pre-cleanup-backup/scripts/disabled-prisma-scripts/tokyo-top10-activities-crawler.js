import { PrismaClient } from '../src/generated/prisma/index.js';
import { chromium } from 'playwright';

const prisma = new PrismaClient();

/**
 * 东京前10个活动专用爬虫
 * 目标：获取六大类活动（祭典、花火、花见、红叶、灯光、文艺）的前10个活动
 * 每个活动获取11项完整信息
 */

class TokyoTop10ActivitiesCrawler {
    constructor() {
        this.browser = null;
        this.page = null;
        this.foundActivities = [];
        this.targetCount = 10; // 目标：前10个活动
        
        // 六大类活动关键词
        this.activityTypes = {
            'matsuri': ['祭', 'festival', '祭典', '祭典'],
            'hanabi': ['花火', 'fireworks', '花火大会'],
            'hanami': ['桜', 'cherry', '花見', 'さくら', '梅'],
            'momiji': ['紅葉', 'autumn', 'もみじ', '紅葉狩り'],
            'illumination': ['イルミネーション', 'illumination', 'ライトアップ'],
            'culture': ['文化', 'culture', 'アート', 'art', '展覧会', '音楽']
        };
    }

    async start() {
        console.log('🎯 开始爬取东京前10个六大类活动...');
        
        try {
            await this.initBrowser();
            await this.crawlActivities();
            await this.saveActivities();
            
            console.log(`\n🎉 任务完成！成功爬取 ${this.foundActivities.length} 个活动`);
            
        } catch (error) {
            console.error('❌ 爬取失败:', error.message);
        } finally {
            await this.cleanup();
        }
    }

    async initBrowser() {
        console.log('🚀 启动浏览器...');
        this.browser = await chromium.launch({ 
            headless: false, // 可视化操作，方便调试
            slowMo: 1000 
        });
        this.page = await this.browser.newPage();
        
        // 设置合理的超时时间
        this.page.setDefaultTimeout(30000);
    }

    async crawlActivities() {
        // 方案1：直接从活动列表页面开始
        const listUrls = [
            'https://www.jalan.net/event/130000/?screenId=OUW1025', // 用户提供的东京URL
            'https://www.jalan.net/event/130000/', // 备用URL
        ];

        for (const listUrl of listUrls) {
            console.log(`\n📋 尝试访问活动列表: ${listUrl}`);
            
            try {
                await this.page.goto(listUrl, { waitUntil: 'domcontentloaded' });
                await this.page.waitForTimeout(3000);
                
                const title = await this.page.title();
                console.log(`📄 页面标题: ${title}`);
                
                // 如果成功加载，开始提取活动
                await this.extractActivitiesFromList();
                
                // 如果已经找到足够的活动，停止
                if (this.foundActivities.length >= this.targetCount) {
                    console.log(`✅ 已找到 ${this.foundActivities.length} 个活动，任务完成`);
                    break;
                }
                
            } catch (error) {
                console.error(`❌ 访问 ${listUrl} 失败:`, error.message);
                continue;
            }
        }

        // 方案2：如果列表页面无法访问，使用已知的活动URL
        if (this.foundActivities.length === 0) {
            console.log('\n🔄 列表页面无法访问，使用备用方案...');
            await this.useBackupActivityUrls();
        }
    }

    async extractActivitiesFromList() {
        console.log('🔍 正在从列表页面提取活动链接...');
        
        try {
            // 等待页面内容加载
            await this.page.waitForTimeout(5000);
            
            // 尝试多种可能的活动链接选择器
            const linkSelectors = [
                'a[href*="/event/"]',
                'a[href*="event"]',
                'a[href*="evt"]',
                'a',
            ];

            let activityLinks = [];
            
            for (const selector of linkSelectors) {
                try {
                    const links = await this.page.$$eval(selector, elements =>
                        elements
                            .filter(el => el.href && (
                                el.href.includes('/event/') || 
                                el.href.includes('jalan.net')
                            ))
                            .slice(0, 20) // 获取前20个链接
                            .map(el => ({
                                url: el.href,
                                text: el.textContent?.trim() || ''
                            }))
                    );
                    
                    if (links.length > 0) {
                        activityLinks = links;
                        console.log(`✅ 使用选择器 "${selector}" 找到 ${links.length} 个活动链接`);
                        break;
                    }
                } catch (error) {
                    continue;
                }
            }

            if (activityLinks.length === 0) {
                console.log('⚠️ 未找到活动链接，使用备用方案');
                return;
            }

            // 处理找到的活动链接
            for (const linkInfo of activityLinks) {
                if (this.foundActivities.length >= this.targetCount) {
                    break;
                }
                
                console.log(`\n🔍 处理活动: ${linkInfo.text}`);
                console.log(`🔗 链接: ${linkInfo.url}`);
                
                const activityData = await this.extractActivityDetails(linkInfo.url);
                
                if (activityData && this.isTargetActivityType(activityData)) {
                    this.foundActivities.push(activityData);
                    console.log(`✅ 已收集 ${this.foundActivities.length}/${this.targetCount} 个目标活动`);
                }
                
                // 礼貌等待
                await this.page.waitForTimeout(2000);
            }
            
        } catch (error) {
            console.error('❌ 提取活动链接失败:', error.message);
        }
    }

    async useBackupActivityUrls() {
        console.log('🆘 使用备用活动URL列表...');
        
        // 一些已知的东京活动URL（基于之前的测试）
        const backupUrls = [
            'https://www.jalan.net/event/evt_343864/', // 新橋こいち祭
            'https://www.jalan.net/event/evt_343865/',
            'https://www.jalan.net/event/evt_343866/',
            'https://www.jalan.net/event/evt_343867/',
            'https://www.jalan.net/event/evt_343868/',
        ];

        for (const url of backupUrls) {
            if (this.foundActivities.length >= this.targetCount) {
                break;
            }
            
            console.log(`\n🔍 处理备用活动: ${url}`);
            
            const activityData = await this.extractActivityDetails(url);
            
            if (activityData && this.isTargetActivityType(activityData)) {
                this.foundActivities.push(activityData);
                console.log(`✅ 已收集 ${this.foundActivities.length}/${this.targetCount} 个目标活动`);
            }
            
            await this.page.waitForTimeout(2000);
        }
    }

    async extractActivityDetails(activityUrl) {
        try {
            console.log(`📄 正在提取活动详情: ${activityUrl}`);
            
            await this.page.goto(activityUrl, { waitUntil: 'domcontentloaded' });
            await this.page.waitForTimeout(3000);

            // 提取11项必需信息
            const activityData = await this.page.evaluate(() => {
                const getText = (selector) => {
                    const element = document.querySelector(selector);
                    return element ? element.textContent.trim() : '';
                };

                const getAttr = (selector, attr) => {
                    const element = document.querySelector(selector);
                    return element ? element.getAttribute(attr) : '';
                };

                // 使用多重选择器策略提取信息
                const name = getText('h1') || 
                           getText('.title') || 
                           getText('[class*="title"]') || 
                           document.title.split('|')[0].trim();

                const datetime = getText('[class*="date"]') || 
                               getText('[class*="time"]') || 
                               getText('[class*="period"]') ||
                               '';

                const venue = getText('[class*="venue"]') || 
                            getText('[class*="place"]') || 
                            getText('[class*="location"]') ||
                            '';

                const address = getText('[class*="address"]') || 
                              getText('[class*="addr"]') ||
                              '';

                const access = getText('[class*="access"]') || 
                             getText('[class*="transport"]') ||
                             '';

                const organizer = getText('[class*="organizer"]') || 
                                getText('[class*="sponsor"]') ||
                                '';

                const price = getText('[class*="price"]') || 
                            getText('[class*="fee"]') || 
                            getText('[class*="cost"]') ||
                            '';

                const contact = getText('[class*="contact"]') || 
                              getText('[class*="tel"]') || 
                              getText('[class*="phone"]') ||
                              '';

                const description = getText('[class*="description"]') || 
                                  getText('[class*="summary"]') || 
                                  getText('.content') ||
                                  '';

                // 坐标信息
                let latitude = null, longitude = null;
                const mapLink = getAttr('a[href*="maps.google.com"]', 'href');
                if (mapLink) {
                    const match = mapLink.match(/ll=([0-9.-]+),([0-9.-]+)/);
                    if (match) {
                        latitude = parseFloat(match[1]);
                        longitude = parseFloat(match[2]);
                    }
                }

                return {
                    name: name || '活动名称待确认',
                    datetime: datetime || '时间待确认',
                    venue: venue || '地点待确认',
                    address: address || '地址待确认',
                    access: access || '交通方式待确认',
                    organizer: organizer || '主办方待确认',
                    price: price || '费用待确认',
                    contact: contact || '联系方式待确认',
                    description: description || '描述待确认',
                    latitude,
                    longitude,
                    sourceUrl: window.location.href
                };
            });

            // 确定活动类型和地区
            activityData.activityType = this.determineActivityType(activityData.name, activityData.description);
            activityData.region = 'tokyo'; // 专门爬取东京活动
            
            console.log(`📊 提取完成: ${activityData.name} (${activityData.activityType})`);
            
            return activityData;

        } catch (error) {
            console.error(`❌ 提取活动详情失败 ${activityUrl}:`, error.message);
            return null;
        }
    }

    determineActivityType(name, description) {
        const text = `${name} ${description}`.toLowerCase();
        
        for (const [type, keywords] of Object.entries(this.activityTypes)) {
            if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
                return type;
            }
        }
        
        return 'culture'; // 默认归类为文艺活动
    }

    isTargetActivityType(activityData) {
        // 检查是否属于六大类活动之一
        const validTypes = Object.keys(this.activityTypes);
        const isValidType = validTypes.includes(activityData.activityType);
        
        console.log(`🎯 活动类型检查: ${activityData.activityType} - ${isValidType ? '✅ 符合' : '❌ 不符合'}`);
        
        return isValidType;
    }

    async saveActivities() {
        console.log('\n💾 开始保存活动到数据库...');
        
        const saveResults = { success: 0, failed: 0 };

        for (const activity of this.foundActivities) {
            try {
                const dbData = {
                    name: activity.name,
                    datetime: activity.datetime,
                    venue: activity.venue,
                    address: activity.address,
                    access: activity.access,
                    organizer: activity.organizer,
                    price: activity.price,
                    contact: activity.contact,
                    description: activity.description,
                    regionId: activity.region,
                    googleMap: activity.latitude && activity.longitude ? 
                             `https://maps.google.com/maps?ll=${activity.latitude},${activity.longitude}` : '',
                    verified: true
                };

                // 根据活动类型保存到对应表
                switch (activity.activityType) {
                    case 'matsuri':
                        await prisma.matsuriEvent.create({ data: dbData });
                        break;
                    case 'hanabi':
                        await prisma.hanabiEvent.create({ data: dbData });
                        break;
                    case 'hanami':
                        await prisma.hanamiEvent.create({ data: dbData });
                        break;
                    case 'momiji':
                        await prisma.momijiEvent.create({ data: dbData });
                        break;
                    case 'illumination':
                        await prisma.illuminationEvent.create({ data: dbData });
                        break;
                    default:
                        await prisma.cultureArtEvent.create({ data: dbData });
                }

                saveResults.success++;
                console.log(`✅ 已保存: ${activity.name} (${activity.activityType})`);

            } catch (error) {
                saveResults.failed++;
                console.error(`❌ 保存失败 ${activity.name}:`, error.message);
            }
        }

        console.log(`\n📊 保存结果: 成功 ${saveResults.success} 个，失败 ${saveResults.failed} 个`);
        
        return saveResults;
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
        await prisma.$disconnect();
    }
}

// 主程序
async function main() {
    console.log('🎯 东京前10个六大类活动爬取程序');
    console.log('📋 目标：祭典、花火、花见、红叶、灯光、文艺活动');
    console.log('📊 每个活动提取11项完整信息\n');

    const crawler = new TokyoTop10ActivitiesCrawler();
    await crawler.start();
}

// 运行程序
main().catch(error => {
    console.error('程序运行失败:', error);
    process.exit(1);
}); 