import { Types } from 'mongoose'
export interface At {
  latitude : number
  longitude : number
}
export interface MongooseAt extends At {
  _id : Types.ObjectId
  __v : number
}
