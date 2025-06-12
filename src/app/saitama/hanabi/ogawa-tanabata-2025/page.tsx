/**
 * 第五层页面 - ogawa-tanabata-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event ogawa-tanabata-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/ogawa-tanabata-2025
 * @description ogawa-tanabata-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { ogawaTanabataHanabiData } from '@/data/level5-july-hanabi-ogawa-tanabata';

export default function OgawaTanabataHanabiPage() {
 return <HanabiDetailTemplate data={ogawaTanabataHanabiData} regionKey="saitama" />;
}

export async function generateMetadata() {
 return {
 title: '第77回小川町七夕祭花火大会 - 2025年7月26日 | 埼玉县花火大会',
 description: '2025年7月26日举办的第77回小川町七夕祭花火大会详细信息。约200发花火、约9万人参观。埼玉县比企郡传统七夕祭与花火的完美结合，JR、东武东上线小川町站即到。',
 keywords: '小川町, 七夕祭, 花火大会, 埼玉县, 2025年, 7月26日, 比企郡, 尺玉, 星际烟花',
 openGraph: {
 title: '第77回小川町七夕祭花火大会 2025',
 description: '七夕祭与花火的传统结合，200发花火照亮比企郡夜空',
 type: 'article',
 url: 'https://your-site.com/july/hanabi/saitama/ogawa-tanabata-2025',
 images: [
 {
 url: '/images/hanabi-placeholder.jpg',
 width: 1200,
 height: 630,
 alt: '第77回小川町七夕祭花火大会'
 }
 ]
 }
 };
} 