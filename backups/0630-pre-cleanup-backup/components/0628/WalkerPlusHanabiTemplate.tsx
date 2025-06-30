"use client";

/**
 * WalkerPlus花火四层详情页面模板 - 基于UniversalStaticDetailTemplate.tsx
 * 保持与UniversalStaticDetailTemplate完全相同的布局和样式
 * 只是在卡片内容中显示14项WalkerPlus字段
 */
import { useState } from 'react';

// WalkerPlus花火数据接口 - 对应14项字段
interface WalkerPlusHanabiData {
  // 14项WalkerPlus花火数据字段
  name: string;                // 1. 大会名
  fireworksCount: string;      // 2. 打ち上げ数
  fireworksTime: string;       // 3. 打ち上げ時間
  expectedVisitors: string;    // 4. 例年の人出
  date: string;                // 5. 開催期間
  time: string;                // 6. 開催時間
  venue: string;               // 7. 会場
  access: string;              // 8. 会場アクセス
  weatherInfo: string;         // 9. 荒天の場合
  parking: string;             // 10. 駐車場
  price: string;               // 11. 有料席
  contact: string;             // 12. 問い合わせ
  foodStalls: string;          // 13. 屋台など
  notes: string;               // 14. その他・全体備考
  
  // 附加字段
  website: string;             // 官方网站
  googleMap: string;           // 谷歌地图
  
  // 系统字段
  id: string;
  region: string;
  activityType: string;
  description?: string;
  highlights?: string;
  themeColor?: string;
  status?: string;
  
  // 媒体数据
  media?: ReadonlyArray<{
    readonly type: 'image';
    readonly url: string;
    readonly title: string;
    readonly alt: string;
    readonly caption?: string;
  }>;
  
  // 时间戳字段
  createdAt?: string;
  updatedAt?: string;
}

// 地区配置接口
interface RegionConfig {
  name: string;
  displayName: string;
  emoji: string;
  description: string;
}

// 活动配置接口
interface ActivityConfig {
  name: string;
  displayName: string;
  emoji: string;
  description: string;
}

interface WalkerPlusHanabiTemplateProps {
  data: WalkerPlusHanabiData;
  regionKey: string;
  activityKey: string;
  regionConfig?: RegionConfig;
  activityConfig?: ActivityConfig;
}

