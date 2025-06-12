import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { eventData } from '@/data/level5-august-kanagawa-yokohama-seaparadise';

export const metadata: Metadata = {
  title: '横滨・八景岛海洋天堂「花火交响曲」- 8月神奈川花火大会',
  description: '在横滨八景岛海洋天堂举办的特色花火表演，音乐与花火完美融合，点亮夏夜海岸。',
  keywords: '横滨,八景岛,海洋天堂,花火交响曲,神奈川花火,音乐花火,夏日活动'
};

export default function YokohamaSeaparadiseHanabiPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
} 