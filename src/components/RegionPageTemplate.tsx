'use client';

import FeaturedActivities from '@/components/FeaturedActivities';
import Link from 'next/link';

interface RegionConfig {
  name: string;
  emoji: string;
  bgColor: string;
  themeColor: string;
  prevRegion: {
    name: string;
    path: string;
    emoji: string;
    bgColor: string;
  };
  nextRegion: {
    name: string;
    path: string;
    emoji: string;
    bgColor: string;
  };
  featuredActivities: Array<{
    id: string;
    title: string;
    description: string;
    emoji: string;
    bgColor: string;
    detailLink?: string;
    imageUrl?: string;
  }>;
}

// 活动类型配置
const activityTypes = {
  matsuri: {
    name: '传统祭典',
    emoji: '🏮',
    description: '传统祭典庆典，感受文化魅力',
    bgColor: 'from-red-100 via-rose-100 to-red-200',
    borderColor: 'border-red-300',
  },
  hanami: {
    name: '花见会',
    emoji: '🌸',
    description: '春日樱花盛开，诗意赏花之旅',
    bgColor: 'from-pink-100 via-rose-100 to-pink-200',
    borderColor: 'border-pink-300',
  },
  hanabi: {
    name: '花火大会',
    emoji: '🎆',
    description: '夏夜绚烂烟花，璀璨夜空盛宴',
    bgColor: 'from-blue-100 via-sky-100 to-blue-200',
    borderColor: 'border-blue-300',
  },
  culture: {
    name: '文化艺术',
    emoji: '🎨',
    description: '深度文化体验，艺术品味之旅',
    bgColor: 'from-teal-100 via-cyan-100 to-teal-200',
    borderColor: 'border-teal-300',
  },
  momiji: {
    name: '红叶狩',
    emoji: '🍁',
    description: '秋日红叶如画，层林尽染之美',
    bgColor: 'from-orange-100 via-amber-100 to-yellow-200',
    borderColor: 'border-orange-300',
  },
  illumination: {
    name: '灯光秀',
    emoji: '✨',
    description: '璀璨灯光艺术，梦幻夜景体验',
    bgColor: 'from-purple-100 via-violet-100 to-purple-200',
    borderColor: 'border-purple-300',
  },
};

// 地区标题渐变色配置
const getRegionTitleGradient = (regionKey: string) => {
  const gradients = {
    tokyo: 'from-red-600 via-rose-500 to-orange-600',
    saitama: 'from-orange-600 via-amber-500 to-red-600',
    chiba: 'from-sky-600 via-cyan-500 to-blue-600',
    kanagawa: 'from-blue-600 via-blue-500 to-cyan-600',
    kitakanto: 'from-green-600 via-emerald-500 to-blue-600',
    koshinetsu: 'from-purple-600 via-violet-500 to-blue-600',
  };

  return gradients[regionKey as keyof typeof gradients] || gradients.tokyo;
};

// 地区循环导航配置
const getRegionNavigation = (regionKey: string) => {
  const regionCycle = [
    { key: 'tokyo', name: '东京都', emoji: '🗼', href: '/tokyo' },
    { key: 'saitama', name: '埼玉县', emoji: '🌸', href: '/saitama' },
    { key: 'chiba', name: '千叶县', emoji: '🌊', href: '/chiba' },
    { key: 'kanagawa', name: '神奈川', emoji: '⛵', href: '/kanagawa' },
    { key: 'kitakanto', name: '北关东', emoji: '🏔️', href: '/kitakanto' },
    { key: 'koshinetsu', name: '甲信越', emoji: '⛰️', href: '/koshinetsu' },
  ];

  const currentIndex = regionCycle.findIndex(
    region => region.key === regionKey
  );

  if (currentIndex === -1) {
    return {
      prev: {
        name: '甲信越',
        href: '/koshinetsu',
        emoji: '⛰️',
        key: 'koshinetsu',
      },
      current: { name: '东京都', emoji: '🗼', key: 'tokyo' },
      next: { name: '埼玉县', href: '/saitama', emoji: '🌸', key: 'saitama' },
    };
  }

  const prevIndex =
    (currentIndex - 1 + regionCycle.length) % regionCycle.length;
  const nextIndex = (currentIndex + 1) % regionCycle.length;

  const prevRegion = regionCycle[prevIndex];
  const currentRegion = regionCycle[currentIndex];
  const nextRegion = regionCycle[nextIndex];

  return {
    prev: {
      name: prevRegion.name,
      href: prevRegion.href,
      emoji: prevRegion.emoji,
      key: prevRegion.key,
    },
    current: {
      name: currentRegion.name,
      emoji: currentRegion.emoji,
      key: currentRegion.key,
    },
    next: {
      name: nextRegion.name,
      href: nextRegion.href,
      emoji: nextRegion.emoji,
      key: nextRegion.key,
    },
  };
};

// 地区背景色配置
const getRegionBgColor = (regionKey: string) => {
  const bgColors = {
    tokyo: 'bg-gradient-to-br from-red-50 to-rose-100',
    saitama: 'bg-gradient-to-br from-orange-50 to-amber-100',
    chiba: 'bg-gradient-to-br from-sky-50 to-cyan-100',
    kanagawa: 'bg-gradient-to-br from-blue-100 to-blue-200',
    kitakanto: 'bg-gradient-to-br from-green-50 to-emerald-100',
    koshinetsu: 'bg-gradient-to-br from-purple-50 to-violet-100',
  };

  return bgColors[regionKey as keyof typeof bgColors] || bgColors.tokyo;
};

