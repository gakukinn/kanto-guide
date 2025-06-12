import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 性能检查类
class PerformanceChecker {
  constructor() {
    this.results = {
      fileCount: 0,
      totalSize: 0,
      largeFiles: [],
      longLoadingComponents: [],
      optimizationSuggestions: []
    };
  }

  // 检查文件大小
  checkFileSize(filePath, maxSize = 500 * 1024) { // 500KB limit
    try {
      const stats = fs.statSync(filePath);
      const sizeInKB = Math.round(stats.size / 1024);
      
      if (stats.size > maxSize) {
        this.results.largeFiles.push({
          file: filePath.replace(path.join(__dirname, '..'), ''),
          size: sizeInKB + 'KB',
          suggestion: '考虑代码分割或懒加载'
        });
      }
      
      this.results.totalSize += stats.size;
      this.results.fileCount++;
      
      return sizeInKB;
    } catch (error) {
      console.warn(`无法检查文件: ${filePath}`);
      return 0;
    }
  }

  // 扫描目录
  scanDirectory(dirPath, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        
        if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
          this.scanDirectory(fullPath, extensions);
        } else if (item.isFile() && extensions.some(ext => item.name.endsWith(ext))) {
          this.checkFileSize(fullPath);
          this.analyzeComponent(fullPath);
        }
      }
    } catch (error) {
      console.warn(`无法扫描目录: ${dirPath}`);
    }
  }

  // 分析组件潜在性能问题
  analyzeComponent(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      const suggestions = [];

      // 检查大型数据渲染
      if (content.includes('.map(') && content.length > 10000) {
        suggestions.push('检测到大型列表渲染，建议使用虚拟滚动或分页');
      }

      // 检查内联样式
      if (content.match(/style=\{/g)?.length > 5) {
        suggestions.push('检测到多处内联样式，建议提取到CSS模块');
      }

      // 检查未优化的图片
      if (content.includes('<img') && !content.includes('loading="lazy"')) {
        suggestions.push('建议为图片添加懒加载 loading="lazy"');
      }

      // 检查大型useEffect
      const useEffectMatches = content.match(/useEffect\([^)]+\)/g);
      if (useEffectMatches && useEffectMatches.some(match => match.length > 200)) {
        suggestions.push('检测到复杂的useEffect，建议拆分或优化');
      }

      // 检查未使用React.memo的组件
      if (content.includes('export default function') && 
          !content.includes('React.memo') && 
          content.includes('props') &&
          content.length > 5000) {
        suggestions.push('大型组件建议使用React.memo优化渲染');
      }

      if (suggestions.length > 0) {
        this.results.longLoadingComponents.push({
          file: filePath.replace(path.join(__dirname, '..'), ''),
          issues: suggestions
        });
      }
    } catch (error) {
      // 文件读取失败，跳过
    }
  }

  // 生成优化建议
  generateOptimizationSuggestions() {
    const suggestions = [];

    // 基于文件大小的建议
    if (this.results.largeFiles.length > 0) {
      suggestions.push({
        category: '代码分割',
        priority: 'high',
        description: `发现 ${this.results.largeFiles.length} 个大文件，建议进行代码分割`,
        actions: [
          '使用 React.lazy() 进行组件懒加载',
          '将大型数据文件分成多个小文件',
          '考虑使用动态导入 import()'
        ]
      });
    }

    // 基于总体大小的建议
    const totalSizeMB = this.results.totalSize / (1024 * 1024);
    if (totalSizeMB > 5) {
      suggestions.push({
        category: '包大小优化',
        priority: 'medium',
        description: `项目总大小 ${totalSizeMB.toFixed(2)}MB，建议优化`,
        actions: [
          '启用 gzip 压缩',
          '使用 webpack-bundle-analyzer 分析包大小',
          '移除未使用的依赖'
        ]
      });
    }

    // 图片优化建议
    suggestions.push({
      category: '图片优化',
      priority: 'medium',
      description: '优化图片加载性能',
      actions: [
        '使用 Next.js Image 组件',
        '启用图片懒加载',
        '使用 WebP 格式图片',
        '为图片添加适当的尺寸'
      ]
    });

    // 用户体验优化
    suggestions.push({
      category: '用户体验',
      priority: 'high',
      description: '提升加载体验',
      actions: [
        '添加 LoadingSpinner 组件',
        '实现骨架屏效果',
        '优化首屏加载时间',
        '添加错误边界处理'
      ]
    });

    this.results.optimizationSuggestions = suggestions;
  }

  // 运行完整检查
  runFullCheck() {
    console.log('🚀 开始性能检查...\n');

    // 扫描关键目录
    const srcPath = path.join(__dirname, '..', 'src');
    this.scanDirectory(srcPath);

    // 生成建议
    this.generateOptimizationSuggestions();

    // 输出报告
    this.printReport();
  }

  // 输出报告
  printReport() {
    console.log('📊 性能检查报告');
    console.log('='.repeat(50));
    
    // 基本统计
    console.log(`📁 扫描文件数: ${this.results.fileCount}`);
    console.log(`📦 总大小: ${(this.results.totalSize / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`⚠️  大文件数: ${this.results.largeFiles.length}`);
    console.log(`🐌 潜在性能问题: ${this.results.longLoadingComponents.length}\n`);

    // 大文件列表
    if (this.results.largeFiles.length > 0) {
      console.log('🔍 大文件列表:');
      this.results.largeFiles.forEach(file => {
        console.log(`  📄 ${file.file} (${file.size}) - ${file.suggestion}`);
      });
      console.log('');
    }

    // 组件性能问题
    if (this.results.longLoadingComponents.length > 0) {
      console.log('⚡ 组件性能建议:');
      this.results.longLoadingComponents.forEach(component => {
        console.log(`  📦 ${component.file}:`);
        component.issues.forEach(issue => {
          console.log(`    • ${issue}`);
        });
      });
      console.log('');
    }

    // 优化建议
    console.log('💡 优化建议:');
    this.results.optimizationSuggestions.forEach((suggestion, index) => {
      const priorityIcon = suggestion.priority === 'high' ? '🔴' : 
                          suggestion.priority === 'medium' ? '🟡' : '🟢';
      
      console.log(`\n${index + 1}. ${priorityIcon} ${suggestion.category} (${suggestion.priority})`);
      console.log(`   ${suggestion.description}`);
      console.log('   行动建议:');
      suggestion.actions.forEach(action => {
        console.log(`   • ${action}`);
      });
    });

    // 总结
    console.log('\n' + '='.repeat(50));
    console.log('🎯 性能评分:');
    
    let score = 100;
    score -= this.results.largeFiles.length * 10;
    score -= this.results.longLoadingComponents.length * 5;
    score = Math.max(score, 0);
    
    const grade = score >= 90 ? '🟢 优秀' : 
                  score >= 70 ? '🟡 良好' : 
                  score >= 50 ? '🟠 一般' : '🔴 需要改进';
    
    console.log(`总分: ${score}/100 ${grade}`);
    
    if (score < 70) {
      console.log('\n📋 下一步行动:');
      console.log('1. 优先处理大文件和代码分割');
      console.log('2. 实现组件懒加载');
      console.log('3. 优化图片和静态资源');
      console.log('4. 添加性能监控');
    }
  }
}

// 如果直接运行此脚本
const checker = new PerformanceChecker();
checker.runFullCheck(); 