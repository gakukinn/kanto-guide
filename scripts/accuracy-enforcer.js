const fs = require('fs');
const path = require('path');

console.log('🎯 综合数据准确性强制检查系统\n');

// 合并原有的4个数据准确性检查功能
class AccuracyEnforcer {
  constructor() {
    this.issues = [];
    this.blockedFiles = [];
    this.stats = {
      totalFiles: 0,
      validSources: 0,
      invalidSources: 0,
      fabricatedData: 0,
      tagErrors: 0
    };
    
    // 标签验证相关配置
    this.validRegions = ['东京', '埼玉', '千叶', '神奈川', '北关东', '甲信越'];
    this.validMonths = ['7月', '8月', '9月'];
  }

  // 1. 强制官方数据源验证
  enforceOfficialSources() {
    console.log('🔒 强制官方网站验证...');

    const level5Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level5') && f.endsWith('.ts'));

    level5Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.validateRealOfficialWebsite(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
      this.stats.totalFiles++;
    });
  }

  validateRealOfficialWebsite(filename, content) {
    // 检查是否有真正的官方网站（不是Walker Plus数据源）
    const websiteMatch = content.match(/website:\s*['"`]([^'"`]*?)['"`]/);
    
    if (!websiteMatch) {
      this.stats.invalidSources++;
      this.blockedFiles.push(filename);
      this.issues.push(`🚫 ${filename}: 缺少官方网站字段`);
      this.issues.push(`   必须在website字段中提供真正的官方网站（非Walker Plus）`);
      return;
    }

    const websiteUrl = websiteMatch[1];
    
    // 检查是否为空或Walker Plus
    if (!websiteUrl || websiteUrl.trim() === '' || websiteUrl.includes('walkerplus.com')) {
      this.stats.invalidSources++;
      this.blockedFiles.push(filename);
      this.issues.push(`🚫 ${filename}: 官方网站无效`);
      this.issues.push(`   website字段必须是真正的官方网站，不能是Walker Plus或空链接`);
      return;
    }

    // 验证官方网站格式
    const realOfficialDomains = ['.go.jp', '.city.jp', '.or.jp', '.ac.jp', '.jp/', '.com/', '.net/', '.org/'];
    const isValidOfficial = realOfficialDomains.some(domain => websiteUrl.includes(domain));
    
    if (!isValidOfficial) {
      this.stats.invalidSources++;
      this.blockedFiles.push(filename);
      this.issues.push(`🚫 ${filename}: 官方网站域名不符合要求`);
      this.issues.push(`   website: "${websiteUrl}" 不是有效的官方网站域名`);
    } else {
      this.stats.validSources++;
    }
  }

  // 2. 标签验证检查
  validateTags() {
    console.log('🏷️ 标签信息验证...');
    
    const level5Files = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.includes('level5') && f.endsWith('.ts'));

    level5Files.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.validateFileTags(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: 标签验证错误 - ${error.message}`);
        this.stats.tagErrors++;
      }
    });
  }

  validateFileTags(filename, content) {
    // 提取tags对象
    const tagsMatch = content.match(/tags:\s*{([^}]*)}/s);
    if (!tagsMatch) {
      this.issues.push(`❌ ${filename}: 缺少tags对象`);
      this.stats.tagErrors++;
      return;
    }
    
    const tagsContent = tagsMatch[1];
    
    // 提取各个标签字段
    const timeTagMatch = tagsContent.match(/timeTag:\s*['"`]([^'"`]*?)['"`]/);
    const regionTagMatch = tagsContent.match(/regionTag:\s*['"`]([^'"`]*?)['"`]/);
    const typeTagMatch = tagsContent.match(/typeTag:\s*['"`]([^'"`]*?)['"`]/);
    const layerTagMatch = tagsContent.match(/layerTag:\s*['"`]([^'"`]*?)['"`]/);
    
    let hasTagErrors = false;
    
    // 验证timeTag
    if (!timeTagMatch) {
      this.issues.push(`❌ ${filename}: 缺少timeTag字段`);
      hasTagErrors = true;
    } else if (!this.validMonths.includes(timeTagMatch[1])) {
      this.issues.push(`❌ ${filename}: timeTag无效 - "${timeTagMatch[1]}", 有效值: ${this.validMonths.join('、')}`);
      hasTagErrors = true;
    }
    
    // 验证regionTag
    if (!regionTagMatch) {
      this.issues.push(`❌ ${filename}: 缺少regionTag字段`);
      hasTagErrors = true;
    } else if (!this.validRegions.includes(regionTagMatch[1])) {
      this.issues.push(`❌ ${filename}: regionTag无效 - "${regionTagMatch[1]}", 有效值: ${this.validRegions.join('、')}`);
      hasTagErrors = true;
    }
    
    // 验证typeTag
    if (!typeTagMatch) {
      this.issues.push(`❌ ${filename}: 缺少typeTag字段`);
      hasTagErrors = true;
    } else if (typeTagMatch[1] !== '花火') {
      this.issues.push(`❌ ${filename}: typeTag错误 - "${typeTagMatch[1]}", 应该是: "花火"`);
      hasTagErrors = true;
    }
    
    // 验证layerTag
    if (!layerTagMatch) {
      this.issues.push(`❌ ${filename}: 缺少layerTag字段`);
      hasTagErrors = true;
    } else if (layerTagMatch[1] !== '详细介绍') {
      this.issues.push(`❌ ${filename}: layerTag错误 - "${layerTagMatch[1]}", 应该是: "详细介绍"`);
      hasTagErrors = true;
    }
    
    if (hasTagErrors) {
      this.stats.tagErrors++;
    }
  }

  // 3. 东京数据准确性检查
  checkTokyoAccuracy() {
    console.log('🗼 东京数据准确性检查...');
    
    const tokyoFile = path.join(__dirname, '../src/data/level4-july-tokyo-hanabi.ts');
    
    if (fs.existsSync(tokyoFile)) {
      const content = fs.readFileSync(tokyoFile, 'utf8');
      this.validateTokyoData(content);
    } else {
      this.issues.push('❌ Tokyo数据文件不存在');
    }
  }

  validateTokyoData(content) {
    // 检查可疑的精确数据
    const suspiciousPatterns = [
      /visitors:\s*['"`]322,?575['"`]/,  // 过于精确的访客数
      /visitors:\s*['"`]322575['"`]/,
      /visitors:\s*322575/
    ];

    suspiciousPatterns.forEach((pattern, index) => {
      if (pattern.test(content)) {
        this.stats.fabricatedData++;
        this.issues.push(`⚠️ Tokyo数据: 发现可疑的精确数据 (模式 ${index + 1})`);
      }
    });

    // 检查同日期多个活动（需要验证）
    const july26Events = (content.match(/date:\s*['"`]7月26日['"`]/g) || []).length;
    if (july26Events > 2) {
      this.issues.push(`⚠️ Tokyo数据: 7月26日有${july26Events}个活动，需要验证`);
    }

    // 检查异常数据
    if (content.includes('mikurajima') && content.includes('802')) {
      this.issues.push('⚠️ Tokyo数据: 御蔵岛数据异常 (802发花火, 1个赞)');
    }
  }

  // 4. 数据完整性强制执行
  enforceDataIntegrity() {
    console.log('💪 数据完整性强制执行...');
    
    const allDataFiles = fs.readdirSync(path.join(__dirname, '../src/data'))
      .filter(f => f.endsWith('.ts') && (f.includes('level4') || f.includes('level5')));

    allDataFiles.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../src/data', file), 'utf8');
        this.enforceDataStandards(file, content);
      } catch (error) {
        this.issues.push(`❌ ${file}: ${error.message}`);
      }
    });
  }

  enforceDataStandards(filename, content) {
    // 精确字段检查 - 区分不同字段的语言要求
    this.checkFieldLanguageAccuracy(filename, content);

    // 强制真实数据检查
    const fabricatedPatterns = [
      /maruchiba\.jp/,
      /kanagawa-kankou\.or\.jp/,
      /koshintabi\.com/,
      /example\.com/,
      /test\.jp/
    ];

    fabricatedPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        this.stats.fabricatedData++;
        this.blockedFiles.push(filename);
        this.issues.push(`🚫 ${filename}: 检测到虚假数据源`);
      }
    });

    // 检查必填字段 - 只检查HanabiData接口中实际存在的字段
    if (filename.includes('level5')) {
      const requiredLevel5Fields = ['name:', 'date:', 'contact:', 'mapInfo:', 'weatherInfo:'];
      requiredLevel5Fields.forEach(field => {
        if (!content.includes(field)) {
          this.issues.push(`⚠️ ${filename}: 缺少Level5必填字段: ${field.replace(':', '')}:`);
        }
      });
    }
  }

  // 精确字段语言检查
  checkFieldLanguageAccuracy(filename, content) {
    // 1. 检查japaneseName字段 - 必须是日文（汉字+假名都是日文）
    const japaneseNameMatch = content.match(/japaneseName:\s*['"`]([^'"`]*?)['"`]/);
    if (japaneseNameMatch) {
      const japaneseNameValue = japaneseNameMatch[1];
      // 检查japaneseName是否包含明显的非日文字符（如纯英文字母序列）
      if (/^[a-zA-Z\s]+$/.test(japaneseNameValue)) {
        this.issues.push(`⚠️ ${filename}: japaneseName字段"${japaneseNameValue}"应该使用日文，当前为英文`);
      }
      // 日文可以包含汉字和假名的任意组合，所以不再检查汉字是否为"中文"
    }

    // 2. 检查name字段 - 必须是中文
    const nameMatch = content.match(/name:\s*['"`]([^'"`]*?)['"`]/);
    if (nameMatch) {
      const nameValue = nameMatch[1];
      // 检查name是否包含日文假名（不应该有）
      if (/[ひらがなカタカナァ-ヴー]/.test(nameValue)) {
        this.issues.push(`🚫 ${filename}: name字段"${nameValue}"严禁使用日文假名，必须使用中文`);
        this.blockedFiles.push(filename);
      }
    }

    // 3. 检查englishName字段 - 必须是英文
    const englishNameMatch = content.match(/englishName:\s*['"`]([^'"`]*?)['"`]/);
    if (englishNameMatch) {
      const englishNameValue = englishNameMatch[1];
      // 检查englishName是否包含中文或日文（不应该有）
      if (/[\u4e00-\u9fff]/.test(englishNameValue) || /[ひらがなカタカナァ-ヴー]/.test(englishNameValue)) {
        this.issues.push(`🚫 ${filename}: englishName字段"${englishNameValue}"严禁使用中文或日文，必须使用英文`);
        this.blockedFiles.push(filename);
      }
    }

    // 4. 检查页面展示字段 - 除了japaneseName和注释外，不能有假名
    const displayContentOnly = content
      .replace(/japaneseName:\s*['"`][^'"`]*?['"`]/g, '') // 移除japaneseName字段
      .replace(/englishName:\s*['"`][^'"`]*?['"`]/g, '') // 移除englishName字段
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
      .replace(/\/\/.*$/gm, ''); // 移除单行注释

    if (/[ひらがなカタカナァ-ヴー]/.test(displayContentOnly)) {
      // 找出具体哪些字段包含假名
      const fieldsWithKana = [];
      const fieldMatches = displayContentOnly.match(/(\w+):\s*['"`][^'"`]*[ひらがなカタカナァ-ヴー][^'"`]*['"`]/g);
      if (fieldMatches) {
        fieldMatches.forEach(match => {
          const fieldName = match.match(/(\w+):/)[1];
          if (fieldName !== 'japaneseName') {
            fieldsWithKana.push(fieldName);
          }
        });
      }
      
      this.issues.push(`🚫 ${filename}: 除japaneseName和注释外的页面展示字段严禁使用日文假名字符`);
      if (fieldsWithKana.length > 0) {
        this.issues.push(`   问题字段: ${fieldsWithKana.join(', ')}`);
      }
      this.blockedFiles.push(filename);
    }
  }

  // 5. 绝对数据源强制执行
  absoluteSourceEnforcement() {
    console.log('⚡ 绝对数据源强制执行...');
    
    // 检查是否有文件被标记为需要官方源验证
    const markerFile = path.join(__dirname, '../.source-verification-required');
    
    if (fs.existsSync(markerFile)) {
      const requiredFiles = fs.readFileSync(markerFile, 'utf8')
        .split('\n')
        .filter(line => line.trim());
      
      requiredFiles.forEach(file => {
        if (file && !this.hasValidOfficialSource(file)) {
          this.blockedFiles.push(file);
          this.issues.push(`🔒 ${file}: 等待官方数据源验证`);
        }
      });
    }
  }

  hasValidOfficialSource(filename) {
    try {
      const content = fs.readFileSync(path.join(__dirname, '../src/data', filename), 'utf8');
      // 检查是否有真正的官方网站（不是Walker Plus数据源）
      const websiteMatch = content.match(/website:\s*['"`]([^'"`]*?)['"`]/);
      if (websiteMatch) {
        const websiteUrl = websiteMatch[1];
        // 真正的官方网站域名（排除Walker Plus）
        const realOfficialDomains = ['.go.jp', '.city.jp', '.or.jp', '.ac.jp', '.jp/', '.com/', '.net/', '.org/', 'sagamihara.com'];
        // 确保不是Walker Plus或空链接
        const isValidOfficial = realOfficialDomains.some(domain => websiteUrl.includes(domain)) && 
                               !websiteUrl.includes('walkerplus.com') && 
                               websiteUrl.trim() !== '';
        return isValidOfficial;
      }
      return false;
    } catch {
      return false;
    }
  }

  // 创建阻止机制
  createBlockingMechanism() {
    if (this.blockedFiles.length > 0) {
      console.log('\n🚫 创建数据阻止机制...');
      
      // 创建阻止文件列表
      const blockListPath = path.join(__dirname, '../.blocked-files');
      fs.writeFileSync(blockListPath, this.blockedFiles.join('\n'));
      
      console.log(`   已阻止 ${this.blockedFiles.length} 个文件，直到提供官方数据源`);
    }
  }

  // 生成报告
  generateReport() {
    console.log('\n📊 数据准确性检查报告:');
    console.log(`   检查文件数: ${this.stats.totalFiles}`);
    console.log(`   有效数据源: ${this.stats.validSources}`);
    console.log(`   无效数据源: ${this.stats.invalidSources}`);
    console.log(`   虚假数据: ${this.stats.fabricatedData}`);
    console.log(`   标签错误: ${this.stats.tagErrors}`);
    console.log(`   阻止文件数: ${this.blockedFiles.length}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 准确性问题:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    } else {
      console.log('\n✅ 数据准确性检查通过！');
    }

    if (this.blockedFiles.length > 0) {
      console.log('\n🚫 阻止的文件:');
      this.blockedFiles.forEach(file => console.log(`   ${file}`));
    }

    this.createBlockingMechanism();

    return {
      success: this.issues.length === 0 && this.blockedFiles.length === 0,
      totalIssues: this.issues.length,
      blockedFiles: this.blockedFiles.length,
      stats: this.stats
    };
  }

  // 运行所有检查
  runAllChecks() {
    this.enforceOfficialSources();
    this.validateTags();
    this.checkTokyoAccuracy();
    this.enforceDataIntegrity();
    this.absoluteSourceEnforcement();
    return this.generateReport();
  }
}

// 执行检查
const enforcer = new AccuracyEnforcer();
const result = enforcer.runAllChecks();

if (result.blockedFiles > 0) {
  console.log('\n🛑 由于数据准确性问题，部分文件已被阻止');
  process.exit(2); // 特殊退出码表示有阻止的文件
} else {
  process.exit(result.success ? 0 : 1);
} 