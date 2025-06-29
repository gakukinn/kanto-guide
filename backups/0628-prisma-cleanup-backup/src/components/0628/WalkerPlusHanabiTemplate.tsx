"use client";

/**
 * WalkerPlus花火四层详情页面模板 - 基于UniversalStaticDetailTemplate.tsx
 * 专门用于显示WalkerPlus花火大会数据
 * 保持原有样式和布局不变，只调整字段显示
 */
import { useState, useEffect } from 'react';

// WalkerPlus花火数据接口 - 对应14项字段
interface WalkerPlusHanabiData {
  // 基本信息
  eventName: string;           // 大会名
  fireworksCount: string;      // 打ち上げ数
  fireworksDuration: string;   // 打ち上げ時間
  expectedVisitors: string;    // 例年の人出
  eventPeriod: string;         // 開催期間
  eventTime: string;           // 開催時間
  weatherPolicy: string;       // 荒天の場合
  paidSeats: string;           // 有料席
  foodStalls: string;          // 屋台など
  otherNotes: string;          // その他・全体備考
  
  // 会场信息
  venue: string;               // 会場
  venueAccess: string;         // 会場アクセス
  parking: string;             // 駐車場
  contactInfo: string;         // 問い合わせ
  
  // 附加信息
  description?: string;        // 内容简介
  officialSite?: string;       // 官方网站
  googleMap?: string;          // 谷歌地图
  
  // 模板显示字段
  themeColor?: string;
  region?: string;
  
  // 媒体数据
  media?: Array<{
    type: 'image';
    url: string;
    title: string;
    alt: string;
    caption?: string;
  }>;
}

// 地区配置接口
interface RegionConfig {
  name: string;
  displayName: string;
  emoji: string;
  description: string;
}

interface WalkerPlusHanabiTemplateProps {
  data?: WalkerPlusHanabiData;
  regionKey?: string;
  regionConfig?: RegionConfig;
  // 页面生成器传递的参数
  activityType?: string;
  databaseId?: string;
}

