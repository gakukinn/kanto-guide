'use client';

import { useState, useEffect } from 'react';

interface ActivityStat {
  type: string;
  name: string;
  count: number;
}

interface Activity {
  id: string;
  name: string;
  region: string;
  datetime: string;
  verified: boolean;
}

const ACTIVITY_TYPES = {
  hanabi: '花火大会',
  matsuri: '传统祭典', 
  hanami: '花见会',
  momiji: '红叶狩',
  illumination: '灯光秀',
  culture: '文艺术'
};

const REGION_NAMES = {
  tokyo: '东京',
  saitama: '埼玉',
  chiba: '千叶',
  kanagawa: '神奈川',
  kitakanto: '北关东',
  koshinetsu: '甲信越'
};

type SortField = 'name' | 'region' | 'datetime';
type SortDirection = 'asc' | 'desc';

export default function ActivityManagerPage() {
  const [stats, setStats] = useState<ActivityStat[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // 排序和筛选状态
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());
  
  // 数据库备份状态
  const [backupLoading, setBackupLoading] = useState(false);
  const [backupMessage, setBackupMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // 排序函数
  const sortActivities = (activities: Activity[], field: SortField, direction: SortDirection) => {
    return [...activities].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      // 地区名称本地化
      if (field === 'region') {
        aValue = REGION_NAMES[a.region as keyof typeof REGION_NAMES] || a.region;
        bValue = REGION_NAMES[b.region as keyof typeof REGION_NAMES] || b.region;
      }
      
      if (direction === 'asc') {
        return aValue.localeCompare(bValue, 'zh-CN');
      } else {
        return bValue.localeCompare(aValue, 'zh-CN');
      }
    });
  };

  // 筛选函数
  const filterActivities = (activities: Activity[], region: string) => {
    if (!region) return activities;
    return activities.filter(activity => activity.region === region);
  };

  // 处理排序点击
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 获取排序箭头
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-gray-400 ml-1">↕️</span>;
    }
    return sortDirection === 'asc' 
      ? <span className="text-blue-600 ml-1">↑</span>
      : <span className="text-blue-600 ml-1">↓</span>;
  };

  // 更新筛选和排序后的活动列表
  useEffect(() => {
    let result = filterActivities(activities, selectedRegion);
    result = sortActivities(result, sortField, sortDirection);
    setFilteredActivities(result);
  }, [activities, selectedRegion, sortField, sortDirection]);

  // 获取当前活动类型的所有地区
  const getAvailableRegions = () => {
    const regions = [...new Set(activities.map(activity => activity.region))];
    return regions.sort();
  };

  // 处理活动选中状态
  const handleActivitySelect = (activityId: string, checked: boolean) => {
    const newSelected = new Set(selectedActivities);
    if (checked) {
      newSelected.add(activityId);
    } else {
      newSelected.delete(activityId);
    }
    setSelectedActivities(newSelected);
  };

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredActivities.map(activity => activity.id));
      setSelectedActivities(allIds);
    } else {
      setSelectedActivities(new Set());
    }
  };

  // 加载统计数据
  const loadStats = async () => {
    try {
      const response = await fetch('/api/activity-stats');
      const data = await response.json();
      setStats(data.stats || []);
    } catch (error) {
      console.error('加载统计失败:', error);
    }
  };

  // 加载指定类型的活动
  const loadActivities = async (type: string) => {
    if (!type) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/activity-list?type=${type}`);
      const data = await response.json();
      setActivities(data.activities || []);
      // 重置筛选条件
      setSelectedRegion('');
      setSortField('name');
      setSortDirection('asc');
    } catch (error) {
      console.error('加载活动列表失败:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // 修改活动类型
  const changeActivityType = async (activityId: string, fromType: string, toType: string) => {
    if (fromType === toType) return;
    
    const confirmMsg = `确认将活动从 ${ACTIVITY_TYPES[fromType as keyof typeof ACTIVITY_TYPES]} 改为 ${ACTIVITY_TYPES[toType as keyof typeof ACTIVITY_TYPES]}？`;
    if (!confirm(confirmMsg)) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/change-activity-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId,
          fromType,
          toType
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: '活动类型修改成功！' });
        await loadStats();
        await loadActivities(selectedType);
      } else {
        setMessage({ type: 'error', text: data.error || '修改失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' });
    } finally {
      setLoading(false);
    }
  };

  // 数据库备份功能
  const backupDatabase = async () => {
    setBackupLoading(true);
    setBackupMessage(null);
    
    try {
      const response = await fetch('/api/backup-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBackupMessage({ 
          type: 'success', 
          text: `数据库备份成功！备份文件：${data.backupFile}` 
        });
      } else {
        setBackupMessage({ 
          type: 'error', 
          text: data.error || '备份失败' 
        });
      }
    } catch (error) {
      setBackupMessage({ 
        type: 'error', 
        text: '网络错误，备份失败' 
      });
    } finally {
      setBackupLoading(false);
    }
  };

  // 删除活动
  const deleteActivity = async (activityId: string, type: string, name: string) => {
    const confirmMsg = `确认删除活动 "${name}"？此操作不可恢复！`;
    if (!confirm(confirmMsg)) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/delete-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId,
          type
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: '活动删除成功！' });
        await loadStats();
        await loadActivities(selectedType);
      } else {
        setMessage({ type: 'error', text: data.error || '删除失败' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '网络错误' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (selectedType) {
      loadActivities(selectedType);
      setSelectedActivities(new Set()); // 清除选中状态
    }
  }, [selectedType]);

  // 自动清除消息
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 自动清除备份消息
  useEffect(() => {
    if (backupMessage) {
      const timer = setTimeout(() => setBackupMessage(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [backupMessage]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🗄️ 数据库活动管理</h1>
        
        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* 统计概览 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 活动统计概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(ACTIVITY_TYPES).map(([type, name]) => {
              const stat = stats.find(s => s.type === type);
              return (
                <div 
                  key={type}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedType(selectedType === type ? '' : type)}
                >
                  <div className="text-sm text-gray-600">{name}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat?.count || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 数据库管理 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🗄️ 数据库管理</h2>
          
          {/* 备份消息提示 */}
          {backupMessage && (
            <div className={`mb-4 p-4 rounded-lg ${
              backupMessage.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {backupMessage.text}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">数据库备份</h3>
              <p className="text-sm text-gray-600 mb-4">
                创建当前数据库的备份副本，备份文件将保存在 <code className="bg-gray-100 px-1 rounded">backups/</code> 目录中
              </p>
            </div>
            
            <button
              onClick={backupDatabase}
              disabled={backupLoading}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                backupLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
              }`}
            >
              {backupLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  备份中...
                </div>
              ) : (
                <div className="flex items-center">
                  💾 立即备份
                </div>
              )}
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">备份提醒</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>建议在进行重要操作前先备份数据库，以防数据丢失。备份文件包含所有活动数据和设置。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 活动列表 */}
        {selectedType && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 {ACTIVITY_TYPES[selectedType as keyof typeof ACTIVITY_TYPES]} 活动列表
                </h2>
                
                {/* 地区筛选器 */}
                {activities.length > 0 && (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">筛选地区：</span>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">全部地区</option>
                      {getAvailableRegions().map(region => (
                        <option key={region} value={region}>
                          {REGION_NAMES[region as keyof typeof REGION_NAMES] || region}
                        </option>
                      ))}
                    </select>
                    
                    <span className="text-sm text-gray-500">
                      显示 {filteredActivities.length} / {activities.length} 条
                    </span>
                    
                    {selectedActivities.size > 0 && (
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        已选中 {selectedActivities.size} 项
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-gray-500">⏳ 加载中...</div>
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-500">暂无活动记录</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                              checked={filteredActivities.length > 0 && selectedActivities.size === filteredActivities.length}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                            <span 
                              className="cursor-pointer hover:text-gray-700"
                              onClick={() => handleSort('name')}
                            >
                              活动名称 {getSortIcon('name')}
                            </span>
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('region')}
                        >
                          <div className="flex items-center">
                            地区
                            {getSortIcon('region')}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('datetime')}
                        >
                          <div className="flex items-center">
                            时间
                            {getSortIcon('datetime')}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredActivities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                                checked={selectedActivities.has(activity.id)}
                                onChange={(e) => handleActivitySelect(activity.id, e.target.checked)}
                              />
                              {activity.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {REGION_NAMES[activity.region as keyof typeof REGION_NAMES] || activity.region}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {activity.datetime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              activity.verified 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.verified ? '已验证' : '未验证'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {/* 修改类型下拉菜单 */}
                            <select
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                              onChange={(e) => {
                                if (e.target.value) {
                                  changeActivityType(activity.id, selectedType, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              defaultValue=""
                            >
                              <option value="">改为...</option>
                              {Object.entries(ACTIVITY_TYPES).map(([type, name]) => (
                                type !== selectedType && (
                                  <option key={type} value={type}>{name}</option>
                                )
                              ))}
                            </select>
                            
                            {/* 删除按钮 */}
                            <button
                              onClick={() => deleteActivity(activity.id, selectedType, activity.name)}
                              className="text-red-600 hover:text-red-900 text-xs"
                            >
                              删除
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 