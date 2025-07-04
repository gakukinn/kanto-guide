/**
 * 千叶县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('chiba');

export default async function ChibaPage() {
  const config = await getRegionPageConfig('chiba');
  const articles = await getRegionArticles('chiba');
  
  return (
    <RegionPageTemplate 
      regionKey="chiba"
      config={config}
      articles={articles}
    />
  );
} 