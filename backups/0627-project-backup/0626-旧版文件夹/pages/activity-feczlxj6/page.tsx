import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc964iba0005vlr0feczlxj6
 * 生成时间: 2025/6/24 23:49:03
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）
 * 2. 所在地: 〒315-0116　茨城県石岡市柿岡
 * 3. 开催期间: 2025年7月26日～27日　 【26日】17:00～19:30　　【27日】12:00～21:00
 * 4. 开催场所: 茨城県石岡市　柿岡地区
 * 5. 交通方式: ＪＲ常磐線「石岡駅」から関東鉄道バス約30分「下宿坂下」下車
 * 6. 主办方: 柿岡まつり振興協議会
 * 7. 料金: 未设置
 * 8. 联系方式: 石岡市産業戦略部商工観光課　0299-23-1111
 * 9. 官方网站: https://www.city.ishioka.lg.jp/ishiokameguri/omatsuri/page001096.html
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.193511!3d36.242444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687475447!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc964iba0005vlr0feczlxj6",
  name: "柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）",
    description: "",
  address: "〒315-0116　茨城県石岡市柿岡",
  datetime: "2025年7月26日～27日　 【26日】17:00～19:30　　【27日】12:00～21:00",
  venue: "茨城県石岡市　柿岡地区",
  access: "ＪＲ常磐線「石岡駅」から関東鉄道バス約30分「下宿坂下」下車",
  organizer: "柿岡まつり振興協議会",
  price: "",
  contact: "石岡市産業戦略部商工観光課　0299-23-1111",
  website: "https://www.city.ishioka.lg.jp/ishiokameguri/omatsuri/page001096.html",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.193511!3d36.242444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687475447!5m2!1sja!2sjp",
  region: "kitakanto",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://pbs.twimg.com/media/GRse1HAbMAIBvr7?format=jpg&name=large",
      title: "柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）图片1",      alt: "柿岡のおまつり（八坂神社　祇園祭礼）（かきおかのおまつり　やさかじんじゃ　ぎおんさいれい）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;