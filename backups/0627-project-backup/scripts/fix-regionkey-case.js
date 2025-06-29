const fs = require('fs');
const path = require('path');

function findAllPageFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            results = results.concat(findAllPageFiles(filePath));
        } else if (file === 'page.tsx') {
            results.push(filePath);
        }
    });
    
    return results;
}

function fixRegionKeyCase(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if this file contains the incorrect regionkey
        if (content.includes('regionkey:')) {
            console.log(`Fixing regionkey case in: ${filePath}`);
            
            // Create backup
            const backupPath = filePath + '.backup-regionkey-' + Date.now();
            fs.writeFileSync(backupPath, content);
            
            // Fix the regionkey case issue
            const fixedContent = content.replace(/regionkey:/g, 'regionKey:');
            
            fs.writeFileSync(filePath, fixedContent);
            console.log(`✅ Fixed regionkey case in: ${filePath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

// Main execution
console.log('🔍 Searching for pages with regionkey case issues...');

const appDir = path.join(process.cwd(), 'app');
const pageFiles = findAllPageFiles(appDir);

console.log(`📁 Found ${pageFiles.length} page files`);

let fixedCount = 0;

pageFiles.forEach(filePath => {
    if (fixRegionKeyCase(filePath)) {
        fixedCount++;
    }
});

console.log(`\n✅ Fixed regionkey case in ${fixedCount} files`);
console.log('🎯 All regionkey case issues have been resolved!'); 