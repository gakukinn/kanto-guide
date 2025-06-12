/**
 * 第五层页面 - edogawa完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 东京
 * @event edogawa
 * @type 花火详情页面
 * @path /august/hanabi/tokyo/edogawa
 * @description edogawa完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { edogawaHanabiData } from '@/data/level5-august-edogawa-hanabi';

export default function EdogawaHanabiPage() {
  return <HanabiDetailTemplate data={edogawaHanabiData} regionKey="tokyo" />;
} 