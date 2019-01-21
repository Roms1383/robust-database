import { __v, _id, params as Params } from '../validation'
export const body = {
  type: 'object',
  properties: {
    _id,
    __v,
    latitude: { type: 'number', minimum: 0, description: 'latitude of the location' },
    longitude: { type: 'number', minimum: 0, description: 'longitude of the location' },
  },
  required: ['latitude', 'longitude'],
  additionalProperties: false,
}
export const params = Params
