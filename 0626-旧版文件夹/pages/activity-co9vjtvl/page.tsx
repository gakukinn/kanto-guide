import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc96fgb8000rvlr0co9vjtvl
 * 生成时间: 2025/6/25 00:07:57
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 南部の火祭り（なんぶのひまつり）
 * 2. 所在地: 〒409-2212　山梨県南部町南部地内
 * 3. 开催期间: 2025年8月15日　 20:10～
 * 4. 开催场所: 山梨県南部町　富士川河川敷南部橋上下流
 * 5. 交通方式: ＪＲ身延線「内船駅」から徒歩20分、または中部横断自動車道「富沢IC」から車約10分
 * 6. 主办方: 南部町火祭り実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 南部町火祭り実行委員会　0556-66-2111
 * 9. 官方网站: https://www.town.nanbu.yamanashi.jp/kankou/omatsuri/himatsuri/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.457869!3d35.285583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687955386!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96fgb8000rvlr0co9vjtvl",
  name: "南部の火祭り（なんぶのひまつり）",
    description: "",
  address: "〒409-2212　山梨県南部町南部地内",
  datetime: "2025年8月15日　 20:10～",
  venue: "山梨県南部町　富士川河川敷南部橋上下流",
  access: "ＪＲ身延線「内船駅」から徒歩20分、または中部横断自動車道「富沢IC」から車約10分",
  organizer: "南部町火祭り実行委員会",
  price: "有料観覧席なし",
  contact: "南部町火祭り実行委員会　0556-66-2111",
  website: "https://www.town.nanbu.yamanashi.jp/kankou/omatsuri/himatsuri/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.457869!3d35.285583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687955386!5m2!1sja!2sjp",
  region: "koshinetsu",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://image.gallery.play.jp/ybs-news/articles/c9aa0fdd21f44f6fbf2bb1f77954666f/7abe2063-6c47-468d-bf27-a41d503652b3.jpg?w=1200",
      title: "南部の火祭り（なんぶのひまつり）图片1",      alt: "南部の火祭り（なんぶのひまつり）图片1",
      caption: ""
    },
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/%E5%8D%97%E9%83%A8%E3%81%AE%E7%81%AB%E7%A5%AD%E3%82%8A_%E8%88%B9%E7%81%AF%E7%B1%A0_-_Panoramio_57392817.jpg/1200px-%E5%8D%97%E9%83%A8%E3%81%AE%E7%81%AB%E7%A5%AD%E3%82%8A_%E8%88%B9%E7%81%AF%E7%B1%A0_-_Panoramio_57392817.jpg",
      title: "南部の火祭り（なんぶのひまつり）图片2",      alt: "南部の火祭り（なんぶのひまつり）图片2",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;