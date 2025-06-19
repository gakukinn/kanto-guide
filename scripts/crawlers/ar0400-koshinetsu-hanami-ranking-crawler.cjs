/**
 * 甲信越花见排行榜爬取脚本 (AR0400)
 * 目标URL: https://hanami.walkerplus.com/ranking/ar0400/
 * 技术栈: Playwright + Cheerio
 * 期望数量: 10个景点
 * 数据格式: 与现有6个地区完全一致
 */

const { chromium } = require('playwright');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

async function crawlKoshinetsuHanamiRanking() {
  console.log('🌸 开始爬取甲信越花见排行榜数据...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // 访问甲信越花见排行榜页面
    console.log('📡 访问甲信越花见排行榜页面...');
    await page.goto('https://hanami.walkerplus.com/ranking/ar0400/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // 等待页面加载完成
    await page.waitForTimeout(5000);

    // 获取页面HTML
    const html = await page.content();
    const $ = cheerio.load(html);

    const hanamiSpots = [];

    // 基于实际页面结构查找排行榜项目
    console.log('🔍 查找甲信越花见排行榜项目...');

    // 先尝试找到包含景点的列表项
    let $items = $('li').filter((i, el) => {
      const $el = $(el);
      return $el.find('a[href*="/detail/ar04"]').length > 0;
    });

    console.log(`✅ 找到 ${$items.length} 个排行榜项目`);

    // 如果没找到，尝试其他选择器
    if ($items.length === 0) {
      console.log('🔍 尝试其他选择器...');
      $items = $('a[href*="/detail/ar04"]').parent();
      console.log(`🔍 备用选择器找到 ${$items.length} 个项目`);
    }

    if (!$items || $items.length === 0) {
      throw new Error('未找到任何花见景点数据');
    }

    // 提取每个景点的数据
    $items.each((index, element) => {
      try {
        if (index >= 10) return false; // 限制最多10个

        const $item = $(element);

        // 查找详情链接
        let detailLink = '';
        const $detailLink = $item.find('a[href*="/detail/ar04"]').first();
        if ($detailLink.length > 0) {
          detailLink = $detailLink.attr('href');
          if (detailLink && !detailLink.startsWith('http')) {
            detailLink = 'https://hanami.walkerplus.com' + detailLink;
          }
        }

        // 提取景点ID（从详情链接中）
        let spotId = '';
        if (detailLink) {
          const idMatch = detailLink.match(/ar04\d+e(\d+)/);
          if (idMatch) {
            spotId = `koshinetsu-hanami-${idMatch[1]}`;
          }
        }

        // 提取景点名称 - 基于实际HTML结构
        let name = '';
        const $nameEl = $item.find('h2, h3').first();
        if ($nameEl.length > 0) {
          name = $nameEl.text().trim();
        }

        // 如果没找到，尝试从链接文本获取
        if (!name) {
          const $linkEl = $item.find('a[href*="/detail/"]').first();
          if ($linkEl.length > 0) {
            name = $linkEl.text().trim();
          }
        }

        // 提取地点信息
        let location = '';
        const locationSelectors = [
          '.location',
          '.address',
          '.area',
          'span:contains("県")',
          'span:contains("市")',
          'div:contains("県")',
          'div:contains("市")',
        ];

        for (const selector of locationSelectors) {
          const $locationEl = $item.find(selector).first();
          if ($locationEl.length > 0) {
            location = $locationEl.text().trim();
            if (
              location &&
              (location.includes('県') || location.includes('市'))
            )
              break;
          }
        }

        // 提取描述信息
        let description = '';
        const descSelectors = ['.description', '.summary', '.text', 'p'];

        for (const selector of descSelectors) {
          const $descEl = $item.find(selector).first();
          if ($descEl.length > 0) {
            description = $descEl.text().trim();
            if (description && description.length > 10) break;
          }
        }

        // 提取观赏季节信息
        let viewingSeason = '';
        const seasonSelectors = [
          'span:contains("月")',
          'div:contains("月")',
          '.season',
          '.period',
          '.time',
        ];

        for (const selector of seasonSelectors) {
          const $seasonEl = $item.find(selector).first();
          if ($seasonEl.length > 0) {
            const seasonText = $seasonEl.text().trim();
            if (seasonText.includes('月')) {
              viewingSeason = seasonText;
              break;
            }
          }
        }

        // 提取人气数据（想去/去过）
        let wantToVisit = 0;
        let haveVisited = 0;

        const popularitySelectors = [
          'span:contains("人")',
          'div:contains("人")',
          '.want',
          '.visited',
          '.count',
        ];

        for (const selector of popularitySelectors) {
          $item.find(selector).each((i, el) => {
            const text = $(el).text();
            const numMatch = text.match(/(\d+)人/);
            if (numMatch) {
              const num = parseInt(numMatch[1]);
              if (text.includes('行きたい') || text.includes('想去')) {
                wantToVisit = num;
              } else if (text.includes('行った') || text.includes('去过')) {
                haveVisited = num;
              }
            }
          });
        }

        // 判断所属县
        let prefecture = '山梨县';
        if (location.includes('長野') || location.includes('长野')) {
          prefecture = '长野县';
        } else if (location.includes('新潟')) {
          prefecture = '新潟县';
        }

        // 只有当我们获得了基本信息时才添加
        if (name && (location || description)) {
          const spot = {
            id: spotId || `koshinetsu-hanami-${index + 1}`,
            name: name,
            location: location || '甲信越地区',
            viewingSeason: viewingSeason || '4月上旬～4月下旬',
            wantToVisit: wantToVisit,
            haveVisited: haveVisited,
            description: description || `${name}是甲信越地区著名的花见景点。`,
            likes: wantToVisit + haveVisited,
            category: '花见会',
            rank: index + 1,
            detailLink: detailLink,
            sakuraVariety: 'ソメイヨシノ',
            prefecture: prefecture,
            peakTime: viewingSeason || '4月上旬～4月下旬',
            features: ['🌸 花见', '⛰️ 甲信越', '🏔️ 山间'],
          };

          hanamiSpots.push(spot);
          console.log(`✅ [${index + 1}] ${name} - ${location}`);
        }
      } catch (error) {
        console.warn(`⚠️ 处理第${index + 1}个项目时出错:`, error.message);
      }
    });

    if (hanamiSpots.length === 0) {
      throw new Error('未能提取到任何有效的花见景点数据');
    }

    console.log(`\n🎉 成功爬取 ${hanamiSpots.length} 个甲信越花见景点！`);

    // 保存数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `ar0400-koshinetsu-hanami-ranking-${timestamp}.json`;
    const outputDir = path.join(
      __dirname,
      '../..',
      'data',
      'walkerplus-crawled'
    );

    // 确保目录存在
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, filename);
    await fs.writeFile(
      outputPath,
      JSON.stringify(hanamiSpots, null, 2),
      'utf8'
    );

    console.log(`💾 数据已保存至: ${outputPath}`);
    console.log(`📊 爬取完成! 共获得 ${hanamiSpots.length} 个景点数据`);

    return {
      spots: hanamiSpots,
      count: hanamiSpots.length,
      filename: filename,
      outputPath: outputPath,
    };
  } catch (error) {
    console.error('❌ 爬取过程中出现错误:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  crawlKoshinetsuHanamiRanking()
    .then(result => {
      console.log('\n🎊 甲信越花见排行榜爬取完成!');
      console.log(`📈 共爬取景点: ${result.count}个`);
      console.log(`📁 保存文件: ${result.filename}`);
    })
    .catch(error => {
      console.error('💥 爬取失败:', error.message);
      process.exit(1);
    });
}

module.exports = { crawlKoshinetsuHanamiRanking };
