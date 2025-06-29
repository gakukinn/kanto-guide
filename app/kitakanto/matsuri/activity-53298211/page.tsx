import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750953298211
 * 生成时间: 2025/6/27 00:54:58
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 山あげ祭（やまあげ祭典）
 * 2. 所在地: 〒321-0621　栃木県那須烏山市中央　ほか
 * 3. 开催期间: 2025年7月25日～27日　 上演時間は日により異なる
 * 4. 开催场所: 栃木県那須烏山市　烏山市街地
 * 5. 交通方式: ＪＲ烏山線「烏山駅」から徒歩5分～30分、或北関東自動車道「宇都宮上三川IC」から車約50分
 * 6. 主办方: 山あげ祭実行委員会
 * 7. 料金: 有料観覧席有　桟敷席一般席1席/1000円、特別席1席/1万円（20席限定※要予約）
 * 8. 联系方式: 那須烏山市観光協会　0287-84-1977、那須烏山市商工観光課　0287-83-1115
 * 9. 官方网站: https://www.city.nasukarasuyama.lg.jp/page/dir001128.html
 * 10. 谷歌地图: 36.656457,140.153973
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750953298211",
  name: "山あげ祭（やまあげ祭典）",
  address: "〒321-0621　栃木県那須烏山市中央　ほか",
  datetime: "2025年7月25日～27日　 上演時間は日により異なる",
  venue: "栃木県那須烏山市　烏山市街地",
  access: "ＪＲ烏山線「烏山駅」から徒歩5分～30分、或北関東自動車道「宇都宮上三川IC」から車約50分",
  organizer: "山あげ祭実行委員会",
  price: "有料観覧席有　桟敷席一般席1席/1000円、特別席1席/1万円（20席限定※要予約）",
  contact: "那須烏山市観光協会　0287-84-1977、那須烏山市商工観光課　0287-83-1115",
  website: "https://www.city.nasukarasuyama.lg.jp/page/dir001128.html",
  googleMap: "https://maps.google.com/maps?q=36.656457,140.153973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "作为Yakumo神社一年一度的节日庆典的奉献活动而举行的“Yamagai Matsuri”以使用当地特产乌山和纸制作的“Harika-san”为舞台背景，并表演正宗的户外歌舞伎舞蹈。从设置在观众面前的舞台到道路上约100 m之间，将有合理的山、馆、桥等配置，以这些为背景，由町内的舞者们表演绚烂豪华的舞蹈。在一个舞台结束后，舞台被转移到下一个地方，每天有4到6次的表演。它被指定为国家重要的非物质民间文化财产，并于2016年被登记为联合国教科文组织非物质文化遗产，是33个“山·花车·屋台活动”之一。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/2014_Yamaage_Matsuri_04.JPG/1200px-2014_Yamaage_Matsuri_04.JPG",
      title: "山あげ祭（やまあげ祭典）图片1",
      alt: "山あげ祭（やまあげ祭典）图片1",
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
      <UniversalStaticDetailTemplate
        data={activityData}
        regionKey={regionKey}
        activityKey="matsuri"
      />
    </div>
  );
};

export default DetailPage;