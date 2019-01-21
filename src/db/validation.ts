import * as Joi from 'joi'
export const _id = Joi
.string()
.regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
.required()
.error(errors => {
  const [error] = errors
  return { ...error, message: `${error.context.label} is not a valid ObjectID` }
})
.description(`MongoDB ObjectID
the 12-byte ObjectId value consists of:
- a 4-byte value representing the seconds since the Unix epoch,
- a 5-byte random value, and
- a 3-byte counter, starting with a random value`)
export const __v = Joi
.number()
.integer()
.optional()
.description('mongoose versionKey')
