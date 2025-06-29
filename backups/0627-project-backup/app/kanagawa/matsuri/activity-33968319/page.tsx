import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750933968319
 * 生成时间: 2025/6/26 19:32:48
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 湘南ひらつか七夕まつり（しょうなんひらつかたなばたまつり）
 * 2. 所在地: 〒254-0043　神奈川県平塚市紅谷町
 * 3. 开催期间: 2025年7月4日～6日　 七夕まつり終了時間/20:00（最終日は19:00）
 * 4. 开催场所: 神奈川県平塚市　ＪＲ平塚駅北口商店街を中心とする市内各所
 * 5. 交通方式: ＪＲ東海道本線「平塚駅」から徒歩2分
 * 6. 主办方: 湘南ひらつか七夕まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 湘南ひらつか七夕まつり実行委員会（平塚市商業観光課内）　0463-35-8107
 * 9. 官方网站: http://www.tanabata-hiratsuka.com/
 * 10. 谷歌地图: 35.327136,139.349616
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750933968319",
  name: "湘南ひらつか七夕まつり（しょうなんひらつかたなばたまつり）",
  address: "〒254-0043　神奈川県平塚市紅谷町",
  datetime: "2025年7月4日～6日　 七夕まつり終了時間/20:00（最終日は19:00）",
  venue: "神奈川県平塚市　ＪＲ平塚駅北口商店街を中心とする市内各所",
  access: "ＪＲ東海道本線「平塚駅」から徒歩2分",
  organizer: "湘南ひらつか七夕まつり実行委員会",
  price: "",
  contact: "湘南ひらつか七夕まつり実行委員会（平塚市商業観光課内）　0463-35-8107",
  website: "http://www.tanabata-hiratsuka.com/",
  googleMap: "https://maps.google.com/maps?q=35.327136,139.349616&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "湘南に夏の訪れを告げる日本有数の「七夕まつり」が、JR平塚駅近辺を会場に開催されます。メイン会場である「湘南スターモール」や「紅谷パールロード」が、絢爛豪華な大型飾りで華やかに彩られます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/sites/default/files/2025-05/maturi_0.jpg",
      title: "湘南ひらつか七夕まつり（しょうなんひらつかたなばたまつり）图片1",
      alt: "湘南ひらつか七夕まつり（しょうなんひらつかたなばたまつり）图片1",
      caption: ""
    }
  ]
};

  // 确定地区键 - 使用标准化的地区映射
  const REGION_MAP = {
    'tokyo': 'tokyo',
    'saitama': 'saitama', 
    'chiba': 'chiba',
    'kanagawa': 'kanagawa',
    'kitakanto': 'kitakanto',
    'koshinetsu': 'koshinetsu',
    '東京都': 'tokyo',
    '東京': 'tokyo',
    '埼玉県': 'saitama',
    '埼玉': 'saitama',
    '千葉県': 'chiba',
    '千葉': 'chiba',
    '神奈川県': 'kanagawa',
    '神奈川': 'kanagawa',
    '茨城県': 'kitakanto',
    '栃木県': 'kitakanto',
    '群馬県': 'kitakanto',
    '新潟県': 'koshinetsu',
    '長野県': 'koshinetsu',
    '山梨県': 'koshinetsu'
  };
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;