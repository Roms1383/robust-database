import { Schema } from "mongoose"
import { definition } from "./definition"

export { seeds } from "./seeds"
export const schema : Schema = new Schema(definition, { collection: 'at' })
export { validation } from './validation'