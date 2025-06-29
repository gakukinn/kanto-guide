# WalkerPlus三重爬取功能技术实现文档


**功能模块**: WalkerPlus页面生成器  
**技术负责**: AI助手  

## 📋 功能概述

WalkerPlus三重爬取功能实现了对WalkerPlus网站的智能数据提取，通过并行爬取三个不同页面来获取完整的活动信息。

### 核心功能
- **主页面爬取**: 获取活动标题、内容简介、見どころ
- **数据页面爬取**: 获取官方网站链接
- **地图页面爬取**: 获取谷歌地图位置信息
- **智能URL处理**: 输入任意一种URL格式都能自动生成三个完整URL

## 🔧 技术架构

### API端点
- **路径**: `/api/walkerplus-scraper`
- **方法**: POST
- **文件**: `app/api/walkerplus-scraper/route.ts`

### 核心技术栈
- **Next.js**: API路由框架
- **Cheerio**: HTML解析和DOM操作
- **TypeScript**: 类型安全的JavaScript
- **Promise.all**: 并行HTTP请求处理

## 🎯 URL处理逻辑

### 智能URL生成
```typescript
const baseUrl = url.replace('/data.html', '').replace('/map.html', '').replace(/\/$/, '');
const mainUrl = baseUrl + '/';
const dataUrl = baseUrl + '/data.html';
const mapUrl = baseUrl + '/map.html';
```

### 支持的输入格式
- `https://www.walkerplus.com/event/ar0313e00854/`
- `https://www.walkerplus.com/event/ar0313e00854/data.html`
- `https://www.walkerplus.com/event/ar0313e00854/map.html`

## 🔍 爬取策略

### 1. 主页面爬取 (scrapeMainPage)

#### 内容简介提取策略
采用**双层搜索策略**：CSS选择器优先 + 六层智能搜索fallback

**第一层：CSS选择器**
```typescript
const descriptionElement = $('.s_detail.add_qr > p.s_detail');
```

**Fallback六层搜索**：
1. **第一层**: 详细活动信息段落（150-800字符）
2. **第二层**: 表格或结构化数据中的描述
3. **第三层**: Meta标签描述
4. **第四层**: 特色描述内容
5. **第五层**: 宽泛搜索（80-500字符）
6. **第六层**: 句子级搜索（60-300字符）

#### 見どころ提取策略
- 直接搜索包含"見どころ"的元素
- Fallback到特色描述搜索
- 自动删除"見どころ "前缀避免重复

### 2. 数据页面爬取 (scrapeDataPage)

#### 官方网站提取
搜索包含以下关键词的链接：
- 公式サイト
- 関連サイト
- 公式ホームページ
- 詳細はこちら
- オフィシャルサイト

### 3. 地图页面爬取 (scrapeMapPage)

#### 谷歌地图提取
搜索iframe和链接中包含：
- google.com/maps
- maps.google.com
- goo.gl/maps

## 🛡️ 数据验证与清理

### 文本验证函数

#### isValidJapaneseText()
- 检查是否包含日文字符
- 验证特殊字符比例 < 30%
- 过滤乱码内容

#### containsUnwantedContent()
过滤不需要的内容关键词：
- ツアー、販売中、ホテル
- セット、プラン、予約
- ランキング、人気、おすすめ
- アクセス、最寄り駅、交通规制

### 文本清理流程
```typescript
text = text
  .replace(/\s+/g, ' ')      // 合并空白字符
  .replace(/\n+/g, ' ')      // 换行转空格
  .replace(/\t+/g, ' ')      // Tab转空格
  .replace(/^見どころ\s*/, '') // 删除見どころ前缀
  .trim();
```

## 🌐 HTTP请求配置

### 请求头设置
```typescript
headers: {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
  'Cache-Control': 'no-cache'
}
```

### 并行请求处理
使用`Promise.all`同时爬取三个页面，提高效率：
```typescript
const [mainResponse, dataResponse, mapResponse] = await Promise.all([
  fetch(mainUrl, headers),
  fetch(dataUrl, headers), 
  fetch(mapUrl, headers)
]);
```

## 📊 返回数据格式

```json
{
  "name": "活动标题",
  "description": "内容简介",
  "highlights": "見どころ",
  "officialWebsite": "官方网站URL",
  "googleMapUrl": "谷歌地图URL",
  "sourceUrl": "源页面URL",
  "extractedAt": "2024-12-28T10:30:00.000Z"
}
```

## 🔬 调试与日志

### 控制台日志
- URL生成过程日志
- 各层搜索结果日志
- 最终数据合并日志
- 错误详细信息

### 调试技巧
```typescript
console.log('CSS选择器找到内容简介:', description.substring(0, 100) + '...');
console.log('第一层搜索找到描述:', description.substring(0, 100) + '...');
```

## ⚡ 性能优化

### 搜索优化
- 使用`return false`提前终止jQuery循环
- CSS选择器优先，减少DOM遍历
- 分层搜索策略，从精确到模糊

### 并发处理
- 三个页面并行爬取
- 异步处理提高响应速度

## 🎨 前端集成

### 新增字段显示
在前端页面添加了谷歌地图字段：
```typescript
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    谷歌地图位置
  </label>
  <div className="p-3 bg-gray-50 rounded-md">
    {data.googleMapUrl && data.googleMapUrl !== '未识别' ? (
      <a href={data.googleMapUrl} target="_blank" rel="noopener noreferrer" 
         className="text-blue-600 hover:text-blue-800 underline">
        {data.googleMapUrl}
      </a>
    ) : (
      <span className="text-gray-500">未找到地图信息</span>
    )}
  </div>
</div>
```

## 🔄 技术演进

### 版本历史
1. **v1.0**: 单页面爬取基础版本
2. **v2.0**: 三重页面并行爬取
3. **v2.1**: CSS选择器优化
4. **v2.2**: 見どころ重复问题修复
5. **v2.3**: 六层智能搜索恢复

### 未来改进方向
- 增加更多CSS选择器模式
- 实现页面结构自动分析
- 添加爬取成功率统计
- 支持更多网站格式

## 📝 维护说明

### 代码维护要点
1. **保持CSS选择器更新**: 网站结构变化时及时调整
2. **关键词库维护**: 定期更新搜索关键词
3. **错误处理完善**: 增加更多边界情况处理
4. **性能监控**: 定期检查爬取效率

### 常见问题解决
- **404错误**: 检查URL是否有效
- **解析失败**: 验证HTML结构变化
- **重复内容**: 检查文本清理逻辑
- **编码问题**: 确认字符编码处理

---

**文档维护**: 请在功能更新时及时更新此文档  
**技术支持**: 参考代码注释和控制台日志进行问题诊断 