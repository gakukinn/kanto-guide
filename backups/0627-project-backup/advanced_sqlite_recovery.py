#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
高级SQLite数据恢复工具
基于相似类型匹配估算方法
参考：公安部第三研究所的SQLite删除数据恢复技术
"""

import struct
import sqlite3
import os
import re
from typing import List, Dict, Tuple, Optional

class SQLiteRecovery:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.page_size = 4096  # 默认页面大小
        self.encoding = 'utf-8'
        
    def read_database_header(self) -> Dict:
        """读取数据库头部信息"""
        with open(self.db_path, 'rb') as f:
            header = f.read(100)
            
        # 解析头部信息
        page_size = struct.unpack('>H', header[16:18])[0]
        if page_size == 0x0001:
            page_size = 65536
        elif page_size == 0x0000:
            page_size = 4096
            
        self.page_size = page_size
        
        return {
            'magic': header[0:16],
            'page_size': page_size,
            'write_version': header[18],
            'read_version': header[19],
            'reserved_space': header[20],
            'max_embedded_payload_fraction': header[21],
            'min_embedded_payload_fraction': header[22],
            'leaf_payload_fraction': header[23],
            'file_change_counter': struct.unpack('>I', header[24:28])[0],
            'database_size_pages': struct.unpack('>I', header[28:32])[0],
            'first_freelist_trunk_page': struct.unpack('>I', header[32:36])[0],
            'total_freelist_pages': struct.unpack('>I', header[36:40])[0],
            'schema_cookie': struct.unpack('>I', header[40:44])[0],
            'schema_format_number': struct.unpack('>I', header[44:48])[0],
            'default_page_cache_size': struct.unpack('>I', header[48:52])[0],
            'largest_root_btree_page_number': struct.unpack('>I', header[52:56])[0],
            'text_encoding': struct.unpack('>I', header[56:60])[0],
            'user_version': struct.unpack('>I', header[60:64])[0],
            'incremental_vacuum_mode': struct.unpack('>I', header[64:68])[0],
            'application_id': struct.unpack('>I', header[68:72])[0],
            'version_valid_for_number': struct.unpack('>I', header[92:96])[0],
            'sqlite_version_number': struct.unpack('>I', header[96:100])[0]
        }
    
    def read_page(self, page_number: int) -> bytes:
        """读取指定页面"""
        with open(self.db_path, 'rb') as f:
            f.seek((page_number - 1) * self.page_size)
            return f.read(self.page_size)
    
    def parse_varint(self, data: bytes, offset: int) -> Tuple[int, int]:
        """解析SQLite变长整数"""
        value = 0
        bytes_read = 0
        
        for i in range(9):  # 最多9字节
            if offset + i >= len(data):
                break
                
            byte = data[offset + i]
            bytes_read += 1
            
            if i < 8:
                value = (value << 7) | (byte & 0x7F)
                if (byte & 0x80) == 0:
                    break
            else:
                value = (value << 8) | byte
                
        return value, bytes_read
    
    def analyze_cell_content(self, data: bytes, offset: int) -> Optional[Dict]:
        """分析cell内容，尝试恢复记录"""
        try:
            # 读取记录长度
            if offset >= len(data):
                return None
                
            payload_size, bytes_read = self.parse_varint(data, offset)
            offset += bytes_read
            
            if offset >= len(data):
                return None
            
            # 读取rowid
            rowid, bytes_read = self.parse_varint(data, offset)
            offset += bytes_read
            
            if offset >= len(data):
                return None
            
            # 读取header size
            header_size, bytes_read = self.parse_varint(data, offset)
            header_start = offset
            offset += bytes_read
            
            if offset + header_size - bytes_read > len(data):
                return None
            
            # 解析列类型
            column_types = []
            while offset < header_start + header_size:
                col_type, bytes_read = self.parse_varint(data, offset)
                column_types.append(col_type)
                offset += bytes_read
            
            # 读取数据
            data_start = header_start + header_size
            if data_start >= len(data):
                return None
                
            values = []
            data_offset = data_start
            
            for col_type in column_types:
                if data_offset >= len(data):
                    break
                    
                value = self.parse_column_value(data, data_offset, col_type)
                if value is not None:
                    values.append(value[0])
                    data_offset += value[1]
                else:
                    break
            
            return {
                'payload_size': payload_size,
                'rowid': rowid,
                'column_types': column_types,
                'values': values
            }
            
        except Exception as e:
            return None
    
    def parse_column_value(self, data: bytes, offset: int, col_type: int) -> Optional[Tuple[any, int]]:
        """解析列值"""
        try:
            if col_type == 0:  # NULL
                return None, 0
            elif col_type == 1:  # 8-bit signed integer
                if offset + 1 > len(data):
                    return None, 0
                return struct.unpack('b', data[offset:offset+1])[0], 1
            elif col_type == 2:  # 16-bit signed integer
                if offset + 2 > len(data):
                    return None, 0
                return struct.unpack('>h', data[offset:offset+2])[0], 2
            elif col_type == 3:  # 24-bit signed integer
                if offset + 3 > len(data):
                    return None, 0
                value = struct.unpack('>I', b'\x00' + data[offset:offset+3])[0]
                if value & 0x800000:
                    value -= 0x1000000
                return value, 3
            elif col_type == 4:  # 32-bit signed integer
                if offset + 4 > len(data):
                    return None, 0
                return struct.unpack('>i', data[offset:offset+4])[0], 4
            elif col_type == 5:  # 48-bit signed integer
                if offset + 6 > len(data):
                    return None, 0
                value = struct.unpack('>Q', b'\x00\x00' + data[offset:offset+6])[0]
                if value & 0x800000000000:
                    value -= 0x1000000000000
                return value, 6
            elif col_type == 6:  # 64-bit signed integer
                if offset + 8 > len(data):
                    return None, 0
                return struct.unpack('>q', data[offset:offset+8])[0], 8
            elif col_type == 7:  # 64-bit float
                if offset + 8 > len(data):
                    return None, 0
                return struct.unpack('>d', data[offset:offset+8])[0], 8
            elif col_type == 8:  # Integer 0
                return 0, 0
            elif col_type == 9:  # Integer 1
                return 1, 0
            elif col_type >= 12 and col_type % 2 == 0:  # BLOB
                length = (col_type - 12) // 2
                if offset + length > len(data):
                    return None, 0
                return data[offset:offset+length], length
            elif col_type >= 13 and col_type % 2 == 1:  # TEXT
                length = (col_type - 13) // 2
                if offset + length > len(data):
                    return None, 0
                try:
                    text = data[offset:offset+length].decode(self.encoding)
                    return text, length
                except UnicodeDecodeError:
                    return data[offset:offset+length], length
            else:
                return None, 0
        except:
            return None, 0
    
    def search_deleted_records(self, table_schema: Dict) -> List[Dict]:
        """搜索已删除的记录"""
        recovered_records = []
        
        # 获取数据库信息
        header = self.read_database_header()
        total_pages = header['database_size_pages']
        
        print(f"扫描 {total_pages} 个页面寻找已删除数据...")
        
        # 扫描所有页面
        for page_num in range(1, total_pages + 1):
            page_data = self.read_page(page_num)
            
            # 分析页面头部
            if len(page_data) < 8:
                continue
                
            page_type = page_data[0]
            
            # 只处理叶子页面 (页面类型 0x0D 表示表B+树叶子页面)
            if page_type != 0x0D:
                continue
            
            # 查找自由空间中的删除记录
            self.scan_free_space_in_page(page_data, recovered_records, table_schema)
        
        return recovered_records
    
    def scan_free_space_in_page(self, page_data: bytes, recovered_records: List, table_schema: Dict):
        """扫描页面中的自由空间寻找删除记录"""
        page_size = len(page_data)
        
        # 从页面末尾开始向前扫描
        for offset in range(page_size - 1, 100, -1):  # 从末尾到页面头部
            try:
                # 尝试解析为记录
                record = self.analyze_cell_content(page_data, offset)
                if record and self.is_valid_record(record, table_schema):
                    # 验证记录是否符合表结构
                    if self.validate_record_structure(record, table_schema):
                        recovered_records.append({
                            'offset': offset,
                            'record': record,
                            'confidence': self.calculate_confidence(record, table_schema)
                        })
            except:
                continue
    
    def is_valid_record(self, record: Dict, table_schema: Dict) -> bool:
        """验证记录是否有效"""
        if not record or 'values' not in record:
            return False
        
        values = record['values']
        
        # 检查值的数量是否合理
        if len(values) < 3 or len(values) > 50:  # 合理的列数范围
            return False
        
        # 检查是否包含合理的文本内容
        text_count = 0
        for value in values:
            if isinstance(value, str) and len(value) > 0:
                text_count += 1
                # 检查是否包含日文字符或合理的ASCII
                if re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', value) or value.isprintable():
                    return True
        
        return text_count > 0
    
    def validate_record_structure(self, record: Dict, table_schema: Dict) -> bool:
        """验证记录结构是否匹配表模式"""
        # 简单的结构验证
        values = record['values']
        
        # 检查是否有ID字段（通常是第一个字段）
        if len(values) > 0:
            first_value = values[0]
            if isinstance(first_value, str) and len(first_value) > 10:  # Prisma ID通常很长
                return True
        
        return False
    
    def calculate_confidence(self, record: Dict, table_schema: Dict) -> float:
        """计算恢复信心度"""
        confidence = 0.0
        values = record['values']
        
        # 基础分数
        confidence += 0.3
        
        # 检查ID格式
        if len(values) > 0 and isinstance(values[0], str):
            if len(values[0]) > 20:  # Prisma ID长度
                confidence += 0.3
        
        # 检查日文内容
        for value in values:
            if isinstance(value, str):
                if re.search(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]', value):
                    confidence += 0.2
                    break
        
        # 检查年份
        for value in values:
            if isinstance(value, int) and value == 2025:
                confidence += 0.2
                break
        
        return min(confidence, 1.0)

def main():
    """主函数"""
    db_path = r".\prisma\dev.db"
    
    if not os.path.exists(db_path):
        print(f"数据库文件不存在: {db_path}")
        return
    
    recovery = SQLiteRecovery(db_path)
    
    # 定义表结构（简化版）
    hanabi_schema = {
        'name': 'hanabi_events',
        'columns': ['id', 'eventId', 'name', 'year', 'month', 'location']
    }
    
    matsuri_schema = {
        'name': 'matsuri_events', 
        'columns': ['id', 'eventId', 'name', 'year', 'month', 'location']
    }
    
    print("开始高级数据恢复...")
    print("=" * 50)
    
    # 搜索hanabi记录
    print("搜索花火大会(hanabi)删除记录...")
    hanabi_records = recovery.search_deleted_records(hanabi_schema)
    
    print(f"找到 {len(hanabi_records)} 个可能的花火记录")
    for i, record_info in enumerate(hanabi_records[:10]):  # 显示前10个
        record = record_info['record']
        confidence = record_info['confidence']
        print(f"记录 {i+1} (信心度: {confidence:.2f}):")
        print(f"  值: {record['values'][:5]}...")  # 显示前5个值
    
    print("\n搜索祭典(matsuri)删除记录...")
    matsuri_records = recovery.search_deleted_records(matsuri_schema)
    
    print(f"找到 {len(matsuri_records)} 个可能的祭典记录")
    for i, record_info in enumerate(matsuri_records[:10]):  # 显示前10个
        record = record_info['record']
        confidence = record_info['confidence']
        print(f"记录 {i+1} (信心度: {confidence:.2f}):")
        print(f"  值: {record['values'][:5]}...")  # 显示前5个值
    
    # 过滤高信心度记录
    high_confidence_hanabi = [r for r in hanabi_records if r['confidence'] > 0.7]
    high_confidence_matsuri = [r for r in matsuri_records if r['confidence'] > 0.7]
    
    print(f"\n高信心度恢复结果:")
    print(f"花火记录: {len(high_confidence_hanabi)} 条")
    print(f"祭典记录: {len(high_confidence_matsuri)} 条")

if __name__ == "__main__":
    main() 