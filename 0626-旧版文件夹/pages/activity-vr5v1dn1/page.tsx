import React from 'react';
import MatsuriDetailTemplate from '../../../../src/components/MatsuriDetailTemplate';

/**
 * 传统祭典详情页面
 * 数据库ID: cmc7o9nqh000kvlcwvr5v1dn1
 * 生成时间: 2025/6/24 23:24:01
 * 模板: MatsuriDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 長瀞船玉まつり（ながとろふなだままつり）
 * 2. 所在地: 〒369-1305　埼玉県長瀞町
 * 3. 开催期间: 2025年8月15日　 まつり/17:00～20:45、花火/19:15～20:45（予定）
 * 4. 开催场所: 埼玉県長瀞町　長瀞岩畳
 * 5. 交通方式: 秩父鉄道「長瀞駅」から徒歩5分
 * 6. 主办方: 長瀞船玉まつり実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 長瀞町観光協会　0494-66-3311
 * 9. 官方网站: https://www.nagatoro.gr.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.115724!3d36.094732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662278353!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc7o9nqh000kvlcwvr5v1dn1",
  name: "長瀞船玉まつり（ながとろふなだままつり）",
    description: "",
  address: "〒369-1305　埼玉県長瀞町",
  datetime: "2025年8月15日　 まつり/17:00～20:45、花火/19:15～20:45（予定）",
  venue: "埼玉県長瀞町　長瀞岩畳",
  access: "秩父鉄道「長瀞駅」から徒歩5分",
  organizer: "長瀞船玉まつり実行委員会",
  price: "有料観覧席なし",
  contact: "長瀞町観光協会　0494-66-3311",
  website: "https://www.nagatoro.gr.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.115724!3d36.094732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750662278353!5m2!1sja!2sjp",
  region: "saitama",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.nagatoro.gr.jp/wp-content/uploads/2019/06/8d0c271122a0ceaaa4d6e75f1d11d548.jpg",
      title: "長瀞船玉まつり（ながとろふなだままつり）图片1",      alt: "長瀞船玉まつり（ながとろふなだままつり）图片1",
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