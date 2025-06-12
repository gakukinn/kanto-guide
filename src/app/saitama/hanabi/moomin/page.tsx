import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import moominHanabiData from '@/data/saitama-moomin-hanabi';

// 数据来源：https://hanabi.walkerplus.com/detail/ar0311e516645/
export const metadata: Metadata = {
  title: 'ムーミン谷の湖上花火大会～夏～ - ムーミンバレーパークの湖上花火 | 埼玉花火指南',
  description: 'ムーミン谷の湖上花火大会～夏～が2025年7月-8月にムーミンバレーパークで開催。宮澤湖上に打ち上がる花火とオリジナル音楽の幻想的なコラボレーション。西武線飯能駅からバス13分。',
  keywords: 'ムーミン谷花火大会,ムーミンバレーパーク,湖上花火,メッツァ,飯能市,埼玉県,北欧テーマパーク',
  openGraph: {
    title: 'ムーミン谷の湖上花火大会～夏～ - ムーミンバレーパークの湖上花火',
    description: 'ムーミン谷の湖上花火大会～夏～が2025年7月-8月にムーミンバレーパークで開催。宮澤湖上に打ち上がる花火とオリジナル音楽の幻想的なコラボレーション。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/saitama/hanabi/moomin'
  }
};

export default function MoominHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={moominHanabiData}
      regionKey="saitama"
    />
  );
} 