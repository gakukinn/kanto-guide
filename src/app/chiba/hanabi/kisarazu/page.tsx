/**
 * 第五层页面 - 第78回木更津港祭详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 第78回木更津港祭
 * @type 花火详情页面
 * @path /august/hanabi/chiba/kisarazu
 * @description 第78回木更津港祭完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { kisarazuHanabiData } from '@/data/level5-august-hanabi-kisarazu';

export default function KisarazuHanabiPage() {
 return <HanabiDetailTemplate data={kisarazuHanabiData} regionKey="chiba" />;
} 