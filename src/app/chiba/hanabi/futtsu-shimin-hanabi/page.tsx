/**
 * 第五层页面 - futtsu-shimin-hanabi完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event futtsu-shimin-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/chiba/futtsu-shimin-hanabi
 * @description futtsu-shimin-hanabi完整详情信息，包含交通、观赏、历史等
 */
import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { futtsuHanabiData } from '@/data/level5-july-hanabi-futtsu';

export const metadata: Metadata = {
 title: '富津市民花火大会 | 东京湾口道路建设促进第10回 2025 | 千叶花火',
 description: '千叶县富津市举办的传统市民花火大会。东京湾富津海水浴场5000发花火，水中花火与2尺玉必见。2025年7月26日开催，传承60年富津花火精神。',
 keywords: '富津市民花火大会,东京湾口道路建设促进,富津海水浴场,千叶花火,水中花火,2尺玉',
};

export default function FuttsuHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={futtsuHanabiData}
 regionKey="chiba"
 />
 );
} 