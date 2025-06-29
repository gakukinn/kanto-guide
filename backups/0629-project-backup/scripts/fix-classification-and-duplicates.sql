-- 数据分类和去重修复SQL
-- 生成时间: 2025-06-23T05:07:59.153Z
--
-- 请在执行前备份数据库！
--

-- 移动 "ぎおん柏崎まつり" 从 hanabi_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanabi_events WHERE id = 'cmc7qs6v00001vlicib3c2ctu';
DELETE FROM hanabi_events WHERE id = 'cmc7qs6v00001vlicib3c2ctu';

-- 移动 "隅田川花火大会（すみだがわはなびたいかい）" 从 matsuri_events 到 hanabi_events
INSERT INTO hanabi_events SELECT * FROM matsuri_events WHERE id = 'cmc8kqfzx0009vlggwdugna25';
DELETE FROM matsuri_events WHERE id = 'cmc8kqfzx0009vlggwdugna25';

-- 移动 "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）" 从 matsuri_events 到 hanabi_events
INSERT INTO hanabi_events SELECT * FROM matsuri_events WHERE id = 'cmc8ku2gf000bvlgga8kgtpu4';
DELETE FROM matsuri_events WHERE id = 'cmc8ku2gf000bvlgga8kgtpu4';

-- 移动 "市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）" 从 matsuri_events 到 hanabi_events
INSERT INTO hanabi_events SELECT * FROM matsuri_events WHERE id = 'cmc8kygzs000dvlgg8h068t2w';
DELETE FROM matsuri_events WHERE id = 'cmc8kygzs000dvlgg8h068t2w';

-- 移动 "水郷佐原あやめ祭り" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc7okpxj0001vlj41zwu3leu';
DELETE FROM hanami_events WHERE id = 'cmc7okpxj0001vlj41zwu3leu';

-- 移动 "水郷潮来あやめまつり" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc7phxmg0002vlr0jhf4dqwg';
DELETE FROM hanami_events WHERE id = 'cmc7phxmg0002vlr0jhf4dqwg';

-- 移动 "第51回水戸のあじさいまつり" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc7phxmk0004vlr07icb7v6m';
DELETE FROM hanami_events WHERE id = 'cmc7phxmk0004vlr07icb7v6m';

-- 移动 "河口湖ハーブフェスティバル" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc7q7n2j0002vl6cvjq3sb9s';
DELETE FROM hanami_events WHERE id = 'cmc7q7n2j0002vl6cvjq3sb9s';

-- 移动 "熊谷うちわ祭" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc7wqz6a0001vlk4kftbu9uu';
DELETE FROM hanami_events WHERE id = 'cmc7wqz6a0001vlk4kftbu9uu';

-- 移动 "葛飾納涼花火大会" 从 hanami_events 到 hanabi_events
INSERT INTO hanabi_events SELECT * FROM hanami_events WHERE id = 'cmc7wzcy10001vlaklsek60rn';
DELETE FROM hanami_events WHERE id = 'cmc7wzcy10001vlaklsek60rn';

-- 移动 "河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）" 从 hanami_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM hanami_events WHERE id = 'cmc8lz1is0001vlhsqvvehy6c';
DELETE FROM hanami_events WHERE id = 'cmc8lz1is0001vlhsqvvehy6c';

-- 移动 "东京红叶祭典" 从 momiji_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM momiji_events WHERE id = 'cmc8lwxnc0007vlpg967x6w4y';
DELETE FROM momiji_events WHERE id = 'cmc8lwxnc0007vlpg967x6w4y';

-- 移动 "第109回日本陸上競技選手権大会" 从 culture_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM culture_events WHERE id = 'cmc7o1zja0002vl0skcfl1z95';
DELETE FROM culture_events WHERE id = 'cmc7o1zja0002vl0skcfl1z95';

-- 移动 "THE ROAD RACE TOKYO TAMA 2025" 从 culture_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM culture_events WHERE id = 'cmc7o1zjm0006vl0srtqidxl5';
DELETE FROM culture_events WHERE id = 'cmc7o1zjm0006vl0srtqidxl5';

