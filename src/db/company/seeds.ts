import { Types } from 'mongoose'
import { Company } from './type'
export const seeds : Company[] = [
  {
    _id: Types.ObjectId('000000000000000000000001'),
    name: 'First Company',
    at_id: Types.ObjectId('000000000000000000000001'),
    __v: 0,
  },
  {
    _id: Types.ObjectId('000000000000000000000002'),
    name: 'Second Company',
    at_id: Types.ObjectId('000000000000000000000001'),
    __v: 0,
  },
]
export const unit = next => {
  const create : Company = {
    _id: next,
    at_id: Types.ObjectId('000000000000000000000001'),
    name: 'Another company',
    __v: 0,
  }
  const update : Company = {
    _id: next,
    at_id: Types.ObjectId('000000000000000000000001'),
    name: 'Another company updated',
    __v: 0,
  }
  const malformed : any = {
    _id: next,
    weird: 'some unexpected property',
    __v: 0,
  }
  return { create, update, malformed }
}
