/**
 * 第二层页面 - 甲信越地区活动（新潟、长野、山梨）
 */
'use client';

import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function KoshinetsuPage() {
  return (
    <RegionPageTemplate
      regionKey="koshinetsu"
      config={{
        name: '甲信越',
        emoji: '⛰️',
        bgColor: 'from-purple-50 to-violet-100',
        themeColor: 'purple',
        prevRegion: {
          name: '北关东',
          path: '/kitakanto',
          emoji: '🏔️',
          bgColor: 'from-green-50 to-emerald-100'
        },
        nextRegion: {
          name: '东京',
          path: '/tokyo',
          emoji: '🗼',
          bgColor: 'from-red-50 to-rose-100'
        },
        featuredActivities: [
          // 新潟县主要活动
          {
            id: 'nagaoka-hanabi',
            title: '长冈大花火',
            description: '日本三大花火大会之一',
            emoji: '🎆',
            bgColor: 'from-red-50 to-orange-100'
          },
          // 长野县主要活动
          {
            id: 'matsumoto-castle-festival',
            title: '松本城太鼓祭',
            description: '国宝松本城的传统祭典',
            emoji: '🏯',
            bgColor: 'from-blue-50 to-indigo-100'
          },
          // 山梨县主要活动
          {
            id: 'fuji-kawaguchi-hanabi',
            title: '富士河口湖花火大会',
            description: '富士山下的绚烂烟花',
            emoji: '🗻',
            bgColor: 'from-pink-50 to-purple-100'
          }
        ]
      }}
    />
  );
} 