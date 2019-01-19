import * as Joi from 'joi'
export const validation = Joi
.object()
.keys({
  _id: Joi.string().required(),
  name: Joi.string().not('').required(),
  __v: Joi.number().integer(),
})