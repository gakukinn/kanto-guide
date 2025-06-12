/**
 * 第五层页面 - jingu-gaien完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event jingu-gaien
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/jingu-gaien
 * @description jingu-gaien完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { jinguGaienHanabiData } from '@/data/level5-august-jingu-gaien-hanabi';

export default function JinguGaienHanabiPage() {
  return <HanabiDetailTemplate data={jinguGaienHanabiData} regionKey="tokyo" />;
} 