'use client';

import { useMemo, useState } from 'react';
import AffiliateLinks from './AffiliateLinks';
import MediaDisplay from './MediaDisplay';
import MomijiBreadcrumb from './shared/MomijiBreadcrumb';

// 红叶狩数据接口
interface MomijiData {
  id: string;
  name: string;
  englishName?: string;
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
  viewingPeriod: string; // 观赏期间
  peakTime: string; // 最佳观赏时间
  coloringStart?: string; // 变色开始时间
  expectedVisitors: string; // 预计游客数
  location: string;
  description: string;
  themeColor: string;
  status: string;
  ticketPrice: string;
  contact?: {
    organizer: string;
    phone: string;
    website?: string;
  };
  mapInfo?: {
    parking: string;
  };
  weatherInfo?: {
    rainPolicy: string;
    note?: string;
    recommendation?: string;
  };
  venues: Array<{
    name: string;
    location: string;
    startTime: string;
    features?: string[];
  }>;
  access: Array<{
    venue: string;
    stations: Array<{
      name: string;
      lines: string[];
      walkTime: string;
    }>;
  }>;
  viewingSpots: Array<{
    name: string;
    crowdLevel: string;
    tips: string;
    pros: string[];
    cons: string[];
  }>;
  tips: Array<{
    category: string;
    items: string[];
  }>;
  history?: {
    significance: string;
    established?: string;
    highlights?: string[];
  };
  media?: {
    images?: Array<{
      url: string;
      alt: string;
      caption?: string;
    }>;
    videos?: Array<{
      url: string;
      title: string;
      thumbnail?: string;
    }>;
  };
  mapEmbedUrl?: string;
}

interface MomijiDetailTemplateProps {
  data: MomijiData;
  regionKey: string;
}

// 主题颜色配置
const getThemeColors = (themeColor: string) => {
  const colorMap: { [key: string]: any } = {
    orange: {
      bg50: 'bg-orange-50',
      bg200: 'bg-orange-200',
      text600: 'text-orange-600',
      text700: 'text-orange-700',
      text800: 'text-orange-800',
      border200: 'border-orange-200',
    },
    red: {
      bg50: 'bg-red-50',
      bg200: 'bg-red-200',
      text600: 'text-red-600',
      text700: 'text-red-700',
      text800: 'text-red-800',
      border200: 'border-red-200',
    },
  };
  return colorMap[themeColor] || colorMap.orange;
};

// 地区配置
const getRegionConfig = (regionKey: string) => {
  const regionConfigs: { [key: string]: any } = {
    tokyo: { name: '东京都' },
    saitama: { name: '埼玉县' },
    chiba: { name: '千叶县' },
    kanagawa: { name: '神奈川县' },
    kitakanto: { name: '北关东' },
    koshinetsu: { name: '甲信越' },
  };
  return regionConfigs[regionKey] || regionConfigs.tokyo;
};

