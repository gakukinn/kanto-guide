/**
 * 第四层页面 - 祇园柏崎祭海之大花火大会详情
 * @layer 四层 (Detail Layer)
 * @month 7月
 * @region 甲信越
 * @event 祇园柏崎祭海之大花火大会
 * @type 花火详情页面
 * @path /koshinetsu/hanabi/kashiwazaki
 * @description 祇园柏崎祭海之大花火大会完整详情信息，日本海夜空花火盛典
 */
'use client';

import HanabiDetailTemplate from '@/components/HanabiDetailTemplate';
import { hanabiData } from '@/data/level5-gion-kashiwazaki-hanabi';

export default function KashiwazakiHanabiPage() {
  return <HanabiDetailTemplate data={hanabiData} regionKey="koshinetsu" />;
} 