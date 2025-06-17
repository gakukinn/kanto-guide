/**
 * WalkerPlus URL映射提取器
 * @description 从项目文件中提取所有已知的WalkerPlus URL映射，解决数据源匹配问题
 * @author AI Assistant
 * @date 2025-01-14
 */

const fs = require('fs').promises;
const path = require('path');

class WalkerPlusUrlMapper {
  constructor() {
    this.mappings = new Map();
    this.regionCodes = {
      ar0313: '东京',
      ar0311: '埼玉',
      ar0312: '千叶',
      ar0314: '神奈川',
      ar0308: '茨城',
      ar0309: '栃木',
      ar0310: '群马',
      ar0415: '新潟',
      ar0419: '山梨',
      ar0420: '长野',
      ar0400: '甲信越',
    };
  }

  /**
   * 扫描项目文件，提取WalkerPlus URL映射
   */
  async extractMappings() {
    console.log('🔍 开始扫描项目文件，提取WalkerPlus URL映射...');

    const srcDir = path.join(process.cwd(), 'src');
    await this.scanDirectory(srcDir);

    console.log(`✅ 提取完成，共找到 ${this.mappings.size} 个映射`);
    return this.mappings;
  }

  /**
   * 递归扫描目录
   */
  async scanDirectory(dirPath) {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          await this.scanDirectory(fullPath);
        } else if (this.isRelevantFile(entry.name)) {
          await this.extractFromFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`扫描目录 ${dirPath} 时出错:`, error.message);
    }
  }

  /**
   * 判断是否为相关文件
   */
  isRelevantFile(filename) {
    const extensions = ['.ts', '.js', '.json'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  /**
   * 从文件中提取WalkerPlus URL
   */
  async extractFromFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');

      // 匹配WalkerPlus URL的正则表达式
      const walkerPlusRegex =
        /https:\/\/hanabi\.walkerplus\.com\/detail\/(ar\d+e\d+)\//g;
      const matches = [...content.matchAll(walkerPlusRegex)];

      if (matches.length > 0) {
        const relativePath = path.relative(process.cwd(), filePath);

        matches.forEach(match => {
          const fullUrl = match[0];
          const eventCode = match[1]; // ar0313e00797

          // 提取地区代码和事件ID
          const regionMatch = eventCode.match(/^(ar\d+)/);
          const eventIdMatch = eventCode.match(/e(\d+)$/);

          if (regionMatch && eventIdMatch) {
            const regionCode = regionMatch[1];
            const eventId = eventIdMatch[1];
            const regionName = this.regionCodes[regionCode] || '未知地区';

            // 尝试从文件内容中提取事件名称
            const eventName = this.extractEventName(content, fullUrl);

            const mapping = {
              url: fullUrl,
              eventCode: eventCode,
              regionCode: regionCode,
              regionName: regionName,
              eventId: eventId,
              eventName: eventName,
              sourceFile: relativePath,
              extractedAt: new Date().toISOString(),
            };

            this.mappings.set(eventCode, mapping);
            console.log(`📍 发现映射: ${eventName || eventCode} -> ${fullUrl}`);
          }
        });
      }
    } catch (error) {
      console.error(`处理文件 ${filePath} 时出错:`, error.message);
    }
  }

  /**
   * 从文件内容中提取事件名称
   */
  extractEventName(content, walkerPlusUrl) {
    // 尝试多种方式提取事件名称
    const patterns = [
      // TypeScript/JavaScript 对象中的 name 字段
      /name:\s*['"`]([^'"`]*花火[^'"`]*)['"`]/,
      // title 字段
      /title:\s*['"`]([^'"`]*花火[^'"`]*)['"`]/,
      // 注释中的事件名称
      /\/\*\*?\s*([^*]*花火[^*]*)\s*\*\//,
      // 单行注释
      /\/\/\s*([^\/]*花火[^\/]*)/,
      // JSON 中的名称
      /"name":\s*"([^"]*花火[^"]*)"/,
      /"title":\s*"([^"]*花火[^"]*)"/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }

  /**
   * 生成映射报告
   */
  generateMappingReport() {
    const mappingArray = Array.from(this.mappings.values());

    // 按地区分组
    const byRegion = {};
    mappingArray.forEach(mapping => {
      if (!byRegion[mapping.regionName]) {
        byRegion[mapping.regionName] = [];
      }
      byRegion[mapping.regionName].push(mapping);
    });

    let report = '# WalkerPlus URL映射报告\n\n';
    report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
    report += `总映射数: ${this.mappings.size}\n\n`;

    // 统计信息
    report += '## 📊 地区分布\n\n';
    Object.entries(byRegion).forEach(([region, mappings]) => {
      report += `- ${region}: ${mappings.length} 个\n`;
    });
    report += '\n';

    // 详细映射列表
    report += '## 📋 详细映射列表\n\n';
    Object.entries(byRegion).forEach(([region, mappings]) => {
      report += `### ${region}\n\n`;

      mappings.forEach((mapping, index) => {
        report += `${index + 1}. **${mapping.eventName || mapping.eventCode}**\n`;
        report += `   - URL: ${mapping.url}\n`;
        report += `   - 事件代码: ${mapping.eventCode}\n`;
        report += `   - 源文件: ${mapping.sourceFile}\n\n`;
      });
    });

    return report;
  }

  /**
   * 保存映射数据到JSON文件
   */
  async saveMappings() {
    const mappingData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalMappings: this.mappings.size,
        version: '1.0.0',
      },
      regionCodes: this.regionCodes,
      mappings: Object.fromEntries(this.mappings),
    };

    const outputPath = path.join(
      process.cwd(),
      'data',
      'walkerplus-url-mappings.json'
    );

    // 确保目录存在
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    await fs.writeFile(
      outputPath,
      JSON.stringify(mappingData, null, 2),
      'utf8'
    );
    console.log(`💾 映射数据已保存到: ${outputPath}`);

    // 同时保存报告
    const reportPath = path.join(
      process.cwd(),
      'data',
      'walkerplus-mapping-report.md'
    );
    const report = this.generateMappingReport();
    await fs.writeFile(reportPath, report, 'utf8');
    console.log(`📄 映射报告已保存到: ${reportPath}`);

    return { mappingData, report };
  }

  /**
   * 查找事件的WalkerPlus URL
   */
  findUrlByEventName(eventName) {
    const normalizedName = eventName.replace(/第\d+回\s?/, '').trim();

    for (const [code, mapping] of this.mappings) {
      if (mapping.eventName && mapping.eventName.includes(normalizedName)) {
        return mapping.url;
      }
    }

    return null;
  }

  /**
   * 根据地区获取所有映射
   */
  getMappingsByRegion(regionName) {
    const results = [];

    for (const [code, mapping] of this.mappings) {
      if (mapping.regionName === regionName) {
        results.push(mapping);
      }
    }

    return results;
  }

  /**
   * 验证URL的有效性
   */
  async validateUrls() {
    console.log('🔍 开始验证WalkerPlus URL的有效性...');

    const results = {
      valid: [],
      invalid: [],
      errors: [],
    };

    // 这里可以添加HTTP请求来验证URL
    // 为了避免过多请求，暂时跳过实际验证
    console.log('⚠️ URL验证功能需要实现HTTP请求检查');

    return results;
  }
}

