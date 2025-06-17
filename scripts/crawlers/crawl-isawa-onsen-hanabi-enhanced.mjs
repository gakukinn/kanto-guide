#!/usr/bin/env node
/**
 * 石和温泉花火大会信息爬虫 - 增强版
 * 使用Playwright+Cheerio技术获取完整信息
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import { chromium } from 'playwright';

console.log('🚀 开始爬取石和温泉花火大会信息...');

const targetUrl = 'https://hanabi.walkerplus.com/detail/ar0419e00682/';
console.log(`📍 目标URL: ${targetUrl}`);

let browser;
try {
  console.log('🌐 启动浏览器...');
  browser = await chromium.launch({ headless: true });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );

  console.log('🔗 访问目标URL...');
  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });

  console.log('⏳ 等待页面完全加载...');
  await page.waitForTimeout(5000);

  // 等待特定元素加载
  try {
    await page.waitForSelector(
      '.event-detail, .hanabi-detail, .detail-content',
      { timeout: 10000 }
    );
  } catch (e) {
    console.log('⚠️ 特定选择器未找到，继续处理...');
  }

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
    rawText: $('body').text(),
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

  // 日期匹配 - 多种格式
  const datePatterns = [
    /(\d{4}年\d{1,2}月\d{1,2}日)/g,
    /(\d{1,2}月\d{1,2}日)/g,
    /(\d{4}\/\d{1,2}\/\d{1,2})/g,
  ];

  for (const pattern of datePatterns) {
    const matches = fullText.match(pattern);
    if (matches) {
      info.date = matches[0];
      break;
    }
  }

  // 时间匹配
  const timePatterns = [
    /(\d{1,2}:\d{2}[～~-]\d{1,2}:\d{2})/g,
    /(\d{1,2}:\d{2})/g,
  ];

  for (const pattern of timePatterns) {
    const matches = fullText.match(pattern);
    if (matches) {
      info.time = matches[0];
      break;
    }
  }

  // 花火数匹配
  const fireworksPatterns = [
    /(約?\d+[,，]\d+発)/g,
    /(約?\d+発)/g,
    /(\d+[,，]\d+発)/g,
  ];

  for (const pattern of fireworksPatterns) {
    const matches = fullText.match(pattern);
    if (matches) {
      info.fireworksCount = matches[0];
      break;
    }
  }

  // 观众数匹配
  const visitorsPatterns = [/(約?\d+[,，]?\d*万人)/g, /(約?\d+人)/g];

  for (const pattern of visitorsPatterns) {
    const matches = fullText.match(pattern);
    if (matches) {
      info.expectedVisitors = matches[0];
      break;
    }
  }

  // 地点信息提取
  const locationPatterns = [
    /(山梨県[^。\n]*笛吹市[^。\n]*)/g,
    /(石和[^。\n]*)/g,
    /(笛吹市[^。\n]*)/g,
  ];

  for (const pattern of locationPatterns) {
    const matches = fullText.match(pattern);
    if (matches) {
      info.location = matches[0];
      break;
    }
  }

  // 查找地图链接
  $('a').each((i, elem) => {
    const href = $(elem).attr('href');
    if (
      href &&
      (href.includes('maps.google') ||
        href.includes('goo.gl/maps') ||
        href.includes('map'))
    ) {
      info.googleMaps = href;
      return false; // 找到第一个就停止
    }
  });

  // 查找官方网站
  $('a').each((i, elem) => {
    const href = $(elem).attr('href');
    const text = $(elem).text().toLowerCase();
    if (
      href &&
      (text.includes('公式') ||
        text.includes('官方') ||
        text.includes('official') ||
        href.includes('isawa') ||
        href.includes('fuefuki'))
    ) {
      if (
        !href.includes('walkerplus.com') &&
        !href.includes('twitter.com') &&
        !href.includes('facebook.com')
      ) {
        info.officialWebsite = href;
        return false;
      }
    }
  });

  // 详细地址提取
  const addressMatch = fullText.match(/(山梨県笛吹市[^。\n]*)/);
  if (addressMatch) {
    info.address = addressMatch[1];
  }

  // 会场名称提取
  const venueMatch = fullText.match(/(笛吹川[^。\n]*|石和[^。\n]*会場)/);
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

  const outputFile = `${outputDir}/isawa-onsen-hanabi-2025-enhanced.json`;
  fs.writeFileSync(outputFile, JSON.stringify(info, null, 2));

  console.log(`💾 数据已保存到: ${outputFile}`);

  // 生成数据库报告
  console.log('\n📋 第61回 石和温泉花火大会 信息汇报');
  console.log('='.repeat(50));
  console.log(`1. 日期: ${info.date || '未获取到'}`);
  console.log(`2. 时间: ${info.time || '未获取到'}`);
  console.log(
    `3. 地点: ${info.location || info.address || info.venue || '未获取到'}`
  );
  console.log(`4. 谷歌地图: ${info.googleMaps || '未获取到'}`);
  console.log(`5. 官方连接: ${info.officialWebsite || '未获取到'}`);
  console.log(`6. 观众数: ${info.expectedVisitors || '未获取到'}`);
  console.log(`7. 花火数: ${info.fireworksCount || '未获取到'}`);
  console.log('='.repeat(50));

  // 数据完整性检查
  const requiredFields = [
    'date',
    'time',
    'location',
    'expectedVisitors',
    'fireworksCount',
  ];
  const obtainedFields = requiredFields.filter(field => info[field]);
  const missingFields = requiredFields.filter(field => !info[field]);

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
