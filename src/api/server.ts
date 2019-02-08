import * as boom from 'boom'
import * as Fastify from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { AddressInfo } from 'net'
import { collections } from '../loader'
import { format } from '../utils'
import { environment } from './environment'
const { SERVER_LOGGER, SERVER_PORT, SERVER_HOST } = environment
import { options } from './documentation'
const fastify : Fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = Fastify({
  logger: SERVER_LOGGER,
})
const plugin : any = {}
plugin.swagger = require('fastify-swagger')

export const run = async () => {
  fastify
  .register(plugin.swagger, options)
  .after(() => {
    fastify.setErrorHandler(async (error : any, request : any, reply : any) => {
      const { details = undefined } = request.validationError
      ? request.validationError
      : error.isJoi
        ? error
        : {}
      if (details) {
        const message = format({ details })
        reply
          .status(422)
          .send(new Error(message))
      }
      if (error && error.isBoom) {
        reply
          .code(error.output.statusCode)
          .send(error.output.payload)
      }
    })
  })
  const { routes: builder } = require('./routes')
  const routes = await builder(collections)
  routes.forEach((route, index) => {
    fastify.route(route)
  })

  await fastify.listen(SERVER_PORT, SERVER_HOST)
  fastify['swagger']()
  const { port } = fastify.server.address() as AddressInfo
  fastify.log.info(`listening on ${port}`)
  return fastify
}
