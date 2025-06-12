/**
 * 第五层页面 - marines-hanabi详情
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 千叶
 * @event marines-hanabi
 * @type 花火详情页面
 * @path /july/hanabi/chiba/marines-hanabi
 * @description marines-hanabi完整详情信息，包含交通、观赏、历史等
 */
import { Metadata } from 'next';
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { marinesData } from '@/data/level5-july-hanabi-chiba-marines';

export const metadata: Metadata = {
 title: '千叶罗德花火 | MARINES HANABI 2025 | 职业棒球花火体验',
 description: '千叶罗德海洋队主场ZOZO海洋体育场举办的特色花火大会。试合与花火的完美结合，球场背后直接打上的迫力花火体验。7月11日-8月11日特定日开催。',
 keywords: '千叶罗德花火,MARINES HANABI,ZOZO海洋体育场,职业棒球,千叶花火,试合花火',
};

export default function MarinesHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={marinesData}
 regionKey="chiba"
 />
 );
} 