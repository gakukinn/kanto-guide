import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc965a1n0007vlr0s5bh0hli
 * 生成时间: 2025/6/25 22:20:25
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 古河花火大会（こがはなびたいかい）
 * 2. 所在地: 〒306-0038　茨城県古河市西町10-1
 * 3. 开催期间: 2025年8月2日　 19:20～20:30　※荒天中止
 * 4. 开催场所: 茨城県古河市　古河ゴルフリンクス（渡良瀬川河川敷）
 * 5. 交通方式: ＪＲ宇都宮線「古河駅」西口から徒歩20分
 * 6. 主办方: 古河市
 * 7. 料金: 有料観覧席あり
 * 8. 联系方式: 古河花火大会実行委員会（古河市観光物産課内）　0280-22-5111
 * 9. 官方网站: http://www.kogakanko.jp/hanabi
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.691191!3d36.200006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687512877!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc965a1n0007vlr0s5bh0hli",
  name: "古河花火大会（こがはなびたいかい）",
  address: "〒306-0038　茨城県古河市西町10-1",
  datetime: "2025年8月2日　 19:20～20:30　※荒天中止",
  venue: "茨城県古河市　古河ゴルフリンクス（渡良瀬川河川敷）",
  access: "ＪＲ宇都宮線「古河駅」西口から徒歩20分",
  organizer: "古河市",
  price: "有料観覧席あり",
  contact: "古河花火大会実行委員会（古河市観光物産課内）　0280-22-5111",
  website: "http://www.kogakanko.jp/hanabi",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.691191!3d36.200006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750687512877!5m2!1sja!2sjp",
  region: "kitakanto",
  description: "夏の古河を彩る「古河花火大会」が、渡良瀬川河畔で開催されます。2025年は古河市合併20周年の記念大会として盛大に行われ、ワイドスターマイン、ミュージック花火など、ボリューム満点の花火が次々と打ち上げられ、見応え充分です。なかでも一番の見どころは、大迫力の三尺玉2発で、壮大なスケールが観客を圧倒します。 ※打ち上げ数：非公開 観客数：20万人、昨年度20万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://yakei-fan.com/images/magazine/fireworks/pic_koga-hanabi202401.jpg",
      title: "古河花火大会（こがはなびたいかい）图片1",
      alt: "古河花火大会（こがはなびたいかい）图片1",
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