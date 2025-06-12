#!/usr/bin/env node

/**
 * 花火数据自动更新脚本
 * 专业级数据同步解决方案
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

class HanabiDataUpdater {
  constructor() {
    this.dataDir = path.join(__dirname, '../src/data');
    this.logFile = path.join(__dirname, '../logs/update.log');
    this.sources = {
      walkerPlus: 'https://hanabi.walkerplus.com',
      // 可添加更多数据源
    };
  }

  /**
   * 主要更新流程
   */
  async updateAll() {
    try {
      await this.log('开始数据更新...');
      
      // 1. 获取最新数据
      const latestData = await this.fetchLatestData();
      
      // 2. 数据验证
      const validatedData = await this.validateData(latestData);
      
      // 3. 比较变化
      const changes = await this.detectChanges(validatedData);
      
      // 4. 更新文件
      if (changes.length > 0) {
        await this.updateDataFiles(changes);
        await this.log(`更新完成，共更新 ${changes.length} 个文件`);
      } else {
        await this.log('无需更新，数据已是最新');
      }
      
      return { success: true, changes };
      
    } catch (error) {
      await this.log(`更新失败: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * 获取最新数据
   */
  async fetchLatestData() {
    const regions = ['ar0313', 'ar0311', 'ar0312', 'ar0314', 'ar0300', 'ar0400'];
    const results = {};
    
    for (const region of regions) {
      try {
        await this.delay(2000); // 防止请求过频
        const data = await this.fetchRegionData(region);
        results[region] = data;
        await this.log(`获取 ${region} 数据成功`);
      } catch (error) {
        await this.log(`获取 ${region} 数据失败: ${error.message}`, 'warn');
      }
    }
    
    return results;
  }

  /**
   * 获取单个地区数据
   */
  async fetchRegionData(regionCode) {
    return new Promise((resolve, reject) => {
      const url = `${this.sources.walkerPlus}/calendar/07/${regionCode}/`;
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const parsedData = this.parseHanabiData(data);
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`解析数据失败: ${error.message}`));
          }
        });
      }).on('error', reject);
    });
  }

  /**
   * 解析花火数据
   */
  parseHanabiData(html) {
    // 这里需要根据实际HTML结构解析
    // 使用cheerio或类似库会更专业
    const events = [];
    
    // 简化的解析逻辑示例
    const eventMatches = html.match(/class="eventItem"[\s\S]*?<\/div>/g) || [];
    
    eventMatches.forEach(eventHtml => {
      const event = {
        name: this.extractText(eventHtml, /<h3.*?>(.*?)<\/h3>/),
        date: this.extractText(eventHtml, /開催日：(.*?)<\/p>/),
        location: this.extractText(eventHtml, /開催場所：(.*?)<\/p>/),
        visitors: this.extractText(eventHtml, /来場者数：(.*?)<\/p>/),
        fireworks: this.extractText(eventHtml, /打上数：(.*?)<\/p>/),
        likes: this.extractText(eventHtml, /行ってみたい：(\d+)/)
      };
      
      if (event.name) {
        events.push(event);
      }
    });
    
    return events;
  }

  /**
   * 提取HTML中的文本
   */
  extractText(html, regex) {
    const match = html.match(regex);
    return match ? match[1].trim() : '';
  }

  /**
   * 数据验证
   */
  async validateData(data) {
    const validated = {};
    
    for (const [region, events] of Object.entries(data)) {
      validated[region] = events.filter(event => {
        // 基本验证规则
        return event.name && 
               event.date && 
               !event.name.includes('undefined') &&
               event.name.length > 3;
      });
    }
    
    return validated;
  }

  /**
   * 检测数据变化
   */
  async detectChanges(newData) {
    const changes = [];
    
    for (const [region, events] of Object.entries(newData)) {
      try {
        const currentFile = path.join(this.dataDir, `level4-july-${this.getRegionKey(region)}-hanabi.ts`);
        const currentData = await this.readCurrentData(currentFile);
        
        if (this.hasChanges(currentData, events)) {
          changes.push({
            region,
            file: currentFile,
            oldData: currentData,
            newData: events
          });
        }
      } catch (error) {
        await this.log(`检测变化失败 ${region}: ${error.message}`, 'warn');
      }
    }
    
    return changes;
  }

  /**
   * 更新数据文件
   */
  async updateDataFiles(changes) {
    for (const change of changes) {
      try {
        const newContent = this.generateDataFile(change.newData, change.region);
        await fs.writeFile(change.file, newContent, 'utf8');
        await this.log(`更新文件: ${change.file}`);
      } catch (error) {
        await this.log(`更新文件失败 ${change.file}: ${error.message}`, 'error');
      }
    }
  }

  /**
   * 生成数据文件内容
   */
  generateDataFile(events, region) {
    const regionKey = this.getRegionKey(region);
    const regionName = this.getRegionName(region);
    
    return `// 自动生成于 ${new Date().toISOString()}
// 数据源: Walker Plus (${region})

import { RegionalHanabiData } from '../types/regional-hanabi';

export const ${regionKey}Data: RegionalHanabiData = {
  region: '${regionName}',
  description: '${regionName}地区7月花火大会精选',
  events: [
${events.map(event => this.formatEventData(event)).join(',\n')}
  ]
};`;
  }

  /**
   * 格式化单个事件数据
   */
  formatEventData(event) {
    return `    {
      id: '${this.generateId(event.name)}',
      name: '${this.cleanName(event.name)}',
      date: '${event.date}',
      location: '${event.location}',
      visitors: '${event.visitors}',
      fireworksCount: '${event.fireworks}',
      likes: ${parseInt(event.likes) || 0}
    }`;
  }

  /**
   * 日志记录
   */
  async log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    
    // 控制台输出
    console.log(logMessage.trim());
    
    // 文件日志
    try {
      await fs.appendFile(this.logFile, logMessage);
    } catch (error) {
      console.error('写入日志失败:', error.message);
    }
  }

  /**
   * 延迟函数
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 工具函数
   */
  getRegionKey(regionCode) {
    const mapping = {
      'ar0313': 'tokyo',
      'ar0311': 'saitama', 
      'ar0312': 'chiba',
      'ar0314': 'kanagawa',
      'ar0300': 'kitakanto',
      'ar0400': 'koshinetsu'
    };
    return mapping[regionCode] || regionCode;
  }

  getRegionName(regionCode) {
    const mapping = {
      'ar0313': '东京',
      'ar0311': '埼玉',
      'ar0312': '千叶', 
      'ar0314': '神奈川',
      'ar0300': '北关东',
      'ar0400': '甲信越'
    };
    return mapping[regionCode] || regionCode;
  }

  generateId(name) {
    return name.toLowerCase()
               .replace(/[^\u4e00-\u9fff\w]/g, '-')
               .replace(/-+/g, '-')
               .trim('-');
  }

  cleanName(name) {
    return name.replace(/"/g, '\\"');
  }

  async readCurrentData(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      // 解析现有数据结构
      return this.parseExistingData(content);
    } catch (error) {
      return [];
    }
  }

  parseExistingData(content) {
    // 简化的解析，实际应该更复杂
    const events = [];
    const eventMatches = content.match(/{\s*id:[\s\S]*?}/g) || [];
    
    eventMatches.forEach(match => {
      try {
        const event = eval(`(${match})`);
        events.push(event);
      } catch (error) {
        // 解析失败忽略
      }
    });
    
    return events;
  }

  hasChanges(oldData, newData) {
    if (oldData.length !== newData.length) return true;
    
    // 简单的变化检测
    for (let i = 0; i < newData.length; i++) {
      const oldEvent = oldData[i];
      const newEvent = newData[i];
      
      if (!oldEvent || 
          oldEvent.name !== newEvent.name ||
          oldEvent.date !== newEvent.date ||
          oldEvent.likes !== newEvent.likes) {
        return true;
      }
    }
    
    return false;
  }
}

// 主执行逻辑
async function main() {
  const updater = new HanabiDataUpdater();
  
  try {
    const result = await updater.updateAll();
    console.log('更新完成:', result);
    process.exit(0);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = HanabiDataUpdater; 