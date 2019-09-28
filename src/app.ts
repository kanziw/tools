import Express, { Response } from 'express'
import morgan from 'morgan'
import { join, resolve } from 'path'
import { isProd, VERSION } from './config'

const app = Express()
app.use(morgan('tiny'))

app.get('/hi', (_, res: Response) => {
  res.send(`hi? I'm tools with version ${VERSION}`)
})

if (isProd) {
  const outputPath = join(__dirname, '../public')
  app.use('/', Express.static(outputPath))
  app.get('*', (_, res: Response) => res.sendFile(resolve(outputPath, 'index.html')))
}

export default app
