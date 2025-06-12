/**
 * 第四层页面 - 第51回高崎大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 北关东
 * @event 第51回高崎大花火大会
 * @type 花火详情页面
 * @path /kitakanto/hanabi/takasaki
 * @description 第51回高崎大花火大会完整详情信息，群马县最大花火大会
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { takasakiHanabiData } from '@/data/level5-august-takasaki-hanabi';

export default function TakasakiHanabiPage() {
  return <HanabiDetailTemplate data={takasakiHanabiData} regionKey="kitakanto" />;
} 