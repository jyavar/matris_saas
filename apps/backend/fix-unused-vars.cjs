const fs = require('fs');
const path = require('path');

// Files to fix
const files = [
  'src/controllers/onboarding.controller.ts',
  'src/controllers/resend.controller.ts', 
  'src/controllers/runtime.controller.ts',
  'src/middleware/errorHandler.middleware.ts',
  'src/services/resend.service.ts',
  'src/utils/controller-factory.ts'
];

// Function to remove unused parameters
function removeUnusedParams(content) {
  return content
    // Remove unused parameters from function signatures
    .replace(/,\s*_params[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_body[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_user[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_next[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_html[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_data[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_logActions[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*_validateTenant[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*handlerError[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*html[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*data[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*logActions[^,)]*(?=\s*[,)])/g, '')
    .replace(/,\s*validateTenant[^,)]*(?=\s*[,)])/g, '')
    // Fix any Record<string, any> types
    .replace(/Record<string, any>/g, 'Record<string, unknown>')
    // Fix catch blocks
    .replace(/} catch \(handlerError\) {/g, '} catch {')
    .replace(/} catch \(error\) {/g, '} catch {')
    // Fix destructuring assignments
    .replace(/const \{ logActions = true, validateTenant = false \} = options/g, 'const { logActions: _logActions = true, validateTenant: _validateTenant = false } = options')
    .replace(/const \{ requireAuth = true, logActions = true \} = options/g, 'const { requireAuth = true, logActions: _logActions = true } = options');
}

// Process each file
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    content = removeUnusedParams(content);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  } else {
    console.log(`File ${file} not found`);
  }
});

console.log('All files processed!');