/**
 * 第五层页面 - kumagaya完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event kumagaya
 * @type 花火详情页面
 * @path /august/hanabi/saitama/kumagaya
 * @description kumagaya完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kumagayaHanabiData } from '@/data/level5-august-kumagaya-hanabi';

export default function KumagayaHanabiPage() {
  return <HanabiDetailTemplate data={kumagayaHanabiData} regionKey="saitama" />;
} 