import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc96rvjh001hvlr0uo8hfomu
 * 生成时间: 2025/6/25 22:32:56
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 寺泊港まつり　海上大花火大会（てらどまりみなとまつり　かいじょうおおはなびたいかい）
 * 2. 所在地: 〒940-2502　新潟県長岡市寺泊上田町
 * 3. 开催期间: 2025年8月7日　 19:30～20:45（予定）　※雨天時は翌日に順延
 * 4. 开催场所: 新潟県長岡市　寺泊港・寺泊中央海水浴場
 * 5. 交通方式: ＪＲ越後線「寺泊駅」から車約15分もしくはバス「上田町」下車、または北陸自動車道「中之島見附IC」から車約40分
 * 6. 主办方: 寺泊港まつり実行委員会
 * 7. 料金: 有料観覧席なし
 * 8. 联系方式: 寺泊観光協会　0258-75-3363
 * 9. 官方网站: https://www.teradomari-kankou.com/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.766611!3d37.647616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688564302!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc96rvjh001hvlr0uo8hfomu",
  name: "寺泊港まつり　海上大花火大会（てらどまりみなとまつり　かいじょうおおはなびたいかい）",
  address: "〒940-2502　新潟県長岡市寺泊上田町",
  datetime: "2025年8月7日　 19:30～20:45（予定）　※雨天時は翌日に順延",
  venue: "新潟県長岡市　寺泊港・寺泊中央海水浴場",
  access: "ＪＲ越後線「寺泊駅」から車約15分もしくはバス「上田町」下車、または北陸自動車道「中之島見附IC」から車約40分",
  organizer: "寺泊港まつり実行委員会",
  price: "有料観覧席なし",
  contact: "寺泊観光協会　0258-75-3363",
  website: "https://www.teradomari-kankou.com/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d138.766611!3d37.647616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750688564302!5m2!1sja!2sjp",
  region: "koshinetsu",
  description: "寺泊の中央海水浴場に、色とりどりの花火が乱舞する「寺泊港まつり 海上大花火大会」が開催されます。海中海空スターマインをはじめ、豪華ベスビアス、追悼花火、お祝い花火、尺玉などが打ち上げられ、会場は歓声に包まれます。FMながおかによるラジオ中継で、花火のアナウンスが放送されます。渚から望む花火は格別で、海中と海空を彩る約5000発の迫力ある花火を楽しめます。 ※打ち上げ数：5000発、昨年度5000発 観客数：3万人、昨年度3万2000人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "http://niigata-kankou.or.jp/image/rendering/attraction_image/208761/keep/1200?v=52e055b5ed3ea320d0d92add843d9b33951d8192",
      title: "寺泊港まつり　海上大花火大会（てらどまりみなとまつり　かいじょうおおはなびたいかい）图片1",
      alt: "寺泊港まつり　海上大花火大会（てらどまりみなとまつり　かいじょうおおはなびたいかい）图片1",
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