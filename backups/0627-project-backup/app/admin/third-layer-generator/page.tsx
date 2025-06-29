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
  matsuri: { key: 'matsuri', name: '传统祭典', emoji: '🏮' }
};

export default function ThirdLayerGenerator() {
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof REGIONS>('tokyo');
  const [selectedActivity, setSelectedActivity] = useState<keyof typeof ACTIVITIES>('hanabi');
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // 加载四层页面JSON数据
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
                  date: eventData.datetime || eventData.date || '日期待定',
                  likes: eventData.likes || Math.floor(Math.random() * 100),
                  detailLink: eventData.detailLink || `/${eventData.region}/${eventData.activityType}/activity-${eventData.id.split('-').pop()}`
                };
                matchingEvents.push(formattedEvent);
              }
            }
          } catch (fileError) {
            console.warn(`读取文件 ${filename} 失败:`, fileError);
          }
        }
      }
      
      setEvents(matchingEvents);
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
    const newEvent: ActivityEvent = {
      id: `recognition-${selectedActivity}-${timestamp}`,
      name: '新活动',
      title: '新活动',
      region: selectedRegion,
      description: '请填写活动描述',
      activityType: selectedActivity,
      location: '请填写地点',
      venue: '请填写地点',
      datetime: '日期待定',
      date: '日期待定',
      likes: Math.floor(Math.random() * 100),
      address: '',
      website: '',
      detailLink: `/${selectedRegion}/${selectedActivity}/activity-${timestamp.toString().slice(-8)}`
    };
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
              events.map((event, index) => (
                <div key={event.id} className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        #{index + 1} {event.name}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div>📅 {event.datetime || '日期待定'}</div>
                        <div>📍 {event.venue || event.location}</div>
                        <div>🔗 {event.detailLink || '无详情链接'}</div>
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