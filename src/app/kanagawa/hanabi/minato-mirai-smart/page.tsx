import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { minatoMiraiSmartData } from '@/data/level5-august-minato-mirai-smart';

export default function MinatoMiraiSmartPage() {
  return (
    <HanabiDetailTemplate 
      data={minatoMiraiSmartData} 
      regionKey="kanagawa" 
    />
  );
}

export async function generateMetadata() {
  return {
    title: `${minatoMiraiSmartData.name} - 神奈川8月花火大会详情`,
    description: `${minatoMiraiSmartData.name}详细信息：${minatoMiraiSmartData.date}在${minatoMiraiSmartData.venues[0]?.location}举行。SDGs未来都市横滨主题活动，25分钟内约2万发花火的震撼演出。`,
    keywords: '港未来智能节庆,神奈川花火,8月花火,横滨港未来,音乐花火,SDGs,天空交响乐',
    openGraph: {
      title: minatoMiraiSmartData.name,
      description: `${minatoMiraiSmartData.date}举行，SDGs未来都市横滨主题的音乐花火节庆`,
      type: 'article',
      locale: 'zh_CN',
    }
  };
} 