const { PrismaClient } = require('@prisma/client');

/**
 * 检查数据库中葛飾納涼花火大会的真实description
 */

async function checkDatabaseDescription() {
    const prisma = new PrismaClient();
    
    try {
        console.log('🔍 检查数据库中葛飾納涼花火大会的真实数据...\n');
        
        // 1. 查找葛飾納涼花火大会
        console.log('=== 1. 查找葛飾納涼花火大会 ===');
        const events = await prisma.hanabiEvent.findMany({
            where: {
                OR: [
                    { name: { contains: '葛飾納涼' } },
                    { name: { contains: 'かつしかのうりょう' } },
                    { id: 'cmc6gu6wt0001vl2saxdj70bt' } // 直接通过ID查找
                ]
            }
        });
        
        console.log('找到的记录数:', events.length);
        
        if (events.length === 0) {
            console.log('❌ 未找到葛飾納涼花火大会的记录');
            return;
        }
        
        // 2. 显示找到的记录
        for (const event of events) {
            console.log(`\n=== 记录详情 ===`);
            console.log('ID:', event.id);
            console.log('名称:', event.name);
            console.log('英文名:', event.englishName || '无');
            console.log('描述字段 (description):', event.description || '(空)');
            console.log('描述长度:', event.description ? event.description.length : 0);
            console.log('是否有描述:', !!event.description);
            
            // 显示其他相关字段
            console.log('\n其他字段:');
            console.log('- 地址:', event.address || '无');
            console.log('- 时间:', event.datetime || '无');
            console.log('- 会场:', event.venue || '无');
            console.log('- 网站:', event.website || '无');
            console.log('- 创建时间:', event.createdAt);
            console.log('- 更新时间:', event.updatedAt);
        }
        
        // 3. 统计整体情况
        console.log('\n=== 3. 数据库整体描述情况 ===');
        const totalCount = await prisma.hanabiEvent.count();
        const withDescCount = await prisma.hanabiEvent.count({
            where: {
                description: {
                    not: null,
                    not: ''
                }
            }
        });
        
        console.log('总花火大会记录数:', totalCount);
        console.log('有description的记录数:', withDescCount);
        console.log('没有description的记录数:', totalCount - withDescCount);
        console.log('有描述的比例:', Math.round((withDescCount / totalCount) * 100) + '%');
        
        // 4. 显示一些有描述的样本
        if (withDescCount > 0) {
            console.log('\n=== 4. 有描述的样本记录 ===');
            const samplesWithDesc = await prisma.hanabiEvent.findMany({
                where: {
                    description: {
                        not: null,
                        not: ''
                    }
                },
                take: 3,
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            });
            
            samplesWithDesc.forEach((sample, index) => {
                console.log(`${index + 1}. ${sample.name} (${sample.id})`);
                console.log(`   描述: ${sample.description.substring(0, 100)}...`);
                console.log('');
            });
        }
        
    } catch (error) {
        console.error('❌ 数据库查询错误:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabaseDescription(); 