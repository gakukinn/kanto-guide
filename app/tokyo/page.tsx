/**
 * 东京都活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('tokyo');

export default async function TokyoPage() {
  const config = await getRegionPageConfig('tokyo');
  const articles = await getRegionArticles('tokyo');
  
  return (
    <RegionPageTemplate 
      regionKey="tokyo"
      config={config}
      articles={articles}
    />
  );
} 