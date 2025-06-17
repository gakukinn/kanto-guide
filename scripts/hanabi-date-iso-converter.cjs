/**
 * 花火数据日期格式ISO转换工具
 * 将复杂日期格式转换为标准ISO格式（YYYY-MM-DD）用于筛选器
 * 多日期转换为逗号分隔的格式：2025-09-13,2025-09-14
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 日期格式转换函数 - 转换为ISO格式
function convertToISO(dateStr) {
  // 移除多余空格和特殊字符
  const cleanDate = dateStr.trim();

  // 各种日期格式的正则表达式和转换规则
  const datePatterns = [
    // 标准ISO格式：2025-08-02 (已经是ISO格式)
    {
      pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      converter: match => {
        const [, year, month, day] = match;
        return {
          date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
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
          date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
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
          date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
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
          date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
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
          date: `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
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
          date: `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
          displayDate: `2025年${parseInt(month)}月${parseInt(day)}日`,
        };
      },
    },

    // 日期范围格式：9月13日・14日
    {
      pattern: /^(\d{1,2})月(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, month, day1, day2] = match;
        const date1 = `2025-${month.padStart(2, '0')}-${day1.padStart(2, '0')}`;
        const date2 = `2025-${month.padStart(2, '0')}-${day2.padStart(2, '0')}`;
        return {
          date: `${date1},${date2}`,
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
        const dates = [day1, day2, day3, day4].map(
          day => `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
        return {
          date: dates.join(','),
          displayDate: `2025年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日・${parseInt(day3)}日・${parseInt(day4)}日`,
        };
      },
    },

    // 年月日范围格式：2025年9月12日・13日
    {
      pattern: /^(\d{4})年(\d{1,2})月(\d{1,2})日・(\d{1,2})日$/,
      converter: match => {
        const [, year, month, day1, day2] = match;
        const date1 = `${year}-${month.padStart(2, '0')}-${day1.padStart(2, '0')}`;
        const date2 = `${year}-${month.padStart(2, '0')}-${day2.padStart(2, '0')}`;
        return {
          date: `${date1},${date2}`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },

    // ISO格式多日期：2025-09-14・21日
    {
      pattern: /^(\d{4})-(\d{1,2})-(\d{1,2})・(\d{1,2})日$/,
      converter: match => {
        const [, year, month, day1, day2] = match;
        const date1 = `${year}-${month.padStart(2, '0')}-${day1.padStart(2, '0')}`;
        const date2 = `${year}-${month.padStart(2, '0')}-${day2.padStart(2, '0')}`;
        return {
          date: `${date1},${date2}`,
          displayDate: `${year}年${parseInt(month)}月${parseInt(day1)}日・${parseInt(day2)}日`,
        };
      },
    },
  ];

  // 处理超复杂格式：2025-09-06・13日・20日・27日（预选）、10月26日（决赛）
  if (cleanDate.includes('・') && cleanDate.includes('（')) {
    // 提取所有日期
    const dates = [];

    // 提取第一个完整日期
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      dates.push(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);

      // 提取同月其他日期
      const otherDays = cleanDate.match(/・(\d{1,2})日/g);
      if (otherDays) {
        otherDays.forEach(dayStr => {
          const day = dayStr.replace('・', '').replace('日', '');
          dates.push(
            `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
          );
        });
      }

      // 提取跨月日期
      const crossMonthMatch = cleanDate.match(/(\d{1,2})月(\d{1,2})日/);
      if (crossMonthMatch) {
        const [, crossMonth, crossDay] = crossMonthMatch;
        dates.push(
          `${year}-${crossMonth.padStart(2, '0')}-${crossDay.padStart(2, '0')}`
        );
      }
    }

    if (dates.length > 0) {
      return {
        date: dates.join(','),
        displayDate: cleanDate.replace(/（[^）]*）/g, ''), // 移除括号内容
      };
    }
  }

  // 处理特殊跨月格式：2025-07-19、20日、26日、8月2日、9日、10日、16日、23日、9月13日、14日
  if (cleanDate.includes('、') && cleanDate.includes('月')) {
    const dates = [];
    let currentYear = '2025';
    let currentMonth = '';

    // 分割并处理每个部分
    const parts = cleanDate.split('、');

    for (const part of parts) {
      const trimmed = part.trim();

      // 完整ISO格式
      const isoMatch = trimmed.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (isoMatch) {
        const [, year, month, day] = isoMatch;
        currentYear = year;
        currentMonth = month;
        dates.push(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        continue;
      }

      // 月日格式
      const monthDayMatch = trimmed.match(/(\d{1,2})月(\d{1,2})日/);
      if (monthDayMatch) {
        const [, month, day] = monthDayMatch;
        currentMonth = month;
        dates.push(
          `${currentYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
        continue;
      }

      // 单独日期
      const dayMatch = trimmed.match(/(\d{1,2})日/);
      if (dayMatch && currentMonth) {
        const [, day] = dayMatch;
        dates.push(
          `${currentYear}-${currentMonth.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
        continue;
      }
    }

    if (dates.length > 0) {
      return {
        date: dates.join(','),
        displayDate: cleanDate.replace(/\([^)]*\)/g, ''), // 移除括号内容
      };
    }
  }

  // 处理特殊说明格式：2025-07-19(土)、20日(日)
  if (cleanDate.includes('(') || cleanDate.includes('(')) {
    const dates = [];
    let currentYear = '2025';
    let currentMonth = '';

    // 移除括号内容
    const withoutParens = cleanDate.replace(/[（(][^）)]*[）)]/g, '');
    const parts = withoutParens.split('、');

    for (const part of parts) {
      const trimmed = part.trim();

      // 完整ISO格式
      const isoMatch = trimmed.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      if (isoMatch) {
        const [, year, month, day] = isoMatch;
        currentYear = year;
        currentMonth = month;
        dates.push(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
        continue;
      }

      // 单独日期
      const dayMatch = trimmed.match(/(\d{1,2})日/);
      if (dayMatch && currentMonth) {
        const [, day] = dayMatch;
        dates.push(
          `${currentYear}-${currentMonth.padStart(2, '0')}-${day.padStart(2, '0')}`
        );
        continue;
      }
    }

    if (dates.length > 0) {
      return {
        date: dates.join(','),
        displayDate: withoutParens.trim(),
      };
    }
  }

  // 处理期间格式：2025-07-11(金)～8月11日(祝)的特定日
  if (cleanDate.includes('～') || cleanDate.includes('~')) {
    const firstDateMatch = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (firstDateMatch) {
      const [, year, month, day] = firstDateMatch;
      return {
        date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
        displayDate: cleanDate.replace(/[（(][^）)]*[）)]/g, ''), // 移除括号内容
      };
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
      const converted = convertToISO(originalDate);

      // 只有当格式发生变化时才更新
      if (converted.date !== originalDate) {
        let newContent = content;

        // 替换date字段
        newContent = newContent.replace(dateRegex, `date: "${converted.date}"`);

        // 更新或添加displayDate字段
        const displayDateRegex = /displayDate:\s*["'`]([^"'`]+)["'`]/;
        if (content.includes('displayDate:')) {
          newContent = newContent.replace(
            displayDateRegex,
            `displayDate: "${converted.displayDate}"`
          );
        } else {
          newContent = newContent.replace(
            /date:\s*["'`][^"'`]+["'`]/,
            `$&,\n  displayDate: "${converted.displayDate}"`
          );
        }

        fs.writeFileSync(filePath, newContent, 'utf8');

        console.log(
          `✅ ${path.basename(filePath)}: ${originalDate} → ${converted.date}`
        );
        if (converted.displayDate !== converted.date) {
          console.log(`   显示格式: ${converted.displayDate}`);
        }

        return {
          updated: true,
          file: filePath,
          from: originalDate,
          to: converted.date,
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
  console.log('🚀 开始花火数据日期格式ISO转换...\n');

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
    console.log('\n✨ 日期格式ISO转换完成！');
    console.log('💡 建议运行验证命令检查结果：');
    console.log('   npm run validate-static');
  }
}

// 执行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertToISO, processFile };
