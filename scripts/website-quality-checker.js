import fs from 'fs';

console.log('🔍 网页质量检查系统 v2.0\n');

// 检查配置
const checks = {
  // 页面结构检查
  pageStructure: {
    name: '页面结构检查',
    files: [
      ['埼玉花火页面', 'src/app/saitama/hanabi/page.tsx'],
      ['东京花火页面', 'src/app/tokyo/hanabi/page.tsx'],
      ['千叶花火页面', 'src/app/chiba/hanabi/page.tsx'],
      ['神奈川花火页面', 'src/app/kanagawa/hanabi/page.tsx'],
      ['北关东花火页面', 'src/app/kitakanto/hanabi/page.tsx'],
      ['甲信越花火页面', 'src/app/koshinetsu/hanabi/page.tsx'],
    ],
  },

  // 代码质量检查
  codeQuality: {
    name: '代码质量检查',
    patterns: [
      {
        name: '未使用的console.log',
        pattern: /console\.log\(/g,
        severity: 'warning',
        message: '生产环境不应包含console.log',
      },
      {
        name: '硬编码URL',
        pattern: /http:\/\/localhost/g,
        severity: 'error',
        message: '不应包含硬编码的localhost URL',
      },
      {
        name: '空的catch块',
        pattern: /catch\s*\(\s*\w*\s*\)\s*\{\s*\}/g,
        severity: 'warning',
        message: 'catch块不应为空',
      },
      {
        name: '缺少key属性',
        pattern: /\.map\([^}]*\}\)/g,
        severity: 'info',
        message: '检查map函数是否添加了key属性',
      },
      {
        name: '平假名检查',
        pattern: /[\u3040-\u309F]/g,
        severity: 'error',
        message: '网站中不允许使用平假名，请使用中文或日文汉字',
      },
      {
        name: '片假名检查',
        pattern: /[\u30A0-\u30FF]/g,
        severity: 'error',
        message: '网站中不允许使用片假名，请使用中文或日文汉字',
        customCheck: content => {
          const katakanaMatches = content.match(/[\u30A0-\u30FF]/g);
          if (!katakanaMatches) return { pass: true, count: 0 };

          // 允许的地名片假名列表
          const allowedLocationKatakana = [
            'ヶ', // 常用于地名，如"茅ヶ崎"、"阿字ヶ浦"
            'サ', // 在地名中如"サンビーチ"
            'ゴ', // 在地名中如"ゴルフリンクス"
            'リ', // 在地名中如"リバーサイドパーク"
            'バ', // 在地名中如"リバーサイドパーク"
            'ー', // 长音符号
            'パ', // 在地名中如"パーク"
            'ク', // 在地名中如"パーク"
            '・', // 日文间隔号，常用于地名分隔
            'イ', // 在地名中如"サイド"
            'ド', // 在地名中如"サイド"
            'ル', // 在地名中如"ゴルフ"
            'フ', // 在地名中如"ゴルフ"
            'ン', // 在地名中如"サン"、"リン"
            'ス', // 在地名中如"リンクス"
            'ビ', // 在地名中如"ビーチ"
            'チ', // 在地名中如"ビーチ"
          ];

          // 检查是否在location字段中
          const locationLines = content
            .split('\n')
            .filter(
              line => line.includes('location:') && /[\u30A0-\u30FF]/.test(line)
            );

          let problematicKatakana = [];

          katakanaMatches.forEach(katakana => {
            // 如果不在允许列表中，或者不在location字段中，则标记为问题
            const isInLocation = locationLines.some(line =>
              line.includes(katakana)
            );
            const isAllowed = allowedLocationKatakana.includes(katakana);

            if (!isAllowed || !isInLocation) {
              problematicKatakana.push(katakana);
            }
          });

          return {
            pass: problematicKatakana.length === 0,
            count: problematicKatakana.length,
            details:
              problematicKatakana.length > 0
                ? `发现不当片假名: ${problematicKatakana.join(', ')}`
                : '地名片假名使用合理',
          };
        },
      },
    ],
  },

  // SEO检查
  seoCheck: {
    name: 'SEO优化检查',
    rules: [
      {
        name: 'Meta标题长度',
        check: content => {
          const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
          if (!titleMatch) return { pass: false, message: '缺少页面标题' };
          const title = titleMatch[1];
          if (title.length < 30)
            return {
              pass: false,
              message: `标题过短(${title.length}字符)，建议30-60字符`,
            };
          if (title.length > 60)
            return {
              pass: false,
              message: `标题过长(${title.length}字符)，建议30-60字符`,
            };
          return { pass: true, message: `标题长度合适(${title.length}字符)` };
        },
      },
      {
        name: 'Meta描述长度',
        check: content => {
          const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
          if (!descMatch) return { pass: false, message: '缺少页面描述' };
          const desc = descMatch[1];
          if (desc.length < 120)
            return {
              pass: false,
              message: `描述过短(${desc.length}字符)，建议120-160字符`,
            };
          if (desc.length > 160)
            return {
              pass: false,
              message: `描述过长(${desc.length}字符)，建议120-160字符`,
            };
          return { pass: true, message: `描述长度合适(${desc.length}字符)` };
        },
      },
    ],
  },

  // 数据完整性检查
  dataIntegrity: {
    name: '数据完整性检查',
    rules: [
      {
        name: '花火大会数据结构',
        check: content => {
          const issues = [];
          // 检查必要字段
          const requiredFields = [
            'title',
            'date',
            'location',
            'visitors',
            'fireworks',
          ];
          requiredFields.forEach(field => {
            if (!content.includes(`${field}:`)) {
              issues.push(`缺少必要字段: ${field}`);
            }
          });

          // 检查路径一致性
          if (content.includes('/july/hanabi/')) {
            issues.push('发现过时的月份路径，应使用地区路径');
          }

          // 检查日期格式
          const dateMatches = content.match(/date:\s*['"`]([^'"`]+)['"`]/g);
          if (dateMatches) {
            dateMatches.forEach(match => {
              const date = match.match(/['"`]([^'"`]+)['"`]/)[1];
              if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                issues.push(`日期格式错误: ${date}，应为YYYY-MM-DD格式`);
              }
            });
          }

          return {
            pass: issues.length === 0,
            message: issues.length === 0 ? '数据结构完整' : issues.join('; '),
          };
        },
      },
      {
        name: 'WalkerPlus数据源标注',
        check: content => {
          const hasWalkerPlus =
            content.includes('WalkerPlus') || content.includes('walkerplus');
          return {
            pass: hasWalkerPlus,
            message: hasWalkerPlus
              ? '包含WalkerPlus数据源标注'
              : '缺少WalkerPlus数据源标注',
          };
        },
      },
    ],
  },

  // 🆕 花火数据真实性检查
  dataAccuracy: {
    name: '花火数据真实性检查',
    rules: [
      {
        name: '时间信息验证',
        check: content => {
          const issues = [];
          const dateMatches = content.match(/date:\s*['"`]([^'"`]+)['"`]/g);

          if (dateMatches) {
            dateMatches.forEach(match => {
              const date = match.match(/['"`]([^'"`]+)['"`]/)[1];
              const dateObj = new Date(date);
              const currentYear = new Date().getFullYear();

              // 检查日期是否在合理范围内（当前年份或下一年）
              if (
                dateObj.getFullYear() < currentYear ||
                dateObj.getFullYear() > currentYear + 1
              ) {
                issues.push(
                  `日期年份异常: ${date}，应为${currentYear}或${currentYear + 1}年`
                );
              }

              // 检查是否为花火季节（通常4-10月）
              const month = dateObj.getMonth() + 1;
              if (month < 4 || month > 10) {
                issues.push(`日期月份异常: ${date}，花火大会通常在4-10月举办`);
              }
            });
          }

          return {
            pass: issues.length === 0,
            message: issues.length === 0 ? '时间信息合理' : issues.join('; '),
          };
        },
      },
      {
        name: '地点信息验证',
        check: content => {
          const issues = [];
          const locationMatches = content.match(
            /location:\s*['"`]([^'"`]+)['"`]/g
          );

          if (locationMatches) {
            locationMatches.forEach(match => {
              const location = match.match(/['"`]([^'"`]+)['"`]/)[1];

              // 检查地点是否包含具体信息
              if (location.length < 3) {
                issues.push(`地点信息过于简单: ${location}`);
              }

              // 检查是否包含常见的花火大会地点关键词
              const validKeywords = [
                '公园',
                '河',
                '川',
                '海',
                '湖',
                '港',
                '广场',
                '会场',
                '绿地',
                '运动场',
                '体育场',
                '码头',
                '海岸',
                '海滨',
                '河岸',
                '河原',
                '桥',
                '大桥',
              ];
              const hasValidKeyword = validKeywords.some(keyword =>
                location.includes(keyword)
              );

              if (!hasValidKeyword) {
                issues.push(
                  `地点信息可能不准确: ${location}，缺少常见地点关键词`
                );
              }
            });
          }

          return {
            pass: issues.length === 0,
            message: issues.length === 0 ? '地点信息合理' : issues.join('; '),
          };
        },
      },
      {
        name: '观看人数验证',
        check: content => {
          const issues = [];
          const visitorMatches = content.match(
            /visitors:\s*['"`]([^'"`]+)['"`]/g
          );

          if (visitorMatches) {
            visitorMatches.forEach(match => {
              const visitors = match.match(/['"`]([^'"`]+)['"`]/)[1];

              // 检查是否包含人数信息
              if (
                !visitors.includes('人') &&
                !visitors.includes('万') &&
                !visitors.includes('千')
              ) {
                issues.push(`观看人数格式异常: ${visitors}，应包含人数单位`);
              }

              // 检查是否有明显不合理的数字
              const numberMatch = visitors.match(/(\d+(?:\.\d+)?)/);
              if (numberMatch) {
                const number = parseFloat(numberMatch[1]);
                if (visitors.includes('万') && number > 100) {
                  issues.push(
                    `观看人数可能过高: ${visitors}，超过100万人较为罕见`
                  );
                }
                if (number < 0.1 && visitors.includes('万')) {
                  issues.push(
                    `观看人数可能过低: ${visitors}，少于1000人使用万作单位不合理`
                  );
                }
              }
            });
          }

          return {
            pass: issues.length === 0,
            message:
              issues.length === 0 ? '观看人数信息合理' : issues.join('; '),
          };
        },
      },
      {
        name: '花火数量验证',
        check: content => {
          const issues = [];
          const fireworksMatches = content.match(
            /fireworks:\s*['"`]([^'"`]+)['"`]/g
          );

          if (fireworksMatches) {
            fireworksMatches.forEach(match => {
              const fireworks = match.match(/['"`]([^'"`]+)['"`]/)[1];

              // 检查是否包含发数信息
              if (
                !fireworks.includes('发') &&
                !fireworks.includes('万') &&
                !fireworks.includes('千') &&
                !fireworks.includes('非公开') &&
                !fireworks.includes('直径')
              ) {
                issues.push(
                  `花火数量格式异常: ${fireworks}，应包含发数或特殊说明`
                );
              }

              // 检查数量是否合理
              const numberMatch = fireworks.match(/(\d+(?:\.\d+)?)/);
              if (numberMatch) {
                const number = parseFloat(numberMatch[1]);
                if (fireworks.includes('万') && number > 10) {
                  issues.push(
                    `花火数量可能过高: ${fireworks}，超过10万发较为罕见`
                  );
                }
                if (
                  number < 100 &&
                  !fireworks.includes('万') &&
                  !fireworks.includes('千')
                ) {
                  issues.push(
                    `花火数量可能过低: ${fireworks}，少于100发较为罕见`
                  );
                }
              }
            });
          }

          return {
            pass: issues.length === 0,
            message:
              issues.length === 0 ? '花火数量信息合理' : issues.join('; '),
          };
        },
      },
      {
        name: '红心数合理性验证',
        check: content => {
          const issues = [];
          const likesMatches = content.match(/likes:\s*(\d+)/g);

          if (likesMatches) {
            likesMatches.forEach(match => {
              const likes = parseInt(match.match(/(\d+)/)[1]);

              // 检查红心数是否在合理范围内
              if (likes < 0) {
                issues.push(`红心数不能为负数: ${likes}`);
              }
              if (likes > 1000) {
                issues.push(`红心数可能过高: ${likes}，超过1000较为罕见`);
              }
              if (likes === 0) {
                issues.push(`红心数为0可能不合理: ${likes}，建议设置初始值`);
              }
            });
          }

          return {
            pass: issues.length === 0,
            message: issues.length === 0 ? '红心数设置合理' : issues.join('; '),
          };
        },
      },
      {
        name: '数据一致性验证',
        check: content => {
          const issues = [];

          // 检查观看人数与花火数量的合理性关系
          const visitorMatches = content.match(
            /visitors:\s*['"`]([^'"`]+)['"`]/g
          );
          const fireworksMatches = content.match(
            /fireworks:\s*['"`]([^'"`]+)['"`]/g
          );

          if (
            visitorMatches &&
            fireworksMatches &&
            visitorMatches.length === fireworksMatches.length
          ) {
            for (let i = 0; i < visitorMatches.length; i++) {
              const visitors =
                visitorMatches[i].match(/['"`]([^'"`]+)['"`]/)[1];
              const fireworks =
                fireworksMatches[i].match(/['"`]([^'"`]+)['"`]/)[1];

              // 提取数字进行比较
              const visitorNum = parseFloat(
                (visitors.match(/(\d+(?:\.\d+)?)/) || [0, 0])[1]
              );
              const fireworksNum = parseFloat(
                (fireworks.match(/(\d+(?:\.\d+)?)/) || [0, 0])[1]
              );

              if (visitorNum > 0 && fireworksNum > 0) {
                // 大型活动（超过10万人）通常花火数量也较多
                if (
                  visitors.includes('万') &&
                  visitorNum > 10 &&
                  fireworks.includes('发') &&
                  fireworksNum < 1000
                ) {
                  issues.push(
                    `数据不一致: ${visitors}观众但仅${fireworks}，大型活动花火数量可能偏低`
                  );
                }

                // 小型活动（少于1万人）花火数量通常不会太多
                if (
                  (!visitors.includes('万') || visitorNum < 1) &&
                  fireworks.includes('万') &&
                  fireworksNum > 1
                ) {
                  issues.push(
                    `数据不一致: ${visitors}观众但有${fireworks}，小型活动花火数量可能偏高`
                  );
                }
              }
            }
          }

          return {
            pass: issues.length === 0,
            message: issues.length === 0 ? '数据一致性良好' : issues.join('; '),
          };
        },
      },
    ],
  },
};

// 执行检查
let totalIssues = 0;
let totalChecks = 0;

// 页面结构检查
console.log(`📂 ${checks.pageStructure.name}:`);
let structurePassed = 0;
checks.pageStructure.files.forEach(([name, filePath]) => {
  totalChecks++;
  const exists = fs.existsSync(filePath);
  if (exists) {
    console.log(`  ✅ ${name}`);
    structurePassed++;
  } else {
    console.log(`  ❌ ${name} - 文件不存在`);
    totalIssues++;
  }
});
console.log(
  `  📊 结果: ${structurePassed}/${checks.pageStructure.files.length} 通过\n`
);

// 代码质量检查
console.log(`🔧 ${checks.codeQuality.name}:`);
let qualityIssues = 0;
checks.pageStructure.files.forEach(([name, filePath]) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`  检查: ${name}`);

    checks.codeQuality.patterns.forEach(pattern => {
      totalChecks++;

      // 如果有自定义检查逻辑，使用自定义检查
      if (pattern.customCheck) {
        const result = pattern.customCheck(content);
        if (result.pass) {
          console.log(`    ✅ ${pattern.name}: ${result.details || '通过'}`);
        } else {
          const severity =
            pattern.severity === 'error'
              ? '❌'
              : pattern.severity === 'warning'
                ? '⚠️'
                : 'ℹ️';
          console.log(
            `    ${severity} ${pattern.name}: ${result.details || pattern.message} (${result.count}处)`
          );
          if (pattern.severity === 'error') totalIssues++;
          if (pattern.severity === 'warning') qualityIssues++;
        }
      } else {
        // 使用原有的正则匹配逻辑
        const matches = content.match(pattern.pattern);
        if (matches) {
          const severity =
            pattern.severity === 'error'
              ? '❌'
              : pattern.severity === 'warning'
                ? '⚠️'
                : 'ℹ️';
          console.log(
            `    ${severity} ${pattern.name}: ${pattern.message} (${matches.length}处)`
          );
          if (pattern.severity === 'error') totalIssues++;
          if (pattern.severity === 'warning') qualityIssues++;
        } else {
          console.log(`    ✅ ${pattern.name}: 通过`);
        }
      }
    });
  }
});
console.log(`  📊 质量问题: ${qualityIssues} 个警告\n`);

// SEO检查
console.log(`📈 ${checks.seoCheck.name}:`);
let seoIssues = 0;
checks.pageStructure.files.forEach(([name, filePath]) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`  检查: ${name}`);

    checks.seoCheck.rules.forEach(rule => {
      totalChecks++;
      const result = rule.check(content);
      const icon = result.pass ? '✅' : '❌';
      console.log(`    ${icon} ${rule.name}: ${result.message}`);
      if (!result.pass) {
        seoIssues++;
        totalIssues++;
      }
    });
  }
});
console.log(`  📊 SEO问题: ${seoIssues} 个\n`);

