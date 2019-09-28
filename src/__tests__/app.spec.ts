import { OK } from 'http-status-codes'
import request from 'supertest'
import app from '../app'
import { VERSION } from '../config'

describe('Application', () => {
  test('/hi', async () => {
    const { text } = await request(app).get('/hi').expect(OK)
    expect(text).toBe(`hi? I'm tools with version ${VERSION}`)
  })
})
