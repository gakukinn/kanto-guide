'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 现代化地区配置
const modernRegionConfig = {
  tokyo: {
    name: '东京都',
    emoji: '🗼',
    color: 'from-red-500 via-pink-500 to-rose-500',
    bgPattern: 'from-red-50/80 via-pink-50/60 to-rose-50/80',
    description: '国际都市，四季精彩',
    stats: { events: '丰富', activities: '全年', rating: '9.2' },
    gridArea: 'tokyo',
    features: ['樱花祭典', '夏季花火', '秋叶灯光'],
    gradient: 'from-red-500/20 to-pink-500/20',
  },
  kanagawa: {
    name: '神奈川县',
    emoji: '⛵',
    color: 'from-blue-500 via-indigo-500 to-purple-500',
    bgPattern: 'from-blue-50/80 via-indigo-50/60 to-purple-50/80',
    description: '古都港湾，海滨风情',
    stats: { events: '多样', activities: '全年', rating: '8.9' },
    gridArea: 'kanagawa',
    features: ['镰仓古都', '横滨港口', '湘南海滨'],
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  saitama: {
    name: '埼玉县',
    emoji: '🌸',
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    bgPattern: 'from-orange-50/80 via-amber-50/60 to-yellow-50/80',
    description: '都市近郊，传统现代',
    stats: { events: '精选', activities: '全年', rating: '8.5' },
    gridArea: 'saitama',
    features: ['樱花公园', '主题乐园', '传统祭典'],
    gradient: 'from-orange-500/20 to-yellow-500/20',
  },
  chiba: {
    name: '千叶县',
    emoji: '🌊',
    color: 'from-cyan-500 via-teal-500 to-blue-500',
    bgPattern: 'from-cyan-50/80 via-teal-50/60 to-blue-50/80',
    description: '海岸田园，自然纯朴',
    stats: { events: '特色', activities: '全年', rating: '8.7' },
    gridArea: 'chiba',
    features: ['海滨度假', '房总半岛', '成田传统'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  kitakanto: {
    name: '北关东',
    emoji: '♨️',
    color: 'from-green-500 via-emerald-500 to-teal-500',
    bgPattern: 'from-green-50/80 via-emerald-50/60 to-teal-50/80',
    description: '温泉古迹，山川秀美',
    stats: { events: '独特', activities: '全年', rating: '8.3' },
    gridArea: 'kitakanto',
    features: ['温泉之旅', '山岳风景', '历史古迹'],
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  koshinetsu: {
    name: '甲信越',
    emoji: '🗻',
    color: 'from-purple-500 via-violet-500 to-indigo-500',
    bgPattern: 'from-purple-50/80 via-violet-50/60 to-indigo-50/80',
    description: '山湖雪景，信越风情',
    stats: { events: '壮美', activities: '全年', rating: '9.0' },
    gridArea: 'koshinetsu',
    features: ['山岳观光', '河口湖', '信州文化'],
    gradient: 'from-purple-500/20 to-indigo-500/20',
  },
};

export default function ModernHomePage() {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const fullText = '关东 旅游指南';

  // 打字效果
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, fullText]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 樱花富士山背景 */}
      <div className="absolute inset-0">
        {/* 主背景渐变：左粉（樱花）右蓝（富士山） */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-pink-100 to-blue-100" />

        {/* 左侧樱花装饰 */}
        <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
          {/* 樱花花瓣 */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`sakura-${i}`}
              className="absolute animate-pulse text-pink-400 opacity-60"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              🌸
            </div>
          ))}

          {/* 樱花树枝装饰 */}
          <div className="absolute left-10 top-10 text-6xl text-pink-300 opacity-40">
            🌸
          </div>
          <div className="absolute left-32 top-32 text-8xl text-pink-300 opacity-30">
            🌸
          </div>
          <div className="absolute bottom-20 left-16 text-7xl text-pink-300 opacity-35">
            🌸
          </div>

          {/* 粉色光晕 */}
          <div className="absolute left-1/4 top-1/3 h-80 w-80 animate-pulse rounded-full bg-pink-300/20 blur-3xl" />
        </div>

        {/* 右侧富士山装饰 */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          {/* 富士山轮廓 */}
          <div className="absolute bottom-0 right-10 text-9xl text-blue-300 opacity-40">
            🗻
          </div>
          <div className="absolute bottom-10 right-32 text-7xl text-blue-400 opacity-35">
            ⛰️
          </div>
          <div className="absolute right-20 top-20 text-6xl text-blue-300 opacity-30">
            🏔️
          </div>

          {/* 云朵装饰 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`cloud-${i}`}
              className="absolute text-white opacity-50"
              style={{
                right: `${Math.random() * 60 + 10}%`,
                top: `${Math.random() * 60 + 10}%`,
                fontSize: `${Math.random() * 15 + 20}px`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            >
              ☁️
            </div>
          ))}

          {/* 蓝色光晕 */}
          <div
            className="absolute right-1/4 top-1/4 h-80 w-80 animate-pulse rounded-full bg-blue-300/20 blur-3xl"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 中心过渡区域 */}
        <div className="absolute inset-x-0 top-1/2 h-32 bg-gradient-to-r from-pink-200/50 to-blue-200/50 blur-sm" />
      </div>

      {/* 主要内容 */}
      <main className="relative z-10 min-h-screen">
        {/* 现代化标题区域 */}
        <section className="relative pb-16 pt-20 text-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* 主标题 */}
            <div className="mb-8">
              {/* 打字效果标题 */}
              <h1 className="relative mb-6 text-6xl font-bold md:text-7xl">
                <span className="text-black">⛩️{currentText}</span>
                <span className="animate-blink text-black">|</span>
              </h1>
            </div>
          </div>
        </section>

        {/* 现代化地区选择 */}
        <section className="relative py-16 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 地区网格 - 保持地理位置关系 */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .geographic-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  grid-template-rows: repeat(4, 180px);
                  gap: 2rem;
                  max-width: 1000px;
                  margin: 0 auto;
                  grid-template-areas:
                    "koshinetsu kitakanto kitakanto kitakanto"
                    "koshinetsu saitama saitama chiba"
                    "koshinetsu tokyo tokyo chiba"
                    "kanagawa kanagawa kanagawa chiba";
                }
                
                @media (max-width: 768px) {
                  .geographic-grid {
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: repeat(6, 160px);
                    gap: 1.5rem;
                    max-width: 500px;
                    grid-template-areas:
                      "kitakanto kitakanto"
                      "koshinetsu koshinetsu"
                      "saitama saitama"
                      "tokyo tokyo"
                      "chiba chiba"
                      "kanagawa kanagawa";
                  }
                }
              `,
              }}
            />

            <div className="geographic-grid">
              {Object.entries(modernRegionConfig).map(([regionKey, region]) => (
                <Link
                  key={regionKey}
                  href={`/${regionKey}`}
                  className="group relative block transform cursor-pointer transition-all duration-700 hover:-translate-y-4 hover:scale-105"
                  style={{ gridArea: region.gridArea }}
                >
                  {/* 主卡片容器 */}
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                    {/* 渐变背景 */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${region.bgPattern} opacity-50`}
                    />

                    {/* 动态边框 */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${region.color} p-0.5 opacity-0 transition-all duration-500 group-hover:opacity-100`}
                    >
                      <div className="h-full w-full rounded-3xl bg-black/20 backdrop-blur-xl" />
                    </div>

                    {/* 光效装饰 */}
                    <div
                      className={`absolute right-0 top-0 h-20 w-20 bg-gradient-to-br ${region.color} opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40`}
                    />

                    {/* 内容区域 */}
                    <div className="relative z-10 flex h-full flex-col justify-center p-6">
                      {/* 头部：图标和名称 */}
                      <div className="text-center">
                        <div className="mb-3 text-5xl drop-shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-125">
                          {region.emoji}
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-black transition-colors duration-300 group-hover:text-white">
                          {region.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* 外围光环 */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${region.color} -z-10 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-30`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 打字效果样式使用全局CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `,
        }}
      />
    </div>
  );
}
