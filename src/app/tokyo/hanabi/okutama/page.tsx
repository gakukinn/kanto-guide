/**
 * 第五层页面 - okutama完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event okutama
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/okutama
 * @description okutama完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { okutamaHanabiData } from '@/data/level5-august-okutama-hanabi';

export default function OkutamaHanabiPage() {
  return <HanabiDetailTemplate data={okutamaHanabiData} regionKey="tokyo" />;
}

 