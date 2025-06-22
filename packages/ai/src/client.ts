import OpenAI from 'openai'

import { env } from '../../../scripts/validate-env'

export const createOpenAIClient = (OpenAIClass = OpenAI) => {
  return new OpenAIClass({
    apiKey: env.OPENAI_API_KEY,
  })
}

export default createOpenAIClient()
