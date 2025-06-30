/**
 * 通用图片上传管理系统
 * 功能：自动读取所有页面结构，支持批量图片上传
 * 支持：6个地区 × 6个活动类型 = 36个分类的图片管理
 */

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface PageStructure {
  [region: string]: {
    name: string;
    activities: {
      [activity: string]: {
        name: string;
        listPage: boolean;
        detailPages: Array<{
          name: string;
          url: string;
          hasImages: boolean;
        }>;
      };
    };
  };
}

interface UploadFile extends File {
  preview: string;
  id: string;
}

export default function UniversalImageUploadPage() {
  const [pageStructure, setPageStructure] = useState<PageStructure>({});
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // 页面加载时扫描结构
  useEffect(() => {
    scanPageStructure();
  }, []);

  /**
   * 扫描页面结构
   */
  const scanPageStructure = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/scan-pages/');
      if (response.ok) {
        const structure = await response.json();
        setPageStructure(structure);

        // 自动选择第一个地区
        const firstRegion = Object.keys(structure)[0];
        if (firstRegion) {
          setSelectedRegion(firstRegion);
          const firstActivity = Object.keys(
            structure[firstRegion].activities
          )[0];
          if (firstActivity) {
            setSelectedActivity(firstActivity);
            const firstPage =
              structure[firstRegion].activities[firstActivity].detailPages[0];
            if (firstPage) {
              setSelectedPage(firstPage.name);
            }
          }
        }
      }
    } catch (error) {
      console.error('扫描页面结构失败:', error);
    } finally {
      setIsScanning(false);
    }
  };

  /**
   * 拖拽上传配置
   */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.svg'],
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: acceptedFiles => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        })
      ) as UploadFile[];

      setFiles(prev => [...prev, ...newFiles]);
    },
  });

  /**
   * 删除文件
   */
  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const updated = prev.filter(file => file.id !== fileId);
      // 清理预览URL
      const removedFile = prev.find(file => file.id === fileId);
      if (removedFile) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return updated;
    });
  };

  /**
   * 上传图片
   */
  const uploadImages = async () => {
    if (
      !selectedRegion ||
      !selectedActivity ||
      !selectedPage ||
      files.length === 0
    ) {
      alert('请选择目标页面并添加图片');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadResults([]);

    try {
      const formData = new FormData();
      formData.append('region', selectedRegion);
      formData.append('activity', selectedActivity);
      formData.append('page', selectedPage);

      files.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await fetch('/api/upload-universal-images/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const results = await response.json();
        setUploadResults(results);

        // 清空文件列表
        files.forEach(file => URL.revokeObjectURL(file.preview));
        setFiles([]);

        // 刷新页面结构
        await scanPageStructure();

        alert(`成功上传 ${results.report.successCount} 张图片！`);
      } else {
        throw new Error('上传失败');
      }
    } catch (error) {
      console.error('上传错误:', error);
      alert('上传失败，请重试');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  /**
   * 获取当前活动的详细页面
   */
  const getCurrentDetailPages = () => {
    if (!selectedRegion || !selectedActivity) return [];
    return (
      pageStructure[selectedRegion]?.activities[selectedActivity]
        ?.detailPages || []
    );
  };

  /**
   * 获取统计信息
   */
  const getStatistics = () => {
    let totalRegions = 0;
    let totalActivities = 0;
    let totalPages = 0;
    let pagesWithImages = 0;

    Object.entries(pageStructure).forEach(([regionKey, regionData]) => {
      totalRegions++;
      Object.entries(regionData.activities).forEach(
        ([activityKey, activityData]) => {
          totalActivities++;
          totalPages += activityData.detailPages.length;
          pagesWithImages += activityData.detailPages.filter(
            page => page.hasImages
          ).length;
        }
      );
    });

    return { totalRegions, totalActivities, totalPages, pagesWithImages };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            🖼️ 通用图片上传管理系统
          </h1>
          <p className="text-lg text-gray-600">
            自动读取所有页面结构，支持批量图片上传和管理
          </p>
        </div>

        {/* 统计信息 */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalRegions}
            </div>
            <div className="text-sm text-gray-600">地区数量</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalActivities}
            </div>
            <div className="text-sm text-gray-600">活动类型</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalPages}
            </div>
            <div className="text-sm text-gray-600">详细页面</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pagesWithImages}
            </div>
            <div className="text-sm text-gray-600">有图片页面</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 左侧：页面选择 */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              📋 选择目标页面
            </h2>

            {isScanning ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <p className="text-gray-600">正在扫描页面结构...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 地区选择 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    选择地区
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={e => {
                      setSelectedRegion(e.target.value);
                      setSelectedActivity('');
                      setSelectedPage('');
                    }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">请选择地区</option>
                    {Object.entries(pageStructure).map(([key, data]) => (
                      <option key={key} value={key}>
                        {data.name} ({key})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 活动类型选择 */}
                {selectedRegion && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      选择活动类型
                    </label>
                    <select
                      value={selectedActivity}
                      onChange={e => {
                        setSelectedActivity(e.target.value);
                        setSelectedPage('');
                      }}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">请选择活动类型</option>
                      {Object.entries(
                        pageStructure[selectedRegion].activities
                      ).map(([key, data]) => (
                        <option key={key} value={key}>
                          {data.name} ({data.detailPages.length} 个页面)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 具体页面选择 */}
                {selectedActivity && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      选择具体页面
                    </label>
                    <select
                      value={selectedPage}
                      onChange={e => setSelectedPage(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">请选择页面</option>
                      {getCurrentDetailPages().map(page => (
                        <option key={page.name} value={page.name}>
                          {page.name} {page.hasImages ? '🖼️' : '📄'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 选择信息预览 */}
                {selectedRegion && selectedActivity && selectedPage && (
                  <div className="rounded-md bg-blue-50 p-4">
                    <h3 className="font-medium text-blue-800">当前选择：</h3>
                    <p className="text-sm text-blue-600">
                      {pageStructure[selectedRegion].name} →{' '}
                      {
                        pageStructure[selectedRegion].activities[
                          selectedActivity
                        ].name
                      }{' '}
                      → {selectedPage}
                    </p>
                    <p className="text-sm text-blue-600">
                      URL: /{selectedRegion}/{selectedActivity}/{selectedPage}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 右侧：图片上传 */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              🖼️ 图片上传
            </h2>

            {/* 拖拽上传区域 */}
            <div
              {...getRootProps()}
              className={`mb-6 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="mb-4 text-4xl">📁</div>
              {isDragActive ? (
                <p className="text-blue-600">拖拽图片到这里...</p>
              ) : (
                <div>
                  <p className="mb-2 text-gray-600">
                    拖拽图片到这里，或点击选择文件
                  </p>
                  <p className="text-sm text-gray-500">
                    支持 JPG、PNG、WebP、SVG 格式，最大 10MB，最多 10 张
                  </p>
                </div>
              )}
            </div>

            {/* 图片预览 */}
            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">
                  图片预览 ({files.length})
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {files.map(file => (
                    <div key={file.id} className="group relative">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={file.preview}
                          alt={file.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 上传按钮 */}
            <button
              onClick={uploadImages}
              disabled={uploading || !selectedPage || files.length === 0}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  上传中... ({uploadProgress}%)
                </div>
              ) : (
                `上传 ${files.length} 张图片`
              )}
            </button>

            {/* 上传结果 */}
            {uploadResults.length > 0 && (
              <div className="mt-6 rounded-md bg-green-50 p-4">
                <h3 className="font-medium text-green-800">上传成功！</h3>
                <ul className="mt-2 text-sm text-green-600">
                  {uploadResults.map((result, index) => (
                    <li key={index}>✅ {result.filename}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 页面结构预览 */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            🗂️ 页面结构总览
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(pageStructure).map(([regionKey, regionData]) => (
              <div
                key={regionKey}
                className="rounded-lg border border-gray-200 p-4"
              >
                <h3 className="mb-3 font-bold text-gray-800">
                  {regionData.name}
                </h3>
                {Object.entries(regionData.activities).map(
                  ([activityKey, activityData]) => (
                    <div key={activityKey} className="mb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {activityData.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {activityData.detailPages.length} 页面
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${(activityData.detailPages.filter(p => p.hasImages).length / Math.max(activityData.detailPages.length, 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
