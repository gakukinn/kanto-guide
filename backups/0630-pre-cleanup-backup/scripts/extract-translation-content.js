const fs = require('fs');
const path = require('path');

// 活动目录
const activitiesDir = path.join(__dirname, '../data/activities');

// 提取需要翻译的内容
function extractTranslationContent() {
  const files = fs.readdirSync(activitiesDir).filter(file => file.endsWith('.json'));
  const translationTasks = [];
  
  console.log(`📁 发现 ${files.length} 个活动文件\n`);
  
  files.forEach((file, index) => {
    try {
      const filePath = path.join(activitiesDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // 检查是否有需要翻译的日文内容
      const needsTranslation = {
        file: file,
        id: data.id,
        translations: []
      };
      
      // 检查name字段
      if (data.name && containsJapanese(data.name)) {
        needsTranslation.translations.push({
          field: 'name',
          content: data.name
        });
      }
      
      // 检查description字段
      if (data.description && containsJapanese(data.description)) {
        needsTranslation.translations.push({
          field: 'description',
          content: data.description
        });
      }
      
      // 检查notes字段
      if (data.notes && containsJapanese(data.notes)) {
        needsTranslation.translations.push({
          field: 'notes',
          content: data.notes
        });
      }
      
      // 如果有需要翻译的内容，添加到任务列表
      if (needsTranslation.translations.length > 0) {
        translationTasks.push(needsTranslation);
        console.log(`✅ ${index + 1}. ${file} - 需要翻译 ${needsTranslation.translations.length} 个字段`);
      } else {
        console.log(`⏭️  ${index + 1}. ${file} - 无需翻译`);
      }
      
    } catch (error) {
      console.error(`❌ 处理文件 ${file} 时出错:`, error.message);
    }
  });
  
  return translationTasks;
}

// 检查是否包含日文（平假名、片假名、汉字）
function containsJapanese(text) {
  // 平假名: \u3040-\u309F
  // 片假名: \u30A0-\u30FF  
  // 汉字: \u4E00-\u9FAF (但这个会匹配中文，所以结合平假名/片假名判断)
  const hiragana = /[\u3040-\u309F]/;
  const katakana = /[\u30A0-\u30FF]/;
  
  return hiragana.test(text) || katakana.test(text);
}

// 生成ChatGPT翻译请求格式
function generateChatGPTPrompt(translationTasks) {
  if (translationTasks.length === 0) {
    return "🎉 所有文件都已经是中文，无需翻译！";
  }
  
  let prompt = `请帮我翻译以下日本旅游活动的内容为自然的中文。保持专有名词的准确性，保留旅游文化背景。

翻译格式：对于每个条目，请按以下JSON格式返回：

\`\`\`json
{
  "file": "文件名",
  "translations": [
    {
      "field": "字段名",
      "original": "原始日文",
      "translated": "翻译的中文"
    }
  ]
}
\`\`\`

需要翻译的内容：

`;

  translationTasks.forEach((task, index) => {
    prompt += `\n## ${index + 1}. 文件: ${task.file}\n`;
    
    task.translations.forEach((translation, tIndex) => {
      prompt += `\n### ${translation.field}:\n`;
      prompt += `${translation.content}\n`;
    });
    
    prompt += `\n---\n`;
  });
  
  return prompt;
}

// 主函数
function main() {
  console.log('🚀 开始提取翻译内容...\n');
  
  const translationTasks = extractTranslationContent();
  
  console.log(`\n📊 统计结果:`);
  console.log(`- 总文件数: ${fs.readdirSync(activitiesDir).filter(f => f.endsWith('.json')).length}`);
  console.log(`- 需要翻译: ${translationTasks.length}`);
  console.log(`- 无需翻译: ${fs.readdirSync(activitiesDir).filter(f => f.endsWith('.json')).length - translationTasks.length}`);
  
  if (translationTasks.length > 0) {
    // 生成ChatGPT提示词
    const prompt = generateChatGPTPrompt(translationTasks);
    
    // 保存到文件
    const outputFile = path.join(__dirname, '../translation-prompt.txt');
    fs.writeFileSync(outputFile, prompt, 'utf8');
    
    console.log(`\n✅ 翻译提示词已生成: ${outputFile}`);
    console.log(`\n📋 下一步操作:`);
    console.log(`1. 打开 translation-prompt.txt 文件`);
    console.log(`2. 复制内容到 ChatGPT Plus`);
    console.log(`3. 获得翻译结果后，运行应用翻译脚本`);
    
    // 为了方便，也显示前几个任务
    console.log(`\n📝 预览（前3个需要翻译的文件）:`);
    translationTasks.slice(0, 3).forEach((task, index) => {
      console.log(`\n${index + 1}. ${task.file}:`);
      task.translations.forEach(t => {
        console.log(`   - ${t.field}: ${t.content.substring(0, 50)}...`);
      });
    });
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractTranslationContent, generateChatGPTPrompt }; 