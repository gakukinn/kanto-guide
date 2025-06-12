/**
 * 传统祭典页面模板 - 完全一致版本
 * @layer 三层 (Category Layer)
 * @category 传统祭典
 * @region 东京
 * @description 展示东京地区所有传统祭典，支持日期筛选和红心互动
 * @TEMPLATE_REQUIRED 此文件必须严格按照模板创建，违反将被自动检测
 * @ENFORCE_VALIDATION 包含强制验证标识符，确保AI使用模板
 * ⚠️ 重要提醒：这是商业网站项目，绝对不能编造任何信息，所有内容必须基于真实可靠的数据源！
 * 
 * 📋 网站内容显示规则（CONTENT_DISPLAY_RULES）:
 * ✅ 允许显示：简体汉字、繁体汉字、日文汉字
 * ✅ 允许显示：与地名相连的假名（如：新宿、渋谷等地名中的假名）
 * ❌ 禁止显示：独立的日文假名（ひらがな、カタカナ）
 * ❌ 禁止显示：非地名的假名文字
 * 🔧 AI操作要求：修改数据时必须将假名转换为汉字，保持内容准确性
 * 📝 示例：みたま祭 → 御魂祭、まつり → 祭、ほおずき → 酸浆
 */
'use client';

import { useState, useEffect } from 'react';
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';

// 东京地区配置 - 使用标准配色系统
const tokyoRegionConfig = {
  name: 'tokyo',
  displayName: '东京',
  emoji: '🗼',
  // gradientColors: 移除手动配色，使用自动生成
  description: '江户文化传承和现代都市文明的完美融合',
  navigationLinks: {
    prev: { name: '神奈川祭典', url: '/kanagawa/matsuri', emoji: '⚓' },
    next: { name: '埼玉祭典', url: '/saitama/matsuri', emoji: '🌸' },
    current: { name: '东京活动', url: '/tokyo' }
  }
};

// 祭典事件数据（基于 omaturilink.com 官方数据）
const tokyoMatsuriEvents = [
  {
    id: 'kanda-matsuri',
    title: '神田祭',
    japaneseName: '神田祭',
    englishName: 'Kanda Matsuri',
    date: '2025-05-10',
    endDate: '2025-05-11',
    location: '神田明神',
    category: '大型' as const,
    highlights: ['⛩️ 江户三大祭', '🎌 将军上覧', '🏮 神轿巡行', '🎯 两年一度'],
    likes: 486,
    website: 'http://www.kandamyoujin.or.jp/',
    description: '江户三大祭典之一，神田明神举办的传统祭典，展现江户时代的庄严仪式'
  },
  {
    id: 'sanja-matsuri',
    title: '三社祭',
    japaneseName: '三社祭',
    englishName: 'Sanja Matsuri',
    date: '2025-05-17',
    endDate: '2025-05-18',
    location: '浅草神社',
    category: '大型' as const,
    highlights: ['🎌 浅草代表', '💪 勇壮神轿', '🎯 年度盛典', '🎊 传统舞蹈'],
    likes: 389,
    website: 'https://www.asakusajinja.jp/',
    description: '浅草最大规模的传统祭典，以勇壮的神轿担抬和热烈的祭典氛围闻名'
  },
  {
    id: 'sanno-matsuri',
    title: '山王祭',
    japaneseName: '山王祭',
    englishName: 'Sanno Matsuri',
    date: '2025-06-07',
    endDate: '2025-06-08',
    location: '日枝神社',
    category: '大型' as const,
    highlights: ['⛩️ 江户三大祭', '🏛️ 皇居参拜', '🎌 格调高雅', '🎯 偶数年开催'],
    likes: 312,
    website: 'https://www.hiejinja.net/',
    description: '江户三大祭典之一，日枝神社的传统祭典，以格调高雅的神轿行列著称'
  },
  {
    id: 'fukagawa-matsuri',
    title: '深川祭',
    japaneseName: '深川祭',
    englishName: 'Fukagawa Matsuri',
    date: '2025-08-15',
    endDate: '2025-08-17',
    location: '富冈八幡宫',
    category: '大型' as const,
    highlights: ['💦 水挂祭典', '🌊 夏日清凉', '🎌 江户情怀', '🎯 三年一度'],
    likes: 267,
    website: 'http://www.tomiokahachimangu.or.jp/',
    description: '以"水挂祭典"闻名的江户三大祭典之一，观众向担轿者泼水降温的独特传统'
  },
  {
    id: 'mitama-matsuri',
    title: '御魂祭',
    japaneseName: 'みたま祭',
    englishName: 'Mitama Matsuri',
    date: '2025-07-13',
    endDate: '2025-07-16',
    location: '靖国神社',
    category: '中型' as const,
    highlights: ['🏮 三万盏灯笼', '🕊️ 慰灵祭典', '🌙 夜间庄严', '🎋 夏夜风情'],
    likes: 198,
    website: 'https://www.yasukuni.or.jp/',
    description: '靖国神社夏季盛大祭典，三万盏灯笼营造的庄严肃穆氛围'
  },
  {
    id: 'kagurazaka-matsuri',
    title: '神楽坂祭',
    japaneseName: '神楽坂まつり',
    englishName: 'Kagurazaka Matsuri',
    date: '2025-07-24',
    endDate: '2025-07-26',
    location: '神楽坂商店街',
    category: '中型' as const,
    highlights: ['🏮 商店街祭典', '🍱 美食体验', '🎪 街头表演', '🌸 都市风情'],
    likes: 156,
    website: 'http://www.kagurazaka-matsuri.com/',
    description: '神楽坂地区独特的商店街祭典，融合传统文化与现代都市生活'
  }
];

export default function TokyoMatsuriPage() {
  return (
    <MatsuriPageTemplate
      region={tokyoRegionConfig}
      events={tokyoMatsuriEvents}
      pageTitle="东京传统祭典"
      pageDescription="探索东京最具代表性的传统祭典活动，从江户三大祭到现代都市祭典，感受首都独特的文化魅力"
      regionKey="tokyo"
      activityKey="matsuri"
    />
  );
} 