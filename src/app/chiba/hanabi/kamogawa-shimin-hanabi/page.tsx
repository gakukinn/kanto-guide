/**
 * 第五层页面 - kamogawa-shimin-hanabi完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event kamogawa-shimin-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/chiba/kamogawa-shimin-hanabi
 * @description kamogawa-shimin-hanabi完整详情信息，包含交通、观赏、历史等
 */
import React from 'react';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kamogawaData } from '@/data/level5-july-hanabi-chiba-kamogawa';

export default function KamogawaShiminHanabiPage() {
 return (
 <HanabiDetailTemplate data={kamogawaData} regionKey="chiba" />
 );
}

export const metadata = {
 title: '鸭川市民花火大会 - 7月花火大会指南',
 description: '千叶县鸭川市前原横渚海岸举办的鸭川市民花火大会详细信息。日本渚100选海岸的绚烂花火，约1500发花火绽放夜空，海面映照的花火与海风共演。',
 keywords: '鸭川市民花火大会,前原横渚海岸,千叶花火,日本渚100选,海岸花火,7月花火大会',
}; 