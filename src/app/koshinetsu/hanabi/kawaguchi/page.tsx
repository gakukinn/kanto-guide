/**
 * 第四层页面 - 富士山河口湖山开花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 甲信越
 * @event 富士山河口湖山开花火大会
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/kawaguchi
 * @description 富士山河口湖山开花火大会完整详情信息，富士山背景湖畔花火
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { fujiKawaguchiData } from '@/data/level5-fuji-kawaguchi-lake-hanabi';

export default function KawaguchiHanabiPage() {
  return <HanabiDetailTemplate data={fujiKawaguchiData} regionKey="koshinetsu" />;
} 