import Express, { Response } from 'express'
import morgan from 'morgan'
import { join, resolve } from 'path'
import { isProd, PORT } from './config'

const app = Express()
app.use(morgan('tiny'))

app.get('/hi', (_, res) => {
  res.send(`hi? I'm tools with version ${process.env.GAE_VERSION}`)
})

if (isProd) {
  const outputPath = join(__dirname, '../public')
  app.use('/', Express.static(outputPath))
  app.get('*', (_, res: Response) => res.sendFile(resolve(outputPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`tools is running on port ${PORT}`)
})