export default function WalkerPlusHanabiTemplate({
  data,
  regionKey,
  activityKey,
  regionConfig,
  activityConfig,
}: WalkerPlusHanabiTemplateProps) {
  
  // 默认地区配置
  const defaultRegionConfigs: Record<string, RegionConfig> = {
    tokyo: { name: 'tokyo', displayName: '东京都', emoji: '🗼', description: '繁华都市的活动体验' },
    saitama: { name: 'saitama', displayName: '埼玉县', emoji: '🌸', description: '田园风光的活动乐趣' },
    chiba: { name: 'chiba', displayName: '千叶县', emoji: '🌊', description: '海滨城市的活动魅力' },
    kanagawa: { name: 'kanagawa', displayName: '神奈川', emoji: '⛵', description: '山海相依的活动胜地' },
    kitakanto: { name: 'kitakanto', displayName: '北关东', emoji: '🏯', description: '温泉乡的活动体验' },
    koshinetsu: { name: 'koshinetsu', displayName: '甲信越', emoji: '🗻', description: '山岳地带的活动风情' },
  };

  // 默认活动配置
  const defaultActivityConfigs: Record<string, ActivityConfig> = {
    matsuri: { name: 'matsuri', displayName: '传统祭典', emoji: '🏮', description: '传统文化的精彩展现' },
    hanami: { name: 'hanami', displayName: '花见会', emoji: '🌸', description: '樱花盛开的浪漫时光' },
    hanabi: { name: 'hanabi', displayName: '花火大会', emoji: '🎆', description: '夏夜绚烂的花火表演' },
    momiji: { name: 'momiji', displayName: '红叶狩', emoji: '🍁', description: '秋日红叶的绝美景色' },
    illumination: { name: 'illumination', displayName: '灯光秀', emoji: '✨', description: '璀璨夺目的灯光艺术' },
    culture: { name: 'culture', displayName: '文化艺术', emoji: '🎨', description: '深厚文化的艺术盛宴' },
  };

  const region = regionConfig || defaultRegionConfigs[regionKey] || defaultRegionConfigs.tokyo;
  const activity = activityConfig || defaultActivityConfigs[activityKey] || defaultActivityConfigs.hanabi;

  // 完全复制原始主题色配置
  const getThemeColors = (themeColor: string = 'red') => {
    const colorMap: Record<string, any> = {
      red: {
        bg50: 'bg-red-50',
        bg100: 'bg-red-100',
        bg200: 'bg-red-200',
        border200: 'border-red-200',
        text600: 'text-red-600',
        text800: 'text-red-800',
      },
      blue: {
        bg50: 'bg-blue-50',
        bg100: 'bg-blue-100',
        bg200: 'bg-blue-200',
        border200: 'border-blue-200',
        text600: 'text-blue-600',
        text800: 'text-blue-800',
      },
      green: {
        bg50: 'bg-green-50',
        bg100: 'bg-green-100',
        bg200: 'bg-green-200',
        border200: 'border-green-200',
        text600: 'text-green-600',
        text800: 'text-green-800',
      },
      orange: {
        bg50: 'bg-orange-50',
        bg100: 'bg-orange-100',
        bg200: 'bg-orange-200',
        border200: 'border-orange-200',
        text600: 'text-orange-600',
        text800: 'text-orange-800',
      },
    };
    return colorMap[themeColor] || colorMap.red;
  };

  const themeColors = getThemeColors(data.themeColor || 'red');

  // 状态翻译函数
  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: '正常举办',
      scheduled: '预定举行',
      confirmed: '确认举行',
      cancelled: '已取消',
      postponed: '延期举办',
      completed: '已结束',
      '正常举办': '正常举办',
      '预定举行': '预定举行',
      '确认举行': '确认举行',
      '已取消': '已取消',
      '延期举办': '延期举办',
      '已结束': '已结束'
    };
    return statusMap[status] || status;
  };

  // 面包屑导航组件
  const BreadcrumbNav = () => (
    <nav className="pb-2 pt-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gray-600 overflow-hidden">
          <a
            href="/"
            className="font-medium transition-colors hover:text-blue-600 whitespace-nowrap"
          >
            ⛩️ 首页
          </a>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <a
            href={`/${regionKey}`}
            className="font-medium transition-colors hover:text-blue-600 whitespace-nowrap"
          >
            {region.emoji} {region.displayName}活动
          </a>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <a
            href={`/${regionKey}/${activityKey}`}
            className="font-medium transition-colors hover:text-blue-600 whitespace-nowrap"
          >
            {activity.emoji} {activity.displayName}
          </a>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <span 
            className="font-medium text-blue-600 truncate min-w-0" 
            title={data.name}
          >
            {data.name}
          </span>
        </div>
      </div>
    </nav>
  );

  // 复制三层模板的COLOR_SYSTEM配置
  const COLOR_SYSTEM = {
    REGION_COLORS: {
      tokyo: {
        from: 'red-50',
        to: 'red-100',
        primary: 'red-600',
        secondary: 'red-500',
      },
      saitama: {
        from: 'pink-50',
        to: 'pink-100',
        primary: 'pink-600',
        secondary: 'pink-500',
      },
      chiba: {
        from: 'blue-50',
        to: 'blue-100',
        primary: 'blue-600',
        secondary: 'blue-500',
      },
      kanagawa: {
        from: 'indigo-50',
        to: 'indigo-100',
        primary: 'indigo-600',
        secondary: 'indigo-500',
      },
      kitakanto: {
        from: 'green-50',
        to: 'green-100',
        primary: 'green-600',
        secondary: 'green-500',
      },
      koshinetsu: {
        from: 'yellow-50',
        to: 'yellow-100',
        primary: 'yellow-600',
        secondary: 'yellow-500',
      },
    },
    ACTIVITY_COLORS: {
      matsuri: {
        from: 'red-50',
        to: 'red-100',
        primary: 'red-600',
        secondary: 'red-500',
      },
      hanami: {
        from: 'pink-50',
        to: 'pink-100',
        primary: 'pink-600',
        secondary: 'pink-500',
      },
      hanabi: {
        from: 'blue-50',
        to: 'blue-100',
        primary: 'blue-600',
        secondary: 'blue-500',
      },
      momiji: {
        from: 'orange-50',
        to: 'orange-100',
        primary: 'orange-600',
        secondary: 'orange-500',
      },
      illumination: {
        from: 'purple-50',
        to: 'purple-100',
        primary: 'purple-600',
        secondary: 'purple-500',
      },
      culture: {
        from: 'green-50',
        to: 'green-100',
        primary: 'green-600',
        secondary: 'green-500',
      },
    },
  };

  // 生成与三层模板一致的背景渐变
  const getStandardBackgroundGradient = () => {
    const regionColor = COLOR_SYSTEM.REGION_COLORS[regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS[activityKey as keyof typeof COLOR_SYSTEM.ACTIVITY_COLORS] || COLOR_SYSTEM.ACTIVITY_COLORS.hanabi;
    return `from-${regionColor.from} to-${activityColor.to}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getStandardBackgroundGradient()}`}>
      {/* 面包屑导航 */}
      <BreadcrumbNav />

      {/* 主要内容 */}
      <main className="relative z-10">
        {/* 顶部图片展示区域 */}
        <section className={`bg-gradient-to-r ${getStandardBackgroundGradient()} pb-8 pt-8`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 图片展示卡片 - 与标题卡片样式一致 */}
            <div className={`mb-12 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                {data.media && data.media.length > 0 ? (
                  <img
                    src={data.media[0].url}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">🖼️</div>
                      <div>暂无图片</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 标题区域 */}
            <div className={`mb-12 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
              <h1 className="mb-4 text-xl font-bold leading-tight text-gray-900 md:text-2xl lg:text-3xl">
                {data.name}
              </h1>
              
              {/* 内容简介 */}
              {data.description && data.description !== '详见官网' && (
                <div className={`mt-6 transform rounded-3xl bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                  <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                    <span className="mr-2">📝</span>
                    活动简介
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {data.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* 见どころ */}
              {data.highlights && data.highlights !== '详见官网' && (
                <div className={`mt-6 transform rounded-3xl bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                  <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                    <span className="mr-2">👀</span>
                    见どころ
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {data.highlights.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 主要内容区域 - WalkerPlus花火专用字段 */}
        <section className={`bg-gradient-to-r ${getStandardBackgroundGradient()} pb-16`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 左右两个卡片布局 */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              
              {/* 左边卡片 - 基本信息 */}
              <div className={`transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">🎆 花火大会信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🎇 打ち上げ数：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.fireworksCount || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      ⏱️ 打ち上げ時間：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.fireworksTime || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      👥 例年の人出：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.expectedVisitors || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📅 開催期間：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.date || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      ⏰ 開催時間：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.time || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🌧️ 荒天の場合：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.weatherInfo || '详见官网'}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">
                      🎫 有料席：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.price || '详见官网'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右边卡片 - 会场信息 */}
              <div className={`transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">📍 会场・联系信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🍜 屋台など：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.foodStalls || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📝 その他・全体備考：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.notes || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🏟️ 会場：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.venue || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🚇 会場アクセス：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.access || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🚗 駐車場：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.parking || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📞 問い合わせ：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.contact || '详见官网'}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">
                      🌐 官方网站：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.website ? (
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${themeColors.text600} hover:${themeColors.text800} transition-colors duration-300`}
                        >
                          请以官方信息为准
                        </a>
                      ) : (
                        '无'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 位置地图卡片 */}
            {data.googleMap && (
              <div className={`mt-8 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  📍 位置地图
                </h3>
                <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-gray-300">
                  <iframe
                    src={data.googleMap}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${data.name}位置地图`}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}