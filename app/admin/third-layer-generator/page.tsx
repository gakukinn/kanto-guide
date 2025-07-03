'use client';
import { useState, useEffect } from 'react';
import UniversalStaticPageTemplate from '../../../src/components/UniversalStaticPageTemplate';

// 活动事件接口（与模板保持一致）
interface ActivityEvent {
  id: string;
  name: string;
  title?: string;
  address?: string;
  datetime?: string;
  date?: string;
  venue?: string;
  access?: string;
  organizer?: string;
  price?: string;
  contact?: string;
  website?: string;
  googleMap?: string;
  region: string;
  description: string;
  activityType: string;
  location: string;
  likes: number;
  detailLink?: string;
}

// 地区配置
const REGIONS = {
  tokyo: { name: 'tokyo', displayName: '东京都', emoji: '🗼', description: '首都圈的繁华与传统文化' },
  saitama: { name: 'saitama', displayName: '埼玉县', emoji: '🌸', description: '田园风光与传统文化' },
  chiba: { name: 'chiba', displayName: '千叶县', emoji: '🌊', description: '海滨城市的自然魅力' },
  kanagawa: { name: 'kanagawa', displayName: '神奈川', emoji: '⛵', description: '港口城市的现代风情' },
  kitakanto: { name: 'kitakanto', displayName: '北关东', emoji: '🏯', description: '历史悠久的文化名城' },
  koshinetsu: { name: 'koshinetsu', displayName: '甲信越', emoji: '🗻', description: '山岳地带的自然美景' }
};

const ACTIVITIES = {
  hanabi: { key: 'hanabi', name: '花火大会', emoji: '🎆' },
  hanami: { key: 'hanami', name: '花见会', emoji: '🌸' },
  matsuri: { key: 'matsuri', name: '传统祭典', emoji: '🏮' },
  illumination: { key: 'illumination', name: '灯光秀', emoji: '✨' },
  momiji: { key: 'momiji', name: '红叶狩', emoji: '🍁' },
  culture: { key: 'culture', name: '文化艺术', emoji: '🎭' }
};

