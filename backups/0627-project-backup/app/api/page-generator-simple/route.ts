/**
 * 简化版页面生成器API
 * @description 专门用于测试基本的数据库记录到页面生成功能
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../src/generated/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

// 简化版页面内容生成
function generateSimplePage(dbRecord: any, regionKey: string, eventId: string): string {
  return `/**
 * ${dbRecord.name} - 花火详情页面 (简化版)
 * 基于数据库记录生成
 * 生成时间: ${new Date().toLocaleString('zh-CN')}
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 页面元数据
export const metadata: Metadata = {
  title: '${dbRecord.name} | 日本东部花火指南',
  description: '${dbRecord.name}将于${dbRecord.date}举行，地点位于${dbRecord.location}。',
  keywords: ['${dbRecord.name}', '花火大会', '${regionKey}', '2025年花火'],
};

export default function HanabiDetailPage() {
  const eventData = {
    id: '${eventId}',
    name: '${dbRecord.name}',
    date: '${dbRecord.date}',
    location: '${dbRecord.location}',
    regionKey: '${regionKey}',
    databaseId: '${dbRecord.id}'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🎆 {eventData.name}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">📅 基本信息</h2>
                <p><strong>举办日期:</strong> {eventData.date}</p>
                <p><strong>活动地点:</strong> {eventData.location}</p>
                <p><strong>地区:</strong> {eventData.regionKey}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2">🎯 活动特色</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>精彩的花火表演</li>
                  <li>夏日浪漫氛围</li>
                  <li>家庭友好活动</li>
                  <li>免费观赏</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">🚇 交通指南</h2>
                <p>建议乘坐公共交通前往，活动当天人流较多。</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-800 mb-2">⚠️ 注意事项</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>雨天可能取消</li>
                  <li>请提前到达</li>
                  <li>携带防蚊用品</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              数据库ID: {eventData.databaseId} | 
              生成时间: ${new Date().toLocaleString('zh-CN')} | 
              页面类型: 简化版测试页面
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  return [];
}
`;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 简化版页面生成器启动');
    
    const body = await request.json();
    const { databaseId } = body;

    if (!databaseId) {
      return NextResponse.json({
        success: false,
        message: '缺少数据库ID参数'
      }, { status: 400 });
    }

    console.log('📖 读取数据库记录:', databaseId);
    
    // 获取数据库记录
    const dbRecord = await prisma.hanabiEvent.findUnique({
      where: { id: databaseId },
      include: { region: true }
    });
    
    if (!dbRecord) {
      console.log('❌ 记录不存在:', databaseId);
      return NextResponse.json({
        success: false,
        message: '未找到指定的数据库记录',
        error: `记录 ${databaseId} 不存在`
      }, { status: 404 });
    }
    
    console.log('✅ 成功获取记录:', dbRecord.name);
    
    // 确定地区和事件ID
    const regionKey = dbRecord.region?.code || 'kanagawa';
    const eventId = dbRecord.eventId;
    
    console.log('📝 生成页面内容...');
    // 生成简化页面内容
    const pageContent = generateSimplePage(dbRecord, regionKey, eventId);
    
    // 确定文件路径
    const regionDir = path.join(process.cwd(), 'app', regionKey, 'hanabi');
    const filePath = path.join(regionDir, eventId, 'page.tsx');
    
    console.log('📂 创建目录:', path.dirname(filePath));
    // 确保目录存在
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    console.log('💾 写入页面文件:', filePath);
    // 写入文件
    await fs.writeFile(filePath, pageContent, 'utf8');
    
    console.log('✅ 简化版页面生成成功!');
    
    return NextResponse.json({
      success: true,
      message: '简化版页面生成成功！',
      data: {
        eventId: eventId,
        name: dbRecord.name,
        filePath: filePath.replace(process.cwd(), '').replace(/\\/g, '/'),
        url: `/${regionKey}/hanabi/${eventId}`,
        regionKey,
        databaseId: dbRecord.id,
        pageType: 'simplified',
        generatedAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ 简化版API错误:', error);
    return NextResponse.json({
      success: false,
      message: '简化版生成失败',
      error: error instanceof Error ? error.message : '未知错误',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 