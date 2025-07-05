import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750946034557
 * 生成时间: 2025/6/26 22:53:54
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 東京高円寺阿波おどり（とうきょうこうえんじあわおどり）
 * 2. 所在地: 〒166-0003　東京都杉並区高円寺北2、3丁目　南2、3、4丁目
 * 3. 开催期间: 2025年8月23日～24日　 17:00～20:00　※舞台公演有（おどれ高円寺セシオン/11:30～、夏の座・高円寺阿波おどり/11:30～）
 * 4. 开催场所: 東京都　JR高円寺駅周辺商店街および高南通り、セシオン杉並ホール、座・高円寺
 * 5. 交通方式: ＪＲ中央本線「高円寺駅」下車、或地下鉄丸ノ内線「新高円寺駅」下車
 * 6. 主办方: 高円寺阿波おどり実行委員会、NPO法人東京高円寺阿波おどり振興協会
 * 7. 料金: 有料特別桟敷席有
 * 8. 联系方式: ※官网内の問い合わせフォームを利用
 * 9. 官方网站: https://www.koenji-awaodori.com/
 * 10. 谷歌地图: 35.701743,139.64957
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750946034557",
  name: "東京高円寺阿波おどり（とうきょうこうえんじあわおどり）",
  address: "〒166-0003　東京都杉並区高円寺北2、3丁目　南2、3、4丁目",
  datetime: "2025年8月23日～24日　 17:00～20:00　※舞台公演有（おどれ高円寺セシオン/11:30～、夏の座・高円寺阿波おどり/11:30～）",
  venue: "東京都　JR高円寺駅周辺商店街および高南通り、セシオン杉並ホール、座・高円寺",
  access: "ＪＲ中央本線「高円寺駅」下車、或地下鉄丸ノ内線「新高円寺駅」下車",
  organizer: "高円寺阿波おどり実行委員会、NPO法人東京高円寺阿波おどり振興協会",
  price: "有料特別桟敷席有",
  contact: "※官网内の問い合わせフォームを利用",
  website: "https://www.koenji-awaodori.com/",
  googleMap: "https://maps.google.com/maps?q=35.701743,139.64957&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "为了寻求街道的繁荣，昭和32年（1957年）开始的“东京高圆寺阿波舞”，今年也会举办华丽的活动。来自德岛的舞蹈演员也加入了进来，总共约有160人，约有10000人，乘坐轻快的音乐伴奏，在高円寺街游行，这是一个壮观的景象。每年都有100万名观众，高圆寺的街道上充满了阿波舞的色彩。2025年的舞台表演将在杉并会馆演出“高円寺会馆”，在座・高圆寺演出“夏日剧场高円寺 阿波舞”。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.gotokyo.org/en/spot/ev039/images/main.jpg",
      title: "東京高円寺阿波おどり（とうきょうこうえんじあわおどり）图片1",
      alt: "東京高円寺阿波おどり（とうきょうこうえんじあわおどり）图片1",
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
  const regionKey = REGION_MAP["tokyo"] || 'tokyo';

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