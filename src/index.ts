import app from './app'
import { PORT, VERSION } from './config'

app.listen(PORT, () => {
  console.log(`tools is running on port ${PORT} with version ${VERSION}`)
})
