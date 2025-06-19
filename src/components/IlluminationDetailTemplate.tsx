'use client';

import { useMemo, useState } from 'react';
import { HanabiMedia } from '../types/hanabi';
import AffiliateLinks from './AffiliateLinks';
import MediaDisplay from './MediaDisplay';
import IlluminationBreadcrumb from './shared/IlluminationBreadcrumb';

// 灯光秀数据接口
interface IlluminationData {
  id: string;
  name: string;
  englishName?: string;
  _sourceData?: {
    japaneseName: string;
    japaneseDescription?: string;
  };
  illuminationPeriod: string; // 点灯期间
  lightingTime: string; // 点灯时间
  bulbCount: string; // 电球数量
  bulbCountNum?: number; // 数字化电球数
  expectedVisitors: string; // 预计游客数
  location: string;
  description: string;
  theme?: string;
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

interface IlluminationDetailTemplateProps {
  data: IlluminationData;
  regionKey: string;
}

// 主题颜色配置
const getThemeColors = (themeColor: string) => {
  const colorMap: { [key: string]: any } = {
    purple: {
      bg50: 'bg-purple-50',
      bg100: 'bg-purple-100',
      bg200: 'bg-purple-200',
      bg500: 'bg-purple-500',
      bg600: 'bg-purple-600',
      text600: 'text-purple-600',
      text700: 'text-purple-700',
      text800: 'text-purple-800',
      border200: 'border-purple-200',
      gradientFrom: 'from-purple-100',
      gradientTo: 'to-purple-200',
    },
    blue: {
      bg50: 'bg-blue-50',
      bg100: 'bg-blue-100',
      bg200: 'bg-blue-200',
      bg500: 'bg-blue-500',
      bg600: 'bg-blue-600',
      text600: 'text-blue-600',
      text700: 'text-blue-700',
      text800: 'text-blue-800',
      border200: 'border-blue-200',
      gradientFrom: 'from-blue-100',
      gradientTo: 'to-blue-200',
    },
  };
  return colorMap[themeColor] || colorMap.purple;
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

export default function IlluminationDetailTemplate({
  data,
  regionKey,
}: IlluminationDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const themeColors = useMemo(
    () => getThemeColors(data.themeColor),
    [data.themeColor]
  );
  const regionConfig = useMemo(() => getRegionConfig(regionKey), [regionKey]);

  // Convert IlluminationData media to HanabiMedia format
  const convertedMedia = useMemo((): HanabiMedia[] => {
    if (!data.media) return [];

    const mediaArray: HanabiMedia[] = [];

    // Convert images
    if (data.media.images) {
      data.media.images.forEach((image, index) => {
        mediaArray.push({
          type: 'image',
          url: image.url,
          title: image.alt || `${data.name} - 图片 ${index + 1}`,
          description: image.caption || `${data.name}的精彩瞬间`,
          alt: image.alt,
          caption: image.caption,
        });
      });
    }

    // Convert videos
    if (data.media.videos) {
      data.media.videos.forEach(video => {
        mediaArray.push({
          type: 'video',
          url: video.url,
          title: video.title,
          description: `${data.name}现场视频`,
          thumbnail: video.thumbnail,
        });
      });
    }

    return mediaArray;
  }, [data.media, data.name]);

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
  const formattedTime = useMemo(() => {
    const timeMatches = data.lightingTime.match(/\d{1,2}:\d{2}/g);
    if (timeMatches && timeMatches.length > 0) {
      return (
        <span className="font-bold text-gray-900">{timeMatches[0]}开始</span>
      );
    }
    return <span className="font-bold text-gray-900">{data.lightingTime}</span>;
  }, [data.lightingTime]);

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
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-100">
      {/* 面包屑导航 */}
      <IlluminationBreadcrumb
        regionKey={regionKey}
        illuminationName={data.name}
      />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 灯光秀展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-purple-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={convertedMedia}
                themeColors={themeColors}
                eventName={data.name}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
        <section className="bg-gradient-to-r from-purple-50 to-blue-100 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 四个卡片平均分布网格布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {/* 活动信息卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">活动信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      📅 点灯期间
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.illuminationPeriod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      🕐 点灯时间
                    </span>
                    <div className="text-right">{formattedTime}</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center font-semibold text-gray-800">
                      💡 电球数
                    </span>
                    <span
                      className={`${themeColors.text600} text-right font-bold`}
                    >
                      {data.bulbCount}
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
                      🎨 主题
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.theme || '精彩灯光秀'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 联系信息卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`${themeColors.bg200} ${themeColors.text800} rounded-full border px-4 py-2 text-base font-bold ${themeColors.border200} whitespace-nowrap shadow-sm`}
                    >
                      {getStatusText(data.status)}
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-pink-200 px-4 py-2 text-center text-base font-bold leading-tight text-pink-900 shadow-sm">
                      {data.ticketPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* 地图&交通卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                    <div className="mt-2 whitespace-pre-line font-bold text-purple-700">
                      {data.mapInfo?.parking || '停车信息请参考官方网站'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 天气提醒卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  观赏提醒
                </h3>
                <div className="space-y-4 text-base">
                  {data.weatherInfo?.rainPolicy && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        🌦️ 举办条件
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.weatherInfo.rainPolicy}
                      </span>
                    </div>
                  )}
                  {data.weatherInfo?.note && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        💡 建议
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
                        '建议提前关注天气变化，注意保暖'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签导航 */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-100 py-12">
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
            <div className="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/80 to-white/60 p-8 shadow-2xl backdrop-blur-sm">
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
                    <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600">
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
                    <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                        <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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

                  {/* 地图 */}
                  {data.mapEmbedUrl && (
                    <div id="map-section" className="mt-8">
                      <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                        <h4 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                          <span className="text-2xl">🗺️</span>
                          <span>会场地图</span>
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
                            title={`${data.name}会场位置`}
                            className="rounded-2xl"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 其他标签页内容与花火模板类似，但调整为灯光秀相关内容 */}
              {selectedTab === 'venues' && (
                <div className="space-y-8">
                  <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-800">
                    <span className="text-2xl">🏟️</span>
                    <span>会场信息</span>
                  </h3>
                  {data.venues.map((venue, index) => (
                    <div
                      key={index}
                      className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
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
                              点灯时间：
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

              {/* 其他标签页内容省略，与花火模板结构相同但调整为灯光秀相关内容 */}
            </div>
          </div>
        </section>

        {/* 旅游服务推荐 - 变现区域 */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                🎯 完美观赏攻略
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                为您推荐最佳住宿、交通和体验服务，让灯光秀之旅更加完美！
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AffiliateLinks type="hotel" location={regionConfig.name} />
              <AffiliateLinks type="transport" />
            </div>
          </div>
        </section>

        {/* 评论区 */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                💬 观赏心得分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的观赏体验，为其他灯光秀爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
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
                      className="w-full rounded-lg border border-purple-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      邮箱（可选）
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-purple-200 bg-white/80 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-400"
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
                    className="w-full resize-none rounded-lg border border-purple-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    💡 提示：分享实用信息帮助其他游客更好地观赏灯光秀
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
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-100 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 font-bold text-white">
                    灯
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h4 className="font-bold text-gray-800">灯光秀爱好者</h4>
                      <span className="text-sm text-gray-500">
                        2024年12月15日
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      今年的六本木Hills灯光秀真的很震撼！建议大家傍晚5点左右就到，可以看到从白天到夜晚的渐变效果。特别是Artelligent
                      Christmas的光影投射太美了。
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button
                        className="transition-colors hover:text-purple-600"
                        onClick={e => {
                          const button = e.currentTarget;
                          if (button.textContent) {
                            const match = button.textContent.match(/\d+/);
                            if (match) {
                              const currentCount = parseInt(match[0]);
                              const newCount = currentCount + 1;
                              button.textContent = `👍 有用 (${newCount})`;
                              button.classList.add('text-purple-600');
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
                  className="transform rounded-full border border-purple-200/50 bg-gradient-to-r from-purple-50 to-blue-100 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-purple-100 hover:to-blue-200 hover:shadow-lg"
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
