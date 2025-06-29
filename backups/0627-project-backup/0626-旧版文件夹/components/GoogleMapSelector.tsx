/**
 * 谷歌地图位置选择器
 * @description 用户可以点击地图选择活动位置，支持搜索和拖拽标记
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectedLocation: { lat: number; lng: number } | null;
  height?: string;
}

// 默认中心点：东京
const DEFAULT_CENTER = { lat: 35.6762, lng: 139.6503 };

export default function GoogleMapSelector({ 
  onLocationSelect, 
  selectedLocation, 
  height = '300px' 
}: GoogleMapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // 加载谷歌地图API
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        if (!mapRef.current) return;

        // 创建地图实例
        const map = new google.maps.Map(mapRef.current, {
          center: selectedLocation || DEFAULT_CENTER,
          zoom: selectedLocation ? 15 : 10,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // 如果有选中的位置，显示标记
        if (selectedLocation) {
          addMarker(selectedLocation, map);
        }

        // 点击地图事件
        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const location = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            
            // 更新标记位置
            addMarker(location, map);
            
            // 通知父组件
            onLocationSelect(location);
          }
        });

        setIsLoaded(true);
      } catch (err) {
        console.error('地图加载失败:', err);
        setError('地图加载失败，请检查网络连接或API密钥');
      }
    };

    initMap();
  }, []);

  // 添加或更新标记
  const addMarker = (location: { lat: number; lng: number }, map: google.maps.Map) => {
    // 移除旧标记
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 创建新标记
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 12 12 24 12 24s12-12 12-24c0-6.627-5.373-12-12-12z" fill="#FF4444"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
            <text x="12" y="16" text-anchor="middle" font-family="Arial" font-size="12" fill="#FF4444">🎆</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 36),
        anchor: new google.maps.Point(12, 36)
      }
    });

    // 标记拖拽事件
    marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        onLocationSelect(newLocation);
      }
    });

    markerRef.current = marker;
  };

  // 搜索地点
  const handleSearch = (query: string) => {
    if (!mapInstanceRef.current || !query.trim()) return;

    const service = new google.maps.places.PlacesService(mapInstanceRef.current);
    
    const request = {
      query: query,
      fields: ['name', 'geometry'],
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
        const place = results[0];
        if (place.geometry?.location) {
          const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          
          // 移动地图到搜索位置
          mapInstanceRef.current?.setCenter(location);
          mapInstanceRef.current?.setZoom(15);
          
          // 添加标记
          addMarker(location, mapInstanceRef.current!);
          
          // 通知父组件
          onLocationSelect(location);
        }
      }
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4`} style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-700 text-sm">{error}</p>
            <p className="text-red-600 text-xs mt-1">
              请确保已配置Google Maps API密钥
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索地点"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(searchQuery);
            }
          }}
        />
        <button
          type="button"
          onClick={() => handleSearch(searchQuery)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          搜索
        </button>
      </div>

      {/* 地图容器 */}
      <div className="relative border border-gray-300 rounded-lg overflow-hidden">
        <div 
          ref={mapRef} 
          style={{ height }}
          className="w-full"
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">加载地图中...</p>
            </div>
          </div>
        )}
      </div>

      {/* 使用说明 */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium mb-1">💡 使用提示：</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>点击地图任意位置选择活动举办地</li>
          <li>拖拽红色标记微调精确位置</li>
          <li>使用搜索框快速定位到具体地点</li>
          <li>建议选择活动的主要观赏区域</li>
        </ul>
      </div>
    </div>
  );
} 