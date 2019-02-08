import { Schema, VirtualType } from 'mongoose'
import { definition } from './definition'

export { seeds, unit } from './seeds'

const at : any = {
  ref: 'at',
  localField: 'at_id',
  foreignField: '_id',
  justOne: true,
}
export const virtuals : any[] = [at]
const create = () => {
  const schema : Schema = new Schema(definition, { collection: 'company' })
  schema.virtual('at', at)
  return schema
}
export const schema : Schema = create()
export { body, params } from './validation'
