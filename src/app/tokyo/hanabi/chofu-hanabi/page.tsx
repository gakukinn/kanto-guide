import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { chofuHanabiData } from '@/data/level5-september-tokyo-chofu-hanabi';

export default function ChofuHanabiPage() {
  return <HanabiDetailTemplate data={chofuHanabiData} regionKey="tokyo" />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${chofuHanabiData.name} | 2025年花火大会`,
    description: `${chofuHanabiData.name}：${chofuHanabiData.history.significance}。${chofuHanabiData.expectedVisitors}，${chofuHanabiData.fireworksCount}`,
    keywords: [
      '调布花火',
      '第40回调布花火',
      '2025年花火大会',
      '9月花火',
      '东京花火',
      '多摩川花火',
      '大玉50连发',
      '花火幻想曲'
    ].join(', '),
    openGraph: {
      title: `${chofuHanabiData.name} | 2025年花火大会`,
      description: `${chofuHanabiData.name}：${chofuHanabiData.history.significance}`,
      type: 'article',
      locale: 'zh_CN',
    },
  };
} 