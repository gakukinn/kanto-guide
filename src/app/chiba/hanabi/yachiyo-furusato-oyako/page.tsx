import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { yachiyoFurusatoOyakoHanabiData } from '@/data/hanabi/chiba/level4-yachiyo-furusato-oyako-hanabi';
import { Metadata } from 'next';

export default function YachiyoFurusatoOyakoHanabiPage() {
  return (
    <HanabiDetailTemplate
      data={yachiyoFurusatoOyakoHanabiData}
      regionKey="chiba"
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: yachiyoFurusatoOyakoHanabiData.title,
    description: yachiyoFurusatoOyakoHanabiData.description,
    keywords: '八千代故乡亲子祭,八千代花火,千叶县,亲子祭典,免费观赏,2024年8月',
    openGraph: {
      title: yachiyoFurusatoOyakoHanabiData.title,
      description: yachiyoFurusatoOyakoHanabiData.description,
      type: 'website',
      locale: 'zh_CN',
    },
  };
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 24小时重新验证
