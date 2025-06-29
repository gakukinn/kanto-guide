import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750949980422",
  "name": "Mito Yomon Matsuri Mito Kairakuen烟花节（Mito Yomon Matsuri Mito Karakuen hataka）",
  "address": "〒310-0851　茨城県水戸市千波町",
  "datetime": "2025年7月26日　 打ち上げ/19:30～20:30　※荒天時は翌日に順延",
  "venue": "水戸市　千波湖畔",
  "access": "从JR“水户站”步行15分钟，或从常磐自动车道“水户IC”开车约20分钟",
  "organizer": "水戸黄門まつり実行委員会",
  "price": "有收费观众席※详情请在网站确认",
  "contact": "水户市观光课029-232-9189、水户观光会议协会029-224-0441",
  "website": "https://mitokoumon.com/event/summer/mitokairakuenhanabi/",
  "googleMap": "https://maps.google.com/maps?q=36.371896,140.460808&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "kitakanto",
  "description": "为夏季水户夜空上色的“水户凯乐园烟火大会”，在千波湖畔举行。STARMINE、MUSIC STARMINE、尺玉、创作烟火等，内阁总理大臣奖最多获奖的野村烟火工业制作的约5000发烟火被施放，千波湖面被美丽地照亮。我们推荐您从千波湖北园路观赏。※发射数量：去年5000发观众数：去年23万人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://cdn.midjourney.com/5dc66e40-2206-41b9-9550-0dcbfd33e650/0_3.png",
      "title": "水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）图片1",
      "alt": "水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T14:59:40.460Z",
  "updatedAt": "2025-06-26T14:59:40.460Z",
  "detailLink": "/kitakanto/hanabi/activity--49980422",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "为夏季水户夜空上色的“水户凯乐园烟火大会”，在千波湖畔举行。STARMINE、MUSIC STARMINE、尺玉、创作烟火等，内阁总理大臣奖最多获奖的野村烟火工业制作的约5000发烟火被施放，千波湖面被美丽地照亮。我们推荐您从千波湖北园路观赏。※发射数量：去年5000发观众数：去年23万人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="kitakanto" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '水戸黄門まつり　水戸偕楽園花火大会（みとこうもんまつり　みとかいらくえんはなびたいかい） - 北关东花火大会',
    description: '夏の水戸の夜空を彩る「水戸偕楽園花火大会」が、千波湖畔で開催されます。スターマインやミュージックスターマイン、尺玉、創作花火など、内閣総理大臣賞最多受賞の野村花火工業プロデュースによる趣向を凝らした約...',
  };
}
