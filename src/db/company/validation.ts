import * as Joi from 'joi'
import { _id, __v } from '../validation'
export const body = Joi
.object()
.keys({
  _id,
  __v,
  name: Joi
  .string()
  .not('')
  .required(),
})
export const params = Joi
.object()
.keys({
  id: _id,
})