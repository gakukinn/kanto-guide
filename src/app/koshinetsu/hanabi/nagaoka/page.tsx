/**
 * 第四层页面 - 长冈祭大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 甲信越
 * @event 长冈祭大花火大会
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/nagaoka
 * @description 长冈祭大花火大会完整详情信息，日本三大花火大会之一
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { nagaokaHanabiData } from '@/data/level5-august-nagaoka-hanabi';

export default function NagaokaHanabiPage() {
  return <HanabiDetailTemplate data={nagaokaHanabiData} regionKey="koshinetsu" />;
} 