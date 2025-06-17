#!/usr/bin/env node
/**
 * 石和温泉花火大会信息爬虫
 * 使用Playwright+Cheerio+Crawlee技术
 * 目标URL: https://hanabi.walkerplus.com/detail/ar0419e00682/
 *
 * 获取信息：
 * 1. 日期
 * 2. 时间
 * 3. 地点
 * 4. 谷歌地图
 * 5. 官方连接
 * 6. 观众数
 * 7. 花火数
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

// 配置
const CONFIG = {
  targetUrl: 'https://hanabi.walkerplus.com/detail/ar0419e00682/',
  outputDir: 'data/scraped-hanabi',
  outputFile: 'isawa-onsen-hanabi-2025-crawled.json',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

// 确保输出目录存在
function ensureOutputDir() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
}

// 提取信息的辅助函数
function extractInfo($) {
  const info = {
    crawledAt: new Date().toISOString(),
    sourceUrl: CONFIG.targetUrl,
    title: '',
    date: '',
    time: '',
    location: '',
    googleMaps: '',
    officialWebsite: '',
    expectedVisitors: '',
    fireworksCount: '',
    rawData: {},
  };

  try {
    // 提取标题
    info.title =
      $('h1').first().text().trim() ||
      $('.event-title').text().trim() ||
      $('title').text().trim();

    // 提取基本信息
    $('.event-info, .hanabi-info, .detail-info').each((i, elem) => {
      const $elem = $(elem);
      const text = $elem.text();

      // 日期匹配
      const dateMatch = text.match(
        /(\d{4}年\d{1,2}月\d{1,2}日|\d{4}\/\d{1,2}\/\d{1,2}|\d{1,2}月\d{1,2}日)/
      );
      if (dateMatch && !info.date) {
        info.date = dateMatch[1];
      }

      // 时间匹配
      const timeMatch = text.match(
        /(\d{1,2}:\d{2}[～~-]\d{1,2}:\d{2}|\d{1,2}:\d{2})/
      );
      if (timeMatch && !info.time) {
        info.time = timeMatch[1];
      }

      // 花火数匹配
      const fireworksMatch = text.match(/(約?\d+[,，]\d+発|約?\d+発)/);
      if (fireworksMatch && !info.fireworksCount) {
        info.fireworksCount = fireworksMatch[1];
      }

      // 观众数匹配
      const visitorsMatch = text.match(/(約?\d+[,，]?\d*万人|約?\d+人)/);
      if (visitorsMatch && !info.expectedVisitors) {
        info.expectedVisitors = visitorsMatch[1];
      }
    });

    // 提取地点信息
    $('.venue, .location, .address').each((i, elem) => {
      const $elem = $(elem);
      const text = $elem.text().trim();
      if (text && !info.location) {
        info.location = text;
      }
    });

    // 查找地图链接
    $('a[href*="maps.google"], a[href*="goo.gl/maps"], a[href*="map"]').each(
      (i, elem) => {
        const href = $(elem).attr('href');
        if (href && !info.googleMaps) {
          info.googleMaps = href;
        }
      }
    );

    // 查找官方网站
    $('a[href*="http"]').each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().toLowerCase();
      if (
        href &&
        (text.includes('公式') ||
          text.includes('官方') ||
          text.includes('official') ||
          text.includes('website'))
      ) {
        if (!info.officialWebsite) {
          info.officialWebsite = href;
        }
      }
    });

    // 收集所有表格数据
    $('table, .info-table, .event-table').each((i, table) => {
      $(table)
        .find('tr')
        .each((j, row) => {
          const $row = $(row);
          const cells = $row
            .find('td, th')
            .map((k, cell) => $(cell).text().trim())
            .get();
          if (cells.length >= 2) {
            info.rawData[`table_${i}_row_${j}`] = cells;
          }
        });
    });

    // 收集定义列表数据
    $('dl, .definition-list').each((i, dl) => {
      $(dl)
        .find('dt')
        .each((j, dt) => {
          const $dt = $(dt);
          const $dd = $dt.next('dd');
          if ($dd.length) {
            const key = $dt.text().trim();
            const value = $dd.text().trim();
            info.rawData[`dl_${key}`] = value;
          }
        });
    });
  } catch (error) {
    console.error('信息提取错误:', error);
  }

  return info;
}

// 主要爬虫函数
async function crawlIsawaOnsenHanabi() {
  console.log('🚀 开始爬取石和温泉花火大会信息...');
  console.log(`📍 目标URL: ${CONFIG.targetUrl}`);

  let browser;
  try {
    // 启动浏览器
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      userAgent: CONFIG.userAgent,
      viewport: { width: 1920, height: 1080 },
    });

    const page = await context.newPage();

    // 设置请求拦截（可选，用于性能优化）
    await page.route('**/*', route => {
      const resourceType = route.request().resourceType();
      if (['image', 'stylesheet', 'font'].includes(resourceType)) {
        route.abort();
      } else {
        route.continue();
      }
    });

    console.log('🌐 正在访问页面...');
    await page.goto(CONFIG.targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // 等待页面加载完成
    await page.waitForTimeout(3000);

    // 获取页面HTML
    const html = await page.content();
    console.log('✅ 页面加载完成');

    // 使用Cheerio解析HTML
    const $ = cheerio.load(html);
    console.log('🔍 开始提取信息...');

    // 提取信息
    const extractedInfo = extractInfo($);

    console.log('📊 提取结果:');
    console.log(`标题: ${extractedInfo.title}`);
    console.log(`日期: ${extractedInfo.date}`);
    console.log(`时间: ${extractedInfo.time}`);
    console.log(`地点: ${extractedInfo.location}`);
    console.log(`谷歌地图: ${extractedInfo.googleMaps}`);
    console.log(`官方连接: ${extractedInfo.officialWebsite}`);
    console.log(`观众数: ${extractedInfo.expectedVisitors}`);
    console.log(`花火数: ${extractedInfo.fireworksCount}`);

    // 保存数据
    ensureOutputDir();
    const outputPath = path.join(CONFIG.outputDir, CONFIG.outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(extractedInfo, null, 2));
    console.log(`💾 数据已保存到: ${outputPath}`);

    return extractedInfo;
  } catch (error) {
    console.error('❌ 爬取失败:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 生成数据库报告
function generateReport(data) {
  console.log('\n📋 第61回 石和温泉花火大会 信息汇报');
  console.log('='.repeat(50));
  console.log(`1. 日期: ${data.date || '未获取到'}`);
  console.log(`2. 时间: ${data.time || '未获取到'}`);
  console.log(`3. 地点: ${data.location || '未获取到'}`);
  console.log(`4. 谷歌地图: ${data.googleMaps || '未获取到'}`);
  console.log(`5. 官方连接: ${data.officialWebsite || '未获取到'}`);
  console.log(`6. 观众数: ${data.expectedVisitors || '未获取到'}`);
  console.log(`7. 花火数: ${data.fireworksCount || '未获取到'}`);
  console.log('='.repeat(50));

  // 验证数据完整性
  const requiredFields = [
    'date',
    'time',
    'location',
    'expectedVisitors',
    'fireworksCount',
  ];
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
    console.log(`⚠️  缺失信息: ${missingFields.join(', ')}`);
    console.log('💡 建议: 检查页面结构或调整提取逻辑');
  } else {
    console.log('✅ 所有必要信息已获取完整');
  }
}

// 主函数
async function main() {
  try {
    const data = await crawlIsawaOnsenHanabi();
    generateReport(data);

    console.log('\n🎯 爬取任务完成！');
    console.log('📄 数据已保存，可用于核实四层页面信息');
  } catch (error) {
    console.error('💥 任务失败:', error.message);
    process.exit(1);
  }
}

// 错误处理
process.on('uncaughtException', error => {
  console.error('❌ 未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未处理的Promise拒绝:', reason);
  process.exit(1);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { crawlIsawaOnsenHanabi, extractInfo };