interface RegionPageTemplateProps {
  regionKey: string;
  config: RegionConfig;
}

export default function RegionPageTemplate({
  regionKey,
  config,
}: RegionPageTemplateProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${config.bgColor} relative overflow-hidden`}
    >
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white/30 blur-xl"></div>
        <div className="absolute right-20 top-1/4 h-24 w-24 animate-pulse rounded-full bg-white/20 blur-lg delay-1000"></div>
        <div className="delay-2000 absolute bottom-1/4 left-1/4 h-40 w-40 animate-pulse rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 h-28 w-28 animate-pulse rounded-full bg-white/25 blur-xl delay-500"></div>
      </div>

      {/* 面包屑导航 */}
      <nav className="relative z-20 pb-2 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-blue-600"
            >
              🏠 首页
            </Link>
            <span className="text-gray-400">›</span>
            <span className="font-medium text-blue-600">
              {config.emoji} {config.name}活动
            </span>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 标题区域 */}
        <section className="bg-gradient-to-b from-white/60 to-white/40 pb-8 pt-12 text-center backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-center space-x-10">
              <div className="transform text-8xl drop-shadow-2xl filter transition-transform duration-300 hover:scale-110 hover:brightness-110">
                {config.emoji}
              </div>
              <div>
                <h1
                  className={`mb-4 bg-gradient-to-r text-6xl font-bold tracking-tight md:text-7xl ${getRegionTitleGradient(regionKey)} bg-clip-text text-transparent drop-shadow-lg`}
                >
                  {config.name} 活动指南
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* 热门推荐区域 - 移动到顶部 */}
        <FeaturedActivities
          region={config.name}
          activities={config.featuredActivities}
        />

        {/* 活动类型选择 */}
        <section className="bg-gradient-to-b from-white/30 to-white/20 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold tracking-wide text-gray-800">
                选择您感兴趣的活动类型
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                {config.name}
                为您提供丰富多彩的活动体验，每一种都承载着独特的文化魅力
              </p>
            </div>

            {/* 活动类型网格 */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(activityTypes).map(([key, activity]) => (
                <Link
                  key={key}
                  href={
                    key === 'hanabi' && regionKey === 'tokyo'
                      ? '/tokyo/hanabi'
                      : `/${regionKey}/${key}`
                  }
                  className="group block"
                >
                  <div
                    className={`relative rounded-3xl bg-gradient-to-br p-10 ${activity.bgColor} hover:shadow-3xl transform cursor-pointer overflow-hidden border-2 ${activity.borderColor} shadow-2xl shadow-black/10 backdrop-blur-sm transition-all duration-500 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:-translate-y-3 hover:rotate-1 hover:scale-110 hover:shadow-black/20 hover:before:opacity-100`}
                  >
                    {/* 内容 */}
                    <div className="relative z-10 text-center">
                      <div className="mb-8 transform text-8xl drop-shadow-2xl filter transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 group-hover:brightness-110">
                        {activity.emoji}
                      </div>
                      <h3
                        className={`mb-6 text-3xl font-bold text-gray-800 group-hover:text-${config.themeColor}-600 leading-tight tracking-wide transition-all duration-300 group-hover:scale-105`}
                      >
                        {activity.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 快速导航 - 地区循环 */}
        <section className="bg-gradient-to-b from-white/20 to-white/10 py-12 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold text-gray-800">探索其他地区</h3>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {/* 上一个地区 */}
              <Link
                href={getRegionNavigation(regionKey).prev.href}
                className={`group flex items-center space-x-3 rounded-xl border-2 border-gray-300/60 px-6 py-4 shadow-md transition-all duration-300 hover:shadow-lg ${getRegionBgColor(getRegionNavigation(regionKey).prev.key)}`}
              >
                <div className="text-2xl">
                  {getRegionNavigation(regionKey).prev.emoji}
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-700">← 上一个</div>
                  <div className="font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                    {getRegionNavigation(regionKey).prev.name}
                  </div>
                </div>
              </Link>

              {/* 当前地区 */}
              <div
                className={`flex items-center space-x-3 bg-gradient-to-br ${config.bgColor} rounded-xl border-2 border-gray-300/60 px-8 py-4`}
              >
                <div className="text-3xl">{config.emoji}</div>
                <div className="text-center">
                  <div className={`text-sm text-${config.themeColor}-600`}>
                    当前位置
                  </div>
                  <div className={`font-bold text-${config.themeColor}-700`}>
                    {config.name}
                  </div>
                </div>
              </div>

              {/* 下一个地区 */}
              <Link
                href={getRegionNavigation(regionKey).next.href}
                className={`group flex items-center space-x-3 rounded-xl border-2 border-gray-300/60 px-6 py-4 shadow-md transition-all duration-300 hover:shadow-lg ${getRegionBgColor(getRegionNavigation(regionKey).next.key)}`}
              >
                <div className="text-2xl">
                  {getRegionNavigation(regionKey).next.emoji}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700">下一个 →</div>
                  <div className="font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                    {getRegionNavigation(regionKey).next.name}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
