import { __v, _id, params as Params } from '../validation'
export const body = {
  type: 'object',
  properties: {
    _id,
    __v,
    at_id: _id,
    name: { type: 'string', minLength: 1, description: 'name of the company' },
  },
  required: ['at_id', 'name'],
  additionalProperties: false,
}
export const params = Params
