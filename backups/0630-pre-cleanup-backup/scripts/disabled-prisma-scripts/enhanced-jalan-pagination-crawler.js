import { PrismaClient } from '../src/generated/prisma/index.js';
import { promises as fs } from 'fs';
import { chromium } from 'playwright';

const prisma = new PrismaClient();

/**
 * 增强版Jalan翻页爬虫 - 结合多种翻页技术
 * 
 * 翻页策略：
 * 1. URL参数翻页：通过page参数控制
 * 2. 智能停止机制：检测内容重复或404
 * 3. 会话管理：保持浏览器状态
 * 4. 批量数据提取：每页提取多个活动
 */

class EnhancedJalanPaginationCrawler {
    constructor() {
        this.browser = null;
        this.page = null;
        this.sessionId = `jalan_pagination_${Date.now()}`;
        this.allActivities = [];
        this.processedUrls = new Set(); // 防止重复处理
    }

    async init() {
        console.log('🚀 启动增强版翻页爬虫...');
        this.browser = await chromium.launch({ 
            headless: false,
            slowMo: 1000 // 减慢操作避免被检测
        });
        this.page = await this.browser.newPage();
        
        // 设置用户代理
        await this.page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });
        
        // 设置viewport
        await this.page.setViewportSize({ width: 1366, height: 768 });
    }

    /**
     * 主要翻页爬取方法
     */
    async crawlWithPagination(baseUrl, maxPages = 5) {
        try {
            await this.init();

            // 策略1：URL参数翻页
            await this.crawlByUrlParams(baseUrl, maxPages);
            
            // 策略2：Next按钮翻页（备用）
            // await this.crawlByNextButton(baseUrl, maxPages);

            console.log(`\n✅ 翻页爬取完成！总计提取 ${this.allActivities.length} 个活动`);
            
            return this.allActivities;

        } catch (error) {
            console.error('❌ 翻页爬取失败:', error);
            throw error;
        } finally {
            await this.cleanup();
        }
    }

    /**
     * 策略1：通过URL参数翻页
     */
    async crawlByUrlParams(baseUrl, maxPages) {
        console.log('\n📄 开始URL参数翻页...');
        
        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
            const pageUrl = this.buildPageUrl(baseUrl, pageNum);
            
            console.log(`\n🔍 正在爬取第${pageNum}页: ${pageUrl}`);
            
            try {
                const activities = await this.extractPageActivities(pageUrl);
                
                if (activities.length === 0) {
                    console.log(`⚠️ 第${pageNum}页无数据，停止翻页`);
                    break;
                }

                // 检查是否有重复内容（说明已经到最后一页）
                const hasNewContent = this.checkForNewContent(activities);
                if (!hasNewContent) {
                    console.log(`⚠️ 第${pageNum}页内容重复，停止翻页`);
                    break;
                }

                this.allActivities.push(...activities);
                console.log(`✅ 第${pageNum}页提取了 ${activities.length} 个活动`);

                // 礼貌等待
                await this.delay(2000);

            } catch (error) {
                console.error(`❌ 第${pageNum}页爬取失败:`, error);
                
                // 如果是404或网络错误，停止翻页
                if (error.message.includes('404') || error.message.includes('net::')) {
                    console.log('⚠️ 遇到404或网络错误，停止翻页');
                    break;
                }
                
                continue; // 其他错误继续下一页
            }
        }
    }

    /**
     * 策略2：通过Next按钮翻页（备用方案）
     */
    async crawlByNextButton(baseUrl, maxPages) {
        console.log('\n🔗 开始Next按钮翻页...');
        
        await this.page.goto(baseUrl, { waitUntil: 'networkidle' });
        
        let pageCount = 0;
        
        while (pageCount < maxPages) {
            pageCount++;
            console.log(`\n🔍 正在处理第${pageCount}页...`);
            
            try {
                // 提取当前页面活动
                const activities = await this.extractCurrentPageActivities();
                
                if (activities.length === 0) {
                    console.log(`⚠️ 第${pageCount}页无数据，停止翻页`);
                    break;
                }

                this.allActivities.push(...activities);
                console.log(`✅ 第${pageCount}页提取了 ${activities.length} 个活动`);

                // 查找并点击Next按钮
                const hasNext = await this.clickNextButton();
                if (!hasNext) {
                    console.log('⚠️ 没有找到Next按钮，停止翻页');
                    break;
                }

                // 等待新页面加载
                await this.waitForPageLoad();
                await this.delay(2000);

            } catch (error) {
                console.error(`❌ 第${pageCount}页处理失败:`, error);
                break;
            }
        }
    }

    /**
     * 构建翻页URL
     */
    buildPageUrl(baseUrl, pageNum) {
        const url = new URL(baseUrl);
        
        // 常见的翻页参数模式
        if (baseUrl.includes('jalan.net')) {
            // Jalan特定的翻页模式
            if (pageNum > 1) {
                url.searchParams.set('page', pageNum);
                // 或者其他可能的参数
                // url.searchParams.set('p', pageNum);
                // url.searchParams.set('start', (pageNum - 1) * 20);
            }
        }
        
        return url.toString();
    }

    /**
     * 提取页面活动（通过URL访问）
     */
    async extractPageActivities(pageUrl) {
        await this.page.goto(pageUrl, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });

        // 检查页面是否有效
        const title = await this.page.title();
        if (title.includes('404') || title.includes('エラー')) {
            throw new Error('404 page not found');
        }

        return await this.extractCurrentPageActivities();
    }

    /**
     * 提取当前页面的活动
     */
    async extractCurrentPageActivities() {
        const activities = [];

        try {
            // 等待活动列表加载
            await this.page.waitForSelector('.event-list, .activity-list, .search-result', { 
                timeout: 10000 
            });

            // 获取活动链接
            const activityLinks = await this.page.$$eval('a[href*="/event/"]', links => 
                links.map(link => ({
                    url: link.href,
                    title: link.textContent?.trim() || ''
                }))
            );

            console.log(`📋 在当前页面找到 ${activityLinks.length} 个活动链接`);

            // 限制每页处理的活动数量（避免过载）
            const linksToProcess = activityLinks.slice(0, 10);

            for (const linkInfo of linksToProcess) {
                if (this.processedUrls.has(linkInfo.url)) {
                    console.log(`⏭️ 跳过已处理的活动: ${linkInfo.url}`);
                    continue;
                }

                try {
                    const activity = await this.extractActivityDetails(linkInfo.url);
                    if (activity) {
                        activities.push(activity);
                        this.processedUrls.add(linkInfo.url);
                    }
                } catch (error) {
                    console.error(`❌ 提取活动详情失败 ${linkInfo.url}:`, error.message);
                    continue;
                }

                await this.delay(1000); // 礼貌等待
            }

        } catch (error) {
            console.error('❌ 提取页面活动失败:', error);
        }

        return activities;
    }

    /**
     * 提取单个活动的详细信息
     */
    async extractActivityDetails(activityUrl) {
        try {
            console.log(`🔍 正在提取活动详情: ${activityUrl}`);

            // 在新标签页中打开活动页面
            const activityPage = await this.browser.newPage();
            await activityPage.goto(activityUrl, { waitUntil: 'networkidle' });

            // 提取活动信息
            const activityData = await activityPage.evaluate(() => {
                // 智能提取逻辑
                const extractText = (selector) => {
                    const element = document.querySelector(selector);
                    return element ? element.textContent.trim() : '';
                };

                const extractAttribute = (selector, attr) => {
                    const element = document.querySelector(selector);
                    return element ? element.getAttribute(attr) : '';
                };

                // 多重选择器策略
                const name = extractText('h1') || 
                            extractText('.event-title') || 
                            extractText('[class*="title"]') || 
                            document.title;

                const datetime = extractText('[class*="date"]') || 
                                extractText('[class*="time"]') || 
                                extractText('.schedule');

                const venue = extractText('[class*="venue"]') || 
                             extractText('[class*="place"]') || 
                             extractText('[class*="location"]');

                const address = extractText('[class*="address"]') || 
                               extractText('[class*="addr"]');

                const description = extractText('[class*="description"]') || 
                                  extractText('[class*="summary"]') || 
                                  extractText('.content');

                // 坐标提取
                let latitude = null, longitude = null;
                const mapLink = extractAttribute('a[href*="maps.google.com"]', 'href');
                if (mapLink) {
                    const coordMatch = mapLink.match(/ll=([0-9.-]+),([0-9.-]+)/);
                    if (coordMatch) {
                        latitude = parseFloat(coordMatch[1]);
                        longitude = parseFloat(coordMatch[2]);
                    }
                }

                return {
                    name: name || '未知活动',
                    datetime: datetime || '',
                    venue: venue || '',
                    address: address || '',
                    description: description || '',
                    latitude,
                    longitude,
                    sourceUrl: window.location.href
                };
            });

            await activityPage.close();

            // 确定活动类型和地区
            const region = this.determineRegion(activityData.address, activityData.venue);
            const type = this.determineActivityType(activityData.name, activityData.description);

            if (region && type) {
                return {
                    ...activityData,
                    region,
                    type,
                    verified: true,
                    extractedAt: new Date().toISOString()
                };
            }

            return null;

        } catch (error) {
            console.error('❌ 提取活动详情时出错:', error);
            return null;
        }
    }

    /**
     * 点击Next按钮
     */
    async clickNextButton() {
        try {
            // 多种Next按钮选择器
            const nextSelectors = [
                'a[title*="次"]', // 次のページ
                'a[title*="next"]',
                '.pagination-next',
                '.next-page',
                'a:contains("次へ")',
                'a:contains(">")',
                '.pagination a:last-child'
            ];

            for (const selector of nextSelectors) {
                try {
                    const nextButton = await this.page.$(selector);
                    if (nextButton) {
                        const isDisabled = await nextButton.evaluate(btn => 
                            btn.disabled || 
                            btn.classList.contains('disabled') ||
                            btn.getAttribute('aria-disabled') === 'true'
                        );

                        if (!isDisabled) {
                            await nextButton.click();
                            return true;
                        }
                    }
                } catch (error) {
                    continue;
                }
            }

            return false;
        } catch (error) {
            console.error('❌ 点击Next按钮失败:', error);
            return false;
        }
    }

    /**
     * 等待页面加载
     */
    async waitForPageLoad() {
        try {
            await this.page.waitForLoadState('networkidle');
            await this.delay(1000);
        } catch (error) {
            console.error('⚠️ 等待页面加载超时');
        }
    }

    /**
     * 检查是否有新内容
     */
    checkForNewContent(newActivities) {
        if (this.allActivities.length === 0) return true;

        // 检查URL重复
        const existingUrls = new Set(this.allActivities.map(a => a.sourceUrl));
        const newUrls = newActivities.filter(a => !existingUrls.has(a.sourceUrl));
        
        return newUrls.length > 0;
    }

    /**
     * 确定地区
     */
    determineRegion(address, venue) {
        const text = `${address} ${venue}`.toLowerCase();
        
        const regionMap = {
            'tokyo': ['東京', 'tokyo', '新宿', '渋谷', '池袋'],
            'kanagawa': ['神奈川', 'kanagawa', '横浜', 'yokohama', '川崎'],
            'chiba': ['千葉', 'chiba', '船橋', '市川'],
            'saitama': ['埼玉', 'saitama', 'さいたま', '川口'],
            'kitakanto': ['茨城', 'ibaraki', '栃木', 'tochigi', '群馬', 'gunma'],
            'koshinetsu': ['新潟', 'niigata', '長野', 'nagano', '山梨', 'yamanashi']
        };

        for (const [region, keywords] of Object.entries(regionMap)) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return region;
            }
        }

        return 'tokyo'; // 默认
    }

    /**
     * 确定活动类型
     */
    determineActivityType(name, description) {
        const text = `${name} ${description}`.toLowerCase();
        
        if (text.includes('花火') || text.includes('fireworks')) return 'hanabi';
        if (text.includes('祭') || text.includes('festival')) return 'matsuri';
        if (text.includes('桜') || text.includes('cherry')) return 'hanami';
        if (text.includes('紅葉') || text.includes('autumn')) return 'momiji';
        if (text.includes('イルミ') || text.includes('illumination')) return 'illumination';
        
        return 'culture'; // 默认
    }

    /**
     * 保存活动到数据库
     */
    async saveActivities() {
        const savedCount = { success: 0, failed: 0 };

        for (const activity of this.allActivities) {
            try {
                const tableName = `${activity.type}Event`;
                
                // 使用动态表名保存
                if (tableName === 'hanabiEvent') {
                    await prisma.hanabiEvent.create({ data: this.formatForDatabase(activity) });
                } else if (tableName === 'matsuriEvent') {
                    await prisma.matsuriEvent.create({ data: this.formatForDatabase(activity) });
                } else if (tableName === 'hanamiEvent') {
                    await prisma.hanamiEvent.create({ data: this.formatForDatabase(activity) });
                } else if (tableName === 'momijiEvent') {
                    await prisma.momijiEvent.create({ data: this.formatForDatabase(activity) });
                } else if (tableName === 'illuminationEvent') {
                    await prisma.illuminationEvent.create({ data: this.formatForDatabase(activity) });
                } else {
                    await prisma.cultureArtEvent.create({ data: this.formatForDatabase(activity) });
                }

                savedCount.success++;
                console.log(`✅ 已保存: ${activity.name}`);

            } catch (error) {
                savedCount.failed++;
                console.error(`❌ 保存失败 ${activity.name}:`, error.message);
            }
        }

        console.log(`\n📊 保存结果: 成功 ${savedCount.success}, 失败 ${savedCount.failed}`);
        return savedCount;
    }

    /**
     * 格式化数据以适应数据库
     */
    formatForDatabase(activity) {
        return {
            name: activity.name,
            datetime: activity.datetime || '2025年夏季',
            venue: activity.venue || '未指定',
            address: activity.address || '',
            description: activity.description || '',
            regionId: activity.region,
            googleMap: activity.latitude && activity.longitude ? 
                     `https://maps.google.com/maps?ll=${activity.latitude},${activity.longitude}` : '',
            verified: true
        };
    }

    /**
     * 延迟函数
     */
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 清理资源
     */
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
        await prisma.$disconnect();
    }
}

// 使用示例
async function main() {
    const crawler = new EnhancedJalanPaginationCrawler();
    
    try {
        // 东京都活动列表（用户提供的正确URL）
        const baseUrl = 'https://www.jalan.net/event/130000/?screenId=OUW1025';
        
        console.log('🎯 开始增强版翻页爬取...');
        console.log(`📍 目标URL: ${baseUrl}`);
        
        // 执行翻页爬取
        const activities = await crawler.crawlWithPagination(baseUrl, 5);
        
        if (activities.length > 0) {
            console.log('\n💾 开始保存到数据库...');
            const saveResult = await crawler.saveActivities();
            
            console.log('\n🎉 翻页爬取完成！');
            console.log(`📈 总结果: ${activities.length} 个活动`);
            console.log(`💾 保存: 成功 ${saveResult.success}, 失败 ${saveResult.failed}`);
        } else {
            console.log('⚠️ 未提取到任何活动数据');
        }

    } catch (error) {
        console.error('❌ 程序执行失败:', error);
    }
}

// 直接运行程序
main().catch(error => {
    console.error('程序执行失败:', error);
    process.exit(1);
});

export default EnhancedJalanPaginationCrawler;