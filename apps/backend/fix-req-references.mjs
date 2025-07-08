#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'

const filePath = 'src/controllers/pricing.controller.ts'

try {
  let content = readFileSync(filePath, 'utf8')
  
  // Replace req with _req in various patterns
  content = content.replace(/\breq\._user/g, '_req._user')
  content = content.replace(/\breq\.url/g, '_req.url')
  content = content.replace(/parseBody\(req\)/g, 'parseBody(_req)')
  content = content.replace(/parseParams\(req\.url/g, 'parseParams(_req.url')
  
  writeFileSync(filePath, content)
  console.log('Fixed req references in pricing.controller.ts')
} catch (error) {
  console.error('Error:', error)
  process.exit(1)
}