export default function ThirdLayerGenerator() {
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof REGIONS>('tokyo');
  const [selectedActivity, setSelectedActivity] = useState<keyof typeof ACTIVITIES>('hanabi');
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // 加载四层页面JSON数据
  // 🔧 新增：智能日期解析函数（增强调试版）
  const parseDateForSorting = (dateString: string): Date => {
    console.log(`🔍 开始解析日期: "${dateString}"`);
    
    if (!dateString || dateString === '日期待定') {
      console.log(`❌ 无效日期，排到最后: "${dateString}"`);
      return new Date('2099-12-31'); // 放到最后
    }

    const currentYear = new Date().getFullYear();
    let year = currentYear;
    let month = 1;
    let day = 1;

    // 提取年份（如果有）
    const yearMatch = dateString.match(/(\d{4})年/);
    if (yearMatch) {
      year = parseInt(yearMatch[1]);
      console.log(`✅ 找到年份: ${year}`);
    } else {
      console.log(`⚠️ 未找到年份，使用当前年: ${year}`);
    }

    // 提取月份
    const monthMatch = dateString.match(/(\d{1,2})月/);
    if (monthMatch) {
      month = parseInt(monthMatch[1]);
      console.log(`✅ 找到月份: ${month}`);
    } else {
      console.log(`❌ 未找到月份，使用默认: ${month}`);
    }

    // 处理具体日期 - 修复单位数日期解析
    const dayMatch = dateString.match(/(\d{1,2})日/);
    if (dayMatch) {
      day = parseInt(dayMatch[1]);
      console.log(`✅ 找到具体日期: ${day} (原始匹配: "${dayMatch[1]}")`);
    } else {
      // 处理上中下旬
      if (dateString.includes('上旬')) {
        day = 5;
        console.log(`✅ 找到上旬，设为: ${day}`);
      } else if (dateString.includes('中旬')) {
        day = 15;
        console.log(`✅ 找到中旬，设为: ${day}`);
      } else if (dateString.includes('下旬')) {
        day = 25;
        console.log(`✅ 找到下旬，设为: ${day}`);
      } else {
        console.log(`⚠️ 只有月份，设为月初: ${day}`);
      }
    }

    const resultDate = new Date(year, month - 1, day);
    const dateString_formatted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    console.log(`🗓️ 日期解析完成: "${dateString}" → ${dateString_formatted} (${resultDate.getTime()})`);
    return resultDate;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // 获取所有四层页面JSON文件列表
      const response = await fetch('/api/get-activity-files');
      if (!response.ok) {
        throw new Error('无法获取文件列表');
      }
      
      const { files } = await response.json();
      const matchingEvents: ActivityEvent[] = [];
      
             // 遍历所有文件，筛选匹配的地区和活动类型
       for (const filename of files) {
         if (filename.includes(`recognition-${selectedActivity}-`) && filename.includes('recognition-')) {
           try {
             const fileResponse = await fetch(`/api/get-activity-data?filename=${filename}`);
             if (fileResponse.ok) {
               const eventData = await fileResponse.json();
              
              // 检查地区是否匹配
              if (eventData.region === selectedRegion) {
                // 转换数据格式以匹配模板
                const formattedEvent = {
                  ...eventData,
                  title: eventData.name || eventData.title,
                  location: eventData.venue || eventData.address || '地点待定',
                  // 🔧 修复：保持原始datetime字段用于排序，同时设置date字段
                  datetime: eventData.datetime || eventData.date || '日期待定',
                  date: eventData.datetime || eventData.date || '日期待定',
                  likes: eventData.likes || Math.floor(Math.random() * 100),
                  // 🔧 修复：优先使用JSON数据中的detailLink，确保与四层生成器生成的页面路径一致
                  detailLink: eventData.detailLink || `/${eventData.region}/${eventData.activityType}/activity-${eventData.id.split('-').pop()?.slice(-8) || eventData.id.slice(-8)}`
                };
                matchingEvents.push(formattedEvent);
              }
            }
          } catch (fileError) {
            console.warn(`读取文件 ${filename} 失败:`, fileError);
          }
        }
      }
      
      console.log(`📊 数据加载完成，共找到 ${matchingEvents.length} 个匹配事件:`);
      matchingEvents.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.name} - 日期: "${event.datetime || event.date || '无日期'}"`);
      });

      // 🔧 新增：按日期排序（未来活动在前，过期活动在后）
      console.log('🔄 开始排序...');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 重置到当天00:00
      
      const sortedEvents = matchingEvents.sort((a, b) => {
        console.log(`🔍 比较: "${a.name}" vs "${b.name}"`);
        const dateA = parseDateForSorting(a.datetime || a.date || '');
        const dateB = parseDateForSorting(b.datetime || b.date || '');
        
        // 判断是否过期（设置到当天00:00进行比较）
        const dateANormalized = new Date(dateA);
        dateANormalized.setHours(0, 0, 0, 0);
        const dateBNormalized = new Date(dateB);
        dateBNormalized.setHours(0, 0, 0, 0);
        
        const isAExpired = dateANormalized < today;
        const isBExpired = dateBNormalized < today;
        
        // 未来活动 vs 过期活动
        if (!isAExpired && isBExpired) {
          console.log(`  → A未过期，B已过期，A在前`);
          return -1; // A在前
        }
        if (isAExpired && !isBExpired) {
          console.log(`  → A已过期，B未过期，B在前`);
          return 1; // B在前
        }
        
        // 同类活动按时间升序
        const result = dateA.getTime() - dateB.getTime();
        console.log(`  → 排序结果: ${result} (${result < 0 ? 'A在前' : result > 0 ? 'B在前' : '相等'})`);
        return result;
      });

      console.log('📅 最终排序结果:');
      sortedEvents.forEach((event, index) => {
        const sortedDate = parseDateForSorting(event.datetime || event.date || '');
        console.log(`  ${index + 1}. ${event.name}`);
        console.log(`     原始日期: "${event.datetime || event.date || '无日期'}"`);
        console.log(`     排序键值: ${sortedDate.toISOString().split('T')[0]} (${sortedDate.getTime()})`);
      });
      
      setEvents(sortedEvents);
    } catch (error) {
      console.error('加载数据失败:', error);
      setEvents([]);
    }
    setLoading(false);
  };

  // 保存功能：更新地区汇总JSON文件
  const saveData = async () => {
    console.log('🔥 开始保存数据...');
    console.log('地区:', selectedRegion);
    console.log('活动:', selectedActivity);
    console.log('事件数量:', events.length);
    console.log('事件数据:', events);
    
    setSaving(true);
    try {
      const requestData = {
        region: selectedRegion,
        activity: selectedActivity,
        events: events
      };
      
      console.log('发送请求数据:', requestData);
      
      const response = await fetch('/api/update-region-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      
      console.log('响应状态:', response.status);
      const responseData = await response.json();
      console.log('响应数据:', responseData);
      
      if (response.ok) {
        alert(`保存成功！更新了 ${responseData.eventCount} 个活动到 ${responseData.filePath}`);
      } else {
        alert(`保存失败：${responseData.error || '未知错误'}`);
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败: ' + error);
    }
    setSaving(false);
  };

  // 删除卡片：删除四层页面JSON文件
  const removeCard = async (eventId: string) => {
    if (confirm('确定要删除这个活动吗？这将删除对应的四层页面和JSON文件！')) {
      try {
        // 调用API删除四层页面JSON文件
        const response = await fetch('/api/delete-activity-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId })
        });
        
        if (response.ok) {
          // 从当前列表中移除
          setEvents(events.filter(event => event.id !== eventId));
          alert('活动删除成功！');
        } else {
          alert('删除失败，请检查服务器配置');
        }
      } catch (error) {
        console.error('删除失败:', error);
        alert('删除失败: ' + error);
      }
    }
  };

  // 添加新卡片
  const addCard = () => {
    const timestamp = Date.now();
    const currentDate = new Date();
    const defaultDate = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
    
    const newEvent: ActivityEvent = {
      id: `recognition-${selectedActivity}-${timestamp}`,
      name: '新活动',
      title: '新活动',
      region: selectedRegion,
      description: '请填写活动描述',
      activityType: selectedActivity,
      location: '请填写地点',
      venue: '请填写地点',
      datetime: defaultDate,
      date: defaultDate,
      likes: Math.floor(Math.random() * 100),
      address: '',
      website: '',
      // 🔧 修复：使用与四层生成器一致的链接格式（包含活动名称）
      detailLink: `/${selectedRegion}/${selectedActivity}/activity-new-activity-${timestamp.toString().slice(-8)}`
    };
    
    // 添加新事件（重新加载数据时会自动排序）
    setEvents([...events, newEvent]);
  };

  // 监听选择变化
  useEffect(() => {
    loadData();
  }, [selectedRegion, selectedActivity]);

  const currentRegion = REGIONS[selectedRegion];
  const currentActivity = ACTIVITIES[selectedActivity];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">三层页面生成器</h1>
          <p className="mt-2 text-gray-600">管理地区活动页面的JSON数据</p>
          
          {/* 🆕 数据连接状态指示器 */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">实时读取四层生成器数据</span>
              </div>
              <div className="text-gray-400">|</div>
              <span className="text-green-600">
                来自 
                <a href="/admin/walkerplus-page-generator" target="_blank" className="underline hover:text-green-800">
                  WP生成器
                </a>
                和
                <a href="/admin/activity-page-generator" target="_blank" className="underline hover:text-green-800">
                  JL生成器
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* 控制面板 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* 地区选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">选择地区</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as keyof typeof REGIONS)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {Object.entries(REGIONS).map(([key, region]) => (
                  <option key={key} value={key}>
                    {region.emoji} {region.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* 活动选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">选择活动</label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value as keyof typeof ACTIVITIES)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                {Object.entries(ACTIVITIES).map(([key, activity]) => (
                  <option key={key} value={key}>
                    {activity.emoji} {activity.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-end gap-2">
              <button
                onClick={addCard}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                ➕ 添加卡片
              </button>
              <button
                onClick={() => {
                  console.log('🧪 测试排序功能 - 针对当前问题:');
                  const testDates = [
                    '2025年7月26日', 
                    '2025年7月2日', 
                    '2025年8月16日',
                    '2025年7月下旬', 
                    '2025年6月上旬', 
                    '日期待定'
                  ];
                  
                  console.log('原始日期解析:');
                  const parsedDates = testDates.map(date => {
                    const parsed = parseDateForSorting(date);
                    const result = {
                      original: date,
                      parsed: parsed.toISOString().split('T')[0],
                      timestamp: parsed.getTime()
                    };
                    console.log(`  "${date}" → ${result.parsed} (${result.timestamp})`);
                    return result;
                  });
                  
                  console.log('\n排序后的顺序:');
                  const sorted = [...parsedDates].sort((a, b) => a.timestamp - b.timestamp);
                  sorted.forEach((item, index) => {
                    console.log(`  ${index + 1}. ${item.original} → ${item.parsed}`);
                  });
                }}
                className="rounded-md bg-yellow-600 px-3 py-2 text-white hover:bg-yellow-700 text-sm"
              >
                🧪 测试排序
              </button>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={saveData}
                disabled={saving}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : '💾 保存'}
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                {showPreview ? '📝 编辑' : '👁️ 预览'}
              </button>
            </div>
          </div>
        </div>

        {/* 当前状态 */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h3 className="font-medium text-blue-900">
            当前编辑: {currentRegion.emoji} {currentRegion.displayName} → {currentActivity.emoji} {currentActivity.name}
          </h3>
          <p className="text-blue-700">共 {events.length} 个活动</p>
        </div>

        {showPreview ? (
          /* 预览模式 */
          <div className="rounded-lg border-2 border-dashed border-purple-300 p-4">
            <h3 className="mb-4 text-lg font-medium text-purple-900">页面预览</h3>
            <UniversalStaticPageTemplate
              region={{
                name: currentRegion.name,
                displayName: currentRegion.displayName,
                emoji: currentRegion.emoji,
                description: currentRegion.description,
                navigationLinks: {
                  prev: { name: '', url: '', emoji: '' },
                  next: { name: '', url: '', emoji: '' },
                  current: { name: '', url: '' }
                }
              }}
              events={events}
              regionKey={selectedRegion}
              activityKey={selectedActivity}
              activityDisplayName={currentActivity.name}
              activityEmoji={currentActivity.emoji}
            />
          </div>
        ) : (
          /* 编辑模式 */
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">加载中...</div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">暂无活动数据</div>
                <button
                  onClick={addCard}
                  className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  添加第一个活动
                </button>
              </div>
            ) : (
              // 渲染事件列表（已在loadData中排序）
              events.map((event, index) => (
                <div key={event.id} className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        #{index + 1} {event.name}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div>📅 {event.datetime || event.date || '日期待定'}</div>
                        <div>📍 {event.venue || event.location}</div>
                        <div>🔗 {event.detailLink || '无详情链接'}</div>
                        <div className="text-blue-600 font-mono text-xs">
                          📁 data/activities/{
                            event.id.startsWith('recognition-') 
                              ? `${event.id}.json`
                              : `recognition-${event.activityType}-${event.id}.json`
                          }
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 line-clamp-2">{event.description}</p>
                    </div>
                    <button
                      onClick={() => removeCard(event.id)}
                      className="ml-4 rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 