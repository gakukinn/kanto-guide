'use client';

import Link from 'next/link';

// 地区配置
const regionConfig = {
  koshinetsu: { 
    name: '甲信越', 
    emoji: '🗻', 
    color: 'from-purple-50 to-violet-100 border-purple-300/70',
    description: '新潟长野山梨三县精华',
    gridArea: 'koshinetsu',
    icons: {
      hanabi: '🎆',
      spots: '🏔️',
      events: '🎿',
      food: '🍇'
    }
  },
  kitakanto: { 
    name: '北关东', 
    emoji: '♨️', 
    color: 'from-green-50 to-emerald-100 border-emerald-300/70',
    description: '群马栃木茨城三县精华',
    gridArea: 'kitakanto',
    icons: {
      hanabi: '🎆',
      spots: '♨️',
      events: '🏯',
      food: '🥟'
    }
  },
  saitama: { 
    name: '埼玉县', 
    emoji: '🌸', 
    color: 'from-orange-50 to-amber-100 border-orange-300/70',
    description: '都市近郊的夏夜花火',
    gridArea: 'saitama',
    icons: {
      hanabi: '🎆',
      spots: '🏰',
      events: '🎭',
      food: '🍜'
    }
  },
  chiba: { 
    name: '千叶县', 
    emoji: '🌊', 
    color: 'from-sky-50 to-cyan-100 border-sky-300/70',
    description: '太平洋海岸的海滨花火',
    gridArea: 'chiba',
    icons: {
      hanabi: '🎆',
      spots: '🏖️',
      events: '🎪',
      food: '🦐'
    }
  },

  tokyo: { 
    name: '东京都', 
    emoji: '🗼', 
    color: 'from-red-50 to-rose-100 border-red-300/70',
    description: '国际都市的璀璨花火',
    gridArea: 'tokyo',
    icons: {
      hanabi: '🎆',
      spots: '🗼',
      events: '🎭',
      food: '🍣'
    }
  },
  kanagawa: { 
    name: '神奈川县', 
    emoji: '⛵', 
    color: 'from-blue-100 to-blue-200 border-blue-400/70',
    description: '湘南海岸的夏日花火',
    gridArea: 'kanagawa',
    icons: {
      hanabi: '🎆',
      spots: '⛩️',
      events: '🌺',
      food: '🍰'
    }
  },

};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100">
      {/* 主要内容 */}
      <main className="relative z-10 min-h-screen bg-white/30 backdrop-blur-sm">
        {/* 标题区域 */}
        <section className="pt-16 pb-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-8xl drop-shadow-2xl transform hover:scale-110 transition-transform duration-300">⛩️</div>
              <div className="relative">
                {/* 文字背景光晕 */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 blur-xl opacity-30 scale-110"></div>
                <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                  关东 旅游指南
          </h1>
              </div>
            </div>
          </div>
        </section>

        {/* 地区选择 */}
        <section className="py-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 地理位置布局的CSS Grid */}
            <style jsx>{`
              .region-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(4, 140px);
                gap: 1.5rem;
                max-width: 800px;
                margin: 0 auto;
                grid-template-areas:
                  "koshinetsu kitakanto kitakanto kitakanto"
                  "koshinetsu saitama saitama chiba"
                  "koshinetsu tokyo tokyo chiba"
                  "kanagawa kanagawa kanagawa chiba";
              }
              
              .region-grid > * {
                min-height: 140px;
                padding: 1.2rem !important;
              }
              
              .region-grid h3 {
                font-size: 1.2rem !important;
                margin-bottom: 0.5rem !important;
              }
              
              .region-grid .text-6xl {
                font-size: 2.5rem !important;
                margin-bottom: 0.5rem !important;
              }
              
                              @media (max-width: 768px) {
                .region-grid {
                  grid-template-columns: repeat(2, 1fr);
                  grid-template-rows: repeat(5, 120px);
                  gap: 1rem;
                  max-width: 500px;
                  grid-template-areas:
                    "kitakanto kitakanto"
                    "koshinetsu koshinetsu"
                    "saitama saitama"
                    "tokyo chiba"
                    "kanagawa kanagawa";
                }
                
                .region-grid > * {
                  min-height: 120px;
                  padding: 1rem !important;
                }
              }
            `}</style>

            <div className="region-grid">
              {Object.entries(regionConfig).map(([regionKey, region]) => (
            <Link
                  key={regionKey}
                  href={`/${regionKey}`}
                  className={`group relative block p-6 rounded-3xl transition-all duration-500 transform bg-gradient-to-br ${region.color} cursor-pointer shadow-2xl backdrop-blur-sm border-2 border-white/80 hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:shadow-black/20 overflow-hidden`}
                  style={{ gridArea: region.gridArea }}
                >
                  {/* 内阴影效果 */}
                  <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none border border-white/30"></div>
                  
                  {/* 悬停时的光晕效果 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className="relative flex flex-col items-center justify-center h-full text-center z-10">
                    {/* 地区图标和名称 */}
                    <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl filter group-hover:drop-shadow-3xl">
                      {region.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 drop-shadow-md transition-all duration-300 group-hover:text-shadow-lg">
                      {region.name}
                    </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
        </section>
      </main>
    </div>
  );
} 