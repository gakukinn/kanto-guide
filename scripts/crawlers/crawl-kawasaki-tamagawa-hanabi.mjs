#!/usr/bin/env node
/**
 * 第84回 川崎市制記念多摩川花火大会信息爬虫
 * 使用Playwright+Cheerio+Crawlee技术
 * 目标URL: https://hanabi.walkerplus.com/detail/ar0314e182441/
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import { chromium } from 'playwright';

console.log('🚀 开始爬取第84回 川崎市制記念多摩川花火大会信息...');

const targetUrl = 'https://hanabi.walkerplus.com/detail/ar0314e182441/';
console.log(`📍 目标URL: ${targetUrl}`);

let browser;
try {
  console.log('🌐 启动浏览器...');
  browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  });

  const page = await context.newPage();

  console.log('🔗 访问目标URL...');
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('⏳ 等待页面完全加载...');
  await page.waitForTimeout(5000);

  console.log('📝 获取页面内容...');
  const html = await page.content();

  console.log('🔍 解析HTML...');
  const $ = cheerio.load(html);

  // 初始化信息对象
  const info = {
    crawledAt: new Date().toISOString(),
    sourceUrl: targetUrl,
    title: '',
    date: '',
    time: '',
    location: '',
    googleMaps: '',
    officialWebsite: '',
    expectedVisitors: '',
    fireworksCount: '',
    venue: '',
    address: '',
  };

  // 提取标题
  info.title =
    $('h1').first().text().trim() ||
    $('.event-title, .title').text().trim() ||
    $('title').text().trim();

  console.log(`标题: ${info.title}`);

  // 获取完整页面文本用于匹配
  const fullText = $('body').text();

  // 更精确的信息提取
  console.log('🔍 提取详细信息...');

  // 日期匹配
  const dateMatch = fullText.match(/(\d{4}年\d{1,2}月\d{1,2}日)/);
  if (dateMatch) {
    info.date = dateMatch[1];
  }

  // 时间匹配
  const timeMatch = fullText.match(/(\d{1,2}:\d{2}[～~-]\d{1,2}:\d{2})/);
  if (timeMatch) {
    info.time = timeMatch[1];
  }

  // 花火数匹配
  const fireworksMatch = fullText.match(/(約?\d+[,，]\d+発|約?\d+発)/);
  if (fireworksMatch) {
    info.fireworksCount = fireworksMatch[1];
  }

  // 观众数匹配
  const visitorsMatch = fullText.match(/(約?\d+[,，]?\d*万人)/);
  if (visitorsMatch) {
    info.expectedVisitors = visitorsMatch[1];
  }

  // 地点信息提取
  const locationMatch = fullText.match(
    /(神奈川県[^。\n]*川崎市[^。\n]*|川崎市[^。\n]*|多摩川[^。\n]*)/
  );
  if (locationMatch) {
    info.location = locationMatch[1];
  }

  // 查找地图链接
  $('a').each((i, elem) => {
    const href = $(elem).attr('href');
    if (
      href &&
      (href.includes('maps.google') || href.includes('goo.gl/maps'))
    ) {
      info.googleMaps = href;
      return false;
    }
  });

  // 查找官方网站
  $('a').each((i, elem) => {
    const href = $(elem).attr('href');
    const text = $(elem).text();
    if (
      href &&
      (text.includes('公式') ||
        text.includes('官方') ||
        href.includes('kawasaki') ||
        href.includes('city.kawasaki'))
    ) {
      if (!href.includes('walkerplus.com')) {
        info.officialWebsite = href;
        return false;
      }
    }
  });

  // 详细地址提取
  const addressMatch = fullText.match(/(神奈川県川崎市[^。\n]*)/);
  if (addressMatch) {
    info.address = addressMatch[1];
  }

  // 会场名称提取
  const venueMatch = fullText.match(/(多摩川[^。\n]*|川崎市[^。\n]*会場)/);
  if (venueMatch) {
    info.venue = venueMatch[1];
  }

  console.log('📊 提取结果:');
  console.log(`标题: ${info.title}`);
  console.log(`日期: ${info.date}`);
  console.log(`时间: ${info.time}`);
  console.log(`地点: ${info.location}`);
  console.log(`详细地址: ${info.address}`);
  console.log(`会场: ${info.venue}`);
  console.log(`谷歌地图: ${info.googleMaps}`);
  console.log(`官方连接: ${info.officialWebsite}`);
  console.log(`观众数: ${info.expectedVisitors}`);
  console.log(`花火数: ${info.fireworksCount}`);

  // 保存数据
  const outputDir = 'data/scraped-hanabi';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = `${outputDir}/kawasaki-tamagawa-hanabi-2025-crawled.json`;
  fs.writeFileSync(outputFile, JSON.stringify(info, null, 2));

  console.log(`💾 数据已保存到: ${outputFile}`);

  // 创建单独数据库
  const dbDir = 'data/databases';
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const database = {
    crawledAt: info.crawledAt,
    sourceUrl: info.sourceUrl,
    dataSource: 'WALKERPLUS_CRAWLED',
    eventInfo: {
      title: info.title,
      date: info.date,
      time: info.time,
      location: info.location || info.address || info.venue,
      googleMaps: info.googleMaps,
      officialWebsite: info.officialWebsite,
      expectedVisitors: info.expectedVisitors,
      fireworksCount: info.fireworksCount,
    },
    dataIntegrity: {
      crawledSuccessfully: true,
      lastUpdated: info.crawledAt,
      verificationMethod: 'PLAYWRIGHT_CHEERIO_CRAWLEE',
    },
  };

  const dbFile = `${dbDir}/kawasaki-tamagawa-hanabi-2025.db`;
  fs.writeFileSync(dbFile, JSON.stringify(database, null, 2));
  console.log(`🗃️ 数据库已创建: ${dbFile}`);

  // 生成数据库报告
  console.log('\n📋 第84回 川崎市制記念多摩川花火大会 信息汇报');
  console.log('='.repeat(60));
  console.log(`1. 日期: ${info.date || '未获取到'}`);
  console.log(`2. 时间: ${info.time || '未获取到'}`);
  console.log(
    `3. 地点: ${info.location || info.address || info.venue || '未获取到'}`
  );
  console.log(`4. 谷歌地图: ${info.googleMaps || '未获取到'}`);
  console.log(`5. 官方连接: ${info.officialWebsite || '未获取到'}`);
  console.log(`6. 观众数: ${info.expectedVisitors || '未获取到'}`);
  console.log(`7. 花火数: ${info.fireworksCount || '未获取到'}`);
  console.log('='.repeat(60));

  // 数据完整性检查
  const requiredFields = [
    'date',
    'time',
    'location',
    'expectedVisitors',
    'fireworksCount',
  ];
  const obtainedFields = requiredFields.filter(
    field =>
      info[field] || (field === 'location' && (info.address || info.venue))
  );
  const missingFields = requiredFields.filter(
    field =>
      !info[field] && !(field === 'location' && (info.address || info.venue))
  );

  console.log(
    `\n✅ 已获取字段 (${obtainedFields.length}/7): ${obtainedFields.join(', ')}`
  );
  if (missingFields.length > 0) {
    console.log(
      `⚠️  缺失字段 (${missingFields.length}/7): ${missingFields.join(', ')}`
    );
  }

  console.log('\n🎯 数据库信息以此为准，禁止推理生成信息！');
} catch (error) {
  console.error('❌ 爬取失败:', error);
} finally {
  if (browser) {
    await browser.close();
    console.log('🔒 浏览器已关闭');
  }
}

console.log('🎯 爬取任务完成！');
