import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947753600
 * 生成时间: 2025/6/26 23:22:33
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 南越谷阿波踊り（みなみこしがやあわおどり）
 * 2. 所在地: 〒343-0845　埼玉県越谷市南越谷
 * 3. 开催期间: 2025年8月22日～24日　 ※前夜祭/22日19:00～21:00
 * 4. 开催场所: 埼玉県越谷市　JR武蔵野線南越谷駅・東武スカイツリーライン線新越谷駅周辺
 * 5. 交通方式: ＪＲ武蔵野線「南越谷駅」・東武スカイツリーライン線「新越谷駅」からすぐ
 * 6. 主办方: 南越谷阿波踊り実行委員会、南越谷阿波踊り振興会
 * 7. 料金: 未设置
 * 8. 联系方式: 南越谷阿波踊り振興会　048-986-2266
 * 9. 官方网站: https://www.minamikoshigaya-awaodori.jp/
 * 10. 谷歌地图: 35.875746,139.790383
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947753600",
  name: "南越谷阿波踊り（みなみこしがやあわおどり）",
  address: "〒343-0845　埼玉県越谷市南越谷",
  datetime: "2025年8月22日～24日　 ※前夜祭/22日19:00～21:00",
  venue: "埼玉県越谷市　JR武蔵野線南越谷駅・東武スカイツリーライン線新越谷駅周辺",
  access: "ＪＲ武蔵野線「南越谷駅」・東武スカイツリーライン線「新越谷駅」からすぐ",
  organizer: "南越谷阿波踊り実行委員会、南越谷阿波踊り振興会",
  price: "",
  contact: "南越谷阿波踊り振興会　048-986-2266",
  website: "https://www.minamikoshigaya-awaodori.jp/",
  googleMap: "https://maps.google.com/maps?q=35.875746,139.790383&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "本場徳島、東京高円寺に次ぐ規模を誇り、日本三大阿波踊りのひとつに数えられる南越谷の阿波踊りが開催されます。踊り手と観客との距離が近く、臨場感や熱気を肌で実感できるのも魅力です。こども阿波踊り教室、大人向け阿波踊り教室もあり、阿波踊り指導を受けてから流し踊り会場で流し踊りも体験できます。例年70万人以上の人出で賑わう、埼玉県内でも有数の夏祭りとなっています。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Koshigayaawaodori.jpg/1200px-Koshigayaawaodori.jpg",
      title: "南越谷阿波踊り（みなみこしがやあわおどり）图片1",
      alt: "南越谷阿波踊り（みなみこしがやあわおどり）图片1",
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
  const regionKey = REGION_MAP["saitama"] || 'tokyo';

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