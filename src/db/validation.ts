import * as Joi from 'joi'
export const _id = Joi
.string()
.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
.required()
.error(errors => {
  const [error] = errors
  return { ...error, message: `${error.context.label} is not a valid ObjectID` }
})
export const __v = Joi
.number()
.integer()
