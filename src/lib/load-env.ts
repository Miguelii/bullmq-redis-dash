import { fileURLToPath } from 'node:url'
import path from 'node:path'
import createJiti from 'jiti'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const jiti = createJiti(__filename)

export function loadEnv() {
   jiti(path.resolve(__dirname, '../env/client.ts'))
   jiti(path.resolve(__dirname, '../env/server.ts'))
}
