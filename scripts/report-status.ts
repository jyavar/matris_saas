import { execSync } from 'child_process'

function reportStatus() {
  console.log('📊  Generating STRATO Repository Status Report...')
  try {
    console.log('\n--- Running Validator ---')
    execSync('tsx scripts/validate-repo.ts', { stdio: 'inherit' })

    console.log('\n--- Running Tests ---')
    execSync('tsx scripts/run-all-tests.ts', { stdio: 'inherit' })

    console.log('\n-----------------------------------------')
    console.log('✅  STRATO STATUS: ALL SYSTEMS GREEN')
    console.log('-----------------------------------------')
  } catch (error) {
    console.error('\n-----------------------------------------')
    console.error('❌  STRATO STATUS: ATTENTION REQUIRED')
    console.error('-----------------------------------------')
    process.exit(1)
  }
}

reportStatus()
