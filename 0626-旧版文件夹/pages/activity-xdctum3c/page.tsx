import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc96t64c001lvlr0xdctum3c
 * 生成时间: 2025/6/25 22:33:34
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 阿賀野川ござれや花火（あがのがわござれやはなび）
 * 2. 所在地: 〒950-3125　新潟県新潟市北区松浜
 * 3. 开催期间: 2025年8月25日　 花火打ち上げ/19:30～21:00（予定）　※荒天中止
 * 4. 开催场所: 新潟市　阿賀野川水上（松浜橋上流付近）
 * 5. 交通方式: ＪＲ白新線「新崎駅」・「大形駅」から車約5分、またはＪＲ「新潟駅」から松浜線の新潟交通バス「下山」・「松浜2丁目」～徒歩5分、または日本海東北自動車道「新潟空港IC」から車約5分
 * 6. 主办方: 阿賀野川ござれや花火協賛会
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 阿賀野川ござれや花火事務局　025-259-5811
 * 9. 官方网站: https://www.gozareya.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.145198!3d37.944081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688627948!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96t64c001lvlr0xdctum3c",
  name: "阿賀野川ござれや花火（あがのがわござれやはなび）",
  address: "〒950-3125　新潟県新潟市北区松浜",
  datetime: "2025年8月25日　 花火打ち上げ/19:30～21:00（予定）　※荒天中止",
  venue: "新潟市　阿賀野川水上（松浜橋上流付近）",
  access: "ＪＲ白新線「新崎駅」・「大形駅」から車約5分、またはＪＲ「新潟駅」から松浜線の新潟交通バス「下山」・「松浜2丁目」～徒歩5分、または日本海東北自動車道「新潟空港IC」から車約5分",
  organizer: "阿賀野川ござれや花火協賛会",
  price: "有料観覧席あり",
  contact: "阿賀野川ござれや花火事務局　025-259-5811",
  website: "https://www.gozareya.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.145198!3d37.944081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688627948!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "阿賀野川（松浜橋上流付近）の畔で、地元の夏の風物詩「阿賀野川ござれや花火」が、開催されます。2025年で51回目を迎え、“「歩 Ayumu」～未来への第一歩、ここから！”をテーマに、花火を通して未来の子ども達がふるさとを誇れるよう、歩み続けたいという願いを込めて行われます。尺玉や2尺玉をはじめ、オリジナルスターマイン、ミュージック花火、デザインコンテスト花火、慶祝花火など、約6000発の花火が次々と打ち上げられ、阿賀野川の川面と夜空を明るく照らします。 ※JR新崎駅から無料シャトルバス運行 打ち上げ数：6000発、昨年度6000発 観客数：20万人、昨年度20万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://cdn.clipkit.co/tenants/1044/articles/images/000/004/217/large/5c904a51-f91f-4c8d-b6e1-9a775753a532.jpg?1724219506",
      title: "阿賀野川ござれや花火（あがのがわござれやはなび）图片1",
      alt: "阿賀野川ござれや花火（あがのがわござれやはなび）图片1",
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
      <HanabiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;