/**
 * 甲信越活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('koshinetsu');

export default async function KoshinetsuPage() {
  const config = await getRegionPageConfig('koshinetsu');
  const articles = await getRegionArticles('koshinetsu');
  
  return (
    <RegionPageTemplate 
      regionKey="koshinetsu"
      config={config}
      articles={articles}
    />
  );
} 