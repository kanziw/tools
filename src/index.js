const Express = require('express')
const morgan = require('morgan')
const { PORT } = require('./config')

const app = Express()
app.use(morgan('tiny'))

app.get('/', (_, res) => {
  res.send(`Hello? I'm tools`)
})

app.listen(PORT, () => {
  console.log(`tools is running on port ${PORT}`)
})
