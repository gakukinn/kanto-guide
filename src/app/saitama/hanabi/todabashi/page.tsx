/**
 * 第五层页面 - todabashi完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event todabashi
 * @type 花火详情页面
 * @path /august/hanabi/saitama/todabashi
 * @description todabashi完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { todabashiHanabiData } from '@/data/level5-august-todabashi-hanabi';

export default function TodabashiHanabiPage() {
  return <HanabiDetailTemplate data={todabashiHanabiData} regionKey="saitama" />;
} 