const regions = ['tokyo', 'kanagawa', 'saitama', 'chiba', 'kitakanto', 'koshinetsu'];

async function testMatsuriLikes() {
  console.log('🔍 测试祭典红心数...\n');
  
  for (const region of regions) {
    try {
      const response = await fetch(`http://localhost:3001/api/matsuri/${region}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`📍 ${region.toUpperCase()} 地区:`);
        
        data.forEach(event => {
          const likes = event.likes || 0;
          const isInteger = Number.isInteger(likes);
          const status = isInteger ? '✅' : '❌';
          console.log(`  ${status} ${event.name}: ${likes} 红心 ${isInteger ? '' : '(非整数!)'}`);
        });
        console.log('');
      } else {
        console.log(`❌ ${region} API 请求失败: ${response.status}\n`);
      }
    } catch (error) {
      console.log(`❌ ${region} 测试失败: ${error.message}\n`);
    }
  }
}

testMatsuriLikes().catch(console.error); 