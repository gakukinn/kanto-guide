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
 * 1. 名称: 山あげ祭（やまあげまつり）
 * 2. 所在地: 〒321-0621　栃木県那須烏山市中央　ほか
 * 3. 开催期间: 2025年7月25日～27日　 上演時間は日により異なる
 * 4. 开催场所: 栃木県那須烏山市　烏山市街地
 * 5. 交通方式: ＪＲ烏山線「烏山駅」から徒歩5分～30分、または北関東自動車道「宇都宮上三川IC」から車約50分
 * 6. 主办方: 山あげ祭実行委員会
 * 7. 料金: 有料観覧席あり　桟敷席一般席1席/1000円、特別席1席/1万円（20席限定※要予約）
 * 8. 联系方式: 那須烏山市観光協会　0287-84-1977、那須烏山市商工観光課　0287-83-1115
 * 9. 官方网站: https://www.city.nasukarasuyama.lg.jp/page/dir001128.html
 * 10. 谷歌地图: 36.656457,140.153973
 * 11. 地区: kitakanto
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750953298211",
  name: "山あげ祭（やまあげまつり）",
  address: "〒321-0621　栃木県那須烏山市中央　ほか",
  datetime: "2025年7月25日～27日　 上演時間は日により異なる",
  venue: "栃木県那須烏山市　烏山市街地",
  access: "ＪＲ烏山線「烏山駅」から徒歩5分～30分、または北関東自動車道「宇都宮上三川IC」から車約50分",
  organizer: "山あげ祭実行委員会",
  price: "有料観覧席あり　桟敷席一般席1席/1000円、特別席1席/1万円（20席限定※要予約）",
  contact: "那須烏山市観光協会　0287-84-1977、那須烏山市商工観光課　0287-83-1115",
  website: "https://www.city.nasukarasuyama.lg.jp/page/dir001128.html",
  googleMap: "https://maps.google.com/maps?q=36.656457,140.153973&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "kitakanto",
  description: "八雲神社例大祭の奉納行事として開催される「山あげ祭」では、地元の特産である烏山和紙を使った「はりか山」が舞台背景となり、本格的な野外歌舞伎舞踊が上演されます。観客の前に据えられた舞台から道路上約100mの間に、山や舘、橋などが程良く配置され、それらを背景に町の踊り子らによる絢爛豪華な舞が披露されます。一つの舞台が終わると次の場所に舞台を移動し、1日に4～6回の所作狂言が行われます。国の重要無形民俗文化財に指定され、2016年に、ユネスコ無形文化遺産に登録された「山・鉾・屋台行事」33の祭礼のひとつです。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/2014_Yamaage_Matsuri_04.JPG/1200px-2014_Yamaage_Matsuri_04.JPG",
      title: "山あげ祭（やまあげまつり）图片1",
      alt: "山あげ祭（やまあげまつり）图片1",
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