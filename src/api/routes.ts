import * as Joi from 'joi'
import { Repository } from './repository'
import { connect } from './connect';
export const routes = async (collections : string[]) => {
  let api = []
  for (const collection of collections) {
    const { schema, validation } = require(`../db/${collection}`)
    const connection = await connect()
    const model = connection.model(collection, schema)
    const repository = new Repository(model)
    const routes = [
      {
        method: `GET`,
        url: `/api/${collection}`,
        handler: repository.find
      },
      {
        method: `GET`,
        url: `/api/${collection}/:id`,
        handler: repository.find
      },
      {
        method: `POST`,
        url: `/api/${collection}`,
        schema: { body: validation },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.create,
        attachValidation: true
      },
      {
        method: `PUT`,
        url: `/api/${collection}/:id`,
        schema: { body: validation },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.update,
        attachValidation: true
      },
      {
        method: `DELETE`,
        url: `/api/${collection}/:id`,
        handler: repository.delete
      }
    ]
    api = [...api, ...routes]
  }
  return api
}
