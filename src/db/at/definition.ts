import { SchemaDefinition } from 'mongoose'

export const definition : SchemaDefinition = {
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}
