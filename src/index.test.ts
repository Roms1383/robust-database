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
    const first =  Types.ObjectId('000000000000000000000001')
    const second = Types.ObjectId('000000000000000000000002')
    const create : At = { _id: second, latitude: 1, longitude: 2, __v: 0 }
    const update : At = { _id: second, latitude: 3, longitude: 4, __v: 0 }
    const { seeds } = require('./at')
    let output
    let expected
    it('find', async () => {
      expected = seeds.map(format)
      output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at`,
        method: 'GET'
      })
      expect(output.length).toEqual(seeds.length)
      expect(output).toEqual(expected)
    })
    it('find by ID', async () => {
      expected = format(seeds.find(({ _id }) => _id.toString() === first.toString()))
      output = await request({
        json: true,
        url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${first}`,
        method: 'GET'
      })
      expect(output).toEqual(expected)
    })
    describe('create', async () => {
      it('can create', async () => {
        expected = [format(create)]
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at`,
          body: create,
          method: 'POST'
        })
        expect(output).toEqual(expected)
      })
      it('created correctly', async () => {
        expected = format(create)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${second}`,
          method: 'GET'
        })
        expect(output).toEqual(expected)
      })
    })
    describe('update', async () => {
      it('can update', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${second}`,
          body: update,
          method: 'PUT'
        })
        expect(output).toEqual(expected)
      })
      it('updated correctly', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${second}`,
          method: 'GET'
        })
        expect(output).toEqual(expected)
      })
    })
    describe('delete', async () => {
      it('can delete', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${second}`,
          method: 'DELETE'
        })
        expect(output).toEqual(expected)
      })
      it('deleted correctly', async () => {
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${second}`,
          method: 'GET'
        })
        expect(output).toEqual(null)
      })
    })
  })
})
