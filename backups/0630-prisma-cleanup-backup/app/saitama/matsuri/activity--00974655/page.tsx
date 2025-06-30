import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 寄居玉淀水天宮祭花火大会 详情页面
 * 数据ID: 1751100974657
 * 重建时间: 2025/6/28 22:52:18
 * 模板: UniversalStaticDetailTemplate
 * 地区: saitama
 * 活动类型: matsuri
 */

const activityData = {
  id: "1751100974657",
  name: "寄居玉淀水天宮祭花火大会",
  address: "JR・東武鉄道・秩父鉄道寄居駅南口",
  datetime: "2025年8月2日(土) 19:00～21:00",
  venue: "寄居町玉淀河原",
  access: "【電車】JR・東武鉄道・秩父鉄道寄居駅南口步行15分 【車】関越道花園ICから国道140号を秩父方面へ約15分 ※当日は会場周辺で交通規制有地图",
  organizer: "",
  price: "有\n詳細は公式サイトで発表予定",
  contact: "048-581-2121 寄居玉淀水天宮祭実行委員会事務局(寄居町プロモーション戦略課)",
  website: "https://www.town.yorii.saitama.jp/soshiki/13/yoriitamayodosuitengusai.html",
  googleMap: "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=36.110851,139.194526&center=36.110851,139.194526",
  region: "saitama",
  description: "在埼玉县寄居町举办，自1931年（昭和6年）开始持续至今的历史烟火大会。寄居玉淀水天宫祭是为了祈祷被称为“关东第一水祭”的水难而举行的祭祀活动，作为祭祀活动，在县指定名胜“玉淀”的河滩上举行烟花大会。烟花的发射从19点开始进行，明星地雷和装置烟花等别具一格的烟花很有魅力。",
  activityType: "matsuri",
  detailLink: "/saitama/matsuri/activity--00974655",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "http://mediaport-crwks.sakura.ne.jp/sblo_files/shima8707/image/170805-6619.jpg",
      title: "寄居玉淀水天宮祭花火大会图片1",
      alt: "寄居玉淀水天宮祭花火大会图片1",
      caption: ""
    }
  ],
  createdAt: "2025-06-28T08:56:14.664Z",
  updatedAt: "2025-06-28T08:56:14.664Z"
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
  title: '寄居玉淀水天宮祭花火大会 - 日本活动指南',
  description: '埼玉県の寄居町で開催され、1931年(昭和6年)から続く由緒ある花火大会。寄居玉淀水天宮祭は「関東一の水祭り」と呼ばれる水難除けなどを祈願して举行お祭りで、付け祭りとして県指定名勝「玉淀」の河原で花火大会が举办。花火の打燃放げは19時から行われ、连发烟花や仕掛け花火など、趣向を凝らした花火が魅力だ。',
};
