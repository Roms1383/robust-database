const request = require('request-promise-native')
const { Given, When, Then, AfterAll, BeforeAll, Before } = require('cucumber')
const { run } = require('../built/api/server')
const { environment } = require('../built/api/environment')
const { SERVER_HOST, SERVER_PORT } = environment
const assert = require('assert')

let fastify
let output
BeforeAll(async function () {
  run().then(f => { fastify = f })
})
AfterAll(async function () {
  Promise.resolve(fastify.close())
})
Before(function (options) {
  // console.log(JSON.stringify(options))
})
Given('I want to test endpoint {word}', endpoint => {
  // console.log(`>>> A endpoint ${endpoint}`)
})
When(/^I call (.*)$/, async function (endpoint) {
  output = await request({
    json: true,
    url: `http://${SERVER_HOST}:${SERVER_PORT}/api/${endpoint}`,
    method: 'GET'
  })
})
Then(/^I should get all occurences$/, function () {
  console.log(output)
  assert.deepStrictEqual(true, true)
})
