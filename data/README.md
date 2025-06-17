# 数据管理目录说明

## 目录结构

```
data/
├── walkerplus-crawled/     # WalkerPlus抓取数据存储
├── verification/           # 数据验证记录
└── README.md              # 本说明文档
```

## 目录用途

### `walkerplus-crawled/` - 抓取数据存储
存储从WalkerPlus网站抓取的原始数据，用于：
- 保存官方准确数据作为参考
- 支持数据验证和核对
- 提供历史数据追踪
- 便于数据恢复和重建

**文件命名规则:**
- 时间戳版本: `{event-name}-{timestamp}.json`
- 最新版本: `{event-name}-latest.json`

**示例文件:**
- `ojiya-matsuri-2025-06-14T10-30-00-000Z.json` (时间戳版本)
- `ojiya-matsuri-latest.json` (最新版本)
- `agano-river-2025-06-14T11-00-00-000Z.json`

### `verification/` - 数据验证记录
存储数据验证文档和错误日志，用于：
- 记录数据验证过程和结果
- 追踪数据变更历史
- 保存错误日志和处理记录
- 提供质量保证文档

**文件类型:**
- `{event-name}-verification.md` - 验证记录文档
- `crawl-errors.json` - 抓取错误日志
- `data-changes.json` - 数据变更记录

## 数据管理原则

### 1. 数据准确性
- 严格使用WalkerPlus官方数据
- 禁止编造或修改官方信息
- 定期验证数据时效性

### 2. 数据完整性
- 保存完整的抓取数据
- 记录数据来源和抓取时间
- 维护数据变更历史

### 3. 数据可追溯性
- 每次抓取都保存时间戳版本
- 记录详细的验证过程
- 保留错误日志用于分析

### 4. 数据安全性
- 定期备份重要数据
- 避免意外删除或覆盖
- 使用版本控制管理变更

## 使用指南

### 查看最新数据
```bash
# 查看最新的おぢやまつり数据
cat data/walkerplus-crawled/ojiya-matsuri-latest.json

# 查看验证记录
cat data/verification/ojiya-matsuri-verification.md
```

### 运行抓取脚本
```bash
# 运行おぢやまつり抓取脚本
node scripts/crawlers/ojiya-matsuri-crawler.js

# 数据会自动保存到 data/walkerplus-crawled/ 目录
```

### 数据验证流程
1. 运行抓取脚本获取最新数据
2. 对比官方网站验证数据准确性
3. 更新验证记录文档
4. 如有变更，更新网站页面内容

## 维护建议

### 定期任务
- **每月**: 验证重要活动数据准确性
- **每季度**: 全面检查所有抓取数据
- **每年**: 清理过期的历史数据

### 监控要点
- 抓取脚本运行状态
- 数据文件完整性
- 官方网站结构变更
- 页面访问状态

### 故障处理
1. **抓取失败**: 检查网络连接和目标网站状态
2. **数据异常**: 对比历史数据找出变更点
3. **文件损坏**: 使用备份数据恢复
4. **脚本错误**: 查看错误日志分析原因

## 相关工具

### 抓取工具
- `scripts/crawlers/` - 各种抓取脚本
- `src/utils/hanabi-data-converter.ts` - 数据转换工具
- `src/utils/hanabi-template-generator.ts` - 模板生成工具

### 验证工具
- `data/verification/` - 验证记录模板
- 浏览器开发者工具 - 手动验证
- Postman/curl - API状态检查

## 注意事项

### 商业项目要求
- 这是商业网站项目，数据准确性至关重要
- 严禁使用未经验证的数据
- 保持与官方数据源同步

### 法律合规
- 遵守网站爬虫robots.txt规则
- 合理控制抓取频率
- 尊重数据版权和使用条款

### 技术限制
- 抓取脚本依赖网站结构稳定性
- 需要定期更新选择器和解析逻辑
- 注意处理反爬虫机制

---
*创建时间: 2025-06-14*
*维护人员: 开发团队*
*更新频率: 根据需要* 