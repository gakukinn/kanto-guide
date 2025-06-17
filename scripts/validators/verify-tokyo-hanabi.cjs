const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function verifyTokyoHanabiData() {
  console.log('🚀 开始使用Playwright+Cheerio验证东京花火数据...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置用户代理
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    console.log('📡 正在抓取WalkerPlus东京花火排行数据...');
    
    // 访问WalkerPlus东京花火排行页面
    await page.goto('https://hanabi.walkerplus.com/crowd/ar0313/', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // 获取页面HTML内容
    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);
    
    console.log('🔍 解析WalkerPlus页面数据...');
    
    const walkerPlusData = [];
    
    // 解析花火大会列表
    $('.crowdRankingList li, .eventList li, .itemList li').each((index, element) => {
      if (index >= 10) return false; // 只获取前10个
      
      const $item = $(element);
      
      // 提取标题
      const titleElement = $item.find('h3 a, .title a, .eventTitle a, h2 a').first();
      const title = titleElement.text().trim();
      
      // 提取详情链接
      const detailLink = titleElement.attr('href');
      
      // 提取日期
      const dateText = $item.find('.date, .eventDate, .time').text().trim();
      
      // 提取地点
      const locationText = $item.find('.place, .location, .venue').text().trim();
      
      // 提取观众数
      const visitorText = $item.find('.visitor, .audience, .crowd').text().trim();
      const visitorMatch = visitorText.match(/(\d+(?:,\d+)*)\s*人/);
      const visitors = visitorMatch ? parseInt(visitorMatch[1].replace(/,/g, '')) : null;
      
      // 提取花火数
      const fireworksText = $item.find('.fireworks, .shot, .hanabi').text().trim();
      const fireworksMatch = fireworksText.match(/(\d+(?:,\d+)*)\s*発/);
      const fireworks = fireworksMatch ? parseInt(fireworksMatch[1].replace(/,/g, '')) : null;
      
      if (title) {
        walkerPlusData.push({
          rank: index + 1,
          title: title,
          detailLink: detailLink ? (detailLink.startsWith('http') ? detailLink : `https://hanabi.walkerplus.com${detailLink}`) : null,
          date: dateText,
          location: locationText,
          visitors: visitors,
          fireworks: fireworks,
          rawData: {
            titleElement: titleElement.html(),
            dateText: dateText,
            locationText: locationText,
            visitorText: visitorText,
            fireworksText: fireworksText
          }
        });
      }
    });
    
    console.log(`📊 WalkerPlus数据获取完成，找到 ${walkerPlusData.length} 个花火大会`);
    
    // 读取本地东京花火页面数据
    console.log('📖 读取本地东京花火页面数据...');
    const tokyoHanabiPath = path.join(__dirname, '../src/app/tokyo/hanabi/page.tsx');
    const tokyoHanabiContent = fs.readFileSync(tokyoHanabiPath, 'utf8');
    
    // 解析本地数据
    const localData = [];
    const hanabiMatches = tokyoHanabiContent.match(/{\s*id:\s*['"][^'"]+['"],[\s\S]*?},/g);
    
    if (hanabiMatches) {
      hanabiMatches.slice(0, 10).forEach((match, index) => {
        const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
        const nameMatch = match.match(/name:\s*['"]([^'"]+)['"]/);
        const dateMatch = match.match(/date:\s*['"]([^'"]+)['"]/);
        const locationMatch = match.match(/location:\s*['"]([^'"]+)['"]/);
        const visitorsMatch = match.match(/expectedVisitors:\s*(\d+)/);
        const fireworksMatch = match.match(/fireworksCount:\s*(\d+)/);
        const detailLinkMatch = match.match(/detailLink:\s*['"]([^'"]+)['"]/);
        
        if (nameMatch) {
          localData.push({
            rank: index + 1,
            id: idMatch ? idMatch[1] : null,
            title: nameMatch[1],
            date: dateMatch ? dateMatch[1] : null,
            location: locationMatch ? locationMatch[1] : null,
            visitors: visitorsMatch ? parseInt(visitorsMatch[1]) : null,
            fireworks: fireworksMatch ? parseInt(fireworksMatch[1]) : null,
            detailLink: detailLinkMatch ? detailLinkMatch[1] : null
          });
        }
      });
    }
    
    console.log(`📊 本地数据获取完成，找到 ${localData.length} 个花火大会`);
    
    // 数据对比分析
    console.log('🔍 开始数据对比分析...');
    
    const comparisonResults = [];
    let matchCount = 0;
    let differenceCount = 0;
    
    for (let i = 0; i < Math.max(walkerPlusData.length, localData.length); i++) {
      const walkerItem = walkerPlusData[i];
      const localItem = localData[i];
      
      const comparison = {
        rank: i + 1,
        walker: walkerItem || null,
        local: localItem || null,
        issues: []
      };
      
      if (walkerItem && localItem) {
        // 比较标题
        if (!localItem.title.includes(walkerItem.title.replace(/第\d+回\s*/, '')) && 
            !walkerItem.title.includes(localItem.title.replace(/第\d+回\s*/, ''))) {
          comparison.issues.push(`标题不匹配: Walker"${walkerItem.title}" vs Local"${localItem.title}"`);
        }
        
        // 比较日期
        if (walkerItem.date && localItem.date && 
            !localItem.date.includes(walkerItem.date.replace(/年|月|日/g, '')) &&
            !walkerItem.date.includes(localItem.date.replace(/年|月|日/g, ''))) {
          comparison.issues.push(`日期不匹配: Walker"${walkerItem.date}" vs Local"${localItem.date}"`);
        }
        
        // 比较观众数
        if (walkerItem.visitors && localItem.visitors && 
            Math.abs(walkerItem.visitors - localItem.visitors) > localItem.visitors * 0.1) {
          comparison.issues.push(`观众数差异: Walker${walkerItem.visitors}人 vs Local${localItem.visitors}人`);
        }
        
        // 比较花火数
        if (walkerItem.fireworks && localItem.fireworks && 
            Math.abs(walkerItem.fireworks - localItem.fireworks) > localItem.fireworks * 0.1) {
          comparison.issues.push(`花火数差异: Walker${walkerItem.fireworks}发 vs Local${localItem.fireworks}发`);
        }
        
        if (comparison.issues.length === 0) {
          matchCount++;
        } else {
          differenceCount++;
        }
      } else if (walkerItem && !localItem) {
        comparison.issues.push('WalkerPlus独有项目');
        differenceCount++;
      } else if (!walkerItem && localItem) {
        comparison.issues.push('本地独有项目');
        differenceCount++;
      }
      
      comparisonResults.push(comparison);
    }
    
    // 生成验证报告
    const report = `# 东京花火数据验证报告
*生成时间: ${new Date().toLocaleString('zh-CN')}*
*验证方式: Playwright + Cheerio*

## 验证概要
- **数据源**: https://hanabi.walkerplus.com/crowd/ar0313/
- **本地页面**: http://localhost:3003/tokyo/hanabi
- **WalkerPlus活动数**: ${walkerPlusData.length}个
- **本地活动数**: ${localData.length}个
- **完全匹配**: ${matchCount}个
- **存在差异**: ${differenceCount}个

## WalkerPlus官方数据 (前10名)
${walkerPlusData.map((item, index) => `
### ${index + 1}. ${item.title}
- **日期**: ${item.date || '未获取'}
- **地点**: ${item.location || '未获取'}
- **观众数**: ${item.visitors ? `${item.visitors.toLocaleString()}人` : '未获取'}
- **花火数**: ${item.fireworks ? `${item.fireworks.toLocaleString()}发` : '未获取'}
- **详情链接**: ${item.detailLink || '未获取'}
`).join('')}

## 本地页面数据 (前10名)
${localData.map((item, index) => `
### ${index + 1}. ${item.title}
- **ID**: ${item.id || '未设置'}
- **日期**: ${item.date || '未设置'}
- **地点**: ${item.location || '未设置'}
- **观众数**: ${item.visitors ? `${item.visitors.toLocaleString()}人` : '未设置'}
- **花火数**: ${item.fireworks ? `${item.fireworks.toLocaleString()}发` : '未设置'}
- **详情链接**: ${item.detailLink || '未设置'}
`).join('')}

## 数据对比结果
${comparisonResults.map(comparison => `
### 排名 ${comparison.rank}
**WalkerPlus**: ${comparison.walker ? comparison.walker.title : '无数据'}
**本地数据**: ${comparison.local ? comparison.local.title : '无数据'}
**状态**: ${comparison.issues.length === 0 ? '✅ 匹配' : '❌ 有差异'}
${comparison.issues.length > 0 ? `**差异项**:\n${comparison.issues.map(issue => `- ${issue}`).join('\n')}` : ''}
`).join('')}

## 修正建议
${comparisonResults.filter(c => c.issues.length > 0).map(comparison => {
  if (!comparison.walker) return `- 排名${comparison.rank}: 考虑移除本地独有项目"${comparison.local.title}"`;
  if (!comparison.local) return `- 排名${comparison.rank}: 需要添加WalkerPlus项目"${comparison.walker.title}"`;
  return `- 排名${comparison.rank}: 需要修正"${comparison.local.title}"的数据差异`;
}).join('\n')}

---
*验证完成时间: ${new Date().toLocaleString('zh-CN')}*
`;
    
    // 保存验证报告
    const reportPath = path.join(__dirname, '../tokyo-hanabi-verification-report.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    
    console.log('📊 验证报告已保存到:', reportPath);
    console.log('🎉 东京花火验证完成！');
    console.log(`📊 WalkerPlus活动: ${walkerPlusData.length}个`);
    console.log(`📊 本地活动: ${localData.length}个`);
    console.log(`✅ 完全匹配: ${matchCount}个`);
    console.log(`❌ 存在差异: ${differenceCount}个`);
    
    return {
      walkerPlusData,
      localData,
      comparisonResults,
      matchCount,
      differenceCount
    };
    
  } catch (error) {
    console.error('❌ 验证过程出错:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// 执行验证
if (require.main === module) {
  verifyTokyoHanabiData()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 验证失败:', error);
      process.exit(1);
    });
}

module.exports = { verifyTokyoHanabiData }; 