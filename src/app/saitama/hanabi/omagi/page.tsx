/**
 * 第五层页面 - omagi完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event omagi
 * @type 花火详情页面
 * @path /august/hanabi/saitama/omagi
 * @description omagi完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { saitamaOmagiHanabiData } from '@/data/level5-august-saitama-omagi-hanabi';

export default function OmagiHanabiPage() {
  return <HanabiDetailTemplate data={saitamaOmagiHanabiData} regionKey="saitama" />;
} 