const fastify = require('fastify')({
  logger: true
})
const { routes } = require('./built/api/routes')

const run = async () => {
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  
  await fastify.listen(3000)
  fastify.log.info(`listening on ${fastify.server.address().port}`)
}
run()