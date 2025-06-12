import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kanazawaMatsurihanabiData } from '@/data/level5-august-kanazawa-matsuri-hanabi';

export default function KanazawaMatsurihanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={kanazawaMatsurihanabiData} 
      regionKey="kanagawa" 
    />
  );
}

export async function generateMetadata() {
  return {
    title: `${kanazawaMatsurihanabiData.name} - 神奈川8月花火大会详情`,
    description: `${kanazawaMatsurihanabiData.name}详细信息：${kanazawaMatsurihanabiData.date}在${kanazawaMatsurihanabiData.venues[0]?.location}举行。入场免费的海上花火大会，60分钟约3500发花火连续演出。`,
    keywords: '金泽祭花火大会,神奈川花火,8月花火,横滨金泽区,海之公园,海上花火,星形花火',
    openGraph: {
      title: kanazawaMatsurihanabiData.name,
      description: `${kanazawaMatsurihanabiData.date}举行，入场免费的海上花火大会`,
      type: 'article',
      locale: 'zh_CN',
    }
  };
} 