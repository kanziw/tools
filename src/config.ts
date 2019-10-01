// @ts-ignore
import { version as VERSION } from '../package.json'

const e = process.env

const s = <T>(prop: string, defaultValue?: T): T | string | undefined => (
  e[ prop ] || defaultValue
)
const n = (prop: string, defaultValue?: number): number | undefined => (
  parseInt(s(prop, defaultValue) as string, 10)
)

const PORT = n('PORT', 8080)
const isProd = s('NODE_ENV') === 'production'
const isDebug = n('DEBUG', 0) === 1

export { VERSION, PORT, isProd, isDebug }
