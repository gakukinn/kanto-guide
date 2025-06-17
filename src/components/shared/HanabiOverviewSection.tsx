'use client';

import { HanabiData } from '@/types/hanabi';
import { hanabiDetailConfig } from '@/config/hanabi-detail-template';

interface HanabiOverviewSectionProps {
  data: HanabiData;
  themeColors: typeof hanabiDetailConfig.themes.blue.colors;
}

export default function HanabiOverviewSection({
  data,
  themeColors,
}: HanabiOverviewSectionProps) {
  return (
    <div className="space-y-6" role="tabpanel" aria-labelledby="overview-tab">
      {/* 活动概览 */}
      <div>
        <h3 className="mb-4 text-2xl font-bold text-gray-800">活动概览</h3>
        <p className="mb-6 leading-relaxed text-gray-700">
          {data.name}是{data.history?.significance || '当地重要的花火盛典'}，
          {data.history?.established &&
            `自${data.history.established}年开始举办。`}
          每年吸引约{data.expectedVisitors}观众前来观赏。
        </p>
      </div>

      {/* 双列内容区域 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 历史意义 */}
        {data.history?.highlights && (
          <div
            className={`${themeColors.bg50} rounded-lg border p-4 ${themeColors.border200}`}
          >
            <h4 className="mb-3 font-bold text-gray-800">历史意义</h4>
            <ul className="space-y-2 text-sm text-gray-700" role="list">
              {data.history.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span
                    className={`${themeColors.text600} mt-1`}
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 活动特色 */}
        {data.venues?.[0]?.features && (
          <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">
            <h4 className="mb-3 font-bold text-gray-800">活动特色</h4>
            <ul className="space-y-2 text-sm text-gray-700" role="list">
              {data.venues[0].features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="mt-1 text-pink-600" aria-hidden="true">
                    •
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 基本信息卡片 */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div
          className={`${themeColors.bg50} rounded-lg border p-4 ${themeColors.border200} text-center`}
        >
          <div className="mb-2 text-2xl" aria-hidden="true">
            🎆
          </div>
          <div className="mb-1 text-sm text-gray-600">花火数量</div>
          <div className="font-semibold text-gray-800">
            {data.fireworksCount}
          </div>
        </div>

        <div
          className={`${themeColors.bg50} rounded-lg border p-4 ${themeColors.border200} text-center`}
        >
          <div className="mb-2 text-2xl" aria-hidden="true">
            👥
          </div>
          <div className="mb-1 text-sm text-gray-600">预计访客</div>
          <div className="font-semibold text-gray-800">
            {data.expectedVisitors}
          </div>
        </div>

        <div
          className={`${themeColors.bg50} rounded-lg border p-4 ${themeColors.border200} text-center`}
        >
          <div className="mb-2 text-2xl" aria-hidden="true">
            ⏰
          </div>
          <div className="mb-1 text-sm text-gray-600">举办时间</div>
          <div className="font-semibold text-gray-800">
            {data.time.match(/\d{1,2}:\d{2}/)?.[0]}开始
          </div>
        </div>

        <div
          className={`${themeColors.bg50} rounded-lg border p-4 ${themeColors.border200} text-center`}
        >
          <div className="mb-2 text-2xl" aria-hidden="true">
            🎫
          </div>
          <div className="mb-1 text-sm text-gray-600">门票信息</div>
          <div className="font-semibold text-gray-800">
            {data.ticketPrice || '观览免费'}
          </div>
        </div>
      </div>

      {/* 特别说明 */}
      {(data.weather || data.status) && (
        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h4 className="mb-3 flex items-center font-bold text-gray-800">
            <span className="mr-2" aria-hidden="true">
              ⚠️
            </span>
            重要提醒
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            {data.status && (
              <p>
                <strong>开催状态：</strong>
                {data.status}
              </p>
            )}
            {data.weather && (
              <p>
                <strong>天气影响：</strong>
                {data.weather}
              </p>
            )}
            {data.weatherInfo?.recommendation && (
              <p className="text-blue-700">
                <strong>提醒：</strong>
                {data.weatherInfo.recommendation}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
