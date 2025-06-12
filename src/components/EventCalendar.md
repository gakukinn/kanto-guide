# EventCalendar 事件日历组件

## 简介
`EventCalendar` 是一个可复用的事件日历组件，可以显示任意月份的事件安排。

## 功能特点
- 📅 支持任意年月显示
- 🎯 事件数量标记
- 🎨 事件日期高亮
- 📱 响应式设计
- 🔄 完全可复用

## 使用方法

### 基本用法
```tsx
import EventCalendar from '../components/EventCalendar';

const events = [
  { date: "7/2", id: "event1", name: "花火大会1" },
  { date: "7/15", id: "event2", name: "花火大会2" },
  { date: "7/30", id: "event3", name: "花火大会3" }
];

<EventCalendar 
  year={2025}
  month={7}
  events={events}
  title="花火大会日历"
/>
```

### 不同月份示例
```tsx
// 8月活动日历
<EventCalendar 
  year={2025}
  month={8}
  events={augustEvents}
  title="夏日祭典日历"
/>

// 12月活动日历  
<EventCalendar 
  year={2025}
  month={12}
  events={winterEvents}
  title="圣诞灯会日历"
  className="bg-blue-50"
/>
```

## Props 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| year | number | ✅ | - | 年份 |
| month | number | ✅ | - | 月份 (1-12) |
| events | CalendarEvent[] | ✅ | - | 事件数组 |
| title | string | ❌ | "事件日历" | 日历标题 |
| className | string | ❌ | "" | 自定义样式类 |

## CalendarEvent 接口
```tsx
interface CalendarEvent {
  date: string;    // 格式: "7/2" 或 "8/15"  
  id: string;      // 唯一标识符
  name: string;    // 事件名称
}
```

## 适用场景
- 🎆 花火大会日历
- 🎭 节庆活动日历
- 🎪 展览会议日历
- 🎵 音乐会演出日历
- 🎊 任何需要事件展示的日历

## 自定义样式
可以通过 `className` 参数传入自定义样式：
```tsx
<EventCalendar 
  className="bg-gradient-to-r from-purple-50 to-pink-50"
  // ... 其他参数
/>
``` 