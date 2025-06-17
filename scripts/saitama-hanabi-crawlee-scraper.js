#!/usr/bin/env node

/**
 * 埼玉県花火大会数据抓取脚本
 * 使用Playwright+Cheerio+Crawlee技术栈
 * 目标网站: https://hanabi.walkerplus.com/launch/ar0311/
 * 严格商业标准：所有信息必须真实，绝不编造
 */

import * as cheerio from 'cheerio';
import { PlaywrightCrawler } from 'crawlee';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建数据存储目录
const dataDir = path.join(__dirname, '..', 'data', 'walkerplus-crawled');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 存储抓取结果
const crawledData = {
  timestamp: new Date().toISOString(),
  source: 'https://hanabi.walkerplus.com/launch/ar0311/',
  method: 'Playwright+Cheerio+Crawlee',
  totalEvents: 0,
  events: [],
  pages: [],
  errors: [],
};

// Playwright+Crawlee爬虫配置
const crawler = new PlaywrightCrawler({
  launchContext: {
    launchOptions: {
      headless: true,
      slowMo: 1000,
    },
  },
  maxRequestsPerCrawl: 10,
  requestHandlerTimeoutSecs: 60,

  async requestHandler({ page, request, log }) {
    const url = request.loadedUrl;
    log.info(`正在处理页面: ${url}`);

    try {
      // 等待页面加载完成
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // 获取页面HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      // 提取花火大会信息
      const pageEvents = [];

      // 查找花火大会列表项
      $('li').each((index, element) => {
        const $item = $(element);
        const link = $item.find('a').first();

        if (!link.length) return;

        const href = link.attr('href');
        if (!href || !href.includes('/detail/ar0311e')) return;

        try {
          // 提取标题
          const title =
            link.find('h2').text().trim() ||
            link.find('.heading').text().trim() ||
            link.text().split('\n')[0].trim();

          if (!title) return;

          // 提取详细信息
          const infoText = link.text();

          // 提取日期
          let date = '';
          const dateMatch = infoText.match(/期間：([^]+?)(?:\n|例年|$)/);
          if (dateMatch) {
            date = dateMatch[1].trim();
          }

          // 提取地点
          let location = '';
          const locationMatch = infoText.match(/埼玉県[^]+?(?=期間|例年|$)/);
          if (locationMatch) {
            location = locationMatch[0].trim();
          }

          // 提取观众数
          let audience = '';
          const audienceMatch = infoText.match(
            /例年の人出：([^]+?)(?:\n|行って|$)/
          );
          if (audienceMatch) {
            audience = audienceMatch[1].trim();
          }

          // 提取花火数
          let fireworks = '';
          const fireworksMatch = infoText.match(
            /打ち上げ数：([^]+?)(?:\n|有料|$)/
          );
          if (fireworksMatch) {
            fireworks = fireworksMatch[1].trim();
          }

          // 提取描述
          let description = '';
          const descriptionEl = link.find('h3').first();
          if (descriptionEl.length) {
            description = descriptionEl.text().trim();
          }

          // 构建完整URL
          const fullUrl = href.startsWith('http')
            ? href
            : href.startsWith('/')
              ? `https://hanabi.walkerplus.com${href}`
              : `https://hanabi.walkerplus.com/detail/${href}`;

          const event = {
            title: title,
            date: date,
            location: location,
            audience: audience,
            fireworks: fireworks,
            description: description,
            link: fullUrl,
            source: 'WalkerPlus',
            extractedAt: new Date().toISOString(),
          };

          // 验证必要字段
          if (event.title && (event.date || event.location)) {
            pageEvents.push(event);
            log.info(`✅ 提取花火大会: ${event.title}`);
          }
        } catch (extractError) {
          log.error(`提取花火大会信息时出错: ${extractError.message}`);
          crawledData.errors.push({
            type: 'extraction_error',
            message: extractError.message,
            url: url,
            timestamp: new Date().toISOString(),
          });
        }
      });

      // 添加到总结果
      crawledData.events.push(...pageEvents);
      crawledData.pages.push({
        url: url,
        eventsCount: pageEvents.length,
        timestamp: new Date().toISOString(),
      });

      log.info(`页面 ${url} 提取了 ${pageEvents.length} 个花火大会`);

      // 检查是否有下一页
      const nextPageLink = $('a')
        .filter((i, el) => {
          const text = $(el).text().trim();
          return (
            text.includes('次へ') || text.includes('2') || text.includes('3')
          );
        })
        .first();

      if (nextPageLink.length) {
        const nextHref = nextPageLink.attr('href');
        if (
          nextHref &&
          !crawledData.pages.find(p => p.url.includes(nextHref))
        ) {
          const nextUrl = nextHref.startsWith('http')
            ? nextHref
            : nextHref.startsWith('/')
              ? `https://hanabi.walkerplus.com${nextHref}`
              : `https://hanabi.walkerplus.com/launch/ar0311/${nextHref}`;

          log.info(`发现下一页: ${nextUrl}`);
          await crawler.addRequests([nextUrl]);
        }
      }
    } catch (pageError) {
      log.error(`处理页面时出错: ${pageError.message}`);
      crawledData.errors.push({
        type: 'page_error',
        message: pageError.message,
        url: url,
        timestamp: new Date().toISOString(),
      });
    }
  },

  async failedRequestHandler({ request, log }) {
    log.error(`请求失败: ${request.url}`);
    crawledData.errors.push({
      type: 'request_failed',
      url: request.url,
      timestamp: new Date().toISOString(),
    });
  },
});

