#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 只检测平假名和片假名，不包括汉字
const hiraganaRegex = /[\u3040-\u309F]/g;
const katakanaRegex = /[\u30A0-\u30FF]/g;

// 应该保留的日文内容（不需要修改）
const PRESERVE_PATTERNS = [
    /japaneseName\s*:\s*['"`].*?['"`]/g,
    /officialName\s*:\s*['"`].*?['"`]/g,
    /\/\/ 官方名称.*$/gm,
];

// 只修复平假名和片假名的翻译对照表
const KANA_TRANSLATION_MAP = {
    // 片假名翻译（保留常用的）
    'マリン': '海洋',
    'スタジアム': '体育场',
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
    'アクセス': '交通',
    'スポット': '地点',
    'スペクタクル': '壮观',
    'サマナイト': '夏夜',
    'ファン': '粉丝',
    'イベント': '活动',
    'エンタテインメント': '娱乐',
    'インフォメション': '信息',
    'センタ': '中心',
    'ジンギスカン': '烤羊肉',
    'メトロ': '地铁',
    'ロッテ': '乐天',
    'ファミリ': '家庭',
    'タイミング': '时机',
    'グルメ': '美食',
    'カニバル': '嘉年华',
    'チャレンジカップ': '挑战杯',
    'リニュアル': '更新',
    'シンクロ': '同步',
    'キロ': '公里',
    'メトル': '米',
    'ワイド': '宽屏',
    'シワルド': '海洋世界',
    'ノ': '之',
    'ヶ': '个',
    'ガ': '之',
    'ホ': '号',
    'リバサイドパク': '河畔公园',
    'キャンプ': '营地',
    'ビーチ': '海滩',
    'フェスタ': '节庆',
    'メッセ': '展览',
    'スポーツ': '体育',
    'ミュージカル': '音乐剧',
    'メートル': '米',
    'フェニックス': '凤凰',
    'スケール': '规模',
    'アニメクラシックス': '动画经典',
    'テマ': '主题',
    'スプレ': '喷雾',
    'レション': '反射',
    'ゲト': '门',
    
    // 平假名翻译（只修复常见的助词和语尾）
    'の': '的',
    'を': '',
    'が': '',
    'に': '在',
    'で': '在',
    'と': '和',
    'は': '是',
    'も': '也',
    'から': '从',
    'まで': '到',
    'へ': '向',
    'や': '和',
    'か': '吗',
    'ね': '',
    'よ': '',
    'だ': '',
    'です': '',
    'ます': '',
    'した': '了',
    'して': '',
    'ある': '有',
    'いる': '在',
    'する': '做',
    'なる': '成为',
    
    // 常见的短平假名（修复明显的错误）
    'い': '',
    'し': '',
    'る': '',
    'わ': '',
    'け': '',
    'げ': '',
    'て': '',
    'た': '',
    'ち': '',
    'つ': '',
    'さ': '',
    'す': '',
    'せ': '',
    'そ': '',
    'な': '',
    'ぬ': '',
    'ね': '',
    'ふ': '',
    'ほ': '',
    'へ': '',
    'ひ': '',
    'む': '',
    'め': '',
    'ま': '',
    'ゆ': '',
    'よ': '',
    'え': '',
    'お': '',
    'あ': '',
    'ん': '',
    'り': '',
    'ら': '',
    'れ': '',
    'ろ': '',
    'み': '',
    'く': '',
    'こ': '',
    'う': '',
    
    // 完整的平假名单词（保留有意义的）
    'どころ': '地方',
    'ところ': '地方',
    'まま': '保持',
    'だけ': '只',
    'でも': '但是',
    'また': '又',
    'もし': '如果',
    'きっと': '一定',
    'たぶん': '可能',
    'やはり': '果然',
    'ついに': '终于',
    'はやく': '快点',
    'ゆっくり': '慢慢',
    'しっかり': '好好',
    'はっきり': '清楚',
    'ちょっと': '一点',
    'とても': '非常',
    'すごく': '非常',
    'たくさん': '很多',
    'みんな': '大家',
    'いつも': '总是',
    'ときどき': '有时',
    
    // 地名相关的平假名
    'おおあみしらさ': '大网白里',
    'たまむら': '玉村',
    'ぎおん': '祇园',
    'しな': '信浓',
    'ひたちなか': '常陆那珂',
    'とりで': '取手',
    'あしかが': '足利',
    'まえばし': '前桥',
    'たかさき': '高崎',
    'うつのみや': '宇都宫',
    'にっこう': '日光',
    'きりゅう': '桐生'
};

function isInPreservedPattern(line, lineNumber) {
    for (const pattern of PRESERVE_PATTERNS) {
        pattern.lastIndex = 0; // 重置正则状态
        if (pattern.test(line)) {
            return true;
        }
    }
    return false;
}

function fixKanaCharacters(content, filePath) {
    const lines = content.split('\n');
    let fixedLines = [];
    let fixCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const lineNumber = i + 1;
        
        // 跳过应该保留的行
        if (isInPreservedPattern(line, lineNumber)) {
            fixedLines.push(line);
            continue;
        }
        
        let originalLine = line;
        
        // 应用假名翻译映射
        for (const [kana, chinese] of Object.entries(KANA_TRANSLATION_MAP)) {
            const regex = new RegExp(kana.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            line = line.replace(regex, chinese);
        }
        
        // 移除多余的空格
        line = line.replace(/\s{2,}/g, ' ');
        
        if (line !== originalLine) {
            fixCount++;
        }
        
        fixedLines.push(line);
    }
    
    return {
        content: fixedLines.join('\n'),
        fixCount: fixCount
    };
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const result = fixKanaCharacters(content, filePath);
        
        if (result.fixCount > 0) {
            fs.writeFileSync(filePath, result.content, 'utf8');
            console.log(`✅ 修复 ${filePath}: ${result.fixCount} 个假名问题`);
        }
        
        return result.fixCount;
    } catch (error) {
        console.error(`❌ 处理文件 ${filePath} 时出错:`, error.message);
        return 0;
    }
}

function processDirectory(dir) {
    let totalFixes = 0;
    let processedFiles = 0;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const filePath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            const subResult = processDirectory(filePath);
            totalFixes += subResult.totalFixes;
            processedFiles += subResult.processedFiles;
        } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
            totalFixes += processFile(filePath);
            processedFiles++;
        }
    }
    
    return { totalFixes, processedFiles };
}

function main() {
    console.log('🚀 启动宽松假名字符修复（保留汉字）...\n');
    
    const srcDir = path.join(process.cwd(), 'src');
    const result = processDirectory(srcDir);
    
    console.log('\n📊 修复完成！');
    console.log(`✅ 处理文件: ${result.processedFiles} 个`);
    console.log(`🔧 修复假名: ${result.totalFixes} 个`);
    
    if (result.totalFixes > 0) {
        console.log('\n🎉 平假名和片假名问题已修复！汉字已保留。');
    } else {
        console.log('\n✨ 没有发现需要修复的假名问题。');
    }
}

if (require.main === module) {
    main();
} 