import { regionConfig } from '@/config/regionConfig';
import '@/styles/region-grid.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100">
      {/* 主要内容 */}
      <main className="relative z-10 min-h-screen bg-white/30 backdrop-blur-sm">
        {/* 标题区域 */}
        <section className="pb-8 pt-16 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-center space-x-8">
              <div className="transform text-8xl drop-shadow-2xl transition-transform duration-300 hover:scale-110">
                ⛩️
              </div>
              <div className="relative">
                {/* 文字背景光晕 */}
                <div className="absolute inset-0 scale-110 bg-gradient-to-r from-orange-200 to-red-200 opacity-30 blur-xl"></div>
                <h1 className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg md:text-6xl">
                  {/* 移动端：两行显示 - 强制样式 */}
                  <span className="block lg:hidden leading-tight">
                    关东<br />旅游指南
                  </span>
                  {/* 桌面端：单行显示 */}
                  <span className="hidden lg:block">
                    关东 旅游指南
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* 地区选择 */}
        <section className="py-8 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 使用CSS Grid布局 */}
            <div className="region-grid mx-auto max-w-4xl">
              {Object.entries(regionConfig).map(([regionKey, region]) => (
                <Link
                  key={regionKey}
                  href={`/${regionKey}` as any}
                  className={`group relative block transform rounded-3xl bg-gradient-to-br p-6 transition-all duration-500 ${region.color} hover:shadow-3xl cursor-pointer overflow-hidden border-2 ${region.borderColor} shadow-2xl backdrop-blur-sm hover:-translate-y-2 hover:scale-105 hover:shadow-black/20`}
                  style={{ gridArea: region.gridArea }}
                >
                  {/* 内阴影效果 */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/30 shadow-inner"></div>

                  {/* 悬停时的光晕效果 */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    {/* 地区图标和名称 */}
                    <div className="group-hover:drop-shadow-3xl mb-3 text-6xl drop-shadow-2xl filter transition-transform duration-300 group-hover:scale-110">
                      {region.emoji}
                    </div>
                    <h3 className="group-hover:text-shadow-lg text-xl font-bold text-gray-800 drop-shadow-md transition-all duration-300 group-hover:text-gray-900">
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
