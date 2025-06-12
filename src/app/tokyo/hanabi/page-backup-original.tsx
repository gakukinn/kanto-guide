/**
 * 花火大会页面模板 - 完全一致版本
 * @layer 三层 (Category Layer)
 * @category 花火
 * @region 东京
 * @description 展示东京地区所有花火大会，支持日期筛选和红心互动
 * @TEMPLATE_REQUIRED 此文件必须严格按照模板创建，违反将被自动检测
 * @ENFORCE_VALIDATION 包含强制验证标识符，确保AI使用模板
 */
'use client';

import { useState, useEffect } from 'react';

// 东京花火数据（基于WalkerPlus官方信息）
const tokyoHanabiEvents = [
  {
    id: 'tokyo-keiba-2025',
    title: '东京竞马场花火 2025 〜花火与J-POP BEST〜',
    date: '2025-06-14',
    location: '东京都・府中市/东京竞马场',
    visitors: '约90,000人',
    fireworks: '约12,000发',
    category: '大型',
    highlights: ['J-POP音乐', '座席观赏', '竞马场特色'],
    likes: 180
  },
  {
    id: 'sumida-river-48',
    title: '第48回 隅田川花火大会',
    date: '2025-07-26',
    location: '东京都・墨田区/隅田川',
    visitors: '约95万人',
    fireworks: '约20,000发',
    category: '特大型',
    highlights: ['历史悠久', '东京湾景观', '传统花火'],
    likes: 420
  },
  {
    id: 'katsushika-59',
    title: '第59回 葛饰纳凉花火大会',
    date: '2025-07-22',
    location: '东京都・葛饰区/江户川河川敷',
    visitors: '约75万人',
    fireworks: '约15,000发',
    category: '大型',
    highlights: ['江户川河岸', '传统纳凉', '地域特色'],
    likes: 310
  },
  {
    id: 'edogawa-50',
    title: '第50回 江户川区花火大会',
    date: '2025-08-02',
    location: '东京都・江户川区/江户川河川敷',
    visitors: '约139万人',
    fireworks: '约14,000发',
    category: '特大型',
    highlights: ['规模最大', '50周年纪念', '河川敷观赏'],
    likes: 580
  },
  {
    id: 'jingu-gaien-2025',
    title: '2025 神宫外苑花火大会',
    date: '2025-08-16',
    location: '东京都・新宿区/明治神宫外苑',
    visitors: '约100万人',
    fireworks: '约10,000发',
    category: '大型',
    highlights: ['音乐花火祭典', '明治神宫外苑', '1万发感动'],
    likes: 91
  },
  {
    id: 'itabashi-66',
    title: '第66回 板桥花火大会',
    date: '2025-08-02',
    location: '东京都・板桥区/荒川河川敷',
    visitors: '约52万人',
    fireworks: '约12,000发',
    category: '大型',
    highlights: ['关东最大级', '荒川河畔', '传统花火'],
    likes: 320
  },
  {
    id: 'tamagawa-48',
    title: '第48回 多摩川花火大会',
    date: '2025-10-04',
    location: '东京都・世田谷区/多摩川河畔',
    visitors: '约43万人',
    fireworks: '约6,000发',
    category: '大型',
    highlights: ['多摩川景观', '川崎合办', '双岸花火'],
    likes: 285
  },
  {
    id: 'adachi-47',
    title: '第47回 足立の花火',
    date: '2025-05-31',
    location: '东京都・足立区/荒川河川敷(东京地铁千代田线铁桥～西新井桥间)',
    visitors: '约40万人',
    fireworks: '约14,010发',
    category: '大型',
    highlights: ['高密度花火', '1小时1万4000发', '夏季最早花火'],
    likes: 557
  },
  {
    id: 'taito-shitamachi-34',
    title: '第34回 台东夏祭"下町花火"',
    date: '2025-07-26',
    location: '东京都・台东区/隅田公园',
    visitors: '约10万人',
    fireworks: '约12,000发',
    category: '中型',
    highlights: ['下町风情', '隅田公园', '夏祭特色'],
    likes: 180
  },
  {
    id: 'odaiba-romantic-5',
    title: '第5回 台场夏祭SPECIAL〜浪漫花火大会〜',
    date: '2025-08-30',
    location: '东京都・港区/台场海滨公园',
    visitors: '约8万人',
    fireworks: '约10,000发',
    category: '中型',
    highlights: ['台场夜景', '浪漫约会', '海上花火'],
    likes: 165
  },
  {
    id: 'setagaya-tamagawa-47',
    title: '第47回 世田谷区多摩川花火大会',
    date: '2025-10-04',
    location: '东京都・世田谷区/区立二子玉川绿地运动场(二子桥上游)',
    visitors: '约26万人',
    fireworks: '约6,000发',
    category: '大型',
    highlights: ['秋空花火', '多摩川两岸呼应', '约6000发大花火'],
    likes: 45
  },
  {
    id: 'kita-hanabi-11',
    title: '第11回 北区花火会',
    date: '2024-09-28',
    location: '东京都・北区/荒川河川敷・岩渊水门周边',
    visitors: '约5万人以上',
    fireworks: '约10,000发',
    category: '大型',
    highlights: ['RED×BLUE SPARKLE GATE', '岩渊水门', '已结束活动'],
    likes: 955
  },
  {
    id: 'okutama-70th',
    title: '町制施行70周年纪念 奥多摩纳凉花火大会',
    date: '2025-08-09',
    location: '东京都・西多摩郡奥多摩町/爱宕山广场',
    visitors: '约1万人',
    fireworks: '约1,000发',
    category: '小型',
    highlights: ['山间花火', '70周年纪念', '自然环境'],
    likes: 65
  },
  {
    id: 'akishima-kujira-53',
    title: '第53回 昭岛市民鲸鱼祭 梦花火',
    date: '2025-08-23',
    location: '东京都・昭岛市/昭岛市民球场',
    visitors: '约4万5000人',
    fireworks: '约2,000发',
    category: '中型',
    highlights: ['鲸鱼祭特色', '市民活动', '梦想主题'],
    likes: 75
  },
  {
    id: 'star-island-2025',
    title: 'STAR ISLAND 2025',
    date: '2025-05-24',
    location: '东京都・港区/台场海滨公园',
    visitors: '未公开',
    fireworks: '未公开',
    category: '特色',
    highlights: ['新次元未来型娱乐', '台场音乐花火', '5月24-25日'],
    likes: 400
  }
];

