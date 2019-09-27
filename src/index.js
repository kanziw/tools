const { join, resolve } = require('path')
const Express = require('express')
const morgan = require('morgan')
const { PORT, isProd } = require('./config')

const app = Express()
app.use(morgan('tiny'))

app.get('/hi', (_, res) => {
  res.send(`hi? I'm tools with version ${process.env.GAE_VERSION}`)
})

if (isProd) {
  const outputPath = join(__dirname, '../public')
  app.use('/', Express.static(outputPath))
  app.get('*', (req, res) => res.sendFile(resolve(outputPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`tools is running on port ${PORT}`)
})
