/**
 * 埼玉县活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('saitama');

export default async function SaitamaPage() {
  const config = await getRegionPageConfig('saitama');
  
  return (
    <RegionPageTemplate 
      regionKey="saitama"
      config={config}
    />
  );
} 