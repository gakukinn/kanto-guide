import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function crawlYamanakakoHanabi() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    try {
        console.log('访问页面: https://hanabi.walkerplus.com/detail/ar0419e00075/');
        await page.goto('https://hanabi.walkerplus.com/detail/ar0419e00075/');
        await page.waitForTimeout(3000);
        
        // 提取数据
        const data = await page.evaluate(() => {
            // 提取基本信息
            const title = document.querySelector('h1')?.textContent?.trim() || '';
            const dateElement = document.querySelector('dd');
            const date = dateElement?.textContent?.trim() || '';
            const timeElement = document.querySelectorAll('dd')[1];
            const time = timeElement?.textContent?.trim() || '';
            
            // 提取地点信息
            const locationElements = Array.from(document.querySelectorAll('p')).filter(p => 
                p.textContent.includes('山中湖') && p.textContent.includes('南都留郡')
            );
            const location = locationElements.length > 0 ? 
                locationElements[0].textContent.trim().replace(/.*\/\s*/, '') : 
                '山中湖畔';
            
            // 提取描述信息
            const descriptionElements = Array.from(document.querySelectorAll('p')).filter(p => {
                const text = p.textContent;
                return text.includes('大正時代') || text.includes('報湖祭') || text.includes('花火大会');
            });
            const description = descriptionElements.length > 0 ? descriptionElements[0].textContent.trim() : '';
            
            // 提取花火数
            const fireworksElements = Array.from(document.querySelectorAll('p')).filter(p => {
                const text = p.textContent;
                return text.includes('発') || text.includes('万発');
            });
            const fireworksText = fireworksElements.length > 0 ? fireworksElements[0].textContent : '';
            const fireworksMatch = fireworksText.match(/(\d+(?:万|,\d+)?)発/);
            const fireworks = fireworksMatch ? fireworksMatch[1] : null;
            
            // 提取见どころ
            const highlightsElement = Array.from(document.querySelectorAll('h4')).find(h => 
                h.textContent.includes('見どころ')
            );
            const highlights = highlightsElement?.nextElementSibling?.textContent?.trim() || '';
            
            // 提取图片
            const images = [];
            const imgElements = document.querySelectorAll('img');
            imgElements.forEach(img => {
                const src = img.getAttribute('src');
                const alt = img.getAttribute('alt');
                if (src && alt && alt.includes('山中湖')) {
                    images.push({ src, alt });
                }
            });
            
            return {
                title,
                date,
                time,
                location,
                description,
                fireworks,
                highlights,
                images: images.slice(0, 3),
                crawledAt: new Date().toISOString(),
                sourceUrl: window.location.href
            };
        });
        
        console.log('抓取到的数据:');
        console.log(JSON.stringify(data, null, 2));
        
        // 确保目录存在
        const dataDir = path.join(process.cwd(), 'data', 'walkerplus-crawled');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        const filename = path.join(dataDir, 'yamanakako-houkosai-hanabi.json');
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
        console.log('数据已保存到:', filename);
        
        return data;
        
    } catch (error) {
        console.error('抓取失败:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// 运行抓取
crawlYamanakakoHanabi()
    .then(() => {
        console.log('抓取完成！');
    })
    .catch(error => {
        console.error('抓取失败:', error);
        process.exit(1);
    }); 