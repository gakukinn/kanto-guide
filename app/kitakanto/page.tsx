/**
 * 北关东活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('kitakanto');

export default async function KitakantoPage() {
  const config = await getRegionPageConfig('kitakanto');
  const articles = await getRegionArticles('kitakanto');
  
  return (
    <RegionPageTemplate 
      regionKey="kitakanto"
      config={config}
      articles={articles}
    />
  );
} 