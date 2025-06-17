import fs from 'fs/promises';
import path from 'path';

interface MatsuriEvent {
  id: string;
  title: string;
  japaneseName: string;
  englishName: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  highlights: string[];
  likes: number;
  website: string;
  description: string;
  prefecture: string;
  region: string;
}

class SaitamaMatsuriIntegrator {
  
  async loadFinalData(): Promise<MatsuriEvent[]> {
    const filePath = path.join(process.cwd(), 'data', 'saitama-matsuri-final.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ 读取最终数据失败:', error);
      return [];
    }
  }

  async updateAPIData(events: MatsuriEvent[]) {
    // 更新API数据文件
    const apiDataPath = path.join(process.cwd(), 'src', 'data', 'saitama-matsuri.json');
    
    try {
      // 确保目录存在
      await fs.mkdir(path.dirname(apiDataPath), { recursive: true });
      
      // 创建API格式的数据
      const apiData = {
        region: 'saitama',
        regionName: '埼玉',
        lastUpdated: new Date().toISOString(),
        events: events.map(event => ({
          id: event.id,
          name: event.title,
          title: event.title,
          japaneseName: event.japaneseName,
          englishName: event.englishName,
          date: event.date,
          dates: event.date,
          endDate: event.endDate,
          location: event.location,
          category: event.category,
          highlights: event.highlights,
          features: event.highlights,
          likes: event.likes,
          website: event.website,
          description: event.description
        }))
      };
      
      await fs.writeFile(apiDataPath, JSON.stringify(apiData, null, 2), 'utf-8');
      console.log(`✅ API数据已更新: ${apiDataPath}`);
      
      return apiDataPath;
    } catch (error) {
      console.error('❌ 更新API数据失败:', error);
      throw error;
    }
  }

  async createAPIEndpoint() {
    // 创建API端点文件
    const apiEndpointPath = path.join(process.cwd(), 'src', 'app', 'api', 'matsuri', 'saitama', 'route.ts');
    
    const apiCode = `import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'saitama-matsuri.json');
    const content = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(content);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('埼玉祭典数据加载失败:', error);
    return NextResponse.json(
      { error: '数据加载失败', events: [] },
      { status: 500 }
    );
  }
}`;

    try {
      // 确保目录存在
      await fs.mkdir(path.dirname(apiEndpointPath), { recursive: true });
      
      await fs.writeFile(apiEndpointPath, apiCode, 'utf-8');
      console.log(`✅ API端点已创建: ${apiEndpointPath}`);
      
      return apiEndpointPath;
    } catch (error) {
      console.error('❌ 创建API端点失败:', error);
      throw error;
    }
  }

  async updateMatsuriDataValidator() {
    // 更新祭典数据验证器，添加埼玉数据的支持
    const validatorPath = path.join(process.cwd(), 'src', 'utils', 'matsuri-data-validator.ts');
    
    try {
      const content = await fs.readFile(validatorPath, 'utf-8');
      
      // 检查是否已经包含埼玉支持
      if (content.includes('saitama')) {
        console.log('✅ 祭典数据验证器已包含埼玉支持');
        return;
      }
      
      // 在文件末尾添加埼玉特定的验证支持
      const additionalCode = `
// 埼玉祭典数据特定验证
export function validateSaitamaMatsuriData(data: any): MatsuriEvent[] {
  console.log('🏮 验证埼玉祭典数据...');
  return validateAndTransformMatsuriData(data, '埼玉');
}`;
      
      await fs.writeFile(validatorPath, content + additionalCode, 'utf-8');
      console.log('✅ 祭典数据验证器已更新');
      
    } catch (error) {
      console.warn('⚠️ 更新祭典数据验证器失败，但这不影响主要功能:', error);
    }
  }

  generateSummaryReport(events: MatsuriEvent[]): string {
    const categoryCount = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const locationCount = events.reduce((acc, event) => {
      acc[event.location] = (acc[event.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalLikes = events.reduce((sum, event) => sum + event.likes, 0);
    const avgLikes = Math.round(totalLikes / events.length);

    return `
📊 埼玉祭典数据集成报告
========================

📈 总体统计:
- 总祭典数量: ${events.length} 个
- 总点赞数: ${totalLikes}
- 平均点赞数: ${avgLikes}

📅 按类别分类:
${Object.entries(categoryCount).map(([category, count]) => `- ${category}: ${count} 个`).join('\n')}

🗺️ 按地点分类:
${Object.entries(locationCount).map(([location, count]) => `- ${location}: ${count} 个`).join('\n')}

⭐ 热门祭典 (点赞数最高):
${events.sort((a, b) => b.likes - a.likes).slice(0, 5).map((event, index) => 
  `${index + 1}. ${event.title} (${event.likes} 点赞)`).join('\n')}

🌸 季节分布:
${events.filter(e => e.category.includes('春')).length} 个春季祭典
${events.filter(e => e.category.includes('夏')).length} 个夏季祭典
${events.filter(e => e.category.includes('秋')).length} 个秋季祭典
${events.filter(e => e.category.includes('冬')).length} 个冬季祭典
${events.filter(e => e.category === '传统祭典').length} 个传统祭典

🔗 官方网站验证:
- 有效网站链接: ${events.filter(e => e.website !== '#').length} 个
- 待完善链接: ${events.filter(e => e.website === '#').length} 个
`;
  }
}

// 主执行函数
async function main() {
  const integrator = new SaitamaMatsuriIntegrator();

  try {
    console.log('🔄 开始集成埼玉祭典数据到项目中...\n');
    
    // 1. 加载最终数据
    const events = await integrator.loadFinalData();
    if (events.length === 0) {
      console.log('❌ 没有找到最终数据文件');
      return;
    }
    
    console.log(`📊 加载了 ${events.length} 个埼玉祭典事件`);
    
    // 2. 更新API数据
    await integrator.updateAPIData(events);
    
    // 3. 创建API端点
    await integrator.createAPIEndpoint();
    
    // 4. 更新数据验证器
    await integrator.updateMatsuriDataValidator();
    
    // 5. 生成报告
    const report = integrator.generateSummaryReport(events);
    console.log(report);
    
    // 6. 保存报告
    const reportPath = path.join(process.cwd(), 'data', 'saitama-matsuri-integration-report.txt');
    await fs.writeFile(reportPath, report, 'utf-8');
    console.log(`📄 集成报告已保存: ${reportPath}`);
    
    console.log('\n✅ 埼玉祭典数据集成完成！');
    console.log('\n🎯 下一步操作:');
    console.log('1. 启动开发服务器: npm run dev');
    console.log('2. 访问: http://localhost:3000/saitama/matsuri');
    console.log('3. 测试API: http://localhost:3000/api/matsuri/saitama');

  } catch (error) {
    console.error('❌ 数据集成失败:', error);
    process.exit(1);
  }
}

// 直接运行主函数
main().catch(console.error);

export { SaitamaMatsuriIntegrator }; 