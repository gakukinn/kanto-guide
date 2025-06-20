import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { odawaraSakawaHanabiData as eventData } from '@/data/hanabi/kanagawa/level4-august-odawara-sakawa-hanabi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第36回小田原酒匂川花火大会 - 8月神奈川花火大会',
  description: '小田原市酒匂川河畔举办的盛大花火大会，约3000发花火点亮夜空。',
};

export default function OdawaraSakawaHanabiPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
}