export default function MomijiDetailTemplate({
  data,
  regionKey,
}: MomijiDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

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

  // 格式化时间显示
  const formattedPeakTime = useMemo(() => {
    return <span className="font-bold text-gray-900">{data.peakTime}</span>;
  }, [data.peakTime]);

  // 状态翻译函数
  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      scheduled: '预定开始',
      confirmed: '确认观赏期',
      cancelled: '已结束',
      postponed: '延期',
      completed: '已结束',
    };
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-red-100">
      {/* 面包屑导航 */}
      <MomijiBreadcrumb regionKey={regionKey} momijiName={data.name} />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 红叶狩展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-orange-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={
                  data.media
                    ? [
                        ...(data.media.images?.map(img => ({
                          type: 'image' as const,
                          url: img.url,
                          title: img.alt,
                          description: img.caption || img.alt,
                          alt: img.alt,
                          caption: img.caption,
                        })) || []),
                        ...(data.media.videos?.map(video => ({
                          type: 'video' as const,
                          url: video.url,
                          title: video.title,
                          description: video.title,
                          thumbnail: video.thumbnail,
                        })) || []),
                      ]
                    : undefined
                }
                themeColors={themeColors}
                eventName={data.name}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
        <section className="bg-gradient-to-r from-orange-50 to-red-100 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 四个卡片平均分布网格布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {/* 活动信息卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">观赏信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      📅 观赏期间
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.viewingPeriod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      ⭐ 最佳时期
                    </span>
                    <div className="text-right">{formattedPeakTime}</div>
                  </div>
                  {data.coloringStart && (
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="flex items-center font-semibold text-gray-800">
                        🍃 变色开始
                      </span>
                      <span
                        className={`${themeColors.text600} text-right font-bold`}
                      >
                        {data.coloringStart}
                      </span>
                    </div>
                  )}
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
                      📍 观赏地点
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* 联系信息卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  联系信息
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      🏢 管理方
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.contact?.organizer || '当地管理部门'}
                    </span>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      📞 咨询电话
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.contact?.phone || '请参考官方网站'}
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
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`${themeColors.bg200} ${themeColors.text800} rounded-full border px-4 py-2 text-base font-bold ${themeColors.border200} whitespace-nowrap shadow-sm`}
                    >
                      {getStatusText(data.status)}
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-green-200 px-4 py-2 text-center text-base font-bold leading-tight text-green-900 shadow-sm">
                      {data.ticketPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* 地图&交通卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                      🚗 停车场
                    </span>
                    <div className="mt-2 whitespace-pre-line font-bold text-orange-700">
                      {data.mapInfo?.parking || '停车信息请参考官方网站'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 天气提醒卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  观赏提醒
                </h3>
                <div className="space-y-4 text-base">
                  {data.weatherInfo?.rainPolicy && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        🌦️ 天气条件
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.weatherInfo.rainPolicy}
                      </span>
                    </div>
                  )}
                  {data.weatherInfo?.note && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        💡 注意事项
                      </span>
                      <span className="mt-2 font-bold text-orange-700">
                        {data.weatherInfo.note}
                      </span>
                    </div>
                  )}
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <span
                      className={`${themeColors.text700} text-base font-medium`}
                    >
                      💡{' '}
                      {data.weatherInfo?.recommendation ||
                        '建议提前确认最新红叶情报，选择天气晴朗的日子前往'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签导航 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {[
                { id: 'overview', name: '概览', icon: '📋' },
                { id: 'venues', name: '观赏地点', icon: '📍' },
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
            <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/80 to-white/60 p-8 shadow-2xl backdrop-blur-sm">
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-800">
                      红叶观赏概览
                    </h3>
                    {data.history?.significance && (
                      <p className="mb-6 leading-relaxed text-gray-700">
                        {data.name}是{data.history.significance}
                        {data.history?.established &&
                          `，自${data.history.established}年开始成为知名红叶观赏地`}
                        。
                        {data.expectedVisitors &&
                          `每年吸引约${data.expectedVisitors}观众前来观赏`}
                        。
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📜</span>
                        <span>历史背景</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {data.history?.highlights?.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
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

                    {/* 主要观赏地点 */}
                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📍</span>
                        <span>主要观赏地</span>
                      </h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        {data.venues.slice(0, 2).map((venue, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 rounded-lg bg-orange-50 p-3"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
                              •
                            </span>
                            <div>
                              <span className="font-semibold text-orange-900">
                                {venue.name}
                              </span>
                              <p className="mt-1 text-gray-600">
                                {venue.location}
                              </p>
                            </div>
                          </div>
                        ))}
                        {data.venues.length > 2 && (
                          <p className="mt-3 rounded-lg bg-orange-50 p-2 text-center text-xs text-orange-600">
                            点击"观赏地点"查看全部{data.venues.length}个地点
                          </p>
                        )}
                      </div>
                    </div>

                    {data.venues[0]?.features &&
                      data.venues[0].features.length > 0 && (
                        <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                          <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                            <span className="text-xl">✨</span>
                            <span>观赏特色</span>
                          </h4>
                          <div className="space-y-3 text-sm text-gray-700">
                            {data.venues[0].features.map((feature, index) => (
                              <p
                                key={index}
                                className="flex items-start space-x-3 rounded-lg bg-red-50 p-3"
                              >
                                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
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

                  {/* 地图 */}
                  {data.mapEmbedUrl && (
                    <div id="map-section" className="mt-8">
                      <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                        <h4 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                          <span className="text-2xl">🗺️</span>
                          <span>观赏地图</span>
                        </h4>
                        <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                          <iframe
                            src={data.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${data.name}观赏位置`}
                            className="rounded-2xl"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'venues' && (
                <div className="space-y-8">
                  <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                    <span className="text-2xl">🍁</span>
                    <span>观赏地点信息</span>
                  </h3>
                  {data.venues.map((venue, index) => (
                    <div
                      key={index}
                      className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                          {index + 1}
                        </span>
                        <span>{venue.name}</span>
                      </h4>
                      <div className="mb-4 rounded-xl bg-orange-50 p-4">
                        <div className="flex items-start space-x-3">
                          <span className="mt-1 text-xl text-orange-600">
                            📍
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-orange-700">
                              地址：
                            </span>
                            <span className="ml-2 text-gray-700">
                              {venue.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-red-50 p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl text-red-600">🕐</span>
                          <div>
                            <span className="text-sm font-semibold text-red-700">
                              最佳观赏时间：
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
                            className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
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
                        className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
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
                            <span className="text-xs font-semibold text-green-600">
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
                        'bg-gradient-to-br from-orange-100 to-white border-orange-200/60',
                        'bg-gradient-to-br from-white to-red-100 border-red-200/60',
                        'bg-gradient-to-br from-red-100 to-red-200 border-red-300/60',
                        'bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200/60',
                        'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200/60',
                        'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200/60',
                      ];

                      const cardStyle =
                        gradientStyles[tipIndex % gradientStyles.length];

                      return (
                        <div
                          key={tipIndex}
                          className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8"
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
        <section className="bg-gradient-to-r from-orange-50 to-red-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                🎯 完美观赏攻略
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                为您推荐最佳住宿、交通和体验服务，让红叶狩之旅更加完美！
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AffiliateLinks type="hotel" location={regionConfig.name} />
              <AffiliateLinks type="transport" />
            </div>
          </div>
        </section>

        {/* 评论区 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                💬 观赏心得分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的观赏体验，为其他红叶狩爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
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
                      className="w-full rounded-lg border border-orange-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      邮箱（可选）
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-orange-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    评论内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="分享您的观赏体验、最佳观赏位置、交通建议、摄影技巧等..."
                    className="w-full resize-none rounded-lg border border-orange-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    💡 提示：分享实用信息帮助其他游客更好地观赏红叶
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

            {/* 示例评论列表 */}
            <div className="space-y-6">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>💭</span>
                <span>游客评论 (3)</span>
              </h3>

              {/* 示例评论 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 font-bold text-white">
                    枫
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">红叶狩爱好者</h4>
                      <span className="text-sm text-gray-500">
                        2024年11月20日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      今年高尾山红叶真的很美！建议早上8点左右就去，缆车还不用排队，山顶看到的红叶层次分明。下午人会很多，但傍晚时分的光线特别适合拍照。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-orange-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-orange-600');
                              button.disabled = true;
                            }
                          }
                        }}
                      >
                        👍 有用 (23)
                      </button>
                      <button
                        className="transition-colors hover:text-red-600"
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
                  className="transform rounded-full border border-orange-200/50 bg-gradient-to-r from-orange-50 to-red-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-orange-100 hover:to-red-200 hover:shadow-lg"
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
