#!/usr/bin/env node

/**
 * 数据质量分析报告工具
 * 分析项目中活动页面的数据质量，生成详细报告
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataQualityReporter {
  constructor() {
    this.sourceRoot = path.join(process.cwd(), 'src', 'app');
    this.regions = ['tokyo', 'kanagawa', 'chiba', 'saitama', 'kitakanto', 'koshinetsu'];
    this.activityTypes = ['hanabi', 'matsuri'];
    
    this.report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalPages: 0,
        highQuality: 0,
        mediumQuality: 0,
        lowQuality: 0,
        missingPages: 0
      },
      pages: [],
      recommendations: []
    };
  }

  /**
   * 生成完整的数据质量报告
   */
  async generateReport() {
    console.log('🔍 开始数据质量分析...');
    
    for (const activityType of this.activityTypes) {
      for (const region of this.regions) {
        await this.analyzePage(activityType, region);
      }
    }

    this.generateRecommendations();
    this.printReport();
    this.saveReport();

    return this.report;
  }

  /**
   * 分析单个页面
   */
  async analyzePage(activityType, region) {
    const pagePath = path.join(this.sourceRoot, region, activityType, 'page.tsx');
    
    if (!fs.existsSync(pagePath)) {
      this.report.summary.missingPages++;
      this.report.pages.push({
        activityType,
        region,
        status: 'missing',
        qualityScore: 0,
        issues: ['页面文件不存在'],
        path: pagePath
      });
      return;
    }

    this.report.summary.totalPages++;
    
    const content = fs.readFileSync(pagePath, 'utf8');
    const analysis = this.analyzePageContent(content, activityType, region);
    
    // 分类质量等级
    if (analysis.qualityScore >= 80) {
      this.report.summary.highQuality++;
    } else if (analysis.qualityScore >= 60) {
      this.report.summary.mediumQuality++;
    } else {
      this.report.summary.lowQuality++;
    }

    this.report.pages.push({
      activityType,
      region,
      status: 'exists',
      ...analysis,
      path: pagePath
    });
  }

  /**
   * 分析页面内容质量
   */
  analyzePageContent(content, activityType, region) {
    const analysis = {
      qualityScore: 0,
      activitiesCount: 0,
      hasTemplate: false,
      hasCompleteData: false,
      issues: [],
      strengths: []
    };

    // 检查模板使用
    const templateName = activityType === 'hanabi' ? 'HanabiPageTemplate' : 'MatsuriPageTemplate';
    analysis.hasTemplate = content.includes(templateName);
    if (analysis.hasTemplate) {
      analysis.qualityScore += 20;
      analysis.strengths.push('使用标准模板');
    } else {
      analysis.issues.push('未使用标准模板');
    }

    // 统计活动数量
    const eventMatches = content.match(/{\s*id:/g);
    analysis.activitiesCount = eventMatches ? eventMatches.length : 0;
    
    if (analysis.activitiesCount >= 5) {
      analysis.qualityScore += 30;
      analysis.strengths.push(`活动丰富 (${analysis.activitiesCount}个)`);
    } else if (analysis.activitiesCount >= 3) {
      analysis.qualityScore += 20;
      analysis.strengths.push(`活动适中 (${analysis.activitiesCount}个)`);
    } else if (analysis.activitiesCount > 0) {
      analysis.qualityScore += 10;
      analysis.issues.push(`活动较少 (${analysis.activitiesCount}个)`);
    } else {
      analysis.issues.push('无活动数据');
    }

    // 检查数据完整性
    const hasBasicFields = ['name:', 'date:', 'location:'].every(field => content.includes(field));
    const hasExtendedFields = ['website:', 'description:', 'likes:'].every(field => content.includes(field));
    const hasSpecialFields = activityType === 'hanabi' ? 
      content.includes('fireworksCount:') : 
      content.includes('features:');

    if (hasBasicFields && hasExtendedFields && hasSpecialFields) {
      analysis.qualityScore += 30;
      analysis.hasCompleteData = true;
      analysis.strengths.push('数据字段完整');
    } else {
      if (!hasBasicFields) analysis.issues.push('缺少基本字段');
      if (!hasExtendedFields) analysis.issues.push('缺少详细信息');
      if (!hasSpecialFields) analysis.issues.push('缺少特色字段');
    }

    // 检查国际化支持
    if (content.includes('japaneseName:') && content.includes('englishName:')) {
      analysis.qualityScore += 10;
      analysis.strengths.push('支持多语言');
    } else {
      analysis.issues.push('缺少多语言支持');
    }

    // 检查代码质量
    if (content.includes('const events = [') && content.includes('export default function')) {
      analysis.qualityScore += 10;
      analysis.strengths.push('代码结构良好');
    } else {
      analysis.issues.push('代码结构问题');
    }

    return analysis;
  }

  /**
   * 生成改进建议
   */
  generateRecommendations() {
    const { summary, pages } = this.report;
    
    // 通用建议
    if (summary.missingPages > 0) {
      this.report.recommendations.push(
        `创建 ${summary.missingPages} 个缺失的页面文件`
      );
    }

    if (summary.lowQuality > 0) {
      this.report.recommendations.push(
        `改善 ${summary.lowQuality} 个低质量页面的数据完整性`
      );
    }

    // 具体问题建议
    const commonIssues = {};
    pages.forEach(page => {
      page.issues?.forEach(issue => {
        commonIssues[issue] = (commonIssues[issue] || 0) + 1;
      });
    });

    Object.entries(commonIssues)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([issue, count]) => {
        this.report.recommendations.push(
          `修复常见问题: ${issue} (影响${count}个页面)`
        );
      });

    // Walker Plus数据建议
    this.report.recommendations.push(
      '🌟 使用智能数据更新器从Walker Plus获取最新花火数据',
      '🌟 使用智能数据更新器从Omatsuri Link获取最新祭典数据',
      '🌟 运行 npm run update-hanabi 更新所有花火页面',
      '🌟 运行 npm run update-matsuri 更新所有祭典页面'
    );
  }

  /**
   * 打印报告
   */
  printReport() {
    const { summary, pages, recommendations } = this.report;
    
    console.log(`
🏆 数据质量分析报告
====================

📊 总体统计:
├── 总页面数: ${summary.totalPages + summary.missingPages}
├── 现有页面: ${summary.totalPages}
├── 缺失页面: ${summary.missingPages}
├── 高质量页面 (80-100分): ${summary.highQuality}
├── 中质量页面 (60-79分): ${summary.mediumQuality}
└── 低质量页面 (0-59分): ${summary.lowQuality}

🎯 质量分布:
${this.generateQualityChart()}

📋 详细页面分析:
${this.generatePageDetails()}

💡 改进建议:
${recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

🚀 快速操作:
  npm run update-hanabi     # 更新所有花火页面
  npm run update-matsuri    # 更新所有祭典页面
  npm run update-force      # 强制更新所有页面
`);
  }

  /**
   * 生成质量分布图表
   */
  generateQualityChart() {
    const { summary } = this.report;
    const total = summary.totalPages;
    
    if (total === 0) return '无数据';

    const highPercent = Math.round((summary.highQuality / total) * 100);
    const mediumPercent = Math.round((summary.mediumQuality / total) * 100);
    const lowPercent = Math.round((summary.lowQuality / total) * 100);

    return `
高质量 [${'█'.repeat(Math.floor(highPercent / 5))}${' '.repeat(20 - Math.floor(highPercent / 5))}] ${highPercent}%
中质量 [${'▓'.repeat(Math.floor(mediumPercent / 5))}${' '.repeat(20 - Math.floor(mediumPercent / 5))}] ${mediumPercent}%
低质量 [${'░'.repeat(Math.floor(lowPercent / 5))}${' '.repeat(20 - Math.floor(lowPercent / 5))}] ${lowPercent}%`;
  }

  /**
   * 生成页面详细信息
   */
  generatePageDetails() {
    return this.report.pages
      .sort((a, b) => b.qualityScore - a.qualityScore)
      .slice(0, 10) // 显示前10个
      .map(page => {
        const emoji = page.status === 'missing' ? '❌' : 
                     page.qualityScore >= 80 ? '✅' : 
                     page.qualityScore >= 60 ? '⚠️' : '🔴';
        
        return `${emoji} ${page.region}/${page.activityType}: ${page.qualityScore}分 (${page.activitiesCount || 0}个活动)`;
      }).join('\n');
  }

  /**
   * 保存报告到文件
   */
  saveReport() {
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportFile = path.join(reportsDir, `data-quality-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(this.report, null, 2));
    
    console.log(`\n📄 详细报告已保存到: ${reportFile}`);
  }
}

// CLI 接口
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'generate';

  const reporter = new DataQualityReporter();

  switch (command) {
    case 'generate':
    case 'report':
      await reporter.generateReport();
      break;

    case 'help':
    default:
      console.log(`
📊 数据质量分析报告工具

用法:
  node scripts/data-quality-report.js [命令]

命令:
  generate     生成数据质量报告 (默认)
  report       同 generate
  help         显示帮助信息

示例:
  node scripts/data-quality-report.js
  node scripts/data-quality-report.js generate
`);
      break;
  }
}

// 运行脚本
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error('❌ 脚本执行失败:', error);
    process.exit(1);
  });
}

export default DataQualityReporter; 