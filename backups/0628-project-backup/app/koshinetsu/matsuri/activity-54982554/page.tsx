import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750954982554
 * 生成时间: 2025/6/27 01:23:02
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: ぎおん柏崎まつり（ぎおんかしわざきまつり）
 * 2. 所在地: 〒945-0066　新潟県柏崎市
 * 3. 开催期间: 2025年7月24日～26日　 【24日】民謡街頭流し/18:00～19:30　　【25日】たる仁和賀パレード/18:00～20:15　　【26日】海の大花火大会/19:30～21:10（雨天決行、荒天時は延期）　※当日の朝9:00に市ホームページで発表
 * 4. 开催场所: 新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯
 * 5. 交通方式: ＪＲ信越本線「柏崎駅」から徒歩15分
 * 6. 主办方: ぎおん柏崎まつり協賛会
 * 7. 料金: 花火大会/有料観覧席あり　※2025年の申し込みは終了
 * 8. 联系方式: ぎおん柏崎まつり協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334
 * 9. 官方网站: https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/
 * 10. 谷歌地图: 37.369411,138.552954
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954982554",
  name: "ぎおん柏崎まつり（ぎおんかしわざきまつり）",
  address: "〒945-0066　新潟県柏崎市",
  datetime: "2025年7月24日～26日　 【24日】民謡街頭流し/18:00～19:30　　【25日】たる仁和賀パレード/18:00～20:15　　【26日】海の大花火大会/19:30～21:10（雨天決行、荒天時は延期）　※当日の朝9:00に市ホームページで発表",
  venue: "新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯",
  access: "ＪＲ信越本線「柏崎駅」から徒歩15分",
  organizer: "ぎおん柏崎まつり協賛会",
  price: "花火大会/有料観覧席あり　※2025年の申し込みは終了",
  contact: "ぎおん柏崎まつり協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334",
  website: "https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/",
  googleMap: "https://maps.google.com/maps?q=37.369411,138.552954&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "柏崎の夏を彩る一大イベント「ぎおん柏崎まつり」が、3日間にわたり開催されます。観客を巻き込んで踊りの輪を広げる「民謡街頭流し」や、勇ましく山車を繰り出す「たる仁和賀パレード」が東本町から西本町で行われるほか、越後三大花火の一つに数えられる「海の大花火大会」がみなとまち海浜公園にてフィナーレを飾ります。恒例の尺玉300連発をはじめ、三尺玉、海中空スターマイン、尺玉100発一斉打ちなど約1万6000発の花火が、世界に類を見ないワイドな打上幅で海中空に百花繚乱に咲き乱れ、その迫力と美しさは一見の価値があります。みなとまち海浜公園からの観覧がおすすめです。 ※打ち上げ数：1万6000発、昨年度1万6000発 観客数：21万人、昨年度17万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.city.kashiwazaki.lg.jp/material/images/group/27/sunset-starmine.jpg",
      title: "ぎおん柏崎まつり（ぎおんかしわざきまつり）图片1",
      alt: "ぎおん柏崎まつり（ぎおんかしわざきまつり）图片1",
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
  const regionKey = REGION_MAP["koshinetsu"] || 'tokyo';

  return (
    <div className="min-h-screen">
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;