/**
 * 智能事件匹配器
 */
class SmartEventMatcher {
  constructor(mappings) {
    this.mappings = mappings;
  }

  /**
   * 智能匹配事件到WalkerPlus URL
   */
  matchEvent(eventData) {
    const strategies = [
      () => this.exactNameMatch(eventData),
      () => this.fuzzyNameMatch(eventData),
      () => this.locationDateMatch(eventData),
      () => this.regionBasedMatch(eventData),
    ];

    for (const strategy of strategies) {
      const result = strategy();
      if (result) {
        return {
          url: result.url,
          confidence: result.confidence,
          strategy: result.strategy,
          mapping: result.mapping,
        };
      }
    }

    return null;
  }

  /**
   * 精确名称匹配
   */
  exactNameMatch(eventData) {
    for (const [code, mapping] of this.mappings) {
      if (mapping.eventName === eventData.name) {
        return {
          url: mapping.url,
          confidence: 100,
          strategy: 'exact_name',
          mapping: mapping,
        };
      }
    }
    return null;
  }

  /**
   * 模糊名称匹配
   */
  fuzzyNameMatch(eventData) {
    const normalizedEventName = this.normalizeEventName(eventData.name);

    for (const [code, mapping] of this.mappings) {
      if (mapping.eventName) {
        const normalizedMappingName = this.normalizeEventName(
          mapping.eventName
        );
        const similarity = this.calculateSimilarity(
          normalizedEventName,
          normalizedMappingName
        );

        if (similarity > 0.8) {
          return {
            url: mapping.url,
            confidence: Math.round(similarity * 100),
            strategy: 'fuzzy_name',
            mapping: mapping,
          };
        }
      }
    }
    return null;
  }

  /**
   * 地点和日期匹配
   */
  locationDateMatch(eventData) {
    // 实现基于地点和日期的匹配逻辑
    return null;
  }

  /**
   * 基于地区的匹配
   */
  regionBasedMatch(eventData) {
    // 实现基于地区的匹配逻辑
    return null;
  }

  /**
   * 标准化事件名称
   */
  normalizeEventName(name) {
    return name
      .replace(/第\d+回\s?/, '')
      .replace(/\s+/g, '')
      .replace(/[・･]/g, '')
      .toLowerCase();
  }

  /**
   * 计算字符串相似度
   */
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * 计算编辑距离
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 WalkerPlus URL映射提取器启动...');

  try {
    const mapper = new WalkerPlusUrlMapper();

    // 提取映射
    const mappings = await mapper.extractMappings();

    // 保存结果
    const { mappingData, report } = await mapper.saveMappings();

    // 创建智能匹配器
    const matcher = new SmartEventMatcher(mappings);

    console.log('\n📊 提取结果统计:');
    console.log(`- 总映射数: ${mappings.size}`);
    console.log(`- 地区数: ${Object.keys(mapper.regionCodes).length}`);

    // 按地区统计
    const regionStats = {};
    for (const [code, mapping] of mappings) {
      const region = mapping.regionName;
      regionStats[region] = (regionStats[region] || 0) + 1;
    }

    console.log('\n🗾 地区分布:');
    Object.entries(regionStats).forEach(([region, count]) => {
      console.log(`  ${region}: ${count} 个`);
    });

    console.log('\n✅ WalkerPlus URL映射提取完成!');
    console.log('💡 现在可以使用这些映射来实现智能数据源匹配');

    return { mapper, matcher, mappings };
  } catch (error) {
    console.error('❌ 提取过程中出现错误:', error);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  WalkerPlusUrlMapper,
  SmartEventMatcher,
  main,
};
