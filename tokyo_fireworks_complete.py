import sqlite3
import json
from datetime import datetime

# 完整的东京烟花活动数据 (包含所有23个活动)
fireworks_data = [
    # 第1页 (排名1-10位)
    {
        "rank": 1,
        "name": "東京競馬場花火 2025 ～花火と聴きたい J-POP BEST～",
        "description": "首都圏最大級！約15,000発の迫力ある花火と人気楽曲がシンクロ",
        "location": "東京都・府中市/東京競馬場",
        "date": "2025年7月22日(火)",
        "audience": "約10万人",
        "fireworks_count": "約15,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 2,
        "name": "第48回 隅田川花火大会",
        "description": "東京の夏の風物詩！歴史ある花火大会",
        "location": "東京都・墨田区、台東区/隅田川",
        "date": "2025年7月26日(土)",
        "audience": "約95万人",
        "fireworks_count": "約12,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 3,
        "name": "第40回 調布花火",
        "description": "音楽と花火がコラボレーション！",
        "location": "東京都・調布市/多摩川河川敷",
        "date": "2025年10月26日(日)",
        "audience": "約30万人",
        "fireworks_count": "約10,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 4,
        "name": "第59回 葛飾納涼花火大会",
        "description": "下町情緒あふれる花火大会",
        "location": "東京都・葛飾区/江戸川河川敷",
        "date": "2025年7月22日(火)",
        "audience": "約77万人",
        "fireworks_count": "約10,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 5,
        "name": "第50回 江戸川区花火大会",
        "description": "東京屈指の規模を誇る花火大会",
        "location": "東京都・江戸川区/江戸川河川敷",
        "date": "2025年8月2日(土)",
        "audience": "約90万人",
        "fireworks_count": "約10,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 6,
        "name": "第36回 世田谷区たまがわ花火大会",
        "description": "音楽と花火の饗宴",
        "location": "東京都・世田谷区/多摩川河川敷",
        "date": "2025年10月11日(土)",
        "audience": "約23万人",
        "fireworks_count": "約8,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 7,
        "name": "いたばし花火大会",
        "description": "尺玉100連発が圧巻！",
        "location": "東京都・板橋区/荒川河川敷",
        "date": "2025年8月9日(土)",
        "audience": "約52万人",
        "fireworks_count": "約8,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 8,
        "name": "足立の花火",
        "description": "夏の始まりを告げる花火大会",
        "location": "東京都・足立区/荒川河川敷",
        "date": "2025年7月19日(土)",
        "audience": "約66万人",
        "fireworks_count": "約7,500発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 9,
        "name": "第33回 大田区平和都市宣言記念事業 花火の祭典",
        "description": "平和への願いを込めた花火大会",
        "location": "東京都・大田区/多摩川河川敷",
        "date": "2025年8月16日(土)",
        "audience": "約40万人",
        "fireworks_count": "約7,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 10,
        "name": "青梅市納涼花火大会",
        "description": "奥多摩の自然を背景に打ち上がる花火",
        "location": "東京都・青梅市/多摩川河川敷",
        "date": "2025年8月2日(土)",
        "audience": "約8万人",
        "fireworks_count": "約6,000発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    # 第2页 (排名11-20位)
    {
        "rank": 11,
        "name": "立川まつり 国営昭和記念公園花火大会",
        "description": "立川市最大のイベント、まつりのフィナーレを飾る花火大会",
        "location": "東京都・立川市/国営昭和記念公園",
        "date": "2025年7月26日(土)",
        "audience": "約30万人",
        "fireworks_count": "5000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 12,
        "name": "八王子花火大会",
        "description": "多摩地区屈指の花火大会",
        "location": "東京都・八王子市/富士森公園",
        "date": "2025年7月26日(土)",
        "audience": "約8万人",
        "fireworks_count": "約4,000発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 13,
        "name": "第53回 昭島市民くじら祭 夢花火",
        "description": "昭島の夏の風物詩",
        "location": "東京都・昭島市/昭和公園",
        "date": "2025年8月23日(土)",
        "audience": "約9万人",
        "fireworks_count": "約2,000発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    {
        "rank": 14,
        "name": "お台場レインボー花火2024",
        "description": "東京湾の夜景とともに楽しむ花火",
        "location": "東京都・港区/お台場海浜公園",
        "date": "2024年12月7日(土)・14日(土)・21日(土)・28日(土)",
        "audience": "非公開",
        "fireworks_count": "約1,300発（各日）",
        "paid_seats": "あり",
        "stalls": "なし"
    },
    {
        "rank": 15,
        "name": "よみうりランド 花火＆大迫力噴水ショー",
        "description": "遊園地で楽しむ花火と噴水のコラボレーション",
        "location": "東京都・稲城市/よみうりランド",
        "date": "2025年1月11日(土)～2月23日(日)の土日祝",
        "audience": "非公開",
        "fireworks_count": "1200発",
        "paid_seats": "あり",
        "stalls": "あり"
    },
    {
        "rank": 16,
        "name": "町制施行70周年記念 奥多摩納涼花火大会",
        "description": "奥多摩の大自然の中で楽しむ花火",
        "location": "東京都・奥多摩町/愛宕山運動場",
        "date": "2025年8月9日(土)",
        "audience": "約2万人",
        "fireworks_count": "約1,000発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    {
        "rank": 17,
        "name": "2024 伊豆大島夏まつり花火大会",
        "description": "伊豆大島の夏を彩る花火大会",
        "location": "東京都・大島町/元町港周辺",
        "date": "2024年8月10日(土)",
        "audience": "非公開",
        "fireworks_count": "約900発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    {
        "rank": 18,
        "name": "御蔵島花火大会",
        "description": "御蔵島の夏の一大イベント",
        "location": "東京都・御蔵島村/御蔵島港周辺",
        "date": "2025年7月31日(木)",
        "audience": "非公開",
        "fireworks_count": "約802発",
        "paid_seats": "なし",
        "stalls": "なし"
    },
    {
        "rank": 19,
        "name": "第32回 神津島 渚の花火大会",
        "description": "神津島の美しい海辺で開催される花火大会",
        "location": "東京都・神津島村/神津島港周辺",
        "date": "2025年8月4日(月)",
        "audience": "非公開",
        "fireworks_count": "747発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    {
        "rank": 20,
        "name": "第23回 八丈島納涼花火大会",
        "description": "八丈島の夏を締めくくる花火大会",
        "location": "東京都・八丈町/八丈島空港周辺",
        "date": "2024年8月11日(日)",
        "audience": "非公開",
        "fireworks_count": "650発",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    # 第3页 (排名21-23位)
    {
        "rank": 21,
        "name": "夏休み！ 神宮花火ナイター",
        "description": "野球観戦×花火で夏を満喫",
        "location": "東京都・新宿区/明治神宮野球場",
        "date": "2025/7/19～21・26・27・8/1～3・11～13・19～24・29～31",
        "audience": "3万人",
        "fireworks_count": "300発",
        "paid_seats": "あり",
        "stalls": "なし"
    },
    {
        "rank": 22,
        "name": "横田基地日米友好祭(フレンドシップフェスティバル)",
        "description": "アメリカ文化と交流を体感できる2日間",
        "location": "東京都・福生市/横田基地",
        "date": "2025年5月18日(日)",
        "audience": "30万人(2024年・2日間合計)",
        "fireworks_count": "非公開",
        "paid_seats": "なし",
        "stalls": "あり"
    },
    {
        "rank": 23,
        "name": "STAR ISLAND 2025 (スターアイランド2025)",
        "description": "STAR ISLANDがお台場で展開する新次元の未来型エンターテインメント",
        "location": "東京都・港区/お台場海浜公園",
        "date": "2025年5月24日(土)・25日(日)",
        "audience": "非公開",
        "fireworks_count": "非公開",
        "paid_seats": "あり",
        "stalls": "あり"
    }
]

def create_database():
    """创建数据库并插入数据"""
    conn = sqlite3.connect('tokyo_fireworks_complete.db')
    cursor = conn.cursor()
    
    # 创建表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fireworks_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rank INTEGER,
            name TEXT,
            description TEXT,
            location TEXT,
            date TEXT,
            audience TEXT,
            fireworks_count TEXT,
            paid_seats TEXT,
            stalls TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 清空现有数据
    cursor.execute('DELETE FROM fireworks_events')
    
    # 插入数据
    for event in fireworks_data:
        cursor.execute('''
            INSERT INTO fireworks_events 
            (rank, name, description, location, date, audience, fireworks_count, paid_seats, stalls)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            event['rank'],
            event['name'],
            event['description'],
            event['location'],
            event['date'],
            event['audience'],
            event['fireworks_count'],
            event['paid_seats'],
            event['stalls']
        ))
    
    conn.commit()
    conn.close()
    print(f"✅ 成功将 {len(fireworks_data)} 个东京烟花活动数据保存到数据库")

def generate_report():
    """生成详细报告"""
    conn = sqlite3.connect('tokyo_fireworks_complete.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM fireworks_events')
    total_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT * FROM fireworks_events ORDER BY rank')
    events = cursor.fetchall()
    
    # 生成报告
    report = []
    report.append("=" * 80)
    report.append("东京烟花活动完整数据报告")
    report.append("=" * 80)
    report.append(f"数据收集时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append(f"数据来源: WalkerPlus (https://hanabi.walkerplus.com/launch/ar0313/)")
    report.append(f"总活动数量: {total_count} 个")
    report.append("")
    
    # 按排名列出所有活动
    report.append("📋 活动详细列表 (按打ち上げ数排名)")
    report.append("-" * 80)
    
    for event in events:
        rank, name, description, location, date, audience, fireworks_count, paid_seats, stalls = event[1:10]
        
        report.append(f"🎆 第{rank}位: {name}")
        report.append(f"   📝 描述: {description}")
        report.append(f"   📍 地点: {location}")
        report.append(f"   📅 时间: {date}")
        report.append(f"   👥 观众数: {audience}")
        report.append(f"   🎇 烟花数: {fireworks_count}")
        report.append(f"   🎫 付费席: {paid_seats}")
        report.append(f"   🍙 摊位: {stalls}")
        report.append("")
    
    # 统计分析
    report.append("📊 数据统计分析")
    report.append("-" * 80)
    
    # 按地区分类统计
    location_stats = {}
    for event in events:
        location = event[4]
        if location:
            # 提取区县信息
            if '・' in location:
                area = location.split('・')[1].split('/')[0]
            else:
                area = location
            location_stats[area] = location_stats.get(area, 0) + 1
    
    report.append("🗺️ 按地区分布:")
    for area, count in sorted(location_stats.items(), key=lambda x: x[1], reverse=True):
        report.append(f"   {area}: {count}个活动")
    
    # 烟花数量分析
    large_scale = []
    medium_scale = []
    small_scale = []
    
    for event in events:
        fireworks_count = event[6]
        if fireworks_count and fireworks_count != "非公開":
            if "10,000" in fireworks_count or "15,000" in fireworks_count:
                large_scale.append(event[2])
            elif any(x in fireworks_count for x in ["5000", "4,000", "7,500", "8,000", "7,000", "6,000"]):
                medium_scale.append(event[2])
            else:
                small_scale.append(event[2])
    
    report.append(f"\n🎇 按规模分类:")
    report.append(f"   大型活动 (6,000发以上): {len(large_scale)+len(medium_scale)}个")
    report.append(f"   中小型活动 (6,000发以下): {len(small_scale)}个")
    
    # 时间分布
    report.append(f"\n📅 按月份分布:")
    month_stats = {"5月": 0, "7月": 0, "8月": 0, "10月": 0, "12月": 0, "1-2月": 0}
    
    for event in events:
        date = event[5]
        if "5月" in date:
            month_stats["5月"] += 1
        elif "7月" in date:
            month_stats["7月"] += 1
        elif "8月" in date:
            month_stats["8月"] += 1
        elif "10月" in date:
            month_stats["10月"] += 1
        elif "12月" in date:
            month_stats["12月"] += 1
        elif "1月" in date or "2月" in date:
            month_stats["1-2月"] += 1
    
    for month, count in month_stats.items():
        if count > 0:
            report.append(f"   {month}: {count}个活动")
    
    report.append("")
    report.append("=" * 80)
    report.append("报告生成完成 ✅")
    report.append("=" * 80)
    
    conn.close()
    
    # 保存报告到文件
    with open('tokyo_fireworks_complete_report.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))
    
    # 打印报告
    print('\n'.join(report))
    
    return '\n'.join(report)

def export_to_json():
    """导出为JSON格式"""
    with open('tokyo_fireworks_complete.json', 'w', encoding='utf-8') as f:
        json.dump(fireworks_data, f, ensure_ascii=False, indent=2)
    print("✅ 数据已导出为 tokyo_fireworks_complete.json")

if __name__ == "__main__":
    print("🎆 开始处理东京烟花活动完整数据...")
    
    # 创建数据库
    create_database()
    
    # 导出JSON
    export_to_json()
    
    # 生成报告
    generate_report()
    
    print("\n🎉 所有任务完成！")
    print("📁 生成的文件:")
    print("   - tokyo_fireworks_complete.db (SQLite数据库)")
    print("   - tokyo_fireworks_complete.json (JSON格式数据)")
    print("   - tokyo_fireworks_complete_report.txt (详细报告)")