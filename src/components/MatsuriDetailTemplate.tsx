'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  getRegionConfig,
  getThemeColors,
} from '../config/hanabi-detail-template';
import { MatsuriEvent } from '../utils/matsuri-data-validator';
import AffiliateLinks from './AffiliateLinks';
import MediaDisplay from './MediaDisplay';

interface MatsuriDetailTemplateProps {
  data: MatsuriEvent;
  regionKey: string;
}

export default function MatsuriDetailTemplate({
  data,
  regionKey,
}: MatsuriDetailTemplateProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // 使用 useMemo 优化计算
  const themeColors = useMemo(
    () => getThemeColors('orange'), // 祭典使用橙色主题
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

  // 格式化日期显示
  const formattedDate = useMemo(() => {
    return <span className="font-bold text-gray-900">{data.date}</span>;
  }, [data.date]);

  // 状态翻译函数
  const getCategoryText = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      夏祭り: '夏季祭典',
      山車祭り: '山车祭典',
      港祭り: '港口祭典',
      古式祭典: '古式祭典',
      七夕祭り: '七夕祭典',
      秋祭り: '秋季祭典',
      水辺祭り: '水边祭典',
      花火祭り: '烟火祭典',
      市民祭り: '市民祭典',
    };
    return categoryMap[category] || category;
  };

  // 解析联系方式为两行显示
  const parseContact = (contact: string) => {
    // 查找电话号码模式 (0xxx-xx-xxx)
    const phoneMatch = contact.match(/(\d{2,4}-\d{2,4}-\d{4})/);

    if (phoneMatch) {
      const phoneNumber = phoneMatch[1];
      const organizationName = contact.replace(phoneNumber, '').trim();

      return {
        organization: organizationName,
        phone: phoneNumber,
      };
    }

    // 如果没有找到电话号码，返回原始内容作为组织名
    return {
      organization: contact,
      phone: '',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 to-red-100">
      {/* 面包屑导航 */}
      <nav className="border-b border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 transition-colors hover:text-orange-600"
              >
                首页
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href={`/${regionKey}`}
                className="text-gray-500 transition-colors hover:text-orange-600"
              >
                {regionConfig.name}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href={`/${regionKey}/matsuri`}
                className="text-gray-500 transition-colors hover:text-orange-600"
              >
                传统祭典
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-orange-600">{data.title}</li>
          </ol>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部展示区域 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 pb-8 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 祭典展示图片区域 - 16:9比例 */}
            <div className="mb-8 rounded-3xl border-2 border-orange-200 bg-white/40 p-6 shadow-2xl backdrop-blur-sm">
              <MediaDisplay
                media={data.media || []}
                themeColors={themeColors}
                eventName={data.title}
                hideTitle={true}
              />
            </div>

            {/* 中日英三标题区域 */}
            <div className="mb-12 transform rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-100 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
              <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                {data.title}
              </h1>
              {data.japaneseName && (
                <p className="mb-3 text-lg font-semibold text-gray-700 opacity-90">
                  {data.japaneseName}
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
              {/* 祭典信息卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">祭典信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center whitespace-nowrap font-semibold text-gray-800">
                      📅 举办时间
                    </span>
                    <div className="text-right">{formattedDate}</div>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="flex items-center whitespace-nowrap font-semibold text-gray-800">
                      📍 举办地点
                    </span>
                    <span className="text-right font-bold text-gray-900">
                      {data.location}
                    </span>
                  </div>
                  {data.category && (
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="flex items-center whitespace-nowrap font-semibold text-gray-800">
                        🏮 祭典类型
                      </span>
                      <span
                        className={`${themeColors.text600} text-right font-bold`}
                      >
                        {getCategoryText(data.category)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 联系信息卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  官方信息
                </h3>
                <div className="space-y-4 text-base">
                  {data.organizer && (
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="flex items-center font-semibold text-gray-800">
                        🏛️ 主办方
                      </span>
                      <span className="text-right font-bold text-gray-900">
                        {data.organizer}
                      </span>
                    </div>
                  )}

                  {data.contact && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="mb-2 flex items-center font-semibold text-gray-800">
                        📞 联系方式
                      </span>
                      <div className="text-right">
                        {(() => {
                          const contactInfo = parseContact(data.contact);
                          return (
                            <div className="text-sm font-bold text-gray-900">
                              {contactInfo.organization}
                              {contactInfo.phone && (
                                <span className="ml-2 text-orange-700">
                                  {contactInfo.phone}
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {data.website && data.website !== '#' && (
                    <div className="border-b border-gray-200 pb-3">
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center font-bold transition-colors duration-300`}
                      >
                        🌐 官方网站 →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* 地图&交通卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  地图&交通
                </h3>
                <div className="space-y-4 text-base">
                  {data.schedule && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="mb-2 flex items-center font-semibold text-gray-800">
                        ⏰ 详细时间
                      </span>
                      <div className="whitespace-pre-line text-sm font-bold text-gray-900">
                        {data.schedule}
                      </div>
                    </div>
                  )}

                  {data.access && (
                    <div className="border-b border-gray-200 pb-3">
                      <span className="mb-2 flex items-center font-semibold text-gray-800">
                        🚗 交通方式
                      </span>
                      <div className="whitespace-pre-line font-bold text-orange-700">
                        {data.access}
                      </div>
                    </div>
                  )}

                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-semibold text-gray-800">
                        📍 地图
                      </span>
                      <button
                        onClick={handleMapClick}
                        className={`${themeColors.text600} hover:${themeColors.text800} flex items-center space-x-1 font-bold transition-colors duration-300`}
                      >
                        <span>查看详细地图 ↓</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 参与建议卡片 */}
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
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
                    <span className="mt-2 font-bold text-orange-700">
                      请遵守现场秩序，注意安全
                    </span>
                  </div>
                  <div
                    className={`${themeColors.bg50} border ${themeColors.border200} rounded-xl p-4`}
                  >
                    <span
                      className={`${themeColors.text700} text-base font-medium`}
                    >
                      💡 建议提前了解祭典流程和注意事项
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 位置地图卡片 */}
            {data.googleMapsUrl && data.googleMapsUrl !== '#' && (
              <div id="map-section" className="mt-8">
                <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/60 to-white/40 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl">
                  <h3 className="mb-6 flex items-center space-x-3 text-2xl font-bold text-gray-900">
                    <span className="text-2xl">🗺️</span>
                    <span>位置地图</span>
                  </h3>
                  <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                    <iframe
                      src={data.googleMapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${data.title}位置地图`}
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 标签导航 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {[
                { id: 'overview', name: '概览', icon: '📋' },
                { id: 'history', name: '历史文化', icon: '📜' },
                { id: 'highlights', name: '看点特色', icon: '✨' },
                { id: 'participate', name: '参与方式', icon: '🙋' },
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
                      祭典概览
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-700">
                      {data.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">🏮</span>
                        <span>祭典特色</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        {data.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
                              •
                            </span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                        <span className="text-xl">📍</span>
                        <span>举办地点</span>
                      </h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start space-x-3 rounded-lg bg-blue-50 p-3">
                          <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                            📍
                          </span>
                          <div>
                            <span className="font-semibold text-blue-900">
                              {data.location}
                            </span>
                            <p className="mt-1 text-gray-600">
                              详细地址请参考官方网站
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {data.category && (
                      <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                        <h4 className="mb-4 flex items-center space-x-2 text-lg font-bold text-gray-800">
                          <span className="text-xl">🎌</span>
                          <span>祭典类型</span>
                        </h4>
                        <div className="space-y-3 text-sm text-gray-700">
                          <p className="flex items-start space-x-3 rounded-lg bg-purple-50 p-3">
                            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600">
                              🏮
                            </span>
                            <span className="leading-relaxed">
                              {getCategoryText(data.category)}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    历史文化
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">📜</span>
                        <span>祭典起源</span>
                      </h4>
                      <p className="leading-relaxed text-gray-700">
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'highlights' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    看点特色
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                      >
                        <div className="mb-3">
                          <h4 className="flex items-center space-x-2 font-bold text-gray-800">
                            <span className="text-xl">✨</span>
                            <span>{highlight}</span>
                          </h4>
                        </div>
                        <p className="text-sm text-gray-700">
                          {data.title}的重要看点之一
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'participate' && (
                <div className="space-y-6">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    参与方式
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">🎌</span>
                        <span>观赏参与</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>作为观众欣赏祭典活动</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>体验传统文化氛围</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>品尝地方特色美食</span>
                        </li>
                      </ul>
                    </div>

                    <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl">
                      <h4 className="mb-4 flex items-center space-x-3 text-xl font-bold text-gray-800">
                        <span className="text-2xl">🙋</span>
                        <span>主动参与</span>
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>参与互动体验活动</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>了解申请志愿者机会</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="mt-1 text-orange-600">•</span>
                          <span>关注官方网站最新信息</span>
                        </li>
                      </ul>
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
                        category: '参观准备',
                        items: [
                          '提前查看官方网站了解活动时间',
                          '准备舒适的步行鞋',
                          '带上相机记录美好时刻',
                          '准备现金用于购买纪念品',
                        ],
                      },
                      {
                        category: '交通建议',
                        items: [
                          '使用公共交通工具前往',
                          '提前规划返程路线',
                          '避开高峰时段',
                          '关注临时交通管制信息',
                        ],
                      },
                      {
                        category: '文化礼仪',
                        items: [
                          '保持安静，不打扰仪式进行',
                          '拍照时注意询问是否允许',
                          '遵守现场工作人员指引',
                          '尊重传统文化和参与者',
                        ],
                      },
                    ].map((tipCategory, tipIndex) => (
                      <div
                        key={tipIndex}
                        className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
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

        {/* 旅游服务推荐 */}
        <section className="bg-gradient-to-r from-orange-50 to-red-100 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                🎯 完美祭典体验
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                为您推荐最佳住宿、交通服务，让祭典之旅更加完美！
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
                💬 参与体验分享
              </h2>
              <p className="mx-auto max-w-2xl text-gray-700">
                分享您的祭典体验，为其他文化爱好者提供实用建议
              </p>
            </div>

            {/* 发表评论 */}
            <div className="mb-8 transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
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

                {/* 评分选择 */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    体验评分
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        className="text-2xl transition-colors hover:text-orange-400 focus:text-orange-500"
                        onClick={e => {
                          const button = e.currentTarget;
                          const parent = button.parentElement;
                          if (parent) {
                            const stars = parent.querySelectorAll('button');
                            stars.forEach((s, index) => {
                              if (index < star) {
                                s.textContent = '⭐';
                                s.classList.add('text-orange-500');
                              } else {
                                s.textContent = '☆';
                                s.classList.remove('text-orange-500');
                              }
                            });
                          }
                        }}
                      >
                        ☆
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      点击星星评分
                    </span>
                  </div>
                </div>

                {/* 体验类型标签 */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    体验类型
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '首次参加',
                      '多次参加',
                      '家庭出游',
                      '独自体验',
                      '朋友聚会',
                      '文化学习',
                      '摄影爱好',
                    ].map(tag => (
                      <button
                        key={tag}
                        className="rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-sm transition-all hover:border-orange-300 hover:bg-orange-100 focus:border-orange-400 focus:bg-orange-200"
                        onClick={e => {
                          const button = e.currentTarget;
                          button.classList.toggle('bg-orange-200');
                          button.classList.toggle('border-orange-400');
                          button.classList.toggle('text-orange-800');
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    评论内容
                  </label>
                  <textarea
                    rows={4}
                    placeholder="分享您的参与体验、文化感受、实用建议等..."
                    className="w-full resize-none rounded-lg border border-orange-200 bg-white/80 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-500">
                      💡 提示：分享文化体验帮助其他游客更好地了解传统祭典
                    </p>
                  </div>
                  <button
                    className="transform rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-orange-500 hover:to-red-600 hover:shadow-lg"
                    onClick={() => alert('评论功能开发中，敬请期待！')}
                  >
                    发表评论
                  </button>
                </div>
              </div>
            </div>

            {/* 评论统计 */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <span>💭</span>
                <span>游客评论 (2)</span>
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>平均评分: 4.8/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>👥</span>
                  <span>参与人数: 156</span>
                </div>
              </div>
            </div>

            {/* 示例评论 */}
            <div className="space-y-6">
              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 font-bold text-white">
                    祭
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-gray-800">祭典爱好者</h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-orange-500">⭐⭐⭐⭐⭐</span>
                          <span className="text-sm text-gray-500">(5.0)</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        2024年9月21日
                      </span>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                        首次参加
                      </span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        家庭出游
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      参加了今年的祭典，真的非常震撼！传统的仪式和现代的氛围完美结合，让人深深感受到日本文化的魅力。特别推荐带家人一起来，孩子们对传统表演非常感兴趣。建议提前了解祭典流程，这样能更好地欣赏每个环节的文化内涵。
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-orange-600"
                          onClick={e => {
                            const button = e.currentTarget;
                            const countSpan =
                              button.querySelector('span:last-child');
                            if (countSpan) {
                              const currentCount = parseInt(
                                countSpan.textContent || '0'
                              );
                              const newCount = currentCount + 1;
                              countSpan.textContent = `(${newCount})`;
                              button.classList.add('text-orange-600');
                              button.disabled = true;
                            }
                          }}
                        >
                          <span>👍</span>
                          <span>有用</span>
                          <span>(8)</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-blue-600"
                          onClick={() => alert('回复功能开发中，敬请期待！')}
                        >
                          <span>💬</span>
                          <span>回复</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-green-600"
                          onClick={() => alert('分享功能开发中，敬请期待！')}
                        >
                          <span>📤</span>
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="transform rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-white/90 to-white/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 font-bold text-white">
                    文
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-bold text-gray-800">文化研究者</h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-orange-500">⭐⭐⭐⭐⭐</span>
                          <span className="text-sm text-gray-500">(4.8)</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        2024年9月20日
                      </span>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
                        多次参加
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                        文化学习
                      </span>
                    </div>
                    <p className="mb-3 leading-relaxed text-gray-700">
                      作为研究日本传统文化的学者，这个祭典保持了很好的传统特色。每年都会来观察记录，发现主办方在传承传统的同时也在与时俱进。建议对文化感兴趣的朋友一定要来体验，能学到很多书本上学不到的知识。推荐提前做功课，了解祭典的历史背景。
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-orange-600"
                          onClick={e => {
                            const button = e.currentTarget;
                            const countSpan =
                              button.querySelector('span:last-child');
                            if (countSpan) {
                              const currentCount = parseInt(
                                countSpan.textContent?.replace(/[()]/g, '') ||
                                  '0'
                              );
                              const newCount = currentCount + 1;
                              countSpan.textContent = `(${newCount})`;
                              button.classList.add('text-orange-600');
                              button.disabled = true;
                            }
                          }}
                        >
                          <span>👍</span>
                          <span>有用</span>
                          <span>(12)</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-blue-600"
                          onClick={() => alert('回复功能开发中，敬请期待！')}
                        >
                          <span>💬</span>
                          <span>回复</span>
                        </button>
                        <button
                          className="flex items-center space-x-1 transition-colors hover:text-green-600"
                          onClick={() => alert('分享功能开发中，敬请期待！')}
                        >
                          <span>📤</span>
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 加载更多 */}
              <div className="text-center">
                <button
                  className="transform rounded-full border border-orange-200/50 bg-gradient-to-r from-orange-50 to-red-100 px-8 py-3 font-medium text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:from-orange-100 hover:to-red-200 hover:shadow-lg"
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
