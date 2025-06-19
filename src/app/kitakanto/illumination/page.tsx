'use client';

import IlluminationPageTemplate from '../../../components/IlluminationPageTemplate';

// 北关东灯光秀真实数据（从ar0300数据中筛选真正的北关东项目）
const kitakantoIlluminationEvents = [
  {
    id: 'harunako-illumination-2024',
    name: '榛名湖イルミネーションフェスタ2024',
    englishName: 'Harunako Illumination Festival 2024',
    _sourceData: {
      japaneseName: '榛名湖イルミネーションフェスタ2024',
      japaneseDescription:
        '群馬県高崎市の榛名湖畔で開催される幻想的なイルミネーション',
    },
    date: '2024年12月13日(金)',
    endDate: '2024年12月13日',
    location: '群馬県高崎市榛名湖',
    description:
      '榛名湖畔で開催される幻想的なイルミネーションフェスタ。湖面に映る光の演出が美しく、群馬県の代表的な冬の風物詩として多くの観光客に愛されています。',
    illuminationPeriod: '12月13日',
    bulbCount: '200,000',
    bulbCountNum: 200000,
    theme: '湖畔幻想',
    features: ['🌊 湖面反射', '🏔️ 自然景観', '✨ 群馬名所'],
    specialFeatures: ['湖面反射', '自然景観', '群馬名所'],
    venue: '榛名湖畔',
    likes: 66,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0310e17509/',
    category: 'イルミネーション',
  },
  {
    id: 'ashikaga-flower-park-2024',
    name: 'あしかがフラワーパーク「光の花の庭」',
    englishName: 'Ashikaga Flower Park Light Garden',
    _sourceData: {
      japaneseName: 'あしかがフラワーパーク「光の花の庭」',
      japaneseDescription: '栃木県足利市の花とイルミネーションの楽園',
    },
    date: '2024年10月18日(金)～2025年2月16日',
    endDate: '2025年2月16日',
    location: '栃木県足利市迫間町',
    description:
      '関東三大イルミネーションの一つに数えられる足利フラワーパークの代表的なイルミネーション。500万球の光が織りなす幻想的な花の庭は、まさに光のワンダーランドです。',
    illuminationPeriod: '10月18日～2月16日',
    bulbCount: '5,000,000',
    bulbCountNum: 5000000,
    theme: '光の花の庭',
    features: [
      '🏆 関東三大イルミネーション',
      '💡 500万球',
      '🌸 花テーマ',
      '📅 長期開催',
    ],
    specialFeatures: [
      '関東三大イルミネーション',
      '500万球',
      '花テーマ',
      '長期開催',
    ],
    venue: 'あしかがフラワーパーク',
    likes: 496,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0309e17508/',
    category: 'イルミネーション',
  },
  {
    id: 'kasumigaura-art-illumination-2024',
    name: '霞ヶ浦総合公園 第13回光がつくる"Art(アート)"水郷桜イルミネーション',
    englishName: 'Kasumigaura Art Illumination 2024',
    _sourceData: {
      japaneseName:
        '霞ヶ浦総合公園 第13回光がつくる"Art(アート)"水郷桜イルミネーション',
      japaneseDescription:
        '茨城県土浦市の霞ヶ浦湖畔で開催されるアートイルミネーション',
    },
    date: '2024年11月23日(祝)～2025年1月13日',
    endDate: '2025年1月13日',
    location: '茨城県土浦市大岩田',
    description:
      '霞ヶ浦総合公園で開催される芸術的なイルミネーション。水郷と桜をテーマにした光のアート作品が湖畔を彩り、茨城県の美しい自然と調和した幻想的な空間を演出します。',
    illuminationPeriod: '11月23日～1月13日',
    bulbCount: '217,000',
    bulbCountNum: 217000,
    theme: '水郷桜アート',
    features: [
      '🌊 湖畔ロケーション',
      '🎨 アート作品',
      '🌉 水郷テーマ',
      '📅 長期開催',
    ],
    specialFeatures: [
      '湖畔ロケーション',
      'アート作品',
      '水郷テーマ',
      '長期開催',
    ],
    venue: '霞ヶ浦総合公園',
    likes: 51,
    website: '',
    detailLink: 'https://illumi.walkerplus.com/detail/ar0308e126464/',
    category: 'イルミネーション',
  },
];

// 北关东地区配置
const kitakantoRegionConfig = {
  name: 'kitakanto',
  displayName: '北関東',
  emoji: '🌲',
  description:
    '群馬、栃木、茨城の三県からなる北関東地域は、豊かな自然と歴史が織りなす魅力的なエリアです。関東三大イルミネーションの足利フラワーパークをはじめ、湖畔や公園での幻想的な光の演出が楽しめます。',
  navigationLinks: {
    prev: { name: '神奈川県', url: '/kanagawa', emoji: '🌊' },
    next: { name: '甲信越', url: '/koshinetsu', emoji: '⛰️' },
    current: { name: '北関東', url: '/kitakanto' },
  },
};

export default function KitakantoIlluminationPage() {
  return (
    <IlluminationPageTemplate
      region={kitakantoRegionConfig}
      events={kitakantoIlluminationEvents}
      pageTitle="北关东灯光秀活动列表"
      pageDescription="从榛名湖到足利花卉公园，体验北关东地区最精彩的灯光秀，感受自然与光影的完美融合"
      regionKey="kitakanto"
      activityKey="illumination"
    />
  );
}
