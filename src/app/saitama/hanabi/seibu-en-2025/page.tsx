import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { seibuEnHanabiData } from '@/data/hanabi/saitama/level4-seibu-en-hanabi-2025';

export const metadata: Metadata = {
  title: '西武園ゆうえんち大火祭り - 埼玉花火大会',
  description: '西武园游乐园举办的夏季限定花火祭典，连续开催期间可以在园区内欣赏到精美的花火表演。',
  keywords: '西武园,游乐园,花火,埼玉,所泽,夏季祭典',
};

export default function SeibuEnHanabiPage() {
  return <HanabiDetailTemplate data={seibuEnHanabiData} regionKey="saitama" />;
}