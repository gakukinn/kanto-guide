/**
 * 第五层页面 - asaka完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event asaka
 * @type 花火详情页面
 * @path /august/hanabi/saitama/asaka
 * @description asaka完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { asakaHanabiData } from '@/data/level5-august-asaka-hanabi';

export default function AsakaHanabiPage() {
  return <HanabiDetailTemplate data={asakaHanabiData} regionKey="saitama" />;
} 