const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix 1: Remove malformed array structures like "},{ ],"
    content = content.replace(/},\s*\{\s*\],/g, '},');
    
    // Fix 2: Fix object arrays with incorrect bracket placement
    content = content.replace(/},\s*\{\s*\]\s*,\s*id:/g, '},\n  {\n    id:');
    
    // Fix 3: Fix function parameter syntax
    content = content.replace(/function\s+(\w+)\(\)\s*\{/g, 'function $1() {');
    
    // Fix 4: Fix const declarations with type annotations
    content = content.replace(/const\s+(\w+):\s*(\w+)\s+=/g, 'const $1: $2 =');
    
    // Fix 5: Fix missing commas in object properties
    content = content.replace(/([^,\s}])\s*(\w+\s*:\s*)/g, '$1,\n  $2');
    
    // Fix 6: Fix array closing brackets
    content = content.replace(/\]\s*,\s*(\w+\s*:)/g, '],\n  $1');
    
    // Fix 7: Fix object structure in data arrays
    content = content.replace(/\]\s*,\s*id\s*:/g, '],\n  id:');
    
    // Fix 8: Fix metadata export structure
    content = content.replace(/export\s+const\s+metadata\s*=\s*\{([^}]*)\}\s*;?/gs, (match, metaContent) => {
      const lines = metaContent.split('\n').map(line => line.trim()).filter(line => line);
      const cleanLines = lines.map(line => {
        if (!line.endsWith(',') && !line.endsWith('{') && !line.endsWith('}') && line.includes(':')) {
          return line + ',';
        }
        return line;
      });
      return `export const metadata = {\n  ${cleanLines.join('\n  ')}\n};`;
    });
    
    // Fix 9: Fix semicolon issues
    content = content.replace(/;\s*\]/g, ']');
    content = content.replace(/;\s*}/g, '}');
    
    // Fix 10: Fix template literal issues
    content = content.replace(/\$\{([^}]+)\|\|([^}]+)\}/g, '${$1 || $2}');
    
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
console.log('Comprehensive syntax fix completed!'); 