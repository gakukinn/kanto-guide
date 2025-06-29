# 图片搜索API配置说明

## 问题解决

现在图片搜索已经修复为使用真实的搜索API，而不是随机图片。搜索优先级：

1. **Google Custom Search API**（最优，搜索真实网页图片）
2. **Unsplash API**（备选，高质量摄影图片）
3. **通用日本图片**（最后备选）

## 配置步骤

### 1. Google Custom Search API（推荐）

这是最好的方案，可以搜索到官网和真实的图片。

**获取API密钥：**
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建项目或选择现有项目
3. 启用 "Custom Search API"
4. 创建API密钥

**创建自定义搜索引擎：**
1. 访问 [Google Custom Search](https://cse.google.com/)
2. 创建新的搜索引擎
3. 设置搜索范围（可以设置为整个网络）
4. 获取搜索引擎ID

**配置环境变量：**
在项目根目录创建 `.env.local` 文件：
```
GOOGLE_API_KEY=你的Google_API密钥
GOOGLE_SEARCH_ENGINE_ID=你的搜索引擎ID
```

### 2. Unsplash API（备选）

**获取API密钥：**
1. 访问 [Unsplash Developers](https://unsplash.com/developers)
2. 注册开发者账户
3. 创建应用获取Access Key

**配置环境变量：**
```
UNSPLASH_ACCESS_KEY=你的Unsplash_Access_Key
```

## 搜索效果

配置后，搜索"長谷寺のアジサイ"将会：

1. **Google搜索**：找到长谷寺官网的紫阳花照片、游客拍摄的真实照片
2. **Unsplash搜索**：找到相关的高质量花卉和日本风景照片
3. **备选图片**：如果都没配置，显示预设的日本风景图片

## 当前状态

- ✅ 搜索逻辑已修复
- ✅ 关键词简化（只搜索活动名称）
- ✅ 多层备选方案
- ⚠️ 需要配置API密钥才能获得最佳效果

配置API后，搜索结果将会非常准确和相关！ 