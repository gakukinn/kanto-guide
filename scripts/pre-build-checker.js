#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { validatePageTemplate } = require('./create-standard-page-template');

class PreBuildChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.fixed = [];
  }

  // 检查Next.js特定问题
  checkNextJSIssues() {
    console.log('🔍 检查Next.js特定问题...');
    
    const pageFiles = this.getAllPageFiles();
    
    pageFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      
      // 检查'use client'和metadata共存问题
      if (content.includes("'use client'") && content.includes('export const metadata')) {
        this.errors.push({
          file,
          issue: "Next.js错误: 'use client'组件不能导出metadata",
          fix: "移除metadata导出或移除'use client'指令",
          autoFixable: true
        });
      }

      // 检查导入路径问题
      const importMatches = content.match(/import.*from ['"`]@\/data\/([^'"`]+)['"`]/g);
      if (importMatches) {
        importMatches.forEach(importLine => {
          const pathMatch = importLine.match(/['"`]@\/data\/([^'"`]+)['"`]/);
          if (pathMatch) {
            const importPath = pathMatch[1];
            const fullPath = path.join(process.cwd(), 'src/data', importPath + '.ts');
            if (!fs.existsSync(fullPath)) {
              this.errors.push({
                file,
                issue: `导入文件不存在: ${importPath}`,
                fix: "检查文件路径或创建缺失文件",
                autoFixable: false
              });
            }
          }
        });
      }
    });
  }

  // 检查数据文件语法
  checkDataFileSyntax() {
    console.log('🔍 检查数据文件语法...');
    
    const dataFiles = this.getAllDataFiles();
    
    dataFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        
        // 检查常见的语法错误
        this.checkMissingCommas(file, content);
        this.checkBracketMatching(file, content);
        this.checkQuoteMatching(file, content);
        
      } catch (error) {
        this.errors.push({
          file,
          issue: `文件读取错误: ${error.message}`,
          fix: "检查文件编码或权限",
          autoFixable: false
        });
      }
    });
  }

  // 检查缺失逗号
  checkMissingCommas(file, content) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // 检查对象属性后缺少逗号的情况
      if (line.trim().endsWith('}') && 
          lines[index + 1] && 
          lines[index + 1].trim().match(/^[a-zA-Z_$][a-zA-Z0-9_$]*:/)) {
        this.errors.push({
          file,
          issue: `第${index + 1}行: 可能缺少逗号`,
          line: index + 1,
          content: line.trim(),
          fix: "在}后添加逗号",
          autoFixable: true
        });
      }
    });
  }

  // 检查括号匹配
  checkBracketMatching(file, content) {
    let braceCount = 0;
    let bracketCount = 0;
    let parenCount = 0;
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      switch (char) {
        case '{': braceCount++; break;
        case '}': braceCount--; break;
        case '[': bracketCount++; break;
        case ']': bracketCount--; break;
        case '(': parenCount++; break;
        case ')': parenCount--; break;
      }
    }
    
    if (braceCount !== 0) {
      this.errors.push({
        file,
        issue: `括号不匹配: 花括号数量不平衡 (${braceCount})`,
        fix: "检查并修复花括号匹配",
        autoFixable: false
      });
    }
    
    if (bracketCount !== 0) {
      this.errors.push({
        file,
        issue: `括号不匹配: 方括号数量不平衡 (${bracketCount})`,
        fix: "检查并修复方括号匹配",
        autoFixable: false
      });
    }
  }

  // 检查引号匹配
  checkQuoteMatching(file, content) {
    let singleQuotes = 0;
    let doubleQuotes = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const prevChar = content[i - 1];
      
      if (char === "'" && prevChar !== '\\' && !inDoubleQuote) {
        inSingleQuote = !inSingleQuote;
        singleQuotes++;
      } else if (char === '"' && prevChar !== '\\' && !inSingleQuote) {
        inDoubleQuote = !inDoubleQuote;
        doubleQuotes++;
      }
    }
    
    if (singleQuotes % 2 !== 0) {
      this.errors.push({
        file,
        issue: "引号不匹配: 单引号数量不平衡",
        fix: "检查并修复单引号匹配",
        autoFixable: false
      });
    }
    
    if (doubleQuotes % 2 !== 0) {
      this.errors.push({
        file,
        issue: "引号不匹配: 双引号数量不平衡",
        fix: "检查并修复双引号匹配",
        autoFixable: false
      });
    }
  }

  // 自动修复可修复的错误
  autoFix() {
    console.log('🔧 自动修复可修复的错误...');
    
    this.errors.filter(error => error.autoFixable).forEach(error => {
      try {
        if (error.issue.includes("'use client'组件不能导出metadata")) {
          this.fixMetadataIssue(error.file);
        } else if (error.issue.includes("可能缺少逗号")) {
          this.fixMissingComma(error.file, error.line);
        }
      } catch (fixError) {
        this.warnings.push({
          file: error.file,
          issue: `自动修复失败: ${fixError.message}`,
          originalError: error.issue
        });
      }
    });
  }

  // 修复metadata问题
  fixMetadataIssue(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 移除metadata相关的导入和导出
    content = content.replace(/import { Metadata } from 'next';\n?/, '');
    content = content.replace(/export const metadata: Metadata = {[\s\S]*?};\n?/, '');
    
    fs.writeFileSync(filePath, content);
    this.fixed.push(`${filePath}: 移除了metadata导出`);
  }

  // 修复缺失逗号
  fixMissingComma(filePath, lineNumber) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    
    if (lines[lineNumber - 1].trim().endsWith('}')) {
      lines[lineNumber - 1] = lines[lineNumber - 1].replace(/}$/, '},');
      fs.writeFileSync(filePath, lines.join('\n'));
      this.fixed.push(`${filePath}:${lineNumber}: 添加了缺失的逗号`);
    }
  }

  // 获取所有页面文件
  getAllPageFiles() {
    const pageFiles = [];
    const searchDirs = ['src/app'];
    
    function searchRecursive(dir) {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchRecursive(fullPath);
        } else if (file === 'page.tsx') {
          pageFiles.push(fullPath);
        }
      });
    }
    
    searchDirs.forEach(searchRecursive);
    return pageFiles;
  }

  // 获取所有数据文件
  getAllDataFiles() {
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) return [];
    
    return fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.ts'))
      .map(file => path.join(dataDir, file));
  }

  // 运行所有检查
  async runAllChecks() {
    console.log('🚀 开始预构建检查...\n');
    
    this.checkNextJSIssues();
    this.checkDataFileSyntax();
    
    console.log('\n📊 检查结果:');
    console.log(`❌ 错误: ${this.errors.length} 个`);
    console.log(`⚠️  警告: ${this.warnings.length} 个`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ 发现的错误:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.file}`);
        console.log(`   问题: ${error.issue}`);
        console.log(`   修复: ${error.fix}`);
        console.log(`   可自动修复: ${error.autoFixable ? '是' : '否'}\n`);
      });
      
      // 询问是否自动修复
      const autoFixableCount = this.errors.filter(e => e.autoFixable).length;
      if (autoFixableCount > 0) {
        console.log(`\n🔧 发现 ${autoFixableCount} 个可自动修复的错误`);
        this.autoFix();
        
        if (this.fixed.length > 0) {
          console.log('\n✅ 已自动修复:');
          this.fixed.forEach(fix => console.log(`  - ${fix}`));
        }
      }
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  警告:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.issue}`);
      });
    }
    
    if (this.errors.length === 0) {
      console.log('\n✅ 所有检查通过！可以安全构建。');
      return true;
    } else {
      console.log('\n❌ 请修复错误后再构建。');
      return false;
    }
  }
}

module.exports = PreBuildChecker;

if (require.main === module) {
  const checker = new PreBuildChecker();
  checker.runAllChecks().then(passed => {
    process.exit(passed ? 0 : 1);
  });
} 