/**
 * 八王子花火大会 详情页面
 * 自动生成于 2025-06-29T04:10:46.110Z
 * 使用模板: WalkerPlusHanabiTemplate
 */
import WalkerPlusHanabiTemplate from '../../../../src/components/WalkerPlusHanabiTemplate';

const pageData = {
  "name": "八王子花火大会",
  "fireworksCount": "約4000発　(予定)",
  "fireworksTime": "75分",
  "expectedVisitors": "約9万人　(2024年)",
  "date": "2025年7月26日(土)",
  "time": "19：00至20：15",
  "venue": "富士森公園",
  "access": "火车：从JR八王子站或JR西八王子站步行20分钟。京王电铁山田站步行15分钟",
  "weatherInfo": "中止",
  "parking": "×",
  "price": "无（No）",
  "contact": "042-649-2827 （公社）八王子观光会议协会",
  "foodStalls": "详见官网",
  "notes": "详见官网",
  "website": "https://www.hkc.or.jp/fireworks/",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.651621,139.321575&center=35.651621,139.321575",
  "id": "1751170246108",
  "region": "tokyo",
  "activityType": "hanabi",
  "description": "每年夏天举办的“八王子烟火大会”，对八王子市民来说是熟悉的季节风景。大约有4000发烟花在夜空中绽放。作为会场的富士森公园是市民们喜爱的休息场所，头顶上盛开着巨大的花朵的景象令人印象深刻，让人感受到烟花爆炸的声音在心中回荡的现实感。",
  "highlights": "各种各样的燃放烟花，如明星马因，是值得一看的。壮观的烟花照亮了八王子的夜空，你可以在观赏场地附近欣赏到烟花。",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/92b34d50-cfda-40e1-b0f0-312f1555a8a7/0_3.png",
      "title": "八王子花火大会图片1",
      "alt": "八王子花火大会图片1",
      "caption": ""
    }
  ],
  "detailLink": "/tokyo/hanabi/activity--70246107",
  "createdAt": "2025-06-29T04:10:46.108Z",
  "source": "walkerplus-generator"
} as const;

export default function DetailPage() {
  return (
    <WalkerPlusHanabiTemplate
      data={pageData}
      regionKey="tokyo"
      activityKey="hanabi"
    />
  );
}

export const metadata = {
  title: '八王子花火大会 - 日本活动指南',
  description: '毎年夏に举办「八王子花火大会」は、八王子市民にとっておなじみの季節の風物詩。約4000発の燃放花火が次々と夜空に咲く。会場となる富士森公園は市民の憩いの場として親しまれており、頭上で大輪の華が咲き誇る様子は迫力満点で、花火の炸裂音が胸に響くような臨場感を味わえる。',
};
