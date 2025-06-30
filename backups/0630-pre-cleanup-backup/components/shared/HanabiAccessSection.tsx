'use client';

import { HanabiData } from '@/types/hanabi';
import { hanabiDetailConfig } from '@/config/hanabi-detail-template';

interface HanabiAccessSectionProps {
  data: HanabiData;
  themeColors: typeof hanabiDetailConfig.themes.blue.colors;
}

export default function HanabiAccessSection({
  data,
  themeColors,
}: HanabiAccessSectionProps) {
  return (
    <div className="space-y-6" role="tabpanel" aria-labelledby="access-tab">
      <h3 className="mb-4 text-2xl font-bold text-gray-800">交通指南</h3>

      {/* 交通信息 */}
      {data.access.map((accessInfo, index) => (
        <div
          key={index}
          className={`${themeColors.bg50} rounded-lg border p-6 ${themeColors.border200}`}
        >
          <h4 className="mb-4 text-xl font-bold text-gray-800">
            前往 {accessInfo.venue}
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {accessInfo.stations.map((station, stationIndex) => (
              <div
                key={stationIndex}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <h5 className="mb-3 flex items-center font-semibold text-gray-800">
                  <span className="mr-2" aria-hidden="true">
                    🚇
                  </span>
                  {station.name}
                </h5>

                {/* 线路信息 */}
                {station.lines && station.lines.length > 0 && (
                  <div className="mb-3">
                    <div className="mb-2 text-sm text-gray-600">可用线路：</div>
                    <div className="flex flex-wrap gap-2">
                      {station.lines.map((line, lineIndex) => (
                        <span
                          key={lineIndex}
                          className={`${themeColors.bg200} ${themeColors.text800} rounded-full border px-2 py-1 text-xs ${themeColors.border200}`}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 步行时间 */}
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <span aria-hidden="true">🚶</span>
                  <span>{station.walkTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 交通建议 */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
          <span className="mr-2" aria-hidden="true">
            💡
          </span>
          交通建议
        </h4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h5 className="mb-3 font-semibold text-gray-800">最佳路线</h5>
            <ul className="space-y-2 text-sm text-gray-700" role="list">
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>建议选择距离最近的车站，减少步行时间</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>避开换乘复杂的路线，选择直达线路</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>花火大会当天车站会很拥挤，预留充足时间</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-3 font-semibold text-gray-800">返程注意</h5>
            <ul className="space-y-2 text-sm text-gray-700" role="list">
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>花火结束后车站会非常拥挤</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>可考虑提前离场或稍晚离场避开人流</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="mt-1 text-amber-600" aria-hidden="true">
                  •
                </span>
                <span>确认最晚班车时间，安排好返程计划</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 停车信息 */}
      {data.mapInfo?.parking && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h4 className="mb-3 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2" aria-hidden="true">
              🚗
            </span>
            停车信息
          </h4>
          <p className="mb-4 text-gray-700">{data.mapInfo.parking}</p>

          {data.mapInfo.parking.includes('无') ||
          data.mapInfo.parking.includes('×') ? (
            <div className="rounded-lg border border-red-300 bg-red-100 p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <span aria-hidden="true">⚠️</span>
                <span className="font-semibold">强烈建议使用公共交通</span>
              </div>
              <p className="mt-2 text-sm text-red-700">
                由于停车场有限或不提供停车服务，建议优先选择电车等公共交通方式前往。
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-green-300 bg-green-100 p-4">
              <div className="text-sm text-green-700">
                请注意停车场可能会很快满载，建议提早到达或选择公共交通。
              </div>
            </div>
          )}
        </div>
      )}

      {/* 时间规划建议 */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h4 className="mb-4 flex items-center text-xl font-bold text-gray-800">
          <span className="mr-2" aria-hidden="true">
            ⏰
          </span>
          时间规划
        </h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 font-semibold text-gray-800">出发时间</div>
              <div className="text-gray-700">
                建议提前1-2小时
                <br />
                避开交通高峰
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 font-semibold text-gray-800">到达会场</div>
              <div className="text-gray-700">
                开始前30-60分钟
                <br />
                确保有好位置
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2 font-semibold text-gray-800">返程规划</div>
              <div className="text-gray-700">
                确认末班车时间
                <br />
                预留缓冲时间
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-white p-4">
            <p className="text-sm text-gray-700">
              <strong>温馨提示：</strong>
              花火大会当天公共交通会比平时拥挤，建议使用IC卡（Suica/PASMO）快速通过检票口，
              并提前了解备用路线以应对可能的交通管制。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
