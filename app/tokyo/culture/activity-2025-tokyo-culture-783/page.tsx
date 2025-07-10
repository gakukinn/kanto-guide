import React from 'react';
import UniversalStaticDetailTemplate from '../../../../src/components/UniversalStaticDetailTemplate';

/**
 * 🔄 纯静态文艺术详情页面
 * 数据库ID: recognition-culture-1752123178735
 * 生成时间: 2025/7/10 13:52:58
 * 模板: UniversalStaticDetailTemplate
 * 静态渲染: 无客户端JavaScript
 * 
 * 十一项核心数据:
 * 1. 名称: 第40回浅草サンバカーニバル　パレードコンテスト（あさくさサンバカーニバル　パレードコンテスト）
 * 2. 所在地: 〒111-0032　東京都台東区浅草
 * 3. 开催期间: 2025年8月30日　 13:00～　※詳細はホームページまたは公式SNSなどで要確認
 * 4. 开催场所: 東京都　浅草（馬道通り～雷門通り）
 * 5. 交通方式: 各線「浅草駅」からすぐ
 * 6. 主办方: 浅草サンバカーニバル実行委員会
 * 7. 料金: 観覧無料
 * 8. 联系方式: 浅草サンバカーニバル実行委員会事務局　official@asakusa-samba.org
 * 9. 官方网站: https://www.asakusa-samba.org/
 * 10. 谷歌地图: 35.71105,139.794602
 * 11. 地区: tokyo
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "recognition-culture-1752123178735",
  name: "第40回浅草サンバカーニバル　パレードコンテスト（あさくさサンバカーニバル　パレードコンテスト）",
  address: "〒111-0032　東京都台東区浅草",
  datetime: "2025年8月30日　 13:00～　※詳細はホームページまたは公式SNSなどで要確認",
  venue: "東京都　浅草（馬道通り～雷門通り）",
  access: "各線「浅草駅」からすぐ",
  organizer: "浅草サンバカーニバル実行委員会",
  price: "観覧無料",
  contact: "浅草サンバカーニバル実行委員会事務局　official@asakusa-samba.org",
  website: "https://www.asakusa-samba.org/",
  googleMap: "https://maps.google.com/maps?q=35.71105,139.794602&t=&z=15&ie=UTF8&iwloc=&output=embed",
  region: "tokyo",
  description: "浅草の夏を締めくくる一大イベント「浅草サンバカーニバル パレードコンテスト」が、浅草（馬道通り～雷門通り）で開催されます。1981年に始まり、2025年で40回目を迎えるイベントで、本場ブラジルのリオのカーニバルの熱気を体験できることから、例年50万人の来場者で賑わいます。浅草の町にサンバのリズムが鳴り響く中、迫力あるバテリア隊の演奏や、カーニバルを盛り上げる歌、躍動感たっぷりに踊るダンサー、華やかに装飾された「アレゴリア（山車）」による華やかなパレードが繰り広げられます。陽気なサンバのリズムにあわせて、煌びやかな衣装のダンサーたちが華麗なダンスを披露し、大勢の観客を魅了します。",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "https://www.atpress.ne.jp/releases/437793/LL_img_437793_1.jpg?format=webp",
      title: "第40回浅草サンバカーニバル　パレードコンテスト（あさくさサンバカーニバル　パレードコンテスト）图片1",
      alt: "第40回浅草サンバカーニバル　パレードコンテスト（あさくさサンバカーニバル　パレードコンテスト）图片1",
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
        activityKey="culture"
      />
    </div>
  );
};

export default DetailPage;