import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { maebashiHanabi2025Data } from '@/data/hanabi/kitakanto/maebashi-hanabi-2025';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '第69回 前橋花火大会 2025 | 群马县花火大会详情',
  description:
    '第69回前橋花火大会于2025年8月9日在利根川河畔举办。约1万5000发花火、800米宽幅超宽屏星雨、七色虹色花火等精彩演出。全席位付费预约制，群马县最具代表性的夏季花火大会。',
  keywords: [
    '前橋花火大会',
    '群马县花火',
    '2025年花火',
    '超宽屏星雨',
    '虹色花火',
    '北关东花火',
  ],
  openGraph: {
    title: '第69回 前橋花火大会 2025 | 群马县代表性花火大会',
    description:
      '69年历史传承的群马县前橋花火大会，800米宽幅超宽屏星雨震撼演出',
    images: ['/images/hanabi/maebashi-hanabi-main.svg'],
  },
};

export default function MaebashiHanabi2025Page() {
  return (
    <HanabiDetailTemplate data={maebashiHanabi2025Data} regionKey="kitakanto" />
  );
}
