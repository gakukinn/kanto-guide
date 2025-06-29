import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750946179969",
  "name": "户田桥烟火大会Sky Fantasia（东田桥烟火大会）",
  "address": "〒335-0024　埼玉県戸田市",
  "datetime": "2025年8月2日　 19:00～20:30　※雨天中止（順延なし）",
  "venue": "埼玉県戸田市　国道17号戸田橋上流荒川河川敷",
  "access": "从JR埼京线“户田公园站”步行20分钟（东侧会场）或40分钟~50分钟（西侧会场）※视拥挤情况而定",
  "organizer": "戸田橋花火大会実行委員会",
  "price": "有收费观赏席（会场内全部收费）",
  "contact": "戸田橋花火大会実行委員会事務局　048-431-0206",
  "website": "https://www.todabashi-hanabi.jp/",
  "googleMap": "https://maps.google.com/maps?q=35.800781,139.674973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "saitama",
  "description": "为荒川夜空上颜色的“户田桥烟花大会Sky Fantasia”今年也将举行。与对岸的“鸟烟大会”合起来，将会发出星光、音乐烟火、尺玉等首都圈最大规模的约1万5000发烟火。有两个只有在这里才能看到的比赛的联合节目，如令人震惊的同步演出。东西地区也有不同的享受方式，东侧也有可以在眼前观赏烟火的新座位种类登场。在这里，您可以享受最好的烟花体验。※发射数量：1万5000发，去年1万5000发（※全部与烟火大会议）观众数：去年45万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://hanabi-navi.info/wp-content/uploads/2025/05/30339796_m-e1746797273379.jpg",
      "title": "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
      "alt": "戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T13:56:19.981Z",
  "updatedAt": "2025-06-26T13:56:19.981Z",
  "detailLink": "/saitama/hanabi/activity-sky-fantasia-46179969",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "为荒川夜空上色的“户田桥烟火大会Sky Fantasia”今年也将举行。与对岸的“鸟鸟烟火大会”合起来，将会发放星光、音乐烟火、尺玉等首都圈最大规模的约1万5000发烟火。有两个只有在这里才能看到的比赛的联合节目，如令人震撼的同步演出。东西地区也有不同的享受方式，东侧也有可以在眼前观赏烟火的新座位种类登场。在这里，您可以享受最好的烟火体验。※发射数量：1万5000发，去年1万5000发（※全部与烟火大会合计）观众数：去年45万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="saitama" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '戸田橋花火大会　Sky Fantasia（とだばしはなびたいかい　スカイファンタシア） - 埼玉花火大会',
    description: '荒川の夜空を彩る「戸田橋花火大会 Sky Fantasia」が、今年も開催されます。対岸の「いたばし花火大会」とあわせて、スターマイン、音楽花火、尺玉など、首都圏最大級の約1万5000発が打ち上げられ...',
  };
}
