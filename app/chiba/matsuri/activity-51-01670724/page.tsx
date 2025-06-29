import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 第51回 八千代ふるさと親子祭 详情页面
 * 数据ID: 1751101670726
 * 重建时间: 2025/6/28 22:52:18
 * 模板: UniversalStaticDetailTemplate
 * 地区: chiba
 * 活动类型: matsuri
 */

const activityData = {
  id: "1751101670726",
  name: "第51回 八千代ふるさと親子祭",
  address: "東葉高速鉄道村上駅",
  datetime: "2025年8月23日(土) 花火は19:00～20:20\n祭りは16:00～20:20",
  venue: "県立八千代広域公園及び村上橋周辺",
  access: "【電車】東葉高速鉄道村上駅から徒歩10分。東葉高速鉄道八千代中央駅から徒歩15分 ※当日は会場周辺で交通規制あり(17:00～21:30)MAP",
  organizer: "",
  price: "あり",
  contact: "047-483-1771 八千代ふるさと親子祭実行委員会事務局(八千代商工会議所内)",
  website: "https://yachiyocci.jp/info/news/50th-oyako/",
  googleMap: "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.733034,140.112285&center=35.733034,140.112285",
  region: "chiba",
  description: "* 会议日程将是过去的信息。关于预定举行的大会的详细情况决定后，我们将更新信息]八千代故乡亲子节将在千叶县八千代市举行。巨大的烟花将八千代的夜空染成了色彩鲜艳的色彩。在最接近的地方享受烟花的震撼力的Sujiki赞助座位门票和一般场地赞助门票都出售，让您可以慢慢地欣赏烟花。从当天16点开始，还将举行盂兰盆舞、惯例的灯火流和模拟店开张等活动。",
  activityType: "matsuri",
  detailLink: "/chiba/matsuri/activity-51-01670724",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://hanabi-navi.info/wp-content/uploads/2025/06/maxresdefault-31.jpg",
      title: "第51回 八千代ふるさと親子祭图片1",
      alt: "第51回 八千代ふるさと親子祭图片1",
      caption: ""
    }
  ],
  createdAt: "2025-06-28T09:07:50.733Z",
  updatedAt: "2025-06-28T09:07:50.733Z"
};

export default function ActivityDetailPage() {
  return (
    <UniversalStaticDetailTemplate
      data={activityData}
      regionKey="chiba"
      activityKey="matsuri"
    />
  );
}

export const metadata = {
  title: '第51回 八千代ふるさと親子祭 - 日本活动指南',
  description: '【※大会プログラムは過去の情報になります。開催予定の大会については詳細が決定次第、情報を更新します】千葉県八千代市で開催する八千代ふるさと親子祭。大迫力の花火が八千代の夜空を色鮮やかに染める。花火の迫力を一番近くで楽しめるさじき協賛席手チケットや、総合グラウンド協賛チケットの販売もありゆっくりと花火を堪能できる。当日16時からは盆踊り、恒例の灯ろう流しや模擬店の出店なども行われる。',
};