// 启动爬虫
async function runSaitamaHanabiCrawler() {
  console.log('\n🚀 启动埼玉県花火大会数据抓取...');
  console.log('📡 目标网站: https://hanabi.walkerplus.com/launch/ar0311/');
  console.log('🛠️ 技术栈: Playwright+Cheerio+Crawlee');
  console.log('⚠️ 商业标准: 严格真实数据，绝不编造\n');

  try {
    await crawler.run(['https://hanabi.walkerplus.com/launch/ar0311/']);

    // 统计结果
    crawledData.totalEvents = crawledData.events.length;

    // 保存数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `saitama-hanabi-crawlee-${timestamp}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(crawledData, null, 2), 'utf8');

    // 生成报告
    console.log('\n=== 埼玉県花火大会数据抓取完成 ===');
    console.log(`📊 抓取统计:`);
    console.log(`   - 总事件数: ${crawledData.totalEvents}`);
    console.log(`   - 处理页面: ${crawledData.pages.length}`);
    console.log(`   - 错误数量: ${crawledData.errors.length}`);
    console.log(`📁 数据保存: ${filepath}`);

    if (crawledData.totalEvents > 0) {
      console.log('\n✅ 成功抓取的花火大会:');
      crawledData.events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   📅 日期: ${event.date || '未指定'}`);
        console.log(`   📍 地点: ${event.location || '未指定'}`);
        console.log(`   👥 观众数: ${event.audience || '未指定'}`);
        console.log(`   🎆 花火数: ${event.fireworks || '未指定'}`);
        console.log(`   🔗 链接: ${event.link}`);
        console.log('');
      });
    }

    if (crawledData.errors.length > 0) {
      console.log('\n⚠️ 抓取过程中的错误:');
      crawledData.errors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.type}] ${error.message}`);
      });
    }

    console.log('\n🛡️ 数据质量保证:');
    console.log('   ✅ 所有信息来源: WalkerPlus官方网站');
    console.log('   ✅ 技术栈严格执行: Playwright+Cheerio+Crawlee');
    console.log('   ✅ 商业标准遵循: 绝无编造信息');
    console.log('   ✅ 可追溯性: 包含完整来源链接');

    return crawledData;
  } catch (error) {
    console.error('\n❌ 爬虫执行失败:', error.message);
    crawledData.errors.push({
      type: 'crawler_error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

// 如果直接运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  runSaitamaHanabiCrawler()
    .then(() => {
      console.log('\n🎉 埼玉県花火数据抓取任务完成!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 抓取任务失败:', error);
      process.exit(1);
    });
}

export { crawledData, runSaitamaHanabiCrawler };
