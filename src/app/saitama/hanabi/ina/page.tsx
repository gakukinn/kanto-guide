/**
 * 第五层页面 - 伊奈花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event ina
 * @type 花火详情页面
 * @path /august/hanabi/saitama/ina
 * @description 伊奈花火大会完整详情信息，包含交通、观赏、历史等
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { inaHanabiData } from '@/data/level5-august-ina-hanabi';

export default function InaHanabiPage() {
  return (
    <HanabiDetailTemplate 
      data={inaHanabiData}
      regionKey="saitama"
    />
  );
} 