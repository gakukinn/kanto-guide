import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { atsugiAyuMatsuriData as eventData } from '@/data/hanabi/kanagawa/level4-august-atsugi-ayu-matsuri';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '市制70周年記念 第79回 厚木鮎祭典 - 8月神奈川花火大会',
  description:
    '在厚木市相模川河畔举办的盛大花火大会。约3000发花火点亮夜空，展现厚木市的夏日风情。',
  keywords: '厚木鲇祭,花火大会,神奈川花火,相模川,厚木市,8月花火,厚木鮎祭典',
};

export default function AtsugiAyuMatsuriPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
}
