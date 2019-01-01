const fastify = require('fastify')({
  logger: true
})

const run = async () => {
  const { routes: builder } = require('./built/api/routes')
  const routes = builder(['at', 'company'])
  routes.forEach((route, index) => {
    fastify.route(route)
  })
  
  await fastify.listen(3000)
  fastify.log.info(`listening on ${fastify.server.address().port}`)
}
run()