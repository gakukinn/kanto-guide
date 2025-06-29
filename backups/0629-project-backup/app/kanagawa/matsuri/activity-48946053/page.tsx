import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750948946053
 * 生成时间: 2025/6/26 23:42:26
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第49回神奈川大和阿波おどり（かながわやまとあわおどり）
 * 2. 所在地: 〒242-0016　神奈川県大和市大和南一丁目
 * 3. 开催期间: 2025年7月26日～27日　 両日とも/17:00～20:20
 * 4. 开催场所: 神奈川県大和市　大和駅東側商店街
 * 5. 交通方式: 小田急江ノ島線・相模鉄道「大和駅」下車
 * 6. 主办方: 神奈川大和阿波おどり振興協会
 * 7. 料金: 観覧無料
 * 8. 联系方式: 神奈川大和阿波おどり振興協会　050-7303-4837
 * 9. 官方网站: https://yamato-awaodori.com/
 * 10. 谷歌地图: 35.469674,139.462067
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750948946053",
  name: "第49回神奈川大和阿波おどり（かながわやまとあわおどり）",
  address: "〒242-0016　神奈川県大和市大和南一丁目",
  datetime: "2025年7月26日～27日　 両日とも/17:00～20:20",
  venue: "神奈川県大和市　大和駅東側商店街",
  access: "小田急江ノ島線・相模鉄道「大和駅」下車",
  organizer: "神奈川大和阿波おどり振興協会",
  price: "観覧無料",
  contact: "神奈川大和阿波おどり振興協会　050-7303-4837",
  website: "https://yamato-awaodori.com/",
  googleMap: "https://maps.google.com/maps?q=35.469674,139.462067&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "地元商店街のイベントとして始まり、今では“関東三大阿波おどり”の一つに数えられています。例年、地元連のほか、全国から多くの連が参加しており、2025年も2日間で約40の連が出場予定です。鉦や太鼓の音が鳴り響く中、色鮮やかな衣装をまとった演者が圧巻の踊りを披露します。見ても踊っても、楽しめる大和の夏の風物詩です。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.kanagawa-kankou.or.jp/storage/post_picture/[1200_1200]_20250612163827_%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E8%A6%B3%E5%85%89%E5%8D%94%E4%BC%9ASNS2025%E5%B9%B4%EF%BC%97%E6%9C%88%E5%88%86%E5%A4%A7%E5%92%8C%E9%98%BF%E6%B3%A2%E3%81%8A%E3%81%A9%E3%82%8A%E5%86%99%E7%9C%9F%EF%BC%91.JPG",
      title: "第49回神奈川大和阿波おどり（かながわやまとあわおどり）图片1",
      alt: "第49回神奈川大和阿波おどり（かながわやまとあわおどり）图片1",
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