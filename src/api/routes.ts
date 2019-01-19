import * as Joi from 'joi'
import { Repository } from './repository'
import { connect } from './connect';
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
        handler: repository.find
      },
      {
        method: `GET`,
        url: `/api/${collection}/:id`,
        schema: { params },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.find,
        attachValidation: true
      },
      {
        method: `POST`,
        url: `/api/${collection}`,
        schema: { body },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.create,
        attachValidation: true
      },
      {
        method: `PUT`,
        url: `/api/${collection}/:id`,
        schema: { body, params },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.update,
        attachValidation: true
      },
      {
        method: `DELETE`,
        url: `/api/${collection}/:id`,
        schema: { params },
        schemaCompiler: schema => data => Joi.validate(data, schema),
        handler: repository.delete,
        attachValidation: true
      }
    ]
    api = [...api, ...routes]
  }
  return api
}
