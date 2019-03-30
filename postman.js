const fs = require('fs')
const path = require('path')
const plur = require('plur')
const ramda = require('ramda')
const { Types } = require('mongoose')
const { environment } = require('./built/api/environment')
const { SERVER_HOST, SERVER_PORT } = environment
const { collections } = require('./built/loader')
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'))
const variables = []
const info = {
  name: package.name,
  _postman_id: 'cdda3978-c8ee-912d-36b0-4005136e3b1d',
  description: 'Used for the tutorial robust-database',
  schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
}
const name = (name, method, path = undefined, extra = undefined) => {
  const parts = []
  parts.push(method)
  parts.push(path ? `/api/${name}/:${path.name}` : `/api/${name}`)
  if (extra) parts.push(extra)
  return parts.join(' ')
}
const url = (name, path = undefined) => {
  const parts = []
  parts.push(`http://${SERVER_HOST}:${SERVER_PORT}/api/${name}`)
  if (path) parts.push(path.parameter)
  return parts.join('/')
}
const header = [{
  key: 'Content-Type',
  value: 'application/json',
  description: ''
}]
const call = ({ collection, method, path = undefined, body = {}, extra = undefined }) => ({
  name: name(collection, method, path, extra),
  request: {
    url: url(collection, path),
    method,
    header: method === 'POST' || method === 'PUT' ? header : [],
    body,
    description: ''
  },
  response: []
})
const item = () => {
  const content = []
  for (const collection of collections) {
    const exported = require(`./built/db/${collection}`)
    const { unit } = exported
    const first =  Types.ObjectId('000000000000000000000001')
    const set = unit
    const { create, update, malformed } = Object.keys(set)
    .reduce((unit, key) => {
      const original = set[key]
      const keys = Object.keys(original).filter(key => key !== '_id' && key !== '__v')
      const cleaned = keys.reduce((cleaned, key) => ({ ...cleaned, [key]: original[key] }), {})
      unit[key] = {
        mode: 'raw',
        raw: JSON.stringify(cleaned)
      }
      return unit
    }, {})
    const root = {
      name: collection,
      description: plur(ramda.propOr(collection, 'description', exported), 2)
    }
    content.push({
      ...root,
      item: [
        call({ collection, method: 'GET' }),
        call({ collection, method: 'GET', path: { name: 'id', parameter: first.toString() } }),
        call({ collection, method: 'GET', path: { name: 'id', parameter: 'wrong' }, extra: '🚫' }),
        call({ collection, method: 'POST', body: create }),
        call({ collection, method: 'POST', body: malformed, extra: '🚫' }),
        call({ collection, method: 'PUT', path: { name: 'id', parameter: first.toString() }, body: update }),
        call({ collection, method: 'PUT', path: { name: 'id', parameter: 'wrong' }, body: update, extra: '🚫' }),
        call({ collection, method: 'PUT', path: { name: 'id', parameter: first.toString() }, body: malformed, extra: '🚫' }),
        call({ collection, method: 'DELETE', path: { name: 'id', parameter: first.toString() } }),
        call({ collection, method: 'DELETE', path: { name: 'id', parameter: 'wrong' }, extra: '🚫' }),
      ]
    })
  }
  return content
}
const generate = () => {
  const content = {
    variables,
    info,
    item: item()
  }
  fs.writeFileSync(path.resolve(__dirname, 'postman.json'), JSON.stringify(content, null, 2))
}
generate()