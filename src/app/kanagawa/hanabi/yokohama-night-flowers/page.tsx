import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { eventData } from '@/data/level5-august-kanagawa-yokohama-night-flowers';

export const metadata: Metadata = {
  title: '横滨夜间花火2025 - 8月神奈川花火大会',
  description: '在横滨港未来21地区举办的夜间花火活动，融合灯光与音乐，打造独特的都市夏夜体验。',
  keywords: '横滨,夜间花火,港未来,神奈川花火,都市花火,音乐花火,灯光秀'
};

export default function YokohamaNightFlowersHanabiPage() {
  return <HanabiDetailTemplate data={eventData} regionKey="kanagawa" />;
} 