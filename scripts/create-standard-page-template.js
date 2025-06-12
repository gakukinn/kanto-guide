#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 标准第四层页面模板
const level4Template = (region, month) => `/**
 * 第四层页面 - ${month}月${region}花火大会
 * @layer 四层 (Regional Layer)
 * @month ${month}月
 * @region ${region}
 * @type 地区花火页面
 * @path /${month}/hanabi/${region.toLowerCase()}
 * @description 展示${month}月${region}地区所有花火大会列表，包含查看详情链接
 */
'use client';

import RegionalHanabiTemplate from '@/components/RegionalHanabiTemplate';
import { events, regionInfo, monthInfo } from '@/data/level4-${month}-${region.toLowerCase()}-hanabi';

export default function ${region}${month}HanabiPage() {
 return (
 <RegionalHanabiTemplate 
 events={events}
 regionInfo={regionInfo}
 monthInfo={monthInfo}
 />
 );
}`;

// 标准第五层页面模板
const level5Template = (event, region, month) => `/**
 * 第五层页面 - ${event}详情
 * @layer 五层 (Detail Layer)
 * @month ${month}月
 * @region ${region}
 * @event ${event}
 * @type 花火详情页面
 * @path /${month}/hanabi/${region.toLowerCase()}/${event}
 * @description ${event}完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ${event}Data } from '@/data/level5-${month}-hanabi-${event}';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: '${event} - ${region}花火指南',
 description: '${event}详细信息...',
 keywords: '${event},${region}花火,花火大会',
};

export default function ${event}Page() {
 return (
 <HanabiDetailTemplate 
 data={${event}Data} 
 regionKey="${region.toLowerCase()}"
 />
 );
}`;

// 模板验证规则
const validationRules = {
  level4: [
    { rule: /^'use client';/, message: "第四层页面必须使用'use client'" },
    { rule: /import RegionalHanabiTemplate/, message: "必须导入RegionalHanabiTemplate" },
    { rule: /export const metadata/, message: "第四层页面不能导出metadata", shouldNotExist: true },
    { rule: /regionInfo, monthInfo/, message: "必须导入regionInfo和monthInfo" }
  ],
  level5: [
    { rule: /import HanabiDetailTemplate/, message: "必须导入HanabiDetailTemplate" },
    { rule: /export const metadata/, message: "第五层页面必须导出metadata" },
    { rule: /'use client'/, message: "第五层页面不应使用'use client'", shouldNotExist: true },
    { rule: /regionKey=/, message: "必须指定regionKey属性" }
  ]
};

function validatePageTemplate(content, level) {
  const rules = validationRules[level];
  const errors = [];
  
  rules.forEach(({ rule, message, shouldNotExist }) => {
    const match = rule.test(content);
    if (shouldNotExist && match) {
      errors.push(`❌ ${message}`);
    } else if (!shouldNotExist && !match) {
      errors.push(`❌ ${message}`);
    }
  });
  
  return errors;
}

function createPage(type, options) {
  const { region, month, event } = options;
  
  let template, filename, validation;
  
  if (type === 'level4') {
    template = level4Template(region, month);
    filename = `src/app/${month}/hanabi/${region.toLowerCase()}/page.tsx`;
    validation = validatePageTemplate(template, 'level4');
  } else if (type === 'level5') {
    template = level5Template(event, region, month);
    filename = `src/app/${month}/hanabi/${region.toLowerCase()}/${event}/page.tsx`;
    validation = validatePageTemplate(template, 'level5');
  }
  
  if (validation.length > 0) {
    console.error(`❌ 模板验证失败:`);
    validation.forEach(error => console.error(error));
    return false;
  }
  
  // 确保目录存在
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(filename, template);
  console.log(`✅ 创建页面: ${filename}`);
  return true;
}

module.exports = { createPage, validatePageTemplate, validationRules };

if (require.main === module) {
  console.log(`📝 标准化页面模板系统已创建`);
  console.log(`使用方法:`);
  console.log(`const { createPage } = require('./create-standard-page-template');`);
  console.log(`createPage('level4', { region: '千叶', month: 'july' });`);
} 