// 数据完整性检查
console.log(`📊 ${checks.dataIntegrity.name}:`);
let dataIssues = 0;
checks.pageStructure.files.forEach(([name, filePath]) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`  检查: ${name}`);

    checks.dataIntegrity.rules.forEach(rule => {
      totalChecks++;
      const result = rule.check(content);
      const icon = result.pass ? '✅' : '❌';
      console.log(`    ${icon} ${rule.name}: ${result.message}`);
      if (!result.pass) {
        dataIssues++;
        totalIssues++;
      }
    });
  }
});
console.log(`  📊 数据问题: ${dataIssues} 个\n`);

// 🆕 花火数据真实性检查
console.log(`🎯 ${checks.dataAccuracy.name}:`);
let accuracyIssues = 0;
checks.pageStructure.files.forEach(([name, filePath]) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`  检查: ${name}`);

    checks.dataAccuracy.rules.forEach(rule => {
      totalChecks++;
      const result = rule.check(content);
      const icon = result.pass ? '✅' : '⚠️';
      console.log(`    ${icon} ${rule.name}: ${result.message}`);
      if (!result.pass) {
        accuracyIssues++;
        // 数据真实性问题作为警告，不计入严重错误
      }
    });
  }
});
console.log(`  📊 数据真实性问题: ${accuracyIssues} 个\n`);

