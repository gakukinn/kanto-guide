/**
 * 第五层页面 - kozushima完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event kozushima
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/kozushima
 * @description kozushima完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kozushimaHanabiData } from '@/data/level5-august-kozushima-hanabi';

export default function KozushimaHanabiPage() {
  return <HanabiDetailTemplate data={kozushimaHanabiData} regionKey="tokyo" />;
} 