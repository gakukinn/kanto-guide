/**
 * 第五层页面 - seibu-en-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event seibu-en-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/seibu-en-2025
 * @description seibu-en-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { seibuEnHanabiData } from '@/data/level5-july-hanabi-seibu-en';

export default function SeibuEnHanabiPage() {
 return <HanabiDetailTemplate data={seibuEnHanabiData} regionKey="saitama" />;
}

export async function generateMetadata() {
 return {
 title: '西武园游乐园大火祭 - 2025年7月19日起 | 埼玉县花火大会',
 description: '2025年7月19日～9月15日期间举办的西武园游乐园大火祭。19:30开始约7分钟的音乐同步花火表演，超近距离震撼体验。埼玉县所泽市唯一的游乐园花火节。',
 keywords: '西武园, 游乐园, 大火祭, 花火, 埼玉县, 所泽市, 音乐同步, 2025年, 夏季',
 openGraph: {
 title: '西武园游乐园大火祭 2025',
 description: '日本唯一游乐园内音乐同步花火表演，超近距离震撼体验',
 type: 'article',
 url: 'https://your-site.com/july/hanabi/saitama/seibu-en-2025',
 images: [
 {
 url: '/images/hanabi-placeholder.jpg',
 width: 1200,
 height: 630,
 alt: '西武园游乐园大火祭'
 }
 ],
 siteName: '花火大会指南',
 locale: 'zh_CN'
 },
 twitter: {
 card: 'summary_large_image',
 title: '西武园游乐园大火祭 2025',
 description: '音乐与花火的完美融合，7分钟超密集震撼体验',
 images: ['/images/hanabi-placeholder.jpg']
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1
 }
 },
 alternates: {
 canonical: 'https://your-site.com/july/hanabi/saitama/seibu-en-2025'
 }
 };
} 