import { Types } from 'mongoose'
import { Company, MongooseCompany } from './type'
export const seeds : MongooseCompany[] = [
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
const create : Company = {
  at_id: Types.ObjectId('000000000000000000000001'),
  name: 'Another company',
}
const update : Company = {
  at_id: Types.ObjectId('000000000000000000000001'),
  name: 'Another company updated',
}
const malformed : any = {
  weird: 'some unexpected property',
}
export const unit = { create, update, malformed }
