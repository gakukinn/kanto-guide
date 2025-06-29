# 图片目录结构规范

本项目采用四层目录结构来组织图片文件，确保与页面路由结构完全对应。

## 目录结构

```
public/images/
├── [地区]/
│   ├── [活动类型]/
│   │   ├── [具体活动]/
│   │   │   ├── main.jpg        # 主图片（用于热门活动展示）
│   │   │   ├── detail1.jpg     # 详情图片1
│   │   │   ├── detail2.jpg     # 详情图片2
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── backgrounds/                 # 通用背景图片
└── icons/                      # 图标文件
```

## 实际示例

### 东京地区

- `tokyo/hanabi/sumida/main.jpg` - 隅田川花火大会主图
- `tokyo/matsuri/sanja/main.jpg` - 三社祭主图
- `tokyo/hanami/ueno/main.jpg` - 上野公园赏樱主图

### 神奈川地区

- `kanagawa/hanabi/kamakura/main.jpg` - 镰仓花火大会主图
- `kanagawa/hanami/minatomirai/main.jpg` - 港未来赏樱主图

## 图片规格要求

### 主图片 (main.jpg)

- **比例**: 16:9 (1920x1080像素推荐)
- **格式**: JPG/PNG
- **用途**: 二层页面热门活动展示、四层页面主图

### 详情图片

- **比例**: 16:9 或 4:3
- **格式**: JPG/PNG
- **用途**: 四层页面详情展示

## 命名规范

- 主图片统一命名为 `main.jpg`
- 详情图片按序号命名：`detail1.jpg`, `detail2.jpg`, ...
- 文件名使用小写字母和连字符
- 避免使用空格和特殊字符

## 自动映射机制

系统会自动将活动ID映射到对应的图片路径：

- `sumida-river-fireworks` → `/images/tokyo/hanabi/sumida/main.jpg`
- `sanja-festival` → `/images/tokyo/matsuri/sanja/main.jpg`

## 添加新图片的步骤

1. 创建对应的四层目录结构
2. 将图片文件按规范命名并放置
3. 图片会自动在相应页面显示
4. 如需自定义路径，可修改组件中的映射配置
