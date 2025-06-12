'use client';

import { useState } from 'react';
import ModernHanabiCard from '@/components/ModernHanabiCard';

export default function DesignDemoPage() {
  const [likedEvents, setLikedEvents] = useState<Set<string>>(new Set());

  const sampleEvent = {
    id: 'sumida-river-48',
    title: '第48回 隅田川花火大会',
    date: '2025-07-26',
    location: '樱桥下流～言问桥上流',
    visitors: '约91万人',
    fireworks: '约2万发',
    likes: 141,
    area: '墨田区',
    time: '19:00～',
    highlights: ['关东传统', '历史悠久', '规模最大'],
    category: 'traditional' as const
  };

  const sampleEvent2 = {
    id: 'tokyo-keiba-2025',
    title: '东京竞马场花火 2025 ～花火与流行音乐精选～',
    date: '2025-07-02',
    location: '东京竞马场',
    visitors: '非公表',
    fireworks: '1万4000发',
    likes: 178,
    area: '府中市',
    time: '19:30～',
    highlights: ['音乐烟花', '流行音乐主题', '日本最高峰'],
    category: 'premium' as const
  };

  const sampleEvent3 = {
    id: 'itabashi-66',
    title: '第66回 板桥花火大会',
    date: '2025-08-02',
    location: '板桥区 荒川河川敷',
    visitors: '57万人',
    fireworks: '约1万5000发',
    likes: 80,
    area: '板桥区',
    time: '19:00～',
    highlights: ['都内最大尺玉', '压倒性震撼', '荒川河畔'],
    category: 'spectacular' as const
  };

  const handleLike = (eventId: string) => {
    setLikedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const OldDesignCard = ({ event }: { event: any }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* 旧设计的卡片头部 */}
      <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {new Date(event.date).getMonth() + 1}月{new Date(event.date).getDate()}日
          </span>
          <button className="text-white hover:text-pink-200 transition-colors">
            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm opacity-90 mb-2">{event.area}</p>
        <p className="text-sm opacity-90">{event.time}</p>
      </div>

      {/* 旧设计的卡片内容 */}
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">会场信息</h4>
            <p className="text-gray-600 text-sm">{event.location}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">预计观众</span>
              <p className="font-semibold text-gray-800">{event.visitors}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">花火规模</span>
              <p className="font-semibold text-gray-800">{event.fireworks}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">活动特色</h4>
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((highlight: string, idx: number) => (
                <span key={idx} className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <span className="text-gray-600 text-sm">{event.likes}</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              传统经典
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 花火卡片设计对比</h1>
          <p className="text-xl text-gray-600">现代化设计 vs 当前设计</p>
        </div>

        {/* 设计对比区域 */}
        <div className="space-y-16">
          
          {/* 第一组对比 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ❌ 当前设计
              </h2>
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <OldDesignCard event={sampleEvent} />
              </div>
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>• 🎨 设计较为传统，缺乏视觉冲击力</p>
                <p>• 📱 交互反馈简单</p>
                <p>• 💫 缺少微动画和精致效果</p>
                <p>• 📊 信息展示相对平面</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ✨ 现代化设计
              </h2>
              <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 rounded-2xl shadow-lg">
                <ModernHanabiCard 
                  event={sampleEvent} 
                  onLike={handleLike}
                  isLiked={likedEvents.has(sampleEvent.id)}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>• 🎨 毛玻璃效果 + 渐变背景</p>
                <p>• 📱 丰富的悬停动画</p>
                <p>• 💫 日期卡片 + 光环效果</p>
                <p>• 📊 分层次的信息展示</p>
              </div>
            </div>
          </div>

          {/* 第二组对比 - Premium卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">高级体验类 - 当前</h3>
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <OldDesignCard event={sampleEvent2} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">高级体验类 - 新设计</h3>
              <div className="bg-gradient-to-br from-violet-50 via-white to-pink-50 p-4 rounded-2xl shadow-lg">
                <ModernHanabiCard 
                  event={sampleEvent2} 
                  onLike={handleLike}
                  isLiked={likedEvents.has(sampleEvent2.id)}
                />
              </div>
            </div>
          </div>

          {/* 第三组对比 - Spectacular卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">震撼大型类 - 当前</h3>
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <OldDesignCard event={sampleEvent3} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">震撼大型类 - 新设计</h3>
              <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 rounded-2xl shadow-lg">
                <ModernHanabiCard 
                  event={sampleEvent3} 
                  onLike={handleLike}
                  isLiked={likedEvents.has(sampleEvent3.id)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 设计特点说明 */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8">🚀 现代化设计特点</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold mb-2">毛玻璃效果</h3>
              <p className="text-sm text-gray-600">backdrop-blur + 透明度创造现代感</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="font-bold mb-2">微交互动画</h3>
              <p className="text-sm text-gray-600">悬停缩放、旋转、光效增强体验</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold mb-2">信息分层</h3>
              <p className="text-sm text-gray-600">视觉层次清晰，重点信息突出</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold mb-2">智能交互</h3>
              <p className="text-sm text-gray-600">隐藏操作栏，状态反馈明确</p>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="text-center mt-12">
          <a
            href="/tokyo/hanabi"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            ← 返回东京花火页面
          </a>
        </div>
      </div>
    </div>
  );
} 