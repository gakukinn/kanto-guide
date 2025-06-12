const AIDataValidationEnforcer = require('./ai-data-validation-enforcer');

class AIResponseInterceptor {
    constructor() {
        this.enforcer = new AIDataValidationEnforcer();
        this.blockedResponsesCount = 0;
        this.interceptLog = './logs/ai-response-intercepts.log';
    }

    // 拦截并验证AI回答
    interceptResponse(aiResponse, context = {}) {
        console.log('🔍 拦截AI回答进行验证...');
        
        const validation = this.enforcer.enforceDataValidation(aiResponse, context);
        
        if (validation.blocked) {
            this.blockedResponsesCount++;
            console.log('🚨 AI回答被阻止 - 发现数据验证问题');
            
            this.logInterception(validation, context);
            
            // 返回强制提问回答
            return {
                intercepted: true,
                originalBlocked: true,
                forcedResponse: this.generateForcedQuestionResponse(validation),
                violations: validation.violations
            };
        }
        
        console.log('✅ AI回答通过验证');
        return {
            intercepted: false,
            originalBlocked: false,
            allowedResponse: aiResponse,
            violations: []
        };
    }

    generateForcedQuestionResponse(validation) {
        const mandatoryResponse = validation.mandatoryResponse;
        
        return `${mandatoryResponse.error}

${mandatoryResponse.message}

${mandatoryResponse.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

${mandatoryResponse.action}

**我的错误：** 我发现我的回答中存在以下问题：
${validation.violations.map(v => `- ${v.message}: ${v.content}`).join('\n')}

我不应该在没有完全确认数据的情况下提供可能不准确的信息。请您提供准确的官方数据，我将严格按照您的信息回答。`;
    }

    logInterception(validation, context) {
        const fs = require('fs');
        const path = require('path');
        
        const logDir = path.dirname(this.interceptLog);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            blocked: true,
            violationCount: validation.violations.length,
            violations: validation.violations,
            context: context,
            blockedResponsePreview: validation.originalResponse.substring(0, 200)
        };

        fs.appendFileSync(this.interceptLog, JSON.stringify(logEntry) + '\n');
    }

    // 获取拦截统计
    getInterceptionStats() {
        const fs = require('fs');
        
        if (!fs.existsSync(this.interceptLog)) {
            return { totalInterceptions: 0, todayInterceptions: 0 };
        }

        const logs = fs.readFileSync(this.interceptLog, 'utf8')
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));

        const today = new Date().toDateString();
        const todayLogs = logs.filter(log => 
            new Date(log.timestamp).toDateString() === today
        );

        return {
            totalInterceptions: logs.length,
            todayInterceptions: todayLogs.length,
            currentSessionBlocked: this.blockedResponsesCount,
            lastInterception: logs.length > 0 ? logs[logs.length - 1].timestamp : null
        };
    }

    // 测试拦截器
    static testInterceptor() {
        const interceptor = new AIResponseInterceptor();
        
        // 测试案例1：包含未验证数据的回答
        const testResponse1 = `根据官方Walker Plus数据显示，神奈川8月花火的红心数排序为：
1. みなとみらいスマートフェスティバル 2025 - 红心365
2. 横浜ナイトフラワーズ2025 - 红心154
3. 第51回 金沢祭花火大会 - 红心145`;

        console.log('=== 测试案例1：未验证数据 ===');
        const result1 = interceptor.interceptResponse(testResponse1, { task: 'kanagawa_fireworks_ranking' });
        console.log('拦截结果:', result1.intercepted ? '被阻止' : '通过');
        if (result1.intercepted) {
            console.log('强制回答:\n', result1.forcedResponse);
        }

        // 测试案例2：包含提问的安全回答
        const testResponse2 = `我无法完全确认神奈川8月所有13个花火大会的准确红心数。您能提供Walker Plus官方页面的完整数据或截图吗？这样我就能为您准确筛选出红心数最高的9个花火大会。`;

        console.log('\n=== 测试案例2：安全提问 ===');
        const result2 = interceptor.interceptResponse(testResponse2, { task: 'kanagawa_fireworks_ranking' });
        console.log('拦截结果:', result2.intercepted ? '被阻止' : '通过');

        return { test1: result1, test2: result2 };
    }
}

// 命令行接口
if (require.main === module) {
    const command = process.argv[2];
    
    switch(command) {
        case 'test':
            AIResponseInterceptor.testInterceptor();
            break;
            
        case 'stats':
            const interceptor = new AIResponseInterceptor();
            const stats = interceptor.getInterceptionStats();
            console.log('拦截统计:', JSON.stringify(stats, null, 2));
            break;
            
        default:
            console.log('使用方法:');
            console.log('node ai-response-interceptor.js test   # 运行测试');
            console.log('node ai-response-interceptor.js stats  # 查看统计');
    }
}

module.exports = AIResponseInterceptor; 