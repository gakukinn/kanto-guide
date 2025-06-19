import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import playwright from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function crawlJalanEvent(url) {
  console.log('🕷️ 开始爬取 Jalan.net 事件页面...');

  let browser;
  try {
    // 启动浏览器
    browser = await playwright.chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
      ],
    });

    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();

    // 设置更长的超时时间
    page.setDefaultTimeout(60000);

    console.log(`📡 正在访问: ${url}`);

    // 使用更宽松的等待条件
    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });
    } catch (error) {
      console.log('⚠️ 网络等待超时，尝试使用load事件...');
      await page.goto(url, {
        waitUntil: 'load',
        timeout: 30000,
      });
    }

    // 等待页面加载完成，使用更宽松的条件
    try {
      await page.waitForSelector('h1', { timeout: 15000 });
    } catch (error) {
      console.log('⚠️ h1元素等待超时，继续处理...');
    }

    // 额外等待确保页面完全加载
    await page.waitForTimeout(3000);

    // 获取页面HTML内容
    const html = await page.content();

    // 调试：保存原始HTML用于分析
    const debugDir = path.join(__dirname, '..', 'debug');
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }

    const htmlFilePath = path.join(debugDir, `jalan_page_${Date.now()}.html`);
    fs.writeFileSync(htmlFilePath, html, 'utf8');
    console.log(`🔍 HTML已保存到: ${htmlFilePath}`);

    // 使用 Cheerio 解析HTML
    const $ = cheerio.load(html);

    // 分析页面结构 - 查找表格
    // 分析表格结构（调试模式）
    const debugMode = false; // 设置为 true 可启用详细调试输出
    if (debugMode) {
      console.log('📋 分析页面中的表格结构...');
      $('table').each((index, table) => {
        const $table = $(table);
        const tableText = $table.text().replace(/\s+/g, ' ').trim();
        console.log(`表格 ${index + 1}: ${tableText.substring(0, 100)}...`);

        // 检查是否包含我们需要的关键词
        const keywords = [
          '名称',
          '所在地',
          '開催期間',
          '開催場所',
          '交通アクセス',
          '主催',
          '問合せ先',
          'ホームページ',
        ];
        const foundKeywords = keywords.filter(keyword =>
          tableText.includes(keyword)
        );
        if (foundKeywords.length > 0) {
          console.log(`  ✓ 包含关键词: ${foundKeywords.join(', ')}`);

          // 详细分析这个表格的行结构
          $table.find('tr').each((rowIndex, row) => {
            const $row = $(row);
            const cells = $row.find('td, th');
            if (cells.length > 0) {
              console.log(`    行 ${rowIndex + 1}: ${cells.length} 个单元格`);
              cells.each((cellIndex, cell) => {
                const cellText = $(cell).text().trim().replace(/\s+/g, ' ');
                console.log(
                  `      单元格 ${cellIndex + 1}: "${cellText.substring(0, 50)}${cellText.length > 50 ? '...' : ''}"`
                );
              });
            }
          });
        }
      });
    }

    // 提取祭典信息
    const eventData = {
      // 名称
      name: $('h1').first().text().trim(),

      // 基本信息表格
      basicInfo: {},

      // 描述
      description: '',

      // URL信息
      originalUrl: url,

      // 爬取时间
      crawledAt: new Date().toISOString(),
    };

    // 从基本信息表格中提取数据 - 改进版
    console.log('🔍 分析页面结构...');

    // 查找包含基本信息的表格（第一个表格）
    const infoTable = $('table').first();

    if (infoTable.length > 0) {
      console.log('📋 找到基本信息表格');

      // 定义需要提取的字段映射
      const fieldMapping = {
        名称: 'name',
        所在地: 'location',
        開催期間: 'period',
        開催場所: 'venue',
        交通アクセス: 'access',
        主催: 'organizer',
        問合せ先: 'contact',
        ホームページ: 'website',
      };

      infoTable.find('tr').each((index, element) => {
        const $row = $(element);
        const cells = $row.find('td, th');

        if (cells.length >= 2) {
          const key = $(cells[0]).text().trim();

          // 检查是否是我们需要的字段
          if (fieldMapping[key]) {
            let value = $(cells[1]).text().trim();

            // 特殊处理所在地字段（包含地图噪音）
            if (key === '所在地') {
              // 提取地址部分，去除地图控制信息
              const addressMatch = value.match(/^([^←→↑↓+]+)(?=\s*←)/);
              if (addressMatch) {
                value = addressMatch[1].trim();
              } else {
                // 如果正则没匹配到，手动清理
                value = value.split('←')[0].trim();
              }
            }

            // 特殊处理ホームページ字段（可能被截断）
            if (key === 'ホームページ') {
              // 如果文本被截断，尝试从href属性获取完整URL
              const linkElement = $(cells[1]).find('a');
              if (linkElement.length > 0) {
                const href = linkElement.attr('href');
                if (href && href.startsWith('http')) {
                  value = href;
                }
              }
            }

            // 通用文本清理
            value = value
              .replace(
                /←Move left→Move right↑Move up↓Move down\+Zoom in\-Zoom out.*$/g,
                ''
              )
              .replace(/键盘快捷键.*$/g, '')
              .replace(/To navigate.*$/g, '')
              .replace(/Keyboard shortcuts.*$/g, '')
              .replace(/Map Data.*$/g, '')
              .replace(/観光MAP.*$/g, '')
              .replace(/印刷用MAP.*$/g, '')
              .replace(/\s+/g, ' ') // 将多个空白字符合并为单个空格
              .trim();

            eventData.basicInfo[key] = value;
            console.log(`  ✓ ${key}: ${value}`);
          }
        }
      });
    } else {
      console.log('⚠️ 未找到基本信息表格');
    }

    // 提取详细描述
    const descriptionElement = $('h2:contains("について")').next('p');
    if (descriptionElement.length > 0) {
      eventData.description = descriptionElement.text().trim();
    }

    // 尝试从表格中提取Google地图链接
    const googleMapsLink = $('a[href*="maps.google.com"]').attr('href');
    if (googleMapsLink) {
      eventData.googleMapsUrl = googleMapsLink;
    }

    // 整理数据结构
    const finalData = {
      名称: eventData.basicInfo['名称'] || eventData.name, // 优先使用表格中的名称
      所在地: eventData.basicInfo['所在地'] || '',
      開催期間: eventData.basicInfo['開催期間'] || '',
      開催場所: eventData.basicInfo['開催場所'] || '',
      交通アクセス: eventData.basicInfo['交通アクセス'] || '',
      主催: eventData.basicInfo['主催'] || '',
      問合せ先: eventData.basicInfo['問合せ先'] || '',
      ホームページ: eventData.basicInfo['ホームページ'] || '',
      Google地图链接: eventData.googleMapsUrl || '',
      詳細説明: eventData.description,
      原始URL: eventData.originalUrl,
      爬取时间: eventData.crawledAt,
      分类: {
        地区: '埼玉',
        类型: '祭典',
        层级: '四层详情',
      },
    };

    console.log('✅ 数据提取完成');
    console.log('📊 提取的信息:');
    console.log('名称:', finalData.名称);
    console.log('所在地:', finalData.所在地);
    console.log('開催期間:', finalData.開催期間);
    console.log('開催場所:', finalData.開催場所);
    console.log('交通アクセス:', finalData.交通アクセス);
    console.log('主催:', finalData.主催);
    console.log('問合せ先:', finalData.問合せ先);
    console.log('ホームページ:', finalData.ホームページ);
    console.log('Google地图链接:', finalData.Google地图链接);

    // 保存到JSON文件
    const outputDir = path.join(__dirname, '..', 'data', 'crawled');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `matsuri_${Date.now()}.json`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(finalData, null, 2), 'utf8');
    console.log(`💾 数据已保存到: ${filepath}`);

    return finalData;
  } catch (error) {
    console.error('❌ 爬取过程中发生错误:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 检查是否作为主模块运行 - 修复ES模块检查
const isMainModule =
  process.argv[1] &&
  (import.meta.url === `file://${process.argv[1]}` ||
    import.meta.url.includes(path.basename(process.argv[1])));

if (isMainModule) {
  const url =
    process.argv[2] ||
    'https://www.jalan.net/event/evt_343666/?screenId=OUW1702';

  crawlJalanEvent(url)
    .then(data => {
      console.log('🎉 爬取完成!');
      console.log('📁 数据已保存到本地文件');
    })
    .catch(error => {
      console.error('💥 爬取失败:', error.message);
      process.exit(1);
    });
}

export { crawlJalanEvent };
