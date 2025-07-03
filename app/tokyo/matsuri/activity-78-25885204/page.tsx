import WalkerPlusMatsuriTemplate from '../../../../src/components/WalkerPlusMatsuriTemplate';
import { Metadata } from 'next';

const pageData = {
  "name": "第78回 御灵祭 靖国神社",
  "reservationSystem": "予約不要",
  "viewingPoints": "参道の献灯",
  "expectedVisitors": "約15万人",
  "date": "2025年7月13日(日)～16日(水)",
  "time": "9:00～20:00 各種奉納芸能：10:00ごろ～20:00ごろ。境内の献灯・揮毫雪洞：日没〜21:30まで点灯",
  "venue": "靖国神社",
  "access": "【電車】東京地铁九段下駅から徒歩5分、JR飯田橋駅・市ヶ谷駅から徒歩10分",
  "weatherInfo": "当日の天候により予定変更となる場合あり",
  "parking": "无 公共交通機関利用を推奨",
  "price": "入場無料",
  "contact": "03-3261-8326 靖国神社社務所",
  "foodStalls": "详见官网",
  "notes": "详见官网",
  "spotName": "靖国神社",
  "spotAddress": "東京都千代田区九段北3-1-1",
  "website": "https://www.yasukuni.or.jp/schedule/saiji.html",
  "googleMap": "https://www.google.com/maps/embed/v1/place?key=AIzaSyDbSCIe9u9tyzmG1OdAae8eRLPGmK5sevc&zoom=16&q=35.694136,139.743848&center=35.694136,139.743848",
  "id": "1751525885204",
  "region": "tokyo",
  "activityType": "matsuri",
  "description": "御灵祭始于昭和22年（1947年），为慰灵战殁者英魂而设，是东京夏季的代表性传统活动，每年吸引大量参观者前来。期间将在境内点亮表达对英灵感恩之意的献灯，以及各界名人的题字灯笼，夜空中灯光摇曳，美不胜收。傍晚时分本殿每天举行祭祀仪式，同时在距离本殿最近的神域中庭开放夜间参拜。活动期间境内还将举行神轿巡游、青森睡魔花车表演、奉纳艺能表演及盆舞大会，外苑区域则排列众多美食餐车，充满热闹的夏日祭典氛围。",
  "highlights": "每天夜间举行的盆舞大会任何人都可参加，在超过三万盏大小献灯与题字灯笼点亮的美丽灯海中起舞，留下难忘的夏夜回忆。",
  "themeColor": "orange",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn-ak.f.st-hatena.com/images/fotolife/c/coollove/20230714/20230714173505.jpg",
      "title": "第78回 みたままつり 靖国神社图片1",
      "alt": "第78回 みたままつり 靖国神社图片1",
      "caption": ""
    }
  ],
  "detailLink": "/tokyo/matsuri/activity-78-25885204",
  "createdAt": "2025-07-03T06:58:05.205Z",
  "source": "walkerplus-generator"
} as const;

export const metadata: Metadata = {
  title: '第78回 みたままつり 靖国神社 | TOKYO祭典活动指南',
  description: '昭和22年(1947年)、戦歿者のみたまを慰霊するために始まったみたままつり。東京の夏の風物詩として親しまれ、例年多くの参拝者でにぎわう。期間中は英霊への感謝を込めた献灯や、各界名士の揮毫(きごう)による懸雪洞(かけぼんぼり)が境内に掲げられ、夜空を美しく彩る。本殿では毎日夕方に祭儀が行われるほか、本殿に最も近い神域の中庭(ちゅうてい)で、夜間中庭参拝が実施される。境内ではみこし振りや、青森ねぶた、奉納芸能、盆踊りが行われ、外苑にはたくさんのキッチンカーが並ぶ。',
  keywords: '第78回 みたままつり 靖国神社, 祭典, tokyo, 传统活动, 日本',
  openGraph: {
    title: '第78回 みたままつり 靖国神社',
    description: '昭和22年(1947年)、戦歿者のみたまを慰霊するために始まったみたままつり。東京の夏の風物詩として親しまれ、例年多くの参拝者でにぎわう。期間中は英霊への感謝を込めた献灯や、各界名士の揮毫(きごう)による懸雪洞(かけぼんぼり)が境内に掲げられ、夜空を美しく彩る。本殿では毎日夕方に祭儀が行われるほか、本殿に最も近い神域の中庭(ちゅうてい)で、夜間中庭参拝が実施される。境内ではみこし振りや、青森ねぶた、奉納芸能、盆踊りが行われ、外苑にはたくさんのキッチンカーが並ぶ。',
    type: 'article',
    locale: 'zh_CN',
  },
};

export default function DetailPage() {
  return (
    <WalkerPlusMatsuriTemplate
      data={pageData}
      regionKey="tokyo"
      activityKey="matsuri"
    />
  );
}

// Force rebuild - 2025-01-03