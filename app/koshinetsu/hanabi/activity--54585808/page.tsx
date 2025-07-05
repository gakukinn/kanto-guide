import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750954585808",
  "name": "市川三乡町故乡夏日祭“神明的花火大会”",
  "address": "〒409-3606　山梨県市川三郷町高田682",
  "datetime": "2025年8月7日　 19:15～21:00　※雨天決行、恶劣天气时8日或9日に順延",
  "venue": "山梨县市川三乡町 三郡桥下笛吹川河畔",
  "access": "从JR身延线“市川大门站”步行10分钟，或者从中央自动车道“甲府南IC”开车约20分钟，或者从中部横断自动车道“增穗IC”开车约5分钟。",
  "organizer": "市川三郷町ふるさと夏祭典実行委員会",
  "price": "有收费观赏席/动态VIP席10万日元，动态翻新席2万日元，普通席4000日元~其他",
  "contact": "市川三乡町故乡夏祭实行委员会 055-272-1101",
  "website": "http://www.town.ichikawamisato.yamanashi.jp/shinmei/",
  "googleMap": "https://maps.google.com/maps?q=35.561077,138.483284&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "koshinetsu",
  "description": "在武田信玄活跃的时代，被认为是作为战争的狼烟而开始的市川烟花，在江户时代被认为是日本三大烟花之一，是在为市川和纸的兴盛做出贡献的造纸工“甚左卫门”的忌日7月20日举行。平成元年（1989年），作为山梨县最大规模的火灾大会复活，现在每年8月7日（火灾之日）举办。2025年的主题是“光的轨迹--旋转的思想，连接的未来--”，伴随着音乐，长玉、超大的星光、主题火、讯息烟花等将明亮夜空，将迎接一个盛大的结局。它的特点是具有故事性的节目构成，每年有18万多人来参观，非常热闹。*发射次数：20000次，去年20000次观众：180000次，去年180000次",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image" as const,
      "url": "https://cdn.midjourney.com/61292bc9-9d0d-4566-b563-36e2fef95be7/0_0.png",
      "title": "市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）图片1",
      "alt": "市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T16:16:25.835Z",
  "updatedAt": "2025-06-26T16:16:25.835Z",
  "detailLink": "/koshinetsu/hanabi/activity--54585808",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "在武田信玄活跃的时代，被认为是作为战争的狼烟而开始的市川烟花，在江户时代被认为是日本三大烟花之一，是在为市川和纸的兴盛做出贡献的纸工“甚左卫门”的忌日7月20日举行。平成元年（1989年），作为山梨县最大规模的花火大会复活，现在每年8月7日（烟火之日）举办。2025年的主题是“光的轨迹--旋转的思想，连接的未来--”，伴随着音乐，长玉、超大的星光、主题火、讯息烟花等将照亮夜空，将迎来一个盛大的结局。它的特点是具有故事性的节目构成，每年有18万多人前来参观，非常热闹。* 发射次数：20，000次，去年20，000次观众：180，000次，去年180，000次",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="koshinetsu" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '市川三郷町ふるさと夏祭典　「神明の花火大会」（いちかわみさとちょうふるさとなつ祭典　しんめいのはなびたいかい） - 甲信越花火大会',
    description: '武田信玄が活躍した時代、戦いの狼煙として使われていたことがはじまりとされる市川花火は、江戸時代には日本三大花火のひとつに数えられ、市川和紙の興隆に貢献した紙工「甚左衛門」の命日7月20日に行われていま...',
  };
}
