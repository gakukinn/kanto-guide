/**
 * 神奈川县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('kanagawa');

export default async function KanagawaPage() {
  const config = await getRegionPageConfig('kanagawa');
  
  return (
    <RegionPageTemplate 
      regionKey="kanagawa"
      config={config}
    />
  );
} 