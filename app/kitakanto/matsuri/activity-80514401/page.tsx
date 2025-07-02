import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751380514401
 * 生成时间: 2025/7/1 23:35:14
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 水戸黄門まつり（みとこうもんまつり）
 * 2. 所在地: 〒310-0021　茨城県水戸市南町
 * 3. 开催期间: 2025年8月2日～3日　 【2日】11:00～21:00　　【3日】11:00～20:00
 * 4. 开催场所: 水戸市　水戸市南町周辺（国道50号）
 * 5. 交通方式: ＪＲ「水戸駅」から徒歩10分
 * 6. 主办方: 水戸黄門まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 一般社団法人水戸観光コンベンション協会　029-224-0441、水戸市観光課　029-232-9189
 * 9. 官方网站: https://mitokoumon.com/koumon/
 * 10. 谷歌地图: 36.377547,140.466846
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751380514401",
  name: "水戸黄門祭（みとこうもんまつり）",
  address: "〒310-0021　茨城県水戸市南町",
  datetime: "2025年8月2日～3日　 【2日】11:00～21:00　　【3日】11:00～20:00",
  venue: "水戸市　水戸市南町周辺（国道50号）",
  access: "ＪＲ「水戸駅」から徒歩10分",
  organizer: "水戸黄門まつり実行委員会",
  price: "",
  contact: "一般社団法人水戸観光コンベンション協会　029-224-0441、水戸市観光課　029-232-9189",
  website: "https://mitokoumon.com/koumon/",
  googleMap: "https://maps.google.com/maps?q=36.377547,140.466846&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "始于昭和36年（1961年）的水户市夏季盛大活动“水户黄门祭”即将举行。活动包括“烟火大会”、众多神轿竞相巡游的“神轿联合渡御”、配合黄门早调等音乐展示舞蹈的“水户黄门嘉年华”、“山车巡游”、“水户黄门灯笼游行”等多种活动精彩上演。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://ibaraki-kenou-iju.jp/media/2023/02/230211_ph1_%E3%83%88%E3%83%AA%E3%83%9F%E3%83%B3%E3%82%B0%E5%89%8D-1536x1024.jpg",
      title: "水戸黄門まつり（みとこうもんまつり）图片1",
      alt: "水戸黄門まつり（みとこうもんまつり）图片1",
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