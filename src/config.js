const e = process.env

const s = (prop, defaultValue) => e[ prop ] || defaultValue
const n = (prop, defaultValue) => parseInt(s(prop, defaultValue), 10)

const PORT = n('PORT', 8080)
const isProd = s('NODE_ENV') === 'production'

module.exports = {
  PORT,
  isProd,
}