export default function WalkerPlusHanabiTemplate({
  data: propData,
  regionKey: propRegionKey,
  regionConfig,
  activityType,
  databaseId,
}: WalkerPlusHanabiTemplateProps) {
  const [data, setData] = useState<WalkerPlusHanabiData | null>(propData || null);
  const [loading, setLoading] = useState<boolean>(!propData && !!databaseId);
  const [error, setError] = useState<string | null>(null);
  
  // 从数据库获取数据（当使用页面生成器时）
  useEffect(() => {
    if (!propData && databaseId && activityType) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/hanabi-events/${databaseId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const dbData = await response.json();
          
          // 将数据库数据转换为WalkerPlusHanabiData格式
          const convertedData: WalkerPlusHanabiData = {
            eventName: dbData.name || '',
            fireworksCount: dbData.fireworksCount || '详见官网',
            fireworksDuration: dbData.fireworksDuration || '详见官网',
            expectedVisitors: dbData.expectedVisitors || '详见官网',
            eventPeriod: dbData.datetime || '详见官网',
            eventTime: dbData.eventTime || '详见官网',
            weatherPolicy: dbData.weatherPolicy || '详见官网',
            paidSeats: dbData.price || '详见官网',
            foodStalls: dbData.foodStalls || '详见官网',
            otherNotes: dbData.otherNotes || '详见官网',
            venue: dbData.venue || '详见官网',
            venueAccess: dbData.access || '详见官网',
            parking: dbData.parking || '详见官网',
            contactInfo: dbData.contact || '详见官网',
            description: dbData.description || '',
            officialSite: dbData.website || '',
            googleMap: dbData.googleMap || '',
            themeColor: 'red',
            region: dbData.region || 'tokyo',
          };
          
          setData(convertedData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [propData, databaseId, activityType]);
  
  // 处理加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎆</div>
          <div className="text-lg text-gray-600">加载花火大会信息中...</div>
        </div>
      </div>
    );
  }
  
  // 处理错误状态
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-lg text-gray-600">
            {error || '无法加载花火大会信息'}
          </div>
        </div>
      </div>
    );
  }
  
  const regionKey = propRegionKey || data.region || 'tokyo';
  
  // 默认地区配置
  const defaultRegionConfigs: Record<string, RegionConfig> = {
    tokyo: { name: 'tokyo', displayName: '东京都', emoji: '🗼', description: '繁华都市的花火大会' },
    saitama: { name: 'saitama', displayName: '埼玉县', emoji: '🌸', description: '田园风光的花火大会' },
    chiba: { name: 'chiba', displayName: '千叶县', emoji: '🌊', description: '海滨城市的花火大会' },
    kanagawa: { name: 'kanagawa', displayName: '神奈川', emoji: '⛵', description: '山海相依的花火大会' },
    kitakanto: { name: 'kitakanto', displayName: '北关东', emoji: '🏯', description: '温泉乡的花火大会' },
    koshinetsu: { name: 'koshinetsu', displayName: '甲信越', emoji: '🗻', description: '山岳地带的花火大会' },
  };

  const region = regionConfig || defaultRegionConfigs[regionKey] || defaultRegionConfigs.tokyo;

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
            href={`/${regionKey}/hanabi`}
            className="font-medium transition-colors hover:text-blue-600 whitespace-nowrap"
          >
            🎆 花火大会
          </a>
          <span className="text-gray-400 flex-shrink-0">›</span>
          <span 
            className="font-medium text-blue-600 truncate min-w-0" 
            title={data.eventName}
          >
            {data.eventName}
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
        to: 'rose-100',
        primary: 'red-600',
        secondary: 'rose-500',
      },
      saitama: {
        from: 'orange-50',
        to: 'amber-100',
        primary: 'orange-600',
        secondary: 'amber-500',
      },
      chiba: {
        from: 'sky-50',
        to: 'cyan-100',
        primary: 'sky-600',
        secondary: 'cyan-500',
      },
      kanagawa: {
        from: 'blue-100',
        to: 'blue-200',
        primary: 'blue-600',
        secondary: 'blue-500',
      },
      kitakanto: {
        from: 'green-50',
        to: 'emerald-100',
        primary: 'green-600',
        secondary: 'emerald-500',
      },
      koshinetsu: {
        from: 'purple-50',
        to: 'violet-100',
        primary: 'purple-600',
        secondary: 'violet-500',
      },
    },
    ACTIVITY_COLORS: {
      hanabi: {
        from: 'blue-50',
        to: 'blue-100',
        primary: 'blue-600',
        secondary: 'blue-500',
      },
    },
  };

  // 生成与三层模板一致的背景渐变
  const getStandardBackgroundGradient = () => {
    const regionColor = COLOR_SYSTEM.REGION_COLORS[regionKey as keyof typeof COLOR_SYSTEM.REGION_COLORS] || COLOR_SYSTEM.REGION_COLORS.tokyo;
    const activityColor = COLOR_SYSTEM.ACTIVITY_COLORS.hanabi;
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
            {/* 图片展示卡片 */}
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
                      <div className="text-4xl mb-2">🎆</div>
                      <div>花火大会图片</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 大会名和内容简介 */}
            <div className={`mb-12 transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
              <h1 className="mb-4 text-xl font-bold leading-tight text-gray-900 md:text-2xl lg:text-3xl">
                {data.eventName}
              </h1>
              
              {/* 内容简介 */}
              {data.description && data.description !== '详见官网' && (
                <div className={`mt-6 transform rounded-3xl bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                  <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                    <span className="mr-2">📝</span>
                    内容简介
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
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className={`bg-gradient-to-r ${getStandardBackgroundGradient()} pb-16`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* 左右卡片布局 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              
              {/* 左卡片 - 活动基本信息 */}
              <div className={`transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">活动信息</h3>
                </div>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🎆 打ち上げ数：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.fireworksCount || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      ⏰ 打ち上げ時間：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.fireworksDuration || '详见官网'}
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
                      {data.eventPeriod || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🕐 開催時間：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.eventTime || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📍 会場：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.venue || '详见官网'}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">
                      🚇 会場アクセス：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.venueAccess || '详见官网'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右卡片 - 其他信息 */}
              <div className={`transform rounded-3xl border-2 border-red-200 bg-gradient-to-r ${getStandardBackgroundGradient()} p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  其他信息
                </h3>
                <div className="space-y-4 text-base">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      🌧️ 荒天の場合：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.weatherPolicy || '详见官网'}
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
                      💰 有料席：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.paidSeats || '详见官网'}
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="font-semibold text-gray-800 mb-2">
                      📞 問い合わせ：
                    </div>
                    <div className="font-bold text-gray-900">
                      {data.contactInfo || '详见官网'}
                    </div>
                  </div>

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
                      {data.otherNotes || '详见官网'}
                    </div>
                  </div>

                  {data.officialSite && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">
                        🌐 官方网站：
                      </div>
                      <a
                        href={data.officialSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${themeColors.text600} hover:${themeColors.text800} font-bold transition-colors duration-300 block`}
                      >
                        请以官方信息为准
                      </a>
                    </div>
                  )}
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
                    title={`${data.eventName}位置地图`}
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