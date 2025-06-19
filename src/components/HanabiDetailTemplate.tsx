'use client';

import { useMemo, useState } from 'react';
import { HanabiData } from '../types/hanabi';
import MediaDisplay from './MediaDisplay';
// import HanabiHeader from './shared/HanabiHeader';
import {
  getRegionConfig,
  getThemeColors,
  validateHanabiData,
} from '../config/hanabi-detail-template';
import AffiliateLinks from './AffiliateLinks';
import HanabiBreadcrumb from './shared/HanabiBreadcrumb';

interface HanabiDetailTemplateProps {
  data: HanabiData;
  regionKey: string;
}

export default function HanabiDetailTemplate({
  data,
  regionKey,
}: HanabiDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // 验证数据格式
  const validation = validateHanabiData(data);
  if (!validation.isValid && process.env.NODE_ENV === 'development') {
    console.warn('数据格式警告:', validation.errors);
  }

  // 使用 useMemo 优化计算
  const themeColors = useMemo(
    () => getThemeColors(data.themeColor),
    [data.themeColor]
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

  // 格式化时间显示 - 使用 useMemo 优化
  const formattedTime = useMemo(() => {
    const timeMatches = data.time.match(/\d{1,2}:\d{2}/g);
    if (timeMatches && timeMatches.length > 0) {
      return (
        <span className="font-bold text-gray-900">{timeMatches[0]}开始</span>
      );
    }
    return <span className="font-bold text-gray-900">{data.time}</span>;
  }, [data.time]);

  // 状态翻译函数
  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      scheduled: '预定举行',
      confirmed: '确认举行',
      cancelled: '已取消',
      postponed: '延期举办',
      completed: '已结束',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-blue-100">
      {/* 面包屑导航 */}
      <HanabiBreadcrumb regionKey={regionKey} hanabiName={data.name} />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 花火展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-red-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={data.media}
                themeColors={themeColors}
                eventName={data.name}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
              <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                {data.name}
              </h1>
              {data._sourceData?.japaneseName && (
                <p className="mb-3 text-lg font-semibold text-gray-700 opacity-90">
                  {data._sourceData.japaneseName}
                </p>
              )}
              {data.englishName && (
                <p className="text-lg font-medium italic text-gray-600">
                  {data.englishName}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 四个卡片平均分布网格布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {/* 活动信息卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">活动信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      📅 日期
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      🕐 时间
                    </span>
                    <div className="text-right">{formattedTime}</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      🎆 发数
                    </span>
                    <span
                      className={`${themeColors.text600} text-right font-bold`}
                    >
                      {data.fireworksCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      👥 预计人数
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.expectedVisitors}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center font-semibold text-gray-800">
                      ⏱️ 持续时间
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* 联系信息卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  联系信息
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      🏢 主办方
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.contact?.organizer || '待确认'}
                    </span>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      📞 电话
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.contact?.phone || '待确认'}
                    </span>
                  </div>
                  {data.contact?.website && (
                    <div className="border-b border-gray-200 pb-3">
                      <a
                        href={data.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center font-bold transition-colors duration-300`}
                      >
                        请以官方网站为主 → 🌐 官方网站
                      </a>
                    </div>
                  )}

                  {/* 活动状态标签 */}
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <span
                      className={`${themeColors.text700} text-base font-medium`}
                    >
                      📍 状态：{getStatusText(data.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 交通指南卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  地图&交通
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      ⏰ 详细时间
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.time}
                    </span>
                  </div>
                  {data.access[0]?.stations?.[0] && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        🚇 交通方式
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.access[0].stations[0].name}
                      </span>
                      <p className="mt-1 text-sm text-gray-600">
                        {data.access[0].stations[0].walkTime}
                      </p>
                    </div>
                  )}
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <button
                      onClick={handleMapClick}
                      className={`${themeColors.text700} flex w-full items-center justify-center space-x-2 text-base font-medium`}
                    >
                      <span>🗺️</span>
                      <span>查看详细地图 ↓</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 参与建议卡片 */}
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  参与建议
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      👘 着装建议
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      建议穿着浴衣或轻便服装
                    </span>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      💡 参与提醒
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      请遵守现场秩序，注意安全
                    </span>
                  </div>
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <span
                      className={`${themeColors.text700} text-base font-medium`}
                    >
                      💡 建议提前了解活动流程和注意事项
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 位置地图卡片 */}
            {data.mapEmbedUrl && (
              <div id="map-section" className="mt-8">
                <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/60 to-white/40 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                  <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-900">
                    <span className="text-2xl">🗺️</span>
                    <span>位置地图</span>
                  </h3>
                  <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                    <iframe
                      src={data.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${data.name}会场位置`}
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 标签导航 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {[
                { id: 'overview', name: '概览', icon: '📋' },
                { id: 'venues', name: '会场信息', icon: '📍' },
                { id: 'access', name: '交通指南', icon: '🚇' },
                { id: 'viewing', name: '观赏攻略', icon: '👀' },
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
            <div className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/80 to-white/60 p-8 shadow-2xl backdrop-blur-sm">
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">
                      活动概览
                    </h3>
                    {data.history?.significance && (
                      <p className="mb-6 leading-relaxed text-gray-700">
                        {data.name}是{data.history.significance}
                        {data.history?.established &&
                          `，自${data.history.established}年开始举办`}
                        。
                        {data.expectedVisitors &&
                          `每年吸引约${data.expectedVisitors}观众前来观赏`}
                        。
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📜</span>
                        <span>历史意义</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {data.history?.highlights?.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-xs text-rose-600">
                              •
                            </span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        )) || (
                          <li className="text-sm text-gray-500">
                            历史信息暂无
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* 主要会场地址 */}
                    <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📍</span>
                        <span>主要会场</span>
                      </h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        {data.venues.slice(0, 2).map((venue, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 rounded-lg bg-blue-50 p-3"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                              •
                            </span>
                            <div>
                              <span className="font-semibold text-blue-900">
                                {venue.name}
                              </span>
                              <p className="mt-1 text-gray-600">
                                {venue.location}
                              </p>
                            </div>
                          </div>
                        ))}
                        {data.venues.length > 2 && (
                          <p className="mt-3 rounded-lg bg-blue-50 p-2 text-center text-xs text-blue-600">
                            点击"会场信息"查看全部{data.venues.length}个会场
                          </p>
                        )}
                      </div>
                    </div>

                    {data.venues[0]?.features &&
                      data.venues[0].features.length > 0 && (
                        <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                          <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                            <span className="text-xl">✨</span>
                            <span>活动特色</span>
                          </h4>
                          <div className="space-y-3 text-sm text-gray-700">
                            {data.venues[0].features.map((feature, index) => (
                              <p
                                key={index}
                                className="flex items-start space-x-3 rounded-lg bg-purple-50 p-3"
                              >
                                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600">
                                  •
                                </span>
                                <span className="leading-relaxed">
                                  {feature}
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {selectedTab === 'venues' && (
                <div className="space-y-8">
                  <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                    <span className="text-2xl">🏟️</span>
                    <span>会场信息</span>
                  </h3>
                  {data.venues.map((venue, index) => (
                    <div
                      key={index}
                      className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                          {index + 1}
                        </span>
                        <span>{venue.name}</span>
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
                              {venue.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl text-blue-600">🕐</span>
                          <div>
                            <span className="text-sm font-semibold text-blue-700">
                              开始时间：
                            </span>
                            <span className="ml-2 font-bold text-gray-900">
                              {venue.startTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'access' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    交通指南
                  </h3>
                  {data.access.map((accessInfo, index) => (
                    <div key={index}>
                      <h4 className="mb-4 text-xl font-semibold text-gray-800">
                        {accessInfo.venue}
                      </h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {accessInfo.stations.map((station, stationIndex) => (
                          <div
                            key={stationIndex}
                            className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
                          >
                            <h5 className="mb-2 font-bold text-gray-800">
                              {station.name}
                            </h5>
                            <div className="space-y-1 text-sm text-gray-700">
                              {station.lines.map((line, lineIndex) => (
                                <p key={lineIndex}>• {line}</p>
                              ))}
                              <p
                                className={`${themeColors.text600} mt-2 font-semibold`}
                              >
                                📍 {station.walkTime}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'viewing' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    观赏攻略
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.viewingSpots.map((spot, spotIndex) => (
                      <div
                        key={spotIndex}
                        className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
                      >
                        <div className="mb-3">
                          <h4 className="font-bold text-gray-800">
                            {spot.name}
                          </h4>
                        </div>
                        <p className="mb-3 text-sm text-gray-600">
                          人流: {spot.crowdLevel}
                        </p>
                        <p className="mb-3 text-sm text-gray-700">
                          {spot.tips}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-pink-600">
                              优点：
                            </span>
                            <ul className="text-xs text-gray-700">
                              {spot.pros.map((pro, proIndex) => (
                                <li key={proIndex}>• {pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-red-600">
                              缺点：
                            </span>
                            <ul className="text-xs text-gray-700">
                              {spot.cons.map((con, conIndex) => (
                                <li key={conIndex}>• {con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'tips' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    实用建议
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.tips.map((tipCategory, tipIndex) => {
                      // 为不同类别的建议卡片分配不同的渐变色
                      const gradientStyles = [
                        'bg-gradient-to-br from-rose-100 to-white border-rose-200/60',
                        'bg-gradient-to-br from-white to-blue-100 border-blue-200/60',
                        'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300/60',
                        'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200/60',
                        'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200/60',
                        'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200/60',
                      ];

                      const cardStyle =
                        gradientStyles[tipIndex % gradientStyles.length];

                      return (
                        <div
                          key={tipIndex}
                          className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 旅游服务推荐 - 变现区域 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                🎯 完美观赏攻略
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                为您推荐最佳住宿、交通和体验服务，让花火之旅更加完美！
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AffiliateLinks type="hotel" location={regionConfig.name} />
              <AffiliateLinks type="transport" />
            </div>
          </div>
        </section>

        {/* 评论区 */}
        <section className="bg-gradient-to-r from-red-50 to-blue-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                💬 观赏心得分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的观赏体验，为其他花火爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
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
                      className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      邮箱（可选）
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-rose-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    评论内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="分享您的观赏体验、最佳观赏位置、交通建议等..."
                    className="w-full resize-none rounded-lg border border-rose-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-rose-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    💡 提示：分享实用信息帮助其他游客更好地观赏花火
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
              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-blue-500 font-bold text-white">
                    花
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">花火爱好者</h4>
                      <span className="text-sm text-gray-500">
                        2024年9月21日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      今年参加了调布花火，真的很震撼！建议大家下午3点左右就到布田会场占位，晚上的大玉50连发简直太美了。京王多摩川站走过去确实只要10分钟，很方便。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-rose-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-rose-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (12)
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

              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-gradient-to-br from-white to-blue-400 font-bold text-blue-700">
                    旅
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">旅行达人</h4>
                      <span className="text-sm text-gray-500">
                        2024年9月20日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      电通大操场会场人相对少一些，适合带小朋友的家庭。虽然距离稍远但观赏效果也很不错，而且有座位比较舒适。记得带野餐垫！
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-rose-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-rose-600');
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

              <div className="transform rounded-3xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-rose-400 font-bold text-white">
                    摄
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">摄影师小王</h4>
                      <span className="text-sm text-gray-500">
                        2024年9月19日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      作为摄影爱好者，推荐京王多摩川会场！距离打上地点最近，拍摄效果最佳。建议带三脚架，花火幻想曲部分特别适合长曝光拍摄。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-rose-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-rose-600');
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

              {/* 加载更多 */}
              <div className="text-center">
                <button
                  className="transform rounded-full border border-red-200/50 bg-gradient-to-r from-red-50 to-blue-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-red-100 hover:to-blue-200 hover:shadow-lg"
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
