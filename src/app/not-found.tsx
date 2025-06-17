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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-rose-100 to-blue-100 px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 主要内容 */}
        <div className="rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
          {/* 404图标 */}
          <div className="mb-8">
            <div className="mb-4 text-8xl md:text-9xl">🎋</div>
            <h1 className="mb-4 text-6xl font-bold text-gray-800 md:text-7xl">
              404
            </h1>
            <h2 className="mb-6 text-2xl font-semibold text-gray-700 md:text-3xl">
              页面走失了
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              抱歉，您要找的页面可能已经移动或不存在。
              <br />
              让我们帮您回到正确的地方！
            </p>
          </div>

          {/* 快速导航 */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/"
              className="group transform rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-rose-600 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🏠</span>
                <span>返回首页</span>
              </div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group transform rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">⬅️</span>
                <span>返回上页</span>
              </div>
            </button>
          </div>

          {/* 热门地区链接 */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              🗾 热门地区
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <Link
                href="/tokyo"
                className="transform rounded-lg bg-gradient-to-r from-red-100 to-rose-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-red-200 hover:to-rose-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">🗼</div>
                  <div className="text-sm font-medium">东京</div>
                </div>
              </Link>

              <Link
                href="/kanagawa"
                className="transform rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-blue-200 hover:to-cyan-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">⛵</div>
                  <div className="text-sm font-medium">神奈川</div>
                </div>
              </Link>

              <Link
                href="/chiba"
                className="transform rounded-lg bg-gradient-to-r from-sky-100 to-blue-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-sky-200 hover:to-blue-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">🌊</div>
                  <div className="text-sm font-medium">千叶</div>
                </div>
              </Link>

              <Link
                href="/saitama"
                className="transform rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-orange-200 hover:to-amber-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">🏢</div>
                  <div className="text-sm font-medium">埼玉</div>
                </div>
              </Link>

              <Link
                href="/kitakanto"
                className="transform rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-green-200 hover:to-emerald-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">♨️</div>
                  <div className="text-sm font-medium">北关东</div>
                </div>
              </Link>

              <Link
                href="/koshinetsu"
                className="transform rounded-lg bg-gradient-to-r from-purple-100 to-violet-100 px-4 py-3 text-gray-800 transition-all duration-200 hover:scale-105 hover:from-purple-200 hover:to-violet-200"
              >
                <div className="text-center">
                  <div className="mb-1 text-2xl">🗻</div>
                  <div className="text-sm font-medium">甲信越</div>
                </div>
              </Link>
            </div>
          </div>

          {/* 花火活动快速链接 */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              🎆 热门花火活动
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/tokyo/hanabi"
                className="rounded-full border border-red-200 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-200 hover:border-red-300 hover:from-red-500/20 hover:to-rose-500/20"
              >
                东京花火
              </Link>
              <Link
                href="/kanagawa/hanabi"
                className="rounded-full border border-blue-200 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-200 hover:border-blue-300 hover:from-blue-500/20 hover:to-cyan-500/20"
              >
                神奈川花火
              </Link>
              <Link
                href="/chiba/hanabi"
                className="rounded-full border border-sky-200 bg-gradient-to-r from-sky-500/10 to-blue-500/10 px-4 py-2 text-sm font-medium text-sky-700 transition-all duration-200 hover:border-sky-300 hover:from-sky-500/20 hover:to-blue-500/20"
              >
                千叶花火
              </Link>
              <Link
                href="/saitama/hanabi"
                className="rounded-full border border-orange-200 bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-4 py-2 text-sm font-medium text-orange-700 transition-all duration-200 hover:border-orange-300 hover:from-orange-500/20 hover:to-amber-500/20"
              >
                埼玉花火
              </Link>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
            <p className="mb-2">
              💡 <strong>小提示：</strong>
              如果您是通过搜索引擎访问的，页面可能已经更新
            </p>
            <p>📞 如果您遇到任何问题，请检查网址是否正确输入</p>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="mt-8 opacity-60">
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce">🎋</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
              🎆
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              🏮
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>
              🎇
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
