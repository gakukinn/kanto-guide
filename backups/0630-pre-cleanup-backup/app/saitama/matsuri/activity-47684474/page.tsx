import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750947684474
 * 生成时间: 2025/6/26 23:21:24
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 長瀞船玉祭典（ながとろふなだま祭典）
 * 2. 所在地: 〒369-1305　埼玉県長瀞町
 * 3. 开催期间: 2025年8月15日　 祭典/17:00～20:45、花火/19:15～20:45（予定）
 * 4. 开催场所: 埼玉県長瀞町　長瀞岩畳
 * 5. 交通方式: 秩父鉄道「長瀞駅」步行5分
 * 6. 主办方: 長瀞船玉祭典実行委員会
 * 7. 料金: 无收费观览席
 * 8. 联系方式: 長瀞町観光協会　0494-66-3311
 * 9. 官方网站: https://www.nagatoro.gr.jp/
 * 10. 谷歌地图: 36.094732,139.115724
 * 11. 地区: saitama
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750947684474",
  name: "長瀞船玉祭典（ながとろふなだま祭典）",
  address: "〒369-1305　埼玉県長瀞町",
  datetime: "2025年8月15日　 祭典/17:00～20:45、花火/19:15～20:45（予定）",
  venue: "埼玉県長瀞町　長瀞岩畳",
  access: "秩父鉄道「長瀞駅」步行5分",
  organizer: "長瀞船玉祭典実行委員会",
  price: "无收费观览席",
  contact: "長瀞町観光協会　0494-66-3311",
  website: "https://www.nagatoro.gr.jp/",
  googleMap: "https://maps.google.com/maps?q=36.094732,139.115724&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "saitama",
  description: "举行水上安全祈愿和水难供养的“船玉祭”最后的烟火大会，将在长岩垫举行。以“花在空中和静宫”为主题，将燃放烟花、星光、尼亚加拉、讯息烟花、音乐烟花、尺玉等约3000发烟花，庆典达到高潮。在“Funotama Matsuri”中，Hozan-jinja神社的祭司登上一艘船，在清澈的溪流中进行净化净化仪式，两艘Mantoku-shane在舞台音乐中缓慢地上下移动。另一方面，大量的灯笼被冲走，为在水难中牺牲的人们举行供养仪式。发射次数：3 000次。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.nagatoro.gr.jp/wp-content/uploads/2013/07/554543878ed0152426e5d51c762f6aec.jpg",
      title: "長瀞船玉祭典（ながとろふなだま祭典）图片1",
      alt: "長瀞船玉祭典（ながとろふなだま祭典）图片1",
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