'use client';

import { useState } from 'react';

interface HanabiEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  visitors: string;
  fireworks: string;
  likes: number;
  area: string;
  time: string;
  highlights: string[];
  category: 'premium' | 'spectacular' | 'traditional' | 'standard';
}

interface ModernHanabiCardProps {
  event: HanabiEvent;
  onLike: (id: string) => void;
  isLiked: boolean;
}

export default function ModernHanabiCard({
  event,
  onLike,
  isLiked,
}: ModernHanabiCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'premium':
        return 'from-violet-500 via-purple-500 to-pink-500';
      case 'spectacular':
        return 'from-orange-500 via-red-500 to-pink-500';
      case 'traditional':
        return 'from-blue-500 via-cyan-500 to-teal-500';
      default:
        return 'from-gray-500 via-slate-500 to-gray-600';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'premium':
        return {
          text: '✨ 高级体验',
          color: 'bg-violet-100 text-violet-700 border-violet-200',
        };
      case 'spectacular':
        return {
          text: '🎆 震撼大型',
          color: 'bg-orange-100 text-orange-700 border-orange-200',
        };
      case 'traditional':
        return {
          text: '🏮 传统经典',
          color: 'bg-blue-100 text-blue-700 border-blue-200',
        };
      default:
        return {
          text: '🎇 标准',
          color: 'bg-gray-100 text-gray-700 border-gray-200',
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekday = weekdays[date.getDay()];
    return { month, day, weekday };
  };

  const dateInfo = formatDate(event.date);
  const badge = getCategoryBadge(event.category);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 主卡片容器 */}
      <div
        className={`relative transform overflow-hidden rounded-3xl border border-white/20 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-500 ease-out ${isHovered ? '-translate-y-2 scale-105 shadow-2xl' : 'scale-100'} hover:shadow-purple-500/10`}
      >
        {/* 渐变装饰条 */}
        <div
          className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${getCategoryGradient(event.category)}`}
        />

        {/* 背景装饰 */}
        <div className="absolute right-0 top-0 h-32 w-32 opacity-5">
          <div
            className={`h-full w-full bg-gradient-to-br ${getCategoryGradient(event.category)} rounded-full blur-3xl`}
          />
        </div>

        <div className="relative p-6">
          {/* 头部：日期 + 点赞 */}
          <div className="mb-4 flex items-start justify-between">
            {/* 日期卡片 */}
            <div
              className={`relative overflow-hidden bg-gradient-to-br ${getCategoryGradient(event.category)} transform rounded-2xl px-4 py-3 text-white shadow-lg transition-all duration-300 ${isHovered ? 'rotate-3 scale-110' : 'rotate-0 scale-100'} `}
            >
              <div className="text-center">
                <div className="text-xs font-medium opacity-90">
                  {dateInfo.month}月
                </div>
                <div className="text-2xl font-bold leading-none">
                  {dateInfo.day}
                </div>
                <div className="text-xs opacity-90">周{dateInfo.weekday}</div>
              </div>

              {/* 日期卡片光效 */}
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* 点赞按钮 */}
            <button
              onClick={e => {
                e.stopPropagation();
                onLike(event.id);
              }}
              className={`group/like relative rounded-2xl p-3 transition-all duration-300 ${
                isLiked
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
              } transform hover:scale-110 active:scale-95`}
            >
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover/like:scale-125"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              {/* 点赞数气泡 */}
              <div
                className={`absolute -right-1 -top-1 transform rounded-full bg-red-500 px-2 py-1 text-xs text-white transition-all duration-300 ${isLiked ? 'scale-110' : 'scale-100'} `}
              >
                {event.likes}
              </div>
            </button>
          </div>

          {/* 标题区域 */}
          <div className="mb-4">
            <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-gray-800">
              {event.title}
            </h3>

            {/* 分类徽章 */}
            <div
              className={`inline-flex items-center gap-2 ${badge.color} transform rounded-full border px-3 py-1 text-sm font-medium transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'} `}
            >
              {badge.text}
            </div>
          </div>

          {/* 地点信息 */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-50 p-2">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">会场地点</div>
                <div className="font-semibold text-gray-800">{event.area}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {event.location}
                </div>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-blue-600">
                  预计观众
                </span>
              </div>
              <div className="font-bold text-gray-800">{event.visitors}</div>
            </div>

            <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span className="text-xs font-medium text-orange-600">
                  花火规模
                </span>
              </div>
              <div className="font-bold text-gray-800">{event.fireworks}</div>
            </div>
          </div>

          {/* 特色标签 */}
          <div className="mb-4">
            <div className="mb-2 text-sm text-gray-500">✨ 活动特色</div>
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className={`rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-medium ${getCategoryGradient(event.category)}/10 transform border border-gray-200 text-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md`}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* 时间信息 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>开始时间: {event.time}</span>
            </div>
          </div>
        </div>

        {/* 悬停时的底部操作栏 */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${getCategoryGradient(event.category)} transform p-4 text-center text-white transition-all duration-500 ease-out ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} `}
        >
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 py-2 backdrop-blur-sm transition-colors hover:bg-white/30">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            查看详情
          </button>
        </div>
      </div>

      {/* 外围光环效果 */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getCategoryGradient(event.category)} -z-10 opacity-0 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'} `}
      />
    </div>
  );
}
