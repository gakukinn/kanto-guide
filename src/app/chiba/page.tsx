import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function ChibaPage() {
  return (
    <RegionPageTemplate
      regionKey="chiba"
      config={{
        name: '千叶县',
        emoji: '🌊',
        bgColor: 'from-sky-50 to-cyan-100',
        themeColor: 'sky',
        prevRegion: {
          name: '埼玉',
          path: '/saitama',
          emoji: '🏢',
          bgColor: 'from-orange-50 to-amber-100'
        },
        nextRegion: {
          name: '神奈川',
          path: '/kanagawa',
          emoji: '⛵',
          bgColor: 'from-blue-100 to-blue-200'
        },
        featuredActivities: [
          {
            id: 'kamogawa-hanabi',
            title: '鸭川海岸花火大会',
            description: '太平洋海岸线上的夏日烟花',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'narita-gion-festival',
            title: '成田祇园祭',
            description: '成田山新胜寺的传统祭典',
            emoji: '⛩️',
            bgColor: 'from-red-50 to-orange-100'
          },
          {
            id: 'kujukuri-beach',
            title: '九十九里海岸祭',
            description: '千叶著名海岸的夏日庆典',
            emoji: '🏖️',
            bgColor: 'from-yellow-50 to-orange-100'
          }
        ]
      }}
    />
  );
} 