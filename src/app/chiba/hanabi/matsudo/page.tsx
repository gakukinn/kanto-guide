/**
 * 第五层页面 - 松戸花火大会2025详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 松戸花火大会2025
 * @type 花火详情页面
 * @path /august/hanabi/chiba/matsudo
 * @description 松戸花火大会2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { matsudoHanabiData } from '@/data/level5-august-hanabi-matsudo';

export default function MatsudoHanabiPage() {
 return <HanabiDetailTemplate data={matsudoHanabiData} regionKey="chiba" />;
} 