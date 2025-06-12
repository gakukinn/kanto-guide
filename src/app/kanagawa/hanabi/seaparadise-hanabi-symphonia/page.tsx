/**
 * 第五层页面 - seaparadise-hanabi-symphonia完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 神奈川
 * @event seaparadise-hanabi-symphonia
 * @type 花火详情页面
 * @path /july/hanabi/kanagawa/seaparadise-hanabi-symphonia
 * @description seaparadise-hanabi-symphonia完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { seaparadiseData } from '@/data/level5-july-hanabi-kanagawa-seaparadise';

export default function SeaparadiseHanabiSymphoniaPage() {
 return (
 <HanabiDetailTemplate 
 data={seaparadiseData}
 regionKey="kanagawa"
 />
 );
} 