import { environment } from './environment'
const { SERVER_HOST, SERVER_PORT } = environment
export const options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'Building a robust database',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: `${SERVER_HOST}:${SERVER_PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}