/**
 * 北关东活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('kitakanto');

export default async function KitakantoPage() {
  const config = await getRegionPageConfig('kitakanto');
  
  return (
    <RegionPageTemplate 
      regionKey="kitakanto"
      config={config}
    />
  );
} 