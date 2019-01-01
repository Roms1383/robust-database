import { Repository } from './repository'
export const routes = (collections : string[]) => {
  let api = []
  for (const collection of collections) {
    const { schema } = require(`../${collection}`)
    const repository = new Repository(collection, schema)
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
        handler: repository.create
      },
      {
        method: `PUT`,
        url: `/api/${collection}/:id`,
        handler: repository.update
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
