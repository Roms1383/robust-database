import { Schema, SchemaDefinition, Types } from 'mongoose'

export const definition : SchemaDefinition = {
  name: { type: String, required: true },
  at_id: { type: Types.ObjectId, required: true },
}
