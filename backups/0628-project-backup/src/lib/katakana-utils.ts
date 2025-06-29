/**
 * 片假名地名转换工具
 * 用于处理官方日文地名中的片假名
 */

// 常见地名片假名到中文的映射
const katakanaToChineseMap: Record<string, string> = {
  // 基础地名词汇
  ゴルフ: '高尔夫',
  パーク: '公园',
  ビーチ: '海滩',
  スタジアム: '体育场',
  アリーナ: '竞技场',
  センター: '中心',
  クラブ: '俱乐部',
  リゾート: '度假村',
  プラザ: '广场',
  ホール: '厅',
  コンプレックス: '综合体',
  フィールド: '球场',

  // 间隔符号
  '・': '·',

  // 特殊符号
  の: '之',
};

/**
 * 将地名中的片假名处理为中文
 * @param locationName 包含片假名的地名
 * @returns 处理后的中文地名
 */
export function convertKatakanaLocationToChinese(locationName: string): string {
  let result = locationName;

  // 按照映射表进行替换
  Object.entries(katakanaToChineseMap).forEach(([katakana, chinese]) => {
    result = result.replace(new RegExp(katakana, 'g'), chinese);
  });

  return result;
}

/**
 * 获取地名的中文显示版本
 * 如果没有需要转换的片假名，返回原地名
 * @param locationName 原地名
 * @returns 适合显示的地名
 */
export function getDisplayLocationName(locationName: string): string {
  const converted = convertKatakanaLocationToChinese(locationName);

  // 如果转换后与原文相同，说明没有需要转换的内容
  if (converted === locationName) {
    return locationName;
  }

  // 如果有转换，返回转换后的版本
  return converted;
}

/**
 * 检查地名是否包含片假名
 * @param locationName 地名
 * @returns 是否包含片假名
 */
export function hasKatakana(locationName: string): boolean {
  return /[\u30A0-\u30FF]/.test(locationName);
}

/**
 * 获取地名的双语显示（如果包含片假名）
 * @param locationName 原地名
 * @returns 双语显示字符串或原地名
 */
export function getBilingualLocationName(locationName: string): string {
  if (!hasKatakana(locationName)) {
    return locationName;
  }

  const chineseName = convertKatakanaLocationToChinese(locationName);
  if (chineseName !== locationName) {
    return `${chineseName}（${locationName}）`;
  }

  return locationName;
}
