import { useState, useEffect } from 'react';

// 浏览器翻译API接口定义
interface TranslationAPI {
  translate: (text: string, options: { from: string; to: string }) => Promise<string>;
  canTranslate: (options: { from: string; to: string }) => Promise<'readily' | 'after-download' | 'no'>;
}

interface WindowWithTranslation extends Window {
  translation?: TranslationAPI;
}

declare const window: WindowWithTranslation;

// 翻译缓存
const translationCache = new Map<string, string>();

export function useAutoTranslation() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkTranslationSupport();
  }, []);

  const checkTranslationSupport = async () => {
    try {
      // 检查浏览器是否支持Translation API
      if ('translation' in window) {
        const canTranslate = await window.translation!.canTranslate({
          from: 'ja',
          to: 'zh'
        });
        
        setIsSupported(canTranslate !== 'no');
        
        if (canTranslate === 'after-download') {
          console.log('🔄 正在下载翻译模型...');
        }
      } else {
        console.log('⚠️ 浏览器不支持Translation API，将使用备用方案');
        setIsSupported(false);
      }
    } catch (error) {
      console.error('翻译API检查失败:', error);
      setIsSupported(false);
    } finally {
      setIsLoading(false);
    }
  };

  const translateText = async (text: string): Promise<string> => {
    if (!text || !text.trim()) return text;
    
    // 检查缓存
    const cacheKey = `ja-zh:${text}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      if (isSupported && window.translation) {
        // 使用浏览器内置翻译API
        const translated = await window.translation.translate(text, {
          from: 'ja',
          to: 'zh'
        });
        
        // 缓存翻译结果
        translationCache.set(cacheKey, translated);
        return translated;
      } else {
        // 备用方案：使用Google Translate Widget风格的翻译
        return await fallbackTranslation(text);
      }
    } catch (error) {
      console.error('翻译失败:', error);
      return text; // 翻译失败时返回原文
    }
  };

  const fallbackTranslation = async (text: string): Promise<string> => {
    // 备用方案1：简单的日文关键词替换
    const commonTranslations: Record<string, string> = {
      '花火大会': '花火大会',
      '夏祭り': '夏日祭典',
      '打ち上げ': '燃放',
      'スターマイン': '连续烟花',
      '観客': '观众',
      '会場': '会场',
      '開催': '举办',
      '中止': '中止',
      '雨天': '雨天',
      '荒天': '恶劣天气',
      '交通規制': '交通管制',
      '屋台': '小吃摊',
      '有料': '收费',
      '無料': '免费',
      '駐車場': '停车场',
      '臨時': '临时',
      'バス': '巴士',
      '電車': '电车',
      '徒歩': '步行',
      '分': '分钟',
      '時': '点',
      '日': '日',
      '月': '月',
      '年': '年'
    };

    let translated = text;
    Object.entries(commonTranslations).forEach(([jp, cn]) => {
      translated = translated.replace(new RegExp(jp, 'g'), cn);
    });

    return translated;
  };

  return {
    translateText,
    isSupported,
    isLoading,
    clearCache: () => translationCache.clear()
  };
} 