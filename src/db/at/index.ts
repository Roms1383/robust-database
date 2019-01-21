import { Schema } from 'mongoose'
import { definition } from './definition'

export { seeds, unit } from './seeds'
export const schema : Schema = new Schema(definition, { collection: 'at' })
export { body, params } from './validation'
