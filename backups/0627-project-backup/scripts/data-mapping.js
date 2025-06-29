// 数据文件映射脚本
const fs = require('fs');
const path = require('path');

// 数据文件映射表
const dataMapping = {
  // 千叶县花火数据映射
  'chiba': {
    'level4-august-hanabi-choshi-minato': 'level5-august-hanabi-choshi-minato',
    'level4-july-hanabi-futtsu': 'level5-july-hanabi-futtsu',
    'level4-august-hanabi-ichikawa': 'level5-august-hanabi-ichikawa',
    'level4-july-hanabi-chiba-kamogawa': 'level5-july-hanabi-chiba-kamogawa',
    'level4-august-hanabi-kisarazu': 'level5-august-hanabi-kisarazu',
    'level4-august-hanabi-makuhari-beach': 'level5-august-hanabi-makuhari-beach',
    'level4-august-hanabi-matsudo': 'level5-august-hanabi-matsudo',
    'level4-august-hanabi-narashino': 'level5-august-hanabi-narashino',
    'level4-july-hanabi-chiba-oamishirasato': 'level5-july-hanabi-chiba-oamishirasato',
    'level4-august-omigawa-hanabi': 'level5-august-omigawa-hanabi',
    'level4-july-hanabi-chiba-shirahama': 'level5-july-hanabi-chiba-shirahama',
    'level4-august-hanabi-teganuma': 'level5-august-hanabi-teganuma'
  },
  
  // 神奈川县花火数据映射
  'kanagawa': {
    'level4-august-atsugi-ayu-matsuri': 'level5-august-kanagawa-atsugi-ayu-matsuri',
    'level4-july-hanabi-kanagawa-kamakura': 'level5-july-hanabi-kanagawa-kamakura',
    'level4-august-kanazawa-matsuri-hanabi': 'level5-august-kanazawa-matsuri-hanabi',
    'level4-august-kurihama-hanabi': 'level5-august-kurihama-hanabi',
    'level4-august-minato-mirai-smart': 'level5-august-minato-mirai-smart',
    'level4-august-odawara-sakawa-hanabi': 'level5-august-kanagawa-odawara-sakawa',
    'level4-august-sagamiko-hanabi': 'level5-august-sagamiko-hanabi',
    'level4-july-hanabi-kanagawa-seaparadise': 'level5-july-hanabi-kanagawa-seaparadise',
    'level4-august-southern-beach-chigasaki': 'level5-august-kanagawa-southern-beach-chigasaki',
    'level4-september-kanagawa-seaparadise-hanabi': 'level5-september-kanagawa-seaparadise-hanabi',
    'level4-september-kanagawa-yokohama-hanabi': 'level5-september-kanagawa-yokohama-hanabi',
    'level4-july-hanabi-kanagawa-nightflowers': 'level5-july-hanabi-kanagawa-nightflowers',
    'level4-august-kanagawa-yokohama-seaparadise': 'level5-august-kanagawa-yokohama-seaparadise'
  },
  
  // 北关东花火数据映射
  'kitakanto': {
    'level4-august-ashikaga-hanabi': 'level5-august-ashikaga-hanabi',
    'level4-august-koga-hanabi': 'level5-august-koga-hanabi',
    'level4-august-takasaki-hanabi': 'level5-august-takasaki-hanabi',
    'level4-moka-hanabi': 'level5-moka-hanabi',
    'level4-september-kitakanto-oarai-hanabi': 'level5-september-kitakanto-oarai-hanabi',
    'level4-september-kitakanto-oyama-hanabi': 'level5-september-kitakanto-oyama-hanabi',
    'level4-september-kitakanto-tonegawa-hanabi': 'level5-september-kitakanto-tonegawa-hanabi',
    'level4-september-kitakanto-numata-hanabi': 'level5-september-kitakanto-numata-hanabi',
    'level4-september-kitakanto-joso-kinugawa-hanabi': 'level5-september-kitakanto-joso-kinugawa-hanabi'
  },
  
  // 甲信越花火数据映射
  'koshinetsu': {
    'level4-anime-classics-anisong-hanabi': 'level5-anime-classics-anisong-hanabi',
    'level4-september-koshinetsu-asahara-hanabi': 'level5-september-koshinetsu-asahara-hanabi',
    'level4-gion-kashiwazaki-hanabi': 'level5-gion-kashiwazaki-hanabi',
    'level4-august-shinmei-hanabi': 'level5-august-shinmei-hanabi',
    'level4-august-nagaoka-hanabi': 'level5-august-nagaoka-hanabi',
    'level4-september-koshinetsu-shinsaku-hanabi': 'level5-september-koshinetsu-shinsaku-hanabi'
  },
  
  // 埼玉县花火数据映射
  'saitama': {
    'level4-august-asaka-hanabi': 'level5-august-asaka-hanabi',
    'level4-august-higashimatsuyama-hanabi': 'level5-august-higashimatsuyama-hanabi',
    'level4-august-ina-hanabi': 'level5-august-ina-hanabi',
    'level4-july-hanabi-iruma-base': 'level5-july-hanabi-iruma-base',
    'level4-july-hanabi-koshigaya': 'level5-july-hanabi-koshigaya',
    'level4-august-kumagaya-hanabi': 'level5-august-kumagaya-hanabi',
    'level4-july-hanabi-metsza-nordic': 'level5-july-hanabi-metsza-nordic',
    'level4-july-hanabi-ogawa-tanabata': 'level5-july-hanabi-ogawa-tanabata',
    'level4-july-hanabi-saitama-owada': 'saitama-owada-hanabi',
    'level4-july-hanabi-seibu-en': 'level5-july-hanabi-seibu-en',
    'level4-august-todabashi-hanabi': 'level5-august-todabashi-hanabi',
    'level4-september-saitama-metsa-hanabi': 'level5-september-saitama-metsa-hanabi'
  },
  
  // 东京花火数据映射
  'tokyo': {
    'level4-july-hanabi-tokyo-keibajo': 'hanabi-level4-july-hanabi-tokyo-keibajo',
    'level4-july-hanabi-tokyo-sumida': 'hanabi-level4-july-hanabi-tokyo-sumida',
    'level4-july-hanabi-tokyo-hachioji': 'hanabi-level4-july-hanabi-tokyo-hachioji',
    'level4-september-tokyo-chofu-hanabi': 'hanabi-level4-september-tokyo-chofu-hanabi'
  }
};

console.log('📋 数据文件映射表已创建');
console.log('🔄 请运行 npm run create-data-symlinks 来创建符号链接');

module.exports = { dataMapping }; 