import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750934547763",
  "name": "真冈七夕祭子供神輿祭（真冈夏日祭）",
  "address": "〒321-4305　栃木県真岡市",
  "datetime": "2025年7月25日～27日　 花火大会/26日19:30～21:00　※恶劣天气时28日に順延",
  "venue": "栃木県真岡市　真岡市内中心部、真岡市役所周辺",
  "access": "从莫冈铁路“莫冈站”步行15分钟，从JR东北线“石桥站”乘关东汽车巴士前往莫冈办事处，约40分钟，从“莫冈市政厅前”步行3分钟，或从北关东高速公路“莫冈IC”乘车约10分钟。",
  "organizer": "荒神祭祭典本部・荒神祭町会連合会",
  "price": "详见官网",
  "contact": "真岡市商工観光課　0285-83-8135",
  "website": "https://mokahanabi.com/",
  "googleMap": "https://maps.google.com/maps?q=36.440856,140.012631&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kitakanto",
  "description": "活动为期三天。首日从神宫出发进行市内神轿巡游拉开序幕，第二日市中心将设为步行者天国举办“祭典广场”，有大型荒宫神轿、儿童神轿、各地区神轿、手工制作神轿和花车巡游，现场还有乐队演奏增添节日氛围。夜间在五行川举行烟花大会，配合音乐和激光表演，绚丽且震撼，预计燃放约两万发烟花。最后一天举办传统的宫灯奉献、勇壮的神轿入宫仪式及花车巡游，热闹非凡，吸引约十七万人前来观赏。",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://www.city.moka.lg.jp/material/images/group/19/moka-no-natumaturi-dasiyatai-buttuke-1.jpg",
      "title": "真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）图片1",
      "alt": "真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T10:42:27.777Z",
  "updatedAt": "2025-06-26T10:42:27.777Z",
  "detailLink": "/kitakanto/hanabi/activity--34547763",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "以神轿与屋台的市内渡御，以及壮的神轿的川渡御为看点的“真冈之夏祭荒神祭”持续3天举行。从第一天的神轿的宫出到町会渡御开始，第二天市中心成为步行者天国，举行“祭典广场”。主要的Aramiya 神輿、儿童神輿、每个地区的神輿、初中生手工制作的神輿和花车摊位都出现了，许多音乐家为节日增添了光彩。在夜晚的花火大会上，神轿在五行川“川渡御”中，最多4号玉和星光等约2万发发，以音乐和激光光线的华丽而有震撼力的演出，吸引观众的目光。在最后一天，将有充满传统的宫殿奉献灯和英勇的宫殿入口，以及花车摊位上的音乐和撞击。* 发射次数：20，000次观众人数：170，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kitakanto" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '真岡の夏祭典　荒神祭（もおかのなつ祭典　こうじんさい） - 北关东花火大会',
    description: '神輿や屋台の市内渡御や、勇壮な神輿の川渡御が見どころの「真岡の夏祭典 荒神祭」が3日間にわたり開催举行。初日の神輿の宮出しから町会渡御に始まり、2日目は市内中心部が歩行者天国となり“お祭り広場”...',
  };
}
