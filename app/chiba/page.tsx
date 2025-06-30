/**
 * 千叶县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('chiba');

export default async function ChibaPage() {
  const config = await getRegionPageConfig('chiba');
  
  return (
    <RegionPageTemplate 
      regionKey="chiba"
      config={config}
    />
  );
} 