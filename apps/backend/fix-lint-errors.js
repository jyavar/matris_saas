import fs from 'fs';
import path from 'path';

// Files to fix
const files = [
  'src/controllers/onboarding.controller.ts',
  'src/controllers/resend.controller.ts', 
  'src/controllers/runtime.controller.ts',
  'src/middleware/errorHandler.middleware.ts',
  'src/services/resend.service.ts',
  'src/utils/controller-factory.ts'
];

// Fix unused parameters by prefixing with underscore
function fixUnusedParams(content) {
  // Remove unused parameters completely by commenting them out
  return content
    .replace(/,\s*_params[^,)]*(?=\s*[,)])/g, '/* _params */')
    .replace(/,\s*_body[^,)]*(?=\s*[,)])/g, '/* _body */')
    .replace(/,\s*_user[^,)]*(?=\s*[,)])/g, '/* _user */')
    .replace(/,\s*_next[^,)]*(?=\s*[,)])/g, '/* _next */')
    .replace(/,\s*_html[^,)]*(?=\s*[,)])/g, '/* _html */')
    .replace(/,\s*_data[^,)]*(?=\s*[,)])/g, '/* _data */')
    .replace(/,\s*_logActions[^,)]*(?=\s*[,)])/g, '/* _logActions */')
    .replace(/,\s*_validateTenant[^,)]*(?=\s*[,)])/g, '/* _validateTenant */')
    // Fix any Record<string, any> types
    .replace(/Record<string, any>/g, 'Record<string, unknown>');
}

// Process each file
files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    content = fixUnusedParams(content);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  } else {
    console.log(`File ${file} not found`);
  }
});

console.log('All files processed!');