// 获取花火分类颜色 - 统一使用东京色→花火色渐变
const getCategoryColor = (category: string) => {
  // 所有卡片都使用东京专属色渐变到花火专属色(蓝色)
  return 'from-red-50 to-blue-100 border-red-300';
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

export default function TokyoHanabiPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [filteredEvents, setFilteredEvents] = useState(tokyoHanabiEvents);

  // 初始化点赞数据
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    tokyoHanabiEvents.forEach(event => {
      initialLikes[event.id] = event.likes;
    });
    
    // 从localStorage加载保存的点赞数据
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tokyo-hanabi-likes');
      if (saved) {
        try {
          const savedLikes = JSON.parse(saved);
          // 合并初始数据和保存的数据，保存的数据优先
          const mergedLikes: Record<string, number> = {};
          tokyoHanabiEvents.forEach(event => {
            mergedLikes[event.id] = savedLikes[event.id] >= event.likes ? savedLikes[event.id] : event.likes;
          });
          setLikes(mergedLikes);
        } catch (error) {
          // 如果localStorage数据损坏，使用初始数据
          setLikes(initialLikes);
        }
      } else {
        setLikes(initialLikes);
      }
    } else {
      setLikes(initialLikes);
    }
  }, []);

  // 日期筛选
  useEffect(() => {
    let filtered = tokyoHanabiEvents;
    
    if (startDate) {
      filtered = filtered.filter(event => event.date >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(event => event.date <= endDate);
    }
    
    setFilteredEvents(filtered);
  }, [startDate, endDate]);

  // 点赞处理
  const handleLike = (eventId: string) => {
    const newLikes = {
      ...likes,
      [eventId]: (likes[eventId] || 0) + 1
    };
    setLikes(newLikes);
    
    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tokyo-hanabi-likes', JSON.stringify(newLikes));
    }
  };

  // 按时间排序 - 未来优先，过去跟随，都按时间正序（标准排序方式）
  const sortedEvents = filteredEvents.sort((a, b) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);
    
    const todayTime = today.getTime();
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    
    const isAFutureOrToday = timeA >= todayTime;
    const isBFutureOrToday = timeB >= todayTime;
    
    // 如果一个是未来/今天，一个是过去，未来/今天的优先
    if (isAFutureOrToday && !isBFutureOrToday) return -1;
    if (!isAFutureOrToday && isBFutureOrToday) return 1;
    
    // 都是未来/今天或都是过去，按时间正序排列
    return timeA - timeB;
  });

  // 获取今日日期
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100">
      {/* 面包屑导航 */}
      <nav className="pt-4 pb-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <a href="/" className="hover:text-red-600 transition-colors font-medium">🏠 首页</a>
            <span className="text-gray-400">›</span>
            <a href="/tokyo" className="hover:text-red-600 transition-colors font-medium">🗼 东京活动</a>
            <span className="text-gray-400">›</span>
            <span className="text-red-600 font-medium">🎆 花火大会</span>
          </div>
        </div>
      </nav>

      {/* 标题区域 */}
      <section className="pt-12 pb-12 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <span className="text-5xl mr-4">🗼</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
              东京花火大会
            </h1>
            <span className="text-5xl ml-4">🎆</span>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            汇聚东京都最精彩的花火大会，从隅田川的传统花火到竞马场的音乐花火，感受日本首都的璀璨夜空
          </p>
        </div>
      </section>

      {/* 日历筛选器 */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="flex items-center text-lg font-medium text-gray-700">
                <span className="text-2xl mr-2">📅</span>
                筛选日期：
              </label>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <label className="text-sm text-gray-600">开始日期：</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <label className="text-sm text-gray-600">指定日期：</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  清除筛选
                </button>
              )}
              <div className="text-sm text-gray-600">
                共找到 {sortedEvents.length} 场花火大会
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 花火大会列表 */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🎭</span>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">暂无花火大会</h3>
              <p className="text-gray-600">选择的日期暂无花火大会安排</p>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {sortedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`bg-gradient-to-r ${getCategoryColor(event.category)} backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-2`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* 主要信息 */}
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700">
                            <span className="flex items-center">
                              <span className="text-lg mr-1">📅</span>
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center">
                              <span className="text-lg mr-1">📍</span>
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <span className="text-lg mr-1">👥</span>
                              {event.visitors}
                            </span>
                            <span className="flex items-center">
                              <span className="text-lg mr-1">🎆</span>
                              {event.fireworks}
                            </span>
                          </div>
                        </div>

                        {/* 红心点赞 */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(event.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-gray-800 rounded-full hover:bg-amber-100 transform hover:scale-110 transition-all duration-200 shadow-lg border border-amber-200"
                          >
                            <span className="text-xl">❤️</span>
                            <span className="font-bold">{likes[event.id] || 0}</span>
                          </button>
                        </div>
                      </div>

                      {/* 特色标签 */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.highlights.map((highlight: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 快速导航 */}
      <section className="py-8 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">探索其他地区花火</h3>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            {/* 上一个地区花火 */}
            <a href="/koshinetsu/hanabi" className="group flex items-center space-x-3 bg-gradient-to-br from-red-50 to-blue-100 rounded-xl p-4 border-2 border-cyan-200 hover:border-cyan-300 transition-all duration-200">
              <div className="text-2xl">⛰️</div>
              <div className="text-left">
                <div className="text-sm text-cyan-700">← 上一个</div>
                <div className="font-bold text-cyan-800 group-hover:text-cyan-900 transition-colors">甲信越花火</div>
              </div>
            </a>

            {/* 当前地区 */}
            <div className="flex items-center space-x-3 bg-gradient-to-br from-red-50 to-blue-100 rounded-xl p-4 border-2 border-red-300">
              <div className="text-3xl">🗼</div>
              <div className="text-center">
                <div className="text-sm text-red-600">当前位置</div>
                <div className="font-bold text-red-600">东京花火</div>
              </div>
            </div>

            {/* 下一个地区花火 */}
            <a href="/saitama/hanabi" className="group flex items-center space-x-3 bg-gradient-to-br from-red-50 to-blue-100 rounded-xl p-4 border-2 border-slate-200 hover:border-slate-300 transition-all duration-200">
              <div className="text-2xl">🏢</div>
              <div className="text-right">
                <div className="text-sm text-slate-700">下一个 →</div>
                <div className="font-bold text-slate-800 group-hover:text-slate-900 transition-colors">埼玉花火</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 返回按钮 */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/tokyo"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 via-gray-100 to-blue-100 text-gray-600 rounded-full hover:from-gray-200 hover:via-gray-200 hover:to-blue-200 hover:text-gray-700 transform hover:scale-105 transition-all duration-200 shadow-md font-medium border border-gray-100"
          >
            <span className="text-xl mr-2">🏮</span>
            返回东京活动页面
          </a>
        </div>
      </section>
    </div>
  );
}