import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc8opiwm0001vlscby55sd4q
 * 生成时间: 2025/6/25 22:19:21
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 真岡の夏まつり　荒神祭（もおかのなつまつり　こうじんさい）
 * 2. 所在地: 〒321-4305　栃木県真岡市
 * 3. 开催期间: 2025年7月25日～27日　 花火大会/26日19:30～21:00　※荒天時は28日に順延
 * 4. 开催场所: 栃木県真岡市　真岡市内中心部、真岡市役所周辺
 * 5. 交通方式: 真岡鐡道「真岡駅」から徒歩15分、またはＪＲ東北本線「石橋駅」から「真岡営業所行」の関東自動車バス約40分「真岡市役所前」～徒歩3分、または北関東自動車道「真岡IC」から車約10分
 * 6. 主办方: 荒神祭祭典本部・荒神祭町会連合会
 * 7. 料金: 花火大会/有料観覧席あり
 * 8. 联系方式: 真岡市商工観光課　0285-83-8135
 * 9. 官方网站: https://mokahanabi.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.012631!3d36.440856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750658210196!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8opiwm0001vlscby55sd4q",
  name: "真岡の夏まつり　荒神祭（もおかのなつまつり　こうじんさい）",
  address: "〒321-4305　栃木県真岡市",
  datetime: "2025年7月25日～27日　 花火大会/26日19:30～21:00　※荒天時は28日に順延",
  venue: "栃木県真岡市　真岡市内中心部、真岡市役所周辺",
  access: "真岡鐡道「真岡駅」から徒歩15分、またはＪＲ東北本線「石橋駅」から「真岡営業所行」の関東自動車バス約40分「真岡市役所前」～徒歩3分、または北関東自動車道「真岡IC」から車約10分",
  organizer: "荒神祭祭典本部・荒神祭町会連合会",
  price: "花火大会/有料観覧席あり",
  contact: "真岡市商工観光課　0285-83-8135",
  website: "https://mokahanabi.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d140.012631!3d36.440856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750658210196!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "神輿や屋台の市内渡御や、勇壮な神輿の川渡御が見どころの「真岡の夏まつり 荒神祭」が3日間にわたり開催されます。初日の神輿の宮出しから町会渡御に始まり、2日目は市内中心部が歩行者天国となり“お祭り広場”が催されます。本社荒宮神輿をはじめ、子ども神輿、各地域の神輿、中学生による手作り御輿などの渡御と、山車屋台が登場し、多くのお囃子などが祭りに華を添えます。夜の花火大会では、神輿が五行川を「川渡御」する中、最大4号玉やスターマインなど約2万発が、音楽とレーザー光線による華麗で迫力ある演出で打ち上げられ、観客を魅了します。最終日には、伝統を漂わせる宮入り献灯と勇壮な宮入り渡御、そして山車屋台のお囃子やぶっつけが行われます。 ※打ち上げ数：2万発 観客数：17万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857558205_14_compressed.jpg",
      title: "真岡の夏まつり　荒神祭（もおかのなつまつり　こうじんさい）图片1",
      alt: "真岡の夏まつり　荒神祭（もおかのなつまつり　こうじんさい）图片1",
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
  const regionKey = REGION_MAP["kitakanto"] || 'tokyo';

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