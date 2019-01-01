import * as mongoose from 'mongoose'
import { environment } from './environment'
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = environment
export const uri = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
export const connect = async () : Promise<mongoose.Connection> => mongoose.createConnection(uri, { useNewUrlParser: true })