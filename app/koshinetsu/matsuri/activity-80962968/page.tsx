import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1751380962968
 * 生成时间: 2025/7/1 23:42:42
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 津南まつり（つなんまつり）
 * 2. 所在地: 〒949-8201　新潟県津南町下船渡戊585
 * 3. 开催期间: 2025年7月26日　 終日
 * 4. 开催场所: 新潟県津南町　津南町役場駐車場
 * 5. 交通方式: ＪＲ飯山線「津南駅」から鹿渡新田線の南越後観光バス約5分「津南役場前」下車
 * 6. 主办方: 津南まつり実行委員会
 * 7. 料金: 花火/有料観覧席なし
 * 8. 联系方式: 津南町観光協会　025-765-5585
 * 9. 官方网站: https://tsunan.info/
 * 10. 谷歌地图: 37.014488,138.652975
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1751380962968",
  name: "津南祭（つなんまつり）",
  address: "〒949-8201　新潟県津南町下船渡戊585",
  datetime: "2025年7月26日　 終日",
  venue: "新潟県津南町　津南町役場駐車場",
  access: "ＪＲ飯山線「津南駅」から鹿渡新田線の南越後観光バス約5分「津南役場前」下車",
  organizer: "津南まつり実行委員会",
  price: "花火/有料観覧席なし",
  contact: "津南町観光協会　025-765-5585",
  website: "https://tsunan.info/",
  googleMap: "https://maps.google.com/maps?q=37.014488,138.652975&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "在以盛产品牌米“鱼沼产越光米”闻名的津南町，将举办“津南祭”。活动会场设在津南町役场停车场，除有町民参与的民舞游行和祭典巡游外，还将举办攀岩体验、集市、全町马拉松等活动，并设有露天摊位，夜间还将燃放烟火。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://tsunan.info/wp-content/uploads/2024/07/109329.jpg",
      title: "津南まつり（つなんまつり）图片1",
      alt: "津南まつり（つなんまつり）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;