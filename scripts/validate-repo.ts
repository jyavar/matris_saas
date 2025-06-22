import { execSync } from 'child_process'

function validateRepo() {
  console.log('🛡️  Running Repository Validator...')
  try {
    console.log('  🔍  Step 1: Linting all files...')
    execSync('eslint . --ext .ts,.tsx', { stdio: 'inherit' })
    console.log('  ✅  Linting passed.')

    console.log('\n  🔍  Step 2: Type-checking all files...')
    execSync('tsc -p tsconfig.base.json --noEmit', { stdio: 'inherit' })
    console.log('  ✅  Type-checking passed.')

    console.log('\n✅ Repository Validation Succeeded!')
  } catch (error) {
    console.error('\n❌ Repository Validation Failed.')
    process.exit(1)
  }
}

validateRepo()
