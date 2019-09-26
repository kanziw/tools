const Express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')

const app = Express()
app.use(morgan('tiny'))

const e = process.env
const GAE_CONFIGURATION = Object
    .keys(e)
    .filter(key => key.startsWith('GAE_'))
    .map(key => `> ${key}: ${e[key]}`)
    .join('<br />')

app.get('/', (_, res) => {
  res.send(`Hello? I'm tools on version<br />${GAE_CONFIGURATION}`)
})

app.listen(PORT, () => {
  console.log(`tools is running on port ${PORT}`)
})
