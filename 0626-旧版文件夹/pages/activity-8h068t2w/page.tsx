import React from 'react';
import HanabiDetailTemplate from '../../../../src/components/HanabiDetailTemplate';

/**
 * 花火会详情页面
 * 数据库ID: cmc8kygzs000dvlgg8h068t2w
 * 生成时间: 2025/6/25 22:25:13
 * 模板: HanabiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）
 * 2. 所在地: 〒409-3606　山梨県西八代郡市川三郷町高田682
 * 3. 开催期间: 2025年8月7日　19:15～21:00　※雨天決行、荒天時は8日または9日に順延
 * 4. 开催场所: 山梨県市川三郷町　三郡橋下笛吹川河畔
 * 5. 交通方式: JR身延線「市川大門駅」から徒歩15分
 * 6. 主办方: 市川三郷町ふるさと夏まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 市川三郷町商工会　055-272-3231
 * 9. 官方网站: http://www.town.ichikawamisato.yamanashi.jp/shinmei/
 * 10. 谷歌地图: https://maps.google.com/maps?q=35.56107,138.48328&z=15&output=embed
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc8kygzs000dvlgg8h068t2w",
  name: "市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）",
  address: "〒409-3606　山梨県西八代郡市川三郷町高田682",
  datetime: "2025年8月7日　19:15～21:00　※雨天決行、荒天時は8日または9日に順延",
  venue: "山梨県市川三郷町　三郡橋下笛吹川河畔",
  access: "JR身延線「市川大門駅」から徒歩15分",
  organizer: "市川三郷町ふるさと夏まつり実行委員会",
  price: "",
  contact: "市川三郷町商工会　055-272-3231",
  website: "http://www.town.ichikawamisato.yamanashi.jp/shinmei/",
      googleMap: "https://maps.google.com/maps?q=35.56107,138.48328&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "武田信玄が活躍した時代、戦いの狼煙として使われていたことがはじまりとされる市川花火は、江戸時代には日本三大花火のひとつに数えられ、市川和紙の興隆に貢献した紙工「甚左衛門」の命日7月20日に行われていました。平成元年（1989年）に山梨県最大規模の花火大会として復活し、現在は毎年8月7日（花火の日）に開催されています。2025年は“光の軌跡～紡ぐ想い、繋ぐ未来～”をテーマに、音楽にあわせて、尺玉、特大スターマイン、テーマファイヤー、メッセージ花火などが夜空を彩り、華々しいグランドフィナーレを迎えます。ストーリー性のあるプログラム構成が特徴で、例年18万人余りが訪れて賑わいます。 ※打ち上げ数：2万発、昨年度2万発 観客数：18万人、昨年度18万人",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750857910099_xinrumingyue_imagine_prompt_A_realistic_photograph_of_Shinmei_2c125205-dec5-46a5-9b39-c0ebace7239a_0_compressed.jpg",
      title: "市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）图片1",
      alt: "市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）图片1",
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