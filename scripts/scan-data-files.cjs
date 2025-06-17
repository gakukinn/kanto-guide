const fs = require('fs');
const path = require('path');
const { isHiragana, isKatakana, toHiragana, toKatakana } = require('wanakana');

// 扫描数据文件中的日文字符
function scanDataFiles() {
  console.log('🔍 扫描数据文件中的日文字符...\n');

  const dataDir = 'src/data';
  const files = fs
    .readdirSync(dataDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => path.join(dataDir, file));

  console.log(`发现 ${files.length} 个数据文件\n`);

  let totalChars = 0;
  let filesWithJapanese = 0;
  const allFindings = [];

  files.forEach((filePath, index) => {
    console.log(`📄 [${index + 1}/${files.length}] ${filePath}`);
    console.log('='.repeat(60));

    const content = fs.readFileSync(filePath, 'utf8');
    const japaneseChars = scanJapaneseInContent(content);

    if (japaneseChars.length === 0) {
      console.log('✅ 没有发现需要翻译的日文字符');
    } else {
      filesWithJapanese++;
      console.log(`发现 ${japaneseChars.length} 个日文字符：`);

      japaneseChars.slice(0, 10).forEach((item, i) => {
        totalChars++;
        const type = item.isHiragana
          ? '平假名'
          : item.isKatakana
            ? '片假名'
            : '其他';
        console.log(
          `  ${i + 1}. "${item.char}" (${type}) - 第${item.lineNumber}行`
        );
        console.log(`     内容: ${item.lineContent}`);

        allFindings.push({
          file: filePath,
          char: item.char,
          type: type,
          lineNumber: item.lineNumber,
          lineContent: item.lineContent,
          context: item.context,
        });
      });

      if (japaneseChars.length > 10) {
        console.log(`     ... 还有 ${japaneseChars.length - 10} 个字符未显示`);
        totalChars += japaneseChars.length - 10;
      }
    }
    console.log('');
  });

  // 统计报告
  console.log('='.repeat(80));
  console.log('📊 数据文件扫描报告');
  console.log('='.repeat(80));
  console.log(`总文件数: ${files.length}`);
  console.log(`包含日文的文件数: ${filesWithJapanese}`);
  console.log(`发现日文字符数: ${totalChars}`);
  console.log('');

  if (totalChars > 0) {
    console.log('💡 需要翻译的字符串示例：');

    // 找出完整的日文字符串
    const strings = extractJapaneseStrings(allFindings);
    strings.slice(0, 20).forEach((str, index) => {
      console.log(`${index + 1}. "${str.original}" → 需要翻译`);
      console.log(`   文件: ${str.file.replace('src/data/', '')}`);
      console.log(`   行号: ${str.lineNumber}`);
    });

    if (strings.length > 20) {
      console.log(`   ... 还有 ${strings.length - 20} 个字符串`);
    }
  }

  console.log('\n✨ 数据文件扫描完成！');
  return allFindings;
}

// 扫描内容中的日文字符
function scanJapaneseInContent(content) {
  const japaneseChars = [];
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F・]/g;
  let match;

  while ((match = japaneseRegex.exec(content)) !== null) {
    const char = match[0];
    const index = match.index;

    // 跳过_sourceData中的字符
    const beforeContext = content.substring(Math.max(0, index - 100), index);
    if (
      beforeContext.includes('_sourceData') ||
      beforeContext.includes('japaneseName') ||
      beforeContext.includes('japaneseDescription')
    ) {
      continue;
    }

    // 获取行号
    const lines = content.substring(0, index).split('\n');
    const lineNumber = lines.length;
    const lineContent = content.split('\n')[lineNumber - 1];

    japaneseChars.push({
      char,
      index,
      lineNumber,
      lineContent: lineContent.trim(),
      isHiragana: isHiragana(char),
      isKatakana: isKatakana(char),
      context: content.substring(
        Math.max(0, index - 30),
        Math.min(content.length, index + 30)
      ),
    });
  }

  return japaneseChars;
}

// 提取完整的日文字符串
function extractJapaneseStrings(findings) {
  const strings = [];
  const processed = new Set();

  findings.forEach(finding => {
    const key = `${finding.file}:${finding.lineNumber}`;
    if (processed.has(key)) return;
    processed.add(key);

    // 提取该行中的所有日文字符串
    const line = finding.lineContent;
    const japaneseStringsInLine =
      line.match(/[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F・]+/g) || [];

    japaneseStringsInLine.forEach(str => {
      if (str.length > 1) {
        // 只要长度大于1的字符串
        strings.push({
          original: str,
          file: finding.file,
          lineNumber: finding.lineNumber,
          lineContent: line,
        });
      }
    });
  });

  // 去重
  const uniqueStrings = strings.filter(
    (str, index, self) =>
      index === self.findIndex(s => s.original === str.original)
  );

  return uniqueStrings.sort((a, b) => b.original.length - a.original.length);
}

// 运行扫描
if (require.main === module) {
  scanDataFiles();
}

module.exports = { scanDataFiles };
