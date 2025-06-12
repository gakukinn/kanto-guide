/**
 * 第四层页面 - 第109回足利花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 北关东
 * @event 第109回足利花火大会
 * @type 花火详情页面
 * @path /kitakanto/hanabi/ashikaga
 * @description 第109回足利花火大会完整详情信息，包含交通、观赏、历史等
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ashikagaHanabiData } from '@/data/level5-august-ashikaga-hanabi';

export default function AshikagaHanabiPage() {
  return <HanabiDetailTemplate data={ashikagaHanabiData} regionKey="kitakanto" />;
} 