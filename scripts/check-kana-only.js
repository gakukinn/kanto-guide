#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 只检测平假名和片假名，不包括汉字
const hiraganaRegex = /[\u3040-\u309F]/;
const katakanaRegex = /[\u30A0-\u30FF]/;

function containsKana(text) {
    return hiraganaRegex.test(text) || katakanaRegex.test(text);
}

function findKanaInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const issues = [];
        
        lines.forEach((line, index) => {
            if (containsKana(line)) {
                // 排除注释中的官方名称保留（japaneseName字段）
                if (!line.includes('japaneseName:') && 
                    !line.includes('officialName:') && 
                    !line.includes('// 官方名称')) {
                    
                    // 提取假名字符
                    const kanaMatches = [];
                    const hiraganaMatches = line.match(/[\u3040-\u309F]/g);
                    const katakanaMatches = line.match(/[\u30A0-\u30FF]/g);
                    
                    if (hiraganaMatches) kanaMatches.push(...hiraganaMatches);
                    if (katakanaMatches) kanaMatches.push(...katakanaMatches);
                    
                    if (kanaMatches.length > 0) {
                        issues.push({
                            line: index + 1,
                            content: line.trim(),
                            kana: [...new Set(kanaMatches)].join(', ')
                        });
                    }
                }
            }
        });
        
        return issues;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return [];
    }
}

function checkDirectory(dir) {
    let totalIssues = 0;
    let filesWithIssues = 0;
    const problematicFiles = [];
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const filePath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            const subResult = checkDirectory(filePath);
            totalIssues += subResult.totalIssues;
            filesWithIssues += subResult.filesWithIssues;
            problematicFiles.push(...subResult.problematicFiles);
        } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
            const issues = findKanaInFile(filePath);
            
            if (issues.length > 0) {
                filesWithIssues++;
                totalIssues += issues.length;
                problematicFiles.push({
                    file: filePath,
                    issues: issues
                });
            }
        }
    }
    
    return { totalIssues, filesWithIssues, problematicFiles };
}

function main() {
    console.log('🔍 检查项目中的假名字符（平假名+片假名，排除汉字）...\n');
    
    const srcDir = path.join(process.cwd(), 'src');
    const result = checkDirectory(srcDir);
    
    if (result.filesWithIssues > 0) {
        console.log(`🚫 发现 ${result.filesWithIssues} 个文件包含假名字符:\n`);
        
        result.problematicFiles.slice(0, 10).forEach(file => {
            const relativePath = path.relative(process.cwd(), file.file);
            console.log(`📄 ${relativePath}:`);
            
            file.issues.slice(0, 5).forEach(issue => {
                console.log(`   第${issue.line}行: ${issue.content}`);
                console.log(`   假名字符: ${issue.kana}`);
            });
            
            if (file.issues.length > 5) {
                console.log(`   ... 还有 ${file.issues.length - 5} 行含有假名字符`);
            }
            console.log('');
        });
        
        if (result.problematicFiles.length > 10) {
            console.log(`... 还有 ${result.problematicFiles.length - 10} 个文件含有假名字符\n`);
        }
        
        console.log(`📊 总计: ${result.filesWithIssues} 个文件, ${result.totalIssues} 个假名问题`);
        console.log('\n💡 修复建议:');
        console.log('1. 运行 node scripts/relaxed-japanese-fixer.js 进行宽松修复');
        console.log('2. 只修复平假名和片假名，保留汉字');
        console.log('3. 保留 japaneseName 和 officialName 字段中的官方名称');
    } else {
        console.log('✅ 没有发现假名字符问题！所有汉字已被保留。');
    }
}

if (require.main === module) {
    main();
} 