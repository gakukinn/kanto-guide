import RegionPageTemplate from '@/components/RegionPageTemplate';

export default function KanagawaPage() {
  return (
    <RegionPageTemplate
      regionKey="kanagawa"
      config={{
        name: '神奈川县',
        emoji: '⛵',
        bgColor: 'from-blue-100 to-blue-200',
        themeColor: 'blue',
        prevRegion: {
          name: '千叶',
          path: '/chiba',
          emoji: '🌊',
          bgColor: 'from-sky-50 to-cyan-100'
        },
        nextRegion: {
          name: '北关东',
          path: '/kitakanto',
          emoji: '🏔️',
          bgColor: 'from-green-50 to-emerald-100'
        },
        featuredActivities: [
          {
            id: 'yokohama-port-festival',
            title: '横浜港祭',
            description: '横滨港湾区的盛大烟花表演',
            emoji: '🎆',
            bgColor: 'from-blue-50 to-blue-100'
          },
          {
            id: 'kamakura-festival',
            title: '镰仓祭',
            description: '古都镰仓的传统祭典',
            emoji: '⛩️',
            bgColor: 'from-purple-50 to-indigo-100'
          },
          {
            id: 'shonan-beach-festival',
            title: '湘南海岸祭',
            description: '湘南海滩的夏日庆典',
            emoji: '🌺',
            bgColor: 'from-orange-50 to-red-100'
          }
        ]
      }}
    />
  );
} 