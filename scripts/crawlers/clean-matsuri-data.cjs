const fs = require('fs');
const path = require('path');

/**
 * 祭典数据清理工具
 * 用于清理爬取数据中的多余HTML元素和格式化文本
 */
class MatsuriDataCleaner {
  constructor() {
    this.inputPath = path.join(
      __dirname,
      '../../data/saitama-matsuri-detail-v2.json'
    );
    this.outputPath = path.join(
      __dirname,
      '../../data/saitama-matsuri-clean.json'
    );
  }

  cleanText(text) {
    if (!text || typeof text !== 'string') return text;

    return (
      text
        // 删除制表符和多余空白
        .replace(/\t+/g, ' ')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        // 删除地图控制相关文本
        .replace(/←左へ移動→右へ移動.*?利用規約地図の誤りを報告する/g, '')
        // 删除观光MAP相关文本
        .replace(/観光MAP\s*印刷用MAP/g, '')
        // 删除日期选择器文本
        .replace(/\d{4}年\d{1,2}月月火水木金土日.*?日付未定 閉じる/g, '')
        // 删除其他多余文本
        .replace(/※状況により内容が変更となる場合あり/g, '')
        .trim()
    );
  }

  cleanMatsuriData(data) {
    console.log('🧹 开始清理祭典数据...');

    const cleaned = { ...data };

    // 清理主要字段
    const fieldsToClean = [
      'period',
      'venue',
      'location',
      'access',
      'organizer',
      'contact',
      'website',
    ];

    for (const field of fieldsToClean) {
      if (cleaned[field]) {
        const original = cleaned[field];
        cleaned[field] = this.cleanText(original);
        if (original !== cleaned[field]) {
          console.log(
            `✅ 清理字段 ${field}: "${original.substring(0, 50)}..." → "${cleaned[field]}"`
          );
        }
      }
    }

    // 清理原始数据表格
    if (cleaned.rawData && cleaned.rawData.detailsTable) {
      const cleanedTable = {};
      for (const [key, value] of Object.entries(cleaned.rawData.detailsTable)) {
        if (key === '2025年6月') {
          // 跳过日期选择器数据
          continue;
        }
        cleanedTable[key] = this.cleanText(value);
      }
      cleaned.rawData.detailsTable = cleanedTable;
    }

    // 过滤图片，只保留活动相关的图片
    if (cleaned.images && Array.isArray(cleaned.images)) {
      cleaned.images = cleaned.images.filter(img => {
        return (
          img.includes('event') ||
          img.includes('matsuri') ||
          img.includes('e343612') || // 特定活动ID
          (img.includes('.jpg') && !img.includes('analytics')) ||
          (img.includes('.png') &&
            !img.includes('analytics') &&
            !img.includes('twitter'))
        );
      });
    }

    // 添加清理后的标准化字段
    cleaned.cleanedFields = {
      name: cleaned.name,
      period: this.extractPeriod(cleaned.period),
      venue: cleaned.venue,
      location: this.extractLocation(cleaned.location),
      access: cleaned.access,
      organizer: cleaned.organizer,
      contact: cleaned.contact,
      website: cleaned.website,
      googleMapUrl: cleaned.googleMapUrl,
    };

    return cleaned;
  }

  extractPeriod(periodText) {
    if (!periodText) return '';

    // 提取日期范围
    const match = periodText.match(
      /(\d{4}年\d{1,2}月\d{1,2}日[～〜]\d{1,2}日)/
    );
    if (match) {
      return match[1];
    }

    // 如果没有年份，尝试提取月日
    const monthMatch = periodText.match(/(\d{1,2}月\d{1,2}日[～〜]\d{1,2}日)/);
    if (monthMatch) {
      return `2025年${monthMatch[1]}`;
    }

    return this.cleanText(periodText);
  }

  extractLocation(locationText) {
    if (!locationText) return '';

    // 提取邮编和地址
    const match = locationText.match(/(〒\d{3}\s*-\s*\d{4}\s*[^\s]+)/);
    if (match) {
      return match[1].replace(/\s+/g, '');
    }

    return this.cleanText(locationText);
  }

  async processData() {
    try {
      console.log('📖 读取原始数据...');
      if (!fs.existsSync(this.inputPath)) {
        throw new Error(`输入文件不存在: ${this.inputPath}`);
      }

      const rawData = JSON.parse(fs.readFileSync(this.inputPath, 'utf8'));
      console.log(
        `✅ 原始数据读取成功，包含 ${Object.keys(rawData).length} 个字段`
      );

      const cleanedData = this.cleanMatsuriData(rawData);

      // 保存清理后的数据
      fs.writeFileSync(this.outputPath, JSON.stringify(cleanedData, null, 2));
      console.log(`✅ 清理后数据已保存: ${this.outputPath}`);

      // 显示清理结果摘要
      this.showSummary(cleanedData);

      return cleanedData;
    } catch (error) {
      console.error('❌ 数据清理失败:', error.message);
      throw error;
    }
  }

  showSummary(data) {
    console.log('\n📊 清理结果摘要:');
    console.log('='.repeat(50));
    console.log(`🏮 祭典名称: ${data.cleanedFields.name}`);
    console.log(`📅 开催期间: ${data.cleanedFields.period}`);
    console.log(`🏛️  开催场所: ${data.cleanedFields.venue}`);
    console.log(`📍 所在地: ${data.cleanedFields.location}`);
    console.log(`🚊 交通方式: ${data.cleanedFields.access}`);
    console.log(`👥 主办方: ${data.cleanedFields.organizer}`);
    console.log(`📞 联系方式: ${data.cleanedFields.contact}`);
    console.log(`🌐 官方网站: ${data.cleanedFields.website}`);
    console.log(
      `🗺️  谷歌地图: ${data.cleanedFields.googleMapUrl ? '已获取' : '未获取'}`
    );
    console.log(`🖼️  相关图片: ${data.images ? data.images.length : 0} 张`);
    console.log('='.repeat(50));
  }
}

// 主函数
async function main() {
  console.log('🧹 祭典数据清理工具启动');
  console.log('📁 处理埼玉祭典详情数据');

  const cleaner = new MatsuriDataCleaner();

  try {
    await cleaner.processData();
    console.log('\n🎉 数据清理完成！');
    console.log('💾 按照自动化配置规则，数据以JSON格式存储');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 清理失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = MatsuriDataCleaner;
