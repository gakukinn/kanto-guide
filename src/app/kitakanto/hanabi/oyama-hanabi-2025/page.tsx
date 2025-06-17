import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { oyamaHanabi2025Data } from '@/data/hanabi/kitakanto/oyama-hanabi-2025';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第73回 小山花火大会 2025 | 栃木县花火大会详情',
  description:
    '第73回小山花火大会于2025年9月23日在观晃桥下流思川河畔举办。约2万发花火、小山市制70周年纪念、新增无人机演出500机。清流思川河畔的关东有数规模花火大会。',
  keywords: [
    '小山花火大会',
    '栃木县花火',
    '2025年花火',
    '思川河畔',
    '无人机演出',
    '北关东花火',
  ],
  openGraph: {
    title: '第73回 小山花火大会 2025 | 栃木县代表性花火大会',
    description: '73年历史传承的栃木县小山花火大会，市制70周年纪念特别企划',
    images: ['/images/hanabi/oyama-hanabi-main.svg'],
  },
};

export default function OyamaHanabi2025Page() {
  return (
    <HanabiDetailTemplate data={oyamaHanabi2025Data} regionKey="kitakanto" />
  );
}
