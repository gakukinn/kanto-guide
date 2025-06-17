#!/usr/bin/env node

/**
 * 埼玉県花火大会数据抓取脚本
 * 使用Playwright技术栈（基于成功的东京脚本模式）
 * 目标网站: https://hanabi.walkerplus.com/launch/ar0311/
 * 严格商业标准：所有信息必须真实，绝不编造
 */

import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建数据存储目录
const dataDir = path.join(__dirname, '..', 'data', 'walkerplus-crawled');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function extractSaitamaHanabiData() {
  console.log('\n🚀 启动埼玉県花火大会数据抓取...');
  console.log('📡 目标网站: https://hanabi.walkerplus.com/launch/ar0311/');
  console.log('🛠️ 技术栈: Playwright');
  console.log('⚠️ 商业标准: 严格真实数据，绝不编造');
  console.log('============================================================');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const allEvents = [];
  const errors = [];
  const processedPages = [];

  try {
    const page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });

    // 处理第一页
    console.log('\n🌐 访问第一页...');
    await processPage(
      page,
      'https://hanabi.walkerplus.com/launch/ar0311/',
      allEvents,
      processedPages,
      errors
    );

    // 检查并处理其他页面
    await checkAndProcessAdditionalPages(
      page,
      allEvents,
      processedPages,
      errors
    );

    // 保存数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `saitama-hanabi-playwright-${timestamp}.json`;
    const filepath = path.join(dataDir, filename);

    const result = {
      timestamp: new Date().toISOString(),
      source: 'https://hanabi.walkerplus.com/launch/ar0311/',
      method: 'Playwright Browser Automation',
      totalEvents: allEvents.length,
      processedPages: processedPages.length,
      errors: errors.length,
      events: allEvents,
      pages: processedPages,
      errorDetails: errors,
    };

    fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf8');

    // 生成报告
    console.log('\n=== 埼玉県花火大会数据抓取完成 ===');
    console.log(`📊 抓取统计:`);
    console.log(`   - 总事件数: ${allEvents.length}`);
    console.log(`   - 处理页面: ${processedPages.length}`);
    console.log(`   - 错误数量: ${errors.length}`);
    console.log(`📁 数据保存: ${filepath}`);

    if (allEvents.length > 0) {
      console.log('\n✅ 成功抓取的花火大会:');
      allEvents.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   📅 日期: ${event.date || '未指定'}`);
        console.log(`   📍 地点: ${event.location || '未指定'}`);
        console.log(`   👥 观众数: ${event.audience || '未指定'}`);
        console.log(`   🎆 花火数: ${event.fireworks || '未指定'}`);
        console.log(`   🔗 链接: ${event.link}`);
        console.log('');
      });
    }

    if (errors.length > 0) {
      console.log('\n⚠️ 抓取过程中的错误:');
      errors.forEach((error, index) => {
        console.log(`${index + 1}. [${error.type}] ${error.message}`);
      });
    }

    console.log('\n🛡️ 数据质量保证:');
    console.log('   ✅ 所有信息来源: WalkerPlus官方网站');
    console.log('   ✅ 技术栈严格执行: Playwright Browser Automation');
    console.log('   ✅ 商业标准遵循: 绝无编造信息');
    console.log('   ✅ 可追溯性: 包含完整来源链接');

    return result;
  } catch (error) {
    console.error('\n❌ 爬虫执行失败:', error.message);
    errors.push({
      type: 'crawler_error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  } finally {
    await browser.close();
  }
}

async function processPage(page, url, allEvents, processedPages, errors) {
  try {
    console.log(`📄 正在处理页面: ${url}`);

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // 等待页面内容加载
    await page.waitForTimeout(3000);

    const pageEvents = await page.evaluate(() => {
      const events = [];

      // 查找花火大会列表项
      const listItems = document.querySelectorAll('li');

      listItems.forEach((item, index) => {
        try {
          const link = item.querySelector('a[href*="/detail/ar0311e"]');
          if (!link) return;

          // 提取标题
          const titleEl =
            link.querySelector('h2') || link.querySelector('.heading');
          const title = titleEl ? titleEl.textContent.trim() : '';
          if (!title) return;

          // 提取详细信息
          const infoText = link.textContent;

          // 提取日期
          let date = '';
          const dateMatch = infoText.match(/期間：([^\\n]+?)(?=\\n|例年|$)/);
          if (dateMatch) {
            date = dateMatch[1].trim();
          }

          // 提取地点
          let location = '';
          const locationMatch = infoText.match(/埼玉県[^\\n]+?(?=期間|例年|$)/);
          if (locationMatch) {
            location = locationMatch[0].trim();
          }

          // 提取观众数
          let audience = '';
          const audienceMatch = infoText.match(
            /例年の人出：([^\\n]+?)(?=\\n|行って|$)/
          );
          if (audienceMatch) {
            audience = audienceMatch[1].trim();
          }

          // 提取花火数
          let fireworks = '';
          const fireworksMatch = infoText.match(
            /打ち上げ数：([^\\n]+?)(?=\\n|有料|$)/
          );
          if (fireworksMatch) {
            fireworks = fireworksMatch[1].trim();
          }

          // 提取描述
          let description = '';
          const descriptionEl = link.querySelector('h3');
          if (descriptionEl) {
            description = descriptionEl.textContent.trim();
          }

          // 构建完整URL
          const href = link.getAttribute('href');
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
            pageUrl: window.location.href,
          };

          // 验证必要字段
          if (event.title && (event.date || event.location)) {
            events.push(event);
          }
        } catch (extractError) {
          console.error('提取单个事件时出错:', extractError.message);
        }
      });

      return events;
    });

    console.log(`✅ 页面 ${url} 提取了 ${pageEvents.length} 个花火大会`);

    allEvents.push(...pageEvents);
    processedPages.push({
      url: url,
      eventsCount: pageEvents.length,
      timestamp: new Date().toISOString(),
    });
  } catch (pageError) {
    console.error(`处理页面 ${url} 时出错:`, pageError.message);
    errors.push({
      type: 'page_error',
      message: pageError.message,
      url: url,
      timestamp: new Date().toISOString(),
    });
  }
}

async function checkAndProcessAdditionalPages(
  page,
  allEvents,
  processedPages,
  errors
) {
  try {
    // 检查是否有下一页链接
    const additionalPages = await page.evaluate(() => {
      const pages = [];

      // 查找分页链接
      const pageLinks = document.querySelectorAll('a');
      pageLinks.forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');

        if (
          href &&
          (text.includes('次へ') || text.match(/^[2-9]$/) || text.includes('3'))
        ) {
          const fullUrl = href.startsWith('http')
            ? href
            : href.startsWith('/')
              ? `https://hanabi.walkerplus.com${href}`
              : `https://hanabi.walkerplus.com/launch/ar0311/${href}`;
          pages.push(fullUrl);
        }
      });

      return [...new Set(pages)]; // 去重
    });

    console.log(`🔍 发现 ${additionalPages.length} 个额外页面`);

    // 处理额外页面
    for (const additionalUrl of additionalPages) {
      if (!processedPages.find(p => p.url === additionalUrl)) {
        await processPage(
          page,
          additionalUrl,
          allEvents,
          processedPages,
          errors
        );
        await page.waitForTimeout(2000); // 避免请求过于频繁
      }
    }
  } catch (error) {
    console.error('检查额外页面时出错:', error.message);
    errors.push({
      type: 'pagination_error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

// 如果直接运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  extractSaitamaHanabiData()
    .then(() => {
      console.log('\n🎉 埼玉県花火数据抓取任务完成!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 抓取任务失败:', error);
      process.exit(1);
    });
}

export { extractSaitamaHanabiData };
