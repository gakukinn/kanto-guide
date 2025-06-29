import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750953460408
 * 生成时间: 2025/6/27 00:57:40
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 尾島ねぷた祭典（おじまねぷた祭典）
 * 2. 所在地: 〒370-0401　群馬県太田市尾島町
 * 3. 开催期间: 2025年8月14日～15日　 17:00～22:00
 * 4. 开催场所: 群馬県太田市　尾島商店街大通り（県道142号）
 * 5. 交通方式: 東武伊勢崎線「木崎駅」からシャトル巴士約5分、或北関東自動車道「伊勢崎IC」から車約30分、或関越自動車道「花園IC」から車約45分、或東北自動車道「館林IC」から車約50分
 * 6. 主办方: 尾島ねぷた祭典実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 太田市観光交流課　0276-47-1833
 * 9. 官方网站: https://www.city.ota.gunma.jp/
 * 10. 谷歌地图: 36.2588,139.320655
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750953460408",
  name: "尾島ねぷた祭典（おじまねぷた祭典）",
  address: "〒370-0401　群馬県太田市尾島町",
  datetime: "2025年8月14日～15日　 17:00～22:00",
  venue: "群馬県太田市　尾島商店街大通り（県道142号）",
  access: "東武伊勢崎線「木崎駅」からシャトル巴士約5分、或北関東自動車道「伊勢崎IC」から車約30分、或関越自動車道「花園IC」から車約45分、或東北自動車道「館林IC」から車約50分",
  organizer: "尾島ねぷた祭典実行委員会",
  price: "",
  contact: "太田市観光交流課　0276-47-1833",
  website: "https://www.city.ota.gunma.jp/",
  googleMap: "https://maps.google.com/maps?q=36.2588,139.320655&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "在“尾岛Neputa祭”中，高达7米的扇Neputa和Neputa太鼓的运行以其壮而闻名。“弘前Neputa”之所以出现在尾岛的祭祀活动中，是因为江户时代津轻藩的飞地位于太田市（现大馆町等）。伴随着“Yayadoo”的口号，大约十台neputa和10尺大鼓在会场游行。其中，在节日结束时举行的Neputa Daiko和Matsuri Hayashi的联合表演是最值得注意的。广崎市的特产也被出售，作为筑谷物产市场，吸引了很多人。※由木崎站运行临时巴士",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://j-matsuri.com/wp-content/uploads/2020/09/ojimaneputamatsuri-2-1024x768.jpg",
      title: "尾島ねぷた祭典（おじまねぷた祭典）图片1",
      alt: "尾島ねぷた祭典（おじまねぷた祭典）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

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