import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750949165979
 * 生成时间: 2025/6/26 23:46:05
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）
 * 2. 所在地: 〒251-0021　神奈川県藤沢市鵠沼神明2-11-5
 * 3. 开催期间: 2025年8月17日
 * 4. 开催场所: 神奈川県藤沢市　鵠沼皇大神宮
 * 5. 交通方式: ＪＲ東海道本線「藤沢駅」から徒歩15分或者「高山車庫行」の神奈中巴士「烏森公園前」すぐ
 * 6. 主办方: 未设置
 * 7. 料金: 未设置
 * 8. 联系方式: 鵠沼皇大神宮　0466-24-5590
 * 9. 官方网站: https://www.koudaijinguu.com/
 * 10. 谷歌地图: 35.341571,139.472899
 * 11. 地区: kanagawa
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750949165979",
  name: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）",
  address: "〒251-0021　神奈川県藤沢市鵠沼神明2-11-5",
  datetime: "2025年8月17日",
  venue: "神奈川県藤沢市　鵠沼皇大神宮",
  access: "ＪＲ東海道本線「藤沢駅」から徒歩15分或者「高山車庫行」の神奈中巴士「烏森公園前」すぐ",
  organizer: "",
  price: "",
  contact: "鵠沼皇大神宮　0466-24-5590",
  website: "https://www.koudaijinguu.com/",
  googleMap: "https://maps.google.com/maps?q=35.341571,139.472899&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kanagawa",
  description: "每年8月17日，在以乌森神社的名称而熟悉的须沼皇大神宫，会举行100多年前制作的9台人形花车和汤立神乐的祭典。花车是3层式的，下段是破风屋顶，雕刻精巧，前面是子座，大太鼓、笛、锣坐着。围绕着2层、3层的豪华幕布，描绘了山顶人偶的故事，花车聚集在神社的样子非常壮观。木偶花车被指定为该市的有形民俗文化财产，而玉立神乐被指定为该市的无形民俗文化财产。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.townnews.co.jp/0601/images/a001237418_04.jpg",
      title: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）图片1",
      alt: "鵠沼皇大神宮人形山車（くげぬまこうだいじんぐうにんぎょうだし）图片1",
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
  const regionKey = REGION_MAP["kanagawa"] || 'tokyo';

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