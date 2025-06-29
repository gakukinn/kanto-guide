const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix 1: Restore broken export statements
    content = content.replace(/export const,/g, 'export const');
    
    // Fix 2: Restore broken property names and assignments
    content = content.replace(/(\w+),\s*(\w+):\s*([^,\n]+)\s*=\s*\{,/g, '$1$2: $3 = {');
    content = content.replace(/(\w+),\s*(\w+):\s*([^,\n]+)\s*=\s*\{/g, '$1$2: $3 = {');
    
    // Fix 3: Restore broken object properties
    content = content.replace(/(\w),\s*(\w+):/g, '$1$2:');
    content = content.replace(/(\w),\s*(\w+)\s*:/g, '$1$2:');
    
    // Fix 4: Fix broken metadata structure
    content = content.replace(/metadata: Metadata = \{,/g, 'metadata: Metadata = {');
    
    // Fix 5: Fix broken function parameters
    content = content.replace(/\(\(\),/g, '({');
    content = content.replace(/=> \(\{,/g, '=> ({');
    
    // Fix 6: Fix broken object literal syntax
    content = content.replace(/\{,\s*(\w+):/g, '{\n  $1:');
    content = content.replace(/\{,/g, '{');
    
    // Fix 7: Fix broken array/object combinations
    content = content.replace(/\]\s*\}\s*\)/g, ']\n  })\n}');
    
    // Fix 8: Fix unterminated strings
    content = content.replace(/etailUrl: ',\s*$/gm, 'detailUrl: \'');
    content = content.replace(/canonical: ',\s*$/gm, 'canonical: \'');
    
    // Fix 9: Fix broken property chains
    content = content.replace(/(\w),\s*(\w+),\s*(\w+):/g, '$1$2$3:');
    content = content.replace(/(\w),\s*(\w+):/g, '$1$2:');
    
    // Fix 10: Fix function declarations
    content = content.replace(/function\s+(\w+)\(\)\s*\{/g, 'function $1() {');
    
    // Fix 11: Fix const declarations with types
    content = content.replace(/const,\s*(\w+):\s*\{\s*\[,/g, 'const $1: {[');
    content = content.replace(/const,\s*(\w+):/g, 'const $1:');
    
    // Fix 12: Fix broken URL strings
    content = content.replace(/https:\/\/([^\s'"]+)'\s*}\s*,\s*\{,/g, 'https://$1\'\n  },\n  {');
    
    // Fix 13: Fix template literal issues
    content = content.replace(/\$\{([^}]+)\}\}/g, '${$1}}');
    
    // Fix 14: Fix broken JSX syntax
    content = content.replace(/\/>\s*\)\s*\}/g, '/>\n  );\n}');
    
    // Write file only if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findTsxFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error.message);
    }
  }
  
  traverse(dir);
  return files;
}

// Main execution
const appDir = path.join(process.cwd(), 'app');
const files = findTsxFiles(appDir);

console.log(`Found ${files.length} TypeScript files to process...`);

let fixedCount = 0;
files.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files out of ${files.length} total files.`);
console.log('Syntax restoration completed!'); 