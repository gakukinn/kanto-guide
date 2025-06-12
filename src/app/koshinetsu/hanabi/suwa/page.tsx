/**
 * 第四层页面 - 第77回诹访湖祭湖上花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 8月
 * @region 甲信越
 * @event 第77回诹访湖祭湖上花火大会
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/suwa
 * @description 第77回诹访湖祭湖上花火大会完整详情信息，诹访湖夜空花火盛典
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { suwaHanabiData } from '@/data/level5-august-suwa-hanabi';

export default function SuwaHanabiPage() {
  return <HanabiDetailTemplate data={suwaHanabiData} regionKey="koshinetsu" />;
} 