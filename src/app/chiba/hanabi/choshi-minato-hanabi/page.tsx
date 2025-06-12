/**
 * 第五层页面 - 铫子港祭花火大会详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 铫子港祭花火大会
 * @type 花火详情页面
 * @path /august/hanabi/chiba/choshi-minato-hanabi
 * @description 铫子港祭花火大会完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { choshiMinatoHanabiData } from '@/data/level5-august-hanabi-choshi-minato';

export default function ChoshiMinatoHanabiPage() {
 return <HanabiDetailTemplate data={choshiMinatoHanabiData} regionKey="chiba" />;
} 