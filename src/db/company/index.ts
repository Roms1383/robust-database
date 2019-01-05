import { Schema } from "mongoose"
import { definition } from "./definition"

export { seeds } from "./seeds"

const create = () => {
  const schema : Schema = new Schema(definition, { collection: 'company' })
  schema.virtual('at', {
    ref: 'at',
    localField: 'at_id',
    foreignField: '_id',
    justOne: true
  })
  return schema
}
export const schema : Schema = create()