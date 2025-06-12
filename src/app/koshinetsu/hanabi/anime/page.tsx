/**
 * 第四层页面 - 动漫经典动画歌曲花火详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 甲信越
 * @event 动漫经典动画歌曲花火
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/anime
 * @description 动漫经典动画歌曲花火完整详情信息，动漫文化与花火艺术结合
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { animeClassicsData } from '@/data/level5-anime-classics-anisong-hanabi';

export default function AnimeHanabiPage() {
  return <HanabiDetailTemplate data={animeClassicsData} regionKey="koshinetsu" />;
} 