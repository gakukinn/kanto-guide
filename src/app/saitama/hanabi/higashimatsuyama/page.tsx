/**
 * 第五层页面 - higashimatsuyama完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 埼玉
 * @event higashimatsuyama
 * @type 花火详情页面
 * @path /august/hanabi/saitama/higashimatsuyama
 * @description higashimatsuyama完整详情信息，包含交通、观赏、历史等
 */

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { higashimatsuyamaHanabiData } from '@/data/level5-august-higashimatsuyama-hanabi';

export default function HigashimatsuyamaHanabiPage() {
  return <HanabiDetailTemplate data={higashimatsuyamaHanabiData} regionKey="saitama" />;
} 