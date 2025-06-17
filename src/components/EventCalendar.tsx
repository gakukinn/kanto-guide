'use client';

interface CalendarEvent {
  date: string; // 格式: "7/2" 或 "8/15"
  id: string;
  name: string;
}

interface EventCalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  title?: string;
  className?: string;
}

export default function EventCalendar({
  year,
  month,
  events,
  title = '事件日历',
  className = '',
}: EventCalendarProps) {
  // 获取月份信息
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sunday, 1=Monday...

  // 调整为周一开始 (0=Monday, 1=Tuesday...)
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // 月份名称映射
  const monthNames = [
    '',
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  // 星期映射
  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

  // 获取指定日期的事件
  const getEventsForDate = (day: number) => {
    const dateStr = `${month}/${day}`;
    return events.filter(event => event.date === dateStr);
  };

  // 生成空白日期（上个月末尾）
  const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => (
    <div
      key={`empty-${i}`}
      className="border border-stone-200 bg-stone-50 py-3"
    ></div>
  ));

  // 生成当月日期
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dayEvents = getEventsForDate(day);
    const hasEvent = dayEvents.length > 0;

    return (
      <div
        key={day}
        className={`relative border border-stone-200 py-3 ${
          hasEvent
            ? 'cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 font-medium text-amber-800 hover:from-amber-100 hover:to-orange-100'
            : 'bg-white text-stone-400'
        }`}
        title={hasEvent ? dayEvents.map(e => e.name).join(', ') : undefined}
      >
        {day}
        {hasEvent && (
          <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-xs text-white">
            {dayEvents.length}
          </div>
        )}
      </div>
    );
  });

  return (
    <section className={`border-b border-stone-100 bg-white py-8 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-light text-stone-700">
          ✨ {title} - {year}年{monthNames[month]}
        </h2>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {/* 星期头部 */}
          {weekDays.map(day => (
            <div
              key={day}
              className="bg-stone-50 py-2 font-medium text-stone-600"
            >
              {day}
            </div>
          ))}

          {/* 空白日期 + 当月日期 */}
          {emptyDays}
          {monthDays}
        </div>

        {/* 事件统计 */}
        {events.length > 0 && (
          <div className="mt-4 text-center text-sm text-stone-600">
            本月共有{' '}
            <span className="font-medium text-amber-700">{events.length}</span>{' '}
            场活动
          </div>
        )}
      </div>
    </section>
  );
}
