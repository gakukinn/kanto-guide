import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { tonegawaHanabiData } from '@/data/hanabi/kitakanto/tonegawa-hanabi-2025';

export const metadata: Metadata = {
  title: '第38回 利根川大花火大会 | 茨城県境町 | 關東旅遊指南',
  description:
    '四大花火師由于夢的合作。約3万発的花火的利根川河川敷在開催関東最大級的花火大会。2025年9月13日開催。',
  keywords:
    '利根川大花火大会,境町,茨城県,花火大会,2025年,四大花火師,関東,利根川',
  openGraph: {
    title: '第38回 利根川大花火大会 | 茨城県境町',
    description:
      '四大花火師由于夢的合作。約3万発的花火的利根川河川敷在開催関東最大級的花火大会。',
    images: ['/images/hanabi/kitakanto/tonegawa-hanabi-2025-01.svg'],
  },
};

export default function TonegawaHanabiPage() {
  return (
    <HanabiDetailTemplate data={tonegawaHanabiData} regionKey="kitakanto" />
  );
}
