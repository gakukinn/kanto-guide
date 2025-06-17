import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建输出目录
const outputDir = path.join(path.dirname(__dirname), 'extracted-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extractSaitamaHanabiData() {
  console.log('🔄 从WalkerPlus埼玉県地区页面提取花火大会数据');
  console.log('============================================================');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    console.log('🌐 访问WalkerPlus埼玉県地区页面...');
    const targetUrl = 'https://hanabi.walkerplus.com/launch/ar0311/';

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    console.log('📄 页面加载完成，提取结构化数据...');

    // 等待页面内容加载
    await page.waitForTimeout(3000);

    // 从页面中提取花火大会信息
    const hanabiData = await page.evaluate(() => {
      const results = [];

      // 首先尝试从JSON-LD结构化数据中提取
      const jsonLdScripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );

      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);

          // 如果是数组，遍历数组中的每个事件
          if (Array.isArray(data)) {
            data.forEach(event => {
              if (event['@type'] === 'Event' && event.name) {
                const eventData = {
                  index: results.length + 1,
                  name: event.name.trim(),
                  date: event.startDate || '',
                  endDate: event.endDate || '',
                  location: '',
                  audience: '',
                  fireworks: '',
                  link: event.url || '',
                  description: event.description || '',
                };

                // 提取地点信息
                if (event.location && event.location.name) {
                  eventData.location = event.location.name;
                  if (event.location.address) {
                    const addr = event.location.address;
                    if (addr.addressRegion && addr.addressLocality) {
                      eventData.location = `${addr.addressRegion}${addr.addressLocality} ${eventData.location}`;
                    }
                  }
                }

                // 从描述中提取花火数和观众数
                if (event.description) {
                  const desc = event.description;

                  // 提取花火数
                  const fireworksMatch = desc.match(/(\d+万?\d*発|\d+,?\d*発)/);
                  if (fireworksMatch) {
                    eventData.fireworks = fireworksMatch[1];
                  }

                  // 提取观众数
                  const audienceMatch = desc.match(/(\d+万人|\d+,?\d*人)/);
                  if (audienceMatch) {
                    eventData.audience = audienceMatch[1];
                  }
                }

                results.push(eventData);
              }
            });
          }
        } catch (error) {
          console.log('解析JSON-LD数据时出错:', error.message);
        }
      });

      // 如果JSON-LD数据不足，从HTML中直接提取
      if (results.length === 0) {
        console.log('从HTML中直接提取花火大会信息...');

        // 查找花火大会列表项
        const eventLinks = document.querySelectorAll(
          'a[href*="/detail/ar0311e"]'
        );

        eventLinks.forEach((link, index) => {
          const eventData = {
            index: index + 1,
            name: '',
            date: '',
            endDate: '',
            location: '',
            audience: '',
            fireworks: '',
            link: link.href || '',
            description: '',
          };

          // 提取标题
          const titleEl = link.querySelector('h2, h3, .heading') || link;
          if (titleEl) {
            eventData.name = titleEl.textContent.trim();
          }

          // 从链接周围的文本中提取信息
          const parentEl = link.closest('li, div, article, section');
          if (parentEl) {
            const fullText = parentEl.textContent;

            // 提取日期
            const dateMatch = fullText.match(/期間：([^\\n]+)/);
            if (dateMatch) {
              eventData.date = dateMatch[1].trim();
            }

            // 提取地点
            const locationMatch = fullText.match(/埼玉県[^\\n]+/);
            if (locationMatch) {
              eventData.location = locationMatch[0].trim();
            }

            // 提取观众数
            const audienceMatch = fullText.match(/例年の人出：([^\\n]+)/);
            if (audienceMatch) {
              eventData.audience = audienceMatch[1].trim();
            }

            // 提取花火数
            const fireworksMatch = fullText.match(/打ち上げ数：([^\\n]+)/);
            if (fireworksMatch) {
              eventData.fireworks = fireworksMatch[1].trim();
            }
          }

          if (eventData.name) {
            results.push(eventData);
          }
        });
      }

      return results;
    });

    console.log(`✅ 数据提取完成，找到 ${hanabiData.length} 个花火大会`);

    // 尝试从页面HTML中补充更多信息
    console.log('🔍 尝试从页面HTML中补充更多信息...');

    const supplementaryData = await page.evaluate(() => {
      const supplements = {};

      // 查找所有可能包含花火信息的元素
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const text = el.textContent;
        if (
          text &&
          (text.includes('打ち上げ数') ||
            text.includes('発') ||
            text.includes('例年の人出') ||
            text.includes('万人'))
        ) {
          const parent = el.closest('div, li, article, section');
          if (parent) {
            const nameEl = parent.querySelector(
              'h1, h2, h3, h4, a[href*="/detail/"]'
            );
            const name = nameEl ? nameEl.textContent.trim() : '';

            const fireworksMatch = text.match(/(\d+万?\d*発|\d+,?\d*発)/);
            const audienceMatch = text.match(/(\d+万人|\d+,?\d*人)/);

            if (name && (fireworksMatch || audienceMatch)) {
              if (!supplements[name]) supplements[name] = {};
              if (fireworksMatch)
                supplements[name].fireworks = fireworksMatch[1];
              if (audienceMatch) supplements[name].audience = audienceMatch[1];
            }
          }
        }
      });

      return supplements;
    });

    // 用补充数据更新主数据
    hanabiData.forEach(hanabi => {
      const supplement = supplementaryData[hanabi.name];
      if (supplement) {
        if (!hanabi.fireworks && supplement.fireworks) {
          hanabi.fireworks = supplement.fireworks;
        }
        if (!hanabi.audience && supplement.audience) {
          hanabi.audience = supplement.audience;
        }
      }
    });

    // 显示提取结果
    console.log('\\n📊 提取的花火大会数据:');
    console.log('============================================================');

    hanabiData.forEach((hanabi, index) => {
      console.log(`\\n📍 活动 ${index + 1}: ${hanabi.name}`);
      console.log(`🔗 链接: ${hanabi.link}`);
      console.log(`📅 开始日期: ${hanabi.date || '未找到'}`);
      console.log(`📅 结束日期: ${hanabi.endDate || '未找到'}`);
      console.log(`📍 地点: ${hanabi.location || '未找到'}`);
      console.log(`👥 观众数: ${hanabi.audience || '未找到'}`);
      console.log(`🎆 花火数: ${hanabi.fireworks || '未找到'}`);
    });

    // 保存数据到JSON文件
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(
      outputDir,
      `saitama-hanabi-walkerplus-${timestamp}.json`
    );
    fs.writeFileSync(outputFile, JSON.stringify(hanabiData, null, 2), 'utf8');

    console.log(`\\n💾 数据已保存到: ${outputFile}`);

    // 创建CSV格式文件
    const csvFile = path.join(
      outputDir,
      `saitama-hanabi-walkerplus-${timestamp}.csv`
    );
    const csvHeader =
      'ID,活动名称,开始日期,结束日期,地点,观众数,花火数,详情链接\\n';
    const csvContent = hanabiData
      .map(
        hanabi =>
          `${hanabi.index},"${hanabi.name}","${hanabi.date}","${hanabi.endDate}","${hanabi.location}","${hanabi.audience}","${hanabi.fireworks}","${hanabi.link}"`
      )
      .join('\\n');

    fs.writeFileSync(csvFile, csvHeader + csvContent, 'utf8');
    console.log(`💾 CSV文件已保存到: ${csvFile}`);

    // 分析数据完整性
    console.log('\\n📈 数据完整性分析:');
    console.log('============================================================');

    const stats = {
      total: hanabiData.length,
      withDate: hanabiData.filter(h => h.date).length,
      withLocation: hanabiData.filter(h => h.location).length,
      withAudience: hanabiData.filter(h => h.audience).length,
      withFireworks: hanabiData.filter(h => h.fireworks).length,
      withLink: hanabiData.filter(h => h.link).length,
    };

    console.log(`📊 总数: ${stats.total}`);
    console.log(
      `📅 有日期: ${stats.withDate} (${((stats.withDate / stats.total) * 100).toFixed(1)}%)`
    );
    console.log(
      `📍 有地点: ${stats.withLocation} (${((stats.withLocation / stats.total) * 100).toFixed(1)}%)`
    );
    console.log(
      `👥 有观众数: ${stats.withAudience} (${((stats.withAudience / stats.total) * 100).toFixed(1)}%)`
    );
    console.log(
      `🎆 有花火数: ${stats.withFireworks} (${((stats.withFireworks / stats.total) * 100).toFixed(1)}%)`
    );
    console.log(
      `🔗 有链接: ${stats.withLink} (${((stats.withLink / stats.total) * 100).toFixed(1)}%)`
    );

    console.log('\\n✅ 埼玉県花火大会数据提取完成!');
    console.log('🛡️ 数据来源: WalkerPlus官方网站');
    console.log('🛠️ 技术栈: Playwright');
    console.log('⚠️ 商业标准: 严格真实数据，绝不编造');

    return hanabiData;
  } catch (error) {
    console.error('❌ 数据提取失败:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// 如果直接运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  extractSaitamaHanabiData()
    .then(data => {
      console.log('\\n🎉 埼玉県花火数据抓取任务完成!');
      console.log(`📊 成功提取 ${data.length} 个花火大会数据`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\\n💥 抓取任务失败:', error);
      process.exit(1);
    });
}

export { extractSaitamaHanabiData };
