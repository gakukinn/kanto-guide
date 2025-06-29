import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7ojtqu000kvlagzis2trci
 * 生成时间: 2025/6/24 23:31:33
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 野田みこしパレード（のだみこしパレード）
 * 2. 所在地: 〒278-0037　千葉県野田市野田339（実行委員会本部）
 * 3. 开催期间: 2025年8月9日　 16:00～21:30（子どもみこしパレード/16:00～17:00、大人みこしパレード/17:40～21:30）
 * 4. 开催场所: 千葉県野田市　野田市中央商店街周辺
 * 5. 交通方式: 東武野田線「愛宕駅」から徒歩5分、または東武野田線「野田市駅」から徒歩10分
 * 6. 主办方: 野田みこしパレード実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 野田みこしパレード実行委員会事務局　04-7122-3585
 * 9. 官方网站: https://www.nodacci.or.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.86315!3d35.944322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684626493!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ojtqu000kvlagzis2trci",
  name: "野田みこしパレード（のだみこしパレード）",
    description: "",
  address: "〒278-0037　千葉県野田市野田339（実行委員会本部）",
  datetime: "2025年8月9日　 16:00～21:30（子どもみこしパレード/16:00～17:00、大人みこしパレード/17:40～21:30）",
  venue: "千葉県野田市　野田市中央商店街周辺",
  access: "東武野田線「愛宕駅」から徒歩5分、または東武野田線「野田市駅」から徒歩10分",
  organizer: "野田みこしパレード実行委員会",
  price: "",
  contact: "野田みこしパレード実行委員会事務局　04-7122-3585",
  website: "https://www.nodacci.or.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.86315!3d35.944322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750684626493!5m2!1sja!2sjp",
  region: "chiba",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanko-nodacity.jp/wp-content/uploads/2023/08/IMG_8394.png",
      title: "野田みこしパレード（のだみこしパレード）图片1",      alt: "野田みこしパレード（のだみこしパレード）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;