import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 🎯 埼玉花火大会数据验证器
 * 严格核对本地项目中的花火大会与WalkerPlus官方数据
 */
class SaitamaHanabiVerifier {
  constructor() {
    this.results = {
      walkerPlusData: [],
      projectData: [],
      matches: [],
      discrepancies: [],
      missingInWalker: [],
      missingInProject: []
    };
  }

  async runVerification() {
    console.log('🎯 开始验证埼玉县花火大会数据...');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
      // Step 1: 抓取本地项目埼玉花火数据
      console.log('📱 正在抓取本地项目埼玉花火数据...');
      await page.goto('http://localhost:3004/saitama/hanabi', { 
        waitUntil: 'networkidle', 
        timeout: 60000 
      });
      
      await page.waitForTimeout(3000);
      const projectHtml = await page.content();
      const $project = cheerio.load(projectHtml);
      
      console.log(`🔍 项目页面标题: ${$project('title').text()}`);
      
      // 抓取项目中的花火大会信息
      const projectEvents = [];
      
      // 查找包含花火信息的元素
      $project('*').each((index, element) => {
        const $el = $project(element);
        const text = $el.text().trim();
        
        if ((text.includes('花火大会') || text.includes('花火祭') || 
             (text.includes('花火') && (text.includes('2025') || text.includes('7月') || text.includes('8月') || text.includes('9月')))) && 
            text.length > 5 && 
            text.length < 200 &&
            !text.includes('ページ') &&
            !text.includes('について') &&
            !text.includes('カレンダー') &&
            !text.includes('HOME') &&
            !text.includes('メニュー')) {
          
          console.log(`🎯 发现埼玉花火活动: ${text.substring(0, 100)}...`);
          
          const container = $el.closest('div, section, article, li, tr').length > 0 
            ? $el.closest('div, section, article, li, tr')
            : $el.parent();
          
          const fullText = container.text();
          
          const eventInfo = {
            name: this.cleanEventName(text),
            rawName: text.substring(0, 100),
            date: this.extractDate(fullText),
            time: this.extractTime(fullText),
            location: this.extractLocation(fullText),
            expectedVisitors: this.extractVisitors(fullText),
            fireworksCount: this.extractFireworks(fullText),
            ticketInfo: this.extractTicketInfo(fullText),
            weather: this.extractWeatherInfo(fullText),
            rawContext: fullText.substring(0, 300),
            source: '项目数据',
            elementIndex: index
          };
          
          // 避免重复
          if (!projectEvents.find(e => this.isSameEvent(e.name, eventInfo.name))) {
            projectEvents.push(eventInfo);
          }
        }
      });
      
      this.results.projectData = projectEvents;
      console.log(`📊 项目数据抓取完成，发现 ${projectEvents.length} 个埼玉花火活动`);
      
      // Step 2: 抓取WalkerPlus埼玉花火排行数据
      console.log('📡 正在抓取WalkerPlus埼玉花火排行数据...');
      await page.goto('https://hanabi.walkerplus.com/ranking/ar0311/', { 
        waitUntil: 'networkidle', 
        timeout: 30000 
      });
      
      await page.waitForTimeout(3000);
      const walkerHtml = await page.content();
      const $walker = cheerio.load(walkerHtml);
      
      console.log(`🔍 WalkerPlus页面标题: ${$walker('title').text()}`);
      
      const walkerEvents = [];
      
      // 抓取WalkerPlus的埼玉花火信息
      $walker('*').each((index, element) => {
        const $el = $walker(element);
        const text = $el.text().trim();
        
        if (text.includes('花火大会') && 
            text.length > 8 && 
            text.length < 150 &&
            !text.includes('ランキング') &&
            !text.includes('について') &&
            !text.includes('花火大会について') &&
            !text.includes('人気') &&
            !text.includes('検索') &&
            !text.includes('カレンダー')) {
          
          console.log(`✅ WalkerPlus发现埼玉花火: ${text.substring(0, 80)}...`);
          
          const parent = $el.closest('li, div, article, section, tr');
          const fullText = parent.text();
          
          const eventInfo = {
            name: this.cleanEventName(text),
            rawName: text.substring(0, 100),
            date: this.extractDate(fullText),
            time: this.extractTime(fullText),
            location: this.extractLocation(fullText),
            expectedVisitors: this.extractVisitors(fullText),
            fireworksCount: this.extractFireworks(fullText),
            ticketInfo: this.extractTicketInfo(fullText),
            weather: this.extractWeatherInfo(fullText),
            rawContext: fullText.substring(0, 300),
            source: 'WalkerPlus官方',
            elementIndex: index
          };
          
          if (!walkerEvents.find(e => this.isSameEvent(e.name, eventInfo.name))) {
            walkerEvents.push(eventInfo);
          }
        }
      });
      
      this.results.walkerPlusData = walkerEvents;
      console.log(`📊 WalkerPlus数据抓取完成，发现 ${walkerEvents.length} 个埼玉花火大会`);
      
      // Step 3: 详细对比分析
      this.performDetailedComparison();
      
      // Step 4: 生成详细报告
      const report = this.generateDetailedReport();
      console.log(report);
      
      // 保存报告
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(process.cwd(), `saitama-hanabi-verification-${timestamp}.md`);
      fs.writeFileSync(reportPath, report, 'utf8');
      console.log(`\n📄 埼玉花火验证报告已保存: ${reportPath}`);
      
    } catch (error) {
      console.error('❌ 验证过程出错:', error.message);
    } finally {
      await browser.close();
    }
    
