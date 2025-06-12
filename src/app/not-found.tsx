'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-100 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 主要内容 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
          {/* 404图标 */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl mb-4">🎋</div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              页面走失了
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              抱歉，您要找的页面可能已经移动或不存在。<br />
              让我们帮您回到正确的地方！
            </p>
          </div>

          {/* 快速导航 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link 
              href="/"
              className="group bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🏠</span>
                <span>返回首页</span>
              </div>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">⬅️</span>
                <span>返回上页</span>
              </div>
            </button>
          </div>

          {/* 热门地区链接 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🗾 热门地区</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link 
                href="/tokyo"
                className="bg-gradient-to-r from-red-100 to-rose-100 hover:from-red-200 hover:to-rose-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🗼</div>
                  <div className="text-sm font-medium">东京</div>
                </div>
              </Link>

              <Link 
                href="/kanagawa"
                className="bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">⛵</div>
                  <div className="text-sm font-medium">神奈川</div>
                </div>
              </Link>

              <Link 
                href="/chiba"
                className="bg-gradient-to-r from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🌊</div>
                  <div className="text-sm font-medium">千叶</div>
                </div>
              </Link>

              <Link 
                href="/saitama"
                className="bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🏢</div>
                  <div className="text-sm font-medium">埼玉</div>
                </div>
              </Link>

              <Link 
                href="/kitakanto"
                className="bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">♨️</div>
                  <div className="text-sm font-medium">北关东</div>
                </div>
              </Link>

              <Link 
                href="/koshinetsu"
                className="bg-gradient-to-r from-purple-100 to-violet-100 hover:from-purple-200 hover:to-violet-200 text-gray-800 px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🗻</div>
                  <div className="text-sm font-medium">甲信越</div>
                </div>
              </Link>
            </div>
          </div>

          {/* 花火活动快速链接 */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🎆 热门花火活动</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link 
                href="/tokyo/hanabi"
                className="bg-gradient-to-r from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20 text-red-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-red-200 hover:border-red-300"
              >
                东京花火
              </Link>
              <Link 
                href="/kanagawa/hanabi"
                className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-blue-200 hover:border-blue-300"
              >
                神奈川花火
              </Link>
              <Link 
                href="/chiba/hanabi"
                className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 text-sky-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-sky-200 hover:border-sky-300"
              >
                千叶花火
              </Link>
              <Link 
                href="/saitama/hanabi"
                className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 text-orange-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-orange-200 hover:border-orange-300"
              >
                埼玉花火
              </Link>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="text-sm text-gray-500 border-t border-gray-200 pt-6">
            <p className="mb-2">
              💡 <strong>小提示：</strong>如果您是通过搜索引擎访问的，页面可能已经更新
            </p>
            <p>
              📞 如果您遇到任何问题，请检查网址是否正确输入
            </p>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="mt-8 opacity-60">
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce">🎋</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎆</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🏮</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎇</span>
          </div>
        </div>
      </div>
    </div>
  );
} 