import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { seibuHanabiData } from '../../../../data/level5-september-saitama-seibu-hanabi';

export const metadata: Metadata = {
  title: '西武园游乐园大火祭 | 2025年9月埼玉花火大会',
  description: '西武园游乐园大火祭，音乐与花火的完美融合。近距离观赏震撼花火，感受全身心的音响体验。2025年9月13日・14日开催。',
  keywords: '西武园游乐园,大火祭,埼玉花火,音乐花火,游乐园花火,所沢市,西武山口线',
  openGraph: {
    title: '西武园游乐园大火祭 | 2025年9月埼玉花火大会',
    description: '西武园游乐园大火祭，音乐与花火的完美融合。近距离观赏震撼花火，感受全身心的音响体验。',
    type: 'article',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '西武园游乐园大火祭 | 2025年9月埼玉花火大会',
    description: '西武园游乐园大火祭，音乐与花火的完美融合。近距离观赏震撼花火，感受全身心的音响体验。',
  },
  alternates: {
    canonical: '/september/hanabi/saitama/seibu-hanabi'
  }
};

export default function SeibuHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={seibuHanabiData}
      regionKey="saitama"
    />
  );
} 