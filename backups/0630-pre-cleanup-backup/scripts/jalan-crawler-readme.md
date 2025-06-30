# Jalan通用爬虫使用指南

## 概述

这是一个通用的Jalan活动信息爬虫脚本，支持批量处理多个URL，配置文件驱动，具有完善的错误处理和重试机制。

## 核心特性

- ✅ **批量处理**: 支持一次处理多个URL
- ✅ **配置文件**: 支持JSON配置文件管理URL列表
- ✅ **重试机制**: 自动重试失败的请求（最多3次）
- ✅ **坐标提取**: 4种方法提取谷歌地图坐标
- ✅ **覆盖策略**: 相同名称活动自动覆盖更新
- ✅ **详细统计**: 提供完整的爬取统计和日志
- ✅ **新架构**: 完全适配最新数据库字段结构

## 使用方法

### 1. 单个URL爬取
```bash
node scripts/jalan-universal-crawler.js "https://www.jalan.net/event/evt_341998/?screenId=OUW1702"
```

### 2. 多个URL同时爬取
```bash
node scripts/jalan-universal-crawler.js "url1" "url2" "url3"
```

### 3. 配置文件批量爬取
```bash
node scripts/jalan-universal-crawler.js --config scripts/jalan-urls.json
```

## 配置文件格式

在 `scripts/jalan-urls.json` 中：

```json
{
  "description": "Jalan活动URL配置文件",
  "urls": [
    "https://www.jalan.net/event/evt_341998/?screenId=OUW1702",
    "https://www.jalan.net/event/evt_342198/?screenId=OUW1702"
  ]
}
```

## 提取的信息字段

| 字段 | 描述 | 数据库字段 |
|------|------|-----------|
| 活动名称 | 日语活动名称 | `name`, `japaneseName` |
| 开催期间 | 举办日期/时间 | `season` |
| 开催场所 | 举办地点 | `venue`, `location` |
| 住所 | 详细地址 | `address` |
| 交通方式 | 访问交通信息 | `access` |
| 主催 | 主办方信息 | `organizer` |
| 料金 | 参观费用 | `price` |
| 問合せ先 | 联系方式 | `contact` |
| ホームページ | 官方网站 | `website` |
| 坐标信息 | 谷歌地图坐标 | `mapInfo` |

## 坐标提取方法

脚本使用4种方法自动提取地图坐标：

1. **iframe方法**: 检查嵌入的谷歌地图iframe
2. **JavaScript方法**: 搜索页面JavaScript变量
3. **链接方法**: 提取地图链接坐标（**推荐**）
4. **Meta标签方法**: 检查页面Meta地理标签

按优先级自动选择最准确的坐标。

## 输出示例

```
🎯 Jalan通用爬虫启动
⚙️ 技术栈: Playwright + Cheerio + Prisma
🗺️ 坐标提取: 4种方法 (iframe/JavaScript/链接/Meta)
🔄 覆盖策略: name相同时自动覆盖
📋 新架构: 适配最新数据库字段结构
==========================================

📊 进度: 1/2
🚀 开始爬取: https://www.jalan.net/event/evt_341998/?screenId=OUW1702
✅ name: 第51回水戸のあじさい祭典
✅ period: 2025年6月7日～29日
✅ venue: 水戸市　保和苑及び周辺史跡
🎯 坐标: 36.391576, 140.455102 (link)
✅ 保存成功: 第51回水戸のあじさい祭典

🎉 批量爬取完成!
==========================================
📊 总URL数: 2
✅ 成功数: 2
❌ 失败数: 0
```

## 错误处理

- **自动重试**: 失败的请求会自动重试3次
- **详细日志**: 提供详细的错误信息和调试日志
- **统计报告**: 显示成功和失败的URL统计

## 配置参数

可以在脚本顶部的 `CONFIG` 对象中修改：

```javascript
const CONFIG = {
  browser: {
    headless: true,        // 无头浏览器模式
    timeout: 60000,        // 页面加载超时时间
    waitTimeout: 3000      // 页面稳定等待时间
  },
  retry: {
    maxRetries: 3,         // 最大重试次数
    retryDelay: 5000       // 重试间隔时间
  }
};
```

## 注意事项

1. **网络连接**: 确保网络连接稳定
2. **依赖项**: 需要安装 `playwright`, `cheerio`, `@prisma/client`
3. **数据库**: 确保数据库连接正常且架构为最新版本
4. **反爬措施**: 已内置基本的反爬防护

## 维护建议

- 定期更新字段选择器以适应网站变化
- 监控爬取成功率，调整重试策略
- 根据需要添加新的坐标提取方法
- 备份配置文件，便于批量操作

这个通用爬虫解决了重复编写相同代码的问题，提供了灵活、可扩展的解决方案。 