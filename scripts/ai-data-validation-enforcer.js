const fs = require('fs');
const path = require('path');

class AIDataValidationEnforcer {
    constructor() {
        this.suspiciousPatterns = [
            // 检测数据不一致的模式
            /按照.*排序|排行榜|前\d+名/,
            /红心数.*(\d+)/g,
            /根据.*显示|官方.*显示/,
            /\d+个花火大会/,
            // 检测推测性语言
            /可能|应该|估计|大概|约|似乎/,
            /我认为|我觉得|推测/,
            // 检测未验证声明
            /确认.*准确|已验证|可以确认/,
            // 新增：花火数据特定验证
            /Walker Plus.*显示|从Walker Plus获取/,
            /第\d+页|更多花火|完整列表/,
            /访客数.*人|花火数.*发|红心数.*个/,
            /开催日期|举办时间|具体时间/
        ];
        
        this.questionPatterns = [
            /您能.*吗\?|您可以.*吗\?/,
            /我需要确认|我无法确认|我无法完全确认/,
            /请提供|请告诉我/,
            /您能提供.*吗/,
            // 新增：花火数据特定提问模式
            /请确认.*Walker Plus|请提供.*官方链接/,
            /我无法访问.*页面|需要查看.*完整数据/
        ];
        
        this.logFile = path.join(__dirname, '../logs/ai-validation-violations.log');
        this.initializeLog();
    }

    initializeLog() {
        const logDir = path.dirname(this.logFile);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    // 检测AI回答中的危险模式
    detectDataInconsistency(aiResponse) {
        const violations = [];
        
        // 检查是否包含多个不同的数字但没有提问
        const numbers = aiResponse.match(/\d+/g);
        const hasQuestions = this.questionPatterns.some(pattern => pattern.test(aiResponse));
        
        if (numbers && numbers.length > 3 && !hasQuestions && !/您能提供/.test(aiResponse)) {
            violations.push({
                type: 'UNVERIFIED_DATA_PRESENTATION',
                severity: 'HIGH',
                message: '提供了多个数据但未向用户确认',
                content: numbers.slice(0, 5).join(', ') + '...'
            });
        }

        // 检查是否使用了推测性语言
        this.suspiciousPatterns.forEach((pattern, index) => {
            const matches = aiResponse.match(pattern);
            if (matches) {
                violations.push({
                    type: 'SPECULATIVE_LANGUAGE',
                    severity: 'MEDIUM',
                    message: '使用了推测性或未验证的语言',
                    content: matches[0]
                });
            }
        });

        // 检查是否声称"根据官方数据"但实际没有完整验证
        if (/根据.*官方|官方.*显示/.test(aiResponse) && !hasQuestions) {
            violations.push({
                type: 'FALSE_AUTHORITY_CLAIM',
                severity: 'HIGH',
                message: '声称基于官方数据但未完全验证',
                content: '声称官方数据但无确认'
            });
        }

        return violations;
    }

    // 新增：花火数据特定验证
    validateHanabiData(aiResponse) {
        const violations = [];
        
        // 检查是否声称从Walker Plus获取数据但未确认
        if (/Walker Plus.*显示|从Walker Plus获取/.test(aiResponse) && 
            !/请确认|我无法访问/.test(aiResponse)) {
            violations.push({
                type: 'UNVERIFIED_WALKER_PLUS_CLAIM',
                severity: 'HIGH',
                message: '声称从Walker Plus获取数据但未确认访问',
                content: 'Walker Plus数据声明'
            });
        }

        // 检查是否提供了具体的花火数据但没有要求验证
        const hanabiDataPattern = /访客.*\d+.*人|花火.*\d+.*发|红心.*\d+/g;
        const hanabiDataMatches = aiResponse.match(hanabiDataPattern);
        if (hanabiDataMatches && hanabiDataMatches.length > 2 && 
            !/请提供|请确认/.test(aiResponse)) {
            violations.push({
                type: 'UNVERIFIED_HANABI_STATISTICS',
                severity: 'HIGH', 
                message: '提供了多个花火统计数据但未要求用户验证',
                content: hanabiDataMatches.slice(0, 3).join(', ')
            });
        }

        return violations;
    }

    // 更新主验证方法
    enforceDataValidation(aiResponse, context = {}) {
        const generalViolations = this.detectDataInconsistency(aiResponse);
        const hanabiViolations = this.validateHanabiData(aiResponse);
        const allViolations = [...generalViolations, ...hanabiViolations];
        
        if (allViolations.length > 0) {
            this.logViolations(allViolations, aiResponse, context);
            
            const mandatoryQuestions = this.generateMandatoryQuestions(allViolations);
            
            return {
                blocked: true,
                violations: allViolations,
                mandatoryResponse: mandatoryQuestions,
                originalResponse: aiResponse
            };
        }
        
        return {
            blocked: false,
            violations: [],
            originalResponse: aiResponse
        };
    }

    generateMandatoryQuestions(violations) {
        const questions = [];
        
        violations.forEach(violation => {
            switch(violation.type) {
                case 'UNVERIFIED_DATA_PRESENTATION':
                    questions.push('我发现我提供了多个数据，但我无法完全确认这些数据的准确性。您能提供官方数据源的完整信息吗？');
                    break;
                case 'FALSE_AUTHORITY_CLAIM':
                    questions.push('我声称基于官方数据，但实际上我无法完全验证所有信息。您能提供完整的官方数据截图或确认吗？');
                    break;
                case 'SPECULATIVE_LANGUAGE':
                    questions.push('我发现我的回答中包含了推测性内容。我需要您确认具体的数据，而不是让我推测。');
                    break;
                case 'UNVERIFIED_WALKER_PLUS_CLAIM':
                    questions.push('我声称从Walker Plus获取数据，但我无法实际访问该网站。您能提供Walker Plus页面的具体数据截图吗？');
                    break;
                case 'UNVERIFIED_HANABI_STATISTICS':
                    questions.push('我提供了多个花火大会的统计数据，但我无法确认这些数字的准确性。请您提供官方来源的准确数据。');
                    break;
            }
        });

        return {
            error: '🚨 AI数据验证失败 - 花火数据检查',
            message: '我发现以下问题需要您确认：',
            questions: questions,
            action: '请提供准确的Walker Plus官方数据，我将严格按照您提供的信息回答。'
        };
    }

    logViolations(violations, aiResponse, context) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            violations,
            responseLength: aiResponse.length,
            context: context.task || 'unknown',
            firstWords: aiResponse.substring(0, 100)
        };

