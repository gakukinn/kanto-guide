#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 日文字符检测正则
const hiraganaRegex = /[\u3040-\u309F]/g;
const katakanaRegex = /[\u30A0-\u30FF]/g;

// 应该保留的日文内容（不需要修改）
const PRESERVE_PATTERNS = [
    /japaneseName\s*:\s*['"`].*?['"`]/g,
    /officialName\s*:\s*['"`].*?['"`]/g,
    /\/\/ 官方名称.*$/gm,
    /venue\s*:\s*['"`].*?['"`]/g, // 会场名称可能包含官方日文
];

// 常用翻译对照表
const TRANSLATION_MAP = {
    // 中点符号
    '・': '、',
    
    // 常用片假名
    'マリーンズ': '海洋队',
    'スターマイン': '连发花火',
    'プロムナード': '步行道',
    'サマーカーニバル': '夏季嘉年华',
    'ナイトフラワーズ': '夜间花火',
    'シンフォニア': '交响曲',
    'コスモワールド': '宇宙世界',
    'メイン': '主要',
    'バス': '巴士',
    'エリア': '区域',
    'スペース': '空间',
    'パーキング': '停车',
    'ミュージック': '音乐',
    'ファーム': '农场',
    'マザー': '母亲',
    'フィナーレ': '终章',
    'カムロ': '金毛',
    'アクセス': '交通',
    'スポット': '地点',
    'レジャーシート': '野餐垫',
    'トイレ': '厕所',
    'カメラ': '相机',
    'チケット': '票券',
    'ホームラン': '全垒打',
    'スタジアム': '体育场',
    'グッズ': '商品',
    'ルール': '规则',
    'ラッシュ': '高峰',
    'エンターテイメント': '娱乐',
    'ライブ': '现场',
    'コラボ': '合作',
    'ダブル': '双重',
    'カジュアル': '休闲',
    'リラックス': '放松',
    'ロマンチック': '浪漫',
    'パノラマ': '全景',
    'ビュー': '景观',
    'ロケーション': '地点',
    'プログラム': '节目',
    'コンパクト': '紧凑',
    'ハイライト': '亮点',
    'セット': '套装',
    'コンベンション': '会议',
    'ウォーターガーデン': '水上花园',
    'プール': '游泳池',
    'シーサイドライン': '海滨线',
    
    // 常用平假名和助词
    'まつり': '祭典',
    'の': '的',
    'を': '',  // 助词删除
    'に': '',  // 大部分情况下删除
    'が': '',  // 助词删除
    'で': '',  // 大部分情况下删除
    'から': '从',
    'まで': '到',
    'より': '比',
    'へ': '到',
    'と': '和',
    'や': '和',
    'ぶり': '年来',
    'すぐ': '立即',
    'やや': '稍微',
    'なし': '无',
    'あり': '有',
    'ため': '因为',
    'なので': '所以',
    'について': '关于',
    'において': '在',
    'により': '通过',
    'として': '作为',
    'による': '由于',
    'という': '称为',
    'といった': '等',
    'れる': '',
    'られる': '',
    'する': '',
    'した': '',
    'して': '',
    'しい': '',
    'しく': '',
    'ない': '',
    'なる': '',
    'なり': '',
    'ける': '',
    'める': '',
    'てる': '',
    'ている': '',
    'てい': '',
    'ます': '',
    'です': '',
    'である': '',
    'だ': '',
    'じ': '',
    'ず': '',
    'ぞ': '',
    'ば': '',
    'び': '',
    'ぼ': '',
    'ぱ': '',
    'ぴ': '',
    'ぷ': '',
    'ぺ': '',
    'ぽ': '',
    'っ': '',
    'ー': '',
};

    // 需要特殊处理的模式  
    const SPECIAL_PATTERNS = {
        // 地名连接
        '市・': '市、',
        '町・': '町、',
        '県・': '县、',
        '区・': '区、',
        '駅・': '站、',
        
        // 保留专有名词不翻译
        'MARINES': 'MARINES',  // 千叶罗德队
        'みなとみらい': '港未来',  // 横滨地名
    
    // 日期连接
    '日・': '日、',
    '月・': '月、',
    
    // 时间连接  
    '時・': '时、',
    '分・': '分、',
    
    // 天气条件
    '雨天・': '雨天、',
    '荒天・': '恶劣天气、',
    '強風・': '强风、',
    '高波・': '高浪、',
};

function shouldPreserveContent(line) {
    return PRESERVE_PATTERNS.some(pattern => pattern.test(line));
}

function smartTranslate(text) {
    let result = text;
    
    // 先处理特殊模式
    for (const [japanese, chinese] of Object.entries(SPECIAL_PATTERNS)) {
        result = result.replace(new RegExp(japanese, 'g'), chinese);
    }
    
    // 再处理一般翻译
    for (const [japanese, chinese] of Object.entries(TRANSLATION_MAP)) {
        result = result.replace(new RegExp(japanese, 'g'), chinese);
    }
    
    return result;
}

function analyzeFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const issues = [];
        
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            
            // 跳过应该保留的内容
            if (shouldPreserveContent(line)) {
                return;
            }
            
            // 检测日文字符
            const hiragana = line.match(hiraganaRegex);
            const katakana = line.match(katakanaRegex);
            
            if (hiragana || katakana) {
                const originalLine = line.trim();
                const translatedLine = smartTranslate(originalLine);
                
                if (originalLine !== translatedLine) {
                    issues.push({
                        line: lineNumber,
                        original: originalLine,
                        translated: translatedLine,
                        japanese: [...(hiragana || []), ...(katakana || [])]
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

function previewFixes(targetDir = './src/data') {
    console.log('🔍 智能日文字符修复预览...\n');
    
    const files = fs.readdirSync(targetDir)
        .filter(file => file.endsWith('.ts'))
        .map(file => path.join(targetDir, file));
    
    let totalFiles = 0;
    let totalIssues = 0;
    
    for (const filePath of files) {
        const issues = analyzeFile(filePath);
        
        if (issues.length > 0) {
            totalFiles++;
            totalIssues += issues.length;
            
            console.log(`📄 ${path.relative(process.cwd(), filePath)} (${issues.length}个问题):`);
            
            // 只显示前5个问题作为预览
            issues.slice(0, 5).forEach(issue => {
                console.log(`   第${issue.line}行:`);
                console.log(`   原文: ${issue.original}`);
                console.log(`   修复: ${issue.translated}`);
                console.log(`   日文: ${issue.japanese.join(', ')}`);
                console.log('');
            });
            
            if (issues.length > 5) {
                console.log(`   ... 还有 ${issues.length - 5} 个问题\n`);
            }
        }
    }
    
    console.log(`📊 预览统计:`);
    console.log(`   需要修复的文件: ${totalFiles}`);
    console.log(`   总问题数: ${totalIssues}`);
    
    return { totalFiles, totalIssues };
}

function applyFixes(targetDir = './src/data', dryRun = true) {
    console.log(dryRun ? '🧪 干运行模式 - 不会实际修改文件' : '✏️ 开始应用修复...');
    
    const files = fs.readdirSync(targetDir)
        .filter(file => file.endsWith('.ts'))
        .map(file => path.join(targetDir, file));
    
    let fixedFiles = 0;
    let totalFixes = 0;
    
    for (const filePath of files) {
        const issues = analyzeFile(filePath);
        
        if (issues.length > 0) {
            console.log(`🔧 修复 ${path.relative(process.cwd(), filePath)}...`);
            
            if (!dryRun) {
                let content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n');
                
                // 应用修复
                issues.forEach(issue => {
                    const lineIndex = issue.line - 1;
                    if (lines[lineIndex] && lines[lineIndex].trim() === issue.original) {
                        lines[lineIndex] = lines[lineIndex].replace(issue.original, issue.translated);
                    }
                });
                
                fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            }
            
            fixedFiles++;
            totalFixes += issues.length;
            console.log(`   修复了 ${issues.length} 个问题`);
        }
    }
    
    console.log(`\n📊 修复统计:`);
    console.log(`   修复的文件: ${fixedFiles}`);
    console.log(`   总修复数: ${totalFixes}`);
    
    if (dryRun) {
        console.log('\n💡 要应用修复，请运行: node scripts/smart-japanese-fixer.js --apply');
    }
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--preview') || args.length === 0) {
        previewFixes();
    } else if (args.includes('--apply')) {
        console.log('⚠️  即将应用修复，建议先创建备份！');
        console.log('按 Ctrl+C 取消，或等待5秒自动开始...');
        
        setTimeout(() => {
            applyFixes('./src/data', false);
        }, 5000);
    } else if (args.includes('--dry-run')) {
        applyFixes('./src/data', true);
    } else {
        console.log('使用方法:');
        console.log('  node scripts/smart-japanese-fixer.js --preview   # 预览修复');
        console.log('  node scripts/smart-japanese-fixer.js --dry-run   # 干运行');
        console.log('  node scripts/smart-japanese-fixer.js --apply     # 应用修复');
    }
}

if (require.main === module) {
    main();
} 