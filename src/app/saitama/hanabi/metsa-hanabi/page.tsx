import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { metsaHanabiData } from '../../../../data/level5-september-saitama-metsa-hanabi';

export const metadata: Metadata = {
  title: '梅兹塔北欧花火2025 | 2025年9月埼玉花火大会',
  description: '梅兹塔北欧花火2025，北欧8国大使馆推荐音乐与花火的完美融合。湖畔花火，各国国旗色彩演出。2025年9月13日・14日・20日・21日开催。',
  keywords: '梅兹塔北欧花火,埼玉花火,北欧音乐花火,湖畔花火,飯能市,宮沢湖,北欧文化,特别观览席',
  openGraph: {
    title: '梅兹塔北欧花火2025 | 2025年9月埼玉花火大会',
    description: '梅兹塔北欧花火2025，北欧8国大使馆推荐音乐与花火的完美融合。湖畔花火，各国国旗色彩演出。',
    type: 'article',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '梅兹塔北欧花火2025 | 2025年9月埼玉花火大会',
    description: '梅兹塔北欧花火2025，北欧8国大使馆推荐音乐与花火的完美融合。湖畔花火，各国国旗色彩演出。',
  },
  alternates: {
    canonical: '/september/hanabi/saitama/metsa-hanabi'
  }
};

export default function MetsaHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={metsaHanabiData}
      regionKey="saitama"
    />
  );
} 