import { Repository } from './repository'
const repository = new Repository()
export const routes = [
  {
    method: 'GET',
    url: '/api/at',
    handler: repository.find
  },
  {
    method: 'GET',
    url: '/api/at/:id',
    handler: repository.find
  },
  {
    method: 'POST',
    url: '/api/at',
    handler: repository.create
  },
  {
    method: 'PUT',
    url: '/api/at/:id',
    handler: repository.update
  },
  {
    method: 'DELETE',
    url: '/api/at/:id',
    handler: repository.delete
  }
]