/**
 * 第五层页面 - akishima完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event akishima
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/akishima
 * @description akishima完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { akishimaHanabiData } from '@/data/level5-august-akishima-hanabi';

export default function AkishimaHanabiPage() {
 return <HanabiDetailTemplate data={akishimaHanabiData} regionKey="tokyo" />;
} 