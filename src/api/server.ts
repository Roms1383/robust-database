import * as boom from 'boom'
import * as Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { AddressInfo } from 'net'
import { environment } from './environment'
const { SERVER_LOGGER, SERVER_PORT, SERVER_HOST } = environment
import { options } from './documentation'
const fastify : Fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: SERVER_LOGGER,
})
const swagger : any = require('fastify-swagger')

export const run = async () => {
  fastify.register(swagger, options)
  const { routes: builder } = require('./routes')
  const routes = await builder(['at', 'company'])
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  fastify.setErrorHandler(async (error : Error, request : any, reply : any) => {
    if (request.validationError) {
      const message = request.validationError.details.map(({ message }) => message).join(', ')
      reply.status(422).send(new Error(message))
    }
    if (error) { throw boom.boomify(error) }
  })
  await fastify.listen(SERVER_PORT, SERVER_HOST)
  fastify['swagger']()
  const { port } = fastify.server.address() as AddressInfo
  fastify.log.info(`listening on ${port}`)
  return fastify
}
