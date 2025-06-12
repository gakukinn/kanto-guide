#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 日文字符检测正则
const hiraganaRegex = /[\u3040-\u309F]/;
const katakanaRegex = /[\u30A0-\u30FF]/;
const kanjiRegex = /[\u4E00-\u9FAF]/;

function containsJapanese(text) {
    return hiraganaRegex.test(text) || katakanaRegex.test(text);
}

function findJapaneseInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const issues = [];
        
        lines.forEach((line, index) => {
            if (containsJapanese(line)) {
                // 排除注释中的官方名称保留（japaneseName字段）
                if (!line.includes('japaneseName:') && 
                    !line.includes('officialName:') && 
                    !line.includes('// 官方名称')) {
                    issues.push({
                        line: index + 1,
                        content: line.trim(),
                        japanese: line.match(/[\u3040-\u309F\u30A0-\u30FF]+/g)
                    });
                }
            }
        });
        
        return issues;
    } catch (error) {
        console.error(`❌ 读取文件失败: ${filePath} - ${error.message}`);
        return [];
    }
}

function scanDirectory(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
    const results = [];
    
    function scan(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            
            if (entry.isDirectory() && !entry.name.startsWith('.') && 
                entry.name !== 'node_modules' && entry.name !== 'temp-duplicate-files') {
                scan(fullPath);
            } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
                const issues = findJapaneseInFile(fullPath);
                if (issues.length > 0) {
                    results.push({
                        file: path.relative(process.cwd(), fullPath),
                        issues: issues
                    });
                }
            }
        }
    }
    
    scan(dir);
    return results;
}

function main() {
    console.log('🔍 检查项目中的日文字符...\n');
    
    const srcResults = scanDirectory('./src');
    const dataResults = scanDirectory('./src/data');
    
    const allResults = [...srcResults, ...dataResults];
    
    if (allResults.length === 0) {
        console.log('✅ 没有发现违规的日文字符！');
        return;
    }
    
    console.log(`🚫 发现 ${allResults.length} 个文件包含日文字符:\n`);
    
    allResults.forEach(result => {
        console.log(`📄 ${result.file}:`);
        result.issues.forEach(issue => {
            console.log(`   第${issue.line}行: ${issue.content}`);
            console.log(`   日文字符: ${issue.japanese?.join(', ')}`);
        });
        console.log('');
    });
    
    // 输出修复建议
    console.log('💡 修复建议:');
    console.log('1. 将所有日文字符替换为对应的中文');
    console.log('2. 保留 japaneseName 和 officialName 字段中的官方名称');
    console.log('3. 注释中的日文也需要改为中文');
    console.log('4. 使用项目的翻译对照表进行标准化翻译');
    
    process.exit(1);
}

if (require.main === module) {
    main();
} 