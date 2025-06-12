/**
 * 第五层页面 - mother-farm-summer-night完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event mother-farm-summer-night
 * @type 花火详情页面
 * @path /july/hanabi/chiba/mother-farm-summer-night
 * @description mother-farm-summer-night完整详情信息，包含交通、观赏、历史等
 */
import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { motherfarmData } from '@/data/level5-july-hanabi-chiba-motherfarm';

export const metadata: Metadata = {
 title: '母亲牧场夏夜农场 | 母亲牧場 夏夜农场 2025 | 千叶花火',
 description: '千叶县富津市母亲牧场举办的独特花火体验。与动物接触后在山谷间观赏近距离花火，享受烤羊肉美食观览席。7月26日、27日开催。',
 keywords: '母亲牧场夏夜农场,母亲牧場,夏夜农场,千叶花火,动物花火,烤羊肉,富津',
};

export default function MotherFarmHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={motherfarmData}
 regionKey="chiba"
 />
 );
} 