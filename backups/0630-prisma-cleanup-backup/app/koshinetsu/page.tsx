/**
 * 甲信越活动指南页面
 */

import RegionPageTemplate from '@/components/RegionPageTemplate';
import { getRegionPageConfig, generateRegionMetadata } from '@/utils/regionPageUtils';

export const metadata = generateRegionMetadata('koshinetsu');

export default async function KoshinetsuPage() {
  const config = await getRegionPageConfig('koshinetsu');
  
  return (
    <RegionPageTemplate 
      regionKey="koshinetsu"
      config={config}
    />
  );
} 