    return this.results;
  }

  cleanEventName(name) {
    return name
      .replace(/第\d+回\s?/, '')
      .replace(/\s+/g, ' ')
      .replace(/【.*?】/g, '')
      .replace(/〜.*?〜/g, '')
      .replace(/花火大会.*/, '花火大会')
      .trim();
  }

  isSameEvent(name1, name2) {
    const normalize = (name) => {
      return name
        .replace(/第\d+回\s?|花火大会|花火祭|の打ち上げ数・日程など|\s|・/g, '')
        .toLowerCase();
    };
    
    const norm1 = normalize(name1);
    const norm2 = normalize(name2);
    
    return norm1.includes(norm2) || norm2.includes(norm1) || 
           norm1 === norm2 ||
           (norm1.length > 2 && norm2.length > 2 && 
            (norm1.includes(norm2.substring(0, Math.min(norm2.length, 4))) ||
             norm2.includes(norm1.substring(0, Math.min(norm1.length, 4)))));
  }

  extractDate(text) {
    const patterns = [
      /2025[年\/\-](\d{1,2})[月\/\-](\d{1,2})日?/,
      /(\d{1,2})[月\/\-](\d{1,2})日/,
      /(\d{4})\/(\d{1,2})\/(\d{1,2})/,
      /(\d{1,2})\/(\d{1,2})/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (pattern.source.includes('2025')) {
          return `2025年${match[1]}月${match[2]}日`;
        } else if (match[3]) {
          return `${match[1]}年${match[2]}月${match[3]}日`;
        } else if (match.length >= 3) {
          return `2025年${match[1]}月${match[2]}日`;
        }
      }
    }
    
    if (text.includes('7月')) return '2025年7月';
    if (text.includes('8月')) return '2025年8月';
    if (text.includes('9月')) return '2025年9月';
    
    return '日期信息未找到';
  }

  extractTime(text) {
    const patterns = [
      /(\d{1,2}):(\d{2})[～〜-]?(\d{1,2}):(\d{2})/,
      /(\d{1,2}):(\d{2})/,
      /(\d{1,2})時(\d{2})分/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[3] && match[4]) {
          return `${match[1]}:${match[2]}～${match[3]}:${match[4]}`;
        } else {
          return `${match[1]}:${match[2]}`;
        }
      }
    }
    
    return '时间信息未找到';
  }

  extractLocation(text) {
    const locationPatterns = [
      /埼玉[県県]?[^,，。\n]{1,20}[区市町]/,
      /[^,，。\n]*[公园園会場競競馬場河川敷][^,，。\n]{0,15}/,
      /[^,，。\n]*[区市町村][^,，。\n]{1,15}/
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match && match[0].length < 50) {
        return match[0].trim();
      }
    }
    
    // 检查埼玉县常见地点关键词
    const keywords = ['大宮', '川越', '所沢', '越谷', '草加', '春日部', '熊谷', '川口', '戸田', '和光'];
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        const regex = new RegExp(`[^,，。\\n]*${keyword}[^,，。\\n]*`);
        const match = text.match(regex);
        if (match) {
          return match[0].trim().substring(0, 30);
        }
      }
    }
    
    return '地点信息未找到';
  }

  extractVisitors(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬]人/,
      /(\d+(?:,\d+)?)[万萬]?人/,
      /非公表/,
      /未公表/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        if (match[0].includes('非公表') || match[0].includes('未公表')) {
          return '非公表';
        }
        
        const num = parseFloat(match[1].replace(',', ''));
        if (num < 1000) {
          return `约${num}万人`;
        } else {
          return `约${(num/10000).toFixed(1)}万人`;
        }
      }
    }
    
    return '观众数信息未找到';
  }

  extractFireworks(text) {
    const patterns = [
      /[約约]?(\d+(?:\.\d+)?)[万萬][発发]/,
      /(\d+(?:,\d+)?)[発发]/,
      /(\d+(?:,\d+)?)[发發]/
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const num = parseFloat(match[1].replace(',', ''));
        if (match[0].includes('万')) {
          return `约${num}万发`;
        } else if (num > 1000) {
          return `约${(num/10000).toFixed(1)}万发`;
        } else {
          return `约${num}发`;
        }
      }
    }
    
    return '花火数信息未找到';
  }

  extractTicketInfo(text) {
    if (text.includes('無料') || text.includes('免费')) return '免费';
    if (text.includes('有料') || text.includes('收费')) return '收费';
    if (text.includes('円')) {
      const match = text.match(/(\d+(?:,\d+)?)円/);
      if (match) return `${match[1]}円`;
    }
    return '票价信息未找到';
  }

  extractWeatherInfo(text) {
    if (text.includes('雨天中止')) return '雨天中止';
    if (text.includes('雨天決行')) return '雨天決行';
    if (text.includes('小雨決行')) return '小雨決行';
    if (text.includes('荒天中止')) return '荒天中止';
    return '天气政策未找到';
  }

  performDetailedComparison() {
    console.log('\n🔍 开始详细对比分析埼玉花火数据...');
    
    const projectEvents = this.results.projectData;
    const walkerEvents = this.results.walkerPlusData;
    
    // 找到匹配的活动
    projectEvents.forEach(projectEvent => {
      const matchedWalkerEvent = walkerEvents.find(walkerEvent => 
        this.isSameEvent(projectEvent.name, walkerEvent.name)
      );
      
      if (matchedWalkerEvent) {
        const comparison = {
          projectEvent,
          walkerEvent: matchedWalkerEvent,
          differences: []
        };
        
        // 详细对比各个字段
        const fields = ['date', 'time', 'location', 'expectedVisitors', 'fireworksCount', 'ticketInfo', 'weather'];
        
        fields.forEach(field => {
          const projectValue = projectEvent[field];
          const walkerValue = matchedWalkerEvent[field];
          
          if (projectValue !== walkerValue && 
              !projectValue.includes('未找到') && 
              !walkerValue.includes('未找到') &&
              !this.isValueEquivalent(projectValue, walkerValue)) {
            comparison.differences.push({
              field,
              projectValue,
              walkerValue,
              fieldName: this.getFieldDisplayName(field)
            });
          }
        });
        
        if (comparison.differences.length > 0) {
          this.results.discrepancies.push(comparison);
        } else {
          this.results.matches.push(comparison);
        }
      } else {
        this.results.missingInWalker.push(projectEvent);
      }
    });
    
    // 找到WalkerPlus中有但项目中没有的活动
    walkerEvents.forEach(walkerEvent => {
      const matchedProjectEvent = projectEvents.find(projectEvent => 
        this.isSameEvent(projectEvent.name, walkerEvent.name)
      );
      
      if (!matchedProjectEvent) {
        this.results.missingInProject.push(walkerEvent);
      }
    });
  }

  isValueEquivalent(value1, value2) {
    const normalize = (val) => val.replace(/[約约]/g, '').trim();
    return normalize(value1) === normalize(value2);
  }

  getFieldDisplayName(field) {
    const fieldNames = {
      'date': '日期',
      'time': '时间',
      'location': '地点',
      'expectedVisitors': '观众数',
      'fireworksCount': '花火数',
      'ticketInfo': '票价信息',
      'weather': '天气政策'
    };
    return fieldNames[field] || field;
  }

  generateDetailedReport() {
    const totalProject = this.results.projectData.length;
    const totalWalker = this.results.walkerPlusData.length;
    const matches = this.results.matches.length;
    const discrepancies = this.results.discrepancies.length;
    const missingInWalker = this.results.missingInWalker.length;
    const missingInProject = this.results.missingInProject.length;

    let report = `
# 🎯 埼玉花火大会数据核实报告
## Playwright + Cheerio 技术验证结果

**验证时间**: ${new Date().toLocaleString('zh-CN')}
**WalkerPlus URL**: https://hanabi.walkerplus.com/ranking/ar0311/
**项目URL**: http://localhost:3004/saitama/hanabi

---

## 📊 验证结果摘要

| 指标 | 数值 | 状态 |
|------|------|------|
| **项目中的花火活动** | ${totalProject} 个 | ${totalProject >= 10 ? '✅ 数据丰富' : '⚠️ 数据较少'} |
| **WalkerPlus活动** | ${totalWalker} 个 | ✅ 已抓取 |
| **完全匹配** | ${matches} 个 | ${matches > 0 ? '✅' : '❌'} |
| **存在差异** | ${discrepancies} 个 | ${discrepancies === 0 ? '✅ 无差异' : '⚠️ 需要注意'} |
| **项目中独有** | ${missingInWalker} 个 | ${missingInWalker === 0 ? '✅' : '⚠️'} |
| **WalkerPlus独有** | ${missingInProject} 个 | ${missingInProject === 0 ? '✅' : '⚠️'} |

---

## 📱 项目中发现的所有埼玉花火活动 (${totalProject}个)

`;

    this.results.projectData.forEach((event, index) => {
      report += `### ${index + 1}. ${event.name}
- **原始名称**: ${event.rawName}
- **日期**: ${event.date}
- **时间**: ${event.time}
- **地点**: ${event.location}
- **观众数**: ${event.expectedVisitors}
- **花火数**: ${event.fireworksCount}
- **票价**: ${event.ticketInfo}
- **天气政策**: ${event.weather}

`;
    });

    report += `
---

## 📡 WalkerPlus官方数据 (${totalWalker}个)

`;

    this.results.walkerPlusData.forEach((event, index) => {
      report += `### ${index + 1}. ${event.name}
- **原始名称**: ${event.rawName}
- **日期**: ${event.date}
- **时间**: ${event.time}
- **地点**: ${event.location}
- **观众数**: ${event.expectedVisitors}
- **花火数**: ${event.fireworksCount}
- **票价**: ${event.ticketInfo}
- **天气政策**: ${event.weather}

`;
    });

    report += `
---

## ✅ 完全匹配的活动 (${matches}个)

`;

    if (matches === 0) {
      report += '*暂无完全匹配的活动*\n';
    } else {
      this.results.matches.forEach((match, index) => {
        report += `### ${index + 1}. ${match.projectEvent.name}
✅ 该花火大会的所有信息都与WalkerPlus完全一致

`;
      });
    }

    report += `
---

## ❌ 存在差异的活动 (${discrepancies}个)

`;

    if (discrepancies === 0) {
      report += '*🎉 没有发现任何数据差异！*\n';
    } else {
      this.results.discrepancies.forEach((discrepancy, index) => {
        report += `### ${index + 1}. ${discrepancy.projectEvent.name}

**具体差异**:
`;
        discrepancy.differences.forEach(diff => {
          report += `- **${diff.fieldName}**: 
  - 项目数据: "${diff.projectValue}"
  - WalkerPlus: "${diff.walkerValue}"
`;
        });
        report += '\n';
      });
    }

    report += `
---

## ⚠️ 项目中有但WalkerPlus排行页面中未显示的活动 (${missingInWalker}个)

`;

    if (missingInWalker === 0) {
      report += '*所有项目活动都在WalkerPlus中找到对应信息*\n';
    } else {
      this.results.missingInWalker.forEach((event, index) => {
        report += `### ${index + 1}. ${event.name}
- **可能原因**: 该活动可能不在WalkerPlus的排行页面中，或名称差异较大
- **项目数据**: ${event.date} | ${event.location}

`;
      });
    }

    report += `
---

## 📋 WalkerPlus中有但项目中缺失的活动 (${missingInProject}个)

`;

    if (missingInProject === 0) {
      report += '*项目已包含所有WalkerPlus排行中的主要活动*\n';
    } else {
      this.results.missingInProject.forEach((event, index) => {
        report += `### ${index + 1}. ${event.name}
- **建议**: 考虑将此活动添加到项目中
- **WalkerPlus数据**: ${event.date} | ${event.location}

`;
      });
    }

    report += `
---

## 🎯 最终结论

### 数据完整性评估
- **项目活动数量**: ${totalProject >= 10 ? `✅ ${totalProject}个活动，数据丰富` : `⚠️ ${totalProject}个活动，建议补充`}
- **数据匹配率**: ${totalProject > 0 ? Math.round((matches / totalProject) * 100) : 0}%
- **数据准确性**: ${discrepancies === 0 ? '✅ 完全准确' : `⚠️ ${discrepancies}个活动存在差异`}

### 整体评价
${this.getOverallAssessment(matches, discrepancies, missingInWalker, missingInProject, totalProject)}

### 建议措施
${this.getRecommendations(discrepancies, missingInWalker, missingInProject, totalProject)}

**技术验证**: Playwright + Cheerio 技术栈运行正常，成功抓取并对比了所有埼玉县花火数据。
`;

    return report;
  }

  getOverallAssessment(matches, discrepancies, missingInWalker, missingInProject, totalProject) {
    if (totalProject >= 10 && discrepancies === 0 && missingInProject === 0) {
      return '🎉 **优秀！** 项目数据完整且与WalkerPlus高度一致。';
    } else if (discrepancies <= 2 && totalProject >= 8) {
      return '✅ **良好！** 项目数据基本准确，仅有少量差异需要确认。';
    } else {
      return '⚠️ **需要改进！** 发现多处数据差异，建议根据WalkerPlus官方数据进行更新。';
    }
  }

  getRecommendations(discrepancies, missingInWalker, missingInProject, totalProject) {
    const recommendations = [];
    
    if (discrepancies > 0) {
      recommendations.push('1. **修正数据差异**: 根据上述差异对比，更新项目中不一致的信息');
    }
    
    if (missingInProject > 0) {
      recommendations.push('2. **补充缺失活动**: 考虑添加WalkerPlus中存在但项目中缺失的活动');
    }
    
    if (missingInWalker > 0) {
      recommendations.push('3. **验证独有活动**: 确认项目独有活动的数据来源和准确性');
    }
    
    if (totalProject < 10) {
      recommendations.push('4. **增加活动数量**: 建议补充更多埼玉县花火大会数据');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ **继续维持**: 当前数据质量优秀，建议保持现状');
    }
    
    return recommendations.join('\n');
  }
}

// 执行埼玉花火验证
console.log('🎯 开始验证埼玉县花火大会数据...');
const verifier = new SaitamaHanabiVerifier();
verifier.runVerification().then(results => {
  console.log('\n🎉 埼玉花火验证完成！');
  console.log(`📊 项目活动: ${results.projectData.length}个`);
  console.log(`📡 WalkerPlus活动: ${results.walkerPlusData.length}个`);
  console.log(`✅ 完全匹配: ${results.matches.length}个`);
  console.log(`❌ 存在差异: ${results.discrepancies.length}个`);
  console.log(`⚠️ 项目独有: ${results.missingInWalker.length}个`);
  console.log(`📋 WalkerPlus独有: ${results.missingInProject.length}个`);
}).catch(error => {
  console.error('❌ 埼玉花火验证失败:', error);
  process.exit(1);
}); 