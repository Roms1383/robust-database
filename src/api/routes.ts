import { Repository } from './repository'
import { connect } from './connect';
const plur = require('plur')
export const routes = async (collections : string[]) => {
  let api = []
  for (const collection of collections) {
    const { schema, body, params } = require(`../db/${collection}`)
    const connection = await connect()
    const model = connection.model(collection, schema)
    const repository = new Repository(model)
    const routes = [
      {
        method: `GET`,
        url: `/api/${collection}`,
        handler: repository.find,
        schema: { description: `retrieve all ${plur(collection, 2)}` }
      },
      {
        method: `GET`,
        url: `/api/${collection}/:id`,
        schema: { params, description: `retrieve a specific ${collection} by its id` },
        handler: repository.find
      },
      {
        method: `POST`,
        url: `/api/${collection}`,
        schema: { body, description: `create a new ${collection}` },
        handler: repository.create
      },
      {
        method: `PUT`,
        url: `/api/${collection}/:id`,
        schema: { body, params, description: `update a specific ${collection} by its id` },
        handler: repository.update
      },
      {
        method: `DELETE`,
        url: `/api/${collection}/:id`,
        schema: { params, description: `delete a specific document ${collection} by its id` },
        handler: repository.delete
      }
    ]
    api = [...api, ...routes]
  }
  return api
}
