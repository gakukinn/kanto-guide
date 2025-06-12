import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function SaitamaPage() {
  return (
    <RegionPageTemplate
      regionKey="saitama"
      config={{
        name: '埼玉县',
        emoji: '🏢',
        bgColor: 'from-orange-50 to-amber-100',
        themeColor: 'orange',
        prevRegion: {
          name: '东京',
          path: '/tokyo',
          emoji: '🗼',
          bgColor: 'from-red-50 to-rose-100'
        },
        nextRegion: {
          name: '千叶',
          path: '/chiba',
          emoji: '🌊',
          bgColor: 'from-sky-50 to-cyan-100'
        },
        featuredActivities: [
          {
            id: 'omiya-hanabi',
            title: '大宫花火大会',
            description: '大宫市的传统夏日烟花节',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'kawagoe-festival',
            title: '川越祭',
            description: '小江户川越的传统祭典',
            emoji: '🏰',
            bgColor: 'from-purple-50 to-indigo-100'
          },
          {
            id: 'chichibu-yomatsuri',
            title: '秩父夜祭',
            description: '秩父地区的传统文化祭',
            emoji: '🎭',
            bgColor: 'from-orange-50 to-red-100'
          }
        ]
      }}
    />
  );
} 