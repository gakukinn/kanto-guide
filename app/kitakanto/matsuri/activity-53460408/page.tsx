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
 * 5. 交通方式: 東武伊勢崎線「木崎駅」からシャトル巴士約5分、或北関東自動車道「伊勢崎IC」驾车约30分、或関越自動車道「花園IC」驾车约45分、或東北自動車道「館林IC」驾车约50分
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
  name: "尾岛睡魔灯笼祭（おじまねぷた祭典）",
  address: "〒370-0401　群馬県太田市尾島町",
  datetime: "2025年8月14日～15日　 17:00～22:00",
  venue: "群馬県太田市　尾島商店街大通り（県道142号）",
  access: "东武伊势崎线“木崎站”乘坐接驳巴士约5分钟，或从北关东自动车道“伊势崎IC”驾车约30分钟，或从关越自动车道“花园IC”驾车约45分钟，或从东北自动车道“馆林IC”驾车约50分钟。",
  organizer: "尾島ねぷた祭典実行委員会",
  price: "",
  contact: "太田市観光交流課　0276-47-1833",
  website: "https://www.city.ota.gunma.jp/",
  googleMap: "https://maps.google.com/maps?q=36.2588,139.320655&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "在“尾岛睡魔灯笼祭”中，高达7米的扇形睡魔灯笼和睡魔太鼓的巡游，以其雄壮的规模而闻名。“弘前睡魔祭”之所以出现在尾岛的祭典中，是因为在江户时代，津轻藩在现今太田市（大馆町等地）设有飞地。伴随着“祭典吆喝（Yayado）”的号子，大约十座睡魔灯笼和巨大的十尺太鼓在会场内巡游。其中，祭典尾声时举行的睡魔太鼓与祭典音乐的联合演出尤为精彩，令人印象深刻。会场还设有弘前市特产销售摊位，作为“津轻物产市场”吸引众多游客前来选购。※活动期间从木崎站有临时接驳巴士运行。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://tripre.jp/wp-content/uploads/2024/06/%E2%91%A3%E5%B0%BE%E5%B3%B6%E3%81%AD%E3%81%B7%E3%81%9F%E3%81%BE%E3%81%A4%E3%82%8A-scaled-e1718340781271.jpg",
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