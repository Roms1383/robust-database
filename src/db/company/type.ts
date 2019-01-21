import { Types } from 'mongoose'
export interface Company {
  _id : Types.ObjectId
  name : string
  at_id : Types.ObjectId
  __v : number
}
