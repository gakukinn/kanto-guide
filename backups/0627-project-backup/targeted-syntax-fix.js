const fs = require('fs');
const path = require('path');

function fixSpecificSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Only fix the most critical syntax errors that are clearly wrong
    
    // Fix 1: Semicolon expected errors - add missing semicolons after object properties
    content = content.replace(/([^;,}])\s*\n\s*([a-zA-Z_$][a-zA-Z0-9_$]*:\s*)/g, '$1;\n$2');
    
    // Fix 2: Declaration or statement expected - fix malformed object structures
    content = content.replace(/},\s*\{\s*\]/g, '}]');
    
    // Fix 3: Unterminated string literals
    content = content.replace(/('[^']*)\n/g, '$1\',\n');
    content = content.replace(/("[^"]*)\n/g, '$1",\n');
    
    // Fix 4: Missing commas in arrays
    content = content.replace(/}\s*\n\s*{/g, '},\n{');
    
    // Fix 5: Fix function syntax errors
    content = content.replace(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(\s*\)\s*{/g, 'function $1() {');
    
    // Fix 6: Fix const declaration syntax
    content = content.replace(/const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([a-zA-Z_$][a-zA-Z0-9_$<>\[\]{}|&\s]*)\s*=\s*/g, 'const $1: $2 = ');
    
    // Fix 7: Fix metadata export syntax
    content = content.replace(/export\s+const\s+metadata\s*=\s*{([^}]*)}(\s*;?)/g, (match, metaContent, semicolon) => {
      // Only fix if the metadata content is clearly malformed
      if (metaContent.includes(',,') || metaContent.includes(';\n')) {
        const cleanContent = metaContent
          .replace(/,\s*,/g, ',')
          .replace(/;\s*\n/g, ',\n')
          .replace(/,\s*}/g, '}');
        return `export const metadata = {${cleanContent}}${semicolon}`;
      }
      return match;
    });
    
    // Fix 8: Fix template literal syntax
    content = content.replace(/\$\{([^}]*)\|\|([^}]*)\}/g, '${$1 || $2}');
    
    // Fix 9: Fix array syntax in object literals
    content = content.replace(/\[\s*\]\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*:\s*)/g, '],\n$1');
    
    // Fix 10: Fix JSX syntax errors
    content = content.replace(/\/>\s*\)\s*}/g, '/>\n  );\n}');
    
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
  if (fixSpecificSyntaxErrors(file)) {
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files out of ${files.length} total files.`);
console.log('Targeted syntax fix completed!'); 