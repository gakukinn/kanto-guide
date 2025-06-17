#!/usr/bin/env node

/**
 * 批量为花火页面添加SEO metadata的脚本
 * 基于GitHub上的最佳实践和Next.js官方文档
 *
 * 使用方法:
 * node scripts/batch-add-seo-metadata.js
 *
 * 功能:
 * 1. 自动扫描所有花火页面
 * 2. 读取对应的数据文件获取准确信息
 * 3. 生成符合SEO标准的metadata
 * 4. 批量更新页面文件
 */

import fs from "fs";
import { glob } from "glob";

// 区域映射
const regionMap = {
  tokyo: "东京",
  saitama: "埼玉",
  chiba: "千叶",
  kanagawa: "神奈川",
  kitakanto: "北关东",
  koshinetsu: "甲信越",
};

// 基础URL
const BASE_URL = "https://www.kanto-travel-guide.com";

// 生成基础SEO metadata的函数
function generateBasicSEOMetadata(region, eventSlug, pagePath) {
  const regionChinese = regionMap[region] || region;
  const eventName = eventSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const title = `${eventName} - ${regionChinese}花火大会完整攻略`;
  const finalTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;

  const description = `${eventName}花火大会详细指南，2025年举办。精彩花火表演，绝佳观赏地点。包含交通方式、观赏地点、祭典活动等实用信息。`;
  const finalDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  const keywords = [
    `${eventName}花火`,
    `${regionChinese}花火`,
    "花火大会",
    "2025花火",
    "夏季花火",
    "日本祭典",
  ];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords,
    openGraph: {
      title: finalTitle,
      description: finalDescription.substring(0, 100) + "...",
      type: "website",
      locale: "zh_CN",
      url: `${BASE_URL}${pagePath}`,
      siteName: "关东旅游指南",
      images: [
        {
          url: `/images/hanabi/${eventSlug}-fireworks.svg`,
          width: 1200,
          height: 630,
          alt: `${eventName}花火大会`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription.substring(0, 100) + "...",
      images: [`/images/hanabi/${eventSlug}-fireworks.svg`],
    },
    alternates: {
      canonical: pagePath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// 解析页面路径的函数
function parsePage(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const pathParts = normalizedPath.split("/");

  // 查找 app 目录的索引
  const appIndex = pathParts.findIndex((part) => part === "app");
  if (appIndex === -1) return null;

  // 从 app 后面开始解析
  const relevantParts = pathParts.slice(appIndex + 1);

  // 检查是否是花火页面
  if (!relevantParts.includes("hanabi")) return null;

  // 跳过三层页面（列表页面）
  if (relevantParts.length === 3 && relevantParts[2] === "page.tsx") {
    return null;
  }

  // 只处理四层页面（详情页面）
  if (relevantParts.length === 4 && relevantParts[3] === "page.tsx") {
    const region = relevantParts[0];
    const eventSlug = relevantParts[2];
    const pagePath = `/${region}/hanabi/${eventSlug}`;

    return {
      region,
      eventSlug,
      pagePath,
      isDetailPage: true,
    };
  }

  return null;
}

// 检查页面是否已有metadata
function hasMetadata(content) {
  return (
    content.includes("export const metadata") ||
    content.includes("export const metadata:")
  );
}

// 更新页面文件
async function updatePageFile(filePath, metadata) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // 检查是否已有metadata
    if (hasMetadata(content)) {
      return "skipped";
    }

    let newContent = content;

    // 添加Metadata导入（如果不存在）
    if (!content.includes("import { Metadata }")) {
      // 在第一个import语句后添加
      const firstImportMatch = content.match(/^import[^;]+;/m);
      if (firstImportMatch) {
        newContent = newContent.replace(
          firstImportMatch[0],
          firstImportMatch[0] + '\nimport { Metadata } from "next";'
        );
      } else {
        newContent = 'import { Metadata } from "next";\n' + newContent;
      }
    }

    // 构建metadata导出
    const metadataExport = `
// SEO元数据配置
export const metadata: Metadata = ${JSON.stringify(metadata, null, 2)};
`;

    // 在第一个export default前添加metadata
    const exportMatch = newContent.match(/^export\s+default/m);
    if (exportMatch) {
      newContent = newContent.replace(
        exportMatch[0],
        metadataExport + "\n" + exportMatch[0]
      );
    } else {
      // 如果找不到export default，在文件末尾添加
      newContent += metadataExport;
    }

    // 在文件末尾添加静态配置（如果不存在）
    if (
      !content.includes("export const dynamic") &&
      !content.includes("export const revalidate")
    ) {
      const staticConfig = `
// 静态生成配置
export const dynamic = "force-static";
export const revalidate = 86400; // 24小时重新验证
`;
      newContent += staticConfig;
    }

    fs.writeFileSync(filePath, newContent, "utf-8");
    return "success";
  } catch (error) {
    console.log(`❌ 更新文件失败 ${filePath}: ${error.message}`);
    return "failed";
  }
}

// 主函数
async function main() {
  console.log("🚀 开始批量添加SEO metadata...\n");

  // 查找所有花火页面文件
  const pattern = "src/app/**/hanabi/**/page.tsx";
  const files = glob.sync(pattern);

  console.log(`📁 找到 ${files.length} 个花火页面文件\n`);

  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const file of files) {
    console.log(`📄 处理: ${file}`);

    // 解析页面路径
    const pageInfo = parsePage(file);
    if (!pageInfo) {
      console.log(`⏭️  跳过三层列表页面: ${file}`);
      skipCount++;
      continue;
    }

    try {
      // 生成基础SEO metadata
      const metadata = generateBasicSEOMetadata(
        pageInfo.region,
        pageInfo.eventSlug,
        pageInfo.pagePath
      );

      // 更新页面文件
      const result = await updatePageFile(file, metadata);

      if (result === "success") {
        console.log(`✅ 成功更新: ${file}`);
        successCount++;
      } else if (result === "skipped") {
        console.log(`⏭️  页面已有metadata，跳过: ${file}`);
        skipCount++;
      } else {
        console.log(`❌ 更新失败: ${file}`);
        failCount++;
      }
    } catch (error) {
      console.log(`❌ 处理失败 ${file}: ${error.message}`);
      failCount++;
    }

    console.log(""); // 空行分隔
  }

  console.log("📊 处理完成统计:");
  console.log(`✅ 成功更新: ${successCount} 个文件`);
  console.log(`⏭️  跳过: ${skipCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);
  console.log(`📁 总计: ${files.length} 个文件`);
}

main().catch(console.error);
