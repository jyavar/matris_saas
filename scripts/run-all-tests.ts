import { execSync } from 'child_process'

function runAllTests() {
  console.log('🧪  Running All Tests...')
  try {
    execSync('vitest run', { stdio: 'inherit' })
    console.log('\n✅ All tests passed!')
  } catch (error) {
    console.error('\n❌ Tests Failed.')
    process.exit(1)
  }
}

runAllTests()

// TODO: Implement test runner logic
// This script will execute all test suites across the monorepo
// (frontend, backend, packages, etc.)
