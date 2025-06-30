const fs = require('fs');
const path = require('path');

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

// 检测中日文混合错误
function detectMixedLanguageErrors(content) {
    const errors = [];
    
    // 已知的混合语言错误模式
    const knownErrors = [
        /大会项目为过往の情報/g,
        /開催予定の大会详细信息将在确定后/g,
        /情報を更新/g,
        /開催予定の/g,
        /情報になります/g,
        /の情報/g,
    ];
    
    // 通用混合语言错误模式
    const mixedPatterns = [
        // 中文 + 日文假名/汉字
        /[\u4e00-\u9fff]+[\u3040-\u309F\u30A0-\u30FF]+/g,
        // 日文假名/汉字 + 中文  
        /[\u3040-\u309F\u30A0-\u30FF]+[\u4e00-\u9fff]*[\u4e00-\u9fff]+/g,
        // 中文词汇中包含日文特有词汇
        /详细信息将在确定后[\u3040-\u309F\u30A0-\u30FF]/g,
        /项目为过往[\u3040-\u309F\u30A0-\u30FF]/g,
    ];
    
    // 检查已知错误
    knownErrors.forEach(pattern => {
        const matches = Array.from(content.matchAll(pattern));
        matches.forEach(match => {
            errors.push({
                type: 'known_error',
                pattern: pattern.source,
                match: match[0],
                position: match.index
            });
        });
    });
    
    // 检查通用混合语言错误
    mixedPatterns.forEach((pattern, index) => {
        const matches = Array.from(content.matchAll(pattern));
        matches.forEach(match => {
            // 过滤掉一些正常的情况
            const text = match[0];
            
            // 跳过正常的日文地名等
            if (text.match(/^[\u4e00-\u9fff]+駅$/) || // XX駅
                text.match(/^[\u4e00-\u9fff]+市$/) || // XX市
                text.match(/^[\u4e00-\u9fff]+町$/) || // XX町
                text.match(/^[\u4e00-\u9fff]+区$/) || // XX区
                text.match(/^[\u4e00-\u9fff]+県$/) || // XX県
                text.length < 4) { // 太短的忽略
                return;
            }
            
            errors.push({
                type: 'mixed_language',
                pattern: `pattern_${index + 1}`,
                match: text,
                position: match.index
            });
        });
    });
    
    return errors;
}

// 获取错误上下文
function getContext(content, position, contextLength = 50) {
    const start = Math.max(0, position - contextLength);
    const end = Math.min(content.length, position + contextLength);
    const context = content.substring(start, end);
    return context.replace(/\n/g, ' ').trim();
}

// 主执行函数
async function main() {
    console.log('🔍 检查四层页面中的中日文混合错误...\n');
    
    const pages = findAllFourthLevelPages();
    console.log(`📁 发现 ${pages.length} 个四层页面\n`);
    
    let processedCount = 0;
    let totalErrors = 0;
    const errorSummary = new Map(); // 错误类型 -> 出现次数
    const errorFiles = []; // 包含错误的文件列表
    
    for (const pagePath of pages) {
        processedCount++;
        process.stdout.write(`\r检查进度: ${processedCount}/${pages.length} (${Math.round(processedCount/pages.length*100)}%)`);
        
        try {
            const content = fs.readFileSync(pagePath, 'utf8');
            const errors = detectMixedLanguageErrors(content);
            
            if (errors.length > 0) {
                totalErrors += errors.length;
                errorFiles.push({
                    file: pagePath,
                    errors: errors
                });
                
                errors.forEach(error => {
                    const key = error.match;
                    errorSummary.set(key, (errorSummary.get(key) || 0) + 1);
                });
            }
        } catch (error) {
            console.log(`\n❌ 读取失败: ${pagePath} - ${error.message}`);
        }
    }
    
    console.log('\n\n📊 中日文混合错误检查结果：');
    console.log('================================');
    
    if (totalErrors === 0) {
        console.log('✅ 恭喜！未发现中日文混合错误！');
        return;
    }
    
    console.log(`❌ 发现 ${totalErrors} 个混合语言错误，涉及 ${errorFiles.length} 个文件`);
    
    console.log('\n🔥 错误频率统计（按出现次数排序）：');
    console.log('=====================================');
    
    const sortedErrors = Array.from(errorSummary.entries())
        .sort((a, b) => b[1] - a[1]);
    
    sortedErrors.forEach(([errorText, count], index) => {
        console.log(`${index + 1}. "${errorText}" - 出现 ${count} 次`);
    });
    
    console.log('\n📋 详细错误列表：');
    console.log('================');
    
    let showCount = 0;
    for (const errorFile of errorFiles) {
        if (showCount >= 10) break; // 只显示前10个文件
        
        console.log(`\n📄 ${errorFile.file}:`);
        errorFile.errors.forEach(error => {
            const content = fs.readFileSync(errorFile.file, 'utf8');
            const context = getContext(content, error.position);
            console.log(`   ❌ "${error.match}"`);
            console.log(`      上下文: ...${context}...`);
        });
        showCount++;
    }
    
    if (errorFiles.length > 10) {
        console.log(`\n... 还有 ${errorFiles.length - 10} 个文件包含错误`);
    }
    
    console.log('\n🔧 建议修复方案：');
    console.log('================');
    
    // 提供具体的修复建议
    const fixSuggestions = {
        '大会项目为过往の情報': '大会项目为过往信息',
        '開催予定の大会详细信息将在确定后': '预定举办的大会详细信息确定后将公布',
        '情報を更新': '信息更新',
        '開催予定の': '预定举办的',
        '情報になります': '为相关信息',
        'の情報': '的信息'
    };
    
    Object.entries(fixSuggestions).forEach(([error, fix]) => {
        if (errorSummary.has(error)) {
            console.log(`"${error}" → "${fix}"`);
        }
    });
    
    console.log('\n⚠️  这些混合语言错误严重影响网站专业性，建议立即修复！');
}

// 运行主函数
main().catch(console.error); 