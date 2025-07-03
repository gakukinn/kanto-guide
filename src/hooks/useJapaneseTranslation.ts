import { useState, useEffect } from 'react';

// 日文关键词翻译表
const japaneseTranslations: Record<string, string> = {
  // 时间词汇
  '時間': '时间',
  '開催時間': '举办时间', 
  '開催日時': '举办时间',
  '荒天の場合': '雨天情况',
  '雨天決行': '雨天照常举行',
  '雨天中止': '雨天取消',
  '雨天延期': '雨天延期',
  
  // 门票词汇
  '有料席': '付费座位',
  '無料': '免费',
  '有料': '收费',
  '観覧席': '观看席位',
  '桟敷席': '包厢席',
  
  // 地点词汇
  '会場': '会场',
  '会場周辺': '会场周边',
  '打ち上げ場所': '燃放地点',
  '観覧場所': '观看地点',
  '駐車場': '停车场',
  '交通機関': '交通工具',
  'アクセス': '交通方式',
  
  // 活动词汇
  '花火大会': '花火大会',
  '花火': '烟花',
  '打ち上げ': '燃放',
  '屋台': '小吃摊',
  '夜店': '小吃摊',
  '事件': '活动',
  'お祭り': '节庆',
  
  // 数量词汇
  '発': '发',
  '万発': '万发',
  '千発': '千发',
  '約': '约',
  '予定': '预计',
  
  // 一般词汇
  'なし': '无',
  'あり': '有',
  '未定': '待定',
  '詳細': '详情',
  '官方网站': '官方网站',
  '主催': '主办方',
  '協賛': '协办方',
  '後援': '支持方',
  'お問い合わせ': '联系方式',
  '備考': '备注说明',
};

export function useJapaneseTranslation() {
  const [isEnabled, setIsEnabled] = useState(false);

  // 翻译日文文本的函数
  const translateJapanese = (text: string): string => {
    if (!text || !isEnabled) return text;
    
    let translatedText = text;
    
    // 替换已知的日文词汇
    Object.entries(japaneseTranslations).forEach(([japanese, chinese]) => {
      const regex = new RegExp(japanese, 'g');
      translatedText = translatedText.replace(regex, chinese);
    });
    
    return translatedText;
  };

  // 翻译开关
  const toggleTranslation = () => {
    setIsEnabled(!isEnabled);
  };

  return {
    translateJapanese,
    isEnabled,
    toggleTranslation,
  };
} 