import WalkerPlusHanabiTemplate from '@/components/WalkerPlusHanabiTemplate';

const activityData = {
  "id": "recognition-hanabi-1750933740823",
  "name": "东京湾口道路建设促进第10届富津市民烟花大会（富津市民烟花大会）",
  "address": "〒293-0021　千葉県富津市富津",
  "datetime": "2025年7月26日　 19:15～20:15　※小雨決行、荒天時中止",
  "venue": "千葉県富津市　富津海水浴場",
  "access": "从JR内房线“青堀站”乘公共汽车约15分钟，从“富津公园前”步行10分钟，或从Tateyama高速公路“木更津南IC”乘公共汽车约25分钟到富津岬方向",
  "organizer": "富津市民花火大会実行委員会",
  "price": "没有收费座位。",
  "contact": "富津市民烟花节执行委员会办公室0439-80-1291 （工作日9：00~17：00）info@futtsu-hanabi.com",
  "website": "https://futtsu-hanabi.com",
  "googleMap": "https://maps.google.com/maps?q=35.310184,139.797359&t=&z=15&ie=UTF8&iwloc=&output=embed",
  "region": "chiba",
  "description": "以东京湾为背景，将举行由市民手工制作的“富津市民烟花大会”。2025年将迎来第10届，将是以促进东京湾口道路建设为目标的烟花大会。除了每年都有好评的水中烟火和尺玉等约5000发外，还加上激光演出和水上2尺玉，使富津的夜空更加华丽。在富津海水浴场的沙滩上设置了观众席，可以一边面对凉爽的海风，一边慢慢地享受眼前展开的大烟花的震撼力。※从青堀站开始付费临时巴士运行数：5000发，去年2500发观众数：50，000人，去年35，000人",
  "activityType": "hanabi",
  "themeColor": "red",
  "status": "scheduled",
  "media": [
    {
      "type": "image",
      "url": "https://www.city.futtsu.lg.jp/cmsfiles/contents/0000007/7541/bgdiscont2025.png",
      "title": "東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）图片1",
      "alt": "東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）图片1",
      "caption": ""
    }
  ],
  "createdAt": "2025-06-26T10:29:00.833Z",
  "updatedAt": "2025-06-26T10:29:00.833Z",
  "detailLink": "/chiba/hanabi/activity-event-10-33740823",
  "fireworksCount": "详见官网",
  "fireworksTime": "详见官网",
  "expectedVisitors": "详见官网",
  "weatherInfo": "详见官网",
  "parking": "详见官网",
  "foodStalls": "详见官网",
  "notes": "以东京湾为背景，将举行由市民手工制作的“富津市民烟花大会”。2025年将迎来第10届，将是以促进东京湾口道路建设为目标的烟花大会。除了每年都有好评的水中烟火和尺玉等约5000发外，还加上激光演出和水上2尺玉，使富津的夜空更加华丽。在富津海水浴场的沙滩上设置了观众席，可以一边面对凉爽的海风，一边慢慢地享受眼前展开的大烟花的震撼力。※从青堀站开始付费临时巴士运行数：5000发，去年2500发观众数：50，000人，去年35，000人",
  "date": "详见官网",
  "time": "详见官网"
};

export default function DetailPage() {
  return <WalkerPlusHanabiTemplate data={activityData} regionKey="chiba" activityKey="hanabi" />;
}

export async function generateMetadata() {
  return {
    title: '東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい） - 千叶花火大会',
    description: '東京湾をバックに、市民による手作りの「富津市民花火大会」が開催されます。10回目を迎える2025年は、東京湾口道路建設促進を目標とした花火大会となります。例年好評の水中花火や尺玉など約5000発が打ち...',
  };
}
