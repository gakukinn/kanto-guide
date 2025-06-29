import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7ojtqb000avlagiswlpw7f
 * 生成时间: 2025/6/24 23:30:46
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 柏まつり（かしわまつり）
 * 2. 所在地: 〒277-0005　千葉県柏市柏
 * 3. 开催期间: 2025年7月26日～27日　 15:00～21:00
 * 4. 开催场所: 千葉県柏市　柏駅東西中心街
 * 5. 交通方式: ＪＲ常磐線「柏駅」下車
 * 6. 主办方: 柏まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 柏まつり実行委員会（柏商工会議所内）　04-7162-3315
 * 9. 官方网站: https://www.kashiwa-cci.or.jp/other-organizations/kashiwamaturi
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.971588!3d35.862268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662749390!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7ojtqb000avlagiswlpw7f",
  name: "柏まつり（かしわまつり）",
    description: "",
  address: "〒277-0005　千葉県柏市柏",
  datetime: "2025年7月26日～27日　 15:00～21:00",
  venue: "千葉県柏市　柏駅東西中心街",
  access: "ＪＲ常磐線「柏駅」下車",
  organizer: "柏まつり実行委員会",
  price: "",
  contact: "柏まつり実行委員会（柏商工会議所内）　04-7162-3315",
  website: "https://www.kashiwa-cci.or.jp/other-organizations/kashiwamaturi",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.971588!3d35.862268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662749390!5m2!1sja!2sjp",
  region: "chiba",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.city.kashiwa.lg.jp/images/38788/maturiguidemapsoto.png",
      title: "柏まつり（かしわまつり）图片1",      alt: "柏まつり（かしわまつり）图片1",
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