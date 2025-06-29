'use client';

import { useState } from 'react';

export default function AutoImportPage() {
  // 🔥 地区选项配置
  const regionOptions = [
    { value: 'tokyo', label: '东京都', labelJp: '東京都' },
    { value: 'saitama', label: '埼玉县', labelJp: '埼玉県' },
    { value: 'chiba', label: '千叶县', labelJp: '千葉県' },
    { value: 'kanagawa', label: '神奈川县', labelJp: '神奈川県' },
    { value: 'kitakanto', label: '北关东', labelJp: '北関東' },
    { value: 'koshinetsu', label: '甲信越', labelJp: '甲信越' }
  ];

  // 🔥 活动类型选项配置
  const activityTypeOptions = [
    { value: 'hanabi', label: '花火大会', labelJp: '花火大会' },
    { value: 'matsuri', label: '传统祭典', labelJp: '祭り' },
    { value: 'hanami', label: '花见会', labelJp: '花見' },
    { value: 'momiji', label: '红叶狩', labelJp: '紅葉狩り' },
    { value: 'illumination', label: '灯光秀', labelJp: 'イルミネーション' },
    { value: 'culture', label: '文化艺术', labelJp: '文化芸術' }
  ];
  // 文本识别相关状态
  const [text, setText] = useState('');
  const [textLoading, setTextLoading] = useState(false);
  const [textResult, setTextResult] = useState<any>(null);
  const [textMessage, setTextMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 网址识别相关状态
  const [url, setUrl] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlMessage, setUrlMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 数据库录入相关状态
  const [databaseLoading, setDatabaseLoading] = useState(false);
  const [databaseResult, setDatabaseResult] = useState<any>(null);
  const [duplicateData, setDuplicateData] = useState<any>(null);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  // 🔥 新增：选择要覆盖的活动ID
  const [selectedOverwriteId, setSelectedOverwriteId] = useState<string | undefined>(undefined);

  // 🔥 新增：手动选择器状态
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [autoDetectedRegion, setAutoDetectedRegion] = useState('');
  const [autoDetectedActivity, setAutoDetectedActivity] = useState('');

  // 🔥 新增：内容识别相关状态
  const [contentUrl, setContentUrl] = useState('');
  const [contentResult, setContentResult] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentMessage, setContentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);

  // 🔥 新增：独立保存功能相关状态
  const [targetId, setTargetId] = useState('');
  const [independentSaveLoading, setIndependentSaveLoading] = useState<'description' | 'map' | 'text' | null>(null);
  const [independentSaveMessage, setIndependentSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 🔥 地区识别函数
  const identifyRegionFromAddress = (address: string): string => {
    if (!address) return '';
    
    const regionRules = {
      'tokyo': ['东京都', '東京都'],
      'saitama': ['埼玉県', '埼玉县'],
      'chiba': ['千葉県', '千叶县'],
      'kanagawa': ['神奈川県', '神奈川县'],
      'kitakanto': ['茨城県', '栃木県', '群馬県'],
      'koshinetsu': ['山梨県', '長野県', '新潟県', '富山県']
    };
    
    for (const [region, keywords] of Object.entries(regionRules)) {
      if (keywords.some(keyword => address.includes(keyword))) {
        return region;
      }
    }
    
    return '';
  };

  // 🔥 新增：活动分类识别函数
  const classifyActivityFromText = (textData: any): string => {
    if (!textData || !textData.name) return '';
    
    const name = textData.name.toLowerCase();
    const venue = textData.venue?.toLowerCase() || '';
    const organizer = textData.organizer?.toLowerCase() || '';
    
    // 🔥 优先级1：花火大会识别 (包含花火关键词的活动必须优先识别为花火大会)
    if (name.includes('花火') || name.includes('はなび') || name.includes('ハナビ')) {
      return 'hanabi';
    }
    
    // 🔥 优先级2：红叶狩识别
    if (name.includes('紅葉') || name.includes('もみじ') || name.includes('モミジ')) {
      return 'momiji';
    }
    
    // 🔥 优先级3：灯光秀识别
    if (name.includes('イルミネーション') || name.includes('ライトアップ') || name.includes('LED')) {
      return 'illumination';
    }
    
    // 🔥 优先级4：花见会识别 (包含花见关键词优先识别为花见会)
    if (name.includes('花見') || name.includes('桜') || name.includes('さくら') || name.includes('サクラ') ||
        name.includes('あじさい') || name.includes('アジサイ') || name.includes('紫陽花')) {
      return 'hanami';
    }
    
    // 优先级5：传统祭典识别
    if (name.includes('祭') || name.includes('まつり') || name.includes('マツリ') || 
        name.includes('納涼') || name.includes('神社') || name.includes('神輿')) {
      return 'matsuri';
    }
    
    // 优先级6：文化艺术识别
    if (name.includes('文化') || name.includes('芸術') || name.includes('美術') || name.includes('展覧会')) {
      return 'culture';
    }
    
    return '';
  };

  // 文本识别九项信息
  const handleTextSubmit = async () => {
    if (!text.trim()) {
      setTextMessage({ type: 'error', text: '请输入文本内容' });
      return;
    }

    setTextLoading(true);
    setTextMessage(null);
    setTextResult(null);

    try {
      const response = await fetch('/api/auto-import-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      
      if (data.success) {
        setTextResult(data);
        setTextMessage({ type: 'success', text: '识别成功' });
        // 🔥 文本识别成功后，立即进行地区和活动分类识别
        if (data.address) {
          const detectedRegion = identifyRegionFromAddress(data.address);
          setAutoDetectedRegion(detectedRegion);
        }
        // 🔥 立即进行活动分类识别（仅当用户未手动选择时）
        if (!selectedActivityType) {
        const detectedActivity = classifyActivityFromText(data);
        setAutoDetectedActivity(detectedActivity);
        }
      } else {
        setTextMessage({ type: 'error', text: data.error || '识别失败' });
      }
    } catch (error) {
      setTextMessage({ type: 'error', text: '处理过程中发生错误' });
    } finally {
      setTextLoading(false);
    }
  };

  // 网址识别地图坐标
  const handleUrlSubmit = async () => {
    if (!url.trim()) {
      setUrlMessage({ type: 'error', text: '请输入网址' });
      return;
    }

    setUrlLoading(true);
    setUrlMessage(null);
    setUrlResult(null);

    try {
      const response = await fetch('/api/auto-import-maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (data.success) {
        setUrlResult(data);
        setUrlMessage({ type: 'success', text: '识别成功' });
        // 🔥 地图API成功后，立即进行地区识别
        // 由于地图API不返回地区，我们需要基于坐标或地址进行地区识别
        // 这里暂时不设置，等文本识别完成后再识别
      } else {
        setUrlMessage({ type: 'error', text: data.error || '识别失败' });
      }
    } catch (error) {
      setUrlMessage({ type: 'error', text: '处理过程中发生错误' });
    } finally {
      setUrlLoading(false);
    }
  };

  // 清空文本
  const handleTextClear = () => {
    setText('');
    setTextResult(null);
    setTextMessage(null);
  };

  // 清空网址
  const handleUrlClear = () => {
    setUrl('');
    setUrlResult(null);
    setUrlMessage(null);
  };

  // 录入数据库
  const handleDatabaseSave = async (action = 'check') => {
    if (!textResult || !urlResult || !urlResult.coordinates) {
      return;
    }

    setDatabaseLoading(true);
    setDatabaseResult(null);

    try {
      // 🔥 准备发送的数据，包含用户手动选择的地区和活动类型
      const requestData = {
        textData: textResult,
        mapData: {
          ...urlResult,
          // 如果用户手动选择了地区，使用用户选择的，否则使用自动识别的
          region: selectedRegion || urlResult.region
        },
        contentData: contentResult, // 🔥 添加内容识别数据
        action: action,
        // 🔥 新增：用户手动选择的活动类型
        manualActivityType: selectedActivityType || null
      };

      console.log('发送到API的数据:', requestData); // 调试信息

      const response = await fetch('/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      console.log('API返回数据:', data); // 调试信息
      
      if (data.hasDuplicates) {
        // 发现重复数据，显示选择对话框
        console.log('发现重复数据，显示对话框'); // 调试信息
        setDuplicateData(data);
        setShowDuplicateDialog(true);
        setDatabaseResult(null); // 清空之前的结果
      } else {
        // 没有重复数据，直接显示录入结果
        console.log('没有重复数据，直接录入'); // 调试信息
        setDatabaseResult(data);
      }
    } catch (error) {
      setDatabaseResult({
        success: false,
        error: '录入过程中发生错误'
      });
    } finally {
      setDatabaseLoading(false);
    }
  };

  // 处理重复数据选择
  const handleDuplicateChoice = async (choice: 'new' | 'overwrite', overwriteId?: string) => {
    setShowDuplicateDialog(false);
    setDatabaseLoading(true);

    try {
      const response = await fetch('/api/auto-import-database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textData: textResult,
          mapData: {
            ...urlResult,
            // 如果用户手动选择了地区，使用用户选择的，否则使用自动识别的
            region: selectedRegion || urlResult.region
          },
          contentData: contentResult, // 🔥 添加内容识别数据
          action: choice === 'new' ? 'create' : 'overwrite',
          // 🔥 修复：传递用户手动选择的活动类型
          manualActivityType: selectedActivityType || null,
          // 🔥 新增：传递要覆盖的具体活动ID
          overwriteId: overwriteId || null
        })
      });

      const data = await response.json();
      setDatabaseResult(data);
    } catch (error) {
      setDatabaseResult({
        success: false,
        error: '处理重复数据时发生错误'
      });
    } finally {
      setDatabaseLoading(false);
      setSelectedOverwriteId(undefined); // 重置选择
    }
  };

  // 🔥 新增：内容识别处理函数
  const handleContentSubmit = async () => {
    if (!contentUrl.trim()) {
      setContentMessage({ type: 'error', text: '请输入网址' })
      return
    }

    setContentLoading(true)
    setContentMessage(null)

    try {
      const response = await fetch('/api/auto-import-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: contentUrl })
      })

      const data = await response.json()

      if (data.success) {
        setContentResult(data)
        setContentMessage({ type: 'success', text: '内容识别成功！' })
      } else {
        setContentMessage({ type: 'error', text: data.message || '识别失败' })
      }
    } catch (error) {
      console.error('内容识别错误:', error)
      setContentMessage({ type: 'error', text: '网络错误，请重试' })
    } finally {
      setContentLoading(false)
    }
  }

  // 🔥 新增：内容识别清空函数
  const handleContentClear = () => {
    setContentUrl('')
    setContentResult(null)
    setContentMessage(null)
  }

  // 🔥 新增：保存简介到数据库函数
  const handleSaveDescription = async () => {
    if (!contentResult?.description || !selectedRegion || !selectedActivityType) {
      return
    }

    setSaveStatus('保存中...')

    try {
      const response = await fetch('/api/save-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: contentResult.description,
          region: selectedRegion,
          activityType: selectedActivityType,
          sourceUrl: contentUrl
        })
      })

      const data = await response.json()

      if (data.success) {
        setSaveStatus('保存成功！')
        setTimeout(() => setSaveStatus(''), 3000)
      } else {
        setSaveStatus('保存失败')
        setTimeout(() => setSaveStatus(''), 3000)
      }
    } catch (error) {
      console.error('保存错误:', error)
      setSaveStatus('保存失败')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  // 🔥 修改：合并三个功能结果的保存函数
  const handleSaveToDatabase = async () => {
    // 检查是否有完整的数据
    if (!textResult || !textResult.success) {
      setContentMessage({ type: 'error', text: '请先完成文本识别' })
      return
    }

    if (!contentResult || !contentResult.success) {
      setContentMessage({ type: 'error', text: '请先完成内容识别' })
      return
    }

    if (!urlResult || !urlResult.success) {
      setContentMessage({ type: 'error', text: '请先完成地图识别' })
      return
    }

    if (!selectedRegion || !selectedActivityType) {
      setContentMessage({ type: 'error', text: '请选择地区和活动类型' })
      return
    }

    setSaveStatus('保存中...')

    try {
      // 合并三个功能的数据
      const completeData = {
        // 来自文本识别的九项信息
        name: textResult.name || '待完善',
        address: textResult.address || '待完善',
        datetime: textResult.datetime || '待完善',
        venue: textResult.venue || '待完善',
        access: textResult.access || '待完善',
        organizer: textResult.organizer || '待完善',
        price: textResult.price || '待完善',
        contact: textResult.contact || '待完善',
        website: textResult.website || contentUrl || '待完善',
        
        // 来自地图识别的坐标信息
        googleMap: urlResult.coordinates ? `${urlResult.coordinates.lat},${urlResult.coordinates.lng}` : '待完善',
        
        // 来自内容识别的简介
        description: contentResult.description || '待完善',
        
        // 用户选择的分类信息
        region: selectedRegion,
        activityType: selectedActivityType,
        
        // 源链接
        sourceUrl: contentUrl || url || '',
        
        // 元数据
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const response = await fetch('/api/save-complete-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData)
      })

      const data = await response.json()

      if (data.success) {
        setSaveStatus('保存成功！')
        setContentMessage({ type: 'success', text: `完整活动数据已保存到数据库 (ID: ${data.activityId})` })
        setTimeout(() => setSaveStatus(''), 3000)
      } else {
        setSaveStatus('保存失败')
        setContentMessage({ type: 'error', text: data.message || '保存失败' })
        setTimeout(() => setSaveStatus(''), 3000)
      }
    } catch (error) {
      console.error('保存错误:', error)
      setSaveStatus('保存失败')
      setContentMessage({ type: 'error', text: '保存失败，请重试' })
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  // 状态管理 - description
  const [availableRecords, setAvailableRecords] = useState<any[]>([])
  const [showRecordSelection, setShowRecordSelection] = useState(false)
  const [selectedRecordId, setSelectedRecordId] = useState<string>('')

  // 状态管理 - text
  const [availableTextRecords, setAvailableTextRecords] = useState<any[]>([])
  const [showTextRecordSelection, setShowTextRecordSelection] = useState(false)
  const [selectedTextRecordId, setSelectedTextRecordId] = useState<string>('')

  // 状态管理 - map
  const [availableMapRecords, setAvailableMapRecords] = useState<any[]>([])
  const [showMapRecordSelection, setShowMapRecordSelection] = useState(false)
  const [selectedMapRecordId, setSelectedMapRecordId] = useState<string>('')

  // 处理单独保存description
  const handleSaveDescriptionOnly = async (targetId?: string) => {
    if (!contentResult || !contentResult.success || !contentResult.description) {
      setContentMessage({ type: 'error', text: '请先完成内容识别' })
      return
    }

    if (!selectedRegion || !selectedActivityType) {
      setContentMessage({ type: 'error', text: '请选择地区和活动类型' })
      return
    }

    setContentLoading(true)
    setContentMessage(null)

    try {
      const response = await fetch('/api/save-description-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: contentResult.description,
          region: selectedRegion,
          activityType: selectedActivityType,
          sourceUrl: contentUrl,
          overwrite: true,
          targetId: targetId // 指定要更新的记录ID
        })
      })

      const data = await response.json()

      if (data.success) {
        setContentMessage({ 
          type: 'success', 
          text: `内容简介已保存到数据库 (${data.action === 'created' ? '新建' : '更新'} ID: ${data.activityId})` 
        })
        setShowRecordSelection(false)
        setSelectedRecordId('')
      } else if (data.needSelection) {
        // 需要用户选择记录
        setAvailableRecords(data.records || [])
        setShowRecordSelection(true)
        setContentMessage({ type: 'error', text: data.message })
      } else {
        setContentMessage({ type: 'error', text: data.message || '保存失败' })
      }
    } catch (error) {
      console.error('保存description错误:', error)
      setContentMessage({ type: 'error', text: '保存失败，请重试' })
    } finally {
      setContentLoading(false)
    }
  }

  // 处理记录选择确认
  const handleRecordSelectionConfirm = async () => {
    if (!selectedRecordId) {
      setContentMessage({ type: 'error', text: '请选择一个记录' })
      return
    }
    await handleSaveDescriptionOnly(selectedRecordId)
  }

  // 处理单独保存文本识别结果
  const handleSaveTextOnly = async (targetId?: string) => {
    if (!textResult || !textResult.success) {
      setTextMessage({ type: 'error', text: '请先完成文本识别' })
      return
    }

    if (!selectedRegion || !selectedActivityType) {
      setTextMessage({ type: 'error', text: '请选择地区和活动类型' })
      return
    }

    setTextLoading(true)
    setTextMessage(null)

    try {
      const response = await fetch('/api/save-text-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textData: textResult,
          region: selectedRegion,
          activityType: selectedActivityType,
          overwrite: true,
          targetId: targetId
        })
      })

      const data = await response.json()

      if (data.success) {
        setTextMessage({ 
          type: 'success', 
          text: `九项信息已保存到数据库 (${data.action === 'created' ? '新建' : '更新'} ID: ${data.activityId})` 
        })
        setShowTextRecordSelection(false)
        setSelectedTextRecordId('')
      } else if (data.needSelection) {
        // 需要用户选择记录
        setAvailableTextRecords(data.records || [])
        setShowTextRecordSelection(true)
        setTextMessage({ type: 'error', text: data.message })
      } else {
        setTextMessage({ type: 'error', text: data.message || '保存失败' })
      }
    } catch (error) {
      console.error('保存文本识别错误:', error)
      setTextMessage({ type: 'error', text: '保存失败，请重试' })
    } finally {
      setTextLoading(false)
    }
  }

  // 处理文本记录选择确认
  const handleTextRecordSelectionConfirm = async () => {
    if (!selectedTextRecordId) {
      setTextMessage({ type: 'error', text: '请选择一个记录' })
      return
    }
    await handleSaveTextOnly(selectedTextRecordId)
  }

  // 处理单独保存地图坐标
  const handleSaveMapOnly = async (targetId?: string) => {
    if (!urlResult || !urlResult.coordinates) {
      setUrlMessage({ type: 'error', text: '请先完成地图识别' })
      return
    }

    if (!selectedRegion || !selectedActivityType) {
      setUrlMessage({ type: 'error', text: '请选择地区和活动类型' })
      return
    }

    setUrlLoading(true)
    setUrlMessage(null)

    try {
      const response = await fetch('/api/save-map-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coordinates: urlResult.coordinates,
          region: selectedRegion,
          activityType: selectedActivityType,
          overwrite: true,
          targetId: targetId
        })
      })

      const data = await response.json()

      if (data.success) {
        setUrlMessage({ 
          type: 'success', 
          text: `地图坐标已保存到数据库 (${data.action === 'created' ? '新建' : '更新'} ID: ${data.activityId})` 
        })
        setShowMapRecordSelection(false)
        setSelectedMapRecordId('')
      } else if (data.needSelection) {
        // 需要用户选择记录
        setAvailableMapRecords(data.records || [])
        setShowMapRecordSelection(true)
        setUrlMessage({ type: 'error', text: data.message })
      } else {
        setUrlMessage({ type: 'error', text: data.message || '保存失败' })
      }
    } catch (error) {
      console.error('保存地图坐标错误:', error)
      setUrlMessage({ type: 'error', text: '保存失败，请重试' })
    } finally {
      setUrlLoading(false)
    }
  }

  // 处理地图记录选择确认
  const handleMapRecordSelectionConfirm = async () => {
    if (!selectedMapRecordId) {
      setUrlMessage({ type: 'error', text: '请选择一个记录' })
      return
    }
    await handleSaveMapOnly(selectedMapRecordId)
  }

  // 🔥 新增：独立保存活动简介功能
  const handleIndependentSaveDescription = async () => {
    if (!targetId.trim()) {
      setIndependentSaveMessage({ type: 'error', text: '请输入目标ID' });
      return;
    }

    if (!contentResult || !contentResult.description) {
      setIndependentSaveMessage({ type: 'error', text: '请先进行内容识别' });
      return;
    }

    setIndependentSaveLoading('description');
    setIndependentSaveMessage(null);

    try {
      const response = await fetch('/api/save-description-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: targetId.trim(),
          description: contentResult.description,
          region: selectedRegion || autoDetectedRegion,
          activityType: selectedActivityType || autoDetectedActivity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIndependentSaveMessage({ 
          type: 'success', 
          text: `✅ ${data.message} - ${data.recordName || targetId}` 
        });
      } else {
        setIndependentSaveMessage({ type: 'error', text: data.error || '保存失败' });
      }
    } catch (error) {
      setIndependentSaveMessage({ type: 'error', text: '网络错误，请重试' });
    } finally {
      setIndependentSaveLoading(null);
    }
  };

  // 🔥 新增：独立保存地图信息功能
  const handleIndependentSaveMap = async () => {
    if (!targetId.trim()) {
      setIndependentSaveMessage({ type: 'error', text: '请输入目标ID' });
      return;
    }

    if (!urlResult || !urlResult.coordinates) {
      setIndependentSaveMessage({ type: 'error', text: '请先进行地图识别' });
      return;
    }

    setIndependentSaveLoading('map');
    setIndependentSaveMessage(null);

    try {
      const response = await fetch('/api/save-map-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: targetId.trim(),
          mapData: {
            coordinates: urlResult.coordinates,
            googleMapsUrl: urlResult.googleMapsUrl,
            mapEmbedUrl: urlResult.mapEmbedUrl
          },
          region: selectedRegion || autoDetectedRegion,
          activityType: selectedActivityType || autoDetectedActivity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIndependentSaveMessage({ 
          type: 'success', 
          text: `✅ ${data.message} - ${data.recordName || targetId}` 
        });
      } else {
        setIndependentSaveMessage({ type: 'error', text: data.error || '保存失败' });
      }
    } catch (error) {
      setIndependentSaveMessage({ type: 'error', text: '网络错误，请重试' });
    } finally {
      setIndependentSaveLoading(null);
    }
  };

  // 🔥 新增：独立保存基本信息功能
  const handleIndependentSaveText = async () => {
    if (!targetId.trim()) {
      setIndependentSaveMessage({ type: 'error', text: '请输入目标ID' });
      return;
    }

    if (!textResult || !textResult.success) {
      setIndependentSaveMessage({ type: 'error', text: '请先进行文本识别' });
      return;
    }

    setIndependentSaveLoading('text');
    setIndependentSaveMessage(null);

    try {
      const response = await fetch('/api/save-text-only', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: targetId.trim(),
          textData: textResult,
          region: selectedRegion || autoDetectedRegion,
          activityType: selectedActivityType || autoDetectedActivity
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIndependentSaveMessage({ 
          type: 'success', 
          text: `✅ ${data.message} - ${data.recordName || targetId} (更新了${data.updatedFields}个字段)` 
        });
      } else {
        setIndependentSaveMessage({ type: 'error', text: data.error || '保存失败' });
      }
    } catch (error) {
      setIndependentSaveMessage({ type: 'error', text: '网络错误，请重试' });
    } finally {
      setIndependentSaveLoading(null);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          自动导入系统
        </h1>
        <p className="text-gray-600">
          文本识别九项信息 + 网址识别谷歌地图位置
        </p>
      </div>

      {/* 功能区域 - 上下排列 */}
      <div className="space-y-4 mb-6">
        {/* 上方：文本识别九项信息 */}
        <div className="bg-white rounded-lg border-2 border-blue-200 shadow-md">
          <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              📝 文本识别九项信息
            </h2>
            <p className="text-sm text-blue-700 mt-1">粘贴日文活动信息，自动识别九项内容</p>
          </div>
          
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              粘贴日文活动信息：
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请粘贴完整的日文活动信息..."
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
            />

            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleTextSubmit}
                disabled={textLoading}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
              >
                {textLoading ? '识别中...' : '识别九项信息'}
              </button>
              <button
                onClick={handleTextClear}
                disabled={textLoading}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
              >
                清空
              </button>
            </div>

            {/* 文本识别结果 */}
            {textResult && textResult.success && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-semibold text-green-800 mb-1 text-sm">✅ 识别成功</h3>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div><span className="font-medium">名称：</span>{textResult.name || '未识别'}</div>
                  <div><span className="font-medium">地址：</span>{textResult.address || '未识别'}</div>
                  <div><span className="font-medium">期间：</span>{textResult.period || '未识别'}</div>
                  <div><span className="font-medium">场所：</span>{textResult.venue || '未识别'}</div>
                  <div><span className="font-medium">交通：</span>{textResult.access || '未识别'}</div>
                  <div><span className="font-medium">主办：</span>{textResult.organizer || '未识别'}</div>
                  <div><span className="font-medium">费用：</span>{textResult.price || '未识别'}</div>
                  <div><span className="font-medium">联系：</span>{textResult.contact || '未识别'}</div>
                  <div><span className="font-medium">网站：</span>{textResult.website || '未识别'}</div>
                </div>
                
                {/* 单独保存九项信息按钮 */}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleSaveTextOnly()}
                    disabled={textLoading}
                    className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-colors"
                  >
                    {textLoading ? '保存中...' : '💾 保存九项信息到数据库'}
                  </button>
                </div>
                
                <div className="mt-1 text-xs text-blue-600">
                  💡 将根据选择的地区和活动类型，查找匹配的活动记录并更新九项基本信息
                </div>

                {/* 文本记录选择界面 */}
                {showTextRecordSelection && availableTextRecords.length > 0 && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h4 className="font-semibold text-yellow-800 mb-2 text-sm">📋 选择要更新的记录</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableTextRecords.map((record) => (
                        <label key={record.id} className="flex items-start gap-2 p-2 bg-white border rounded cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="selectedTextRecord"
                            value={record.id}
                            checked={selectedTextRecordId === record.id}
                            onChange={(e) => setSelectedTextRecordId(e.target.value)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 text-xs">
                            <div className="font-medium text-gray-900">{record.name}</div>
                            <div className="text-gray-600 mt-1">
                              地址: {record.address}
                            </div>
                            <div className="text-gray-600 mt-1">
                              基本信息: {record.hasBasicInfo ? '✅ 已完善' : '❌ 待完善'}
                            </div>
                            <div className="text-gray-500 mt-1">
                              创建: {new Date(record.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleTextRecordSelectionConfirm}
                        disabled={!selectedTextRecordId || textLoading}
                        className="flex-1 px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-colors"
                      >
                        {textLoading ? '更新中...' : '确认更新选中记录'}
                      </button>
                      <button
                        onClick={() => {
                          setShowTextRecordSelection(false)
                          setSelectedTextRecordId('')
                          setTextMessage(null)
                        }}
                        disabled={textLoading}
                        className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 文本识别消息 */}
            {textMessage && (
              <div className={`mt-2 p-2 rounded-md text-xs ${
                textMessage.type === 'error' 
                  ? 'border border-red-200 bg-red-50 text-red-800' 
                  : 'border border-green-200 bg-green-50 text-green-800'
              }`}>
                {textMessage.text}
              </div>
            )}
          </div>
        </div>

        {/* 中间：网址识别内容简介 */}
        <div className="bg-white rounded-lg border-2 border-orange-200 shadow-md">
          <div className="p-3 border-b bg-gradient-to-r from-orange-50 to-orange-100">
            <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2">
              📄 网址识别内容简介
            </h2>
            <p className="text-sm text-orange-700 mt-1">输入Jalan活动网址，自动提取活动简介</p>
          </div>
          
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入Jalan活动网址：
            </label>
            <input
              type="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder="https://"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />

            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleContentSubmit}
                disabled={contentLoading}
                className="flex-1 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
              >
                {contentLoading ? '识别中...' : '识别内容简介'}
              </button>
              <button
                onClick={handleContentClear}
                disabled={contentLoading}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
              >
                清空
              </button>
            </div>

            {/* 内容识别结果 */}
            {contentResult && contentResult.success && (
              <div className="mt-3 space-y-2">
                <div className="p-2 bg-orange-50 border border-orange-200 rounded-md">
                  <h3 className="font-semibold text-orange-800 mb-1 text-sm">📄 识别到的内容简介</h3>
                  <div className="text-xs text-gray-700 bg-white p-2 rounded border max-h-32 overflow-y-auto">
                    {contentResult.description || '未识别到内容简介'}
                  </div>
                  
                  {/* 删除：单独保存description按钮 - 已被独立保存功能替代 */}
                  
                  <div className="mt-1 text-xs text-orange-600">
                    💡 使用下方的"🎯 独立保存活动简介"功能来保存内容简介
                  </div>
                </div>

                {/* 删除：记录选择界面 - 已被独立保存功能替代 */}
              </div>
            )}

            {/* 内容识别消息 */}
            {contentMessage && (
              <div className={`mt-2 p-2 rounded-md text-xs ${
                contentMessage.type === 'error' 
                  ? 'border border-red-200 bg-red-50 text-red-800' 
                  : 'border border-green-200 bg-green-50 text-green-800'
              }`}>
                {contentMessage.text}
              </div>
            )}

            {/* 🔥 新增：独立保存活动简介功能 */}
            {contentResult?.success && (
              <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-md">
                <h4 className="font-medium text-cyan-800 mb-2 text-sm">🎯 独立保存活动简介</h4>
                <p className="text-xs text-cyan-700 mb-3">
                  输入目标ID，只更新指定记录的description字段
                </p>
                
                {/* ID输入 */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    目标记录ID：
                  </label>
                  <input
                    type="text"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    placeholder="例如：cmc7wzcy10001vlaklsek60rn"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-xs font-mono"
                  />
                </div>

                {/* 保存按钮 */}
                <button
                  onClick={handleIndependentSaveDescription}
                  disabled={
                    !targetId.trim() || 
                    !contentResult?.description || 
                    independentSaveLoading === 'description'
                  }
                  className="w-full px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                >
                  {independentSaveLoading === 'description' ? '保存中...' : '保存活动简介'}
                </button>

                {/* 保存结果消息 */}
                {independentSaveMessage && independentSaveMessage.text.includes('简介') && (
                  <div className={`mt-2 p-2 rounded-md text-xs ${
                    independentSaveMessage.type === 'error' 
                      ? 'border border-red-200 bg-red-50 text-red-800' 
                      : 'border border-green-200 bg-green-50 text-green-800'
                  }`}>
                    {independentSaveMessage.text}
                  </div>
                )}

                {/* 使用说明 */}
                <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-xs text-gray-600">
                    💡 <strong>使用说明：</strong>输入要更新的数据库记录ID，系统会只更新该记录的description字段。如果ID不存在，会显示创建新记录的提示。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 下方：网址识别地图坐标 */}
        <div className="bg-white rounded-lg border-2 border-green-200 shadow-md">
          <div className="p-3 border-b bg-gradient-to-r from-green-50 to-green-100">
            <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
              🗺️ 网址识别地图坐标
            </h2>
            <p className="text-sm text-green-700 mt-1">输入官方网址，自动提取谷歌地图坐标</p>
          </div>
          
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入官方网址：
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/event-page"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />

            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleUrlSubmit}
                disabled={urlLoading}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
              >
                {urlLoading ? '识别中...' : '识别地图坐标'}
              </button>
              <button
                onClick={handleUrlClear}
                disabled={urlLoading}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
              >
                清空
              </button>
            </div>

            {/* 网址识别结果 */}
            {urlResult && (
              <div className="mt-3 space-y-2">
                {/* 基本信息 */}
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-semibold text-blue-800 mb-1 text-sm">🎯 地图识别结果</h3>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium">坐标：</span>
                      {urlResult.coordinates ? (
                        <span className="text-green-600">✅ {urlResult.coordinates.lat}, {urlResult.coordinates.lng}</span>
                      ) : (
                        <span className="text-red-600">❌ 未找到</span>
                      )}
                    </div>
                    <div><span className="font-medium">来源：</span>{urlResult.coordsSource || '未知'}</div>
                    {urlResult.address && <div><span className="font-medium">地址：</span>{urlResult.address}</div>}
                    {urlResult.venue && <div><span className="font-medium">场所：</span>{urlResult.venue}</div>}
                    {urlResult.googleMapsUrl && (
                      <div>
                        <span className="font-medium">地图链接：</span>
                        <a href={urlResult.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                          打开谷歌地图 ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 独立保存地图坐标功能 */}
                {urlResult.coordinates && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="mb-2">
                      <label className="block text-xs font-medium text-green-700 mb-1">
                        🎯 指定ID更新地图坐标
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="输入活动ID (如: activity-abc123)"
                          value={targetId}
                          onChange={(e) => setTargetId(e.target.value)}
                          className="flex-1 px-2 py-1 border border-green-300 rounded text-xs focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                        <button
                          onClick={handleIndependentSaveMap}
                          disabled={!targetId.trim() || independentSaveLoading === 'map'}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition-colors"
                        >
                          {independentSaveLoading === 'map' ? '保存中...' : '💾 保存'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-green-600">
                      💡 直接指定活动ID，替换该记录的地图坐标信息
                    </div>

                    {/* 独立保存结果消息 */}
                    {independentSaveMessage && (
                      <div className={`mt-2 p-2 rounded text-xs ${
                        independentSaveMessage.type === 'error' 
                          ? 'bg-red-50 border border-red-200 text-red-700' 
                          : 'bg-green-100 border border-green-300 text-green-800'
                      }`}>
                        {independentSaveMessage.text}
                      </div>
                    )}

                    {/* 地图记录选择界面 */}
                    {showMapRecordSelection && availableMapRecords.length > 0 && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h4 className="font-semibold text-yellow-800 mb-2 text-sm">📋 选择要更新的记录</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {availableMapRecords.map((record) => (
                            <label key={record.id} className="flex items-start gap-2 p-2 bg-white border rounded cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="selectedMapRecord"
                                value={record.id}
                                checked={selectedMapRecordId === record.id}
                                onChange={(e) => setSelectedMapRecordId(e.target.value)}
                                className="mt-0.5"
                              />
                              <div className="flex-1 text-xs">
                                <div className="font-medium text-gray-900">{record.name}</div>
                                <div className="text-gray-600 mt-1">
                                  坐标: {record.googleMap}
                                </div>
                                <div className="text-gray-600 mt-1">
                                  地图信息: {record.hasCoordinates ? '✅ 已有坐标' : '❌ 暂无坐标'}
                                </div>
                                <div className="text-gray-500 mt-1">
                                  创建: {new Date(record.createdAt).toLocaleString()}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={handleMapRecordSelectionConfirm}
                            disabled={!selectedMapRecordId || urlLoading}
                            className="flex-1 px-3 py-1.5 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-colors"
                          >
                            {urlLoading ? '更新中...' : '确认更新选中记录'}
                          </button>
                          <button
                            onClick={() => {
                              setShowMapRecordSelection(false)
                              setSelectedMapRecordId('')
                              setUrlMessage(null)
                            }}
                            disabled={urlLoading}
                            className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 小地图预览 */}
                {urlResult.coordinates && (
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <div className="bg-gray-100 px-2 py-1 border-b">
                      <h4 className="text-xs font-medium text-gray-700">📍 地图预览</h4>
                    </div>
                    <div className="relative">
                      <iframe
                        src={`https://maps.google.com/maps?q=${urlResult.coordinates.lat},${urlResult.coordinates.lng}&z=15&output=embed`}
                        width="100%"
                        height="480"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                      />
                      <div className="absolute top-1 right-1">
                        <a 
                          href={`https://www.google.com/maps?q=${urlResult.coordinates.lat},${urlResult.coordinates.lng}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white px-2 py-1 rounded shadow text-xs text-blue-600 hover:bg-blue-50"
                        >
                          大地图 ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* 如果没有坐标但有地址，显示地址搜索地图 */}
                {!urlResult.coordinates && (urlResult.address || urlResult.venue) && (
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <div className="bg-gray-100 px-2 py-1 border-b">
                      <h4 className="text-xs font-medium text-gray-700">📍 地址搜索地图</h4>
                    </div>
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dw901SwHHqocuU&q=${encodeURIComponent(urlResult.address || urlResult.venue || '')}`}
                      width="100%"
                      height="480"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 网址识别消息 */}
            {urlMessage && (
              <div className={`mt-2 p-2 rounded-md text-xs ${
                urlMessage.type === 'error' 
                  ? 'border border-red-200 bg-red-50 text-red-800' 
                  : 'border border-green-200 bg-green-50 text-green-800'
              }`}>
                {urlMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 重复数据对话框 */}
      {showDuplicateDialog && duplicateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ 发现相似活动</h3>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">{duplicateData.message}</p>
              
              {/* 新数据预览 */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-green-600">📝 准备录入的新数据：</h4>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <p><strong>名称：</strong> {duplicateData.newData.name}</p>
                  <p><strong>日期：</strong> {duplicateData.newData.period}</p>
                  <p><strong>地点：</strong> {duplicateData.newData.address}</p>
                  <p><strong>地区：</strong> {duplicateData.newData.region}</p>
                </div>
              </div>

              {/* 相似数据列表 */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-orange-600">🔍 发现的相似活动：</h4>
                <div className="space-y-3">
                  {duplicateData.duplicates.map((duplicate: any, index: number) => (
                    <div key={duplicate.id} className={`border-2 rounded p-4 cursor-pointer transition-all ${
                      selectedOverwriteId === duplicate.id 
                        ? 'bg-orange-100 border-orange-400' 
                        : 'bg-orange-50 border-orange-200 hover:border-orange-300'
                    }`}
                    onClick={() => setSelectedOverwriteId(duplicate.id)}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          <input
                            type="radio"
                            name="overwriteChoice"
                            value={duplicate.id}
                            checked={selectedOverwriteId === duplicate.id}
                            onChange={() => setSelectedOverwriteId(duplicate.id)}
                            className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                          />
                        </div>
                        <div className="flex-1">
                          <p><strong>名称：</strong> {duplicate.name}</p>
                          <p><strong>日期：</strong> {duplicate.datetime}</p>
                          <p><strong>地点：</strong> {duplicate.address}</p>
                          <p className="text-sm text-gray-500">
                            创建时间：{new Date(duplicate.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="ml-4 text-sm">
                          <div className="bg-white rounded p-2">
                            <p className="text-xs text-gray-600 mb-1">相似度：</p>
                            <p>名称: <span className="font-medium text-blue-600">{duplicate.similarity.name}%</span></p>
                            <p>日期: <span className="font-medium text-purple-600">{duplicate.similarity.date}%</span></p>
                            <p>地点: <span className="font-medium text-green-600">{duplicate.similarity.address}%</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">💡 点击选择要覆盖的活动，或选择新建数据</p>
              </div>

              {/* 选择操作 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleDuplicateChoice('overwrite', selectedOverwriteId)}
                  disabled={!selectedOverwriteId}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    selectedOverwriteId 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  🔄 覆盖选定数据
                  <span className="block text-sm opacity-90">
                    {selectedOverwriteId ? '覆盖已选择的活动' : '请先选择要覆盖的活动'}
                  </span>
                </button>
                <button
                  onClick={() => handleDuplicateChoice('new')}
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition-colors"
                >
                  ➕ 新建数据
                  <span className="block text-sm opacity-90">作为新活动添加到数据库</span>
                </button>
                <button
                  onClick={() => {
                    setShowDuplicateDialog(false);
                    setSelectedOverwriteId(undefined);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium transition-colors"
                >
                  ❌ 取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 修改：文本识别完成后立即显示地区和活动分类 */}
      {textResult && textResult.success && (
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            {urlResult && urlResult.coordinates ? '💾 录入数据库' : '🎯 活动信息识别'}
          </h3>
          
          {/* 🔥 地区和活动类型显示区域 - 文本识别完成后立即显示 */}
          <div className="bg-white rounded-md p-3 mb-3 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 text-sm">🎯 智能识别结果</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {/* 地区选择器 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  🗾 地区识别
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">🤖 使用AI自动识别 ({
                      regionOptions.find(r => r.value === autoDetectedRegion)?.label || '未识别'
                    })</option>
                    {regionOptions.map(region => (
                      <option key={region.value} value={region.value}>
                        {region.label} ({region.labelJp})
                      </option>
                    ))}
                  </select>
                  {selectedRegion && (
                    <button
                      onClick={() => setSelectedRegion('')}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-xs transition-colors"
                      title="重置为AI自动识别"
                    >
                      🔄
                    </button>
                  )}
                </div>
                {selectedRegion && (
                  <div className="mt-1 p-1 bg-blue-100 border border-blue-300 rounded-md">
                    <p className="text-xs text-blue-800 font-medium">
                    ✅ 已手动选择：{regionOptions.find(r => r.value === selectedRegion)?.label}
                    </p>
                  </div>
                )}
                {autoDetectedRegion && !selectedRegion && (
                  <p className="text-xs text-green-600 mt-1">
                    🤖 AI识别：{regionOptions.find(r => r.value === autoDetectedRegion)?.label}
                  </p>
                )}
              </div>

              {/* 活动类型选择器 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  🎪 活动类型识别
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedActivityType}
                    onChange={(e) => setSelectedActivityType(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">🤖 使用AI自动识别 ({
                      activityTypeOptions.find(t => t.value === autoDetectedActivity)?.label || '未识别'
                    })</option>
                    {activityTypeOptions.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label} ({type.labelJp})
                      </option>
                    ))}
                  </select>
                  {selectedActivityType && (
                    <button
                      onClick={() => setSelectedActivityType('')}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-xs transition-colors"
                      title="重置为AI自动识别"
                    >
                      🔄
                    </button>
                  )}
                </div>
                {selectedActivityType && (
                  <div className="mt-1 p-1 bg-blue-100 border border-blue-300 rounded-md">
                    <p className="text-xs text-blue-800 font-medium">
                    ✅ 已手动选择：{activityTypeOptions.find(t => t.value === selectedActivityType)?.label}
                    </p>
                  </div>
                )}
                {autoDetectedActivity && !selectedActivityType && (
                  <p className="text-xs text-green-600 mt-1">
                    🤖 AI识别：{activityTypeOptions.find(t => t.value === autoDetectedActivity)?.label}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              💡 提示：默认使用AI自动识别，如识别错误可手动调整
            </div>
          </div>

          <div className="bg-white rounded-md p-3 mb-3">
            <h4 className="font-medium text-gray-800 mb-2 text-sm">📋 九项信息识别结果</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-medium text-blue-800 mb-1 text-xs">基本信息</h5>
                <div className="space-y-1 text-gray-600">
                  <div><span className="font-medium">名称：</span> {textResult.name || '未识别'}</div>
                  <div><span className="font-medium">地址：</span> {textResult.address || '未识别'}</div>
                  <div><span className="font-medium">期间：</span> {textResult.period || '未识别'}</div>
                  <div><span className="font-medium">场所：</span> {textResult.venue || '未识别'}</div>
                  <div><span className="font-medium">交通：</span> {textResult.access || '未识别'}</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-green-800 mb-1 text-xs">联系信息</h5>
                <div className="space-y-1 text-gray-600">
                  <div><span className="font-medium">主办：</span> {textResult.organizer || '未识别'}</div>
                  <div><span className="font-medium">费用：</span> {textResult.price || '未识别'}</div>
                  <div><span className="font-medium">联系：</span> {textResult.contact || '未识别'}</div>
                  <div><span className="font-medium">网站：</span> {textResult.website || '未识别'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 地图信息区域 - 只有在地图识别完成后才显示 */}
          {urlResult && urlResult.coordinates && (
            <div className="bg-white rounded-md p-3 mb-3">
              <h4 className="font-medium text-gray-800 mb-2 text-sm">🗺️ 地图位置信息</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div><span className="font-medium">坐标：</span>{' '}
                  {typeof urlResult.coordinates === 'string' 
                    ? urlResult.coordinates 
                    : `${urlResult.coordinates.lat}, ${urlResult.coordinates.lng}`}
                </div>
                <div><span className="font-medium">来源：</span> {urlResult.coordsSource}</div>
                <div><span className="font-medium">地图URL：</span>{' '}
                  <a href={urlResult.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    查看地图 ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 🔥 当前分类状态显示 */}
          {(selectedRegion || selectedActivityType) && (
            <div className="bg-orange-50 border border-orange-200 rounded-md p-2 mb-3">
              <h4 className="font-medium text-orange-800 mb-1 text-sm">⚠️ 手动选择状态</h4>
              <div className="space-y-1 text-xs">
                {selectedRegion && (
                  <div className="text-orange-700">
                    <span className="font-medium">地区：</span>
                    已手动选择 <span className="bg-orange-200 px-1 py-0.5 rounded text-xs">{regionOptions.find(r => r.value === selectedRegion)?.label}</span>
                    ，将覆盖AI识别结果
                  </div>
                )}
                {selectedActivityType && (
                  <div className="text-orange-700">
                    <span className="font-medium">活动类型：</span>
                    已手动选择 <span className="bg-orange-200 px-1 py-0.5 rounded text-xs">{activityTypeOptions.find(t => t.value === selectedActivityType)?.label}</span>
                    ，将覆盖AI识别结果
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 🔥 操作按钮区域 */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-purple-700">
              {urlResult && urlResult.coordinates ? (
                <span>✅ 九项信息和地图坐标已准备就绪，可以录入数据库</span>
              ) : (
                <span>📝 九项信息已识别完成，等待地图位置识别后可录入数据库</span>
              )}
            </div>
            <button
              onClick={() => handleDatabaseSave('check')}
              disabled={databaseLoading || !urlResult || !urlResult.coordinates}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
            >
              {databaseLoading ? '正在录入...' : 
               (!urlResult || !urlResult.coordinates) ? '等待地图识别...' : '🚀 录入数据库'}
            </button>
          </div>

          {/* 录入结果 */}
          {databaseResult && (
            <div className={`mt-4 p-4 rounded-md ${
              databaseResult.success 
                ? 'bg-green-100 border border-green-200'
                : 'bg-red-100 border border-red-200'
            }`}>
              {databaseResult.success ? (
                <div className="text-green-800">
                  <div className="font-medium text-lg mb-2">✅ 录入成功！</div>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">活动ID：</span> {databaseResult.eventId}</div>
                    <div><span className="font-medium">活动名称：</span> {databaseResult.data?.name}</div>
                    <div><span className="font-medium">活动类型：</span>{' '}
                      {databaseResult.activityTypeName} 
                      {databaseResult.classification && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {databaseResult.classification.confidence}% 置信度
                        </span>
                      )}
                    </div>
                    <div><span className="font-medium">识别地区：</span> {databaseResult.data?.region}</div>
                    <div><span className="font-medium">坐标位置：</span>{' '}
                      {typeof databaseResult.data?.coordinates === 'string' 
                        ? databaseResult.data.coordinates 
                        : databaseResult.data?.coordinates 
                          ? `${databaseResult.data.coordinates.lat}, ${databaseResult.data.coordinates.lng}`
                          : '未获取'}
                    </div>
                    {databaseResult.classification?.reason && (
                      <div><span className="font-medium">识别原因：</span> {databaseResult.classification.reason}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-red-800">
                  <div className="font-medium text-lg mb-2">❌ 录入失败</div>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">错误信息：</span> {databaseResult.error}</div>
                    {databaseResult.message && <div><span className="font-medium">详细说明：</span> {databaseResult.message}</div>}
                    {databaseResult.existingId && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <span className="font-medium">💡 提示：</span>该活动可能已存在，ID: {databaseResult.existingId}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 使用说明 - 紧凑版 */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h3 className="text-base font-semibold mb-2">使用说明</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-1 text-xs">📝 文本识别功能</h4>
            <ul className="space-y-0.5 text-xs">
              <li>• 复制粘贴完整的日文活动信息</li>
              <li>• 自动识别九项内容</li>
              <li>• 适用于详细文本信息</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1 text-xs">📄 内容识别功能</h4>
            <ul className="space-y-0.5 text-xs">
              <li>• 输入Jalan活动网址</li>
              <li>• 自动提取活动简介</li>
              <li>• 可直接保存到Prisma数据库</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1 text-xs">🗺️ 地图识别功能</h4>
            <ul className="space-y-0.5 text-xs">
              <li>• 输入官方网站URL</li>
              <li>• 自动提取谷歌地图坐标</li>
              <li>• 获得精确地理位置</li>
            </ul>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <strong>使用流程：</strong> 1) 文本识别九项信息 → 2) 内容识别获取简介 → 3) 地图识别获取坐标 → 4) 选择地区和活动类型 → 5) 三个功能结果合并保存为一条完整数据
      </div>
      </div>

      {/* 🔥 统一数据保存区域 */}
      {(textResult?.success || contentResult?.success || urlResult?.success) && (
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            💾 完整数据录入
          </h3>
          
          {/* 三个功能的完成状态 */}
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className={`p-2 rounded border text-xs ${
              textResult?.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <div className="font-medium">📝 文本识别</div>
              <div>{textResult?.success ? '✅ 已完成九项信息识别' : '⏳ 待完成'}</div>
            </div>
            
            <div className={`p-2 rounded border text-xs ${
              contentResult?.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <div className="font-medium">📄 内容识别</div>
              <div>{contentResult?.success ? '✅ 已获取活动简介' : '⏳ 待完成'}</div>
            </div>
            
            <div className={`p-2 rounded border text-xs ${
              urlResult?.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <div className="font-medium">🗺️ 地图识别</div>
              <div>{urlResult?.success ? '✅ 已获取地理坐标' : '⏳ 待完成'}</div>
            </div>
          </div>
          
          {/* 保存按钮和状态 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveToDatabase}
              disabled={
                !textResult?.success || 
                !contentResult?.success || 
                !urlResult?.success || 
                !selectedRegion || 
                !selectedActivityType
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
            >
              {saveStatus || '保存完整数据到数据库'}
            </button>
            
            <div className="text-xs text-gray-600">
              {!textResult?.success || !contentResult?.success || !urlResult?.success 
                ? '请完成所有三个功能的识别' 
                : !selectedRegion || !selectedActivityType 
                ? '请选择地区和活动类型' 
                : '准备保存完整的活动数据'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 