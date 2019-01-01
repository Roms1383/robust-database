import { run } from './api/server'
import * as request from 'request-promise-native'
import { ObjectID } from 'mongodb'
import { Types } from 'mongoose'
import { At } from './at/type'
import { environment } from './api/environment'
const { SERVER_HOST, SERVER_PORT } = environment
const format = document => Object.keys(document).reduce((object, key) => document[key] instanceof ObjectID
? { ...object, [key]: document[key].toString() }
: { ...object, [key]: document[key] }
, {})
let fastify
describe('api', async () => {
  beforeAll(async () => {
    fastify = await run()
  })
  afterAll(() => {
    fastify.close()
  })
  describe('at', async () => {
    const create : At = { _id: Types.ObjectId('000000000000000000000002'), latitude: 1, longitude: 2, __v: 0 }
    const update : At = { _id: Types.ObjectId('000000000000000000000002'), latitude: 3, longitude: 4, __v: 0 }
    it('find', async () => {
      const { seeds } = require('./at')
      const expected = seeds.map(format)
      const output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at`,
        method: 'GET'
      })
      expect(output).toEqual(expected)
    })
    it('find by ID', async () => {
      const id = '000000000000000000000001'
      const { seeds } = require('./at')
      const expected = seeds.map(format).find(({ _id }) => _id === id)
      const output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${id}`,
        method: 'GET'
      })
      expect(output).toEqual(expected)
    })
    it('create', async () => {
      const expected = [format(create)]
      const output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at`,
        body: create,
        method: 'POST'
      })
      expect(output).toEqual(expected)
    })
    it('update', async () => {
      const expected = format(update)
      const output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${update._id.toString()}`,
        body: update,
        method: 'PUT'
      })
      expect(output).toEqual(expected)
    })
    it('delete', async () => {
      const expected = format(update)
      const output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${update._id.toString()}`,
        method: 'DELETE'
      })
      expect(output).toEqual(expected)
    })
  })
})