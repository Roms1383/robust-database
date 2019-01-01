require('dotenv').config()
const yn = require('yn')
const fastify = require('fastify')({
  logger: yn(process.env.LOGGER)
})

export const run = async () => {
  const { routes: builder } = require('./routes')
  const routes = await builder(['at', 'company'])
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  
  await fastify.listen(process.env.FASTIFY)
  fastify.log.info(`listening on ${fastify.server.address().port}`)
}