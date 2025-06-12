/**
 * 第五层页面 - oamishirasato-hanabi详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event oamishirasato-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/chiba/oamishirasato-hanabi
 * @description oamishirasato-hanabi完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { oamishirasatoData } from '@/data/level5-july-hanabi-chiba-oamishirasato';

export default function OamishirasatoHanabiPage() {
 return <HanabiDetailTemplate data={oamishirasatoData} regionKey="chiba" />;
} 