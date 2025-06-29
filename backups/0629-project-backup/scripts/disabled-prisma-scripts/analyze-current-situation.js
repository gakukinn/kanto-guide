const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

/**
 * 分析当前情况：
 * 1. 检查数据库中的真实数据
 * 2. 检查页面中的数据
 * 3. 识别哪些是我生成的虚假数据
 */

async function analyzeCurrentSituation() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔍 开始分析当前数据情况...\n');
        
        // 1. 检查葛飾納涼花火大会的真实数据
        console.log('=== 1. 数据库中的真实数据 ===');
        const katsushikaEvent = await prisma.hanabiEvent.findMany({
            where: {
                name: {
                    contains: '葛飾納涼'
                }
            }
        });
        
        if (katsushikaEvent.length > 0) {
            const event = katsushikaEvent[0];
            console.log('ID:', event.id);
            console.log('名称:', event.name);
            console.log('真实描述:', event.description || '(空)');
            console.log('描述长度:', event.description ? event.description.length : 0);
            console.log('地址:', event.address || '(空)');
            console.log('时间:', event.datetime || '(空)');
            console.log('会场:', event.venue || '(空)');
        } else {
            console.log('❌ 未找到葛飾納涼花火大会');
        }
        
        // 2. 统计数据库整体情况
        console.log('\n=== 2. 数据库整体描述情况 ===');
        const totalEvents = await prisma.hanabiEvent.count();
        const eventsWithDesc = await prisma.hanabiEvent.count({
            where: {
                description: {
                    not: null,
                    not: ''
                }
            }
        });
        
        console.log('总活动数:', totalEvents);
        console.log('有真实描述的活动:', eventsWithDesc);
        console.log('没有描述的活动:', totalEvents - eventsWithDesc);
        console.log('有描述比例:', Math.round((eventsWithDesc / totalEvents) * 100) + '%');
        
        // 3. 检查页面文件中的数据
        console.log('\n=== 3. 检查页面文件中的描述 ===');
        
        // 找到葛飾納涼花火大会的页面文件
        const pageFiles = [];
        const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
        
        for (const region of regions) {
            const hanabiDir = path.join('app', region, 'hanabi');
            if (fs.existsSync(hanabiDir)) {
                const items = fs.readdirSync(hanabiDir);
                for (const item of items) {
                    const pagePath = path.join(hanabiDir, item, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        const content = fs.readFileSync(pagePath, 'utf8');
                        if (content.includes('葛飾納涼') || content.includes('かつしかのうりょう')) {
                            pageFiles.push(pagePath);
                        }
                    }
                }
            }
        }
        
        console.log('找到的葛飾納涼花火大会页面文件:', pageFiles.length);
        
        for (const pageFile of pageFiles) {
            console.log('\n页面文件:', pageFile);
            const content = fs.readFileSync(pageFile, 'utf8');
            
            // 提取页面中的描述
            const descMatch = content.match(/description:\s*"([^"]+)"/);
            if (descMatch) {
                const pageDesc = descMatch[1];
                console.log('页面中的描述:', pageDesc);
                console.log('描述长度:', pageDesc.length);
                
                // 判断是否是我生成的虚假描述
                const isFakeDesc = pageDesc.includes('是一场精彩的') || 
                                 pageDesc.includes('这是一个不容错过的') ||
                                 pageDesc.includes('为观众带来');
                                 
                console.log('是否为生成的描述:', isFakeDesc ? '是 ❌' : '否 ✅');
            } else {
                console.log('页面中没有找到描述字段');
            }
        }
        
        // 4. 分析虚假描述的模式
        console.log('\n=== 4. 分析虚假描述模式 ===');
        const fakePatterns = [
            '是一场精彩的花火大会',
            '这是一个不容错过的夏日盛典',
            '为观众带来绚烂的烟花表演',
            '是一个传统的祭典活动',
            '是一场美丽的赏花活动',
            '是一个丰富的文化活动'
        ];
        
        let totalPageFiles = 0;
        let fakeDescCount = 0;
        let realDescCount = 0;
        let noDescCount = 0;
        
        for (const region of regions) {
            for (const activityType of ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture']) {
                const dir = path.join('app', region, activityType);
                if (fs.existsSync(dir)) {
                    const items = fs.readdirSync(dir);
                    for (const item of items) {
                        const pagePath = path.join(dir, item, 'page.tsx');
                        if (fs.existsSync(pagePath)) {
                            totalPageFiles++;
                            const content = fs.readFileSync(pagePath, 'utf8');
                            
                            const descMatch = content.match(/description:\s*"([^"]+)"/);
                            if (descMatch) {
                                const desc = descMatch[1];
                                const isFake = fakePatterns.some(pattern => desc.includes(pattern));
                                
                                if (isFake) {
                                    fakeDescCount++;
                                } else {
                                    realDescCount++;
                                }
                            } else {
                                noDescCount++;
                            }
                        }
                    }
                }
            }
        }
        
        console.log('总页面文件数:', totalPageFiles);
        console.log('包含虚假描述的页面:', fakeDescCount);
        console.log('包含真实描述的页面:', realDescCount);
        console.log('没有描述的页面:', noDescCount);
        
        console.log('\n=== 5. 总结分析 ===');
        if (fakeDescCount > 0) {
            console.log('🚨 发现问题: 有', fakeDescCount, '个页面包含AI生成的虚假描述');
            console.log('🔧 需要立即删除这些虚假描述');
        }
        
        if (realDescCount > 0) {
            console.log('✅ 好消息: 有', realDescCount, '个页面包含真实描述');
        }
        
        console.log('📊 数据库中有', eventsWithDesc, '个活动有真实描述，但可能没有正确显示在页面上');
        
    } catch (error) {
        console.error('❌ 分析过程中出错:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

analyzeCurrentSituation(); 