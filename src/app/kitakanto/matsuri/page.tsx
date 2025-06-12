'use client';

import { useState, useEffect } from 'react';
import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';

export default function KitakantoMatsuriPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/matsuri/kitakanto')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const regionConfig = {
    name: '北关东',
    displayName: '北关东',
    emoji: '🏔️',
    gradientColors: 'from-green-100 to-red-200',
    description: '山间传统与历史传承的融合',
    navigationLinks: {
      prev: { name: '神奈川', url: '/kanagawa/matsuri', emoji: '⛵' },
      next: { name: '甲信越', url: '/koshinetsu/matsuri', emoji: '🗻' },
      current: { name: '北关东活动', url: '/kitakanto' }
    }
  };

  return (
    <MatsuriPageTemplate
      region={regionConfig}
      events={events}
      pageTitle="北关东祭典"
      pageDescription="山间传统与历史传承的融合"
      regionKey="kitakanto"
      activityKey="matsuri"
    />
  );
} 