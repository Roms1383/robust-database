import { ObjectID } from 'bson'

export const format = document => Object.keys(document)
.reduce((object, key) => document[key] instanceof ObjectID
? { ...object, [key]: document[key].toString() }
: { ...object, [key]: document[key] }
, {})
export const raw = ({ _id, __v, ...others }) => ({ ...others })
export const pad = s => {
  const size = 24 // length of chars of an ObjectId
  s = `${s}`
  while (s.length < (size || 2)) {s = '0' + s }
  return s
}
