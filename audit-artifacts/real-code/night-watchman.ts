import chokidar from 'chokidar'
import * as execa from 'execa'

console.log('👁️  Iniciando Guardián de la Noche...')

const watcher = chokidar.watch('.', {
  ignored: /(^|[/\\])\..|node_modules|dist/, // Ignora .dotfiles, node_modules, dist
  persistent: true,
})

let isChecking = false
let debounceTimer: NodeJS.Timeout | null = null

const runPreflightCheck = async () => {
  if (isChecking) {
    console.log('🔄  Un chequeo ya está en curso. Esperando a que termine...')
    return
  }

  isChecking = true
  console.log('\n\n🚀  Detectado cambio. Iniciando chequeo pre-vuelo...')
  try {
    const { stdout, stderr } = await execa('npm', ['run', '@preflight-check'], {
      stdio: 'pipe',
    })
    console.log(stdout)
    if (stderr) {
      console.error(stderr)
    }
    console.log('✅  Chequeo pre-vuelo superado. ¡Fortaleza intacta!')
  } catch (error: unknown) {
    console.error(
      '❌  ¡ALERTA! Chequeo pre-vuelo fallido. ¡Deuda técnica detectada!',
    )
    // Imprimimos stdout y stderr del error para tener todo el contexto.
    const execaError = error as execa.ExecaError
    if (execaError.stdout) console.error(execaError.stdout)
    if (execaError.stderr) console.error(execaError.stderr)
  } finally {
    isChecking = false
    console.log('\n👁️  El Guardián sigue vigilando...')
  }
}

const triggerCheck = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(runPreflightCheck, 500) // 500ms debounce
}

watcher
  .on('ready', () => {
    console.log(
      '✅  El Guardián está activo. Vigilando cambios en el código...',
    )
  })
  .on('add', triggerCheck)
  .on('change', triggerCheck)
  .on('unlink', triggerCheck)

process.on('SIGINT', () => {
  console.log('🛑  Guardián detenido.')
  watcher.close()
  process.exit(0)
})
