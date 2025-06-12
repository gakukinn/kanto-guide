'use client';

import { useState, useEffect } from 'react';
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { MatsuriEvent, fetchAndValidateMatsuriData } from '@/utils/matsuri-data-validator';

// 地区配置 - 使用标准配色系统
const chibaRegionConfig = {
  name: 'chiba',
  displayName: '千叶',
  emoji: '🌊',
  // gradientColors: 移除手动配色，使用自动生成
  description: '房总半岛的传统文化与海洋风情，从成田祇园祭到佐原大祭，体验千叶独特的祭典魅力。',
  navigationLinks: {
    prev: { name: '埼玉祭典', url: '/saitama/matsuri', emoji: '🏮' },
    next: { name: '神奈川祭典', url: '/kanagawa/matsuri', emoji: '⛵' },
    current: { name: '千叶活动', url: '/chiba' }
  }
};

export default function ChibaMatsuriPage() {
  const [events, setEvents] = useState<MatsuriEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 使用新的验证工具，自动处理数据格式问题
        const validatedEvents = await fetchAndValidateMatsuriData('chiba');
        setEvents(validatedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-red-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-700 mx-auto"></div>
          <p className="mt-4 text-sky-700 font-medium">加载千叶祭典信息中...</p>
        </div>
      </div>
    );
  }

  return (
    <MatsuriPageTemplate
      region={chibaRegionConfig}
      events={events}
      pageTitle="千叶传统祭典"
      pageDescription="体验房总半岛深厚的传统文化，成田祇园祭、佐原大祭等知名祭典汇聚千叶"
      regionKey="chiba"
      activityKey="matsuri"
    />
  );
} 