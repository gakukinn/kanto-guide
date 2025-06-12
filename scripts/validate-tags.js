const fs = require('fs');
const path = require('path');

console.log('🏷️ 五层页面标签验证系统\n');

class TagValidator {
  constructor() {
    this.issues = [];
    this.stats = {
      totalFiles: 0,
      validTags: 0,
      invalidTags: 0,
      missingTags: 0
    };
    
    // 正确的地区标签映射 - 根据用户说明，地区只有这6个
    this.regionMapping = {
      'tokyo': '东京',
      'saitama': '埼玉', 
      'chiba': '千叶',
      'kanagawa': '神奈川',
      'kitakanto': '北关东',
      'koshinetsu': '甲信越'
    };
    
    // 月份标签映射
    this.monthMapping = {
      'july': '7月',
      'august': '8月', 
      'september': '9月'
    };
    
    // 标准地区名称（不带县、都后缀）
    this.validRegions = ['东京', '埼玉', '千叶', '神奈川', '北关东', '甲信越'];
  }

  // 从文件名推断正确的地区和月份
  inferCorrectTags(filename) {
    let correctRegion = null;
    let correctMonth = null;
    
    // 推断地区
    for (const [key, value] of Object.entries(this.regionMapping)) {
      if (filename.includes(key)) {
        correctRegion = value;
        break;
      }
    }
    
    // 推断月份
    for (const [key, value] of Object.entries(this.monthMapping)) {
      if (filename.includes(key)) {
        correctMonth = value;
        break;
      }
    }
    
    return { correctRegion, correctMonth };
  }

