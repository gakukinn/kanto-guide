/**
 * 东京都活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('tokyo');

export default async function TokyoPage() {
  const config = await getRegionPageConfig('tokyo');
  
  return (
    <RegionPageTemplate 
      regionKey="tokyo"
      config={config}
    />
  );
} 