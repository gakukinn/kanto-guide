import React from 'react';
import HanamiDetailTemplate from '../../../../src/components/HanamiDetailTemplate';

/**
 * 花见会详情页面
 * 数据库ID: cmc95vfu80005vlvwzt5inyv9
 * 生成时间: 2025/6/24 21:51:17
 * 模板: HanamiDetailTemplate
 * 
 * 十项核心数据:
 * 1. 名称: 長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）
 * 2. 所在地: 〒248-0016　神奈川県鎌倉市長谷3-11-2
 * 3. 开催期间: 2025年5月下旬～7月上旬　 拝観時間/8:00～17:00（閉山17:30）　※あじさい路でのアジサイ鑑賞/五分咲き～見頃が終わるまで、あじさい入場券（有料）を領布。詳細はホームページをご確認ください。
 * 4. 开催场所: 神奈川県鎌倉市　長谷寺（長谷観音）
 * 5. 交通方式: 江ノ島電鉄「長谷駅」から徒歩5分、またはＪＲ横須賀線「鎌倉駅」からバス約10分「長谷観音前」下車
 * 6. 主办方: 未设置
 * 7. 料金: 拝観料/大人400円、あじさい入場券/500円
 * 8. 联系方式: 長谷寺　0467-22-6300
 * 9. 官方网站: https://www.hasedera.jp/
 * 10. 谷歌地图: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.533171!3d35.312492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750769258745!5m2!1sja!2sjp
 */

const DetailPage = () => {
  // 转换后的活动数据
  const activityData = {
  id: "cmc95vfu80005vlvwzt5inyv9",
  name: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）",
    description: "",
  address: "〒248-0016　神奈川県鎌倉市長谷3-11-2",
  datetime: "2025年5月下旬～7月上旬　 拝観時間/8:00～17:00（閉山17:30）　※あじさい路でのアジサイ鑑賞/五分咲き～見頃が終わるまで、あじさい入場券（有料）を領布。詳細はホームページをご確認ください。",
  venue: "神奈川県鎌倉市　長谷寺（長谷観音）",
  access: "江ノ島電鉄「長谷駅」から徒歩5分、またはＪＲ横須賀線「鎌倉駅」からバス約10分「長谷観音前」下車",
  organizer: "",
  price: "拝観料/大人400円、あじさい入場券/500円",
  contact: "長谷寺　0467-22-6300",
  website: "https://www.hasedera.jp/",
  googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0!2d139.533171!3d35.312492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1750769258745!5m2!1sja!2sjp",
  region: "kanagawa",
  themeColor: "red",
  status: "scheduled",
  media: [
    {
      type: "image" as const,
      url: "/uploads/images/1750769473345_xinrumingyue_imagine_prompt_A_realistic_photograph_of_Haseder_7f46298f-fb7b-4dcd-bd20-b5095483a6e1_1_compressed.jpg",
      title: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）图片1",      alt: "長谷寺（長谷観音）のアジサイ（はせでら　はせかんのん　のアジサイ）图片1",
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
      <HanamiDetailTemplate
        data={activityData}
        regionKey={regionKey}
      />
    </div>
  );
};

export default DetailPage;