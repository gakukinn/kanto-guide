import MatsuriPageTemplate from '@/components/MatsuriPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
  description:
    '埼玉县2025年传统祭典完整指南，体验川越祭的山车巡游、秩父夜祭的璀璨花车、春日部大凧祭的壮观风筝、本庄祇园祭的传统獅子舞等精彩传统活动。提供详细的举办时间、观赏地点、历史文化背景、交通方式，感受关东地区千年文化传承的精髓，探索埼玉独特的祭典魅力与传统工艺之美。',
  keywords: [
    '埼玉传统祭典',
    '川越祭',
    '秩父夜祭',
    '春日部大凧祭',
    '本庄祇园祭',
    '埼玉祭典',
    '山车祭典',
    '花车祭典',
    '风筝祭典',
    '夏祭り',
    '2025祭典',
    '关东祭典',
    '埼玉旅游',
    '日本传统文化',
    '关东地区祭典',
    '传统工艺',
    '文化传承',
  ],
  openGraph: {
    title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
    description:
      '埼玉县2025年传统祭典完整指南，川越祭、秩父夜祭、春日部大凧祭、本庄祇园祭等精彩活动等您来体验。感受关东地区千年文化传承的精髓。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/matsuri',
    siteName: '关东旅游指南',
    images: [
      {
        url: '/images/matsuri/saitama-matsuri.svg',
        width: 1200,
        height: 630,
        alt: '埼玉传统祭典',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '埼玉传统祭典2025 - 川越祭秩父夜祭春日部大凧祭等关东祭典完整攻略',
    description:
      '埼玉县2025年传统祭典完整指南，川越祭、秩父夜祭、本庄祇园祭等精彩活动等您来体验。',
    images: ['/images/matsuri/saitama-matsuri.svg'],
  },
  alternates: {
    canonical: '/saitama/matsuri',
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

// 地区配置 - 使用标准配色系统
const saitamaRegionConfig = {
  name: 'saitama',
  displayName: '埼玉',
  emoji: '🌻',
  description:
    '从江户时代传承至今的传统祭典，在埼玉各地盛大举行。山车巡游、传统表演、地方特色，尽在埼玉祭典中感受关东地区深厚的文化底蕴。',
  navigationLinks: {
    prev: { name: '千叶祭典', url: '/chiba/matsuri', emoji: '🌸' },
    next: { name: '群马祭典', url: '/gunma/matsuri', emoji: '⛩️' },
    current: { name: '埼玉活动', url: '/saitama' },
  },
};

// 埼玉祭典事件数据（基于 omaturilink.com 官方数据）
const saitamaMatsuriEvents = [
  {
    id: 'honjo-gion-matsuri',
    title: '本庄祇園まつり',
    _sourceData: {
      japaneseName: '本庄祇園まつり（ほんじょうぎおんまつり）',
      japaneseDescription: '本庄祇園まつり（ほんじょうぎおんまつり）',
    },
    englishName: 'Honjo Gion Festival',
    name: '本庄祇園まつり',
    date: '2025-07-12',
    dates: '2025年7月12日～13日',
    endDate: '2025-07-13',
    location: '埼玉県本庄市 本庄市街地',
    venue: '本庄市街地',
    highlights: [
      '埼玉県無形民俗文化財獅子舞',
      '旧中山道神輿巡行',
      '木遣り・纏振り・梯子乗り',
      '八坂神社奉納',
    ],
    features: [
      '埼玉県無形民俗文化財獅子舞',
      '旧中山道神輿巡行',
      '木遣り・纏振り・梯子乗り',
      '八坂神社奉納',
    ],
    likes: 2580,
    website: 'https://www.honjo-kanko.jp/event/honjogionmatsuri.html',
    description:
      '疫病を追い払うため、獅子舞を奉納し、みこしを担いだのが「本庄祇園まつり」の始まりとされます。八坂神社の境内で、無病息災や五穀豊穣などを祈念し、埼玉県の無形民俗文化財に指定されている獅子舞が奉納されます。「セイヤ、セイヤ」の威勢のよいかけ声とともに、旧中山道を大人みこしや子どもみこしが巡行し、大勢の観客で賑わいます。',
    category: '夏祭り',
    prefecture: '埼玉县',
    region: 'saitama',
    detailLink: '/saitama/matsuri/honjo-gion-matsuri',
  },
  {
    id: 'saitama-key-005',
    title: '秩父川濑祭',
    _sourceData: {
      japaneseName: '秩父川瀬祭り',
      japaneseDescription: '秩父川瀬祭り',
    },
    englishName: 'Chichibu Kawase Festival',
    name: '秩父川濑祭',
    date: '2025-07-19',
    dates: '2025年7月19-20日',
    endDate: '2025-07-20',
    location: '秩父市',
    venue: '秩父神社',
    highlights: ['🌊 清凉川水', '🚗 山车入水', '🙏 夏日祈福', '⛩️ 神社祭礼'],
    features: ['🌊 清凉川水', '🚗 山车入水', '🙏 夏日祈福', '⛩️ 神社祭礼'],
    likes: 186,
    website: 'https://www.chichibu-kanko.or.jp/',
    description:
      '秩父川濑祭是在炎热夏日举行的清凉祭典，山车入水的壮观场面令人难忘。在清澈的河川中进行神圣祈福仪式，祈求夏日的清凉与平安。',
    category: '夏祭り',
    prefecture: '埼玉县',
    region: 'saitama',
    detailLink: '/saitama/matsuri/chichibu-kawase-festival',
  },
];

export default function SaitamaMatsuri() {
  return (
    <MatsuriPageTemplate
      region={saitamaRegionConfig}
      events={saitamaMatsuriEvents}
      pageTitle="埼玉传统祭典活动列表"
      pageDescription="体验千年文化传承的精彩祭典，川越祭、秩父夜祭等知名祭典汇聚埼玉"
      regionKey="saitama"
      activityKey="matsuri"
    />
  );
}