// 总结报告
console.log('🎯 检查总结:');
console.log(`  📊 总检查项: ${totalChecks}`);
console.log(`  ❌ 严重问题: ${totalIssues}`);
console.log(`  ⚠️ 质量警告: ${qualityIssues}`);
console.log(`  🎯 数据真实性警告: ${accuracyIssues}`);

const passRate = Math.round(((totalChecks - totalIssues) / totalChecks) * 100);
console.log(`  📈 通过率: ${passRate}%\n`);

if (totalIssues === 0 && accuracyIssues === 0) {
  console.log('🎉 所有检查通过！网页质量优秀，数据真实可靠！');
} else if (totalIssues === 0 && accuracyIssues > 0) {
  console.log(
    '⚠️ 基础检查通过，但发现数据真实性问题，建议核实WalkerPlus官方数据'
  );
} else if (totalIssues <= 5) {
  console.log('⚠️ 发现少量问题，建议修复以提高质量');
} else {
  console.log('❌ 发现多个问题，需要立即修复');
}

// 建议
console.log('\n💡 优化建议:');
console.log('  1. 确保所有页面都有正确的SEO元数据');
console.log('  2. 移除生产环境的调试代码');
console.log('  3. 确保数据来源标注清晰');
console.log('  4. 🆕 验证花火大会时间、地点、人数、花火数的真实性');
console.log('  5. 🆕 使用Playwright MCP对比WalkerPlus官方数据');
console.log('  6. 🆕 确保红心数设置在合理范围内');
console.log('  7. 🆕 检查观看人数与花火数量的逻辑一致性');
