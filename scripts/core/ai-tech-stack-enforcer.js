/**
 * AI技术栈强制执行器
 * 确保AI严格使用Playwright+Cheerio技术栈，防止偷懒使用其他方式
 */

const fs = require('fs');
const path = require('path');

class AITechStackEnforcer {
    constructor() {
        this.allowedTechnologies = [
            'playwright',
            'cheerio',
            '@playwright/test',
            'playwright-core'
        ];
        
        this.forbiddenTechnologies = [
            'puppeteer',
            'selenium',
            'jsdom',
            'node-html-parser',
            'htmlparser2',
            'axios', // 直接HTTP请求
            'fetch', // 直接fetch请求
            'request',
            'got',
            'superagent'
        ];
        
        this.requiredImports = [
            "import { chromium } from 'playwright';",
            "import * as cheerio from 'cheerio';"
        ];
    }

    /**
     * 验证脚本是否使用了正确的技术栈
     */
    validateScript(scriptPath) {
        if (!fs.existsSync(scriptPath)) {
            throw new Error(`脚本文件不存在: ${scriptPath}`);
        }

        const content = fs.readFileSync(scriptPath, 'utf8');
        const violations = [];

        // 检查是否使用了禁用的技术
        this.forbiddenTechnologies.forEach(tech => {
            if (content.includes(tech)) {
                violations.push(`❌ 检测到禁用技术: ${tech}`);
            }
        });

        // 检查是否包含必需的导入
        let hasPlaywright = false;
        let hasCheerio = false;

        if (content.includes('playwright') || content.includes('chromium')) {
            hasPlaywright = true;
        }
        if (content.includes('cheerio')) {
            hasCheerio = true;
        }

        if (!hasPlaywright) {
            violations.push('❌ 缺少Playwright导入');
        }
        if (!hasCheerio) {
            violations.push('❌ 缺少Cheerio导入');
        }

        return {
            isValid: violations.length === 0,
            violations: violations,
            scriptPath: scriptPath
        };
    }

    /**
     * 生成标准的Playwright+Cheerio模板
     */
    generateTemplate(targetUrl, outputFile) {
        const template = `/**
 * 标准Playwright+Cheerio数据抓取脚本
 * 目标网站: ${targetUrl}
 * 生成时间: ${new Date().toISOString()}
 * 
 * ⚠️ 警告：此脚本必须严格使用Playwright+Cheerio技术栈
 * 禁止使用其他任何网页抓取技术！
 */

import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

class StandardScraper {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = [];
    }

    async initialize() {
        console.log('🚀 启动Playwright浏览器...');
        this.browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.page = await this.browser.newPage();
        
        // 设置用户代理
        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        
        console.log('✅ Playwright浏览器启动成功');
    }

    async scrapeData(url) {
        try {
            console.log(\`📡 访问目标网站: \${url}\`);
            
            // 使用Playwright导航到页面
            await this.page.goto(url, { 
                waitUntil: 'networkidle',
                timeout: 30000 
            });
            
            // 等待页面加载完成
            await this.page.waitForTimeout(2000);
            
            // 获取页面HTML内容
            const htmlContent = await this.page.content();
            
            // 使用Cheerio解析HTML
            const $ = cheerio.load(htmlContent);
            
            console.log('🔍 开始使用Cheerio解析数据...');
            
            // TODO: 在这里添加具体的数据提取逻辑
            // 示例：
            // $('selector').each((index, element) => {
            //     const data = {
            //         title: $(element).find('.title').text().trim(),
            //         date: $(element).find('.date').text().trim(),
            //         // ... 其他字段
            //     };
            //     this.results.push(data);
            // });
            
            console.log(\`✅ 数据提取完成，共获取 \${this.results.length} 条记录\`);
            
        } catch (error) {
            console.error('❌ 数据抓取失败:', error.message);
            throw error;
        }
    }

    async saveResults(outputPath) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = \`\${outputPath}-\${timestamp}.json\`;
        
        fs.writeFileSync(filename, JSON.stringify(this.results, null, 2), 'utf8');
        console.log(\`💾 数据已保存到: \${filename}\`);
        
        return filename;
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Playwright浏览器已关闭');
        }
    }
}

// 主执行函数
async function main() {
    const scraper = new StandardScraper();
    
    try {
        await scraper.initialize();
        await scraper.scrapeData('${targetUrl}');
        await scraper.saveResults('${outputFile}');
        
    } catch (error) {
        console.error('💥 脚本执行失败:', error);
        process.exit(1);
        
    } finally {
        await scraper.cleanup();
    }
}

// 执行脚本
if (import.meta.url === \`file://\${process.argv[1]}\`) {
    main().catch(console.error);
}

export default StandardScraper;
`;

        return template;
    }

