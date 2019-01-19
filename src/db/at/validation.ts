import * as Joi from 'joi'
export const validation = Joi
.object()
.keys({
  _id: Joi.string().required(),
  latitude: Joi.number().greater(0).required(),
  longitude: Joi.number().greater(0).required(),
  __v: Joi.number().integer(),
})