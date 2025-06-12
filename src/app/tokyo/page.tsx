import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function TokyoPage() {
  return (
    <RegionPageTemplate
      regionKey="tokyo"
      config={{
        name: '东京都',
        emoji: '🗼',
        bgColor: 'from-red-50 to-rose-100',
        themeColor: 'red',
                  prevRegion: {
            name: '神奈川',
            path: '/kanagawa',
            emoji: '⛵',
            bgColor: 'from-blue-100 to-blue-200'
          },
        nextRegion: {
          name: '埼玉',
          path: '/saitama',
          emoji: '🏢',
          bgColor: 'from-slate-50 to-gray-100'
        },
        featuredActivities: [
          {
            id: 'sumida-river-fireworks',
            title: '隅田川花火大会',
            description: '日本最具代表性的花火大会',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'sanja-festival',
            title: '三社祭',
            description: '浅草神社的传统大祭',
            emoji: '🎭',
            bgColor: 'from-red-50 to-red-100'
          },
          {
            id: 'ueno-cherry-blossom',
            title: '上野公园赏樱',
            description: '东京最著名的樱花观赏地',
            emoji: '🌸',
            bgColor: 'from-pink-50 to-pink-100'
          }
        ]
      }}
    />
  );
} 