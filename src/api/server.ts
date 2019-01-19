import { environment } from './environment'
const { SERVER_LOGGER, SERVER_PORT, SERVER_HOST } = environment
import * as Fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { AddressInfo } from 'net'
const fastify: Fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: SERVER_LOGGER
})

export const run = async () => {
  const { routes: builder } = require('./routes')
  const routes = await builder(['at', 'company'])
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  fastify.setErrorHandler(async (error : Error, request : any, reply : any) => {
    if (error) {
      const message = request.validationError.details.map(({ message }) => message).join(', ')
      reply.status(422).send(new Error(message))
    }
  })
  await fastify.listen(SERVER_PORT, SERVER_HOST)
  const { port } = fastify.server.address() as AddressInfo
  fastify.log.info(`listening on ${port}`)
  return fastify
}