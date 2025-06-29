import { chromium } from 'playwright';

/**
 * 简单翻页测试 - 分析Jalan页面结构
 */

async function testPagination() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        console.log('🔍 正在分析页面结构...');
        
        // 访问用户提供的正确URL
        const url = 'https://www.jalan.net/event/130000/?screenId=OUW1025';
        console.log(`📍 访问: ${url}`);
        
        await page.goto(url, { waitUntil: 'networkidle' });
        
        // 等待几秒让页面完全加载
        await page.waitForTimeout(3000);
        
        // 获取页面标题
        const title = await page.title();
        console.log(`📄 页面标题: ${title}`);
        
        // 查找可能的活动容器
        const possibleSelectors = [
            '.event-list',
            '.activity-list', 
            '.search-result',
            '.event-item',
            '.list-item',
            '[class*="event"]',
            '[class*="list"]',
            'article',
            '.item',
            'li'
        ];
        
        console.log('\n🔍 检查可能的选择器...');
        for (const selector of possibleSelectors) {
            try {
                const elements = await page.$$(selector);
                if (elements.length > 0) {
                    console.log(`✅ 找到 ${elements.length} 个 "${selector}" 元素`);
                    
                    // 获取前3个元素的文本内容作为示例
                    for (let i = 0; i < Math.min(3, elements.length); i++) {
                        const text = await elements[i].textContent();
                        const shortText = text?.slice(0, 100) || '';
                        console.log(`   样本 ${i+1}: ${shortText}...`);
                    }
                } else {
                    console.log(`❌ 未找到 "${selector}" 元素`);
                }
            } catch (error) {
                console.log(`⚠️ "${selector}" 检查失败: ${error.message}`);
            }
        }
        
        // 查找活动链接
        console.log('\n🔗 检查活动链接...');
        const linkSelectors = [
            'a[href*="/event/"]',
            'a[href*="event"]',
            'a[href*="evt"]',
            'a[title*="イベント"]',
            'a'
        ];
        
        for (const selector of linkSelectors) {
            try {
                const links = await page.$$eval(selector, elements => 
                    elements.slice(0, 5).map(el => ({
                        href: el.href,
                        text: el.textContent?.trim().slice(0, 50) || ''
                    }))
                );
                
                if (links.length > 0) {
                    console.log(`✅ 找到 ${links.length} 个 "${selector}" 链接:`);
                    links.forEach((link, i) => {
                        console.log(`   ${i+1}. ${link.text} → ${link.href}`);
                    });
                    break; // 找到第一个有效的选择器就停止
                }
            } catch (error) {
                console.log(`⚠️ "${selector}" 链接检查失败: ${error.message}`);
            }
        }
        
        // 查找翻页控制
        console.log('\n📄 检查翻页控制...');
        const paginationSelectors = [
            '.pagination',
            '.page-nav',
            '.pager',
            '[class*="page"]',
            '[class*="next"]',
            'a[title*="次"]',
            'a[title*="next"]'
        ];
        
        for (const selector of paginationSelectors) {
            try {
                const elements = await page.$$(selector);
                if (elements.length > 0) {
                    console.log(`✅ 找到 ${elements.length} 个 "${selector}" 翻页元素`);
                    
                    for (let i = 0; i < Math.min(2, elements.length); i++) {
                        const text = await elements[i].textContent();
                        const html = await elements[i].innerHTML();
                        console.log(`   翻页元素 ${i+1}: ${text?.slice(0, 50) || ''}`);
                        console.log(`   HTML: ${html.slice(0, 100)}...`);
                    }
                }
            } catch (error) {
                console.log(`⚠️ "${selector}" 翻页检查失败: ${error.message}`);
            }
        }
        
        // 检查页面URL的参数
        console.log('\n🌐 当前URL参数:');
        const currentUrl = new URL(page.url());
        currentUrl.searchParams.forEach((value, key) => {
            console.log(`   ${key}: ${value}`);
        });
        
        // 测试添加page参数
        console.log('\n🧪 测试添加page参数...');
        currentUrl.searchParams.set('page', '2');
        const page2Url = currentUrl.toString();
        console.log(`   第2页URL: ${page2Url}`);
        
        // 尝试访问第2页
        console.log('\n🔍 尝试访问第2页...');
        await page.goto(page2Url, { waitUntil: 'networkidle' });
        
        const page2Title = await page.title();
        console.log(`📄 第2页标题: ${page2Title}`);
        
        // 检查是否成功跳转到不同页面
        if (page2Title !== title) {
            console.log('✅ 成功跳转到不同页面！');
        } else {
            console.log('⚠️ 页面标题相同，可能翻页失败');
        }
        
    } catch (error) {
        console.error('❌ 测试失败:', error);
    } finally {
        console.log('\n⏰ 等待10秒以便观察...');
        await page.waitForTimeout(10000);
        await browser.close();
    }
}

// 运行测试
testPagination().catch(console.error); 