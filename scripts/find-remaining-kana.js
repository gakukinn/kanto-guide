const fs = require('fs');
const path = require('path');

// 检测平假名和片假名的函数
function detectKana(text) {
    if (!text || typeof text !== 'string') return { hasKana: false, kanaWords: [] };
    
    // 查找包含假名的完整词汇
    const kanaWordRegex = /[a-zA-Z0-9\u4e00-\u9fff]*[\u3040-\u309F\u30A0-\u30FF]+[a-zA-Z0-9\u4e00-\u9fff]*/g;
    const kanaWords = text.match(kanaWordRegex) || [];
    
    return {
        hasKana: kanaWords.length > 0,
        kanaWords: kanaWords
    };
}

// 扫描所有四层页面
function findAllFourthLevelPages() {
    const regions = ['chiba', 'kanagawa', 'kitakanto', 'koshinetsu', 'saitama', 'tokyo'];
    const activities = ['hanabi', 'hanami', 'matsuri', 'bunka'];
    const pages = [];
    
    regions.forEach(region => {
        activities.forEach(activity => {
            const activityDir = path.join('app', region, activity);
            if (fs.existsSync(activityDir)) {
                const items = fs.readdirSync(activityDir);
                items.forEach(item => {
                    const itemPath = path.join(activityDir, item);
                    const pagePath = path.join(itemPath, 'page.tsx');
                    if (fs.existsSync(pagePath)) {
                        pages.push(pagePath);
                    }
                });
            }
        });
    });
    
    return pages;
}

// 主执行函数
async function main() {
    console.log('🔍 分析四层页面中剩余的假名词汇...\n');
    
    const pages = findAllFourthLevelPages();
    const kanaFrequency = new Map(); // 词汇 -> 出现次数
    const kanaFiles = new Map(); // 词汇 -> 包含的文件列表
    
    let processedCount = 0;
    
    for (const pagePath of pages) {
        processedCount++;
        process.stdout.write(`\r扫描进度: ${processedCount}/${pages.length} (${Math.round(processedCount/pages.length*100)}%)`);
        
        try {
            const content = fs.readFileSync(pagePath, 'utf8');
            const detection = detectKana(content);
            
            if (detection.hasKana) {
                detection.kanaWords.forEach(word => {
                    // 过滤掉一些不需要关注的内容
                    if (word.length > 1 && !word.match(/^[0-9\-:：～〜〒・。、]+$/)) {
                        const count = kanaFrequency.get(word) || 0;
                        kanaFrequency.set(word, count + 1);
                        
                        if (!kanaFiles.has(word)) {
                            kanaFiles.set(word, []);
                        }
                        if (!kanaFiles.get(word).includes(pagePath)) {
                            kanaFiles.get(word).push(pagePath);
                        }
                    }
                });
            }
        } catch (error) {
            console.log(`\n❌ 读取失败: ${pagePath} - ${error.message}`);
        }
    }
    
    console.log('\n\n📊 假名词汇频率分析结果：');
    console.log('============================');
    
    // 按频率排序
    const sortedKana = Array.from(kanaFrequency.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50); // 显示前50个
    
    console.log('\n🔥 高频假名词汇 (按出现次数排序):');
    console.log('================================');
    
    let highFreqCount = 0;
    sortedKana.forEach(([word, count], index) => {
        const files = kanaFiles.get(word);
        const fileCount = files.length;
        
        let priority = '';
        if (count >= 10) {
            priority = '🔥 高频';
            highFreqCount++;
        } else if (count >= 5) {
            priority = '⚠️  中频';  
        } else {
            priority = '⭕ 低频';
        }
        
        console.log(`${index + 1}. "${word}"`);
        console.log(`   ${priority} - 出现 ${count} 次，涉及 ${fileCount} 个页面`);
        
        // 显示前3个文件示例
        if (files.length > 0) {
            const exampleFiles = files.slice(0, 3).map(f => path.basename(path.dirname(f)));
            console.log(`   📍 主要页面: ${exampleFiles.join(', ')}${files.length > 3 ? '...' : ''}`);
        }
        console.log('');
    });
    
    console.log(`\n📈 统计摘要:`);
    console.log(`✅ 扫描页面: ${pages.length}个`);
    console.log(`🔤 发现假名词汇: ${kanaFrequency.size}个`);
    console.log(`🔥 高频词汇 (≥10次): ${highFreqCount}个`);
    
    console.log('\n🎯 可能需要翻译的高频假名词汇:');
    console.log('=====================================');
    
    // 专门列出可能需要翻译的高频假名
    const translationCandidates = sortedKana.filter(([word, count]) => {
        // 过滤条件：出现次数多且包含纯假名
        if (count < 5) return false;
        
        // 检查是否包含纯假名（平假名或片假名）
        const pureKanaRegex = /[\u3040-\u309F\u30A0-\u30FF]/;
        if (!pureKanaRegex.test(word)) return false;
        
        // 排除一些不需要翻译的词汇
        const skipWords = ['の', 'で', 'に', 'から', 'と', 'が', 'は', 'を', 'や', 'か', 
                          'まで', 'より', 'など', 'ほか', '駅', '町', '市', '区', '県', '都', 
                          '時', '分', '日', '月', '年', '〒', '※', 'TEL', 'HP'];
        if (skipWords.includes(word)) return false;
        
        return true;
    });
    
    if (translationCandidates.length > 0) {
        translationCandidates.forEach(([word, count], index) => {
            console.log(`${index + 1}. "${word}" - ${count}次`);
        });
    } else {
        console.log('未发现需要优先翻译的高频假名词汇');
    }
}

// 运行主函数
main().catch(console.error); 