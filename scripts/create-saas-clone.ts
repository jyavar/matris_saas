import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'

// Function to validate the project name (must be a valid directory name)
function isValidProjectName(name: string): boolean | string {
  if (!name || name.trim().length === 0) {
    return 'Project name cannot be empty.'
  }
  if (/[<>:"/\\|?*]/.test(name)) {
    return 'Project name contains invalid characters.'
  }
  if (fs.existsSync(path.resolve(process.cwd(), '..', name))) {
    return 'A project with this name already exists in the parent directory.'
  }
  return true
}

// Function to get available modules from the /modules directory
function getAvailableModules(): string[] {
  const modulesDir = path.join(process.cwd(), 'modules')
  if (!fs.existsSync(modulesDir)) {
    return []
  }
  const moduleFolders = fs.readdirSync(modulesDir, { withFileTypes: true })
  return moduleFolders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

async function main() {
  console.log('🚀 Welcome to the STRATO SaaS Cloner!')
  const availableModules = getAvailableModules()

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your new SaaS project?',
      validate: isValidProjectName,
    },
    {
      type: 'checkbox',
      name: 'selectedModules',
      message: 'Which optional modules would you like to include?',
      choices: availableModules,
      when: availableModules.length > 0,
    },
  ])

  const { projectName, selectedModules } = answers
  const sourceDir = process.cwd()
  const targetDir = path.resolve(sourceDir, '..', projectName)

  console.log(`Cloning STRATO Core OS into ${targetDir}...`)

  try {
    // Copy the entire directory, filtering out unnecessary files/folders
    await fs.copy(sourceDir, targetDir, {
      filter: (src: string) => {
        const baseName = path.basename(src)
        const ignored = [
          'node_modules',
          '.git',
          'dist',
          'build',
          '.tmp-scripts',
          'modules',
          projectName,
        ]
        return !ignored.includes(baseName)
      },
    })

    console.log('✅ Base structure cloned.')

    // Copy selected modules
    if (selectedModules && selectedModules.length > 0) {
      console.log('Activating selected modules...')
      for (const moduleName of selectedModules) {
        const moduleSource = path.join(sourceDir, 'modules', moduleName)
        const moduleTarget = path.join(targetDir, 'packages', moduleName)
        await fs.copy(moduleSource, moduleTarget)
        console.log(`  -> Module '${moduleName}' activated.`)
      }
    }

    // Update the package.json in the new project
    const newPackageJsonPath = path.join(targetDir, 'package.json')
    const packageJson = await fs.readJson(newPackageJsonPath)
    packageJson.name = projectName
    packageJson.description = `A new SaaS project based on STRATO Core OS: ${projectName}`
    // Reset version
    packageJson.version = '0.1.0'

    // Add new modules to workspaces
    if (selectedModules && selectedModules.length > 0) {
      const newWorkspaces = selectedModules.map((m: string) => `packages/${m}`)
      packageJson.workspaces.push(...newWorkspaces)
      console.log('✅ Workspaces updated in package.json.')
    }

    await fs.writeJson(newPackageJsonPath, packageJson, { spaces: 2 })
    console.log('✅ package.json updated.')

    console.log('\n🎉 Success! Your new SaaS project is ready.')
    console.log(`\nNext steps:`)
    console.log(`  1. cd ../${projectName}`)
    console.log(`  2. npm install`)
    console.log(`  3. git init && git add . && git commit -m "Initial commit"`)
    console.log(`  4. Start building!`)
  } catch (error) {
    console.error('❌ An error occurred during the cloning process:')
    console.error(error)
  }
}

main()
