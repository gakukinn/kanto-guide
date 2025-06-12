/**
 * 第五层页面 - iruma-base-2025完整详情信息，包含交通、观赏、历史等
 * @layer 五层 (Detail Layer)
 * @month 7月
 * @region 埼玉
 * @event iruma-base-2025
 * @type 花火详情页面
 * @path /july/hanabi/saitama/iruma-base-2025
 * @description iruma-base-2025完整详情信息，包含交通、观赏、历史等
 */
import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { irumaBaseHanabiData } from '@/data/level5-july-hanabi-iruma-base';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: '令和7年度入间基地纳凉祭~盆踊与花火之夜 - 埼玉花火指南',
 description: '令和7年度入间基地纳凉祭详细信息。全日本唯一在现役军事基地举办的花火大会，约900发花火与传统盆踊的完美结合。',
 keywords: '入间基地纳凉祭,埼玉花火,军事基地花火,盆踊,航空自卫队',
};

export default function IrumaBaseHanabiPage() {
 return (
 <HanabiDetailTemplate 
 data={irumaBaseHanabiData} 
 regionKey="saitama"
 />
 );
} 