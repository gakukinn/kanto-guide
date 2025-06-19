'use client';

import MatsuriDetailTemplate from '@/components/MatsuriDetailTemplate';
import StructuredData from '@/components/StructuredData';
import { HanabiMedia } from '@/types/hanabi';
import { MatsuriEvent } from '@/utils/matsuri-data-validator';

export default function MatsumotoCastleTaikoPage() {
  // 媒体数据（图片）
  const matsuriMedia: HanabiMedia[] = [
    {
      type: 'image',
      url: '/images/koshinetsu/Matsuri/Matsumoto%20Castle%20Taiko%20Festival/Matsumoto%20Castle%20Taiko%20Festival%20(1).jpg',
      title: '松本城太鼓まつり メインステージ',
      description:
        '国宝松本城二の丸御殿跡メインステージでの迫力ある太鼓演奏の様子',
      alt: '第37回国宝松本城太鼓まつり メインステージでの太鼓演奏',
      caption: '国宝松本城二の丸御殿跡メインステージでの迫力ある太鼓演奏',
    },
    {
      type: 'image',
      url: '/images/koshinetsu/Matsuri/Matsumoto%20Castle%20Taiko%20Festival/Matsumoto%20Castle%20Taiko%20Festival%20(1).webp',
      title: '松本城太鼓まつり 和太鼓演奏',
      description: '全国各地から集まった太鼓団体による力強い演奏',
      alt: '松本城太鼓まつり 和太鼓演奏シーン',
      caption: '全国各地から集まった太鼓団体による迫力ある演奏',
    },
    {
      type: 'image',
      url: '/images/koshinetsu/Matsuri/Matsumoto%20Castle%20Taiko%20Festival/Matsumoto%20Castle%20Taiko%20Festival%20(2).webp',
      title: '松本城太鼓まつり 合同演奏',
      description: 'プロゲストと参加団体による圧巻の合同演奏フィナーレ',
      alt: '全国各地から集まった太鼓団体による合同演奏',
      caption: 'プロゲストと参加団体による合同演奏のフィナーレ',
    },
  ];

  // 第37回国宝松本城太鼓まつり数据（来自Jalan.net爬取）
  const matsuriData: MatsuriEvent = {
    id: 'matsumoto-castle-taiko',
    title: '第37回国宝松本城太鼓まつり',
    japaneseName:
      '第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）',
    englishName: 'The 37th National Treasure Matsumoto Castle Taiko Festival',
    date: '2025年7月26日～27日',
    endDate: '2025年7月27日',
    location:
      '長野県松本市 国宝松本城二の丸御殿跡、松本城大手門枡形跡広場（街中演奏）',
    category: '太鼓祭り',
    highlights: [
      '国宝松本城を舞台',
      '全国各地からの出演団体',
      '2日間開催',
      '大迫力の太鼓演奏',
      '入場無料',
      'プロゲストと参加団体の合同演奏',
      'メインステージと街中演奏',
      '熱気あふれる力と技',
    ],
    likes: 150,
    website: 'https://visitmatsumoto.com/',
    description: `国宝松本城を舞台に「国宝松本城太鼓まつり」が、2日間にわたり開催されます。松本城公園内二の丸御殿跡メインステージでは、全国各地から集まった出演団体による、熱気あふれる力と技で生み出された大迫力の太鼓演奏が披露されます。両日行われるプロゲストと参加団体による、合同演奏のフィナーレは圧巻です。

【開催概要】
・開催期間：2025年7月26日（土）～27日（日）
・開催時間：メインステージ 17:00～20:40（両日とも）
・開催場所：国宝松本城二の丸御殿跡、松本城大手門枡形跡広場（街中演奏）
・主催：城下町松本フェスタ組織委員会

【見どころ】
1. 国宝松本城を背景にした太鼓演奏：歴史ある名城と和太鼓の迫力ある共演
2. 全国各地からの出演団体：各地域の特色ある太鼓文化の饗宴
3. プロゲストとの合同演奏：フィナーレを飾る圧巻の大合奏
4. 街中演奏：松本城大手門枡形跡広場での開放的な演奏

【交通アクセス】
・ＪＲ中央本線「松本駅」から松本周遊バス（タウンスニーカー北コース）「松本城・市役所前」下車
・松本駅から徒歩約15分

信州松本の歴史と文化が息づく国宝松本城で、日本の伝統的な太鼓演奏の魅力を存分にお楽しみください。`,

    // 詳細情報（来自爬取数据）
    address: '〒390-0873 長野県松本市丸の内4-1',
    schedule:
      '2025年7月26日～27日 両日とも/メインステージ（松本城二の丸）17:00～20:40',
    venue:
      '長野県松本市 国宝松本城二の丸御殿跡、松本城大手門枡形跡広場（街中演奏）',
    access:
      'ＪＲ中央本線「松本駅」から松本周遊バス（タウンスニーカー北コース）「松本城・市役所前」下車',
    organizer: '城下町松本フェスタ組織委員会',
    contact:
      '城下町松本フェスタ組織委員会事務局（松本市観光ブランド課内） 0263-34-8307 （平日9:00～17:00）',
    googleMapsUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3251.234!2d137.9687!3d36.2384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbjgIAwJzUwLjQiTiAxMzfjgIA1OCcwNy4zIkU!5e0!3m2!1sja!2sjp!4v1750566300000!5m2!1sja!2sjp',
    media: matsuriMedia,
  };

  return (
    <>
      <StructuredData
        type="event"
        data={{
          name: matsuriData.title,
          startDate: matsuriData.date,
          location: {
            name: matsuriData.location,
            address: matsuriData.address || matsuriData.location,
          },
          description: matsuriData.description,
          image:
            '/images/koshinetsu/Matsuri/Matsumoto%20Castle%20Taiko%20Festival/Matsumoto%20Castle%20Taiko%20Festival%20(1).jpg',
          url: 'https://kantouguide.com/koshinetsu/matsuri/matsumoto-castle-taiko',
          organizer: {
            name: matsuriData.organizer || '城下町松本フェスタ組織委員会',
            type: 'Organization',
          },
          offers: {
            price: '0',
            priceCurrency: 'JPY',
            availability: 'https://schema.org/InStock',
          },
        }}
      />

      <MatsuriDetailTemplate data={matsuriData} regionKey="koshinetsu" />
    </>
  );
}
