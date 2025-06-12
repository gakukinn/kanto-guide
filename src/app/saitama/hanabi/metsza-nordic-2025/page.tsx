/**
 * 第五层页面 - metsza-nordic-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event metsza-nordic-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/metsza-nordic-2025
 * @description metsza-nordic-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { metszaNordicHanabiData } from '@/data/level5-july-hanabi-metsza-nordic';

export default function MetszaNordicHanabiPage() {
 return <HanabiDetailTemplate data={metszaNordicHanabiData} regionKey="saitama" />;
}

export async function generateMetadata() {
 return {
 title: '梅兹塔北欧花火2025 - 7月12日起 | 埼玉县花火大会',
 description: '2025年7月12日起举办的梅兹塔北欧花火。19:40开始约15分钟的北欧主题音乐同步花火表演，湖面倒影观赏体验。埼玉县饭能市唯一的北欧主题花火节。',
 keywords: '梅兹塔, 北欧花火, 姆明谷, 花火, 埼玉县, 饭能市, 音乐同步, 湖畔花火, 2025年',
 openGraph: {
 title: '梅兹塔北欧花火2025',
 description: '北欧8国大使馆推荐音乐与湖畔花火的完美融合',
 type: 'article',
 url: 'https://your-site.com/july/hanabi/saitama/metsza-nordic-2025',
 images: [
 {
 url: '/images/hanabi-placeholder.jpg',
 width: 1200,
 height: 630,
 alt: '梅兹塔北欧花火湖面倒影'
 }
 ]
 }
 };
} 