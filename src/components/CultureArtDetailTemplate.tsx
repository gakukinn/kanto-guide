'use client';

import { useMemo, useState } from 'react';
import {
  getRegionConfig,
  getThemeColors,
  validateCultureArtData,
} from '../config/culture-art-detail-template';
import { CultureArtData } from '../types/culture-art';
import AffiliateLinks from './AffiliateLinks';
import MediaDisplay from './MediaDisplay';
import CultureArtBreadcrumb from './shared/CultureArtBreadcrumb';

interface CultureArtDetailTemplateProps {
  data: CultureArtData;
  regionKey: string;
}

export default function CultureArtDetailTemplate({
  data,
  regionKey,
}: CultureArtDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // 验证数据格式
  const validation = validateCultureArtData(data);
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
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100">
      {/* 面包屑导航 */}
      <CultureArtBreadcrumb regionKey={regionKey} cultureArtName={data.name} />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 文化艺术展示图片区域 - 置顶显示 */}
            <div className="mb-8 rounded-3xl border-2 border-purple-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={data.media}
                themeColors={themeColors}
                eventName={data.name}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
        <section className="bg-gradient-to-r from-purple-50 to-indigo-100 pb-16">
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
                      🎨 艺术类型
                    </span>
                    <span
                      className={`${themeColors.text600} text-right font-bold`}
                    >
                      {data.artType}
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
                  <div className="pt-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                        data.status === 'confirmed'
                          ? `${themeColors.bg100} ${themeColors.text800}`
                          : data.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : data.status === 'postponed'
                              ? 'bg-yellow-100 text-yellow-800'
                              : `${themeColors.bg100} ${themeColors.text800}`
                      }`}
                    >
                      {getStatusText(data.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 票务信息卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  票务信息
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <span className="flex items-center font-semibold text-gray-800">
                      💰 票价
                    </span>
                    <span className="mt-2 font-bold text-gray-900">
                      {data.ticketPrice}
                    </span>
                  </div>
                  {data.contact?.ticketUrl && (
                    <div className="border-b border-gray-200 pb-3">
                      <a
                        href={data.contact.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center font-bold transition-colors duration-300`}
                      >
                        🎫 购票链接
                      </a>
                    </div>
                  )}
                  {data.dynamicData?.ticketing && (
                    <>
                      <div className="border-b border-gray-200 pb-3">
                        <span className="flex items-center font-semibold text-gray-800">
                          🗓️ 销售期间
                        </span>
                        <span className="mt-2 text-sm text-gray-700">
                          {data.dynamicData.ticketing.salesStart} -{' '}
                          {data.dynamicData.ticketing.salesEnd}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                            data.dynamicData.ticketing.availability ===
                            'available'
                              ? 'bg-green-100 text-green-800'
                              : data.dynamicData.ticketing.availability ===
                                  'sold-out'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {data.dynamicData.ticketing.availability ===
                          'available'
                            ? '可购买'
                            : data.dynamicData.ticketing.availability ===
                                'sold-out'
                              ? '已售完'
                              : '尚未开售'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 特色亮点卡片 */}
              <div className="transform rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  特色亮点
                </h3>
                <div className="space-y-4 text-base">
                  {data.specialFeatures?.artistLevel && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        ⭐ 艺术家水平
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.specialFeatures.artistLevel}
                      </span>
                    </div>
                  )}
                  {data.specialFeatures?.artForm && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        🎭 艺术形式
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.specialFeatures.artForm}
                      </span>
                    </div>
                  )}
                  {data.specialFeatures?.tradition && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="flex items-center font-semibold text-gray-800">
                        🏛️ 传统特色
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.specialFeatures.tradition}
                      </span>
                    </div>
                  )}
                  {data.specialFeatures?.atmosphere && (
                    <div className="pt-2">
                      <span className="flex items-center font-semibold text-gray-800">
                        🌟 现场氛围
                      </span>
                      <span className="mt-2 font-bold text-gray-900">
                        {data.specialFeatures.atmosphere}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 标签页导航 */}
            <div className="mt-12">
              <div className="rounded-t-3xl border-b border-purple-200 bg-white/40 backdrop-blur-sm">
                <nav
                  className="-mb-px flex space-x-8 px-6 py-4"
                  aria-label="Tabs"
                >
                  {[
                    { id: 'overview', name: '活动概览', icon: '📋' },
                    { id: 'access', name: '交通指南', icon: '🚇' },
                    { id: 'spots', name: '观赏位置', icon: '📍' },
                    { id: 'tips', name: '参观攻略', icon: '💡' },
                    { id: 'history', name: '历史背景', icon: '📚' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`${
                        selectedTab === tab.id
                          ? `border-purple-500 ${themeColors.text600}`
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium transition-colors duration-200`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* 标签页内容区域 */}
            <div className="rounded-b-3xl border-2 border-t-0 border-purple-200 bg-white/60 p-8 shadow-xl backdrop-blur-sm">
              {selectedTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                      活动概览
                    </h3>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        这是一场精彩的文化艺术活动，将为观众带来独特的艺术体验。
                      </p>
                      {data.description && <p>{data.description}</p>}
                      {data.special2025?.theme && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-900">
                            2025年特别主题
                          </h4>
                          <p className="mt-2">{data.special2025.theme}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 地图区域 */}
                  {data.mapEmbedUrl && (
                    <div id="map-section" className="mt-8">
                      <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        会场位置
                      </h3>
                      <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                        <iframe
                          src={data.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${data.name}会场地图`}
                        />
                      </div>
                      {data.mapInfo?.mapNote && (
                        <p className="mt-4 text-sm text-gray-600">
                          {data.mapInfo.mapNote}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'access' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">交通指南</h3>
                  {data.access.map((accessInfo, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white/60 p-6 shadow-md"
                    >
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">
                        {accessInfo.venue}
                      </h4>
                      <div className="space-y-3">
                        {accessInfo.stations.map((station, stationIndex) => (
                          <div
                            key={stationIndex}
                            className="border-l-4 border-purple-300 pl-4"
                          >
                            <div className="font-medium text-gray-900">
                              {station.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {station.lines.join(' / ')} - 步行约
                              {station.walkTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'spots' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    观赏位置推荐
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {data.viewingSpots.map((spot, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-white/60 p-6 shadow-md"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {spot.name}
                          </h4>
                          <div className="flex items-center">
                            <span className="mr-1 text-yellow-400">⭐</span>
                            <span className="font-medium">{spot.rating}/5</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                              spot.crowdLevel === '低'
                                ? 'bg-green-100 text-green-800'
                                : spot.crowdLevel === '中'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            拥挤度: {spot.crowdLevel}
                          </span>
                        </div>
                        <p className="mb-4 text-sm text-gray-700">
                          {spot.tips}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-green-700">
                              优点：
                            </span>
                            <ul className="ml-4 list-disc text-sm text-gray-600">
                              {spot.pros.map((pro, proIndex) => (
                                <li key={proIndex}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-red-700">
                              缺点：
                            </span>
                            <ul className="ml-4 list-disc text-sm text-gray-600">
                              {spot.cons.map((con, conIndex) => (
                                <li key={conIndex}>{con}</li>
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
                  <h3 className="text-2xl font-bold text-gray-900">参观攻略</h3>
                  {data.tips.map((tipCategory, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white/60 p-6 shadow-md"
                    >
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">
                        {tipCategory.category}
                      </h4>
                      <ul className="space-y-2">
                        {tipCategory.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="mr-2 mt-1 text-purple-500">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">历史背景</h3>
                  <div className="rounded-xl bg-white/60 p-6 shadow-md">
                    <div className="mb-4">
                      <span className="text-sm font-medium text-purple-600">
                        创立年份
                      </span>
                      <p className="text-2xl font-bold text-gray-900">
                        {data.history.established}年
                      </p>
                    </div>
                    <div className="mb-6">
                      <h4 className="mb-2 text-lg font-semibold text-gray-900">
                        历史意义
                      </h4>
                      <p className="text-gray-700">
                        {data.history.significance}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-3 text-lg font-semibold text-gray-900">
                        历史亮点
                      </h4>
                      <ul className="space-y-2">
                        {data.history.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 mt-1 text-purple-500">•</span>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 相关推荐 */}
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                相关推荐
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.related.regionRecommendations.slice(0, 6).map(item => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="group block rounded-xl border-2 border-purple-200 bg-white/60 p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <h4 className="mb-2 font-semibold text-gray-900 group-hover:text-purple-600">
                      {item.name}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📅 {item.date}</p>
                      <p>📍 {item.location}</p>
                      <p>👥 {item.visitors}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 关联链接 */}
            <AffiliateLinks type="hotel" />
          </div>
        </section>
      </main>
    </div>
  );
}