  // 验证单个文件的标签
  validateFileTags(filename) {
    try {
      const filePath = path.join(__dirname, '../src/data', filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 提取tags对象
      const tagsMatch = content.match(/tags:\s*{([^}]*)}/s);
      if (!tagsMatch) {
        this.issues.push(`❌ ${filename}: 缺少tags对象`);
        this.stats.missingTags++;
        return;
      }
      
      const tagsContent = tagsMatch[1];
      
      // 提取各个标签字段
      const timeTagMatch = tagsContent.match(/timeTag:\s*['"`]([^'"`]*?)['"`]/);
      const regionTagMatch = tagsContent.match(/regionTag:\s*['"`]([^'"`]*?)['"`]/);
      const typeTagMatch = tagsContent.match(/typeTag:\s*['"`]([^'"`]*?)['"`]/);
      const layerTagMatch = tagsContent.match(/layerTag:\s*['"`]([^'"`]*?)['"`]/);
      
      const currentTags = {
        timeTag: timeTagMatch ? timeTagMatch[1] : null,
        regionTag: regionTagMatch ? regionTagMatch[1] : null,
        typeTag: typeTagMatch ? typeTagMatch[1] : null,
        layerTag: layerTagMatch ? layerTagMatch[1] : null
      };
      
      // 推断正确的标签
      const { correctRegion, correctMonth } = this.inferCorrectTags(filename);
      
      let hasErrors = false;
      
      // 验证timeTag
      if (!currentTags.timeTag) {
        this.issues.push(`❌ ${filename}: 缺少timeTag字段`);
        hasErrors = true;
      } else if (correctMonth && currentTags.timeTag !== correctMonth) {
        this.issues.push(`❌ ${filename}: timeTag错误 - 当前: "${currentTags.timeTag}", 应该是: "${correctMonth}"`);
        hasErrors = true;
      }
      
      // 验证regionTag - 必须是标准地区名称（不带县、都后缀）
      if (!currentTags.regionTag) {
        this.issues.push(`❌ ${filename}: 缺少regionTag字段`);
        hasErrors = true;
      } else {
        // 检查是否使用了带后缀的地区名称
        const hasInvalidSuffix = currentTags.regionTag.includes('县') || 
                                currentTags.regionTag.includes('都') || 
                                currentTags.regionTag.includes('府');
        
        if (hasInvalidSuffix) {
          this.issues.push(`❌ ${filename}: regionTag不应包含"县"、"都"、"府"后缀 - 当前: "${currentTags.regionTag}", 应该是: "${correctRegion}"`);
          hasErrors = true;
        } else if (correctRegion && currentTags.regionTag !== correctRegion) {
          this.issues.push(`❌ ${filename}: regionTag错误 - 当前: "${currentTags.regionTag}", 应该是: "${correctRegion}"`);
          hasErrors = true;
        } else if (!this.validRegions.includes(currentTags.regionTag)) {
          this.issues.push(`❌ ${filename}: regionTag不在有效地区列表中 - 当前: "${currentTags.regionTag}", 有效地区: ${this.validRegions.join('、')}`);
          hasErrors = true;
        }
      }
      
      // 验证typeTag
      if (!currentTags.typeTag) {
        this.issues.push(`❌ ${filename}: 缺少typeTag字段`);
        hasErrors = true;
      } else if (currentTags.typeTag !== '花火') {
        this.issues.push(`❌ ${filename}: typeTag错误 - 当前: "${currentTags.typeTag}", 应该是: "花火"`);
        hasErrors = true;
      }
      
      // 验证layerTag - Level 5应该是"详细介绍"
      if (!currentTags.layerTag) {
        this.issues.push(`❌ ${filename}: 缺少layerTag字段`);
        hasErrors = true;
      } else if (currentTags.layerTag !== '详细介绍') {
        this.issues.push(`❌ ${filename}: layerTag错误 - 当前: "${currentTags.layerTag}", 应该是: "详细介绍"`);
        hasErrors = true;
      }
      
      if (hasErrors) {
        this.stats.invalidTags++;
      } else {
        this.stats.validTags++;
      }
      
    } catch (error) {
      this.issues.push(`❌ ${filename}: 读取文件错误 - ${error.message}`);
      this.stats.invalidTags++;
    }
  }

  // 验证所有Level 5文件
  validateAllTags() {
    console.log('🔍 检查所有Level 5文件的标签信息...\n');
    
    const dataDir = path.join(__dirname, '../src/data');
    const level5Files = fs.readdirSync(dataDir)
      .filter(f => f.includes('level5') && f.endsWith('.ts'))
      .sort();
    
    console.log(`📊 发现 ${level5Files.length} 个Level 5文件\n`);
    
    level5Files.forEach(filename => {
      this.stats.totalFiles++;
      this.validateFileTags(filename);
    });
  }

  // 生成修复建议
  generateFixSuggestions() {
    if (this.issues.length === 0) return;
    
    console.log('\n🔧 修复建议:\n');
    
    // 按文件分组问题
    const fileIssues = {};
    this.issues.forEach(issue => {
      const match = issue.match(/❌ ([^:]+):/);
      if (match) {
        const filename = match[1];
        if (!fileIssues[filename]) {
          fileIssues[filename] = [];
        }
        fileIssues[filename].push(issue);
      }
    });
    
    Object.entries(fileIssues).forEach(([filename, issues]) => {
      console.log(`📝 ${filename}:`);
      issues.forEach(issue => {
        console.log(`   ${issue.replace(`❌ ${filename}: `, '• ')}`);
      });
      
      // 提供具体的修复代码
      const { correctRegion, correctMonth } = this.inferCorrectTags(filename);
      if (correctRegion || correctMonth) {
        console.log(`   💡 建议的tags配置:`);
        console.log(`   tags: {`);
        if (correctMonth) console.log(`     timeTag: '${correctMonth}',`);
        if (correctRegion) console.log(`     regionTag: '${correctRegion}',`);
        console.log(`     typeTag: '花火',`);
        console.log(`     layerTag: '详细介绍'`);
        console.log(`   },\n`);
      }
    });
  }

  // 生成报告
  generateReport() {
    console.log('📊 标签验证报告:\n');
    console.log(`   总文件数: ${this.stats.totalFiles}`);
    console.log(`   标签正确: ${this.stats.validTags}`);
    console.log(`   标签错误: ${this.stats.invalidTags}`);
    console.log(`   缺少标签: ${this.stats.missingTags}`);
    console.log(`   正确率: ${Math.round((this.stats.validTags / this.stats.totalFiles) * 100)}%`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 发现的标签问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
      
      this.generateFixSuggestions();
      
      console.log('🎯 标准标签格式（根据页面层级结构）:');
      console.log('   tags: {');
      console.log('     timeTag: "月份",        // 如："7月"、"8月"、"9月"');
      console.log('     regionTag: "地区",      // 只能是：东京、埼玉、千叶、神奈川、北关东、甲信越');
      console.log('     typeTag: "花火",        // 固定为"花火"');
      console.log('     layerTag: "详细介绍"    // Level 5固定为"详细介绍"');
      console.log('   }');
      console.log('\n📋 页面层级结构:');
      console.log('   • 二层：月份活动');
      console.log('   • 三层：月份活动地区');
      console.log('   • 四层：月份活动地区列表');
      console.log('   • 五层：详细介绍');
      console.log('   • 信息来源：主要是Walker Plus');
      
      return false;
    } else {
      console.log('\n✅ 所有标签都正确！');
      return true;
    }
  }

  // 运行完整验证
  runValidation() {
    this.validateAllTags();
    return this.generateReport();
  }
}

// 执行验证
const validator = new TagValidator();
const success = validator.runValidation();

process.exit(success ? 0 : 1); 