/**
 * 第五层页面 - kamakura-hanabi详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 神奈川
 * @event kamakura-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/kanagawa/kamakura-hanabi
 * @description kamakura-hanabi完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kamakuraData } from '@/data/level5-july-hanabi-kanagawa-kamakura';

export default function KamakuraHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={kamakuraData}
 regionKey="kanagawa"
 />
 );
} 