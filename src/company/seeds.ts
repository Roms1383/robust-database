import { Schema, Types } from 'mongoose'
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
  }
]