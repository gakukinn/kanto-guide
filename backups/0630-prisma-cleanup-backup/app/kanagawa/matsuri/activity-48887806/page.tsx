import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750948887806
 * 生成时间: 2025/6/26 23:41:27
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）
 * 2. 所在地: 〒253-0061　神奈川県茅ヶ崎市南湖
 * 3. 开催期间: 2025年7月21日　 4:30頃～9:00、式典7:00～7:45
 * 4. 开催场所: 神奈川県茅ヶ崎市　西浜海岸（サザンビーチ西側）
 * 5. 交通方式: ＪＲ東海道本線「茅ヶ崎駅」步行20分
 * 6. 主办方: 茅ヶ崎海岸浜降祭実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 茅ヶ崎海岸浜降祭実行委員会（寒川神社内）　0467-75-0004、茅ヶ崎海岸浜降祭保存会（茅ヶ崎商工会議所内）　0467-58-1111
 * 9. 官方网站: https://www.chigasaki-cci.or.jp/hamaori/
 * 10. 谷歌地图: 35.316378,139.396249
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750948887806",
  name: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）",
  address: "〒253-0061　神奈川県茅ヶ崎市南湖",
  datetime: "2025年7月21日　 4:30頃～9:00、式典7:00～7:45",
  venue: "神奈川県茅ヶ崎市　西浜海岸（サザンビーチ西側）",
  access: "ＪＲ東海道本線「茅ヶ崎駅」步行20分",
  organizer: "茅ヶ崎海岸浜降祭実行委員会",
  price: "",
  contact: "茅ヶ崎海岸浜降祭実行委員会（寒川神社内）　0467-75-0004、茅ヶ崎海岸浜降祭保存会（茅ヶ崎商工会議所内）　0467-58-1111",
  website: "https://www.chigasaki-cci.or.jp/hamaori/",
  googleMap: "https://maps.google.com/maps?q=35.316378,139.396249&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "在西滨海岸（南部海滩西侧）的海之日，会举办39座神轿横跨的“茅崎海岸滨降祭”。黎明时分，来自茅崎市和寒川镇的神庙的神道教神庙聚集在一起，“好吧，好吧!”的神道宗派神道教独特的口号也很响亮，在海滩上举行了一次净化仪式（Misogi）（净化）活动。它已被指定为香川县的非物质民间文化财产。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/archives/newsxml/2017/07/e58880151d2187be9be842c61236f32f.jpg",
      title: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）图片1",
      alt: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）图片1",
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