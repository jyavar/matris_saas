import fs from 'fs/promises'
import path from 'path'

import openaiClient from '../packages/ai/src/client'

async function main() {
  const promptPath = process.argv[2]
  if (!promptPath) {
    console.error('Error: Debes proporcionar la ruta al archivo de prompt.')
    process.exit(1)
  }

  console.log(`📝 Leyendo prompt desde: ${promptPath}`)
  const prompt = await fs.readFile(promptPath, 'utf-8')

  console.log('🤖 Enviando prompt a la IA...')

  // NOTA PARA EL USUARIO: Para hacer una llamada real, tu OPENAI_API_KEY debe estar configurada en .env
  const response = await openaiClient.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  })

  const generatedCode = response.choices[0]?.message?.content

  if (!generatedCode) {
    console.error('Error: La IA no ha generado ningún código.')
    process.exit(1)
  }

  console.log('✅ Código generado con éxito.')

  const filePathMatch = prompt.match(/`(\S+\.test\.ts)`/)
  if (!filePathMatch || !filePathMatch[1]) {
    console.error(
      'Error: No se pudo determinar la ruta del archivo de destino desde el prompt.',
    )
    process.exit(1)
  }

  const targetPath = filePathMatch[1]
  console.log(`✍️  Escribiendo código en: ${targetPath}`)

  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, generatedCode)

  console.log('✅ ¡Archivo de test generado y guardado!')
}

main().catch((error) => {
  console.error('Error en el generador de código:', error)
  process.exit(1)
})
