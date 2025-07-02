/**
 * 埼玉县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('saitama');

export default async function SaitamaPage() {
  const config = await getRegionPageConfig('saitama');
  const articles = await getRegionArticles('saitama');
  
  return (
    <RegionPageTemplate 
      regionKey="saitama"
      config={config}
      articles={articles}
    />
  );
} 