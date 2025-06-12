/**
 * 第五层页面 - 隅田川花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 东京
 * @event 隅田川花火大会
 * @type 花火详情页面
 * @path /july/hanabi/tokyo/sumida
 * @description 隅田川花火大会完整详情信息，包含交通、观赏、历史等
 */
'use client';

import HanabiDetailTemplate from '../../../../components/HanabiDetailTemplate';
import { sumidaData } from '../../../../data/level5-july-hanabi-tokyo-sumida';

export default function SumidaHanabiPage() {
 return <HanabiDetailTemplate data={sumidaData} regionKey="tokyo" />;
} 