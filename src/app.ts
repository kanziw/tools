import cors from 'cors'
// @ts-ignore
import merge from 'easy-pdf-merge'
import Express, { Request, Response } from 'express'
import { writeFileSync } from 'fs'
import morgan from 'morgan'
import multer from 'multer'
import { join, resolve } from 'path'
import { fileSync } from 'tmp'
import { isDebug, isProd, VERSION } from './config'

const app = Express()
if (isDebug) {
  app.use(morgan('tiny'))
}

app.get('/hi', (_, res: Response) => {
  res.send(`hi? I'm tools with version ${VERSION}`)
})

if (!isProd) {
  app.use(cors())
}

const fileSyncOptions = { mode: 511, postfix: '.pdf' }

app.post('/merge-pdf', multer().array('files'), (req: Request, res: Response) => {
  // @ts-ignore
  const inputFiles = req.files.map((file: any) => {
    const { name, removeCallback } = fileSync(fileSyncOptions)
    writeFileSync(name, file)
    return { name, removeCallback }
  })
  const outputFile = fileSync(fileSyncOptions)
  merge(inputFiles.map((obj: any) => obj.name), outputFile.name, (err: Error) => {
    if (err) {
      console.log('????', err)
      res.status(400).end()
    }
    res.download(outputFile.name, () => {
      inputFiles.forEach((obj: any) => obj.removeCallback())
      outputFile.removeCallback()
    })
  })
})

if (isProd) {
  const outputPath = join(__dirname, './public')
  app.use('/', Express.static(outputPath))
  app.get('*', (_, res: Response) => res.sendFile(resolve(outputPath, 'index.html')))
}

export default app
