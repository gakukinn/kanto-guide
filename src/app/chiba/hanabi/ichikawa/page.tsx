/**
 * 第五层页面 - 第41回市川市民纳凉花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 第41回市川市民纳凉花火大会
 * @type 花火详情页面
 * @path /august/hanabi/chiba/ichikawa
 * @description 第41回市川市民纳凉花火大会完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ichikawaHanabiData } from '@/data/level5-august-hanabi-ichikawa';

export default function IchikawaHanabiPage() {
 return <HanabiDetailTemplate data={ichikawaHanabiData} regionKey="chiba" />;
} 