'use client';

import { useState, useEffect } from 'react';
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { MatsuriEvent, fetchAndValidateMatsuriData } from '@/utils/matsuri-data-validator';

// 地区配置 - 使用标准配色系统
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🏮',
  // gradientColors: 移除手动配色，使用自动生成
  description: '从江户时代传承至今的传统祭典，在埼玉各地盛大举行。山车巡游、传统表演、地方特色，尽在埼玉祭典中感受关东地区深厚的文化底蕴。',
  navigationLinks: {
    prev: { name: '千叶祭典', url: '/chiba/matsuri', emoji: '🌸' },
    next: { name: '群马祭典', url: '/gunma/matsuri', emoji: '⛩️' },
    current: { name: '埼玉活动', url: '/saitama' }
  }
};

export default function SaitamaMatsuri() {
  const [events, setEvents] = useState<MatsuriEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 使用新的验证工具，自动处理数据格式问题
        const validatedEvents = await fetchAndValidateMatsuriData('saitama');
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
      <div className="min-h-screen bg-gradient-to-br from-purple-200 to-red-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-purple-700 font-medium">加载埼玉祭典信息中...</p>
        </div>
      </div>
    );
  }

      return (
      <MatsuriPageTemplate
        region={saitamaRegionConfig}
        events={events}
        pageTitle="埼玉传统祭典"
        pageDescription="体验千年文化传承的精彩祭典，川越祭、秩父夜祭等知名祭典汇聚埼玉"
        regionKey="saitama"
        activityKey="matsuri"
      />
    );
} 