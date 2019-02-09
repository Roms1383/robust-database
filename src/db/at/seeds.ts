import { Types } from 'mongoose'
import { At, MongooseAt } from './type'
export const seeds : MongooseAt[] = [
  {
    _id: Types.ObjectId('000000000000000000000001'),
    latitude: 3.4566677565,
    longitude: 18.4243435512,
    __v: 0,
  },
]
const create : At = { latitude: 1, longitude: 2 }
const update : At = { latitude: 3, longitude: 4 }
const malformed : any = { weird: 'some unexpected property' }
export const unit = { create, update, malformed }
