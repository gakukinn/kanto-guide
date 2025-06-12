/**
 * 第五层页面 - 幕张海滩花火节2025详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 幕张海滩花火节2025(第47回千叶市民花火大会)
 * @type 花火详情页面
 * @path /august/hanabi/chiba/makuhari-beach-hanabi
 * @description 幕张海滩花火节2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { makuhariBeachHanabiData } from '@/data/level5-august-hanabi-makuhari-beach';

export default function MakuhariBeachHanabiPage() {
 return <HanabiDetailTemplate data={makuhariBeachHanabiData} regionKey="chiba" />;
} 