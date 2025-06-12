'use client';

import { useState, useEffect } from 'react';
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';

// 祭典事件数据接口
interface MatsuriEvent {
  id: string;
  title: string;
  japaneseName: string;
  englishName: string;
  date: string;
  endDate?: string;
  location: string;
  category: '大型' | '中型' | '小型';
  highlights: string[];
  likes: number;
  website: string;
  description: string;
}

export default function KoshinetsuMatsuriPage() {
  const [events, setEvents] = useState<MatsuriEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取祭典数据
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/matsuri/koshinetsu');
        if (response.ok) {
          const data = await response.json();
          // 转换API数据为模板所需格式
          const formattedEvents: MatsuriEvent[] = data.map((event: any) => ({
            id: event.id,
            title: event.name || event.title,
            japaneseName: event.japaneseName || '',
            englishName: event.englishName || '',
            date: event.date || '',
            location: event.location || '',
            category: event.scale === '特大型' ? '大型' : event.scale === '大型' ? '大型' : event.scale === '中型' ? '中型' : '小型',
            highlights: event.features || event.highlights || [],
            likes: Number(event.likes) || 0, // 确保是数字类型
            website: event.website || '',
            description: event.description || ''
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error('Error fetching matsuri events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 甲信越地区信息
  const koshinetsuRegion = {
    name: 'koshinetsu',
    displayName: '甲信越',
    emoji: '🗻',
    description: '山岳信仰与花火文化的圣地',
    navigationLinks: {
      prev: { name: '北关东', url: '/kitakanto/matsuri', emoji: '♨️' },
      next: { name: '东京', url: '/tokyo/matsuri', emoji: '🗼' },
      current: { name: '甲信越活动', url: '/koshinetsu' }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <MatsuriPageTemplate
      region={koshinetsuRegion}
      events={events}
      pageTitle="甲信越传统祭典"
      pageDescription="甲信越地区融合山岳信仰与花火文化，从御柱祭到长冈花火，感受千年传承的祭典魅力。"
      regionKey="koshinetsu"
      activityKey="matsuri"
    />
  );
} 