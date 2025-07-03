/**
 * 越谷花火大会 详情页面
 * 自动生成于 2025-06-29T04:26:18.548Z
 * 使用模板: WalkerPlusHanabiTemplate
 */
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

const pageData = {
  "name": "越谷花火大会",
  "fireworksCount": "約5000発　(予定)",
  "fireworksTime": "約120分",
  "expectedVisitors": "27万人",
  "date": "2025年7月26日(土)",
  "time": "19：00至21：00",
  "venue": "越谷市中央市民会館葛西用水中土手",
  "access": "[电车]东武铁道越谷站步行6分钟",
  "weatherInfo": "小雨照常举行。恶劣天气取消。",
  "parking": "无",
  "price": "无",
  "contact": "048-971-9002 越谷市観光協会",
  "foodStalls": "有",
  "notes": "详见官网",
  "website": "https://www.koshigaya-sightseeing.jp/spot-play/spot/%e8%b6%8a%e8%b0%b7%e8%8a%b1%e7%81%ab%e5%a4%a7%e4%bc%9a/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.889323,139.793332&center=35.889323,139.793332",
  "id": "recognition-hanabi-1750933475647",
  "region": "saitama",
  "activityType": "hanabi",
  "description": "在埼玉县的越谷市举办的烟花节。会场位于葛西用水中岸，可以说是“水乡阁”的象征，从水边燃烧的烟火，奇妙地照亮了夜空和河流的表面。五颜六色的星光和令人震撼的大宝石一个接一个地撞着城市，伴随着热闹的声音。会场周围也有摊位，可以在享受夏天祭典风情的同时欣赏烟火的同时，也是魅力之一。由于当天17：00至21：30实施交通管制，建议提前到达现场和使用公共交通。如果下雨，活动将举行，但如果天气恶劣，活动将取消，所以别忘了检查天气情况。",
  "highlights": "从葛西用水的中州发射的约5000发烟花，汇集了连续花火和连发烟花等精彩的演出，将河面上映出的鲜艳的灯光和声音融为一体，将观众包围在一起。摊位也很丰富，你可以在享受摊位美食的同时度过夏日的时光。",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://koshigayalaketown.net/wp-content/uploads/416919a3812bed07f8e4b8101a72798b-1.jpg",
      "title": "越谷花火大会图片1",
      "alt": "越谷花火大会图片1",
      "caption": ""
    }
  ],
  "detailLink": "/saitama/hanabi/activity--33475647",
  "createdAt": "2025-06-29T04:26:18.546Z",
  "source": "walkerplus-generator"
} as const;

export default function DetailPage() {
  return (
    <WalkerPlusHanabiTemplate
      data={pageData}
      regionKey="saitama"
      activityKey="hanabi"
    />
  );
}

export const metadata = {
  title: '越谷花火大会 - 日本活动指南',
  description: '埼玉県越谷市で举办花火大会。会場は「水郷こしがや」の象徴ともいえる葛西用水の中土手で、水辺から被燃放花火が夜空と川面を幻想的に照らし出す。色とりどりの连发烟花や迫力ある大玉などが次々と打燃放がり、にぎやかな音とともに街を包み込む。会場周辺には屋台も並び、夏祭りの風情を楽しみながら花火を鑑賞可以のも魅力のひとつ。当日は17時から21時30分まで交通規制が举行ため、早めの来場と公共交通機関の利用がおすすめ。小雨の場合は举办が、恶劣天气时中止となるため、天候の確認も忘れずにしたい。',
};
