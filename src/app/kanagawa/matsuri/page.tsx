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

export default function KanagawaMatsuriPage() {
  const [events, setEvents] = useState<MatsuriEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取祭典数据
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/matsuri/kanagawa');
        if (response.ok) {
          const data = await response.json();
          // 转换API数据为模板所需格式
          const formattedEvents: MatsuriEvent[] = data.map((event: any) => ({
            id: event.id,
            title: event.name,
            japaneseName: event.japaneseName,
            englishName: event.englishName,
            date: event.dates, // 直接使用文本日期，不需要转换
            location: event.location,
            category: event.scale === 'large' ? '大型' : event.scale === 'medium' ? '中型' : '小型',
            highlights: event.features,
            likes: event.likes,
            website: event.website,
            description: event.description
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

  // 神奈川地区信息
  const kanagawaRegion = {
    name: 'kanagawa',
    displayName: '神奈川县',
    emoji: '⛵',
    description: '湘南海岸的海洋文化与镰仓古都的历史传统',
    navigationLinks: {
      prev: { name: '千叶', url: '/chiba/matsuri', emoji: '🌊' },
      next: { name: '北关东', url: '/kitakanto/matsuri', emoji: '♨️' },
      current: { name: '神奈川活动', url: '/kanagawa' }
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
      region={kanagawaRegion}
      events={events}
      pageTitle="神奈川县传统祭典"
      pageDescription="神奈川县融合海洋文化与古都传统，从镰仓祭到湘南海岸祭典，感受独特的文化魅力。"
      regionKey="kanagawa"
      activityKey="matsuri"
    />
  );
} 