    /**
     * 创建AI指令强制执行文件
     */
    createAIInstructions() {
        const instructions = `# 🚨 AI技术栈强制执行指令 🚨

## ⚠️ 绝对禁止的行为
1. **禁止使用Puppeteer** - 只能使用Playwright
2. **禁止使用Selenium** - 只能使用Playwright  
3. **禁止使用JSDOM** - 只能使用Cheerio
4. **禁止直接HTTP请求** - 必须通过Playwright获取页面内容
5. **禁止使用其他HTML解析器** - 只能使用Cheerio

## ✅ 强制要求
1. **必须使用Playwright** - 用于浏览器自动化和页面导航
2. **必须使用Cheerio** - 用于HTML内容解析
3. **必须包含标准导入**:
   \`\`\`javascript
   import { chromium } from 'playwright';
   import * as cheerio from 'cheerio';
   \`\`\`

## 🔍 验证方法
运行以下命令验证脚本是否符合要求：
\`\`\`bash
node scripts/ai-tech-stack-enforcer.js validate <script-path>
\`\`\`

## 📝 标准模板生成
生成符合要求的脚本模板：
\`\`\`bash
node scripts/ai-tech-stack-enforcer.js template <target-url> <output-name>
\`\`\`

## 🚫 违规处理
如果AI使用了禁用技术，脚本将：
1. 立即报错并停止执行
2. 输出详细的违规信息
3. 要求重新编写符合规范的脚本
`;

        fs.writeFileSync('AI-TECH-STACK-RULES.md', instructions, 'utf8');
        console.log('📋 AI技术栈规则文件已创建: AI-TECH-STACK-RULES.md');
    }
}

// 命令行接口
if (require.main === module) {
    const enforcer = new AITechStackEnforcer();
    const args = process.argv.slice(2);
    
    if (args[0] === 'validate' && args[1]) {
        const result = enforcer.validateScript(args[1]);
        
        console.log(`\n🔍 技术栈验证结果: ${args[1]}`);
        console.log('='.repeat(50));
        
        if (result.isValid) {
            console.log('✅ 脚本符合技术栈要求');
        } else {
            console.log('❌ 脚本违反技术栈要求:');
            result.violations.forEach(violation => {
                console.log(`   ${violation}`);
            });
            process.exit(1);
        }
        
    } else if (args[0] === 'template' && args[1] && args[2]) {
        const template = enforcer.generateTemplate(args[1], args[2]);
        const filename = `scripts/${args[2]}-standard-scraper.ts`;
        
        fs.writeFileSync(filename, template, 'utf8');
        console.log(`📝 标准模板已生成: ${filename}`);
        
    } else if (args[0] === 'setup') {
        enforcer.createAIInstructions();
        console.log('🎯 AI技术栈强制执行器设置完成');
        
    } else {
        console.log(`
🛠️  AI技术栈强制执行器

用法:
  node scripts/ai-tech-stack-enforcer.js validate <script-path>    验证脚本
  node scripts/ai-tech-stack-enforcer.js template <url> <name>     生成模板
  node scripts/ai-tech-stack-enforcer.js setup                    初始化设置

示例:
  node scripts/ai-tech-stack-enforcer.js validate scripts/my-scraper.ts
  node scripts/ai-tech-stack-enforcer.js template "https://example.com" "example"
        `);
    }
}

module.exports = AITechStackEnforcer; 