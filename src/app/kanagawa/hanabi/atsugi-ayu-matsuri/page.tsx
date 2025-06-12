import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { eventData } from '@/data/level5-august-kanagawa-atsugi-ayu-matsuri';

export const metadata: Metadata = {
  title: '市制70周年記念 第79回 あつぎ鮎まつり - 8月神奈川花火大会',
  description: '在厚木市相模川河畔举办的盛大花火大会。约3000发花火点亮夜空，展现厚木市的夏日风情。',
  keywords: '厚木鲇祭,花火大会,神奈川花火,相模川,厚木市,8月花火,あつぎ鮎まつり'
};

export default function AtsugiAyuMatsuriPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
} 