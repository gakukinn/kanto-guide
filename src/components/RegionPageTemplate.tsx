'use client';

import Link from 'next/link';
import FeaturedActivities from '@/components/FeaturedActivities';

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
  }>;
}

// 活动类型配置（统一配置）
const activityTypes = {
  matsuri: {
    name: '传统祭典',
    emoji: '🏮',
    description: '神社祭典与传统文化体验',
    color: 'from-red-50 to-red-100 border-red-200/60'
  },
  hanami: {
    name: '花見会',
    emoji: '🌸',
    description: '春季赏花聚会体验',
    color: 'from-pink-50 to-pink-100 border-pink-200/60'
  },
  hanabi: {
    name: '花火大会',
    emoji: '🎆',
    description: '夏季烟花节庆的璀璨夜空',
    color: 'from-blue-50 to-blue-100 border-blue-200/60'
  },
  culture: {
    name: '文化艺术',
    emoji: '🎨',
    description: '美术馆博物馆精彩展览',
    color: 'from-green-50 to-green-100 border-green-200/60'
  },
  momiji: {
    name: '红叶狩',
    emoji: '🍁',
    description: '秋季红叶观赏的传统活动',
    color: 'from-orange-50 to-orange-100 border-orange-200/60'
  },
  illumination: {
    name: '灯光秀',
    emoji: '✨',
    description: '点灯活动与夜间灯光秀',
    color: 'from-purple-50 to-purple-100 border-purple-200/60'
  }
};

interface RegionPageTemplateProps {
  regionKey: string;
  config: RegionConfig;
}

export default function RegionPageTemplate({ regionKey, config }: RegionPageTemplateProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} relative overflow-hidden`}>
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-white/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/25 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 标题区域 */}
        <section className="pt-16 pb-16 text-center bg-gradient-to-b from-white/50 to-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-10 mb-10">
              <div className="text-8xl drop-shadow-2xl transform hover:scale-110 transition-transform duration-300 filter hover:brightness-110">{config.emoji}</div>
              <div>
                <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4 drop-shadow-lg tracking-tight">
                  {config.name} <span className={`text-${config.themeColor}-600 bg-gradient-to-r from-${config.themeColor}-500 to-${config.themeColor}-700 bg-clip-text text-transparent`}>活动指南</span>
                </h1>
              </div>
            </div>
            
            {/* 面包屑导航 */}
            <nav className="flex justify-center items-center space-x-2 text-gray-600">
              <Link href="/" className={`hover:text-${config.themeColor}-600 transition-colors`}>
                关东旅游指南
              </Link>
              <span>›</span>
              <span className={`text-${config.themeColor}-600 font-medium`}>{config.name}</span>
            </nav>
          </div>
        </section>

        {/* 活动类型选择 */}
        <section className="py-16 bg-gradient-to-b from-white/40 to-white/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-wide">选择您感兴趣的活动类型</h2>
              <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">{config.name}为您提供丰富多彩的活动体验，每一种都承载着独特的文化魅力</p>
            </div>
            
            {/* 活动类型网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Object.entries(activityTypes).map(([key, activity]) => (
                <Link
                  key={key}
                  href={key === 'hanabi' && regionKey === 'tokyo' ? '/tokyo/hanabi' : `/${regionKey}/${key}`}
                  className="group block"
                >
                  <div className={`
                    relative p-10 rounded-3xl bg-gradient-to-br ${activity.color}
                    border-2 border-white/60 backdrop-blur-sm
                    shadow-2xl shadow-black/10
                    transform transition-all duration-500 ease-in-out
                    hover:scale-110 hover:shadow-3xl hover:shadow-black/20 hover:border-white/80
                    hover:-translate-y-3 hover:rotate-1
                    cursor-pointer overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                  `}>
                    
                    {/* 内容 */}
                    <div className="relative z-10 text-center">
                      <div className="text-8xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-2xl filter group-hover:brightness-110">
                        {activity.emoji}
                      </div>
                      <h3 className={`text-3xl font-bold text-gray-800 mb-6 group-hover:text-${config.themeColor}-600 transition-all duration-300 leading-tight tracking-wide group-hover:scale-105`}>
                        {activity.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {activity.description}
                      </p>
                      

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 热门推荐区域 */}
        <FeaturedActivities 
          region={config.name}
          activities={config.featuredActivities}
        />

        {/* 快速导航 */}
        <section className="py-8 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">探索其他地区</h3>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              {/* 上一个地区 */}
              <Link href={config.prevRegion.path} className={`group flex items-center space-x-3 bg-gradient-to-br ${config.prevRegion.bgColor} border-2 border-gray-300/60 hover:border-gray-400/70 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300`}>
                <div className="text-2xl">{config.prevRegion.emoji}</div>
                <div className="text-left">
                  <div className="text-sm text-gray-700">← 上一个</div>
                  <div className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{config.prevRegion.name}活动</div>
                </div>
              </Link>

              {/* 当前地区 */}
              <div className={`flex items-center space-x-3 bg-gradient-to-br ${config.bgColor} border-2 border-gray-300/60 rounded-xl px-8 py-4`}>
                <div className="text-3xl">{config.emoji}</div>
                <div className="text-center">
                  <div className={`text-sm text-${config.themeColor}-600`}>当前位置</div>
                  <div className={`font-bold text-${config.themeColor}-700`}>{config.name}</div>
                </div>
              </div>

              {/* 下一个地区 */}
              <Link href={config.nextRegion.path} className={`group flex items-center space-x-3 bg-gradient-to-br ${config.nextRegion.bgColor} border-2 border-gray-300/60 hover:border-gray-400/70 rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300`}>
                <div className="text-2xl">{config.nextRegion.emoji}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-700">下一个 →</div>
                  <div className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{config.nextRegion.name}活动</div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 