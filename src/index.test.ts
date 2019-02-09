import chalk from 'chalk'
import { Types } from 'mongoose'
import * as request from 'request-promise-native'
import { environment } from './api/environment'
import { run } from './api/server'
import { collections } from './loader'
import { format, pad } from './test-utils'
const { SERVER_HOST, SERVER_PORT } = environment
let fastify
describe('api', async () => {
  beforeAll(async () => {
    fastify = await run()
  })
  afterAll(async () => {
    await fastify.close()
  })
  for (const collection of collections) {
    describe(chalk.blue(collection), async () => {
      const { seeds, unit, virtuals } = require(`./db/${collection}`)
      const last = +(seeds[ seeds.length - 1]._id.toString())
      const first =  Types.ObjectId('000000000000000000000001')
      const unknown = Types.ObjectId(pad(last + 2))
      const { create, update, malformed } = unit
      let output
      let expected
      let created
      describe('find', async () => {
        it('find all', async () => {
          expected = seeds.map(format)
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}`,
            method: 'GET',
          })
          expect(output.length).toEqual(seeds.length)
          expect(output).toEqual(expected)
        })
        it('find by ID', async () => {
          expected = format(seeds.find(({ _id }) => _id.toString() === first.toString()))
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${first}`,
            method: 'GET',
          })
          expect(output).toEqual(expected)
        })
        it('cannot find malformed', async () => {
          expect(request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/wrong`,
            method: 'GET',
          }),
          ).rejects.toThrowError()
        })
      })
      describe('create', async () => {
        it('can create', async () => {
          expected = [format(create)]
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}`,
            body: create,
            method: 'POST',
          })
          created = output[0]._id.toString()
          for (const index in expected) {
            for (const prop in expected) {
              expect(output[index]).toHaveProperty(prop, expected[index][prop])
            }
          }
        })
        it('created correctly', async () => {
          expected = format(create)
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
            method: 'GET',
          })
          expect(output).toBeDefined()
        })
        it('cannot create malformed', async () => {
          expect(
            request({
              json: true,
              url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}`,
              body: malformed,
              method: 'POST',
            }),
          ).rejects.toThrowError()
        })
      })
      describe('update', async () => {
        it('can update', async () => {
          expected = format(update)
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
            body: update,
            method: 'PUT',
          })
          for (const prop in expected) {
            expect(output).toHaveProperty(prop, expected[prop])
          }
        })
        it('updated correctly', async () => {
          expected = format(update)
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
            method: 'GET',
          })
          for (const prop in expected) {
            expect(output).toHaveProperty(prop, expected[prop])
          }
        })
        it('cannot update malformed', async () => {
          expect(
            request({
              json: true,
              url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
              body: malformed,
              method: 'PUT',
            }),
          ).rejects.toThrowError()
        })
        if (virtuals) {
          for (const { ref, localField } of virtuals) {
            const related : any = require(`./db/${ref}`)
            related.last = +(related.seeds[ related.seeds.length - 1]._id.toString())
            related.unknown = Types.ObjectId(pad(related.last + 2))
            it(`cannot update with unknown '${ref}'`, async () => {
              expect(
                request({
                  json: true,
                  url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
                  body: { ...update, [localField]: related.unknown },
                  method: 'PUT',
                }),
              ).rejects.toThrowError()
            })
          }
        }
        it('cannot update unknown id', async () => {
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${unknown}`,
            body: update,
            method: 'PUT',
          })
          expect(output).toEqual(null)
        })
      })
      describe('delete', async () => {
        it('can delete', async () => {
          expected = format(update)
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
            method: 'DELETE',
          })
          for (const prop in expected) {
            expect(output).toHaveProperty(prop, expected[prop])
          }
        })
        it('deleted correctly', async () => {
          output = await request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${created}`,
            method: 'GET',
          })
          expect(output).toEqual(null)
        })
        it('cannot delete unknown', async () => {
          expect(request({
            json: true,
            url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${collection}/${unknown}`,
            method: 'DELETE',
          }),
          ).rejects.toThrowError()
        })
      })
    })
  }
})
