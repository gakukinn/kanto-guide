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

function fixCorruptedBase64(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if this file contains corrupted base64 data
        if (content.includes('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD')) {
            console.log(`Fixing corrupted base64 in: ${filePath}`);
            
            // Create backup
            const backupPath = filePath + '.backup-' + Date.now();
            fs.writeFileSync(backupPath, content);
            console.log(`  Created backup: ${backupPath}`);
            
            // Replace corrupted base64 with empty media array
            const fixedContent = content.replace(
                /media:\s*\[\s*\{\s*type:\s*['"]image['"],\s*url:\s*['"]data:image\/jpeg;base64,\/9j\/4AAQSkZJRgABAQAAAQABAAD[^'"]*['"],?\s*\}\s*\]/g,
                'media: []'
            );
            
            // Also handle cases where there might be multiple media items
            const finalContent = fixedContent.replace(
                /media:\s*\[\s*\{\s*type:\s*['"]image['"],\s*url:\s*['"]data:image\/jpeg;base64,\/9j\/4AAQSkZJRgABAQAAAQABAAD[^'"]*['"],?\s*\}[^[\]]*\]/g,
                'media: []'
            );
            
            fs.writeFileSync(filePath, finalContent);
            console.log(`  ✅ Fixed corrupted base64 data`);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

function main() {
    console.log('🔍 Searching for pages with corrupted base64 data...');
    
    const pageFiles = findAllPageFiles('app');
    console.log(`Found ${pageFiles.length} page files`);
    
    let fixedCount = 0;
    
    pageFiles.forEach(filePath => {
        if (fixCorruptedBase64(filePath)) {
            fixedCount++;
        }
    });
    
    console.log(`\n✅ Fixed ${fixedCount} pages with corrupted base64 data`);
    console.log('All backups have been created with timestamp suffixes');
}

main(); 