-- 移动 "鵠沼皇大神宮人形山車" 从 culture_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM culture_events WHERE id = 'cmc7ovolw000ivl9cov7x9jjk';
DELETE FROM culture_events WHERE id = 'cmc7ovolw000ivl9cov7x9jjk';

-- 移动 "第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）" 从 culture_events 到 matsuri_events
INSERT INTO matsuri_events SELECT * FROM culture_events WHERE id = 'cmc8mapqf0005vlhs38wrywrj';
DELETE FROM culture_events WHERE id = 'cmc8mapqf0005vlhs38wrywrj';

-- 重复组: 名称相似度80%
-- 保留: "葛飾納涼花火大会" (hanabi_events)
-- 删除: "葛飾納涼花火大会" (hanami_events)
DELETE FROM hanami_events WHERE id = 'cmc7wzcy10001vlaklsek60rn';

-- 重复组: 官网URL相同
-- 保留: "隅田川花火大会" (hanabi_events)
-- 删除: "隅田川花火大会（すみだがわはなびたいかい）" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8kqfzx0009vlggwdugna25';

-- 重复组: 电话号码相同
-- 保留: "令和7年度さいたま市花火大会（大和田公園会場）" (hanabi_events)
-- 删除: "令和7年度さいたま市花火大会（東浦和大間木公園会場）" (hanabi_events)
DELETE FROM hanabi_events WHERE id = 'cmc7o9nqd000ivlcwctvltj8s';

-- 重复组: 名称相似度80%
-- 保留: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会" (hanabi_events)
-- 删除: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）" (hanabi_events)
DELETE FROM hanabi_events WHERE id = 'cmc8m7ty00003vlhshw05lrkg';
-- 删除: "山梨市制施行20周年記念事業　笛吹川県下納涼花火大会（ふえふきがわけんかのうりょうはなびたいかい）" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8ku2gf000bvlgga8kgtpu4';

-- 重复组: 名称相似度80%
-- 保留: "市川三郷町ふるさと夏まつり　「神明の花火大会」" (hanabi_events)
-- 删除: "市川三郷町ふるさと夏まつり　「神明の花火大会」（いちかわみさとちょうふるさとなつまつり　しんめいのはなびたいかい）" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8kygzs000dvlgg8h068t2w';

-- 重复组: 名称相似度80%
-- 保留: "熊谷うちわ祭" (matsuri_events)
-- 删除: "熊谷うちわ祭" (hanami_events)
DELETE FROM hanami_events WHERE id = 'cmc7wqz6a0001vlk4kftbu9uu';

-- 重复组: 官网URL相同
-- 保留: "第37回国宝松本城太鼓まつり" (matsuri_events)
-- 删除: "第37回国宝松本城太鼓まつり（こくほうまつもとじょうたいこまつり）" (culture_events)
DELETE FROM culture_events WHERE id = 'cmc8mapqf0005vlhs38wrywrj';

-- 重复组: 电话号码相同
-- 保留: "雪の大谷ウォーク（ゆきのおおたにウォーク）" (matsuri_events)
-- 删除: "雪の大谷ウォーク" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8kszca0003vlmkyo62mn7x';
-- 删除: "雪の大谷ウォーク（ゆきのおおたにウォーク）" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8l1jy10001vl4wy9t0b5rv';
-- 删除: "雪の大谷ウォーク" (matsuri_events)
DELETE FROM matsuri_events WHERE id = 'cmc8l1jy50003vl4wb13m430o';

-- 重复组: 电话号码相同
-- 保留: "东京红叶祭典" (matsuri_events)
-- 删除: "上野恩賜公園桜まつり" (hanami_events)
DELETE FROM hanami_events WHERE id = 'cmc8lpy0p0003vlpggmhdg82t';
-- 删除: "东京红叶祭典" (momiji_events)
DELETE FROM momiji_events WHERE id = 'cmc8lwxnc0007vlpg967x6w4y';

-- 重复组: 名称相似度80%
-- 保留: "河口湖ハーブフェスティバル" (hanami_events)
-- 删除: "河口湖ハーブフェスティバル（かわぐちこハーブフェスティバル）" (hanami_events)
DELETE FROM hanami_events WHERE id = 'cmc8lz1is0001vlhsqvvehy6c';
