'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  getRegionConfig,
  getThemeColors,
} from '../config/hanabi-detail-template';
import MediaDisplay from './MediaDisplay';

// 花见会数据接口 - 基于实际API数据结构
interface HanamiEvent {
  id: string;
  title?: string;
  name?: string;
  englishName?: string;
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
  date?: string;
  dates?: string;
  endDate?: string;
  location: string;
  category?: string;
  highlights?: string[];
  features?: string[];
  likes: number;
  website?: string;
  description: string;
  viewingSeason?: string;
  peakTime?: string;
  expectedVisitors?: string | number;
  venue?: string;
  detailLink?: string;
  sakuraVariety?: string;
  wantToVisit?: number;
  haveVisited?: number;
  prefecture?: string;
  rank?: number;
}

interface HanamiDetailTemplateProps {
  data: HanamiEvent;
  regionKey: string;
}

export default function HanamiDetailTemplate({
  data,
  regionKey,
}: HanamiDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // 使用 useMemo 优化计算
  const themeColors = useMemo(
    () => getThemeColors('pink'), // 花见会使用粉色主题
    []
  );
  const regionConfig = useMemo(() => getRegionConfig(regionKey), [regionKey]);

  const handleMapClick = () => {
    setSelectedTab('overview');
    setTimeout(() => {
      const mapElement = document.getElementById('map-section');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // 格式化观赏期显示
  const formattedSeason = useMemo(() => {
    const season = data.viewingSeason || data.date || data.dates || '';
    return <span className="font-bold text-gray-900">{season}</span>;
  }, [data.viewingSeason, data.date, data.dates]);

  // 获取显示名称
  const displayName = data.name || data.title || '未知花见景点';
  const japaneseName = data._sourceData?.japaneseName || displayName;
  const englishName = data.englishName || '';

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-rose-100">
      {/* 面包屑导航 */}
      <nav className="border-b border-pink-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 transition-colors hover:text-pink-600"
              >
                首页
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a
                href={`/${regionKey}`}
                className="text-gray-500 transition-colors hover:text-pink-600"
              >
                {regionConfig.name}
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a
                href={`/${regionKey}/hanami`}
                className="text-gray-500 transition-colors hover:text-pink-600"
              >
                花见会
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-pink-600">{displayName}</li>
          </ol>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 花见展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-pink-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={[]}
                themeColors={themeColors}
                eventName={displayName}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
              <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                {displayName}
              </h1>
              {japaneseName && japaneseName !== displayName && (
                <p className="mb-3 text-lg font-semibold text-gray-700 opacity-90">
                  {japaneseName}
                </p>
              )}
              {englishName && (
                <p className="text-lg font-medium italic text-gray-600">
                  {englishName}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-100 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 四个卡片平均分布网格布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {/* 花见信息卡片 */}
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">花见信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      📅 观赏时期
                    </span>
                    <div className="text-right">{formattedSeason}</div>
                  </div>
                  {data.peakTime && (
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="flex items-center font-semibold text-gray-800">
                        🌸 最佳时期
                      </span>
                      <span className="text-right font-bold text-gray-900">
                        {data.peakTime}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      📍 地点
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.location}
                    </span>
                  </div>
                  {data.sakuraVariety && (
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="flex items-center font-semibold text-gray-800">
                        🌸 樱花品种
                      </span>
                      <span
                        className={`${themeColors.text600} text-right font-bold`}
                      >
                        {data.sakuraVariety}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center font-semibold text-gray-800">
                      ❤️ 人气指数
                    </span>
                    <span className="text-right font-bold text-pink-600">
                      {data.likes}
                    </span>
                  </div>
                </div>
              </div>

              {/* 人气统计卡片 */}
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  人气统计
                </h3>
                <div className="space-y-4 text-base">
                  {data.wantToVisit !== undefined && (
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center font-semibold text-gray-800">
                          💕 想去人数
                        </span>
                        <span className="text-right font-bold text-pink-600">
                          {data.wantToVisit}人
                        </span>
                      </div>
                    </div>
                  )}
                  {data.haveVisited !== undefined && (
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center font-semibold text-gray-800">
                          ✅ 去过人数
                        </span>
                        <span className="text-right font-bold text-green-600">
                          {data.haveVisited}人
                        </span>
                      </div>
                    </div>
                  )}
                  {data.rank && (
                    <div className="border-b border-gray-200 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center font-semibold text-gray-800">
                          🏆 地区排名
                        </span>
                        <span className="text-right font-bold text-orange-600">
                          第{data.rank}位
                        </span>
                      </div>
                    </div>
                  )}
                  {data.website && data.website !== '#' && (
                    <div>
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center font-bold transition-colors duration-300`}
                      >
                        请以官方网站为主 → 🌐 详情页面
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 地图&交通卡片 */}
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  地图&交通
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-semibold text-gray-800">
                        📍 地图
                      </span>
                      <button
                        onClick={handleMapClick}
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center space-x-1 font-bold transition-colors duration-300`}
                      >
                        <span>查看详细地图 →</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="flex items-center font-semibold text-gray-800">
                      🚗 交通方式
                    </span>
                    <div className="mt-2 whitespace-pre-line font-bold text-pink-700">
                      请参考官方网站获取最新交通信息
                    </div>
                  </div>
                </div>
              </div>

              {/* 观赏建议卡片 */}
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  观赏建议
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      🌸 最佳时间
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.peakTime || '请关注花开状况'}
                    </span>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      📸 拍摄建议
                    </span>
                    <span className="mt-2 font-bold text-pink-700">
                      建议早上或傍晚光线较佳时拍摄
                    </span>
                  </div>
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <span
                      className={`${themeColors.text700} text-base font-medium`}
                    >
                      💡 建议提前确认花开状况，选择最佳观赏时期
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签导航 */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {[
                { id: 'overview', name: '概览', icon: '📋' },
                { id: 'sakura', name: '樱花信息', icon: '🌸' },
                { id: 'access', name: '交通指南', icon: '🚇' },
                { id: 'spots', name: '观赏地点', icon: '📍' },
                { id: 'tips', name: '实用建议', icon: '💡' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-3 rounded-2xl px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    selectedTab === tab.id
                      ? `${themeColors.bg200} ${themeColors.text800} border-2 ${themeColors.border200} -translate-y-1 transform`
                      : 'border-2 border-gray-200 bg-white/70 text-gray-700 hover:bg-white/90'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* 内容区域 */}
            <div className="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/80 to-white/60 p-8 shadow-2xl backdrop-blur-sm">
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">
                      花见概览
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-700">
                      {data.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">🌸</span>
                        <span>花见特色</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {(data.highlights || data.features || ['樱花观赏']).map(
                          (highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-100 text-xs text-pink-600">
                                •
                              </span>
                              <span className="leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📍</span>
                        <span>观赏地点</span>
                      </h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start space-x-3 rounded-lg bg-blue-50 p-3">
                          <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                            📍
                          </span>
                          <div>
                            <span className="font-semibold text-blue-900">
                              {data.venue || data.location}
                            </span>
                            <p className="mt-1 text-gray-600">
                              {data.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {data.sakuraVariety && (
                      <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                        <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                          <span className="text-xl">🌸</span>
                          <span>樱花品种</span>
                        </h4>
                        <div className="space-y-3 text-sm text-gray-700">
                          <p className="flex items-start space-x-3 rounded-lg bg-purple-50 p-3">
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600">
                              🌸
                            </span>
                            <span className="leading-relaxed">
                              {data.sakuraVariety}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 地图区域 */}
                  <div id="map-section" className="mt-8">
                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                      <h4 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                        <span className="text-2xl">🗺️</span>
                        <span>位置地图</span>
                      </h4>
                      <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                        <div className="flex h-full items-center justify-center text-gray-500">
                          <div className="text-center">
                            <span className="text-4xl">🗺️</span>
                            <p className="mt-2">地图功能开发中</p>
                            <p className="text-sm">
                              请参考官方网站获取详细位置信息
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'sakura' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    樱花信息
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">🌸</span>
                        <span>樱花品种</span>
                      </h4>
                      <p className="leading-relaxed text-gray-700">
                        {data.sakuraVariety || '以官方信息为准'}
                      </p>
                    </div>

                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">📅</span>
                        <span>观赏期间</span>
                      </h4>
                      <p className="leading-relaxed text-gray-700">
                        {data.viewingSeason ||
                          data.date ||
                          data.dates ||
                          '请关注花开状况'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'access' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    交通指南
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">🚇</span>
                        <span>公共交通</span>
                      </h4>
                      <p className="leading-relaxed text-gray-700">
                        请参考官方网站获取最新的交通方式和路线信息。建议使用公共交通前往，以避免停车困难。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'spots' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    观赏地点
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">📍</span>
                        <span>{data.venue || displayName}</span>
                      </h4>
                      <div className="mb-4 rounded-xl bg-purple-50 p-4">
                        <div className="flex items-start space-x-3">
                          <span className="mt-1 text-xl text-purple-600">
                            📍
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-purple-700">
                              地址：
                            </span>
                            <span className="ml-2 text-gray-700">
                              {data.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl text-blue-600">🌸</span>
                          <div>
                            <span className="text-sm font-semibold text-blue-700">
                              观赏特色：
                            </span>
                            <span className="ml-2 font-bold text-gray-900">
                              {data.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'tips' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    实用建议
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        category: '观赏准备',
                        items: [
                          '提前查看花开状况信息',
                          '选择最佳观赏时期前往',
                          '准备相机记录美好时刻',
                          '穿着舒适的步行鞋',
                        ],
                      },
                      {
                        category: '交通建议',
                        items: [
                          '优先选择公共交通工具',
                          '避开周末和节假日高峰',
                          '提前规划返程路线',
                          '关注临时交通管制信息',
                        ],
                      },
                      {
                        category: '拍摄技巧',
                        items: [
                          '早晨或傍晚光线较佳',
                          '注意不要损伤樱花',
                          '避免使用闪光灯',
                          '尊重其他游客的观赏体验',
                        ],
                      },
                    ].map((tipCategory, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                      >
                        <h4 className="mb-3 font-bold text-gray-800">
                          {tipCategory.category}
                        </h4>
                        <ul className="space-y-2">
                          {tipCategory.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start space-x-2 text-sm text-gray-700"
                            >
                              <span className={`${themeColors.text600} mt-1`}>
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 旅游服务推荐 - 变现区域 */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                🎯 完美花见体验
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                为您推荐最佳住宿、交通服务，让樱花之旅更加完美！
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  🏨 推荐住宿
                </h3>
                <p className="text-gray-700">住宿预订功能开发中，敬请期待！</p>
              </div>
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  🚗 交通服务
                </h3>
                <p className="text-gray-700">交通预订功能开发中，敬请期待！</p>
              </div>
            </div>
          </div>
        </section>

        {/* 评论区 */}
        <section className="bg-gradient-to-r from-pink-50 to-rose-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                💬 花见体验分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的赏樱体验，为其他花见爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
              <h3 className="mb-4 flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>✍️</span>
                <span>发表评论</span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      昵称
                    </label>
                    <input
                      type="text"
                      placeholder="请输入您的昵称"
                      className="w-full rounded-lg border border-pink-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      邮箱（可选）
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-pink-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    评论内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="分享您的赏樱体验、最佳观赏时期、拍摄技巧等..."
                    className="w-full resize-none rounded-lg border border-pink-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-pink-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    💡 提示：分享赏樱体验帮助其他游客更好地欣赏樱花美景
                  </p>
                  <button
                    className="rounded-lg border border-gray-200 bg-white px-6 py-2 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    onClick={() => alert('评论功能开发中，敬请期待！')}
                  >
                    发表评论
                  </button>
                </div>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="space-y-6">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>💭</span>
                <span>游客评论 (3)</span>
              </h3>

              {/* 示例评论 */}
              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 font-bold text-white">
                    樱
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">樱花爱好者</h4>
                      <span className="text-sm text-gray-500">
                        2024年4月5日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      今年参加了花见，樱花盛开的景色真的太美了！建议大家选择满开期前往，拍照效果最佳。早上人相对较少，适合拍摄。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-pink-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-pink-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (15)
                      </button>
                      <button
                        className="transition-colors hover:text-blue-600"
                        onClick={() => alert('回复功能开发中，敬请期待！')}
                      >
                        💬 回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-pink-400 font-bold text-white">
                    摄
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">摄影达人</h4>
                      <span className="text-sm text-gray-500">
                        2024年4月3日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      作为摄影爱好者，这里的樱花真的很适合拍摄！建议带长焦镜头，可以拍到更多细节。避开周末人会少一些。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-pink-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-pink-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (10)
                      </button>
                      <button
                        className="transition-colors hover:text-blue-600"
                        onClick={() => alert('回复功能开发中，敬请期待！')}
                      >
                        💬 回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="transform rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-pink-400 font-bold text-white">
                    家
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">家庭游客</h4>
                      <span className="text-sm text-gray-500">
                        2024年4月1日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      带着小朋友来赏樱，孩子们都很开心！这里环境很好，适合家庭出游。建议带上野餐垫，可以在樱花树下享受美好时光。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-pink-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-pink-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (8)
                      </button>
                      <button
                        className="transition-colors hover:text-blue-600"
                        onClick={() => alert('回复功能开发中，敬请期待！')}
                      >
                        💬 回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 加载更多 */}
              <div className="text-center">
                <button
                  className="transform rounded-full border border-pink-200/50 bg-gradient-to-r from-pink-50 to-rose-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-pink-100 hover:to-rose-200 hover:shadow-lg"
                  onClick={() => alert('更多评论加载功能开发中，敬请期待！')}
                >
                  📄 加载更多评论
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
