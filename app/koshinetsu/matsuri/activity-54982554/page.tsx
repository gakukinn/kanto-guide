import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750954982554
 * 生成时间: 2025/6/27 01:23:02
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 祇园柏崎祭典（ぎおんかしわざき祭典）
 * 2. 所在地: 〒945-0066　新潟県柏崎市
 * 3. 开催期间: 2025年7月24日～26日　 【24日】民謡街頭流し/18:00～19:30　　【25日】たる仁和賀パレード/18:00～20:15　　【26日】海の大花火大会/19:30～21:10（雨天決行、恶劣天气时延期）　※当日の朝9:00に市官网で発表
 * 4. 开催场所: 新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯
 * 5. 交通方式: ＪＲ信越本線「柏崎駅」步行15分
 * 6. 主办方: 祇园柏崎祭典協賛会
 * 7. 料金: 花火大会/有料観覧席有　※2025年の申し込みは終了
 * 8. 联系方式: 祇园柏崎祭典協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334
 * 9. 官方网站: https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/
 * 10. 谷歌地图: 37.369411,138.552954
 * 11. 地区: koshinetsu
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750954982554",
  name: "祇园柏崎祭典（ぎおんかしわざき祭典）",
  address: "〒945-0066　新潟県柏崎市",
  datetime: "2025年7月24日至26日举行，24日18时至19时30分举行民谣街头游行，25日18时至20时15分举行太鼓仁和贺游行，26日19时30分至21时10分举行海上大型烟花大会，雨天照常举行，遇恶劣天气延期，当日上午9时将在市官方网站发布通知。",
  venue: "新潟県柏崎市　東本町～西本町、みなとまち海浜公園、中央海岸一帯",
  access: "ＪＲ信越本線「柏崎駅」步行15分",
  organizer: "祇园柏崎祭典協賛会",
  price: "花火大会/有料観覧席有　※2025年の申し込みは終了",
  contact: "祇园柏崎祭典協賛会（柏崎市産業振興部商業観光課内）　0257-21-2334",
  website: "https://www.city.kashiwazaki.lg.jp/kashiwazakihanabi/",
  googleMap: "https://maps.google.com/maps?q=37.369411,138.552954&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "koshinetsu",
  description: "为柏崎的夏天上色的大型活动“祇园柏崎祭”，将举行3天。除了吸引观众参与扩大舞蹈圈的“民谣街头流”，以及勇敢地举行花车的“鲁鲁仁和贺游行”从东本町到西本町举行之外，被称为越后三大烟火之一的“海之大花火大会”也将在美东町海滨公园举行最后一幕。从惯例的300发烟花开始，三尺烟花、海底星光、100发烟花等约16000发烟花，以世界上无与伦比的宽度在海底天空中盛开，其震撼力和美丽值得一睹。我们建议您从港町海滨公园观看。* 发射次数：16000次，去年16000次，观众人数：210000次，去年170000次",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.city.kashiwazaki.lg.jp/material/images/group/27/sunset-starmine.jpg",
      title: "祇园柏崎祭典（ぎおんかしわざき祭典）图片1",
      alt: "祇园柏崎祭典（ぎおんかしわざき祭典）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;