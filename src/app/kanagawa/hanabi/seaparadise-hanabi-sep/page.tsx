import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { seaparadiseHanabiData } from '../../../../data/level5-september-kanagawa-seaparadise-hanabi';

export const metadata: Metadata = {
  title: '横浜・八景岛海洋天堂「花火交响曲」| 2025年9月神奈川花火大会',
  description: '横浜・八景岛海洋天堂「花火交响曲」，音乐与花火完美同步的海洋主题花火秀。初秋海风中感受2500发花火的震撼演出。2025年9月13日・14日开催。',
  keywords: '横浜八景岛,海洋天堂,花火交响曲,神奈川花火,音乐花火,初秋花火,海岛花火,金泽海岸线',
  openGraph: {
    title: '横浜・八景岛海洋天堂「花火交响曲」| 2025年9月神奈川花火大会',
    description: '横浜・八景岛海洋天堂「花火交响曲」，音乐与花火完美同步的海洋主题花火秀。初秋海风中感受2500发花火的震撼演出。',
    type: 'article',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '横浜・八景岛海洋天堂「花火交响曲」| 2025年9月神奈川花火大会',
    description: '横浜・八景岛海洋天堂「花火交响曲」，音乐与花火完美同步的海洋主题花火秀。初秋海风中感受2500发花火的震撼演出。',
  },
  alternates: {
    canonical: '/september/hanabi/kanagawa/seaparadise-hanabi'
  }
};

export default function SeaparadiseHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={seaparadiseHanabiData}
      regionKey="kanagawa"
    />
  );
} 