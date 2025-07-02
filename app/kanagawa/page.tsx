/**
 * 神奈川县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';
import { getRegionArticles } from '@/utils/articleUtils';

export const metadata = generateRegionMetadata('kanagawa');

export default async function KanagawaPage() {
  const config = await getRegionPageConfig('kanagawa');
  const articles = await getRegionArticles('kanagawa');
  
  return (
    <RegionPageTemplate 
      regionKey="kanagawa"
      config={config}
      articles={articles}
    />
  );
} 