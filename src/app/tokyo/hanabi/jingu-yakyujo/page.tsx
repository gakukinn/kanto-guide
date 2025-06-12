import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { jinguYakyujoHanabiData } from '@/data/tokyo-jingu-yakyujo-hanabi';

// 生成页面元数据
export const metadata: Metadata = {
  title: '夏休み神宫花火夜场 - 2025年东京花火大会',
  description: '东京燕子队主场明治神宫野球场举办的特色花火活动。每场比赛第5局下半场结束后燃放约300发花火，带来野球与花火结合的独特体验。',
  keywords: '神宫花火,野球场花火,东京花火,明治神宫,燕子队,夏休み',
  openGraph: {
    title: '夏休み神宫花火夜场 - 2025年东京花火大会',
    description: '野球与花火的完美结合，每场比赛后的精彩花火演出',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '夏休み神宫花火夜场 - 2025年东京花火大会',
    description: '野球与花火的完美结合，每场比赛后的精彩花火演出',
  },
  alternates: {
    canonical: '/tokyo/hanabi/jingu-yakyujo'
  }
};

export default function JinguYakyujoHanabiPage() {
  const regionKey = 'tokyo';
  
  return (
    <HanabiDetailTemplate 
      data={jinguYakyujoHanabiData}
      regionKey={regionKey}
    />
  );
}

// 静态生成
export const dynamic = 'force-static';

// 页面重新验证时间（秒）
export const revalidate = 86400; // 24小时

// 信息来源：https://hanabi.walkerplus.com/detail/ar0313e01074/ 