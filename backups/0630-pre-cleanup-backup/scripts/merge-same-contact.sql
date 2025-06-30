-- 合并相同联系方式的重复数据SQL
-- 生成时间: 2025-06-23T05:12:19.116Z
--
-- 请在执行前备份数据库！
--

-- 删除重复活动: "东京红叶祭典" (联系方式: 03-3833-0030)
DELETE FROM matsuri_events WHERE id = 'cmc8lwxnc0007vlpg967x6w4y';