        fs.appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
    }

    // 生成每日报告
    generateDailyReport() {
        if (!fs.existsSync(this.logFile)) {
            return { violations: 0, report: '无违规记录' };
        }

        const logs = fs.readFileSync(this.logFile, 'utf8')
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));

        const today = new Date().toDateString();
        const todayLogs = logs.filter(log => 
            new Date(log.timestamp).toDateString() === today
        );

        const violationTypes = {};
        todayLogs.forEach(log => {
            log.violations.forEach(violation => {
                violationTypes[violation.type] = (violationTypes[violation.type] || 0) + 1;
            });
        });

        return {
            date: today,
            totalViolations: todayLogs.length,
            violationTypes,
            recommendations: this.generateRecommendations(violationTypes)
        };
    }

    generateRecommendations(violationTypes) {
        const recommendations = [];
        
        if (violationTypes.UNVERIFIED_DATA_PRESENTATION > 0) {
            recommendations.push('建议：要求AI在提供多个数据前必须先确认数据来源');
        }
        
        if (violationTypes.FALSE_AUTHORITY_CLAIM > 0) {
            recommendations.push('建议：禁止AI声称"根据官方数据"除非用户已提供完整验证');
        }
        
        if (violationTypes.SPECULATIVE_LANGUAGE > 0) {
            recommendations.push('建议：训练AI识别推测性语言并主动提问');
        }

        return recommendations;
    }
}

// 命令行接口
if (require.main === module) {
    const enforcer = new AIDataValidationEnforcer();
    const command = process.argv[2];
    
    switch(command) {
        case 'test':
            const testResponse = process.argv[3] || '根据官方数据显示，红心数排序为：365、154、145等，共13个花火大会';
            const result = enforcer.enforceDataValidation(testResponse);
            console.log('验证结果:', JSON.stringify(result, null, 2));
            break;
            
        case 'report':
            const report = enforcer.generateDailyReport();
            console.log('每日报告:', JSON.stringify(report, null, 2));
            break;
            
        default:
            console.log('使用方法:');
            console.log('node ai-data-validation-enforcer.js test "AI回答内容"');
            console.log('node ai-data-validation-enforcer.js report');
    }
}

module.exports = AIDataValidationEnforcer; 