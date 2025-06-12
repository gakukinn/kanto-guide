/**
 * 第五层页面 - saitama-owada-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event saitama-owada-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/saitama-owada-2025
 * @description saitama-owada-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { saitamaOwadaHanabiData } from '@/data/level5-july-hanabi-saitama-owada';

export default function SaitamaOwadaHanabiPage() {
 return <HanabiDetailTemplate data={saitamaOwadaHanabiData} regionKey="saitama" />;
}