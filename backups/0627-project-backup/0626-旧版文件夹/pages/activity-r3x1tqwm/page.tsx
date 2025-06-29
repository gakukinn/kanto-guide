import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7ovold0008vl9cr3x1tqwm
 * 生成时间: 2025/6/24 23:32:27
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）
 * 2. 所在地: 〒253-0061　神奈川県茅ヶ崎市南湖
 * 3. 开催期间: 2025年7月21日　 4:30頃～9:00、式典7:00～7:45
 * 4. 开催场所: 神奈川県茅ヶ崎市　西浜海岸（サザンビーチ西側）
 * 5. 交通方式: ＪＲ東海道本線「茅ヶ崎駅」から徒歩20分
 * 6. 主办方: 茅ヶ崎海岸浜降祭実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 茅ヶ崎海岸浜降祭実行委員会（寒川神社内）　0467-75-0004、茅ヶ崎海岸浜降祭保存会（茅ヶ崎商工会議所内）　0467-58-1111
 * 9. 官方网站: https://www.chigasaki-cci.or.jp/hamaori/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.396249!3d35.316378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684747328!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ovold0008vl9cr3x1tqwm",
  name: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）",
    description: "",
  address: "〒253-0061　神奈川県茅ヶ崎市南湖",
  datetime: "2025年7月21日　 4:30頃～9:00、式典7:00～7:45",
  venue: "神奈川県茅ヶ崎市　西浜海岸（サザンビーチ西側）",
  access: "ＪＲ東海道本線「茅ヶ崎駅」から徒歩20分",
  organizer: "茅ヶ崎海岸浜降祭実行委員会",
  price: "",
  contact: "茅ヶ崎海岸浜降祭実行委員会（寒川神社内）　0467-75-0004、茅ヶ崎海岸浜降祭保存会（茅ヶ崎商工会議所内）　0467-58-1111",
  website: "https://www.chigasaki-cci.or.jp/hamaori/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.396249!3d35.316378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684747328!5m2!1sja!2sjp",
  region: "kanagawa",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanaloco.jp/archives/newsxml/2017/07/e58880151d2187be9be842c61236f32f.jpg",
      title: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）图片1",      alt: "茅ヶ崎海岸浜降祭（ちがさきかいがんはまおりさい）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;