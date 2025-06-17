import { chromium } from 'playwright';
import cheerio from 'cheerio';

async function verifySaitamaHanabi() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    console.log('🔍 开始验证埼玉花火数据...\n');
    
    // 1. 获取本地页面数据
    console.log('📱 正在获取本地埼玉花火数据...');
    await page.goto('http://localhost:3004/saitama/hanabi', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const localContent = await page.content();
    const local$ = cheerio.load(localContent);
    
    // 解析本地数据
    const localEvents = [];
    local$('.bg-white').each((index, element) => {
      const $event = local$(element);
      const title = $event.find('h3').text().trim();
      const date = $event.find('.text-gray-600').first().text().trim();
      const location = $event.find('.text-gray-600').eq(1).text().trim();
      const audience = $event.find('.text-gray-600').eq(2).text().trim();
      const fireworks = $event.find('.text-gray-600').eq(3).text().trim();
      
      if (title && title.includes('花火')) {
        localEvents.push({
          title: title,
          date: date,
          location: location,
          audience: audience,
          fireworks: fireworks
        });
      }
    });
    
    console.log(`✅ 本地找到 ${localEvents.length} 个花火活动`);
    
    // 2. 获取WalkerPlus官方数据
    console.log('🌐 正在获取WalkerPlus埼玉花火数据...');
    await page.goto('https://hanabi.walkerplus.com/ranking/ar0311/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    const walkerContent = await page.content();
    const walker$ = cheerio.load(walkerContent);
    
    // 解析WalkerPlus数据
    const walkerEvents = [];
    walker$('.rankingItem').each((index, element) => {
      const $event = walker$(element);
      const title = $event.find('.rankingItem_name a').text().trim();
      const dateText = $event.find('.rankingItem_date').text().trim();
      const location = $event.find('.rankingItem_area').text().trim();
      const details = $event.find('.rankingItem_detail').text().trim();
      
      // 提取观众数和花火数
      let audience = '';
      let fireworks = '';
      
      const audienceMatch = details.match(/(\d+(?:\.\d+)?万人|\d+人|非公表)/);
      if (audienceMatch) {
        audience = audienceMatch[1];
      }
      
      const fireworksMatch = details.match(/(\d+(?:万|,)?\d*発)/);
      if (fireworksMatch) {
        fireworks = fireworksMatch[1];
      }
      
      if (title) {
        walkerEvents.push({
          title: title,
          date: dateText,
          location: location,
          audience: audience,
          fireworks: fireworks,
          details: details
        });
      }
    });
    
    console.log(`✅ WalkerPlus找到 ${walkerEvents.length} 个花火活动\n`);
    
    // 3. 数据对比分析
    console.log('📊 数据对比分析：\n');
    console.log('='.repeat(80));
    
    console.log('\n【本地数据】：');
    localEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   日期: ${event.date}`);
      console.log(`   地点: ${event.location}`);
      console.log(`   观众: ${event.audience}`);
      console.log(`   花火: ${event.fireworks}\n`);
    });
    
    console.log('【WalkerPlus官方数据】：');
    walkerEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   日期: ${event.date}`);
      console.log(`   地点: ${event.location}`);
      console.log(`   观众: ${event.audience}`);
      console.log(`   花火: ${event.fireworks}`);
      console.log(`   详情: ${event.details}\n`);
    });
    
    // 4. 详细匹配分析
    console.log('🔍 详细匹配分析：\n');
    console.log('='.repeat(80));
    
    let exactMatches = 0;
    const inconsistencies = [];
    
    for (const localEvent of localEvents) {
      let found = false;
      let bestMatch = null;
      let similarity = 0;
      
      for (const walkerEvent of walkerEvents) {
        // 标题相似度匹配
        const titleSim = calculateSimilarity(localEvent.title, walkerEvent.title);
        if (titleSim > similarity) {
          similarity = titleSim;
          bestMatch = walkerEvent;
        }
        
        if (titleSim > 0.7) {
          found = true;
          
          // 检查具体字段是否一致
          const issues = [];
          
          if (localEvent.date !== walkerEvent.date && walkerEvent.date) {
            issues.push(`日期不一致: 本地"${localEvent.date}" vs WalkerPlus"${walkerEvent.date}"`);
          }
          
          if (localEvent.location !== walkerEvent.location && walkerEvent.location) {
            issues.push(`地点不一致: 本地"${localEvent.location}" vs WalkerPlus"${walkerEvent.location}"`);
          }
          
          if (localEvent.audience !== walkerEvent.audience && walkerEvent.audience) {
            issues.push(`观众数不一致: 本地"${localEvent.audience}" vs WalkerPlus"${walkerEvent.audience}"`);
          }
          
          if (localEvent.fireworks !== walkerEvent.fireworks && walkerEvent.fireworks) {
            issues.push(`花火数不一致: 本地"${localEvent.fireworks}" vs WalkerPlus"${walkerEvent.fireworks}"`);
          }
          
          if (issues.length === 0) {
            exactMatches++;
            console.log(`✅ 完全匹配: ${localEvent.title}`);
          } else {
            inconsistencies.push({
              localEvent,
              walkerEvent,
              issues
            });
            console.log(`⚠️  发现差异: ${localEvent.title}`);
            issues.forEach(issue => console.log(`     ${issue}`));
          }
          console.log('');
          break;
        }
      }
      
      if (!found && bestMatch) {
        console.log(`❓ 未找到精确匹配: ${localEvent.title}`);
        console.log(`   最佳匹配: ${bestMatch.title} (相似度: ${(similarity * 100).toFixed(1)}%)\n`);
      }
    }
    
    // 5. 总结报告
    console.log('📋 验证总结：\n');
    console.log('='.repeat(80));
    console.log(`本地数据数量: ${localEvents.length}`);
    console.log(`WalkerPlus数据数量: ${walkerEvents.length}`);
    console.log(`完全匹配: ${exactMatches}`);
    console.log(`存在差异: ${inconsistencies.length}`);
    
    if (inconsistencies.length > 0) {
      console.log('\n🔧 需要修正的项目：');
      inconsistencies.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.localEvent.title}`);
        item.issues.forEach(issue => console.log(`   - ${issue}`));
      });
    }
    
    const accuracy = localEvents.length > 0 ? ((exactMatches / localEvents.length) * 100).toFixed(1) : '0';
    console.log(`\n📊 数据准确性: ${accuracy}%`);
    
    if (accuracy >= 95) {
      console.log('🎉 数据质量: A+ 级（优秀）');
    } else if (accuracy >= 90) {
      console.log('🎯 数据质量: A 级（良好）');
    } else if (accuracy >= 80) {
      console.log('⚡ 数据质量: B 级（需要改进）');
    } else {
      console.log('⚠️  数据质量: C 级（需要大幅改进）');
    }
    
  } catch (error) {
    console.error('❌ 验证过程中出现错误:', error.message);
  } finally {
    await browser.close();
  }
}

function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// 运行验证
verifySaitamaHanabi().catch(console.error); 