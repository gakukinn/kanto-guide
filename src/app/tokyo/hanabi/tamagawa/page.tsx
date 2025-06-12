import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { tamagawaHanabiData } from '@/data/tokyo-tamagawa-hanabi';

// 生成页面元数据
export const metadata: Metadata = {
  title: '第47回世田谷区多摩川花火大会 - 2025年东京花火大会',
  description: '秋季夜空中的音与光艺术盛宴。世田谷区传统花火大会，沿多摩川河畔举办，搭配舞台表演和各类美食摊位，为观众带来完整的节庆体验。',
  keywords: '世田谷花火,多摩川花火大会,东京花火,秋季花火,二子玉川,免费花火',
  openGraph: {
    title: '第47回世田谷区多摩川花火大会 - 2025年东京花火大会',
    description: '秋季夜空中的音与光艺术盛宴，多摩川河畔的传统花火大会',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '第47回世田谷区多摩川花火大会 - 2025年东京花火大会',
    description: '秋季夜空中的音与光艺术盛宴，多摩川河畔的传统花火大会',
  },
  alternates: {
    canonical: '/tokyo/hanabi/tamagawa'
  }
};

export default function TamagawaHanabiPage() {
  const regionKey = 'tokyo';
  
  return (
    <HanabiDetailTemplate
      data={tamagawaHanabiData}
      regionKey={regionKey}
    />
  );
}

// 数据源：https://hanabi.walkerplus.com/detail/ar0313e355272/ 