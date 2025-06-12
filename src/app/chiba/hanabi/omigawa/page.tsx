/**
 * 第五层页面 - omigawa完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event omigawa
 * @type 花火详情页面
 * @path /august/hanabi/chiba/omigawa
 * @description omigawa完整详情信息，包含交通、观赏、历史等
 */
'use client';

import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { hanabiDetailData } from '@/data/level5-august-omigawa-hanabi';

export default function OmigawaHanabiPage() {
  return <HanabiDetailTemplate data={hanabiDetailData} regionKey="chiba" />;
}

 