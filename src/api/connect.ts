import * as mongoose from 'mongoose'
import { environment } from './environment'
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = environment
export const uri = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
let connection
export const connect = async () : Promise<mongoose.Connection> => {
  if (!connection) connection = mongoose.createConnection(uri, { useNewUrlParser: true, useFindAndModify: false })
  return connection
}
