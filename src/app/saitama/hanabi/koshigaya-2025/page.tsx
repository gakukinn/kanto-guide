/**
 * 第五层页面 - koshigaya-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event koshigaya-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/koshigaya-2025
 * @description koshigaya-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { koshigayaHanabiData } from '@/data/level5-july-hanabi-koshigaya';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: '越谷花火大会 - 埼玉花火指南',
 description: '越谷花火大会详细信息。埼玉县最受欢迎的花火大会，约5000发花火在葛西用水中土手绽放，川面倒影更添幻想色彩。',
 keywords: '越谷花火大会,埼玉花火,葛西用水,川面倒影,水乡花火',
};

export default function KoshigayaHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={koshigayaHanabiData} 
 regionKey="saitama"
 />
 );
} 