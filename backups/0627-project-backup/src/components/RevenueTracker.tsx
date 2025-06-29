// 收入追踪仪表板组件
'use client';

import { useState, useEffect } from 'react';

interface RevenueData {
  source: string;
  amount: number;
  currency: string;
  date: string;
  type: 'affiliate' | 'adsense' | 'direct';
}

export default function RevenueTracker() {
  const [revenues, setRevenues] = useState<RevenueData[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // 模拟收入数据（实际使用时连接真实API）
  useEffect(() => {
    const sampleData: RevenueData[] = [
      {
        source: 'Booking.com',
        amount: 45.5,
        currency: 'USD',
        date: '2025-01-13',
        type: 'affiliate',
      },
      {
        source: 'Google AdSense',
        amount: 12.3,
        currency: 'USD',
        date: '2025-01-13',
        type: 'adsense',
      },
      {
        source: 'Agoda',
        amount: 18.25,
        currency: 'USD',
        date: '2025-01-12',
        type: 'affiliate',
      },
    ];

    setRevenues(sampleData);
    setTotalRevenue(sampleData.reduce((sum, rev) => sum + rev.amount, 0));
  }, []);

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">收入追踪</h2>

      {/* 总收入显示 */}
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="text-lg font-semibold text-green-800">本月总收入</h3>
        <p className="text-3xl font-bold text-green-600">
          ${totalRevenue.toFixed(2)}
        </p>
      </div>

      {/* 收入明细 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">收入明细</h4>
        {revenues.map((revenue, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-200 pb-2"
          >
            <div>
              <p className="font-medium text-gray-800">{revenue.source}</p>
              <p className="text-sm text-gray-500">{revenue.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">+${revenue.amount}</p>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  revenue.type === 'affiliate'
                    ? 'bg-blue-100 text-blue-800'
                    : revenue.type === 'adsense'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-purple-100 text-purple-800'
                }`}
              >
                {revenue.type === 'affiliate'
                  ? '联盟营销'
                  : revenue.type === 'adsense'
                    ? '广告收入'
                    : '直接收入'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 收入目标 */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="text-lg font-semibold text-blue-800">月度目标</h4>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-blue-600">进度</span>
          <span className="font-bold text-blue-800">
            ${totalRevenue.toFixed(2)} / $500.00
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-blue-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${Math.min(100, (totalRevenue / 500) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
