import { _id, __v, params as Params } from '../validation'
export const body = {
  type: 'object',
  properties: {
    _id,
    __v,
    name: { type: 'string', minLength: 1, description: 'name of the company' },
  },
  required: ['_id', 'name'],
  additionalProperties: false
}
export const params = Params