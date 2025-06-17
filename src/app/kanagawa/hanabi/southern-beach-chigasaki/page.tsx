import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { southernBeachChigasakiData as eventData } from '@/data/hanabi/kanagawa/level4-august-southern-beach-chigasaki';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第51回南海滩茅崎花火大会 - 8月神奈川花火大会',
  description:
    '茅崎市南海滩茅崎(茅崎海水浴场)举办的盛大花火大会，约2000发花火点亮湘南海岸夜空。',
};

export default function SouthernBeachChigasakiHanabiPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
}
