/**
 * 花火链接验证组件 - 开发时自动验证
 * @description 在开发环境中自动验证花火链接，提供实时错误提示
 * @author AI Assistant
 * @date 2025-06-14
 */

'use client';

import { useEffect, useState } from 'react';
import {
  validateHanabiEvents,
  generateHanabiDetailLink,
  getHanabiOfficialWebsite,
} from '../utils/hanabi-link-manager';

interface ValidationResult {
  valid: any[];
  invalid: any[];
  warnings: string[];
}

interface HanabiLinkValidatorProps {
  events: any[];
  pageName: string;
  isDevelopment?: boolean;
}

export default function HanabiLinkValidator({
  events,
  pageName,
  isDevelopment = process.env.NODE_ENV === 'development',
}: HanabiLinkValidatorProps) {
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!isDevelopment) return;

    // 验证链接
    const result = validateHanabiEvents(events);
    setValidation(result);

    // 在控制台输出验证结果
    if (result.warnings.length > 0) {
      console.group(`🔍 ${pageName} 链接验证警告`);
      result.warnings.forEach(warning => {
        console.warn(warning);
      });
      console.groupEnd();
    }

    if (result.invalid.length > 0) {
      console.group(`❌ ${pageName} 链接验证错误`);
      result.invalid.forEach(event => {
        const correctLink = generateHanabiDetailLink(event.id);
        const correctWebsite = getHanabiOfficialWebsite(event.id);

        console.error(`事件: ${event.name} (${event.id})`);
        console.error(`  当前链接: ${event.detailLink || '未设置'}`);
        console.error(`  建议链接: ${correctLink || '无详情页面'}`);
        console.error(`  官方网站: ${correctWebsite || '未配置'}`);
      });
      console.groupEnd();
    }

    if (result.invalid.length === 0 && result.warnings.length === 0) {
      console.log(`✅ ${pageName} 所有链接验证通过`);
    }
  }, [events, pageName, isDevelopment]);

  // 生产环境不显示验证组件
  if (!isDevelopment || !validation) {
    return null;
  }

  // 如果没有问题，不显示组件
  if (validation.invalid.length === 0 && validation.warnings.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-red-800">
            🔍 链接验证警告
          </h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            {showDetails ? '隐藏' : '详情'}
          </button>
        </div>

        <div className="mb-2 text-sm text-red-700">
          {pageName}: {validation.invalid.length} 个问题,{' '}
          {validation.warnings.length} 个警告
        </div>

        {showDetails && (
          <div className="mt-3 space-y-2">
            {validation.warnings.slice(0, 3).map((warning, index) => (
              <div
                key={index}
                className="rounded bg-red-100 p-2 text-xs text-red-600"
              >
                {warning}
              </div>
            ))}

            {validation.warnings.length > 3 && (
              <div className="text-xs text-red-500">
                还有 {validation.warnings.length - 3} 个警告...
              </div>
            )}

            <div className="mt-3 border-t border-red-200 pt-2">
              <div className="text-xs text-red-600">
                🔧 修复建议: 运行{' '}
                <code className="rounded bg-red-100 px-1">
                  node scripts/auto-fix-hanabi-links.js
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
