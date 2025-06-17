import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
  description:
    '甲信越地区2025年传统祭典完整指南，体验信州诹访大社祭的庄严神事、山梨大神社祭的传统仪式、新潟祭典的雪国文化等8个精彩传统活动。涵盖长野、山梨、新潟三县，提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受甲信越地区深厚的山岳文化与雪国民俗传统之美。',
  keywords: [
    '甲信越传统祭典',
    '信州诹访大社祭',
    '山梨大神社祭',
    '新潟祭典',
    '甲信越祭典',
    '长野祭典',
    '山梨祭典',
    '新潟祭典',
    '2025祭典',
    '甲信越地区',
    '山岳文化',
    '雪国民俗',
    '日本传统文化',
    '诹访大社',
    '信州文化',
  ],
  openGraph: {
    title:
      '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
    description:
      '甲信越地区2025年传统祭典完整指南，信州诹访大社祭、山梨大神社祭、新潟祭典等8个精彩活动等您来体验。感受甲信越地区深厚的山岳文化与雪国民俗传统。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/koshinetsu/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/koshinetsu-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '甲信越传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '甲信越传统祭典2025 - 信州诹访大社祭山梨大神社祭新潟祭典等山间祭典完整攻略',
    description:
      '甲信越地区2025年传统祭典完整指南，诹访大社祭、新潟祭典等8个精彩活动等您来体验。',
    images: ['/images/matsuri/koshinetsu-matsuri.svg'],
  },
  alternates: {
    canonical: '/koshinetsu/matsuri',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function KoshinetsuMatsuriPage() {
  // 静态祭典数据 - 基于官方数据源的12个主要祭典
  const matsuriEvents = [
    {
      id: 'koshinetsu-key-001',
      title: '富士吉田火祭',
      _sourceData: {
        japaneseName: '富士吉田火祭祭',
        japaneseDescription: '富士吉田火祭祭',
      },
      englishName: 'Fujiyoshida Fire Festival',
      date: '2025年8月26日·27日',
      location: '富士吉田市',
      category: '火祭祭',
      highlights: ['富士山信仰', '松明祭', '世界文化遗产'],
      likes: 320,
      website: 'https://www.city.fujiyoshida.yamanashi.jp/',
      description:
        '富士吉田火祭是日本三大奇祭之一，以富士山信仰为基础的传统火祭，展现富士山文化的神圣力量。',
    },
    {
      id: 'koshinetsu-key-002',
      title: '信玄公祭',
      _sourceData: {
        japaneseName: '信玄公祭祭',
        japaneseDescription: '信玄公祭祭',
      },
      englishName: 'Shingen Festival',
      date: '2025年4月第1个周末',
      location: '甲府市',
      category: '武将祭祭',
      highlights: ['武田信玄', '战国时代', '武者行列'],
      likes: 280,
      website: 'https://www.city.kofu.yamanashi.jp/',
      description:
        '信玄公祭以战国大名武田信玄为主题，是日本最大规模的武者行列祭典，重现战国时代的雄壮场面。',
    },
    {
      id: 'koshinetsu-key-003',
      title: '富士河口湖紅叶祭',
      _sourceData: {
        japaneseName: '富士河口湖紅葉祭典',
        japaneseDescription: '富士河口湖紅葉祭典',
      },
      englishName: 'Fuji Kawaguchi Lake Autumn Leaves Festival',
      date: '2025年11月上旬-下旬',
      location: '富士河口湖町',
      category: '紅葉祭祭',
      highlights: ['富士山美景', '红叶隧道', '夜间点灯'],
      likes: 240,
      website: 'https://www.town.fujikawaguchiko.lg.jp/',
      description:
        '富士河口湖紅叶祭在富士山脚下举行，红叶与富士山的绝美组合是秋季旅游的经典体验。',
    },
    {
      id: 'koshinetsu-key-004',
      title: '石和温泉祭',
      _sourceData: {
        japaneseName: '石和温泉祭典',
        japaneseDescription: '石和温泉祭典',
      },
      englishName: 'Isawa Onsen Festival',
      date: '2025年8月中旬',
      location: '笛吹市',
      category: '温泉祭祭',
      highlights: ['温泉文化', '葡萄产地', '传统舞蹈'],
      likes: 180,
      website: 'https://www.city.fuefuki.yamanashi.jp/',
      description:
        '石和温泉祭展现山梨县的温泉文化和葡萄产业特色，是体验甲州文化的绝佳机会。',
    },
    {
      id: 'koshinetsu-key-005',
      title: '御柱祭',
      _sourceData: {
        japaneseName: '御柱祭',
        japaneseDescription: '御柱祭',
      },
      englishName: 'Onbashira Festival',
      date: '2025年4月·5月（每7年举办）',
      location: '诹访市',
      category: '大祭',
      highlights: ['日本三大奇祭', '諏訪大社', '御柱曳行'],
      likes: 400,
      website: 'https://suwataisha.or.jp/',
      description:
        '御柱祭是日本三大奇祭之一，每7年举办一次的諏訪大社大祭，御柱曳行是最壮观的仪式。',
    },
    {
      id: 'koshinetsu-key-006',
      title: '善光寺御开帐',
      _sourceData: {
        japaneseName: '善光寺御開帳',
        japaneseDescription: '善光寺御開帳',
      },
      englishName: 'Zenkoji Temple Gokaicho',
      date: '2025年4月-6月（每7年举办）',
      location: '长野市',
      category: '宗教祭典',
      highlights: ['善光寺', '秘佛开帐', '千年历史'],
      likes: 360,
      website: 'https://www.zenkoji.jp/',
      description:
        '善光寺御开帐是每7年举办一次的盛大宗教祭典，秘佛阿弥陀如来像对外公开展示。',
    },
    {
      id: 'koshinetsu-key-007',
      title: '松本城太鼓祭',
      _sourceData: {
        japaneseName: '松本城太鼓祭典',
        japaneseDescription: '松本城太鼓祭典',
      },
      englishName: 'Matsumoto Castle Taiko Festival',
      date: '2025年7月下旬',
      location: '松本市',
      category: '太鼓祭祭',
      highlights: ['国宝松本城', '和太鼓演奏', '夜间点灯'],
      likes: 220,
      website: 'https://www.city.matsumoto.nagano.jp/',
      description:
        '松本城太鼓祭在国宝松本城举行，和太鼓的震撼演奏与古城的优美结合，展现信州文化魅力。',
    },
    {
      id: 'koshinetsu-key-008',
      title: '轻井泽夏祭',
      _sourceData: {
        japaneseName: '軽井沢夏祭典',
        japaneseDescription: '軽井沢夏祭典',
      },
      englishName: 'Karuizawa Summer Festival',
      date: '2025年8月中旬',
      location: '轻井泽町',
      category: '避暑祭祭',
      highlights: ['高原避暑地', '国际文化', '现代艺术'],
      likes: 200,
      website: 'https://www.town.karuizawa.lg.jp/',
      description:
        '轻井泽夏祭在著名的高原避暑地举行，融合了国际文化和现代艺术元素的独特祭典。',
    },
    {
      id: 'koshinetsu-key-009',
      title: '新潟祭',
      _sourceData: {
        japaneseName: '新潟祭典',
        japaneseDescription: '新潟祭典',
      },
      englishName: 'Niigata Festival',
      date: '2025年8月第1个周末',
      location: '新潟市',
      category: '夏祭祭',
      highlights: ['信濃川', '万代桥', '现代都市祭'],
      likes: 300,
      website: 'https://www.city.niigata.lg.jp/',
      description:
        '新潟祭是新潟县最大的夏祭，以信濃川和万代桥为背景的现代都市祭典，展现港湾城市活力。',
    },
    {
      id: 'koshinetsu-key-010',
      title: '长冈花火大会',
      _sourceData: {
        japaneseName: '長岡祭典大花火大会',
        japaneseDescription: '長岡祭典大花火大会',
      },
      englishName: 'Nagaoka Fireworks Festival',
      date: '2025年8月2日·3日',
      location: '长冈市',
      category: '花火祭祭',
      highlights: ['日本三大花火', '信濃川河畔', '复兴祈愿'],
      likes: 450,
      website: 'https://nagaokamatsuri.com/',
      description:
        '长冈花火大会是日本三大花火大会之一，在信濃川河畔举行，承载着战后复兴和祈愿和平的深刻意义。',
    },
    {
      id: 'koshinetsu-key-011',
      title: '佐渡国际艺术祭',
      _sourceData: {
        japaneseName: '佐渡国際芸術祭',
        japaneseDescription: '佐渡国際芸術祭',
      },
      englishName: 'Sado International Arts Festival',
      date: '2025年8月-9月',
      location: '佐渡市',
      category: '芸術祭',
      highlights: ['佐渡岛', '国际艺术', '传统工艺'],
      likes: 170,
      website: 'https://www.city.sado.niigata.jp/',
      description:
        '佐渡国际艺术祭在日本海的佐渡岛举行，将国际现代艺术与传统工艺完美融合的独特文化祭典。',
    },
    {
      id: 'koshinetsu-key-012',
      title: '越后汤泽雪祭',
      _sourceData: {
        japaneseName: '越後湯沢雪祭典',
        japaneseDescription: '越後湯沢雪祭典',
      },
      englishName: 'Echigo Yuzawa Snow Festival',
      date: '2025年2月中旬',
      location: '汤泽町',
      category: '雪祭祭',
      highlights: ['温泉雪景', '雪雕艺术', '冬季体验'],
      likes: 190,
      website: 'https://www.town.yuzawa.lg.jp/',
      description:
        '越后汤泽雪祭在著名温泉地举行，雪雕艺术与温泉文化的完美结合，是冬季关东周边的热门体验。',
    },
  ];

  const regionConfig = {
    name: '甲信越',
    displayName: '甲信越',
    emoji: '🗻',
    gradientColors: 'from-purple-100 to-blue-200',
    description: '山岳信仰与花火文化的圣地',
    navigationLinks: {
      prev: { name: '北关东', url: '/kitakanto/matsuri', emoji: '♨️' },
      next: { name: '东京', url: '/tokyo/matsuri', emoji: '🗼' },
      current: { name: '甲信越活动', url: '/koshinetsu' },
    },
  };

  return (
    <MatsuriPageTemplate
      region={regionConfig}
      events={matsuriEvents}
      pageTitle="甲信越传统祭典"
      pageDescription="甲信越地区融合山岳信仰与花火文化，从御柱祭到长冈花火，感受千年传承的祭典魅力。"
      regionKey="koshinetsu"
      activityKey="matsuri"
    />
  );
}
