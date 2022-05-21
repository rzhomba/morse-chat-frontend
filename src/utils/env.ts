import dotenv from 'dotenv'

const config = dotenv.config()

if (config.error) {
  throw config.error
}

export const applicationPort = Number(config.parsed?.APPLICATION_PORT ?? 0)
export const apiURL = String(config.parsed?.API_URL ?? '')
