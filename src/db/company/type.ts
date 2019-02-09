import { Types } from 'mongoose'
export interface Company {
  name : string
  at_id : Types.ObjectId
}
export interface MongooseCompany extends Company {
  _id : Types.ObjectId
  __v : number
}
