import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750948020538
 * 生成时间: 2025/6/26 23:27:00
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 野田みこしパレード（のだみこしパレード）
 * 2. 所在地: 〒278-0037　千葉県野田市野田339（実行委員会本部）
 * 3. 开催期间: 2025年8月9日　 16:00～21:30（子どもみこしパレード/16:00～17:00、大人みこしパレード/17:40～21:30）
 * 4. 开催场所: 千葉県野田市　野田市中央商店街周辺
 * 5. 交通方式: 東武野田線「愛宕駅」から徒歩5分、または東武野田線「野田市駅」から徒歩10分
 * 6. 主办方: 野田みこしパレード実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 野田みこしパレード実行委員会事務局　04-7122-3585
 * 9. 官方网站: https://www.nodacci.or.jp/
 * 10. 谷歌地图: 35.944322,139.86315
 * 11. 地区: chiba
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750948020538",
  name: "野田みこしパレード（のだみこしパレード）",
  address: "〒278-0037　千葉県野田市野田339（実行委員会本部）",
  datetime: "2025年8月9日　 16:00～21:30（子どもみこしパレード/16:00～17:00、大人みこしパレード/17:40～21:30）",
  venue: "千葉県野田市　野田市中央商店街周辺",
  access: "東武野田線「愛宕駅」から徒歩5分、または東武野田線「野田市駅」から徒歩10分",
  organizer: "野田みこしパレード実行委員会",
  price: "",
  contact: "野田みこしパレード実行委員会事務局　04-7122-3585",
  website: "https://www.nodacci.or.jp/",
  googleMap: "https://maps.google.com/maps?q=35.944322,139.86315&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "chiba",
  description: "平成2年（1990年）に、市制40周年を記念して始められた「野田みこしパレード」が開催されます。市内各地域から雨蛙、黒獅子、金獅子などの変わったみこしも含め、全9基のみこしが参加し、威勢の良い掛け声とともに一斉に担ぎ上げ、本町通りを練り歩きます。パレードのフィナーレでは、本部前をみこしがすれ違う様子は圧巻で、みこし同士が接触しないよう操作する担ぎ手たちのテクニックが見どころとなっています。パレードのコース中、3か所でお囃子の演奏が行われるほか、コース内に飲食などのブースも設けられます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanko-nodacity.jp/wp-content/uploads/2023/08/IMG_8394.png",
      title: "野田みこしパレード（のだみこしパレード）图片1",
      alt: "野田みこしパレード（のだみこしパレード）图片1",
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
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;