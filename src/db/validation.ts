export const _id = {
  type: 'string',
  pattern: '^[0-9a-fA-F]{24}$',
  errorMessage: 'should be a valid ObjectID',
  description: `MongoDB ObjectID
the 12-byte ObjectId value consists of:
- a 4-byte value representing the seconds since the Unix epoch,
- a 5-byte random value, and
- a 3-byte counter, starting with a random value`
}
export const __v = {
  type: 'integer',
  description: 'mongoose versionKey'
}
export const params = {
  type: 'object',
  properties: { id: _id },
  required: ['id'],
  additionalProperties: false
}