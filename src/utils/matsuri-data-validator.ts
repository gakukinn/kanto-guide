// 祭典数据验证和转换工具
// 防止API数据格式不一致导致的错误

export interface MatsuriEvent {
  id: string;
  title: string;
  japaneseName: string;
  englishName: string;
  date: string;
  endDate?: string;
  location: string;
  category?: string;
  highlights: string[];
  likes: number;
  website: string;
  description: string;
}

export interface ApiMatsuriEvent {
  id?: string;
  name?: string;
  title?: string;
  japaneseName?: string;
  englishName?: string;
  date?: string;
  dates?: string; // 添加对dates字段的支持
  endDate?: string;
  location?: string;
  category?: string;
  scale?: string;
  highlights?: string[];
  features?: string[];
  likes?: number | string;
  website?: string;
  description?: string;
}

/**
 * 验证和转换API返回的祭典数据
 * @param apiData API返回的原始数据
 * @param regionName 地区名称，用于错误报告
 * @returns 标准化的祭典事件数组
 */
export function validateAndTransformMatsuriData(
  apiData: any,
  regionName: string = 'unknown'
): MatsuriEvent[] {
  try {
    // 确保数据是数组
    let dataArray: ApiMatsuriEvent[];

    if (Array.isArray(apiData)) {
      dataArray = apiData;
    } else if (apiData && typeof apiData === 'object') {
      // 检查多种可能的数据格式
      if (Array.isArray(apiData.events)) {
        dataArray = apiData.events;
      } else if (Array.isArray(apiData.data)) {
        // 处理 {success: true, data: [...]} 格式
        dataArray = apiData.data;
      } else if (apiData.success && Array.isArray(apiData.data)) {
        // 处理标准API响应格式
        dataArray = apiData.data;
      } else {
        console.error(
          `❌ ${regionName}祭典数据格式错误：期望数组或包含events/data字段的对象`,
          apiData
        );
        return [];
      }
    } else {
      console.error(
        `❌ ${regionName}祭典数据格式错误：数据不是有效的对象或数组`
      );
      return [];
    }

    // 转换每个事件
    const transformedEvents: MatsuriEvent[] = dataArray.map((event, index) => {
      const errors: string[] = [];

      // 必填字段验证和转换
      const id = event.id || `${regionName}-event-${index}`;
      const title = event.name || event.title || `未知祭典${index + 1}`;
      const japaneseName = event.japaneseName || title;
      const englishName = event.englishName || title;
      const date = event.date || event.dates || '日期待定';
      const location = event.location || '地点待定';
      const description = event.description || '暂无描述';
      const website = event.website || '#';

      // 移除规模分类 - 只使用真实提供的信息
      const category = event.category || undefined;

      // 特色亮点转换
      const highlights = event.highlights || event.features || [];
      if (!Array.isArray(highlights)) {
        errors.push('highlights字段不是数组');
      }

      // 红心数转换
      let likes = 0;
      if (typeof event.likes === 'number') {
        likes = Math.floor(event.likes);
      } else if (typeof event.likes === 'string') {
        likes = Math.floor(parseInt(event.likes) || 0);
      }

      // 记录错误
      if (errors.length > 0) {
        console.warn(`⚠️ ${regionName}祭典 "${title}" 数据问题：`, errors);
      }

      return {
        id,
        title,
        japaneseName,
        englishName,
        date,
        endDate: event.endDate,
        location,
        category,
        highlights: Array.isArray(highlights) ? highlights : [],
        likes,
        website,
        description,
      };
    });

    console.log(
      `✅ ${regionName}祭典数据验证完成：${transformedEvents.length}个事件`
    );
    return transformedEvents;
  } catch (error) {
    console.error(`❌ ${regionName}祭典数据处理失败：`, error);
    return [];
  }
}

/**
 * 获取并验证祭典数据的通用函数
 * @param regionName 地区名称
 * @returns Promise<MatsuriEvent[]>
 */
export async function fetchAndValidateMatsuriData(
  regionName: string
): Promise<MatsuriEvent[]> {
  try {
    const response = await fetch(`/api/matsuri/${regionName}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    return validateAndTransformMatsuriData(rawData, regionName);
  } catch (error) {
    console.error(`❌ 获取${regionName}祭典数据失败：`, error);
    return [];
  }
}
// 埼玉祭典数据特定验证
export function validateSaitamaMatsuriData(data: any): MatsuriEvent[] {
  console.log('🏮 验证埼玉祭典数据...');
  return validateAndTransformMatsuriData(data, '埼玉');
}
