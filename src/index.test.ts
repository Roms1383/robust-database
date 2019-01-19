import * as request from 'request-promise-native'
import { ObjectID } from 'mongodb'
import { Types } from 'mongoose'
import { environment } from './api/environment'
import { run } from './api/server'
import { At } from './db/at/type'
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
  afterAll(async () => {
    await fastify.close()
  })
  describe('at', async () => {
    const { seeds } = require('./db/at')
    const last = +(seeds[ seeds.length - 1]._id.toString())
    const pad = s => {
      const size = 24 // length of chars of an ObjectId
      s = `${s}`
      while (s.length < (size || 2)) {s = "0" + s}
      return s
    }
    const first =  Types.ObjectId('000000000000000000000001')
    const next = Types.ObjectId(pad(last+1))
    const unknown = Types.ObjectId(pad(last+2))
    const create : At = { _id: next, latitude: 1, longitude: 2, __v: 0 }
    const update : At = { _id: next, latitude: 3, longitude: 4, __v: 0 }
    const malformed : any = { _id: next, weird: 'some unexpected property', __v: 0 }
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
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
          method: 'GET'
        })
        expect(output).toEqual(expected)
      })
      it('cannot create malformed', async () => {
        expect(
          request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at`,
            body: malformed,
            method: 'POST'
          })
        ).rejects.toThrowError()
      })
    })
    describe('update', async () => {
      it('can update', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
          body: update,
          method: 'PUT'
        })
        expect(output).toEqual(expected)
      })
      it('updated correctly', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
          method: 'GET'
        })
        expect(output).toEqual(expected)
      })
      it('cannot update malformed', async () => {
        expect(
          request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
            body: malformed,
            method: 'PUT'
          })
        ).rejects.toThrowError()
      })
      it('cannot update unknown', async () => {
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${unknown}`,
          body: update,
          method: 'PUT'
        })
        expect(output).toEqual(null)
      })
    })
    describe('delete', async () => {
      it('can delete', async () => {
        expected = format(update)
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
          method: 'DELETE'
        })
        expect(output).toEqual(expected)
      })
      it('deleted correctly', async () => {
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${next}`,
          method: 'GET'
        })
        expect(output).toEqual(null)
      })
      it('cannot delete unknown', async () => {
        output = await request({
          json: true,
          url: `http://${SERVER_HOST}:${SERVER_PORT}/api/at/${unknown}`,
          method: 'DELETE'
        })
        expect(output).toEqual(null)
      })
    })
  })
})
