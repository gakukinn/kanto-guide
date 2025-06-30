// @ts-nocheck
// @ts-ignore
import axios from 'axios';
// @ts-ignore
declare var process: any;
import { Activity, ApiResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取所有活动
export async function getAllActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<ApiResponse<Activity[]>>('/activities?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('获取活动数据失败:', error);
    return [];
  }
}

// 根据地区和活动类型获取活动
export async function getActivitiesByRegionAndType(
  regionId: string,
  activityTypeId: string
): Promise<Activity[]> {
  try {
    const response = await api.get<ApiResponse<Activity[]>>(
      `/activities?filters[region][id][$eq]=${regionId}&filters[activityType][id][$eq]=${activityTypeId}&populate=*`
    );
    return response.data.data;
  } catch (error) {
    console.error('获取活动数据失败:', error);
    return [];
  }
}

// 根据ID获取单个活动
export async function getActivityById(id: string): Promise<Activity | null> {
  try {
    const response = await api.get<ApiResponse<Activity>>(`/activities/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('获取活动详情失败:', error);
    return null;
  }
}

// 创建新活动
export async function createActivity(activity: Partial<Activity>): Promise<Activity | null> {
  try {
    const response = await api.post<ApiResponse<Activity>>('/activities', {
      data: activity
    });
    return response.data.data;
  } catch (error) {
    console.error('创建活动失败:', error);
    return null;
  }
}

// 更新活动
export async function updateActivity(id: string, activity: Partial<Activity>): Promise<Activity | null> {
  try {
    const response = await api.put<ApiResponse<Activity>>(`/activities/${id}`, {
      data: activity
    });
    return response.data.data;
  } catch (error) {
    console.error('更新活动失败:', error);
    return null;
  }
}

// 删除活动
export async function deleteActivity(id: string): Promise<boolean> {
  try {
    await api.delete(`/activities/${id}`);
    return true;
  } catch (error) {
    console.error('删除活动失败:', error);
    return false;
  }
} 