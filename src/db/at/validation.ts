import * as Joi from 'joi'
import { _id, __v } from '../validation'
export const body = Joi
.object()
.keys({
  _id,
  __v,
  latitude: Joi
  .number()
  .greater(0)
  .required()
  .description('latitude of the location'),
  longitude: Joi
  .number()
  .greater(0)
  .required()
  .description('longitude of the location'),
})
export const params = Joi
.object()
.keys({
  id: _id,
})