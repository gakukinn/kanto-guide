import sqlite3
import json
from datetime import datetime

# 东京烟花活动前15位数据 (纯日文信息)
fireworks_data_top15 = [
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
    }
]

def create_database():
    """データベースを作成してデータを挿入"""
    conn = sqlite3.connect('tokyo_fireworks_top15.db')
    cursor = conn.cursor()
    
    # テーブル作成
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
    
    # 既存データを削除
    cursor.execute('DELETE FROM fireworks_events')
    
    # データ挿入
    for event in fireworks_data_top15:
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
    print(f"✅ 東京花火大会TOP15のデータをデータベースに保存しました（{len(fireworks_data_top15)}件）")

def generate_report():
    """詳細レポートを生成"""
    conn = sqlite3.connect('tokyo_fireworks_top15.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM fireworks_events')
    total_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT * FROM fireworks_events ORDER BY rank')
    events = cursor.fetchall()
    
    # レポート生成
    report = []
    report.append("=" * 80)
    report.append("東京花火大会 TOP15 データレポート")
    report.append("=" * 80)
    report.append(f"データ収集日時: {datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')}")
    report.append(f"データソース: WalkerPlus (https://hanabi.walkerplus.com/launch/ar0313/)")
    report.append(f"花火大会数: {total_count}件")
    report.append("")
    
    # 活動詳細リスト
    report.append("🎆 花火大会一覧（打ち上げ数ランキング順）")
    report.append("-" * 80)
    
    for event in events:
        rank, name, description, location, date, audience, fireworks_count, paid_seats, stalls = event[1:10]
        
        report.append(f"第{rank}位: {name}")
        report.append(f"    内容: {description}")
        report.append(f"    会場: {location}")
        report.append(f"    開催日: {date}")
        report.append(f"    人出: {audience}")
        report.append(f"    打ち上げ数: {fireworks_count}")
        report.append(f"    有料席: {paid_seats}")
        report.append(f"    屋台: {stalls}")
        report.append("")
    
    # 統計分析
    report.append("📊 統計分析")
    report.append("-" * 80)
    
    # 地域別統計
    location_stats = {}
    for event in events:
        location = event[4]
        if location:
            if '・' in location:
                area = location.split('・')[1].split('/')[0]
            else:
                area = location
            location_stats[area] = location_stats.get(area, 0) + 1
    
    report.append("📍 開催地域別分布:")
    for area, count in sorted(location_stats.items(), key=lambda x: x[1], reverse=True):
        report.append(f"    {area}: {count}大会")
    
    # 時期別統計
    report.append(f"\n📅 開催時期別分布:")
    month_stats = {"7月": 0, "8月": 0, "10月": 0, "12月": 0, "1-2月": 0, "5月": 0}
    
    for event in events:
        date = event[5]
        if "7月" in date:
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
            report.append(f"    {month}: {count}大会")
    
    report.append("")
    report.append("=" * 80)
    report.append("レポート完了")
    report.append("=" * 80)
    
    conn.close()
    
    # レポートをファイルに保存
    with open('tokyo_fireworks_top15_report.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))
    
    # レポート表示
    print('\n'.join(report))
    
    return '\n'.join(report)

def export_to_json():
    """JSONファイルとして出力"""
    with open('tokyo_fireworks_top15.json', 'w', encoding='utf-8') as f:
        json.dump(fireworks_data_top15, f, ensure_ascii=False, indent=2)
    print("✅ データをtokyo_fireworks_top15.jsonとして出力しました")

def validate_data_consistency():
    """データの一貫性をチェック"""
    print("🔍 データの一貫性チェック中...")
    
    # データベースのデータと比較
    conn = sqlite3.connect('tokyo_fireworks_top15.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM fireworks_events ORDER BY rank')
    db_events = cursor.fetchall()
    
    print(f"データベース内データ数: {len(db_events)}")
    print(f"JSONデータ数: {len(fireworks_data_top15)}")
    
    if len(db_events) == len(fireworks_data_top15):
        print("✅ データ数の一致確認済み")
    else:
        print("❌ データ数が一致していません")
    
    conn.close()

if __name__ == "__main__":
    print("🎆 東京花火大会TOP15データ処理開始...")
    
    # データベース作成
    create_database()
    
    # JSON出力
    export_to_json()
    
    # レポート生成
    generate_report()
    
    # データ一貫性チェック
    validate_data_consistency()
    
    print("\n🎉 処理完了！")
    print("📁 生成ファイル:")
    print("   - tokyo_fireworks_top15.db (SQLiteデータベース)")
    print("   - tokyo_fireworks_top15.json (JSONデータ)")
    print("   - tokyo_fireworks_top15_report.txt (詳細レポート)") 