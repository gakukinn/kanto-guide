import { yokohamaKaikouMatsuriData as yokohamaHanabiData } from '@/data/hanabi/kanagawa/level4-june-yokohama-kaikou-matsuri';
import { Metadata } from 'next';
import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';

export const metadata: Metadata = {
  title: '横浜夜间花火2025 | 2025年9月神奈川花火大会',
  description:
    '横浜夜间花火2025，年间通年开催的短时间花火。横浜港湾美景与花火的完美融合，每月定期开催。2025年9月6日14日开催。',
  keywords:
    '横浜夜间花火,神奈川花火,港湾花火,短时间花火,横浜港,新港码头,大栈桥,免费观览',
  openGraph: {
    title: '横浜夜间花火2025 | 2025年9月神奈川花火大会',
    description:
      '横浜夜间花火2025，年间通年开催的短时间花火。横浜港湾美景与花火的完美融合。',
    type: 'article',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '横浜夜间花火2025 | 2025年9月神奈川花火大会',
    description:
      '横浜夜间花火2025，年间通年开催的短时间花火。横浜港湾美景与花火的完美融合。',
  },
  alternates: {
    canonical: '/september/hanabi/kanagawa/yokohama-hanabi',
  },
};

export default function YokohamaHanabiPage() {
  return (
    <HanabiDetailTemplate data={yokohamaHanabiData} regionKey="kanagawa" />
  );
}
