import * as Joi from 'joi'
import { __v, _id } from '../validation'
export const body = Joi
.object()
.keys({
  _id,
  __v,
  name: Joi
  .string()
  .not('')
  .required()
  .description('name of the company'),
})
export const params = Joi
.object()
.keys({
  id: _id,
})
