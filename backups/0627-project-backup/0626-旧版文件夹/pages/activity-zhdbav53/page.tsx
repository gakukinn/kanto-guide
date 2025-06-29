import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc8r56ec0001vla4zhdbav53
 * 生成时间: 2025/6/24 23:24:42
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 南越谷阿波踊り（みなみこしがやあわおどり）
 * 2. 所在地: 〒343-0845　埼玉県越谷市南越谷
 * 3. 开催期间: 2025年8月22日～24日　 ※前夜祭/22日19:00～21:00
 * 4. 开催场所: 埼玉県越谷市　JR武蔵野線南越谷駅・東武スカイツリーライン線新越谷駅周辺
 * 5. 交通方式: ＪＲ武蔵野線「南越谷駅」・東武スカイツリーライン線「新越谷駅」からすぐ
 * 6. 主办方: 南越谷阿波踊り実行委員会、南越谷阿波踊り振興会
 * 7. 料金: 未设置
 * 8. 联系方式: 南越谷阿波踊り振興会　048-986-2266
 * 9. 官方网站: https://www.minamikoshigaya-awaodori.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.790383!3d35.875746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662309476!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8r56ec0001vla4zhdbav53",
  name: "南越谷阿波踊り（みなみこしがやあわおどり）",
    description: "",
  address: "〒343-0845　埼玉県越谷市南越谷",
  datetime: "2025年8月22日～24日　 ※前夜祭/22日19:00～21:00",
  venue: "埼玉県越谷市　JR武蔵野線南越谷駅・東武スカイツリーライン線新越谷駅周辺",
  access: "ＪＲ武蔵野線「南越谷駅」・東武スカイツリーライン線「新越谷駅」からすぐ",
  organizer: "南越谷阿波踊り実行委員会、南越谷阿波踊り振興会",
  price: "",
  contact: "南越谷阿波踊り振興会　048-986-2266",
  website: "https://www.minamikoshigaya-awaodori.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.790383!3d35.875746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662309476!5m2!1sja!2sjp",
  region: "saitama",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Koshigayaawaodori.jpg/1200px-Koshigayaawaodori.jpg",
      title: "南越谷阿波踊り（みなみこしがやあわおどり）图片1",      alt: "南越谷阿波踊り（みなみこしがやあわおどり）图片1",
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
      <MatsuriDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;