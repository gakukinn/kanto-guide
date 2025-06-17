#!/usr/bin/env node
/**
 * 石和温泉花火大会信息爬虫 - 简化版
 * 使用Playwright+Cheerio技术
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
  browser = await chromium.launch({ headless: false }); // 设为false以便调试

  console.log('📄 创建页面...');
  const page = await browser.newPage();

  console.log('🔗 访问目标URL...');
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log('⏳ 等待页面加载...');
  await page.waitForTimeout(5000);

  console.log('📝 获取页面内容...');
  const html = await page.content();

  console.log('🔍 解析HTML...');
  const $ = cheerio.load(html);

  // 提取信息
  const info = {
    crawledAt: new Date().toISOString(),
    sourceUrl: targetUrl,
    title: $('h1').first().text().trim() || $('title').text().trim(),
    pageText: $('body').text().substring(0, 1000), // 获取前1000字符用于调试
  };

  console.log('📊 提取结果:');
  console.log(`标题: ${info.title}`);
  console.log(`页面内容片段: ${info.pageText.substring(0, 200)}...`);

  // 查找特定信息
  const bodyText = $('body').text();

  // 日期匹配
  const dateMatch = bodyText.match(
    /(\d{4}年\d{1,2}月\d{1,2}日|\d{1,2}月\d{1,2}日)/
  );
  if (dateMatch) {
    info.date = dateMatch[1];
    console.log(`日期: ${info.date}`);
  }

  // 时间匹配
  const timeMatch = bodyText.match(
    /(\d{1,2}:\d{2}[～~-]\d{1,2}:\d{2}|\d{1,2}:\d{2})/
  );
  if (timeMatch) {
    info.time = timeMatch[1];
    console.log(`时间: ${info.time}`);
  }

  // 花火数匹配
  const fireworksMatch = bodyText.match(/(約?\d+[,，]\d+発|約?\d+発)/);
  if (fireworksMatch) {
    info.fireworksCount = fireworksMatch[1];
    console.log(`花火数: ${info.fireworksCount}`);
  }

  // 观众数匹配
  const visitorsMatch = bodyText.match(/(約?\d+[,，]?\d*万人|約?\d+人)/);
  if (visitorsMatch) {
    info.expectedVisitors = visitorsMatch[1];
    console.log(`观众数: ${info.expectedVisitors}`);
  }

  // 地点匹配
  const locationMatch = bodyText.match(/(山梨県[^。\n]*|石和[^。\n]*)/);
  if (locationMatch) {
    info.location = locationMatch[1];
    console.log(`地点: ${info.location}`);
  }

  // 保存数据
  const outputDir = 'data/scraped-hanabi';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = `${outputDir}/isawa-onsen-hanabi-2025-crawled.json`;
  fs.writeFileSync(outputFile, JSON.stringify(info, null, 2));

  console.log(`💾 数据已保存到: ${outputFile}`);

  // 生成报告
  console.log('\n📋 第61回 石和温泉花火大会 信息汇报');
  console.log('='.repeat(50));
  console.log(`1. 日期: ${info.date || '未获取到'}`);
  console.log(`2. 时间: ${info.time || '未获取到'}`);
  console.log(`3. 地点: ${info.location || '未获取到'}`);
  console.log(`4. 谷歌地图: 未获取到`);
  console.log(`5. 官方连接: 未获取到`);
  console.log(`6. 观众数: ${info.expectedVisitors || '未获取到'}`);
  console.log(`7. 花火数: ${info.fireworksCount || '未获取到'}`);
  console.log('='.repeat(50));
} catch (error) {
  console.error('❌ 爬取失败:', error);
} finally {
  if (browser) {
    await browser.close();
    console.log('🔒 浏览器已关闭');
  }
}

console.log('🎯 爬取任务完成！');
