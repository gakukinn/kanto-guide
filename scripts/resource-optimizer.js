const fs = require('fs');
const path = require('path');

console.log('🚀 综合资源优化工具\n');

// 合并图片验证、SEO优化等功能
class ResourceOptimizer {
  constructor() {
    this.issues = [];
    this.optimizations = [];
    this.stats = {
      totalImages: 0,
      validImages: 0,
      missingImages: 0,
      seoOptimized: 0
    };
  }

  // 1. 图片资源验证和优化
  validateAndOptimizeImages() {
    console.log('🖼️ 图片资源验证和优化...');
    
    const allDataFiles = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.endsWith('.ts'));

    allDataFiles.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.checkImagePaths(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
    });
  }

  checkImagePaths(filename, content) {
    // 检查图片路径
    const imagePathRegex = /(?:image|src|hero):\s*['"`]([^'"`]+\.(jpg|jpeg|png|svg|webp))['"`]/gi;
    let match;
    
    while ((match = imagePathRegex.exec(content)) !== null) {
      const imagePath = match[1];
      this.stats.totalImages++;
      
      // 检查图片文件是否存在
      const fullImagePath = path.join(__dirname, '../public', imagePath.replace(/^\//, ''));
      
      if (fs.existsSync(fullImagePath)) {
        this.stats.validImages++;
      } else {
        this.stats.missingImages++;
        this.issues.push(`❌ ${filename}: 图片不存在 - ${imagePath}`);
        
        // 提供修复建议
        this.generateImageSuggestion(filename, imagePath);
      }
    }
  }

  generateImageSuggestion(filename, imagePath) {
    // 根据文件名推荐合适的图片
    const region = this.extractRegion(filename);
    const event = this.extractEvent(filename);
    
    const suggestions = [
      `创建图片: public${imagePath}`,
      `使用通用${region}地区图片`,
      `使用通用花火图片作为占位符`
    ];
    
    this.optimizations.push(`💡 ${filename}: ${suggestions.join(' 或 ')}`);
  }

  extractRegion(filename) {
    if (filename.includes('tokyo')) return '东京';
    if (filename.includes('saitama')) return '埼玉';
    if (filename.includes('chiba')) return '千叶';
    if (filename.includes('kanagawa')) return '神奈川';
    return '关东';
  }

  extractEvent(filename) {
    const eventMatch = filename.match(/level5-[^-]+-[^-]+-([^.]+)/);
    return eventMatch ? eventMatch[1] : 'hanabi';
  }

  // 2. SEO优化检查
  optimizeSEO() {
    console.log('🔍 SEO优化检查...');
    
    const pageFiles = this.findPageFiles();
    
    pageFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        this.analyzeSEO(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
    });
  }

  findPageFiles() {
    const pageFiles = [];
    const appDir = path.join(__dirname, '../src/app');
    
    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          walkDir(fullPath);
        } else if (file === 'page.tsx') {
          pageFiles.push(fullPath);
        }
      });
    };
    
    if (fs.existsSync(appDir)) {
      walkDir(appDir);
    }
    
    return pageFiles;
  }

  analyzeSEO(filePath, content) {
    const relativePath = path.relative(path.join(__dirname, '../src/app'), filePath);
    
    // 检查基本SEO元素
    const seoChecks = [
      { pattern: /export\s+const\s+metadata/, name: 'metadata导出' },
      { pattern: /title:\s*['"`]/, name: '页面标题' },
      { pattern: /description:\s*['"`]/, name: '页面描述' },
      { pattern: /keywords:\s*['"`]/, name: '关键词' }
    ];
    
    let seoScore = 0;
    seoChecks.forEach(check => {
      if (check.pattern.test(content)) {
        seoScore++;
      } else {
        this.issues.push(`⚠️ ${relativePath}: 缺少${check.name}`);
      }
    });
    
    if (seoScore === seoChecks.length) {
      this.stats.seoOptimized++;
    }
    
    // 生成SEO优化建议
    if (seoScore < seoChecks.length) {
      this.generateSEOSuggestions(relativePath, content);
    }
  }

  generateSEOSuggestions(filePath, content) {
    const suggestions = [];
    
    if (!content.includes('export const metadata')) {
      suggestions.push('添加metadata导出');
    }
    
    if (!content.includes('title:')) {
      suggestions.push('添加页面标题');
    }
    
    if (!content.includes('description:')) {
      suggestions.push('添加页面描述');
    }
    
    if (!content.includes('keywords:')) {
      suggestions.push('添加关键词');
    }
    
    if (suggestions.length > 0) {
      this.optimizations.push(`🔧 ${filePath}: ${suggestions.join(', ')}`);
    }
  }

  // 3. 性能优化建议
  generatePerformanceOptimizations() {
    console.log('⚡ 性能优化建议...');
    
    const optimizations = [
      '🖼️ 使用WebP格式优化图片',
      '📱 添加响应式图片支持',
      '🚀 启用图片懒加载',
      '💾 添加图片缓存策略',
      '🔄 使用CDN加速图片加载',
      '📊 优化图片尺寸和压缩质量'
    ];
    
    this.optimizations.push(...optimizations.map(opt => `💡 性能优化: ${opt}`));
  }

  // 4. 资源清理建议
  generateCleanupSuggestions() {
    console.log('🧹 资源清理建议...');
    
    // 检查未使用的图片
    const publicImagesDir = path.join(__dirname, '../public/images');
    if (fs.existsSync(publicImagesDir)) {
      const allImages = this.getAllImages(publicImagesDir);
      const usedImages = this.getUsedImages();
      
      const unusedImages = allImages.filter(img => !usedImages.includes(img));
      
      if (unusedImages.length > 0) {
        this.optimizations.push(`🗑️ 发现${unusedImages.length}个未使用的图片文件可以清理`);
        unusedImages.forEach(img => {
          this.optimizations.push(`   • ${img}`);
        });
      }
    }
  }

  getAllImages(dir) {
    const images = [];
    const walkDir = (currentDir) => {
      const files = fs.readdirSync(currentDir);
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          walkDir(fullPath);
        } else if (/\.(jpg|jpeg|png|svg|webp)$/i.test(file)) {
          images.push(path.relative(path.join(__dirname, '../public'), fullPath));
        }
      });
    };
    walkDir(dir);
    return images;
  }

  getUsedImages() {
    const usedImages = [];
    const dataDir = path.join(__dirname, '../src/data');
    
    fs.readdirSync(dataDir)
      .filter(f => f.endsWith('.ts'))
      .forEach(file => {
        try {
          const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
          const imageMatches = content.match(/['"`]([^'"`]*\.(jpg|jpeg|png|svg|webp))['"`]/gi);
          if (imageMatches) {
            imageMatches.forEach(match => {
              const imagePath = match.replace(/['"`]/g, '').replace(/^\//, '');
              usedImages.push(imagePath);
            });
          }
        } catch (error) {
          // 忽略错误文件
        }
      });
    
    return [...new Set(usedImages)];
  }

  // 生成优化报告
  generateReport() {
    console.log('\n📊 资源优化报告:');
    console.log(`   总图片数: ${this.stats.totalImages}`);
    console.log(`   有效图片: ${this.stats.validImages}`);
    console.log(`   缺失图片: ${this.stats.missingImages}`);
    console.log(`   SEO优化页面: ${this.stats.seoOptimized}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 发现的问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    }
    
    if (this.optimizations.length > 0) {
      console.log('\n💡 优化建议:');
      this.optimizations.forEach(opt => console.log(`   ${opt}`));
    }
    
    if (this.issues.length === 0 && this.optimizations.length === 0) {
      console.log('\n✅ 资源状态良好，无需优化！');
    }

    return {
      success: this.issues.length === 0,
      totalIssues: this.issues.length,
      totalOptimizations: this.optimizations.length,
      stats: this.stats
    };
  }

  // 运行所有优化检查
  runAllOptimizations() {
    this.validateAndOptimizeImages();
    this.optimizeSEO();
    this.generatePerformanceOptimizations();
    this.generateCleanupSuggestions();
    return this.generateReport();
  }
}

// 执行优化检查
const optimizer = new ResourceOptimizer();
const result = optimizer.runAllOptimizations();

process.exit(result.success ? 0 : 1); 