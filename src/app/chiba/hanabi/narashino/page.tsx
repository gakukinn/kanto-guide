/**
 * 第五层页面 - 令和7年习志野驻屯地夏祭详情
 * @layer 五层 (Detail Layer)
 * @month 8月
 * @region 千叶
 * @event 令和7年习志野驻屯地夏祭
 * @type 花火详情页面
 * @path /august/hanabi/chiba/narashino
 * @description 令和7年习志野驻屯地夏祭完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { narashinoHanabiData } from '@/data/level5-august-hanabi-narashino';

export default function NarashinoHanabiPage() {
 return <HanabiDetailTemplate data={narashinoHanabiData} regionKey="chiba" />;
} 