const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
    console.log(`Fixing: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix spread operator
    content = content.replace(/\.\.\.(\w+)/g, 'Object.assign({}, $1)');
    
    // Fix arrow functions
    content = content.replace(/async\s*\(([^)]*)\)\s*=>\s*{/g, 'async function($1) {');
    content = content.replace(/\(([^)]*)\)\s*=>\s*{/g, 'function($1) {');
    content = content.replace(/\(([^)]*)\)\s*=>\s*\(/g, 'function($1) { return (');
    content = content.replace(/\(([^)]*)\)\s*=>\s*([^;{]+);/g, 'function($1) { return $2; }');
    
    // Fix destructuring
    content = content.replace(/var\s*{\s*([^}]+)\s*}\s*=\s*([^;]+);/g, function(match, props, source) {
        const propNames = props.split(',').map(p => p.trim());
        return propNames.map(prop => `var ${prop} = ${source}.${prop};`).join('\n');
    });
    
    // Fix template literals
    content = content.replace(/`([^`]*)`/g, function(match, template) {
        return '"' + template.replace(/\${([^}]+)}/g, '" + $1 + "') + '"';
    });
    
    // Fix let declarations
    content = content.replace(/\blet\b/g, 'var');
    
    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.js')) {
            fixFile(filePath);
        }
    });
}

// Fix all JS files in backend/dist
walkDir('backend/dist');
console.log('✅ Fixed all JavaScript files for Azure compatibility'); 