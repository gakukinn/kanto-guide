const fs = require('fs');
const path = require('path');

/**
 * 分析页面文件中的描述情况
 * 不连接数据库，只分析页面文件
 */

function analyzePages() {
    console.log('🔍 分析页面文件中的描述情况...\n');
    
    const regions = ['tokyo', 'saitama', 'chiba', 'kanagawa', 'kitakanto', 'koshinetsu'];
    const activityTypes = ['hanabi', 'matsuri', 'hanami', 'momiji', 'illumination', 'culture'];
    
    // 1. 找到葛飾納涼花火大会的页面
    console.log('=== 1. 查找葛飾納涼花火大会页面 ===');
    let katsushikaPages = [];
    
    for (const region of regions) {
        const hanabiDir = path.join('app', region, 'hanabi');
        if (fs.existsSync(hanabiDir)) {
            const items = fs.readdirSync(hanabiDir);
            for (const item of items) {
                const pagePath = path.join(hanabiDir, item, 'page.tsx');
                if (fs.existsSync(pagePath)) {
                    const content = fs.readFileSync(pagePath, 'utf8');
                    if (content.includes('葛飾納涼') || content.includes('かつしかのうりょう')) {
                        katsushikaPages.push(pagePath);
                    }
                }
            }
        }
    }
    
    console.log('找到葛飾納涼花火大会页面:', katsushikaPages.length);
    
    for (const pagePath of katsushikaPages) {
        console.log('\\n页面文件:', pagePath);
        const content = fs.readFileSync(pagePath, 'utf8');
        
        // 提取名称
        const nameMatch = content.match(/name:\\s*"([^"]+)"/);
        console.log('活动名称:', nameMatch ? nameMatch[1] : '未找到');
        
        // 提取描述
        const descMatch = content.match(/description:\\s*"([^"]+)"/);
        if (descMatch) {
            const desc = descMatch[1];
            console.log('页面描述:', desc);
            console.log('描述长度:', desc.length);
            
            // 判断是否是AI生成的虚假描述
            const fakePatterns = [
                '是一场精彩的花火大会',
                '这是一个不容错过的夏日盛典',
                '为观众带来绚烂的烟花表演'
            ];
            
            const isFake = fakePatterns.some(pattern => desc.includes(pattern));
            console.log('是否为AI生成:', isFake ? '是 ❌' : '否 ✅');
            
            if (!isFake) {
                console.log('✅ 这是真实的描述！');
            }
        } else {
            console.log('❌ 页面中没有描述字段');
        }
    }
    
    // 2. 分析所有页面的描述情况
    console.log('\\n=== 2. 分析所有页面描述情况 ===');
    
    const fakePatterns = [
        '是一场精彩的花火大会',
        '这是一个不容错过的夏日盛典',
        '为观众带来绚烂的烟花表演',
        '是一个传统的祭典活动',
        '是一场美丽的赏花活动',
        '是一个丰富的文化活动'
    ];
    
    let totalPages = 0;
    let pagesWithFakeDesc = 0;
    let pagesWithRealDesc = 0;
    let pagesWithoutDesc = 0;
    
    const fakeDescExamples = [];
    const realDescExamples = [];
    
    for (const region of regions) {
        for (const activityType of activityTypes) {
            const dir = path.join('app', region, activityType);
            if (fs.existsSync(dir)) {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const pagePath = path.join(dir, item, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        totalPages++;
                        const content = fs.readFileSync(pagePath, 'utf8');
                        
                        const descMatch = content.match(/description:\\s*"([^"]+)"/);
                        if (descMatch) {
                            const desc = descMatch[1];
                            const isFake = fakePatterns.some(pattern => desc.includes(pattern));
                            
                            if (isFake) {
                                pagesWithFakeDesc++;
                                if (fakeDescExamples.length < 3) {
                                    fakeDescExamples.push({
                                        file: pagePath,
                                        desc: desc.substring(0, 100) + '...'
                                    });
                                }
                            } else {
                                pagesWithRealDesc++;
                                if (realDescExamples.length < 3) {
                                    realDescExamples.push({
                                        file: pagePath,
                                        desc: desc.substring(0, 100) + '...'
                                    });
                                }
                            }
                        } else {
                            pagesWithoutDesc++;
                        }
                    }
                }
            }
        }
    }
    
    console.log('总页面数:', totalPages);
    console.log('包含AI生成虚假描述的页面:', pagesWithFakeDesc);
    console.log('包含真实描述的页面:', pagesWithRealDesc);
    console.log('没有描述的页面:', pagesWithoutDesc);
    
    // 3. 显示样本
    console.log('\\n=== 3. 虚假描述样本 ===');
    fakeDescExamples.forEach((example, index) => {
        console.log(`${index + 1}. ${example.file}`);
        console.log(`   描述: ${example.desc}`);
        console.log('');
    });
    
    console.log('=== 4. 真实描述样本 ===');
    realDescExamples.forEach((example, index) => {
        console.log(`${index + 1}. ${example.file}`);
        console.log(`   描述: ${example.desc}`);
        console.log('');
    });
    
    // 4. 检查HanabiDetailTemplate组件的显示逻辑
    console.log('=== 5. 检查模板组件显示逻辑 ===');
    const templatePath = path.join('src', 'components', 'HanabiDetailTemplate.tsx');
    if (fs.existsSync(templatePath)) {
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        
        // 查找description相关的显示逻辑
        const descLogicMatch = templateContent.match(/data\.description[^}]+}/g);
        if (descLogicMatch) {
            console.log('找到描述显示逻辑:');
            descLogicMatch.forEach(logic => {
                console.log(' ', logic);
            });
        }
        
        // 检查显示条件
        if (templateContent.includes("data.description !== '详见官网'")) {
            console.log('✅ 发现显示条件: 描述不能等于 "详见官网"');
        }
        
        if (templateContent.includes('data.description &&')) {
            console.log('✅ 发现显示条件: 描述不能为空');
        }
    } else {
        console.log('❌ 找不到模板文件');
    }
    
    // 5. 总结分析
    console.log('\\n=== 6. 问题分析总结 ===');
    
    if (pagesWithFakeDesc > 0) {
        console.log(`🚨 严重问题: 发现 ${pagesWithFakeDesc} 个页面包含AI生成的虚假描述`);
        console.log('   这些描述可能误导用户，违反商业网站的准确性要求');
    }
    
    if (pagesWithRealDesc > 0) {
        console.log(`✅ 发现 ${pagesWithRealDesc} 个页面包含真实描述`);
        console.log('   但可能由于显示条件问题，这些真实描述没有显示在页面上');
    }
    
    console.log(`📊 ${pagesWithoutDesc} 个页面没有描述字段`);
    
    console.log('\\n🔧 建议的解决方案:');
    console.log('1. 立即删除所有AI生成的虚假描述');
    console.log('2. 检查模板组件的显示逻辑，确保真实描述能正确显示');
    console.log('3. 对于没有真实描述的活动，显示空白或"详见官网"');
    console.log('4. 确保所有描述都来自walkerplus/jalan验证的数据');
}

analyzePages(); 