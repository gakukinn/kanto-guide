/**
 * 花火数据日期格式标准化工具
 * 将所有日期格式统一为ISO格式（YYYY-MM-DD）用于筛选器兼容
 * 同时添加displayDate字段用于用户友好显示
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 日期格式转换函数
function standardizeDate(dateStr) {
  // 移除多余空格和特殊字符
  const cleanDate = dateStr.trim();

  // 各种日期格式的正则表达式和转换规则
  const datePatterns = [
    // 标准ISO格式：2025-08-02
    {
      pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      converter: match => {
        const [, year, month, day] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 中文格式：2025年8月2日
    {
      pattern: /^(\d{4})年(\d{1,2})月(\d{1,2})日$/,
      converter: match => {
        const [, year, month, day] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 带星期的格式：2025年8月2日(土)
    {
      pattern: /^(\d{4})年(\d{1,2})月(\d{1,2})日\([月火水木金土日]\)$/,
      converter: match => {
        const [, year, month, day] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // ISO+星期格式：2025-08-02(土)
    {
      pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})\([月火水木金土日]\)$/,
      converter: match => {
        const [, year, month, day] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 简化月日格式：8月2日
    {
      pattern: /^(\d{1,2})月(\d{1,2})日$/,
      converter: match => {
        const [, month, day] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 简化月日+星期格式：9月13日(土)
    {
      pattern: /^(\d{1,2})月(\d{1,2})日\([月火水木金土日]\)$/,
      converter: match => {
        const [, month, day] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 日期范围格式：9月13日・14日
    {
      pattern: /^(\d{1,2})月(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, month, day1, day2] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day1)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },

    // 复杂多日期格式：9月13日・14日・20日・21日
    {
      pattern:
        /^(\d{1,2})月(\d{1,2})日・(\d{1,2})日・(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, month, day1, day2, day3, day4] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day1)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日・${parseInt(day3)}日・${parseInt(day4)}日`,
        };
      },
    },

    // 年月日范围格式：2025年9月12日・13日
    {
      pattern: /^(\d{4})年(\d{1,2})月(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, year, month, day1, day2] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day1)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },

    // ISO格式多日期：2025-09-14・21日
    {
      pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})・(\d{1,2})日$/,
      converter: match => {
        const [, year, month, day1, day2] = match;
        return {
          date: `${year}年${parseInt(month)}月${parseInt(day1)}日`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },

    // 带星期的月日格式：9月27日(土)
    {
      pattern: /^(\d{1,2})月(\d{1,2})日\([月火水木金土日]\)$/,
      converter: match => {
        const [, month, day] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 复杂跨月格式：9月6日・14日
    {
      pattern: /^(\d{1,2})月(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, month, day1, day2] = match;
        return {
          date: `2025年${parseInt(month)}月${parseInt(day1)}日`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },
  ];

  // 处理复杂的多日期格式：8月2日、9日、16日、23日、30日
  if (cleanDate.includes('、')) {
    const parts = cleanDate.split('、');
    const firstPart = parts[0];

    // 提取第一个日期的月份
    const monthMatch = firstPart.match(/(\d{1,2})月(\d{1,2})日/);
    if (monthMatch) {
      const [, month] = monthMatch;
      const dates = [];
      const displayParts = [];

      parts.forEach(part => {
        const dayMatch =
          part.match(/(\d{1,2})日$/) || part.match(/(\d{1,2})月(\d{1,2})日$/);
        if (dayMatch) {
          const day = dayMatch[dayMatch.length - 1]; // 取最后一个匹配组
          dates.push(`2025年${parseInt(month)}月${parseInt(day)}日`);
          displayParts.push(`${parseInt(day)}日`);
        }
      });

      return {
        date: dates[0], // 主要日期为第一个
        dates: dates, // 所有日期数组
        displayDate: `2025年${parseInt(month)}月${displayParts.join('、')}`,
      };
    }
  }

  // 处理超复杂格式：2025-09-06・13日・20日・27日（预选）、10月26日（决赛）
  if (cleanDate.includes('・') && cleanDate.includes('（')) {
    // 提取第一个有效日期
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      return {
        date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        displayDate: cleanDate, // 保持原有复杂格式作为显示
      };
    }
  }

  // 处理特殊跨月格式：2025-07-19、20日、26日、8月2日、9日、10日、16日、23日、9月13日、14日
  if (cleanDate.includes('、') && cleanDate.includes('月')) {
    // 提取第一个有效日期
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      return {
        date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        displayDate: cleanDate, // 保持原有复杂格式作为显示
      };
    }
  }

  // 处理特殊说明格式：2025-07-19(土)、20日(日)
  if (cleanDate.includes('(')) {
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      return {
        date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        displayDate: cleanDate, // 保持原有格式作为显示
      };
    }
  }

  // 处理期间格式：2025-07-11(金)～8月11日(祝)的特定日
  if (cleanDate.includes('～') || cleanDate.includes('~')) {
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      return {
        date: `${year}年${parseInt(month)}月${parseInt(day)}日`,
        displayDate: cleanDate, // 保持原有格式作为显示
      };
    }
  }

  // 处理连续日期：2025年8月2日、3日
  if (cleanDate.includes('、') && cleanDate.includes('年')) {
    const yearMatch = cleanDate.match(/(\d{4})年(\d{1,2})月/);
    if (yearMatch) {
      const [, year, month] = yearMatch;
      const dayMatches = cleanDate.match(/(\d{1,2})日/g);
      if (dayMatches) {
        const dates = dayMatches.map(dayStr => {
          const day = dayStr.replace('日', '');
          return `${year}年${parseInt(month)}月${parseInt(day)}日`;
        });

        return {
          date: dates[0],
          dates: dates,
          displayDate: cleanDate,
        };
      }
    }
  }

  // 单个日期格式转换
  for (const { pattern, converter } of datePatterns) {
    const match = cleanDate.match(pattern);
    if (match) {
      return converter(match);
    }
  }

  // 如果无法转换，返回原格式
  console.warn(`无法转换日期格式: ${dateStr}`);
  return {
    date: cleanDate,
    displayDate: cleanDate,
  };
}

// 处理单个文件
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // 查找日期字段
    const dateRegex = /date:\s*["'`]([^"'`]+)["'`]/;
    const match = content.match(dateRegex);

    if (match) {
      const originalDate = match[1];
      const standardized = standardizeDate(originalDate);

      // 只有当格式发生变化时才更新
      if (standardized.date !== originalDate) {
        let newContent = content;

        // 替换date字段
        newContent = newContent.replace(
          dateRegex,
          `date: "${standardized.date}"`
        );

        // 在date字段后添加displayDate字段（如果不存在）
        if (!content.includes('displayDate:')) {
          newContent = newContent.replace(
            /date:\s*["'`][^"'`]+["'`]/,
            `$&,\n  displayDate: "${standardized.displayDate}"`
          );
        }

        // 如果有多个日期，添加dates数组
        if (standardized.dates && standardized.dates.length > 1) {
          const datesArray = `["${standardized.dates.join('", "')}"]`;
          if (!content.includes('dates:')) {
            newContent = newContent.replace(
              /displayDate:\s*["'`][^"'`]+["'`]/,
              `$&,\n  dates: ${datesArray}`
            );
          }
        }

        fs.writeFileSync(filePath, newContent, 'utf8');

        console.log(
          `✅ ${path.basename(filePath)}: ${originalDate} → ${
            standardized.date
          }`
        );
        if (standardized.displayDate !== standardized.date) {
          console.log(`   显示格式: ${standardized.displayDate}`);
        }

        return {
          updated: true,
          file: filePath,
          from: originalDate,
          to: standardized.date,
        };
      }
    }

    return { updated: false, file: filePath };
  } catch (error) {
    console.error(`❌ 处理文件失败 ${filePath}:`, error.message);
    return { updated: false, file: filePath, error: error.message };
  }
}

// 主函数
async function main() {
  console.log('🚀 开始花火数据日期格式标准化...\n');

  // 查找所有花火数据文件
  const dataFiles = glob.sync('src/data/level5-*-hanabi*.ts');

  if (dataFiles.length === 0) {
    console.log('❌ 未找到花火数据文件');
    return;
  }

  console.log(`📊 找到 ${dataFiles.length} 个花火数据文件\n`);

  const results = {
    total: dataFiles.length,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  // 处理每个文件
  for (const file of dataFiles) {
    const result = processFile(file);

    if (result.error) {
      results.errors++;
    } else if (result.updated) {
      results.updated++;
    } else {
      results.skipped++;
    }
  }

  // 输出统计结果
  console.log('\n📈 处理完成统计:');
  console.log(`总文件数: ${results.total}`);
  console.log(`✅ 已更新: ${results.updated}`);
  console.log(`⏭️  无需更新: ${results.skipped}`);
  console.log(`❌ 错误: ${results.errors}`);

  if (results.updated > 0) {
    console.log('\n✨ 日期格式标准化完成！');
    console.log('💡 建议运行验证命令检查结果：');
    console.log('   npm run validate-japanese');
  }
}

// 执行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { standardizeDate, processFile };
