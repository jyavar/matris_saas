import fs from 'fs';
import path from 'path';

// Files to fix with their missing imports
const filesToFix = [
  {
    file: 'src/controllers/launchboard.controller.ts',
    addImports: [
      `import { IncomingMessage, ServerResponse } from 'http'`,
      `import { sendError, sendSuccess } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/payments.controller.ts',
    addImports: [
      `import { IncomingMessage, ServerResponse } from 'http'`,
      `import { sendError } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/reporting.controller.ts',
    addImports: [
      `import { IncomingMessage, ServerResponse } from 'http'`,
      `import { sendError } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/todo.controller.ts',
    addImports: [
      `import { sendCreated, sendError, sendSuccess } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/profiles.controller.ts',
    addImports: [
      `import { sendError, sendSuccess } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/openai.controller.ts',
    addImports: [
      `import { sendError, sendSuccess } from '../utils/response.helper.js'`
    ]
  },
  {
    file: 'src/controllers/analytics.controller.ts',
    addImports: [
      `import { sendError } from '../utils/response.helper.js'`
    ]
  }
];

// Process each file
filesToFix.forEach(({ file, addImports }) => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    console.log(`Processing ${file}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Find the last import line
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ') || lines[i].startsWith('import{')) {
        lastImportIndex = i;
      }
    }
    
    // Add missing imports after the last import
    if (lastImportIndex !== -1) {
      const importsToAdd = addImports.filter(imp => !content.includes(imp));
      if (importsToAdd.length > 0) {
        lines.splice(lastImportIndex + 1, 0, ...importsToAdd);
        content = lines.join('\n');
        fs.writeFileSync(filePath, content);
        console.log(`Added ${importsToAdd.length} imports to ${file}`);
      }
    }
  } else {
    console.log(`File ${file} not found`);
  }
});

console.log('Import fixes completed!');