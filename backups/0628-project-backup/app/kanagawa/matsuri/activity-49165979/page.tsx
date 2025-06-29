import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750949165979
 * 生成时间: 2025/6/26 23:46:05
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）
 * 2. 所在地: 〒251-0021　神奈川県藤沢市鵠沼神明2-11-5
 * 3. 开催期间: 2025年8月17日
 * 4. 开催场所: 神奈川県藤沢市　鵠沼皇大神宮
 * 5. 交通方式: ＪＲ東海道本線「藤沢駅」から徒歩15分もしくは「高山車庫行」の神奈中バス「烏森公園前」すぐ
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 鵠沼皇大神宮　0466-24-5590
 * 9. 官方网站: https://www.koudaijinguu.com/
 * 10. 谷歌地图: 35.341571,139.472899
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750949165979",
  name: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）",
  address: "〒251-0021　神奈川県藤沢市鵠沼神明2-11-5",
  datetime: "2025年8月17日",
  venue: "神奈川県藤沢市　鵠沼皇大神宮",
  access: "ＪＲ東海道本線「藤沢駅」から徒歩15分もしくは「高山車庫行」の神奈中バス「烏森公園前」すぐ",
  organizer: "",
  price: "",
  contact: "鵠沼皇大神宮　0466-24-5590",
  website: "https://www.koudaijinguu.com/",
  googleMap: "https://maps.google.com/maps?q=35.341571,139.472899&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "烏森神社の名称で親しまれる鵠沼皇大神宮で、毎年8月17日に、100年以上前につくられた9台の人形山車と湯立神楽の祭りが行われます。山車は3層式になっており、下段は破風屋根（はふやね）で精巧な彫刻が施され、前面は囃子の座で大太鼓や笛、鉦が座ります。2層、3層にめぐらした豪華な幕は頂上の人形の物語を描いたもので、山車が神社に集まる様は壮観です。人形山車は市の有形民俗文化財に、湯立神楽は市の無形民俗文化財に指定されています。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.townnews.co.jp/0601/images/a001237418_04.jpg",
      title: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）图片1",
      alt: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）图片1",
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
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

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