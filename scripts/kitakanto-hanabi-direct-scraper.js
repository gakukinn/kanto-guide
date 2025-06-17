#!/usr/bin/env node

/**
 * 北関東花火大会数据抓取脚本 (直接Playwright版本)
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 启动甲信越花火大会数据抓取 (直接版)...');
console.log('📡 目标网站: https://hanabi.walkerplus.com/launch/ar0400/');

// 创建数据存储目录
const dataDir = path.join(__dirname, '..', 'data', 'walkerplus-crawled');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function scrapeKitakantoHanabi() {
  let browser;
  let data = {
    timestamp: new Date().toISOString(),
    source: 'https://hanabi.walkerplus.com/launch/ar0400/',
    method: 'Playwright+Cheerio',
    totalEvents: 0,
    events: [],
    errors: [],
  };

  try {
    console.log('🌐 启动浏览器...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('📄 访问目标页面...');
    await page.goto('https://hanabi.walkerplus.com/launch/ar0400/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    console.log('⏳ 等待页面加载...');
    await page.waitForTimeout(5000);

    console.log('📝 获取页面内容...');
    const html = await page.content();
    const $ = cheerio.load(html);

    console.log(`📋 页面标题: ${$('title').text()}`);
    console.log(`📊 页面内容长度: ${html.length} 字符`);

    // 查找花火大会信息
    const events = [];
    let eventCount = 0;

    console.log('🔍 开始提取花火大会信息...');

    $('li').each((index, element) => {
      const $item = $(element);
      const link = $item.find('a').first();

      if (!link.length) return;

      const href = link.attr('href');
      if (!href || !href.includes('/detail/ar0400e')) return;

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
        const locationMatch = infoText.match(
          /(山梨県|長野県|新潟県)[^]+?(?=期間|例年|$)/
        );
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
          link: fullUrl,
          source: 'WalkerPlus',
          extractedAt: new Date().toISOString(),
        };

        // 验证必要字段
        if (event.title && (event.date || event.location)) {
          events.push(event);
          eventCount++;
          console.log(`✅ 找到花火大会 ${eventCount}: ${event.title}`);
          console.log(`   📅 日期: ${event.date || '未指定'}`);
          console.log(`   📍 地点: ${event.location || '未指定'}`);
          console.log(`   👥 观众数: ${event.audience || '未指定'}`);
          console.log(`   🎆 花火数: ${event.fireworks || '未指定'}`);
          console.log('');
        }
      } catch (extractError) {
        console.error(`❌ 提取花火大会信息时出错: ${extractError.message}`);
        data.errors.push({
          type: 'extraction_error',
          message: extractError.message,
          timestamp: new Date().toISOString(),
        });
      }
    });

    data.events = events;
    data.totalEvents = events.length;

    // 保存数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `koshinetsu-hanabi-direct-${timestamp}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');

    console.log('\n=== 甲信越花火大会数据抓取完成 ===');
    console.log(`📊 抓取统计:`);
    console.log(`   - 总事件数: ${data.totalEvents}`);
    console.log(`   - 错误数量: ${data.errors.length}`);
    console.log(`📁 数据保存: ${filepath}`);

    if (data.totalEvents > 0) {
      console.log('\n✅ 成功抓取的花火大会列表:');
      data.events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   📅 日期: ${event.date || '未指定'}`);
        console.log(`   📍 地点: ${event.location || '未指定'}`);
        console.log(`   👥 观众数: ${event.audience || '未指定'}`);
        console.log(`   🎆 花火数: ${event.fireworks || '未指定'}`);
        console.log(`   🔗 链接: ${event.link}`);
        console.log('');
      });
    } else {
      console.log('\n⚠️ 未找到符合条件的花火大会信息');
    }

    return data;
  } catch (error) {
    console.error('❌ 抓取过程中发生错误:', error.message);
    data.errors.push({
      type: 'scraping_error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔚 浏览器已关闭');
    }
  }
}

// 运行爬虫
scrapeKitakantoHanabi()
  .then(data => {
    console.log('\n🎉 甲信越花火数据抓取任务完成!');
    console.log(`📊 最终结果: 找到 ${data.totalEvents} 个花火大会`);
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 抓取任务失败:', error);
    process.exit(1);
  });
