/**
 * 第四层页面 - 真冈市夏祭大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 北关东
 * @event 真冈市夏祭大花火大会
 * @type 花火详情页面
 * @path /kitakanto/hanabi/moka
 * @description 真冈市夏祭大花火大会完整详情信息，包含交通、观赏、历史等
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { mokaHanabiData } from '@/data/level5-moka-hanabi';

export default function MokaHanabiPage() {
  return <HanabiDetailTemplate data={mokaHanabiData} regionKey="kitakanto" />;
} 