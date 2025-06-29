import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态传统祭典详情页面
 * 数据库ID: recognition-matsuri-1750945989308
 * 生成时间: 2025/6/26 22:53:09
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 八王子まつり（はちおうじまつり）
 * 2. 所在地: 〒192-0063　東京都八王子市横山町から追分町
 * 3. 开催期间: 2025年8月1日～3日　 12:00～21:00
 * 4. 开催场所: 東京都八王子市　甲州街道および西放射線ユーロードとその周辺
 * 5. 交通方式: ＪＲ中央本線「八王子駅」北口から徒歩5分、またはＪＲ中央本線「西八王子駅」北口から徒歩10分、京王「京王八王子駅」から徒歩10分
 * 6. 主办方: 八王子まつり実行委員会
 * 7. 料金: 未设置
 * 8. 联系方式: 八王子まつり実行委員会　042-686-0611　info@hachiojimatsuri.jp
 * 9. 官方网站: https://www.hachiojimatsuri.jp/
 * 10. 谷歌地图: 35.659889,139.335772
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-matsuri-1750945989308",
  name: "八王子まつり（はちおうじまつり）",
  address: "〒192-0063　東京都八王子市横山町から追分町",
  datetime: "2025年8月1日～3日　 12:00～21:00",
  venue: "東京都八王子市　甲州街道および西放射線ユーロードとその周辺",
  access: "ＪＲ中央本線「八王子駅」北口から徒歩5分、またはＪＲ中央本線「西八王子駅」北口から徒歩10分、京王「京王八王子駅」から徒歩10分",
  organizer: "八王子まつり実行委員会",
  price: "",
  contact: "八王子まつり実行委員会　042-686-0611　info@hachiojimatsuri.jp",
  website: "https://www.hachiojimatsuri.jp/",
  googleMap: "https://maps.google.com/maps?q=35.659889,139.335772&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "精巧な彫刻が施された山車19台が、甲州街道2kmを勇壮に巡行するお祭りです。灯火に浮かび上がる夜の山車は、まさに“動く芸術品”。民踊流しや、関東太鼓大合戦、地元の宮神輿渡御も行われ、いずれも一見の価値があります。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.townnews.co.jp/0305/images/a001231439_03.jpg",
      title: "八王子まつり（はちおうじまつり）图片1",
      alt: "八王子まつり（はちおうじまつり）图片1",
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