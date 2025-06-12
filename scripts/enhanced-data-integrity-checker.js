/**
 * 增强版数据完整性检查器
 * 新增标签验证功能
 */
const fs = require('fs');
const path = require('path');

console.log('🔍 增强版数据完整性检查系统\n');

class EnhancedDataIntegrityChecker {
  constructor() {
    this.issues = [];
    this.tagIssues = [];
    this.stats = {
      totalFiles: 0,
      validFiles: 0,
      errorFiles: 0,
      filesWithTags: 0,
      missingTags: 0
    };
  }

  // 新增：检查文件标识标签
  checkFileIdentifiers() {
    console.log('🏷️ 检查文件标识标签...');
    
    const patterns = [
      { dir: 'src/app', pattern: '**/page.tsx', type: '页面文件' },
      { dir: 'src/data', pattern: '**/*-hanabi.ts', type: '数据文件' }
    ];

    patterns.forEach(({ dir, pattern, type }) => {
      this.scanDirectoryForTags(dir, type);
    });
  }

  scanDirectoryForTags(dirPath, fileType) {
    const fullDir = path.join(__dirname, '..', dirPath);
    if (!fs.existsSync(fullDir)) return;

    this.scanRecursive(fullDir, fileType);
  }

  scanRecursive(dir, fileType) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // 跳过不需要的目录
          if (item.includes('node_modules') || item.includes('.git')) {
            continue;
          }
          this.scanRecursive(fullPath, fileType);
        } else if (this.shouldCheckFile(item, fileType)) {
          this.validateFileTags(fullPath, fileType);
        }
      }
    } catch (error) {
      console.error(`扫描目录错误 ${dir}:`, error.message);
    }
  }

  shouldCheckFile(filename, fileType) {
    if (fileType === '页面文件') {
      return filename === 'page.tsx';
    } else if (fileType === '数据文件') {
      return filename.endsWith('-hanabi.ts');
    }
    return false;
  }

  validateFileTags(filePath, fileType) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      
      this.stats.totalFiles++;
      
      // 检查是否包含必要标签
      const requiredTags = ['@layer', '@type'];
      const optionalTags = ['@month', '@region', '@event', '@path', '@description'];
      
      let hasAllRequired = true;
      const missingTags = [];
      
      requiredTags.forEach(tag => {
        if (!content.includes(tag)) {
          hasAllRequired = false;
          missingTags.push(tag);
        }
      });

      if (hasAllRequired) {
        this.stats.filesWithTags++;
        
        // 验证标签内容的正确性
        this.validateTagContent(content, relativePath, fileType);
      } else {
        this.stats.missingTags++;
        this.tagIssues.push({
          file: relativePath,
          type: '缺少标签',
          details: `缺少必要标签: ${missingTags.join(', ')}`
        });
      }

      // 检查标签格式
      this.validateTagFormat(content, relativePath);
      
    } catch (error) {
      this.issues.push(`❌ 无法读取文件 ${filePath}: ${error.message}`);
      this.stats.errorFiles++;
    }
  }

  validateTagContent(content, filePath, fileType) {
    // 验证@layer标签内容
    const layerMatch = content.match(/@layer\s+(.+)/);
    if (layerMatch) {
      const layer = layerMatch[1].trim();
      const validLayers = ['三层', '四层', '五层', '三层 (Activity Layer)', '四层 (Regional Layer)', '五层 (Detail Layer)'];
      
      if (!validLayers.some(valid => layer.includes(valid))) {
        this.tagIssues.push({
          file: filePath,
          type: '标签内容错误',
          details: `@layer标签内容不正确: ${layer}`
        });
      }
    }

    // 验证@month标签内容
    const monthMatch = content.match(/@month\s+(.+)/);
    if (monthMatch) {
      const month = monthMatch[1].trim();
      const validMonths = ['7月', '8月', '9月'];
      
      if (!validMonths.includes(month)) {
        this.tagIssues.push({
          file: filePath,
          type: '标签内容错误',
          details: `@month标签内容不正确: ${month}`
        });
      }
    }

    // 验证@region标签内容
    const regionMatch = content.match(/@region\s+(.+)/);
    if (regionMatch) {
      const region = regionMatch[1].trim();
      const validRegions = ['东京', '埼玉', '千叶', '神奈川', '北关东', '甲信越'];
      
      if (!validRegions.includes(region)) {
        this.tagIssues.push({
          file: filePath,
          type: '标签内容错误',
          details: `@region标签内容不正确: ${region}`
        });
      }
    }
  }

  validateTagFormat(content, filePath) {
    // 检查标签格式是否正确
    const tagLines = content.split('\n').filter(line => line.includes('@'));
    
    tagLines.forEach(line => {
      if (line.includes('@') && !line.match(/\*\s*@\w+/)) {
        this.tagIssues.push({
          file: filePath,
          type: '标签格式错误',
          details: `标签格式不正确: ${line.trim()}`
        });
      }
    });
  }

  // 原有的数据检查功能
  checkJulyData() {
    console.log('📅 检查July数据完整性...');
    const julyDataDir = path.join(__dirname, '../src/data');
    const julyFiles = fs.readdirSync(julyDataDir)
      .filter(f => f.includes('july') && f.endsWith('.ts'))
      .filter(f => !f.includes('level5'));

    julyFiles.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(julyDataDir, file), 'utf8');
        this.validateDataStructure(file, content);
        this.stats.validFiles++;
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
        this.stats.errorFiles++;
      }
    });
  }

  validateDataStructure(filename, content) {
    const requiredFields = ['name', 'date', 'area', 'likes'];
    
    requiredFields.forEach(field => {
      if (!content.includes(`${field}:`)) {
        throw new Error(`缺少必填字段: ${field}`);
      }
    });

    if (/[ひらがなカタカナ]/.test(content)) {
      this.issues.push(`⚠️ ${filename}: 检测到日文字符，需要中文化`);
    }
  }

  // 生成增强报告
  generateEnhancedReport() {
    console.log('\n📊 增强版数据完整性检查报告:');
    console.log(`   总文件数: ${this.stats.totalFiles}`);
    console.log(`   有标签文件: ${this.stats.filesWithTags}`);
    console.log(`   缺少标签文件: ${this.stats.missingTags}`);
    console.log(`   标签覆盖率: ${Math.round((this.stats.filesWithTags / this.stats.totalFiles) * 100)}%`);
    
    if (this.tagIssues.length > 0) {
      console.log('\n🏷️ 标签相关问题:');
      this.tagIssues.forEach(issue => {
        console.log(`   ❌ ${issue.file}: ${issue.details}`);
      });
    }

    if (this.issues.length > 0) {
      console.log('\n🚨 数据完整性问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    }

    const allIssues = this.issues.length + this.tagIssues.length;
    
    if (allIssues === 0) {
      console.log('\n✅ 所有检查通过！');
    }

    return {
      success: allIssues === 0,
      totalIssues: allIssues,
      tagIssues: this.tagIssues.length,
      dataIssues: this.issues.length,
      stats: this.stats
    };
  }

  // 运行增强检查
  runEnhancedChecks() {
    this.checkFileIdentifiers();
    this.checkJulyData();
    return this.generateEnhancedReport();
  }
}

// 执行增强检查
const checker = new EnhancedDataIntegrityChecker();
const result = checker.runEnhancedChecks();

process.exit(result.success ? 0 : 1); 