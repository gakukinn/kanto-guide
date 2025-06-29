// 支持的语言列表（双语言系统）
export const locales = ['zh', 'en'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number];

// 翻译函数
export async function getTranslations(locale: Locale) {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.warn(
      `Failed to load translations for ${locale}, falling back to ${defaultLocale}`
    );
    const fallbackMessages = await import(`../messages/${defaultLocale}.json`);
    return fallbackMessages.default;
  }
}

// 获取翻译文本的辅助函数
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}
