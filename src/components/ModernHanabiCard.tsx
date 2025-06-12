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

export default function ModernHanabiCard({ event, onLike, isLiked }: ModernHanabiCardProps) {
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
      case 'premium': return { text: '✨ 高级体验', color: 'bg-violet-100 text-violet-700 border-violet-200' };
      case 'spectacular': return { text: '🎆 震撼大型', color: 'bg-orange-100 text-orange-700 border-orange-200' };
      case 'traditional': return { text: '🏮 传统经典', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      default: return { text: '🎇 标准', color: 'bg-gray-100 text-gray-700 border-gray-200' };
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
      <div className={`
        relative overflow-hidden
        bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-xl
        border border-white/20
        transform transition-all duration-500 ease-out
        ${isHovered ? 'scale-105 shadow-2xl -translate-y-2' : 'scale-100'}
        hover:shadow-purple-500/10
      `}>
        
        {/* 渐变装饰条 */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryGradient(event.category)}`} />
        
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(event.category)} rounded-full blur-3xl`} />
        </div>

        <div className="relative p-6">
          {/* 头部：日期 + 点赞 */}
          <div className="flex justify-between items-start mb-4">
            {/* 日期卡片 */}
            <div className={`
              relative overflow-hidden
              bg-gradient-to-br ${getCategoryGradient(event.category)}
              text-white px-4 py-3 rounded-2xl
              shadow-lg
              transform transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
            `}>
              <div className="text-center">
                <div className="text-xs opacity-90 font-medium">{dateInfo.month}月</div>
                <div className="text-2xl font-bold leading-none">{dateInfo.day}</div>
                <div className="text-xs opacity-90">周{dateInfo.weekday}</div>
              </div>
              
              {/* 日期卡片光效 */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* 点赞按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(event.id);
              }}
              className={`
                relative group/like
                p-3 rounded-2xl
                transition-all duration-300
                ${isLiked 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                }
                transform hover:scale-110 active:scale-95
              `}
            >
              <svg className="w-6 h-6 transition-transform duration-300 group-hover/like:scale-125" 
                   fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              
              {/* 点赞数气泡 */}
              <div className={`
                absolute -top-1 -right-1
                bg-red-500 text-white text-xs
                px-2 py-1 rounded-full
                transform transition-all duration-300
                ${isLiked ? 'scale-110' : 'scale-100'}
              `}>
                {event.likes}
              </div>
            </button>
          </div>

          {/* 标题区域 */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
              {event.title}
            </h3>
            
            {/* 分类徽章 */}
            <div className={`
              inline-flex items-center gap-2
              ${badge.color} border
              px-3 py-1 rounded-full text-sm font-medium
              transform transition-all duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}>
              {badge.text}
            </div>
          </div>

          {/* 地点信息 */}
          <div className="mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">会场地点</div>
                <div className="font-semibold text-gray-800">{event.area}</div>
                <div className="text-sm text-gray-600 mt-1">{event.location}</div>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-blue-600 font-medium">预计观众</span>
              </div>
              <div className="font-bold text-gray-800">{event.visitors}</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-orange-600 font-medium">花火规模</span>
              </div>
              <div className="font-bold text-gray-800">{event.fireworks}</div>
            </div>
          </div>

          {/* 特色标签 */}
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">✨ 活动特色</div>
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium
                    bg-gradient-to-r ${getCategoryGradient(event.category)}/10
                    text-gray-700 border border-gray-200
                    transform transition-all duration-300
                    hover:scale-105 hover:shadow-md
                  `}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* 时间信息 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>开始时间: {event.time}</span>
            </div>
          </div>
        </div>

        {/* 悬停时的底部操作栏 */}
        <div className={`
          absolute bottom-0 left-0 right-0
          bg-gradient-to-r ${getCategoryGradient(event.category)}
          p-4 text-white text-center
          transform transition-all duration-500 ease-out
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}>
          <button className="flex items-center justify-center gap-2 w-full py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            查看详情
          </button>
        </div>
      </div>

      {/* 外围光环效果 */}
      <div className={`
        absolute inset-0 rounded-3xl
        bg-gradient-to-r ${getCategoryGradient(event.category)}
        opacity-0 blur-xl -z-10
        transition-opacity duration-500
        ${isHovered ? 'opacity-20' : 'opacity-0'}
      `} />
    </div>
  );
} 