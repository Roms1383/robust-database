import * as Joi from 'joi'
import { __v, _id } from '../validation'
export const body = Joi
.object()
.keys({
  name: Joi
  .string()
  .not('')
  .required()
  .description('name of the company'),
  at_id: _id,
})
.required()
export const params = Joi
.object()
.keys({
  id: _id,
})
.required()
