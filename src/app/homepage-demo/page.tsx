'use client';

import { useState } from 'react';
import ModernHomePage from '@/components/ModernHomePage';
import Link from 'next/link';

// 当前首页的复制版本（简化）
const CurrentHomePage = () => {
  const regionConfig = {
    tokyo: { 
      name: '东京都', 
      emoji: '🗼', 
      color: 'from-red-50 to-rose-100 border-red-300/70',
      description: '国际都市的璀璨花火',
      gridArea: 'tokyo'
    },
    kanagawa: { 
      name: '神奈川县', 
      emoji: '⛵', 
      color: 'from-blue-100 to-blue-200 border-blue-400/70',
      description: '湘南海岸的夏日花火',
      gridArea: 'kanagawa'
    },
    saitama: { 
      name: '埼玉县', 
      emoji: '🌸', 
      color: 'from-orange-50 to-amber-100 border-orange-300/70',
      description: '都市近郊的夏夜花火',
      gridArea: 'saitama'
    },
    chiba: { 
      name: '千叶县', 
      emoji: '🌊', 
      color: 'from-sky-50 to-cyan-100 border-sky-300/70',
      description: '太平洋海岸的海滨花火',
      gridArea: 'chiba'
    },
    kitakanto: { 
      name: '北关东', 
      emoji: '♨️', 
      color: 'from-green-50 to-emerald-100 border-emerald-300/70',
      description: '群马栃木茨城三县精华',
      gridArea: 'kitakanto'
    },
    koshinetsu: { 
      name: '甲信越', 
      emoji: '🗻', 
      color: 'from-purple-50 to-violet-100 border-purple-300/70',
      description: '新潟长野山梨三县精华',
      gridArea: 'koshinetsu'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100">
      <main className="relative z-10 min-h-screen bg-white/30 backdrop-blur-sm">
        {/* 标题区域 */}
        <section className="pt-16 pb-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-8xl drop-shadow-2xl transform hover:scale-110 transition-transform duration-300">⛩️</div>
              <div className="relative">
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
             <style dangerouslySetInnerHTML={{
               __html: `
                 .current-region-grid {
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
                 
                 @media (max-width: 768px) {
                   .current-region-grid {
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
                 }
               `
             }} />
             <div className="current-region-grid">
              {Object.entries(regionConfig).map(([regionKey, region]) => (
                                 <div
                   key={regionKey}
                   className={`group relative block p-6 rounded-3xl transition-all duration-500 transform bg-gradient-to-br ${region.color} cursor-pointer shadow-2xl backdrop-blur-sm border-2 border-white/80 hover:border-white hover:scale-105 hover:-translate-y-2 hover:shadow-3xl hover:shadow-black/20 overflow-hidden`}
                   style={{ gridArea: region.gridArea }}
                 >
                  <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none border border-white/30"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                                     <div className="relative flex flex-col items-center justify-center h-full text-center z-10">
                     <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl filter group-hover:drop-shadow-3xl">
                      {region.emoji}
                    </div>
                                         <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 drop-shadow-md transition-all duration-300 group-hover:text-shadow-lg">
                      {region.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default function HomepageDemoPage() {
  const [activeView, setActiveView] = useState<'current' | 'modern'>('current');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 对比控制器 */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-2 flex gap-2 border border-white/20">
          <button
            onClick={() => setActiveView('current')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === 'current'
                ? 'bg-white text-black shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            ❌ 当前设计
          </button>
          <button
            onClick={() => setActiveView('modern')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === 'modern'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            ✨ 现代化设计
          </button>
        </div>
      </div>

      {/* 页面内容 */}
      <div className="relative">
        <div className={`transition-all duration-700 ${activeView === 'current' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
          <CurrentHomePage />
        </div>
        
        <div className={`transition-all duration-700 ${activeView === 'modern' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
          <ModernHomePage />
        </div>
      </div>

      {/* 对比说明面板 */}
      <div className="fixed bottom-6 left-6 right-6 max-w-4xl mx-auto">
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-white">
          {activeView === 'current' ? (
            <div>
              <h3 className="text-xl font-bold mb-3 text-red-400">❌ 当前设计特点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>• 🎨 传统的渐变背景，视觉冲击力较弱</p>
                  <p>• 📱 简单的悬停效果，缺乏层次</p>
                  <p>• 💫 静态标题，无动画效果</p>
                </div>
                <div>
                  <p>• 📊 信息展示单一，只有地区名称</p>
                  <p>• 🔗 缺少全年活动范围说明</p>
                  <p>• 🎯 未突出旅游指南的综合性</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">✨ 现代化设计特点</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>• 🎨 深色主题 + 粒子动画背景</p>
                  <p>• 📱 打字效果 + 四季活动统计</p>
                  <p>• 💫 毛玻璃卡片 + 动态边框</p>
                </div>
                <div>
                  <p>• 📊 显示全年活动覆盖范围</p>
                  <p>• 🔗 图标旋转 + 光环效果</p>
                  <p>• 🎯 突出旅游指南的全面性</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="fixed top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-xl text-white px-4 py-3 rounded-xl hover:bg-black/90 transition-all duration-300 border border-white/20"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
} 