import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 秩父夜祭 详情页面
 * 数据ID: 1751100763508
 * 重建时间: 2025/6/28 22:52:18
 * 模板: UniversalStaticDetailTemplate
 * 地区: saitama
 * 活动类型: matsuri
 */

const activityData = {
  id: "1751100763508",
  name: "秩父夜祭",
  address: "西武鉄道西武秩父駅",
  datetime: "2025年12月3日(水) 花火19:30〜22:00 第一部「オープニング连发烟花大会」19:30〜、第二部「煙火主催町第69回競技花火大会」20:20〜、第三部「虹の连发烟花大会」21:05〜。フィナーレ「黄金の滝」21:50〜\n祭りは2024年12月2日(月)11:00～、3日(火)10:00～",
  venue: "秩父神社周辺",
  access: "【電車】西武鉄道西武秩父駅步行15分、秩父鉄道秩父駅步行5分 【車】関越自動車道花園ICから約60分地图",
  organizer: "",
  price: "有\n詳細は秩父観光協会官方网站をご確認ください。",
  contact: "0494-25-5209 秩父祭典対策本部(秩父市観光課)",
  website: "https://navi.city.chichibu.lg.jp/p_festival/1030/",
  googleMap: "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.990162,139.090079&center=35.990162,139.090079",
  region: "saitama",
  description: "* 会议日程将是过去的信息。一旦我们决定了即将举行的比赛的详细信息，我们将更新。说到埼玉县秩父市的冬季特色，是秩父神社的一个传统节日，它有300多年的历史。这是一个充满活力的节日，以悬挂装饰着灯笼和灯笼灯的花车而闻名，与京都庄园节和飞驒高山节一起被认为是日本三大花车节之一。在父亲的街道上来回旋转的山车有2座笠壶和4座落叶。它被指定为国家重要的有形和非物质民间文化财产，甚至被联合国教科文组织列为非物质文化遗产。每年前一天（12月2日）是宵宫，12月3日是大祭。在这样的大祭之夜，会燃放烟火，使秩父夜祭更加华丽。装饰着灯笼的笠、屋台和烟花的共同演出是压倒性的美。",
  activityType: "matsuri",
  detailLink: "/saitama/matsuri/activity--00763506",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.chichibu-神社.or.jp/wp-content/themes/ccbj/images/yomatsuri/img_01.jpg",
      title: "秩父夜祭图片1",
      alt: "秩父夜祭图片1",
      caption: ""
    }
  ],
  createdAt: "2025-06-28T08:52:43.515Z",
  updatedAt: "2025-06-28T08:52:43.515Z"
};

export default function ActivityDetailPage() {
  return (
    <UniversalStaticDetailTemplate
      data={activityData}
      regionKey="saitama"
      activityKey="matsuri"
    />
  );
}

export const metadata = {
  title: '秩父夜祭 - 日本活动指南',
  description: '【※大会项目为过往信息。预定举办的大会详细信息确定后将公布、信息更新】埼玉県秩父市の冬の風物詩といえば、300年以上の歴史を持つ秩父神社の例祭「秩父夜祭(ちちぶよ祭典)」。提灯やぼんぼりの灯りが飾り付けられた山車の曳き廻しで知られる迫力ある祭りで、京都祇園祭、飛騨高山祭とともに日本三大曳山祭の一つに数えられている。秩父の街中を曳き廻される山車は、笠鉾(かさぼこ)2基と屋台4基。国の重要有形・無形民俗文化財、さらにはユネスコの無形文化遺産にも指定されている。毎年前日の12月2日が宵宮で、12月3日が大祭。そんな大祭の夜には花火が打燃放げられ、秩父夜祭を華やかに盛り上げる。提灯が飾られた笠鉾や屋台と花火の共演は圧巻の美しさだ。',
};
