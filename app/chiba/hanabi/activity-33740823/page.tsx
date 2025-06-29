import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态花火会详情页面
 * 数据库ID: recognition-hanabi-1751175497503
 * 生成时间: 2025/6/29 14:38:17
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）
 * 2. 所在地: 〒293-0021　千葉県富津市富津
 * 3. 开催期间: 2025年7月26日　 19:15～20:15　※小雨決行、荒天時中止
 * 4. 开催场所: 千葉県富津市　富津海水浴場
 * 5. 交通方式: ＪＲ内房線「青堀駅」からバス約15分「富津公園前」～徒歩10分、または館山自動車道「木更津南IC」から富津岬方面へ車約25分
 * 6. 主办方: 富津市民花火大会実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 富津市民花火大会実行委員会事務局　0439-80-1291　（平日9:00～17:00）　info@futtsu-hanabi.com
 * 9. 官方网站: https://futtsu-hanabi.com
 * 10. 谷歌地图: 35.310184,139.797359
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-hanabi-1751175497503",
  name: "東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）",
  address: "〒293-0021　千葉県富津市富津",
  datetime: "2025年7月26日　 19:15～20:15　※小雨決行、荒天時中止",
  venue: "千葉県富津市　富津海水浴場",
  access: "ＪＲ内房線「青堀駅」からバス約15分「富津公園前」～徒歩10分、または館山自動車道「木更津南IC」から富津岬方面へ車約25分",
  organizer: "富津市民花火大会実行委員会",
  price: "有料観覧席なし",
  contact: "富津市民花火大会実行委員会事務局　0439-80-1291　（平日9:00～17:00）　info@futtsu-hanabi.com",
  website: "https://futtsu-hanabi.com",
  googleMap: "https://maps.google.com/maps?q=35.310184,139.797359&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "東京湾をバックに、市民による手作りの「富津市民花火大会」が開催されます。10回目を迎える2025年は、東京湾口道路建設促進を目標とした花火大会となります。例年好評の水中花火や尺玉など約5000発が打ち上げられるほか、レーザー演出や水上2尺玉も加わって、より一層、富津の夜空が華やかに彩られます。富津海水浴場の砂浜に観覧席が設けられ、涼しい潮風にあたりながら、目前で開く大輪の花火の迫力をゆっくりと堪能できます。 ※青堀駅から有料臨時バス運行 打ち上げ数：5000発、昨年度2500発 観客数：5万人、昨年度3万5000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.city.futtsu.lg.jp/cmsfiles/contents/0000007/7541/bgdiscont2025.png",
      title: "東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）图片1",
      alt: "東京湾口道路建設促進　第10回富津市民花火大会（ふっつしみんはなびたいかい）图片1",
      caption: ""
    }
  ]
};

  // 确定地区键 - 使用标准化的地区映射
  const REGION_MAP = {
    'tokyo': 'tokyo',
    'saitama': 'saitama', 
    'chiba': 'chiba',
    'kanagawa': 'kanagawa',
    'kitakanto': 'kitakanto',
    'koshinetsu': 'koshinetsu',
    '東京都': 'tokyo',
    '東京': 'tokyo',
    '埼玉県': 'saitama',
    '埼玉': 'saitama',
    '千葉県': 'chiba',
    '千葉': 'chiba',
    '神奈川県': 'kanagawa',
    '神奈川': 'kanagawa',
    '茨城県': 'kitakanto',
    '栃木県': 'kitakanto',
    '群馬県': 'kitakanto',
    '新潟県': 'koshinetsu',
    '長野県': 'koshinetsu',
    '山梨県': 'koshinetsu'
  };
  const regionKey = REGION_MAP["chiba"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="hanabi"
      />
    </div>
  );
};

export default DetailPage;