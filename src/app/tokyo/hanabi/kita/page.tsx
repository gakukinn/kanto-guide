import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import kitaHanabiData from '@/data/tokyo-kita-hanabi';

// 数据来源：https://hanabi.walkerplus.com/detail/ar0313e322754/
export const metadata: Metadata = {
  title: '第11回北区花火会 - 荒川河川敷的秋季花火大会 | 东京花火指南',
  description: '第11回北区花火会将于2024年9月28日在荒川河川敷举行。地铁南北线赤羽岩渊站步行15分钟，免费观赏约1000发花火。岩淵水门为背景的独特观赏体验。',
  keywords: '北区花火会,荒川河川敷,花火大会,东京,赤羽岩渊,岩淵水门,秋季花火',
  openGraph: {
    title: '第11回北区花火会 - 荒川河川敷的秋季花火大会',
    description: '第11回北区花火会将于2024年9月28日在荒川河川敷举行。地铁南北线赤羽岩渊站步行15分钟，免费观赏约1000发花火。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://www.kanto-travel-guide.com/tokyo/hanabi/kita'
  }
};

export default function KitaHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={kitaHanabiData}
      regionKey="tokyo"
    />
  );
} 