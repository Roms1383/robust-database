require('dotenv').config()
import yn from 'yn'
import * as Fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { AddressInfo } from 'net';
const fastify: Fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: yn(process.env.LOGGER)
})

export const run = async () => {
  const { routes: builder } = require('./routes')
  const routes = await builder(['at', 'company'])
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  
  await fastify.listen(process.env.FASTIFY)
  const { port } = fastify.server.address() as AddressInfo
  fastify.log.info(`listening on ${port}`)
  return fastify
}