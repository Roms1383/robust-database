import { Types } from 'mongoose'
import { At } from './type'
export const seeds : At[] = [
  {
    _id: Types.ObjectId('000000000000000000000001'),
    latitude: 3.4566677565,
    longitude: 18.4243435512,
    __v: 0,
  }
]
export const unit = next => {
  const create : At = { _id: next, latitude: 1, longitude: 2, __v: 0 }
  const update : At = { _id: next, latitude: 3, longitude: 4, __v: 0 }
  const malformed : any = { _id: next, weird: 'some unexpected property', __v: 0 }
  return { create, update, malformed }
}