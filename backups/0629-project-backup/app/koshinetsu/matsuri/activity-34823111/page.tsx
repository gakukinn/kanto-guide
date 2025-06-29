import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750934823111
 * 生成时间: 2025/6/26 19:47:03
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）
 * 2. 所在地: 〒390-0873　長野県松本市丸の内4-1
 * 3. 开催期间: 2025年7月26日～27日　 両日とも/メインステージ（松本城二の丸）17:00～20:40
 * 4. 开催场所: 長野県松本市　国宝松本城二の丸御殿跡、松本城大手門枡形跡広場（街中演奏）
 * 5. 交通方式: ＪＲ中央本線「松本駅」から松本周遊バス（タウンスニーカー北コース）「松本城・市役所前」下車
 * 6. 主办方: 城下町松本フェスタ組織委員会
 * 7. 料金: 入場無料
 * 8. 联系方式: 城下町松本フェスタ組織委員会事務局（松本市観光ブランド課内）　0263-34-8307　（平日9:00～17:00）
 * 9. 官方网站: https://visitmatsumoto.com/
 * 10. 谷歌地图: 36.238676,137.968866
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750934823111",
  name: "第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）",
  address: "〒390-0873　長野県松本市丸の内4-1",
  datetime: "2025年7月26日～27日　 両日とも/メインステージ（松本城二の丸）17:00～20:40",
  venue: "長野県松本市　国宝松本城二の丸御殿跡、松本城大手門枡形跡広場（街中演奏）",
  access: "ＪＲ中央本線「松本駅」から松本周遊バス（タウンスニーカー北コース）「松本城・市役所前」下車",
  organizer: "城下町松本フェスタ組織委員会",
  price: "入場無料",
  contact: "城下町松本フェスタ組織委員会事務局（松本市観光ブランド課内）　0263-34-8307　（平日9:00～17:00）",
  website: "https://visitmatsumoto.com/",
  googleMap: "https://maps.google.com/maps?q=36.238676,137.968866&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "国宝松本城を舞台に「国宝松本城太鼓まつり」が、2日間にわたり開催されます。松本城公園内二の丸御殿跡メインステージでは、全国各地から集まった出演団体による、熱気あふれる力と技で生み出された大迫力の太鼓演奏が披露されます。両日行われるプロゲストと参加団体による、合同演奏のフィナーレは圧巻です。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://i2.wp.com/visitmatsumoto.com/wp-content/uploads/2018/06/1e3b4672cf48f79e63cbebc1e9d98dcf.jpg?fit=1670%2C1114&ssl=1",
      title: "第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）图片1",
      alt: "第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）图片1",
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