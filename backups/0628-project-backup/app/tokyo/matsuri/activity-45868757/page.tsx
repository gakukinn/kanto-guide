import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750945868757
 * 生成时间: 2025/6/26 22:51:08
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 羽田神社夏季例大祭「羽田まつり」（はねだじんじゃかきれいたいさい　はねだまつり）
 * 2. 所在地: 〒144-0044　東京都大田区本羽田3-9-12
 * 3. 开催期间: 2025年7月26日～27日　 【26日】例大祭/9:00、各町会神輿渡御/夕方～　　【27日】本社神輿・鳳輦羽田全町渡御/宮出し7:30・宮入り12:00過ぎ、町内神輿連合渡御/15:00～18:00
 * 4. 开催场所: 東京都　羽田神社とその周辺
 * 5. 交通方式: 京浜急行「大鳥居駅」西口から徒歩10分
 * 6. 主办方: 羽田神社
 * 7. 料金: 未设置
 * 8. 联系方式: 羽田神社　03-3741-0023
 * 9. 官方网站: https://www.hanedajinja.com/
 * 10. 谷歌地图: 35.547009,139.740461
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750945868757",
  name: "羽田神社夏季例大祭「羽田まつり」（はねだじんじゃかきれいたいさい　はねだまつり）",
  address: "〒144-0044　東京都大田区本羽田3-9-12",
  datetime: "2025年7月26日～27日　 【26日】例大祭/9:00、各町会神輿渡御/夕方～　　【27日】本社神輿・鳳輦羽田全町渡御/宮出し7:30・宮入り12:00過ぎ、町内神輿連合渡御/15:00～18:00",
  venue: "東京都　羽田神社とその周辺",
  access: "京浜急行「大鳥居駅」西口から徒歩10分",
  organizer: "羽田神社",
  price: "",
  contact: "羽田神社　03-3741-0023",
  website: "https://www.hanedajinja.com/",
  googleMap: "https://maps.google.com/maps?q=35.547009,139.740461&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "「羽田まつり」は神輿の担ぎ手だけで3000人、見物客は3万人が訪れる大変賑やかなお祭りです。神輿は、波に揺れる船を模した通称「ヨコタ」と呼ばれる勇壮な担ぎ方で、昔は漁師町として栄えた羽田独特のものです。日曜午後の町内神輿連合渡御（神輿パレード）では、14町会14基の神輿がヨコタで練り歩きます。氏子にあたる羽田空港からは、全日空と日本航空の客室乗務員らを迎え、パレードに華を添えます。2025年は「昭和百年」を記念し、6年ぶりとなる鳳輦巡行（出発7:30）もあわせて行われます。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://haneda-st.com/wp-content/uploads/2023/07/IMG_1404.jpeg",
      title: "羽田神社夏季例大祭「羽田まつり」（はねだじんじゃかきれいたいさい　はねだまつり）图片1",
      alt: "羽田神社夏季例大祭「羽田まつり」（はねだじんじゃかきれいたいさい　はねだまつり）图片1",
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
  const regionKey = REGION_MAP["tokyo"] || 'tokyo';

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