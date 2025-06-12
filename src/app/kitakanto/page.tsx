/**
 * 第二层页面 - 北关东地区活动（群马、栃木、茨城）
 */
'use client';

import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function KitakantoPage() {
  return (
    <RegionPageTemplate
      regionKey="kitakanto"
      config={{
        name: '北关东',
        emoji: '🏔️',
        bgColor: 'from-green-50 to-emerald-100',
        themeColor: 'emerald',
        prevRegion: {
          name: '神奈川',
          path: '/kanagawa',
          emoji: '⛵',
          bgColor: 'from-blue-100 to-blue-200'
        },
        nextRegion: {
          name: '甲信越',
          path: '/koshinetsu',
          emoji: '⛰️',
          bgColor: 'from-purple-50 to-violet-100'
        },
        featuredActivities: [
          // 群马县主要活动
          {
            id: 'takasaki-hanabi',
            title: '高崎大花火大会',
            description: '群马县最大规模的花火大会',
            emoji: '🎆',
            bgColor: 'from-red-50 to-orange-100'
          },
          {
            id: 'kusatsu-onsen',
            title: '草津温泉',
            description: '日本三大名汤之一',
            emoji: '♨️',
            bgColor: 'from-orange-50 to-red-100'
          },
          // 栃木县主要活动
          {
            id: 'utsunomiya-hanabi',
            title: '宇都宫花火大会',
            description: '栃木县最大的烟花盛典',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'nikko-toshogu-festival',
            title: '日光东照宫祭',
            description: '世界遗产日光的传统祭典',
            emoji: '⛩️',
            bgColor: 'from-yellow-50 to-amber-100'
          },
          {
            id: 'ashikaga-flower-park',
            title: '足利花卉公园',
            description: '世界著名的紫藤花祭',
            emoji: '🌸',
            bgColor: 'from-purple-50 to-indigo-100'
          },
          // 茨城县主要活动
          {
            id: 'tsuchiura-hanabi',
            title: '土浦全国花火競技大会',
            description: '日本三大花火大会之一',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'oarai-beach-festival',
            title: '大洗海岸祭',
            description: '太平洋海岸的夏日庆典',
            emoji: '🌊',
            bgColor: 'from-cyan-50 to-blue-100'
          },
          {
            id: 'hitachi-seaside-park',
            title: '国营常陆海滨公园花祭',
            description: '蓝色粉蝶花海的绝美景观',
            emoji: '🌸',
            bgColor: 'from-blue-50 to-purple-100'
          }
        ]
      }}
    />
  );
} 