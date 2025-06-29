import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc96jj4r000xvlr0ftkegk4t
 * 生成时间: 2025/6/25 22:29:57
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）
 * 2. 所在地: 〒386-0018　長野県上田市
 * 3. 开催期间: 2025年8月5日　 19:00～20:30　※雨天決行、荒天中止
 * 4. 开催场所: 長野県上田市　千曲川河川敷（常田新橋下流約300m）
 * 5. 交通方式: 北陸新幹線「上田駅」から徒歩5分、または上信越自動車道「上田菅平IC」から車約15分
 * 6. 主办方: 信州上田大花火大会実行委員会
 * 7. 料金: 有料観覧席あり　※桟敷席/1万9800円、立ち見スペース5500円
 * 8. 联系方式: 信州上田大花火大会実行委員会事務局（上田商工会議所内）　0268-22-4500
 * 9. 官方网站: https://www.ucci.or.jp/info/news/shinsyuuedadaihanabitaikai2025/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.252438!3d36.390707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688175475!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96jj4r000xvlr0ftkegk4t",
  name: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）",
  address: "〒386-0018　長野県上田市",
  datetime: "2025年8月5日　 19:00～20:30　※雨天決行、荒天中止",
  venue: "長野県上田市　千曲川河川敷（常田新橋下流約300m）",
  access: "北陸新幹線「上田駅」から徒歩5分、または上信越自動車道「上田菅平IC」から車約15分",
  organizer: "信州上田大花火大会実行委員会",
  price: "有料観覧席あり　※桟敷席/1万9800円、立ち見スペース5500円",
  contact: "信州上田大花火大会実行委員会事務局（上田商工会議所内）　0268-22-4500",
  website: "https://www.ucci.or.jp/info/news/shinsyuuedadaihanabitaikai2025/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.252438!3d36.390707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688175475!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "信州上田の夏を彩る大花火大会が、千曲川河川敷で開催されます。2025年で第38回を迎え、創作花火、ワイドスターマイン、ミュージックスターマインを中心に、5号玉など約8000発の花火が打ち上げられます。見通しの良い河川敷にて、目の前に打ち上げられる迫力の花火を楽しむことができます。 ※打ち上げ数：昨年度8000発 観客数：昨年度8万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://go-nagano.a.kuroco-img.app/v=1749621040/files/topics/19425_ext_01_2.jpg",
      title: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
      alt: "上田市誕生20周年記念　信州上田大花火大会（しんしゅううえだだいはなびたいかい）图片1",
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